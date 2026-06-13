import AddSectionForm from "@/app/_components/AddSectionForm";
import DashboardHeading from "@/app/_components/DashboardHeading";
import { getProjectBySlug } from "@/app/_lib/projectAPI";
import DashboardSection from "@/app/_sections/DashboardSection";
import DashboardSectionCheckList from "@/app/_sections/DashboardSectionCheckList";
import MetaDataForm from "@/app/_sections/MetaDataForm";
import { IoAdd } from "react-icons/io5";

async function page({ params }) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  const { project_metadata, id, project_sections, title } = project;


  return (
    <>
      <DashboardHeading
        title={`${title} project`}
        action={"Add Section"}
        icon={<IoAdd />}
      >
        <AddSectionForm id={id} slug={slug} />
      </DashboardHeading>

      <DashboardSection params={slug} sections={project_sections} />
      <MetaDataForm params={slug} metadata={project_metadata[0]} id={id} />
      <DashboardSectionCheckList params={slug} />
    </>
  );
}

export default page;
