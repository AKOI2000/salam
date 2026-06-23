function ProjectMeta({ project = {} }) {
  const { project_metadata } = project;
  const metaData = project_metadata[0];
  const { client, role, timeline, tools, deliverables } = metaData;

  return (
    <div className="col-5-by-1">
      <div className="project-meta-group item">
        <div className="project-meta-question">Client</div>
        <div className="project-meta-answer">{client}</div>
      </div>

      <div className="project-meta-group item">
        <div className="project-meta-question">Role</div>
        <div className="project-meta-answer">{role}</div>
      </div>

      <div className="project-meta-group item">
        <div className="project-meta-question">Deliverables</div>
        <div className="project-meta-answer">
          {deliverables?.map((item, index) => (
            <span key={index}>
              {item}
              {index < deliverables.length - 1 ? ", " : ""}
            </span>
          ))}
        </div>
      </div>

      <div className="project-meta-group item">
        <div className="project-meta-question">Timeline</div>
        <div className="project-meta-answer">{timeline} weeks</div>
      </div>

      <div className="project-meta-group item">
        <div className="project-meta-question">Tools</div>
        <div className="project-meta-answer">
          {tools?.map((tool, index) => (
            <span key={index}>
              {tool}
              {index < tools.length - 1 ? ", " : ""}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProjectMeta;
