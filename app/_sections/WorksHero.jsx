import SelectedWorksLayout from "../_components/SelectedWorksLayout";
import SelectedWorksPortfolio from "../_components/SelectedWorksPortfolio";
import RevealText from "./RevealText";

function WorksHero() {
  return (
    <div className="page-start works-hero">
      <RevealText as="h1" text="Works." delay={0.7} />

      <SelectedWorksPortfolio />
    </div>
  );
}

export default WorksHero;
