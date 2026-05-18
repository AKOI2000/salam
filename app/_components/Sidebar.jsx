"use client";
import { useEffect } from "react";
import { useDashboard } from "../_context/DashboardContext";
import Link from "next/link";
import Image from "next/image";

function Sidebar() {
  const { sidebarOpen, closeSidebar } = useDashboard();
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1024) {
        closeSidebar();
      }
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <>
      {/* MOBILE OVERLAY */}
      <div
        className={`dashboard__overlay ${
          sidebarOpen ? "dashboard__overlay--active" : ""
        }`}
        onClick={closeSidebar}
      />

      {/* SIDEBAR */}
      <aside
        className={`dashboard__sidebar ${
          sidebarOpen ? "dashboard__sidebar--open" : ""
        }`}
      >
        <div className="dashboard__sidebar-top">
          <div className="dashboard__logo">
            <Image
              src={"/MO SALAM-01.png"}
              alt="Mo Salam"
              width={117}
              height={70}
            />
          </div>

          <button className="dashboard__close" onClick={closeSidebar}>
            ✕
          </button>
        </div>

        <nav className="dashboard__nav">
          <Link href="/admin">Overview</Link>
          <Link href="/admin/projects">Projects</Link>
          <Link href="/admin/analytics">Analytics</Link>
          <Link href="/admin/leads">Leads</Link>
          <Link href="/" target="_blank">
            View Website
          </Link>
        </nav>

        <button>Logout</button>
      </aside>
    </>
  );
}

export default Sidebar;
