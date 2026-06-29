
import DashboardHeading from "@/app/_components/DashboardHeading";
import DashboardOverviewSections from "@/app/_sections/DashboardOverviewSections";
import DashboardOverviewContent from "@/app/_sections/pages/Dashboard/DashboardOverviewContent";


function page() {
  return (
    <>
      <DashboardHeading title="Overview" />

      <DashboardOverviewContent />
      <DashboardOverviewSections />
     
    </>
  );
}

export default page;
