import VideoPlayer from "../_components/VideoPlayer";

function FinalFilm({ section }) {
  const { text, section_media } = section;
  return (
    <section className="container">
      <div className="col-2_5-by-1">
        <div className="section-heading no-margin">
          <h2>Final Film</h2>
          <p className="no-padding">
            {text ? text : "The complete campaign brought to life"}
          </p>
        </div>

        <VideoPlayer
          src={section_media[0]?.media_url}
          // poster={project.case_study_cover}
        />
        {/* <HoverVideo src="videotest.mp4" muted={false}/> */}
      </div>
    </section>
  );
}

export default FinalFilm;
