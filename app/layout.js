// app/layout.jsx
import { Inter } from "next/font/google";
import Script from "next/script";
import "@/app/globals.css";
import "@/app/index.css";
import { Toaster } from "react-hot-toast";
import { ViewTransitions } from "next-view-transitions";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const businessSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Salam",
  image: "https://www.moosalam.com/Salam.png",
  url: "https://www.moosalam.com",
  telephone: "+2348162074132",
  description:
    "Salam is a motion designer and creative professional creating brand motion, animation, graphic design, and digital experiences for businesses and modern brands.",
  areaServed: "Worldwide",
  sameAs: [
    "https://www.instagram.com/og.salam/",
    "https://x.com/mo_abdulsalam1",
    "https://www.linkedin.com/in/abdulsalam-mohammed-06084a174/",
    "https://www.behance.net/abdulsamohamme2",
  ],
  priceRange: "$$",
  founder: {
    "@type": "Person",
    name: "Salam",
    jobTitle: "Motion Designer",
  },
};

export const metadata = {
  metadataBase: new URL("https://www.moosalam.com"),
  title: {
    default: "Salam | Motion Designer",
    template: "%s | Salam",
  },
  description:
    "Salam is a motion designer creating cinematic brand stories, digital experiences, and visuals that move audiences.",
  keywords: [
    "motion designer",
    "brand animation",
    "graphic design",
    "web design",
    "creative direction",
    "Salam",
  ],
  openGraph: {
    siteName: "Salam",
    type: "website",
    locale: "en_US",
    title: "Salam | Motion Designer",
    description:
      "Salam creates motion-first brand experiences, digital visuals, and design systems for modern businesses.",
    url: "https://www.moosalam.com",
    images: [
      {
        url: "/Salam.png",
        width: 1200,
        height: 630,
        alt: "Salam logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Salam | Motion Designer",
    description:
      "Salam creates motion-first brand experiences, digital visuals, and design systems for modern businesses.",
    images: ["/Salam.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable}`} data-scroll-behavior="smooth">
      <body>
        <Script
          id="business-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(businessSchema) }}
        />

        <ViewTransitions>
          {children}
        </ViewTransitions>
      </body>
    </html>
  );
}