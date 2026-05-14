import RevealText from "./RevealText";

function Hero() {
  return (
    <div className="hero page-start">
      <RevealText
        as="h1"
        text="Mo Salam turns difficult ideas into motion that feels effortless, and designs experiences you stay with longer than you expect."
        delay={0.7}
      />


      <RevealText as="p" text="Nothing is there to decorate. Everything is there to guide, hold, or resolve." delay={1.5} />
    </div>
  );
}

export default Hero;
