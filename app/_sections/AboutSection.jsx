import { Link } from "next-view-transitions";
import RevealText from "./RevealText";
import { FaArrowRightLong } from "react-icons/fa6";

function AboutSection() {
  return (
    <section className="container about-section">
      <div className="section-heading">
        <h3>about.</h3>
      </div>

      <RevealText
        as="h5"
        text="I’m a curious designer based in Lagos, Nigeria—driven by a deep desire to solve problems and create meaningful connections. I use design thinking to link ideas, art to speak to the eyes, and strategy to engage the mind. When I’m not designing, you’ll find me at the piano, exploring new challenges, or simply enjoying good food."
        animateInView={true}
        animateOnLoad={false}
      />

      <Link href="/about" className="btn-tertiary">
        Show more
        <FaArrowRightLong />
      </Link>
    </section>
  );
}

export default AboutSection;
