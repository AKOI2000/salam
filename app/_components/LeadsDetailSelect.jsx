"use client";

import { useState, useTransition } from "react";
import { updateLeadStatus } from "../_lib/leads-actions";

const STATUSES = ["new", "contacted", "converted"];

function LeadsDetailSelect({ id, status, close }) {
  const [selected, setSelected] = useState(status);
  const [isPending, startTransition] = useTransition();

  const handleUpdate = () => {
    startTransition(async () => {
      const result = await updateLeadStatus(id, selected);
      if (!result.success) console.error(result.error);

      if (result.success) {
        close?.(); // close the modal after successful update
      }
    });
  };

  return (
    <div className="lead-details-select">
      <div className="section-type-box">
        {STATUSES.map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => setSelected(s)}
            className={selected === s ? "selected" : "inactive"}
          >
            {s.charAt(0).toUpperCase() + s.slice(1)}{" "}
            {/* capitalizes first letter */}
          </button>
        ))}
      </div>

      <button
        type="button"
        onClick={handleUpdate}
        disabled={isPending || selected === status}
        className="btn-dashboard-primary btn"
      >
        {isPending ? "Updating..." : "Update Status"}
      </button>
    </div>
  );
}

export default LeadsDetailSelect;
