import Overflowspread from "@/app/_components/OverflowSpread";
import AboutHero from "@/app/_sections/AboutHero";
import AboutServices from "@/app/_sections/AboutServices";
import FAQs from "@/app/_sections/FAQs";

// app/about/page.jsx
export const metadata = {
  title: "About",
  description:
    "Learn more about Salam, a motion designer crafting bold visual stories and brand-driven digital experiences.",
  openGraph: {
    url: "https://www.moosalam.com/about",
    images: [{ url: "/Salam.png", width: 1200, height: 630, alt: "Salam logo" }],
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
