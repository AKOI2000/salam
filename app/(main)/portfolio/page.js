import WorksHero from "@/app/_sections/WorksHero";

// app/portfolio/page.jsx
export const metadata = {
  title: "Portfolio",
  description:
    "Explore Salam's selected works — brand films, social assets, and motion design projects.",
  openGraph: {
    url: "https://yoursite.com/portfolio",
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
