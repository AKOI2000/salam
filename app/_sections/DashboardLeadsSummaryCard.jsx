function DashboardLeadsSummaryCard({ heading, data, icon, index }) {
  const isPositive = data.percentage > 0;

  return (
    <div className="leads-summary-card">
      <div className="leads-summary-card_figures">
        <h6>{heading}</h6>
        <h4>{data.total}</h4>
      </div>
      <div
        className={`leads-summary-card_icon leads-summary-card_icon--${index}`}
      >
        {icon}
      </div>
      <div className="leads-summary-card_percentage">
        {isPositive && (
          <p>
            <span
              style={{
                color: "var(--color-green)",
                marginRight: ".2rem",
              }}
            >
              + {data.percentage}%
            </span>
            vs last month
          </p>
        )}
        {data.percentage < 0 && (
          <p>
            <span
              style={{
                color: "var(--color-red)",
                marginRight: ".2rem",
              }}
            >
              - {data.percentage}%
            </span>
            vs last month
          </p>
        )}

        {data.percentage == 0 && (
          <p>
            <span>{data.percentage}%</span> vs last month
          </p>
        )}
      </div>
    </div>
  );
}

export default DashboardLeadsSummaryCard;
