import { getProjectBySlug } from "@/app/_lib/projectAPI";
import DashboardSection from "@/app/_sections/DashboardSection";
import MetaDataForm from "@/app/_sections/MetaDataForm";

async function DashboardProjectContent({ slug }) {
  const project = await getProjectBySlug(slug);
  const { project_metadata, id, project_sections, title } = project;
  return (
    <>
      <DashboardSection params={slug} sections={project_sections} />
      <MetaDataForm params={slug} metadata={project_metadata[0]} id={id} />
    </>
  );
}

export default DashboardProjectContent;
