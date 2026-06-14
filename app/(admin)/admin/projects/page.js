// "use client";
import { IoAdd } from "react-icons/io5";

import DashboardHeading from "@/app/_components/DashboardHeading";
import AddProjectForm from "@/app/_components/AddProjectForm";
import { Suspense } from "react";
import DashboardProjectList from "@/app/_sections/pages/Dashboard/DashboardProjectList";
import ProjectsPageSkeleton from "@/app/_components/ProjectsPageSkeleton";

function page() {
  return (
    <>
      <DashboardHeading
        title="Projects"
        action={"Add Projects"}
        icon={<IoAdd />}
      >
        <AddProjectForm />
      </DashboardHeading>

      <Suspense fallback={<ProjectsPageSkeleton />}>
        <DashboardProjectList />
      </Suspense>
    </>
  );
}

export default page;
