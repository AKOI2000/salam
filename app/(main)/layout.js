// app/(public)/layout.jsx
import Navbar from "@/app/_components/Navbar";
import Footer from "@/app/_components/Footer";
import Cursor from "@/app/_components/Cursor";
import PostHogProvider from "@/app/context/PostHogProvider";
import PostHogPageView from "@/app/context/PostHogPageView";
import { Suspense } from "react";

export default function PublicLayout({ children }) {
  return (
    <PostHogProvider>
      <Suspense fallback={null}>
        <PostHogPageView />
      </Suspense>
      <Navbar />
      <Cursor />
      <main>{children}</main>
      <Footer />
    </PostHogProvider>
  );
}
