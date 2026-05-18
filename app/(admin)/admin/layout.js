import { Geist, Geist_Mono } from "next/font/google";
import "@/app/index.css";
import Sidebar from "@/app/_components/Sidebar";
import DashboardHead from "@/app/_components/DashboardHead";
import { DashboardProvider } from "@/app/_context/DashboardContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Salam Portfolio",
  description: "Salam Portfolio ",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
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
