// app/components/analytics/TopPagesTable.jsx
// Simple table of top pages. A table is better than a chart here
// because page paths are text — you want to read them, not compare bars.
// data shape: [{ breakdown_value: '/blog/intro', visitors: 830, views: 1200 }, ...]

// app/components/analytics/TopPagesTable.jsx
"use client";

export default function TopPagesTable({ data }) {
  return (
    <table className="top-pages-table">
      <thead>
        <tr>
          {["Page", "Visitors", "Views"].map((heading) => (
            <th key={heading} className="top-pages-table-head">
              {heading}
            </th>
          ))}
        </tr>
      </thead>

      <tbody>
        {data.map((row, i) => (
          <tr key={i} className="top-pages-table-body">
            {/* field is now 'page' instead of 'breakdown_value' */}
            <td
             className="body-data body-data-1"
            >
              {row.page}
            </td>

            <td className="body-data body-data-2">
              {row.visitors?.toLocaleString()}
            </td>

            <td  className="body-data body-data-2">
              {row.views?.toLocaleString()}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
