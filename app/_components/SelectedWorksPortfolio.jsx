import WorkCard from "./WorkCard";
import { getPublishedProjects } from "../_lib/projectsAPI";

async function SelectedWorksPortfolio() {
  const projects = await getPublishedProjects();
  console.log("projects", projects); 
  return (
    <div className="selected-works">
      {projects.map((project, index) => (
        <WorkCard key={index} project={project} />
      ))}
    </div>
  );
}

export default SelectedWorksPortfolio;
