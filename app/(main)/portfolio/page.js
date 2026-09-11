import WorksHero from "@/app/_sections/WorksHero";

// app/portfolio/page.jsx
export const metadata = {
  title: "Portfolio",
  description:
    "Explore Salam's selected motion design, branding, and digital creative work across campaigns, visuals, and storytelling projects.",
  openGraph: {
    url: "https://www.moosalam.com/portfolio",
    images: [{ url: "/Salam.png", width: 1200, height: 630, alt: "Salam logo" }],
  },
};

function page() {
  return (
    <>
      <WorksHero />
    </>
  );
}

export default page;
