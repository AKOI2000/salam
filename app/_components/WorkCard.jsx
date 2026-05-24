import Image from "next/image";
import { Link } from "next-view-transitions";
import { FaArrowRightLong } from "react-icons/fa6";

function WorkCard({ work, img = "/about-2.jpg" }) {
  return (
    <div className={`work`}>
      <div className="work-img-box">
        <Image
          alt="Work 1"
          src={img}
          height={4}
          width={3}
          sizes="(max-width: 763px) 100vw, 100vw, (max-width: 1200px) 50vw, 33vw"
        />

        {/* <HoverVideo src={"/videotest2.mp4"} /> */}
      </div>

      <div className="work-text-box">
        <div className="work-text-box_flex">
          <h6>Title</h6>
        </div>

        <p>{work}</p>

        <Link data-cursor-grow href="/portfolio/test" className="btn-tertiary">
          View Case Study
          <FaArrowRightLong />
        </Link>
      </div>
    </div>
  );
}

export default WorkCard;
