"use client";

import { useTransition, useState } from "react";
import { updateCheckList } from "../_lib/products-actions";

function DashboardChecklist({ text, confirmed = false, projectId, field, slug }) {
  // local state tracks the checkbox before the user hits confirm
  const [checked, setChecked] = useState(confirmed);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (e) => {
    e.preventDefault();

    startTransition(async () => {
      const result = await updateCheckList(projectId, slug, field, checked);
      // if (!result.success) console.error(result.error);
    });
  };

  return (
    <div className="section-checklist">
      <h5>{text}</h5>
      <form onSubmit={handleSubmit}>
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => setChecked(e.target.checked)}
        />
        <button
          className="btn-dashboard-primary small"
          disabled={isPending}
        >
          {isPending ? "Saving..." : "Confirm"}
        </button>
      </form>
    </div>
  );
}

export default DashboardChecklist;
