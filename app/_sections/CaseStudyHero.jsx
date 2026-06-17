import Image from "next/image";

function CaseStudyHero({ project }) {
  const { case_study_cover, title, short_description } = project;
  return (
    <div className="page-start case-study_hero case-study">
      <div className="bg-overlay"></div>
      <Image src={case_study_cover} alt={`Salam for ${title}`} fill />

      <div className="case-study_hero-text-box">
        <h1>
          Salam <br />
          for {title}
        </h1>
        <p>{short_description}</p>
      </div>
    </div>
  );
}

export default CaseStudyHero;
