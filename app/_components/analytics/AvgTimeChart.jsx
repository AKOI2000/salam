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
    <div className='custom-tool_tip'>
      <div className='custom-tool_tip-label'>{label}</div>
      <div className='custom-tool_tip-value'>
        Avg time: <strong>{fmtSeconds(payload[0].value)}</strong>
      </div>
      <div className='custom-tool_tip-views'>
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

        <Bar dataKey="avgSeconds" fill="var(--foreground)" radius={[0, 4, 4, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}
