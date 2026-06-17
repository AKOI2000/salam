import Image from "next/image";

function MotionLanguage({ section }) {
  const { text, section_media } = section;

  return (
    <section className="container case-study-ml">
      <div className="col-2_5-by-1">
        <div className="section-heading no-margin">
          <h2>
            Motion <br />
            Language.
          </h2>
          <p className="no-padding">{text}</p>
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

export default MotionLanguage;