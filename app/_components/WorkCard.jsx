import Image from "next/image";
import { Link } from "next-view-transitions";
import { FaArrowRightLong } from "react-icons/fa6";
import HoverVideoCard from "./HoverVideoCard";

function WorkCard({ project }) {
  const {
    title, 
    short_description,
    homepage_thumbnail,
    slug,
    homepage_preview_video,
  } = project;

  return (
    <div className="work">
      <div className="work-img-box">
        <HoverVideoCard
          thumbnail={homepage_thumbnail}
          video={homepage_preview_video}
          alt={title}
        />
      </div>

      <div className="work-text-box">
        <div className="work-text-box_flex">
          <h6>{project.title}</h6>
        </div>

        <p>{short_description}</p>

        <Link
          prefetch={true}
          data-cursor-grow
          href={`/portfolio/${slug}`}
          className="btn-tertiary"
        >
          View Case Study
          <FaArrowRightLong />
        </Link>
      </div>
    </div>
  );
}

export default WorkCard;
