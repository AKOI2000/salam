import DashboardChecklist from "../_components/DashboardChecklist";
import { getProjectBySlug } from "../_lib/projectAPI";

async function DashboardSectionCheckList({ params }) {
  const { show_on_homepage, published, id } = await getProjectBySlug(params);

//   console.log(show_on_homepage, published, id);

  return (
    <div className="section-checklist-box">
      <DashboardChecklist
        text={"Do you want the project on the homepage?"}
        confirmed={show_on_homepage}
        projectId={id}
        field="show_on_homepage"
        slug={params}
      />

      <DashboardChecklist
        text={"Is the project done and can be published?"}
        confirmed={published}
        projectId={id}
        field="published"
        slug={params}
      />
    </div>
  );
}

export default DashboardSectionCheckList;
