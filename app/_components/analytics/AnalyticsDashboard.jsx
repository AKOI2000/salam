// app/components/analytics/AnalyticsDashboard.jsx
"use client";

import { useAnalytics } from "../../_hooks/useAnalytics";
import { fmtSeconds, fmtPercent } from "../../_lib/analyticsUtils";

import StatCard from "./StatCard";
import VisitorsChart from "./VisitorsChart";
import CountriesChart from "./CountriesChart";
import AvgTimeChart from "./AvgTimeChart";
import TopPagesTable from "./TopPagesTable";

function Section({ title, children }) {
  return (
    <div className="section-box">
      <h2>{title}</h2>
      {children}
    </div>
  );
}

export default function AnalyticsDashboard() {
  const { data, loading, error } = useAnalytics();

  if (loading) {
    return (
      <div className="analytics-dashboard">
        <div
          style={{
            color: "#6366f1",
            textAlign: "center",
            paddingTop: 100,
            fontSize: 16,
          }}
        >
          Loading analytics…
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="analytics-dashboard">
        <div
          style={{
            color: "#ef4444",
            textAlign: "center",
            paddingTop: 100,
            fontSize: 16,
          }}
        >
          Failed to load: {error ?? "No data returned"}
        </div>
      </div>
    );
  }

  const {
    thisMonth,
    lastMonth,
    dailyVisitors,
    topCountries,
    topPages,
    avgTimePerPage,
  } = data;

  return (
    <div className="analytics-dashboard">
      {/* ── KPI Cards ─────────────────────────────────────────────────── */}
      <Section title="This month vs last month">
        <div className="statcard-container">
          <StatCard
            label="Visitors"
            value={thisMonth.visitors}
            prev={lastMonth.visitors}
          />

          <StatCard
            label="Page Views"
            value={thisMonth.views}
            prev={lastMonth.views}
          />

          <StatCard
            label="Sessions"
            value={thisMonth.sessions}
            prev={lastMonth.sessions}
          />

          {/* avgDuration = seconds from session start to session end */}
          <StatCard
            label="Avg Session"
            value={thisMonth.avgDuration}
            prev={lastMonth.avgDuration}
            format={fmtSeconds}
          />

          {/* bounceRate = 0.0–1.0, fmtPercent turns 0.34 into "34%" */}
          <StatCard
            label="Bounce Rate"
            value={thisMonth.bounceRate}
            prev={lastMonth.bounceRate}
            format={fmtPercent}
          />
        </div>
      </Section>

      {/* ── Daily visitors chart ──────────────────────────────────────── */}
      <Section title="Daily visitors this month">
        {dailyVisitors.length === 0 ? (
          <p className="empty">No visitor data yet.</p>
        ) : (
          <VisitorsChart data={dailyVisitors} />
        )}
      </Section>

      {/* ── Top countries ─────────────────────────────────────────────── */}
      <Section title="Top countries">
        {topCountries.length === 0 ? (
          <p className="empty">No country data yet.</p>
        ) : (
          <CountriesChart data={topCountries} />
        )}
      </Section>

      {/* ── Avg time per page ─────────────────────────────────────────── */}
      <Section title="Avg time on page">
        {avgTimePerPage.length === 0 ? (
          <p className="empty">No session data yet.</p>
        ) : (
          <AvgTimeChart data={avgTimePerPage} />
        )}
      </Section>

      {/* ── Top pages ─────────────────────────────────────────────────── */}
      <Section title="Top pages">
        {topPages.length === 0 ? (
          <p className="empty">No page data yet.</p>
        ) : (
          <TopPagesTable data={topPages} />
        )}
      </Section>
    </div>
  );
}

// const containerStyle = {
//   background: "#0f0f1a",
//   minHeight: "100vh",
//   padding: "40px 32px",
//   fontFamily: "'DM Sans', system-ui, sans-serif",
//   color: "#f1f5f9",
//   maxWidth: 960,
//   margin: "0 auto",
// };
