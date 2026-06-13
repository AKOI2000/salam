// "use client";
import { IoAdd } from "react-icons/io5";

import DashboardHeading from "@/app/_components/DashboardHeading";
import DashboardProducts from "@/app/_sections/DashboardProducts";
import AddProjectForm from "@/app/_components/AddProjectForm";
import { getProjectBySlug, getProjects } from "@/app/_lib/projectAPI";

async function page() {
  const projects = await getProjects();
  // console.log(projects);

  return (
    <>
      <DashboardHeading
        title="Projects"
        action={"Add Projects"}
        icon={<IoAdd />}
      >
        <AddProjectForm />
      </DashboardHeading>

      <DashboardProducts projects={projects} />
    </>
  );
}

export default page;
