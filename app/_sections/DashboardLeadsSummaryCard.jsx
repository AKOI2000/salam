function DashboardLeadsSummaryCard({ heading, data, icon, index }) {
  return (
    <div className="leads-summary-card">
      <div className="leads-summary-card_figures">
        <h5>{heading}</h5>
        <h3>{data.total}</h3>
      </div>
      <div className={`leads-summary-card_icon leads-summary-card_icon--${index}`}>
        {icon}
      </div>
      <div className="leads-summary-card_percentage">
        <p> 18% more vs last month</p>
      </div>
    </div>
  );
}

export default DashboardLeadsSummaryCard;
