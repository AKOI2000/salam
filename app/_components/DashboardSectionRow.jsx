import Image from "next/image";
import DashboardSectionRowButtons from "../_sections/DashboardSectionRowButtons";

function DashboardSectionRow({ section }) {
  const shortText =
    section.text.length > 50
      ? section.text.substring(0, 42) + " ....."
      : section.text;
  return (
    <div className="sections-table-row">
      <p>{section.section_type}</p>
      <p>{shortText}</p>
      <div className="section-media">
        {section.medialist.map((media, index) => {
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

      <DashboardSectionRowButtons/>
    </div>
  );
}

export default DashboardSectionRow;
