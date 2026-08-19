import Image from "next/image";

function CaseStudyHero({ project }) {
  const { coverImage, title, excerpt } = project;
  return (
    <div className="page-start case-study_hero case-study">
      <div className="bg-overlay"></div>
      <Image src={coverImage} alt={`Salam for ${title}`} fill />

      <div className="case-study_hero-text-box">
        <h1>
          {title}
          <br />
          <span>by Salam</span>
        </h1>
        <p>{excerpt}</p>
      </div>
    </div>
  );
}

export default CaseStudyHero;
