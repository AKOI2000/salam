import { getProjects } from "@/app/_lib/projectsAPI";
import DashboardProducts from "@/app/_sections/DashboardProducts";

async function DashboardProjectList() {
  const projects = await getProjects();
  return <DashboardProducts projects={projects} />;
}

export default DashboardProjectList;
