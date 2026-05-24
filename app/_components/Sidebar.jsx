"use client";
import {
  IoHomeOutline,
  IoBarChartSharp,
  IoPeopleOutline,
} from "react-icons/io5";
import { GrProjects } from "react-icons/gr";
import { CgWebsite } from "react-icons/cg";
import { useEffect } from "react";
import { useDashboard } from "../_context/DashboardContext";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const sideLinks = [
  {
    path: "/admin",
    name: "Overview",
    icon: <IoHomeOutline />,
  },
  {
    path: "/admin/projects",
    name: "Projects",
    icon: <GrProjects />,
  },
  {
    path: "/admin/analytics",
    name: "Analytics",
    icon: <IoBarChartSharp />,
  },
  {
    path: "/admin/leads",
    name: "Leads",
    icon: <IoPeopleOutline />,
  },
  {
    path: "/",
    name: "View Site",
    target: "_blank",
    icon: <CgWebsite />,
  },
];

function Sidebar() {
  const { sidebarOpen, closeSidebar } = useDashboard();
  const pathname = usePathname();
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
          {sideLinks.map((link, index) => (
            <Link
              key={index}
              href={link.path}
              target={link.target}
              className={pathname === link.path ? "active" : ""}
            >
              {link.icon}
              {link.name}
            </Link>
          ))}
        </nav>

        <button className="btn-dashboard-primary">Logout</button>
      </aside>
    </>
  );
}

export default Sidebar;
