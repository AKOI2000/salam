import MultipleLineChart from "../_components/analytics/MultipleLineChart";
import QuickActions from "../_components/QuickActions";
import RecentActivity from "../_components/RecentActivity";

function DashboardOverviewSections() {
  return (
    <div className="section-flex">
      <RecentActivity />
      <QuickActions />
      <div className="overview-graph">
        <h6>Performance snapshot</h6>
        <MultipleLineChart />
      </div>
    </div>
  );
}

export default DashboardOverviewSections;
