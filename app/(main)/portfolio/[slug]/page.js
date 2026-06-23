import ProjectMeta from "@/app/_components/ProjectMeta";
import CaseStudyHero from "@/app/_sections/CaseStudyHero";
import CaseContext from "@/app/_sections/CaseContext";
import MotionLanguage from "@/app/_sections/MotionLanguage";
import NarrativeSequence from "@/app/_sections/NarrativeSequence";
import Process from "@/app/_sections/Process";
import FinalFilm from "@/app/_sections/FinalFilm";
import ResultsImpact from "@/app/_sections/ResultsImpact";
import LearningReflection from "@/app/_sections/LearningReflection";
import { getProjectBySlug, getProjects } from "@/app/_lib/projectAPI";

export async function generateStaticParams() {
  const projects = await getProjects();
  const ids = projects.map((project) => ({ slug: String(project.slug) }));
  return ids;
}

const SECTION_COMPONENTS = {
  context: CaseContext,
  "motion language": MotionLanguage,
  "narrative & sequencing": NarrativeSequence,
  process: Process,
  "final film": FinalFilm,
  reflection: LearningReflection,
  "results and impact": ResultsImpact,
};

const SECTION_ORDER = [
  "context",
  "motion language",
  "narrative & sequencing",
  "process",
  "final film",
  "reflection",
  "results and impact",
];

async function page({ params }) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  const { project_sections } = project;

  const sortedSections = [...(project_sections ?? [])].sort(
    (a, b) =>
      SECTION_ORDER.indexOf(a.section_type) -
      SECTION_ORDER.indexOf(b.section_type)
  );

  return (
    <>
      <CaseStudyHero project={project} />
      <ProjectMeta project={project} />

      {sortedSections.map((section) => {
        const SectionComponent = SECTION_COMPONENTS[section.section_type];
        if (!SectionComponent) return null;
        return <SectionComponent key={section.id} section={section} />;
      })}
    </>
  );
}

export default page;