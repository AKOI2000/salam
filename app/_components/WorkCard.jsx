import { Link } from "next-view-transitions";
import HoverVideoCard from "./HoverVideoCard";

function WorkCard({ project }) {
  const { title, excerpt, thumbnail, slug, previewVideoUrl } = project;

  return (
    <Link
      prefetch={true}
      data-cursor-grow
      href={`/portfolio/${slug}`}
      className="work"
      aria-label={`View case study for ${title}`}
    >
      <HoverVideoCard
        thumbnail={thumbnail}
        video={previewVideoUrl}
        alt={title}
        title={title}
        excerpt={excerpt}
      />
    </Link>
  );
}

export default WorkCard;