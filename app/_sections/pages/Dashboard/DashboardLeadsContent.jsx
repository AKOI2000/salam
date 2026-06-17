import { isSameMonth, isSameYear } from "date-fns";
import { IoMdPerson } from "react-icons/io";
import { IoPeople, IoCall } from "react-icons/io5";
import { FaCheck } from "react-icons/fa";
import DashboardLeadsSummaryBox from "../../DashboardLeadsSummaryBox";
import LeadsTable from "../../LeadsTable";
import { getLeadsApi } from "@/app/_lib/leadsAPI";

async function DashboardLeadsContent() {
  const leads = await getLeadsApi();
  const now = new Date();

  const data = [
    {
      id: 1,
      heading: "Total Leads",
      total: leads.length,
      icon: <IoPeople />,
    },
    {
      id: 2,
      heading: "Leads This Month",
      total: leads.filter((lead) => {
        const createdAt = new Date(lead.created_at);
        return isSameMonth(createdAt, now) && isSameYear(createdAt, now);
      }).length,
      icon: <IoMdPerson />,
    },
    {
      id: 3,
      heading: "Contacted Leads",
      total: leads.filter((lead) => lead.status === "contacted").length,
      icon: <IoCall />,
    },
    {
      id: 4,
      heading: "Converted Leads",
      total: leads.filter((lead) => lead.status === "converted").length,
      icon: <FaCheck />,
    },
  ];

  return (
    <>
      <DashboardLeadsSummaryBox leads={data} />
      <LeadsTable leads={leads} />
    </>
  );
}

export default DashboardLeadsContent;