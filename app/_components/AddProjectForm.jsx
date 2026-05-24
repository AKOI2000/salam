function AddProjectForm() {
  return (
    <div className="add-project-box">
      <h3>Add new Project</h3>

      <form action="">
        <div className="input-box">
          <input type="text" name="title" placeholder="Project Title" />
        </div>

        <div className="input-box">
          <input
            type="text"
            name="short_description"
            placeholder="Short Description... "
          />
        </div>

        <div className="input-box">
          <input
            type="text"
            name="slug"
            placeholder="Your preferred website url endpoint (slug) for this project"
          />
        </div>

        <div className="input-group">
          <label htmlFor="homepage_thumbnail">Homepage Thumbnail</label>
          <input type="file" name="homepage_thumbnail" id="" accept="image" />
        </div>

        <div className="input-group">
          <label htmlFor="homepage_preview_video">Homepage Preview Video</label>
          <input
            type="file"
            name="homepage_preview_video"
            id=""
            accept="video"
          />
        </div>

        <div className="input-group">
          <label htmlFor="case_study_cover">Case Study Cover</label>
          <input type="file" name="case_study_cover" id="" />
        </div>

        <div className="input-box">
          <button className="btn-dashboard-primary">Create Project</button>
        </div>
      </form>
    </div>
  );
}

export default AddProjectForm;
