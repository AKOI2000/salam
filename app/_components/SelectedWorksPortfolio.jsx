import WorkCard from "./WorkCard";
import { getPublishedProjects } from "../_lib/projectAPI";

async function SelectedWorksPortfolio() {
  const projects = await getPublishedProjects();
  return (
    <div className="selected-works">
      {projects.map((project, index) => (
        <WorkCard key={index} project={project} />
      ))}
    </div>
  );
}

export default SelectedWorksPortfolio;
