// app/api/analytics-debug/route.js
import { NextResponse } from 'next/server'

const POSTHOG_HOST = process.env.NEXT_PUBLIC_POSTHOG_HOST
const PROJECT_ID   = process.env.POSTHOG_PROJECT_ID
const API_KEY      = process.env.POSTHOG_PERSONAL_API_KEY

async function fetchHogQL(sql) {
  const res = await fetch(`${POSTHOG_HOST}/api/projects/${PROJECT_ID}/query/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization:  `Bearer ${API_KEY}`,
    },
    body: JSON.stringify({ query: { kind: 'HogQLQuery', query: sql } }),
  })
  const data = await res.json()
  const cols = data.columns ?? []
  return (data.results ?? []).map(row =>
    Object.fromEntries(cols.map((col, i) => [col, row[i]]))
  )
}

export async function GET() {
  const [eventTypes, samplePageview, samplePageleave] = await Promise.all([

    // What events exist in your project?
    fetchHogQL(`
      SELECT event, count() AS total
      FROM events
      GROUP BY event
      ORDER BY total DESC
      LIMIT 20
    `),

    // What does a real $pageview event look like?
    fetchHogQL(`
      SELECT
        distinct_id,
        $session_id,
        properties.$pathname,
        properties.$current_url,
        timestamp
      FROM events
      WHERE event = '$pageview'
      ORDER BY timestamp DESC
      LIMIT 5
    `),

    // What does a real $pageleave event look like?
    fetchHogQL(`
      SELECT
        distinct_id,
        $session_id,
        properties.$pathname,
        properties.$time_on_page,
        timestamp
      FROM events
      WHERE event = '$pageleave'
      ORDER BY timestamp DESC
      LIMIT 5
    `),

  ])

  return NextResponse.json({ eventTypes, samplePageview, samplePageleave })
}