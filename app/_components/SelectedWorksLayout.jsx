import WorkCard from "./WorkCard";
import { getHomepageProjects } from "../_lib/projectsAPI";

async function SelectedWorksLayout() {
  const projects = await getHomepageProjects();
  return (
    <div className="selected-works">
      {projects.map((project, index) => (
        <WorkCard key={index} project={project} />
      ))}
    </div>
  );
}

export default SelectedWorksLayout;
