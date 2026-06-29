import Overflowspread from "@/app/_components/OverflowSpread";
import AboutHero from "@/app/_sections/AboutHero";
import AboutServices from "@/app/_sections/AboutServices";
import FAQs from "@/app/_sections/FAQs";

// app/about/page.jsx
export const metadata = {
  title: "About",
  description:
    "Learn more about Salam — a motion designer with a passion for visual storytelling.",
  openGraph: {
    url: "https://yoursite.com/about",
  },
};

function About() {
  return (
    <div>
      <AboutHero />
      <AboutServices />
      <Overflowspread />
      <FAQs />
    </div>
  );
}

export default About;
