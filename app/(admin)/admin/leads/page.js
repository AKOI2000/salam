import DashboardHeading from "@/app/_components/DashboardHeading"
import LeadsTable from "@/app/_sections/LeadsTable"
import DashboardLeadsSummaryBox from "@/app/_sections/DashboardLeadsSummaryBox"

function page() {
    return (
        <>
            <DashboardHeading title="Leads"/>
            <DashboardLeadsSummaryBox />
           <LeadsTable />
        </>
    )
}

export default page
