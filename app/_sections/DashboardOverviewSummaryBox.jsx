import AnalyticsOverviewCard from "../_components/AnalyticsOverviewCard";
import DashboardLeadsSummaryCard from "./DashboardLeadsSummaryCard";

function DashboardOverviewSummaryBox({ data }) {
  return (
    <div className="leads-summary">
      <div className="col-eq-4">
        <AnalyticsOverviewCard />
        {data.map((item) => (
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

export default DashboardOverviewSummaryBox;
