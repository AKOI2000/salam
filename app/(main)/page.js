import Hero from "../_sections/Hero";
import SelectedWorks from "../_sections/SelectedWorks";
import AboutSection from "../_sections/AboutSection";
import Testimonial from "../_sections/Testimonial";

export const metadata = {
  description:
    "Welcome to Salam's portfolio — motion designer crafting compelling visual stories.",
  openGraph: {
    url: "https://yoursite.com",
  },
};

export default function Home() {
  return (
    <>
      <Hero />
      <SelectedWorks />
      <AboutSection />
      <Testimonial />
    </>
  );
}
