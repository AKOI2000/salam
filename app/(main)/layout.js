// app/(public)/layout.jsx
import Navbar from "@/app/_components/Navbar";
import Footer from "@/app/_components/Footer";
import Cursor from "@/app/_components/Cursor";
import PostHogProvider from "@/app/context/PostHogProvider";
import PostHogPageView from "@/app/context/PostHogPageView";
import { Suspense } from "react";
import Image from "next/image";

export default function PublicLayout({ children }) {
  return (
    <PostHogProvider>
      <Suspense fallback={null}>
        <PostHogPageView />
      </Suspense>
      <Navbar />
      <Image
        src={"/background-2.jpg"}
        width={1600}
        height={900}
        alt="background"
        className="background"
      />
      <Cursor />
      <main>{children}</main>
      <Footer />
    </PostHogProvider>
  );
}
