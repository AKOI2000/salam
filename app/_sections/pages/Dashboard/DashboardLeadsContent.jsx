import { isSameMonth, isSameYear, subMonths } from "date-fns";
import { IoMdPerson } from "react-icons/io";
import { IoPeople, IoCall } from "react-icons/io5";
import { FaCheck } from "react-icons/fa";
import DashboardLeadsSummaryBox from "../../DashboardLeadsSummaryBox";
import LeadsTable from "../../LeadsTable";
import { getLeadsApi } from "@/app/_lib/leadsAPI";

async function DashboardLeadsContent() {
  const leads = await getLeadsApi();
  const now = new Date();

  // helper to filter by any month/year
  const filterByMonth = (date) =>
    leads.filter((lead) => {
      const createdAt = new Date(lead.created_at);
      return isSameMonth(createdAt, date) && isSameYear(createdAt, date);
    });

  // this month and last month leads
  const lastMonth = subMonths(now, 1);
  const thisMonthLeads = filterByMonth(now);
  const lastMonthLeads = filterByMonth(lastMonth);

  // calculate % change helper
  const calcChange = (current, previous) => {
    if (previous === 0) return current > 0 ? 100 : 0;
    return Math.round(((current - previous) / previous) * 100);
  };

  // this month vs last month counts
  const thisContacted = leads.filter((l) => l.status === "contacted").length;
  const lastContacted = lastMonthLeads.filter((l) => l.status === "contacted").length;

  const thisConverted = leads.filter((l) => l.status === "converted").length;
  const lastConverted = lastMonthLeads.filter((l) => l.status === "converted").length;

  const data = [
    {
      id: 1,
      heading: "Total Leads",
      total: leads.length,
      percentage: calcChange(leads.length, lastMonthLeads.length),
      icon: <IoPeople />,
    },
    {
      id: 2,
      heading: "Leads This Month",
      total: thisMonthLeads.length,
      percentage: calcChange(thisMonthLeads.length, lastMonthLeads.length),
      icon: <IoMdPerson />,
    },
    {
      id: 3,
      heading: "Contacted Leads",
      total: thisContacted,
      percentage: calcChange(thisContacted, lastContacted),
      icon: <IoCall />,
    },
    {
      id: 4,
      heading: "Converted Leads",
      total: thisConverted,
      percentage: calcChange(thisConverted, lastConverted),
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