import Image from "next/image";

function LearningReflection({section}) {
  const { text, section_media } = section;

  return (
    <section className="container case-study-reflection">
      <div className="col-4-by-1">
        <div className="section-heading no-margin">
          <h2>Reflection.</h2>
        </div>

        <p>{text}</p>

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

export default LearningReflection;
