import Image from "next/image";

function CaseStudyHero() {
  return (
    <div className="page-start case-study_hero case-study">
      <div className="bg-overlay"></div>
      <Image src="/bg.png" alt="Case Study" fill />

      <div className="case-study_hero-text-box">
        <h1>
          Guiness <br />
          Unleashed
        </h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestias
          animi natus sint nostrum porro recusandae officia iste nam, at
          inventore expedita tenetur, amet voluptatum voluptates culpa soluta
          nemo libero numquam?
        </p>
      </div>
    </div>
  );
}

export default CaseStudyHero;
