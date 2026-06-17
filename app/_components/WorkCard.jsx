import Image from "next/image";
import { Link } from "next-view-transitions";
import { FaArrowRightLong } from "react-icons/fa6";

function WorkCard({ project }) {
  const { short_description, homepage_thumbnail, slug } = project;
  return (
    <div className={`work`}>
      <div className="work-img-box">
        <Image
          alt="Work 1"
          src={homepage_thumbnail}
          height={4}
          width={3}
          sizes="(max-width: 763px) 100vw, 100vw, (max-width: 1200px) 50vw, 33vw"
        />

        {/* <HoverVideo src={"/videotest2.mp4"} /> */}
      </div>

      <div className="work-text-box">
        <div className="work-text-box_flex">
          <h6>{project.title}</h6>
        </div>

        <p>{short_description}</p>

        <Link
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
