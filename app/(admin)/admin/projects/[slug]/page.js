import AddSectionForm from "@/app/_components/AddSectionForm";
import DashboardHeading from "@/app/_components/DashboardHeading";
import DashboardSection from "@/app/_sections/DashboardSection";
import DashboardSectionCheckList from "@/app/_sections/DashboardSectionCheckList";
import MetaDataForm from "@/app/_sections/MetaDataForm";
import { IoAdd } from "react-icons/io5";

async function page({ params }) {
  const { slug } = await params;

  return (
    <>
      <DashboardHeading
        title={`${slug} project`}
        action={"Add Section"}
        icon={<IoAdd />}
      >
        <AddSectionForm />
      </DashboardHeading>

      <DashboardSection />
      <MetaDataForm />
      <DashboardSectionCheckList />
    </>
  );
}

export default page;
