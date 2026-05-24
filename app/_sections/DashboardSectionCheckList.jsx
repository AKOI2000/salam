import DashboardChecklist from "../_components/DashboardChecklist"

function DashboardSectionCheckList() {
    return (
        <div className="section-checklist-box">
           <DashboardChecklist text={"Do you want the project on the homepage?"} confirmed={false}/>

           <DashboardChecklist text={"Is the project done and can be published?"} confirmed={true}/>
        </div>
    )
}

export default DashboardSectionCheckList
