import WorkCard from "./WorkCard";
import { getProjects } from "../_lib/projectAPI";

async function SelectedWorksLayout() {
  const projects = await getProjects();
  return (
    <div className="selected-works">
      {/* <WorkCard work={" Designed Partyverse’s v1.0: a warm, widget-based event app that makes anyone feel like a planner. People literally started hosting events just to use it. Designed Partyverse’s v1.0: a warm, widget-based event app that makes anyone feel like a planner. People literally started hosting events just to use it."} img="/bg.png"/>
      <WorkCard work={"Designed Partyverse’s v1.0: a warm, widget-based event app that makes anyone feel like a planner. People literally started hosting events just to use it."} img="/about-1.jpg"/>
      <WorkCard work={"Designed Partyverse’s v1.0: a warm, widget-based event app that makes anyone"}/>
      <WorkCard work={"Designed Partyverse’s v1.0: a warm, widget-based event app that makes anyone feel like a planner. People literally started hosting events just to use it. Designed Partyverse’s v1.0: a warm, widget-based event app that makes anyone feel like a planner. People literally started hosting events just to use it. Designed Partyverse’s v1.0: a warm, widget-based event app that makes anyone feel like a planner. People literally started hosting events just to use it."} img="/bg.png"/>
      <WorkCard work={"Designed Partyverse’s v1.0: a warm, widget-based event app that makes anyone feel like a planner. People literally started hosting events just to use it. Designed "} img="/bg.png"/>
      <WorkCard work={"Designed Partyverse’s v1.0: a warm, widget-based event app that makes anyone feel like a planner. People literally started hosting events just to use it. Designed Partyverse’s v1.0: a warm, widget-based event app that makes anyone."}/> */}

      {projects.map((project, index) => (
        <WorkCard key={index} project={project} />
      ))}
    </div>
  );
}

export default SelectedWorksLayout;

const fakeArray = [1, 2, 3, 4, 5, 6];
