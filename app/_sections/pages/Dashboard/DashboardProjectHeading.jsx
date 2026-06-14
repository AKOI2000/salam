import AddSectionForm from "@/app/_components/AddSectionForm";
import DashboardHeading from "@/app/_components/DashboardHeading";
import { getProjectBySlug } from "@/app/_lib/projectAPI";
import { IoAdd } from "react-icons/io5";

async function DashboardProjectHeading({ slug }) {
  const { id } = await getProjectBySlug(slug);
  return (
    <>
      <DashboardHeading
        title={`More about the project: ${slug}`}
        action={"Add Section"}
        icon={<IoAdd />}
      >
        <AddSectionForm id={id} slug={slug} />
      </DashboardHeading>
    </>
  );
}

export default DashboardProjectHeading;
