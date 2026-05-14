import { Inter } from "next/font/google";
import "@/app/index.css";
import "@/app/globals.css";
import Navbar from "@/app/_components/Navbar";
import Footer from "@/app/_components/Footer";
import Cursor from "@/app/_components/Cursor";
import { ViewTransitions } from "next-view-transitions";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
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
    <html lang="en" className={`${inter.variable}`}>
      <body>
        <ViewTransitions>
          <Navbar />
          <Cursor />
          <main style={{}}>{children}</main>
          <Footer />
        </ViewTransitions>
      </body>
    </html>
  );
}
// height: "100dvh", display: "flex", justifyContent: "center", alignItems: "center"
