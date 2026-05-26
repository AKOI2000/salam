// app/components/analytics/TopPagesTable.jsx
// Simple table of top pages. A table is better than a chart here
// because page paths are text — you want to read them, not compare bars.
// data shape: [{ breakdown_value: '/blog/intro', visitors: 830, views: 1200 }, ...]

// app/components/analytics/TopPagesTable.jsx
'use client'

export default function TopPagesTable({ data }) {
  return (
    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
      <thead>
        <tr>
          {['Page', 'Visitors', 'Views'].map(heading => (
            <th
              key={heading}
              style={{
                textAlign:     'left',
                padding:       '8px 12px',
                color:         '#6b7280',
                fontWeight:    600,
                fontSize:      12,
                textTransform: 'uppercase',
                letterSpacing: 0.8,
                borderBottom:  '1px solid #2d2d3f',
              }}
            >
              {heading}
            </th>
          ))}
        </tr>
      </thead>

      <tbody>
        {data.map((row, i) => (
          <tr key={i} style={{ borderBottom: '1px solid #1a1a2a' }}>

            {/* field is now 'page' instead of 'breakdown_value' */}
            <td style={{
              padding:    '11px 12px',
              color:      '#c4b5fd',
              fontFamily: 'monospace',
              fontSize:   13,
            }}>
              {row.page}
            </td>

            <td style={{ padding: '11px 12px', color: '#f1f5f9' }}>
              {row.visitors?.toLocaleString()}
            </td>

            <td style={{ padding: '11px 12px', color: '#9ca3af' }}>
              {row.views?.toLocaleString()}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}