import { id } from "date-fns/locale";
import LeadsTableRow from "./LeadsTableRow";

function LeadsTable({leads}) {
  return (
    <div className="table-wrapper">
      <div className="leads-table">
        <div className="leads-table-header">
          <p>Name</p>
          <p>Email</p>
          <p>Phone</p>
          <p>Date</p>
          <p>Status</p>
          <div></div>
        </div>
        {leads.map((row) => (
          <LeadsTableRow key={row.id} data={row} />
        ))}
      </div>
    </div>
  );
}

export default LeadsTable;
