import Image from "next/image";
import HoverVideo from "../_components/HoverVideoCard";

function OutcomePreview() {
  return (
    <section className="container">
      {/* <div className="section-heading">
        <h2>Selected Moments.</h2>
      </div> */}

      <div className="col-2-by-1 preview-box">
        <div className="preview-img-box">
          <Image
            alt="Work 1"
            src={"/bg.png"}
            height={9}
            width={16}
           sizes="(max-width: 763px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <div className="preview-img-box">
          <Image
            alt="Work 1"
            src={"/about-2.jpg"}
            height={9}
            width={16}
           sizes="(max-width: 763px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      </div>
      <HoverVideo src={"/videotest.mp4"} />
    </section>
  );
}

export default OutcomePreview;
