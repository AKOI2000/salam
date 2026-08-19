import { Link } from "next-view-transitions";
import { FaArrowRightLong } from "react-icons/fa6";
import HoverVideoCard from "./HoverVideoCard";

function WorkCard({ project }) {
  const { title, excerpt, thumbnail, slug, previewVideoUrl } = project;

  return (
    <div className="work">
      <HoverVideoCard thumbnail={thumbnail} video={previewVideoUrl} alt={title} />

      <div className="work-text-box">
        <div className="work-text-box_flex">
          <h6>{title}</h6>
        </div>

        <p>{excerpt}</p>

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