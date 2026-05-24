import { format } from "date-fns";
import LeadsDetailSelect from "../_components/LeadsDetailSelect";
function LeadsDetail({ data }) {
  const date = new Date(data.date);
  const formattedDate = format(date, "MMMM d, yyyy");
  return (
    <div className="lead-details">
      <h3>{data.name}</h3>
      <div className="lead-details-info">
        <p>
          <span>Email:</span> {data.email}
        </p>
        <p>
          <span>Phone:</span> {data.phone}
        </p>
        <p>
          <span>Date:</span> {formattedDate}
        </p>
      </div>
      <p className="message">
        <span>Message:</span> {data.message}
      </p>


      <LeadsDetailSelect status={data.status} />
    </div>
  );
}

export default LeadsDetail;
