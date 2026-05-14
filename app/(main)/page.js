import Image from "next/image";
import Link from "next/link";
import Hero from "../_sections/Hero";
import SelectedWorks from "../_sections/SelectedWorks";
import AboutSection from "../_sections/AboutSection";
import Testimonial from "../_sections/Testimonial";

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
