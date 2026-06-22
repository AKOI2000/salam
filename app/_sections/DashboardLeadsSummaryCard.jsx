function DashboardLeadsSummaryCard({ heading, data, icon, index }) {
  const isPositive = data.percentage >= 0;

  return (
    <div className="leads-summary-card">
      <div className="leads-summary-card_figures">
        <h5>{heading}</h5>
        <h3>{data.total}</h3>
      </div>
      <div
        className={`leads-summary-card_icon leads-summary-card_icon--${index}`}
      >
        {icon}
      </div>
      <div className="leads-summary-card_percentage">
        <p
          style={{
            color: isPositive ? "var(--color-green)" : "var(--color-red)",
          }}
        >
          {isPositive ? "+" : ""}
          {data.percentage}% vs last month
        </p>
      </div>
    </div>
  );
}

export default DashboardLeadsSummaryCard;
