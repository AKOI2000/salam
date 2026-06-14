import { getProjects } from "@/app/_lib/projectAPI";
import DashboardProducts from "@/app/_sections/DashboardProducts";

async function DashboardProjectList() {
  const projects = await getProjects();
  return <DashboardProducts projects={projects} />;
}

export default DashboardProjectList;
