import { getProjects } from "@/app/_lib/projectAPI";
import DashboardOverviewSummaryBox from "../../DashboardOverviewSummaryBox";
import { getLeadsApi } from "@/app/_lib/leadsAPI";
import { isSameMonth, isSameYear, subMonths } from "date-fns";
import { FaCheck, FaFolderOpen } from "react-icons/fa";
import { IoMdPerson } from "react-icons/io";
import { calcChange } from "@/app/_lib/helpers";

async function DashboardOverviewContent() {
  const [projects, leads] = await Promise.all([getProjects(), getLeadsApi()]);
  const now = new Date();
  const lastMonth = subMonths(now, 1);

  const lastMonthLeads = leads.filter((lead) => {
    const createdAt = new Date(lead.created_at);
    return (
      isSameMonth(createdAt, lastMonth) && isSameYear(createdAt, lastMonth)
    );
  });

  const convertedLeads = leads.filter((l) => l.status === "converted").length;
  const lastMonthConverted = lastMonthLeads.filter(
    (l) => l.status === "converted",
  ).length;

  const conversionRate =
    leads.length > 0 ? Math.round((convertedLeads / leads.length) * 100) : 0;

  const lastConversionRate =
    lastMonthLeads.length > 0
      ? Math.round((lastMonthConverted / lastMonthLeads.length) * 100)
      : 0;

  const data = [
    {
      id: 1,
      heading: "Total Projects",
      total: projects.length,
      percentage: null,
      icon: <FaFolderOpen />,
    },
    {
      id: 2,
      heading: "Total Leads",
      total: leads.length,
      percentage: calcChange(leads.length, lastMonthLeads.length),
      icon: <IoMdPerson />,
    },
    {
      id: 3,
      heading: "Conversion Rate",
      total: `${conversionRate}%`,
      percentage: calcChange(conversionRate, lastConversionRate),
      icon: <FaCheck />,
    },
  ];
  return (
    <>
      <DashboardOverviewSummaryBox data={data} />
    </>
  );
}

export default DashboardOverviewContent;
