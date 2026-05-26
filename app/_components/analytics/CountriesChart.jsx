// app/components/analytics/CountriesChart.jsx
// Horizontal bar chart of top countries by visitors.
// data shape: [{ breakdown_value: 'United States', visitors: 2100, views: 5400 }, ...]

// app/components/analytics/CountriesChart.jsx
'use client'

import {
  BarChart, Bar,
  XAxis, YAxis,
  CartesianGrid, Tooltip,
  ResponsiveContainer, Cell,
} from 'recharts'
import { CHART_COLORS } from '../../_lib/analyticsUtils'

export default function CountriesChart({ data }) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        data={data}
        layout="vertical"
        margin={{ left: 8, right: 32, top: 0, bottom: 0 }}
      >
        <CartesianGrid stroke="#2d2d3f" strokeDasharray="3 3" horizontal={false} />

        <XAxis
          type="number"
          tick={{ fill: '#6b7280', fontSize: 11 }}
          axisLine={false}
          tickLine={false}
        />

        {/* field is now 'country' instead of 'breakdown_value' */}
        <YAxis
          type="category"
          dataKey="country"
          tick={{ fill: '#9ca3af', fontSize: 12 }}
          axisLine={false}
          tickLine={false}
          width={120}
        />

        <Tooltip
          contentStyle={{
            background:   '#1e1e2e',
            border:       '1px solid #2d2d3f',
            borderRadius: 8,
            fontSize:     13,
          }}
          labelStyle={{ color: '#94a3b8' }}
          itemStyle={{ color: '#f1f5f9' }}
        />

        <Bar dataKey="visitors" radius={[0, 4, 4, 0]}>
          {data.map((_, i) => (
            <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  )
}