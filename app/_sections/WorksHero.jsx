import SelectedWorksLayout from "../_components/SelectedWorksLayout";
import RevealText from "./RevealText";

function WorksHero() {
  return (
    <div className="page-start works-hero">
      <RevealText as="h1" text="Works." delay={0.7} />

      <SelectedWorksLayout />
    </div>
  );
}

export default WorksHero;
