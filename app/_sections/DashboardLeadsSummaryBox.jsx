import DashboardLeadsSummaryCard from "./DashboardLeadsSummaryCard";
import { IoMdPerson } from "react-icons/io";
import { IoPeople, IoCall } from "react-icons/io5";
import { FaCheck } from "react-icons/fa";

const data = [
  {
    id: 1,
    heading: "Total Leads",
    total: 120,
    icon: <IoPeople />,
  },
  {
    id: 2,
    heading: "Leads This Month",
    total: 50,
    icon: <IoMdPerson />,
  },
  {
    id: 3,
    heading: "Contacted Leads",
    total: 100,
    icon: <IoCall />,
  },
  {
    id: 4,
    heading: "Converted Leads",
    total: 45,
    icon: <FaCheck />,
  },
];

function DashboardLeadsSummaryBox() {
  return (
    <div className="leads-summary">
      <div className="col-eq-4">
        {data.map((item) => (
          <DashboardLeadsSummaryCard
            index={item.id}
            key={item.id}
            heading={item.heading}
            data={item}
            icon={item.icon}
          />
        ))}
      </div>
    </div>
  );
}

export default DashboardLeadsSummaryBox;
