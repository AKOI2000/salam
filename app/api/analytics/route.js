// app/api/analytics/route.js

import { NextResponse } from "next/server";
import { startOfMonth, endOfMonth, subMonths, format } from "date-fns";

const POSTHOG_HOST = process.env.NEXT_PUBLIC_POSTHOG_HOST;
const PROJECT_ID   = process.env.POSTHOG_PROJECT_ID;
const API_KEY      = process.env.POSTHOG_PERSONAL_API_KEY;

// ─────────────────────────────────────────────
// HELPER: run a HogQL query
// ─────────────────────────────────────────────
async function fetchHogQL(sql) {
  const res = await fetch(`${POSTHOG_HOST}/api/projects/${PROJECT_ID}/query/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_KEY}`,
    },
    body: JSON.stringify({ query: { kind: "HogQLQuery", query: sql } }),
    next: { revalidate: 300 },
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`HogQL error ${res.status}: ${err}`);
  }

  const data = await res.json();
  const cols  = data.columns ?? [];
  return (data.results ?? []).map((row) =>
    Object.fromEntries(cols.map((col, i) => [col, row[i]]))
  );
}

// ─────────────────────────────────────────────
// HELPER: date range
// ─────────────────────────────────────────────
function getMonthRange(date) {
  return {
    from: format(startOfMonth(date), "yyyy-MM-dd"),
    to:   format(endOfMonth(date),   "yyyy-MM-dd"),
  };
}

// ─────────────────────────────────────────────
// HELPER: overview query
// least(..., 1800) caps each session at 30 minutes before averaging.
// This stops a tab left open overnight from skewing the avg duration.
// Same approach GA4 uses.
// ─────────────────────────────────────────────
function overviewQuery(from, to) {
  return `
    SELECT
      count(DISTINCT distinct_id)                             AS visitors,
      count()                                                 AS views,
      count(DISTINCT $session_id)                             AS sessions,
      countIf(session.$pageview_count = 1) /
        count(DISTINCT $session_id)                           AS bounceRate,
      avg(
        least(
          dateDiff('second', session.$start_timestamp, session.$end_timestamp),
          1800
        )
      )                                                       AS avgDuration
    FROM events
    WHERE event = '$pageview'
      AND toDate(timestamp) >= toDate('${from}')
      AND toDate(timestamp) <= toDate('${to}')
  `
}

// ─────────────────────────────────────────────
// HELPER: avg time per page query
// Uses lagInFrame to find the gap between consecutive
// $pageview/$pageleave events in the same session.
// Filtering to only those two event types means we only
// step through page navigation — not clicks or autocaptures —
// so the time gap is actually time spent on that page.
// ─────────────────────────────────────────────
function avgTimeQuery(from, to) {
  return `
    SELECT
      page,
      avg(timeOnPage) AS avgSeconds,
      count()         AS views
    FROM (
      SELECT
        properties.$pathname AS page,
        dateDiff(
          'second',
          lagInFrame(timestamp) OVER (
            PARTITION BY $session_id
            ORDER BY timestamp ASC
          ),
          timestamp
        ) AS timeOnPage
      FROM events
      WHERE toDate(timestamp) >= toDate('${from}')
        AND toDate(timestamp) <= toDate('${to}')
        AND properties.$pathname IS NOT NULL
        AND event IN ('$pageview', '$pageleave')
    )
    WHERE timeOnPage > 0
      AND timeOnPage < 1800
      AND page IS NOT NULL
    GROUP BY page
    ORDER BY views DESC
    LIMIT 10
  `
}

// ─────────────────────────────────────────────
// MAIN HANDLER
// ─────────────────────────────────────────────
export async function GET() {
  try {
    const now       = new Date();
    const thisMonth = getMonthRange(now);
    const lastMonth = getMonthRange(subMonths(now, 1));

    const [
      overviewThis,
      overviewLast,
      dailyVisitors,
      topCountries,
      topPages,
      avgTimePerPage,
    ] = await Promise.all([

      // 1. All KPI numbers for this month
      fetchHogQL(overviewQuery(thisMonth.from, thisMonth.to)),

      // 2. All KPI numbers for last month (for % change comparison)
      fetchHogQL(overviewQuery(lastMonth.from, lastMonth.to)),

      // 3. Daily unique visitors this month (for the area chart)
      fetchHogQL(`
        SELECT
          toDate(timestamp)           AS date,
          count(DISTINCT distinct_id) AS visitors
        FROM events
        WHERE event = '$pageview'
          AND toDate(timestamp) >= toDate('${thisMonth.from}')
          AND toDate(timestamp) <= toDate('${thisMonth.to}')
        GROUP BY date
        ORDER BY date ASC
      `),

      // 4. Top 10 countries
      // views = raw $pageview count, same definition as StatCard
      fetchHogQL(`
        SELECT
          properties.$geoip_country_name  AS country,
          count(DISTINCT distinct_id)     AS visitors,
          count()                         AS views
        FROM events
        WHERE event = '$pageview'
          AND toDate(timestamp) >= toDate('${thisMonth.from}')
          AND toDate(timestamp) <= toDate('${thisMonth.to}')
          AND properties.$geoip_country_name IS NOT NULL
        GROUP BY country
        ORDER BY visitors DESC
        LIMIT 10
      `),

      // 5. Top 10 pages
      // views = raw $pageview count, same definition as StatCard
      // all page views will add up to the StatCard total
      fetchHogQL(`
        SELECT
          properties.$pathname        AS page,
          count(DISTINCT distinct_id) AS visitors,
          count()                     AS views
        FROM events
        WHERE event = '$pageview'
          AND toDate(timestamp) >= toDate('${thisMonth.from}')
          AND toDate(timestamp) <= toDate('${thisMonth.to}')
          AND properties.$pathname IS NOT NULL
        GROUP BY page
        ORDER BY views DESC
        LIMIT 10
      `),

      // 6. Avg time per page
      // views = page visits we could measure time for
      // slightly less than topPages because the last page
      // in every session has no next event — that is expected
      fetchHogQL(avgTimeQuery(thisMonth.from, thisMonth.to)),
    ]);

    const t = overviewThis[0] ?? {};
    const l = overviewLast[0] ?? {};

    return NextResponse.json({
      thisMonth: {
        visitors:    t.visitors   ?? 0,
        views:       t.views      ?? 0,
        sessions:    t.sessions   ?? 0,
        bounceRate:  t.bounceRate ?? 0,
        avgDuration: Math.round(t.avgDuration ?? 0),
      },
      lastMonth: {
        visitors:    l.visitors   ?? 0,
        views:       l.views      ?? 0,
        sessions:    l.sessions   ?? 0,
        bounceRate:  l.bounceRate ?? 0,
        avgDuration: Math.round(l.avgDuration ?? 0),
      },
      dailyVisitors,   // [{ date, visitors }]
      topCountries,    // [{ country, visitors, views }]
      topPages,        // [{ page, visitors, views }]
      avgTimePerPage,  // [{ page, avgSeconds, views }]
    });

  } catch (err) {
    console.error("[/api/analytics]", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}