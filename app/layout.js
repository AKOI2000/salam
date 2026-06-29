// app/layout.jsx
import { Inter } from "next/font/google";
import "@/app/globals.css";
import "@/app/index.css";
import { Toaster } from "react-hot-toast";
import { ViewTransitions } from "next-view-transitions";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: {
    default: "Salam — Motion Designer",
    template: "%s | Salam",
  },
  description: "Motion designer crafting compelling visual stories.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable}`} data-scroll-behavior="smooth">
      <body>
        <ViewTransitions>
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
          {children}
        </ViewTransitions>
      </body>
    </html>
  );
}