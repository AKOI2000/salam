"use client";

import { useDashboardChart } from "@/app/_hooks/useDashboardChart";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import AnalyticsPageSkeleton from "../AnalyticsPageSkeleton";

function MultipleLineChart() {
  const { data, loading, error } = useDashboardChart();
  if (loading) {
    return (
      <div className="analytics-dashboard">
        <AnalyticsPageSkeleton />
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
  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart data={data}>
        <defs>
          <linearGradient id="visitorsGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="var(--foreground)" stopOpacity={0.4} />
            <stop offset="95%" stopColor="var(--foreground)" stopOpacity={0} />
          </linearGradient>

          <linearGradient id="leadsGrad" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="5%"
              stopColor="var(--color-accent)"
              stopOpacity={0.4}
            />
            <stop
              offset="95%"
              stopColor="var(--color-accent)"
              stopOpacity={0}
            />
          </linearGradient>

          <linearGradient id="projectsGrad" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="5%"
              stopColor="var(--darker-grey)"
              stopOpacity={0.4}
            />
            <stop offset="95%" stopColor="var(--darker-grey)" stopOpacity={0} />
          </linearGradient>
        </defs>

        <CartesianGrid stroke="var(--grey)" />
        <XAxis dataKey="Date" />

        <YAxis
          axisLine={false}
          tickLine={false}
          tick={{ fill: "var(--foreground)", fontSize: "1.1rem" }}
        />

        <Legend iconType="rect" />

        <Tooltip
          contentStyle={{
            background: "var(--foreground)",
            border: "1px solid #2d2d3f",
            borderRadius: ".8rem",
            fontSize: "1.3rem",
          }}
          labelStyle={{ color: "var(--grey)" }}
          itemStyle={{ color: "var(--whiter-smoke)" }}
        />

        <Area
          type="monotone"
          dataKey="Visitors"
          stroke="var(--foreground)"
          fill="url(#visitorsGrad)"
          strokeWidth={2}
        />

        <Area
          type="monotone"
          dataKey="Leads"
          stroke="var(--color-accent)"
          fill="url(#leadsGrad)"
          strokeWidth={2}
        />

        <Area
          type="monotone"
          dataKey="Projects"
          stroke="var(--color-accent)"
          fill="url(#projectsGrad)"
          strokeWidth={2}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export default MultipleLineChart;
