// app/components/analytics/StatCard.jsx
// A single KPI tile: shows a number, a label, and a % change badge.
// Fully self-contained — just pass it numbers.

import { percentChange } from "@/app/_lib/analyticsUtils";
import { IoMdArrowDropup, IoMdArrowDropdown } from "react-icons/io";

// The ▲/▼ badge
function Delta({ current, prev }) {
  const diff = percentChange(current, prev);
  if (diff === null || diff === 0) return null;

  const up = diff > 0;
  // const arrow = up ? <IoMdArrowDropup /> : <IoMdArrowDropdown />;

  return (
    <span
      className={`${diff < 0 ? "negative" : ""} ${diff > 0 ? "positive" : ""}`}
    >
      {up && <IoMdArrowDropup />} {diff < 0 && <IoMdArrowDropdown />}{" "}
      {Math.abs(diff).toFixed(1)}%
    </span>
  );
}

// format is an optional function — defaults to plain number with commas
export default function StatCard({ label, value, prev, format }) {
  const display = format ? format(value) : value?.toLocaleString();
  const prevDisplay = format ? format(prev) : prev?.toLocaleString();

  return (
    <div className="stat-card">
      {/* Label */}
      <div className="stat-card-label">{label}</div>

      {/* Main number + delta badge */}
      <div className="stat-card-digit">
        {display}
        <Delta current={value} prev={prev} />
      </div>

      {/* Previous month reference */}
      <div style={{ color: "#4b5563", fontSize: 12, marginTop: 6 }}>
        Last month: {prevDisplay}
      </div>
    </div>
  );
}
