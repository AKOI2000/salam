import DashboardHeading from "@/app/_components/DashboardHeading";
import { getProjectBySlugAdmin } from "@/app/_lib/projectsAPI";

async function DashboardProjectHeading({ slug }) {
  const project = await getProjectBySlugAdmin(slug);
  return (
    <DashboardHeading title={`Editing: ${project.title}`} />
  );
}

export default DashboardProjectHeading;