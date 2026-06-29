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

export const metadata = {
  metadataBase: new URL("https://yoursite.com"), // ← replace with your actual URL
  title: {
    template: "%s | Salam", // ← page titles become "About | Salam" etc
    default: "Salam — Motion Designer",
  },
  description:
    "Motion designer crafting compelling visual stories through film, animation, and digital experiences.",
  keywords: ["motion designer", "animation", "film", "visual storytelling"],
  authors: [{ name: "Salam" }],
  creator: "Salam",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://yoursite.com",
    siteName: "Salam Portfolio",
    title: "Salam — Motion Designer",
    description:
      "Motion designer crafting compelling visual stories through film, animation, and digital experiences.",
    images: [
      {
        // url: "/og-image.jpg", // put this in your public folder
        width: 1200,
        height: 630,
        alt: "Salam Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Salam — Motion Designer",
    description:
      "Motion designer crafting compelling visual stories through film, animation, and digital experiences.",
    // images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
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
