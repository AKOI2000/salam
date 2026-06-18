import WorkCard from "./WorkCard";
import { getProjects } from "../_lib/projectAPI";

async function SelectedWorksLayout() {
  const projects = await getProjects();
  return (
    <div className="selected-works">
      {projects.map((project, index) => (
        <WorkCard key={index} project={project} />
      ))}
    </div>
  );
}

export default SelectedWorksLayout;

const fakeArray = [1, 2, 3, 4, 5, 6];
