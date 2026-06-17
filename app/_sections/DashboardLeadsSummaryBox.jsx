import DashboardLeadsSummaryCard from "./DashboardLeadsSummaryCard";




function DashboardLeadsSummaryBox({leads}) {
  return (
    <div className="leads-summary">
      <div className="col-eq-4">
        {leads.map((item) => (
          <DashboardLeadsSummaryCard
            index={item.id}
            key={item.id}
            heading={item.heading}
            data={item}
            icon={item.icon}
          />
        ))}
      </div>
    </div>
  );
}

export default DashboardLeadsSummaryBox;
