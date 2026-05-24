function MetaDataForm() {
  return (
    <div className="dashboard-metadata-box">
      <h3>The Project Metadata</h3>
      <form>
        <div className="input-box">
          <input type="text" name="client" placeholder="Client Name" />
        </div>
        <div className="input-box">
          <input type="text" name="role" placeholder="What was your role?" />
        </div>
        <div className="input-box">
          <input
            type="text"
            name="timeline"
            placeholder="The Timeline [in weeks]"
          />
        </div>

        <div className="input-box">
          <input
            type="text"
            name="deliverables"
            placeholder="What are the deliverables? [separate with comma]"
          />
        </div>
        <div className="input-box">
          <input
            type="text"
            name="tools"
            placeholder="What are the tools used? [separate with comma]"
          />

          <span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum tempore laudantium dicta quasi ipsam iste, architecto numquam voluptatem accusamus, facilis ab modi unde magnam voluptatum vel eaque at temporibus ratione.</span>
        </div>
        <div className="input-box">
          <button className="btn-dashboard-primary">Submit</button>
        </div>
      </form>
    </div>
  );
}

export default MetaDataForm;
