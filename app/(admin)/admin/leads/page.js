import DashboardHeading from "@/app/_components/DashboardHeading";
import LeadsPageSkeleton from "@/app/_components/LeadsPageSkeleton";
import DashboardLeadsContent from "@/app/_sections/pages/Dashboard/DashboardLeadsContent";
import { Suspense } from "react";

function page() {
  return (
    <>
      <DashboardHeading title="Leads" />

      <Suspense fallback={<LeadsPageSkeleton />}>
        <DashboardLeadsContent />
      </Suspense>
    </>
  );
}

export default page;
