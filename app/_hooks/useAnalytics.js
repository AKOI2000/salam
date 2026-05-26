// app/hooks/useAnalytics.js
// Keeps all data-fetching logic in one place.
// Any component that needs analytics just calls this hook —
// no copy-pasting fetch logic around your codebase.

import { useEffect, useState } from "react";

export function useAnalytics() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("/api/analytics")
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((json) => {
        setData(json);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []); // empty array = run once on mount

  return { data, loading, error };
}
