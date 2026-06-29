// app/(admin)/layout.jsx
import { Toaster } from "react-hot-toast";
import "@/app/index.css";
import Sidebar from "@/app/_components/Sidebar";
import DashboardHead from "@/app/_components/DashboardHead";
import { DashboardProvider } from "@/app/_context/DashboardContext";

export const metadata = {
  title: {
    default: "Admin Dashboard",
    template: "%s | Dashboard",
  },
  description: "Admin Dashboard || Salam",
};

export default function AdminLayout({ children }) {
  return (
    <>
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 4000,
          style: {
            fontSize: "1.6rem",
            padding: "1.2rem 2rem",
            minWidth: "300px",
          },
          success: {
            style: {
              background: "var(--white-smoke)",
              color: "var(--foreground-light)",
            },
          },
          error: {
            style: {
              background: "var(--color-red)",
              color: "#fff",
            },
          },
        }}
      />
      <DashboardProvider>
        <div className="dashboard">
          <Sidebar />
          <div className="dashboard__main">
            <DashboardHead />
            <main className="dashboard__content">{children}</main>
          </div>
        </div>
      </DashboardProvider>
    </>
  );
}
