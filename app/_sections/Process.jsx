import Image from "next/image";

function Process({section}) {
  const { text, section_media } = section;

  return (
    <section className="container case-study-process">
      <div className="col-2_5-by-1">
        <div className="section-heading no-margin">
          <h2>Process.</h2>
          <p className="no-padding">
            From early ideas to final execution - refining every frame
          </p>
        </div>

        <div className="img-grid">
          {section_media?.map((media, index) => (
            <div className="img-box" key={index}>
              <Image
                src={media.media_url}
                alt={media.alt_text ?? ""}
                fill
                sizes="(max-width: 763px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Process;
