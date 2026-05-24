// "use client";
import { IoAdd } from "react-icons/io5";

import DashboardHeading from "@/app/_components/DashboardHeading";
import DashboardProducts from "@/app/_sections/DashboardProducts";
import AddProjectForm from "@/app/_components/AddProjectForm";

function page() {
  return (
    <>
      <DashboardHeading
        title="Projects"
        action={"Add Projects"}
        icon={<IoAdd />}
      >
        <AddProjectForm />
      </DashboardHeading>

      <DashboardProducts />
    </>
  );
}

export default page;
