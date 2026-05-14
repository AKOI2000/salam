import HoverVideo from "@/app/_components/HoverVideo";
import ProjectMeta from "@/app/_components/ProjectMeta";
import CaseContext from "@/app/_sections/CaseContext";
import CaseStudyHero from "@/app/_sections/CaseStudyHero";
import Process from "@/app/_sections/Process";
import FinalFilm from "@/app/_sections/FinalFilm";
import MotionLanguage from "@/app/_sections/MotionLanguage";
import NarrativeSequence from "@/app/_sections/NarrativeSequence";
import ResultsImpact from "@/app/_sections/ResultsImpact";
import LearningReflection from "@/app/_sections/LearningReflection";

function page() {
  return (
    <div>
      <CaseStudyHero />
      <ProjectMeta />
      <CaseContext />
      <MotionLanguage />
      <NarrativeSequence />
      <Process />
      <FinalFilm />
      <ResultsImpact />
      <LearningReflection />
    </div>
  );
}

export default page;
