"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { CHART_COLORS } from "../../_lib/analyticsUtils";

export default function CountriesChart({ data }) {
  return (
    // Fix 2 — minHeight was causing the half-screen issue on mobile
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        data={data}
        // Fix 1 — remove layout="vertical" to make it vertical bars
        margin={{ left: 8, right: 8, top: 16, bottom: 0 }}
      >
        <XAxis
          type="category"
          dataKey="country"
          tick={{ fill: "var(--foreground)", fontSize: "1.1rem" }}
          axisLine={false}
          tickLine={false}
          // truncate long country names on small screens
          tickFormatter={(value) =>
            value.length > 8 ? `${value.slice(0, 8)}...` : value
          }
        />

        <YAxis
          type="number"
          tick={{ fill: "var(--foreground)", fontSize: "1.1rem" }}
          axisLine={false}
          tickLine={false}
          width={40}
        />

        <Tooltip
          contentStyle={{
            background: "#1e1e2e",
            border: "1px solid #2d2d3f",
            borderRadius: 8,
            fontSize: 13,
          }}
          labelStyle={{ color: "#94a3b8" }}
          itemStyle={{ color: "#f1f5f9" }}
        />

        {/* Fix 1 — radius now applies to top corners for vertical bars */}
        <Bar dataKey="visitors" radius={[4, 4, 0, 0]}>
          {data.map((_, i) => (
            <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}