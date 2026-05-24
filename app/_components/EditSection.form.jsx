function EditSectionForm() {
  return (
    <div className="add-section-box">
      <h3>Edit Section</h3>
      <form action="">
        <div className="input-box">
          <input
            type="text"
            name="section_type"
            placeholder="Section Type..."
          />
        </div>
        <div className="input-box">
          <textarea name="text" id="" placeholder="Section Text ..."></textarea>
        </div>

        <div className="input-group">
          <label htmlFor="case_study_cover">Section Media</label>
          <input type="file" name="media" id="" accept="image" />
        </div>

        <div className="input-flex">
          <label htmlFor="case_study_cover">Replace Media?</label>
          <input type="checkbox" />
        </div>

        <div className="input-box">
          <input
            type="text"
            name="media_alt"
            placeholder="Alt text for the media"
          />
        </div>

        <div className="input-box">
          <button className="btn-dashboard-primary">Create Project</button>
        </div>
      </form>
    </div>
  );
}

export default EditSectionForm;
