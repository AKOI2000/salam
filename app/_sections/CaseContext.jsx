import Image from "next/image";

function CaseContext({ section }) {
  const { text, section_media } = section;
  return (
    <section className="container case-study-context">
      <div className="col-4-by-1">
        <div className="section-heading no-margin">
          <h2>Context.</h2>
        </div>

        <p>{text}</p>

        {section_media?.map((media, index) => (
          <div className="img-box" key={index}>
            <Image
              // key={index}
              src={media.media_url}
              alt={media.alt_text}
              // height={300}
              // width={400}
             sizes="(max-width: 763px) 100vw, (max-width: 1200px) 50vw, 33vw"
              fill
            />
          </div>
        ))}
      </div>
    </section>
  );
}

export default CaseContext;
