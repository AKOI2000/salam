import DashboardSectionRow from "../_components/DashboardSectionRow";

const fakeData = [
  {
    section_type: "hero",
    text: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquid veritatis hic voluptatem ea? Sed iure, tenetur quo, praesentium magni, itaque ducimus delectus doloremque asperiores cumque commodi maxime aliquam porro sequi!",
    medialist: [
      {
        media_type: "image",
        alt_text: "Alt text",
        media_url: "/bg.png",
      },
      {
        media_type: "image",
        alt_text: "Alt text",
        media_url: "/bg.png",
      },
      {
        media_type: "image",
        alt_text: "Alt text",
        media_url: "/bg.png",
      },
      {
        media_type: "image",
        alt_text: "Alt text",
        media_url: "/bg.png",
      },
      {
        media_type: "image",
        alt_text: "Alt text",
        media_url: "/bg.png",
      },
      {
        media_type: "video",
        alt_text: "Alt text",
        media_url: "/videotest.mp4",
      },
    ],
  },
  {
    section_type: "context",
    text: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquid veritatis hic voluptatem ea? Sed iure, tenetur quo, praesentium magni, itaque ducimus delectus doloremque asperiores cumque commodi maxime aliquam porro sequi!",
    medialist: [
      {
        media_type: "image",
        alt_text: "Alt text",
        media_url: "/bg.png",
      },
      {
        media_type: "image",
        alt_text: "Alt text",
        media_url: "/bg.png",
      },
      {
        media_type: "image",
        alt_text: "Alt text",
        media_url: "/bg.png",
      },
    ],
  },
  {
    section_type: "context",
    text: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquid veritatis hic voluptatem ea? Sed iure, tenetur quo, praesentium magni, itaque ducimus delectus doloremque asperiores cumque commodi maxime aliquam porro sequi!",
    medialist: [
      {
        media_type: "image",
        alt_text: "Alt text",
        media_url: "/bg.png",
      },
      {
        media_type: "image",
        alt_text: "Alt text",
        media_url: "/bg.png",
      },
      {
        media_type: "image",
        alt_text: "Alt text",
        media_url: "/bg.png",
      },
      {
        media_type: "image",
        alt_text: "Alt text",
        media_url: "/bg.png",
      },
    ],
  },
  {
    section_type: "Motion Language",
    text: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquid veritatis hic voluptatem ea? Sed iure, tenetur quo, praesentium magni, itaque ducimus delectus doloremque asperiores cumque commodi maxime aliquam porro sequi!",
    medialist: [
      {
        media_type: "image",
        alt_text: "Alt text",
        media_url: "/bg.png",
      },
      {
        media_type: "image",
        alt_text: "Alt text",
        media_url: "/about-1.jpg",
      },
    ],
  },
];

function DashboardSection() {
  return (
    <div className="sections-table">
      <div className="sections-table-header">
        <p>Section Type</p>
        <p>text</p>
        <p>Media</p>
      </div>

      {fakeData.map((section, index) => (
        <DashboardSectionRow key={index} section={section} />
      ))}
    </div>
  );
}

export default DashboardSection;
