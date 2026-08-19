import { getProjectBySlugAdmin } from "@/app/_lib/projectsAPI";
import BlockEditor from "@/app/_sections/BlockEditor";
import MetaDataForm from "@/app/_sections/MetaDataForm";
import DashboardChecklist from "@/app/_components/DashboardChecklist";

async function DashboardProjectContent({ slug }) {
  const project = await getProjectBySlugAdmin(slug);
  const { metadata, id, blocks, title, featured, published } = project;

  return (
    <>
      <BlockEditor projectId={id} slug={slug} initialBlocks={blocks} />
      <MetaDataForm params={slug} metadata={metadata} id={id} />

      <div className="section-checklist-box">
        <DashboardChecklist
          text={"Do you want the project on the homepage?"}
          confirmed={featured}
          projectId={id}
          field="featured"
          slug={slug}
        />
        <DashboardChecklist
          text={"Is the project done and can be published?"}
          confirmed={published}
          projectId={id}
          field="published"
          slug={slug}
        />
      </div>
    </>
  );
}

export default DashboardProjectContent;