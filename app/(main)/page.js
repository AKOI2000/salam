import Hero from "../_sections/Hero";
import SelectedWorks from "../_sections/SelectedWorks";
import AboutSection from "../_sections/AboutSection";
import Testimonial from "../_sections/Testimonial";

export const metadata = {
  title: "Motion Designer",
  description:
    "Salam creates motion-driven brand stories, digital visuals, and design experiences for ambitious businesses.",
  openGraph: {
    url: "https://www.moosalam.com",
    images: [{ url: "/Salam.png", width: 1200, height: 630, alt: "Salam logo" }],
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
