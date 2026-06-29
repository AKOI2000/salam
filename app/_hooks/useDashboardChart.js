import { useEffect, useState } from "react";

export function useDashboardChart() {
    const [data, setData] = useState(null);
     const [loading, setLoading] = useState(true);
     const [error, setError] = useState(null);
   
     useEffect(() => {
       fetch("/api/dashboardChart")
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

