"use client";

// import { useEffect, useState } from "react";
import { useDashboard } from "../_context/DashboardContext";

function DashboardHead() {
    const { openSidebar } = useDashboard();
  return (
      <header className="dashboard__header">
        <div className="dashboard__header-left">
          <button
            className="dashboard__menu"
            onClick={openSidebar}
          >
            ☰
          </button>
        </div>

        <div className="dashboard__header-right">
          <div className="dashboard__avatar" />
        </div>
      </header>
  );
}

export default DashboardHead;
