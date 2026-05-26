// app/components/analytics/AvgTimeChart.jsx
// Horizontal bar chart of average time on page, per URL.
// data shape: [{ page: '/blog/intro', avgSeconds: 142, views: 830 }, ...]

import {
  BarChart, Bar,
  XAxis, YAxis,
  CartesianGrid, Tooltip,
  ResponsiveContainer,
} from 'recharts'
import { fmtSeconds } from '@/app/_lib/analyticsUtils'

// Custom tooltip so it shows "2m 22s" instead of raw seconds
function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null
  return (
    <div style={{
      background: '#1e1e2e', border: '1px solid #2d2d3f',
      borderRadius: 8, padding: '10px 14px', fontSize: 13,
    }}>
      <div style={{ color: '#94a3b8', marginBottom: 4 }}>{label}</div>
      <div style={{ color: '#f1f5f9' }}>
        Avg time: <strong>{fmtSeconds(payload[0].value)}</strong>
      </div>
      <div style={{ color: '#6b7280', fontSize: 12 }}>
        {payload[0].payload.views?.toLocaleString()} views
      </div>
    </div>
  )
}

export default function AvgTimeChart({ data }) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        data={data}
        layout="vertical"
        margin={{ left: 8, right: 48, top: 0, bottom: 0 }}
      >
        <CartesianGrid stroke="#2d2d3f" strokeDasharray="3 3" horizontal={false} />

        {/* X axis: raw seconds, formatted as "Xm Ys" */}
        <XAxis
          type="number"
          tick={{ fill: '#6b7280', fontSize: 11 }}
          tickFormatter={fmtSeconds}
          axisLine={false}
          tickLine={false}
        />

        {/* Y axis: the page paths */}
        <YAxis
          type="category"
          dataKey="page"
          tick={{ fill: '#9ca3af', fontSize: 11 }}
          axisLine={false}
          tickLine={false}
          width={150}
        />

        <Tooltip content={<CustomTooltip />} />

        <Bar dataKey="avgSeconds" fill="#8b5cf6" radius={[0, 4, 4, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}
