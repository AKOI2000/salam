// app/lib/analyticsUtils.js
// Pure helper functions — no React, no imports.
// Easy to test, easy to reuse anywhere.

// ── Format seconds → "3m 5s" or "45s" ────────────────────────────────────
export function fmtSeconds(s) {
  const secs = Math.round(s ?? 0)   // ← round FIRST, then format
  if (secs < 60) return `${secs}s`
  const mins = Math.floor(secs / 60)
  const rem  = secs % 60
  return rem > 0 ? `${mins}m ${rem}s` : `${mins}m`
}

// ── Calculate % change between two numbers ────────────────────────────────
// Returns e.g. 12.3 or -5.7 — or null if there's no previous value to compare
export function percentChange(current, prev) {
  if (!prev || prev === 0) return null
  return ((current - prev) / prev) * 100
}

// ── Format a number with commas: 12500 → "12,500" ────────────────────────
export function fmtNumber(n) {
  return (n ?? 0)?.toLocaleString()
}

// ── Format bounce rate: 0.34 → "34%" ─────────────────────────────────────
export function fmtPercent(n) {
  return `${Math.round((n ?? 0) * 100)}%`
}

// ── Bar chart colors — cycles if there are more than 10 items ─────────────
export const CHART_COLORS = [
  '#6366f1', '#8b5cf6', '#a78bfa', '#c4b5fd',
  '#818cf8', '#4f46e5', '#7c3aed', '#5b21b6',
  '#4338ca', '#3730a3',
]


