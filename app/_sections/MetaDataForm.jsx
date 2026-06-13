import { createMetaData, updateMetaData } from "../_lib/project-metadata-actions";

async function MetaDataForm({ params, metadata, id }) {

  return (
    <div className="dashboard-metadata-box">
      <h3>The Project Metadata</h3>
      <form action={!metadata ? createMetaData : updateMetaData}>
        <div className="input-box">
          <input
            type="text"
            name="client"
            placeholder="Client Name"
            defaultValue={metadata?.client || ""}
          />
        </div>
        <div className="input-box">
          <input
            type="text"
            name="role"
            placeholder="What was your role?"
            defaultValue={metadata?.role || ""}
          />
        </div>
        <div className="input-box">
          <input
            type="text"
            name="timeline"
            placeholder="The Timeline [in weeks]"
            defaultValue={metadata?.timeline || ""}
          />
        </div>

        <div className="input-box">
          <input
            type="text"
            name="deliverables"
            placeholder="What are the deliverables? [separate with comma]"
            defaultValue={metadata?.deliverables || ""}
          />
        </div>
        <div className="input-box">
          <input
            type="text"
            name="tools"
            placeholder="What are the tools used? [separate with comma]"
            defaultValue={metadata?.tools || ""}
          />
        </div>

        <input type="hidden" name="project_id" value={id} />
        <input type="hidden" name="slug" value={params} />

        <div className="input-box">
          <button className="btn-dashboard-primary">Submit</button>
        </div>
      </form>
    </div>
  );
}

export default MetaDataForm;
