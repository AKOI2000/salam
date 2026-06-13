import Image from "next/image";
import DashboardSectionRowButtons from "../_sections/DashboardSectionRowButtons";

function DashboardSectionRow({ section, params }) {
  const {text, section_media, section_type} = section;
  

  const shortText =
    text.length > 50
      ? text.substring(0, 42) + " ....."
      : text;

  return (
    <div className="sections-table-row">
      <p>{section_type}</p>
      <p>{shortText}</p>
      <div className="section-media">
        {section_media?.map((media, index) => {
          if (media.media_type === "image") {
            return (
              <Image
                key={index}
                src={media.media_url}
                alt={media.alt_text}
                height={200}
                width={300}
              />
            );
          } else {
            return (
              <video key={index} autoPlay loop preload="metadata" muted>
                <source
                  src={media.media_url}
                  alt={media.alt_text}
                  type="video/mp4"
                ></source>
              </video>
            );
          }
        })}
      </div>

      <DashboardSectionRowButtons section={section} params={params} />
    </div>
  );
}

export default DashboardSectionRow;
