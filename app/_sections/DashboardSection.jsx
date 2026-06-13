import DashboardSectionRow from "../_components/DashboardSectionRow";

function DashboardSection({params, sections}) {  
  return (
    <div className="table-wrapper">
      <div className="sections-table">
        <div className="sections-table-header">
          <p>Section Type</p>
          <p>text</p>
          <p>Media</p>
        </div>

        {sections?.map((section, index) => (
          <DashboardSectionRow key={index} section={section} params={params} />
        ))}
      </div>
    </div>
  );
}

export default DashboardSection;
