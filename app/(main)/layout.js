import { Inter } from "next/font/google";
import "@/app/globals.css";
import "@/app/index.css";
import Navbar from "@/app/_components/Navbar";
import Footer from "@/app/_components/Footer";
import Cursor from "@/app/_components/Cursor";
import { ViewTransitions } from "next-view-transitions";
import PostHogProvider from "../_context/PostHogProvider";
import PostHogPageView from "../_context/PostHogPageView";
import { Suspense } from "react";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export const metadata = {
  title: "Salam Portfolio",
  description: "Salam Portfolio ",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${inter.variable}`}
      data-scroll-behavior="smooth"
    >
      <body>
        <PostHogProvider>
          <Suspense fallback={null}>
            <PostHogPageView />
          </Suspense>

          <ViewTransitions>
            <Navbar />
            <Cursor />
            <main style={{}}>{children}</main>
            <Footer />
          </ViewTransitions>
        </PostHogProvider>
      </body>
    </html>
  );
}
// height: "100dvh", display: "flex", justifyContent: "center", alignItems: "center"
