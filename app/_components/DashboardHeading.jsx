"use client";

// import Link from "next/link";
import Modal from "@/app/_components/Modal";
function DashboardHeading({ title, desc, action, icon, children }) {
  return (
    <div className="dashboard-heading_flex">
      <div className="dashboard-head">
        <h2>{title}</h2>
        {desc && <p>{desc}</p>}
      </div>
      {action && (
        <Modal>
          <Modal.Open opens={action}>
            <button className="btn-dashboard-primary">
              {icon} {action}
            </button>
          </Modal.Open>

          <Modal.Window name={action}>{children}</Modal.Window>
        </Modal>
      )}
    </div>
  );
}

export default DashboardHeading;
