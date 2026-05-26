// app/components/analytics/StatCard.jsx
// A single KPI tile: shows a number, a label, and a % change badge.
// Fully self-contained — just pass it numbers.

import { percentChange } from '@/app/_lib/analyticsUtils'

// The ▲/▼ badge
function Delta({ current, prev }) {
  const diff = percentChange(current, prev)
  if (diff === null) return null

  const up    = diff >= 0
  const color = up ? '#22c55e' : '#ef4444'
  const arrow = up ? '▲' : '▼'

  return (
    <span style={{ color, fontSize: 13, marginLeft: 8, fontWeight: 500 }}>
      {arrow} {Math.abs(diff).toFixed(1)}%
    </span>
  )
}

// format is an optional function — defaults to plain number with commas
export default function StatCard({ label, value, prev, format }) {
  const display = format ? format(value) : value?.toLocaleString()
  const prevDisplay = format ? format(prev) : prev?.toLocaleString()

  return (
    <div style={{
      background:   '#1e1e2e',
      border:       '1px solid #2d2d3f',
      borderRadius: 12,
      padding:      '20px 24px',
      flex:         1,
      minWidth:     160,
    }}>
      {/* Label */}
      <div style={{
        color:          '#9ca3af',
        fontSize:       11,
        textTransform:  'uppercase',
        letterSpacing:  1.2,
        marginBottom:   8,
      }}>
        {label}
      </div>

      {/* Main number + delta badge */}
      <div style={{ fontSize: 28, fontWeight: 700, color: '#f1f5f9' }}>
        {display}
        <Delta current={value} prev={prev} />
      </div>

      {/* Previous month reference */}
      <div style={{ color: '#4b5563', fontSize: 12, marginTop: 6 }}>
        Last month: {prevDisplay}
      </div>
    </div>
  )
}