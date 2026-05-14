import Image from "next/image";
import RevealText from "./RevealText";

function AboutHero() {
  return (
    <div className="about-hero page-start">
      {/* <h1>
        Mohammed Abdulsalam is a creative and detail-driven Motion Designer with
        over half a decade worth of experience crafting dynamic visuals that
        blend storytelling, animation, and branding. I am an expert in
        transforming complex ideas into compelling motion graphics across
        digital platforms, broadcast, and social media. Proficient in After
        Effects, Premiere Pro, Photoshop, Illustrator with a deep
        understanding of timing, rhythm and design principles.
      </h1> */}

      <RevealText
        as="h1"
        text="Mohammed Abdulsalam is a creative and detail-driven Motion Designer with
        over half a decade worth of experience crafting dynamic visuals that
        blend storytelling, animation, and branding. I am an expert in
        transforming complex ideas into compelling motion graphics across
        digital platforms, broadcast, and social media. Proficient in After
        Effects, Premiere Pro, Photoshop, Illustrator with a deep
        understanding of timing, rhythm and design principles."
        delay={0.7}
      />

      <RevealText
        as="p"
        text="     I didn’t start out chasing motion design, I found it somewhere between
        curiosity and obsession. The moment static visuals began to move, to
        breathe, to tell stories, everything clicked. Since then, I’ve been
        drawn to the rhythm of animation, the subtle details people might not
        notice consciously but always feel. Inspired by sound, culture, and
        digital experiences, I approach every project as a chance to translate
        ideas into motion that connects, resonates, and lingers just a little
        longer than expected."
        delay={1.5}
      />

      <div className="about-img-box">
        <Image
          src="/Salam.png"
          alt="Salam"
          height={4}
          width={3}
          sizes="(max-width: 763px) 100vw, 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
    </div>
  );
}

export default AboutHero;
