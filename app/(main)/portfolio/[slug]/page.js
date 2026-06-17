import ProjectMeta from "@/app/_components/ProjectMeta";
import CaseStudyHero from "@/app/_sections/CaseStudyHero";
import CaseContext from "@/app/_sections/CaseContext";
import MotionLanguage from "@/app/_sections/MotionLanguage";
import NarrativeSequence from "@/app/_sections/NarrativeSequence";
import Process from "@/app/_sections/Process";
import FinalFilm from "@/app/_sections/FinalFilm";
import ResultsImpact from "@/app/_sections/ResultsImpact";
import LearningReflection from "@/app/_sections/LearningReflection";
import { getProjectBySlug } from "@/app/_lib/projectAPI";

// Map section_type values to their components
const SECTION_COMPONENTS = {
  "context": CaseContext,
  "motion language": MotionLanguage,
  "narrative & sequencing": NarrativeSequence,
  "process": Process,
  "final film": FinalFilm,
  "reflection": LearningReflection,
  "results and impact": ResultsImpact,
};

async function page({ params }) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  const { project_sections } = project;
  console.log(project_sections)

  return (
    <>
      <CaseStudyHero project={project} />
      <ProjectMeta project={project} />

      {project_sections?.map((section) => {
        // look up the component for this section_type
        const SectionComponent = SECTION_COMPONENTS[section.section_type];

        // if no matching component, skip it
        if (!SectionComponent) return null;

        return <SectionComponent key={section.id} section={section} />;
      })}
    </>
  );
}

export default page;