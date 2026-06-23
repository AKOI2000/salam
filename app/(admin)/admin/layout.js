import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "@/app/index.css";
import Sidebar from "@/app/_components/Sidebar";
import DashboardHead from "@/app/_components/DashboardHead";
import { DashboardProvider } from "@/app/_context/DashboardContext";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata = {
  title: "Salam Portfolio",
  description: "Salam Portfolio ",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable}`}>
      <body>
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
      </body>
    </html>
  );
}
