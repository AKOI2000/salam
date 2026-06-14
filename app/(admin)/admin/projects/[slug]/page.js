import DashboardSectionCheckList from "@/app/_sections/DashboardSectionCheckList";
import DashboardProjectContent from "@/app/_sections/pages/Dashboard/DashboardProjectContent";
import DashboardProjectHeading from "@/app/_sections/pages/Dashboard/DashboardProjectHeading";
import ProjectPageSkeleton from "@/app/_components/ProjectPageSkeleton";
import { Suspense } from "react";

async function page({ params }) {
  const { slug } = await params;

  return (
    <Suspense fallback={<ProjectPageSkeleton />}>
      <DashboardProjectHeading slug={slug} />
      <DashboardProjectContent slug={slug} />
      <DashboardSectionCheckList params={slug} />
    </Suspense>
  );
}

export default page;
