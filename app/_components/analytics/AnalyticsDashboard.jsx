// app/components/analytics/AnalyticsDashboard.jsx
'use client'

import { useAnalytics } from '../../_hooks/useAnalytics'
import { fmtSeconds, fmtPercent } from '../../_lib/analyticsUtils'

import StatCard       from './StatCard'
import VisitorsChart  from './VisitorsChart'
import CountriesChart from './CountriesChart'
import AvgTimeChart   from './AvgTimeChart'
import TopPagesTable  from './TopPagesTable'

function Section({ title, children }) {
  return (
    <div style={{ marginBottom: 40 }}>
      <h2 style={{
        fontSize:      13,
        fontWeight:    600,
        color:         '#6b7280',
        textTransform: 'uppercase',
        letterSpacing: 1.5,
        marginBottom:  16,
        paddingBottom: 10,
        borderBottom:  '1px solid #2d2d3f',
      }}>
        {title}
      </h2>
      {children}
    </div>
  )
}

export default function AnalyticsDashboard() {
  const { data, loading, error } = useAnalytics()

  if (loading) {
    return (
      <div style={containerStyle}>
        <div style={{ color: '#6366f1', textAlign: 'center', paddingTop: 100, fontSize: 16 }}>
          Loading analytics…
        </div>
      </div>
    )
  }

  if (error || !data) {
    return (
      <div style={containerStyle}>
        <div style={{ color: '#ef4444', textAlign: 'center', paddingTop: 100, fontSize: 16 }}>
          Failed to load: {error ?? 'No data returned'}
        </div>
      </div>
    )
  }

  const { thisMonth, lastMonth, dailyVisitors, topCountries, topPages, avgTimePerPage } = data

  return (
    <div style={containerStyle}>

      <h1 style={{ fontSize: 22, fontWeight: 800, color: '#f1f5f9', marginBottom: 32 }}>
        Analytics
      </h1>

      {/* ── KPI Cards ─────────────────────────────────────────────────── */}
      <Section title="This month vs last month">
        <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>

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
        {dailyVisitors.length === 0
          ? <p style={{ color: '#4b5563' }}>No visitor data yet.</p>
          : <VisitorsChart data={dailyVisitors} />
        }
      </Section>

      {/* ── Top countries ─────────────────────────────────────────────── */}
      <Section title="Top countries">
        {topCountries.length === 0
          ? <p style={{ color: '#4b5563' }}>No country data yet.</p>
          : <CountriesChart data={topCountries} />
        }
      </Section>

      {/* ── Avg time per page ─────────────────────────────────────────── */}
      <Section title="Avg time on page">
        {avgTimePerPage.length === 0
          ? <p style={{ color: '#4b5563' }}>No session data yet.</p>
          : <AvgTimeChart data={avgTimePerPage} />
        }
      </Section>

      {/* ── Top pages ─────────────────────────────────────────────────── */}
      <Section title="Top pages">
        {topPages.length === 0
          ? <p style={{ color: '#4b5563' }}>No page data yet.</p>
          : <TopPagesTable data={topPages} />
        }
      </Section>

    </div>
  )
}

const containerStyle = {
  background:  '#0f0f1a',
  minHeight:   '100vh',
  padding:     '40px 32px',
  fontFamily:  "'DM Sans', system-ui, sans-serif",
  color:       '#f1f5f9',
  maxWidth:    960,
  margin:      '0 auto',
}