import { id } from "date-fns/locale";
import LeadsTableRow from "./LeadsTableRow";

const data = [
  {
    id: 1,
    name: "John Doe",
    email: "johndoe@gmail.com",
    phone: "123-456-7890",
    date: "2023-10-01",
    status: "contacted",
    message:
      "Hello, I'm interested in your product. Can you provide more information?",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "janesmith@gmail.com",
    phone: "987-654-3210",
    date: "2026-05-23",
    status: "new",
    message: "I'm interested in learning more about your services.",
  },
  {
    id: 3,
    name: "Bob Johnson",
    email: "bobjohnson@gmail.com",
    phone: "555-123-4567",
    date: "2026-03-03",
    status: "converted",
    message: "I'd like to schedule a demo.",
  },
  {
    id: 4,
    name: "Alice Williams",
    email: "alicewilliams@gmail.com",
    phone: "444-987-6543",
    date: "2026-03-04",
    status: "contacted",
    message: "Can you provide pricing information?",
  },
  {
    id: 5,
    name: "Michael Brown",
    email: "michaelbrown@gmail.com",
    phone: "333-222-1111",
    date: "2024-10-05",
    status: "new",
    message:
      "I'm interested in your product. Can you tell me more about it? lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
];

function LeadsTable() {
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
        {data.map((row) => (
          <LeadsTableRow key={row.id} data={row} />
        ))}
      </div>
    </div>
  );
}

export default LeadsTable;
