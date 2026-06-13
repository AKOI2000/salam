// app/components/analytics/VisitorsChart.jsx
// Area chart showing daily unique visitors for the current month.
// data shape: [{ date: '2026-05-01', visitors: 320 }, ...]

import { format, parseISO } from 'date-fns'
import {
  AreaChart, Area,
  XAxis, YAxis,
  CartesianGrid, Tooltip,
  ResponsiveContainer,
} from 'recharts'

export default function VisitorsChart({ data }) {
  // Turn '2026-05-14' into 'May 14' for the X axis labels
  const chartData = data.map(d => ({
    ...d,
    label: format(parseISO(d.date), 'MMM d'),
  }))

  return (
    <ResponsiveContainer width="100%" minHeight={250}>
      <AreaChart data={chartData} margin={{ top: 8, right: 8, bottom: 0, left: 0 }}>

        {/* The fading gradient fill under the line */}
        <defs>
          <linearGradient id="visitorsGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%"  stopColor="var(--foreground)" stopOpacity={0.4} />
            <stop offset="95%" stopColor="var(--foreground)" stopOpacity={0} />
          </linearGradient>
        </defs>

        <CartesianGrid stroke="var(--grey)" />

        {/* X axis: uses the 'label' field we added above */}
        <XAxis
          dataKey="label"
          tick={{ fill: 'var(--foreground)', fontSize: "1.1rem" }}
          axisLine={false}
          tickLine={false}
        />

        {/* Y axis: just the numbers on the left */}
        <YAxis
          tick={{ fill: 'var(--foreground)', fontSize: "1.1rem" }}
          axisLine={false}
          tickLine={false}
          width={36}
        />

        {/* Hover tooltip */}
        <Tooltip
          contentStyle={{
            background:   'var(--foreground)',
            // border:       '1px solid #2d2d3f',
            borderRadius: ".8rem",
            fontSize:     "1.3rem",
          }}
          labelStyle={{ color: 'var(--grey)' }}
          itemStyle={{ color: 'var(--whiter-smoke)' }}
        />

        {/* The actual line + fill */}
        <Area
          type="monotone"
          dataKey="visitors"
          stroke="var(--foreground)"
          strokeWidth={2}
          fill="url(#visitorsGrad)"
          dot={false}
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}
