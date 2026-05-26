import AnalyticsDashboard from "@/app/_components/analytics/AnalyticsDashboard";
import DashboardHeading from "@/app/_components/DashboardHeading";

function page() {
  return (
    <>
      <DashboardHeading title="Analytics" />
      <AnalyticsDashboard />
    </>
  );
}

export default page;
