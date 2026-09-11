function ProjectMeta({ project = {} }) {
  const { title, excerpt, metadata } = project;

  if (!metadata) return null;

  const { client, role, timeline, tools, deliverables } = metadata;

  const metaItems = [
    { label: "Client", value: client },
    { label: "Role", value: role },
    { label: "Timeline", value: timeline ? `${timeline} week(s)` : "—" },
    {
      label: "Tools",
      value: tools?.length ? tools.join(", ") : "—",
    },
    {
      label: "Deliverables",
      value: deliverables?.length ? deliverables.join(", ") : "—",
    },
  ];

  return (
    <div className="container none">
      <div className="project-meta">
        <div className="project-meta__overview">
          {/* <span className="project-meta__eyebrow">Selected project</span> */}
          <h2>{title}</h2>
          {/* {excerpt && <p>{excerpt}</p>} */}
        </div>

        <div className="project-meta__details">
          {metaItems.map((item) => (
            <div key={item.label} className="project-meta__item">
              <div className="project-meta__label">{item.label}</div>
              <div className="project-meta__value">{item.value}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProjectMeta;
