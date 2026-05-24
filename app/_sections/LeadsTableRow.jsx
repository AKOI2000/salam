import LeadsTableRowButtons from "./LeadsTableRowButtons";
import { formatDistanceToNow } from 'date-fns'


function LeadsTableRow({ data }) {
  const date = new Date(data.date);
  const formattedDate = formatDistanceToNow(date, { addSuffix: true });
  return (
    <div className="leads-table-row">
      <p>{data.name}</p>
      <a href={`mailto:${data.email}`}>{data.email}</a>
      <a href={`tel:${data.phone}`}>{data.phone}</a>
      <p>{formattedDate}</p>
      <p className={`status ${data.status}`}>{data.status}</p>
      <LeadsTableRowButtons data={data} />
    </div>
  );
}

export default LeadsTableRow;
