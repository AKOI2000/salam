import {
  BarChart, Bar,
  XAxis, YAxis,
  CartesianGrid, Tooltip,
  ResponsiveContainer,
} from 'recharts'
import { fmtSeconds } from '@/app/_lib/analyticsUtils'

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
        // Fix 1 — removed layout="vertical"
        margin={{ left: 8, right: 8, top: 16, bottom: 0 }}
      >
        <CartesianGrid stroke="#2d2d3f" strokeDasharray="3 3" vertical={false} />

        {/* Fix 1 — XAxis is now category (page paths) */}
        <XAxis
          type="category"
          dataKey="page"
          tick={{ fill: '#6b7280', fontSize: 11 }}
          axisLine={false}
          tickLine={false}
          tickFormatter={(value) =>
            value.length > 8 ? `${value.slice(0, 8)}...` : value
          }
        />

        {/* Fix 1 — YAxis is now number (seconds) */}
        <YAxis
          type="number"
          tick={{ fill: '#9ca3af', fontSize: 11 }}
          tickFormatter={fmtSeconds}
          axisLine={false}
          tickLine={false}
          width={40}
        />

        <Tooltip content={<CustomTooltip />} />

        {/* Fix 1 — radius flipped to top corners */}
        <Bar dataKey="avgSeconds" fill="var(--foreground)" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}