import Image from "next/image";

function MotionLanguage() {
  return (
    <section className="container case-study-ml">
      <div className="col-2_5-by-1">
        <div className="section-heading no-margin">
          <h2>Motion <br />Language.</h2>
          <p className="no-padding">
            Motion behavior focused on weight, restraint, and controlled
            release. Typography transitions used delayed acceleration and sharp
            exits to create moments of tension before impact. Camera movement
            remained slow and intentional, allowing lighting, texture, and
            liquid detail to carry emotional presence. Animation was treated as
            rhythm rather than constant motion.
          </p>
        </div>

        <div className="img-grid">
          <div className="img-box">
            {" "}
            <Image
              src={"/about-1.jpg"}
              alt="context"
              // height={300}
              // width={400}
              // sizes="(max-width: 763px) 100vw, 100vw, (max-width: 1200px) 50vw, 33vw"
              fill
            />
          </div>
          <div className="img-box">
            <Image
              src={"/about-1.jpg"}
              alt="context"
              // height={300}
              // width={400}
              // sizes="(max-width: 763px) 100vw, 100vw, (max-width: 1200px) 50vw, 33vw"
              fill
            />
          </div>
          <div className="img-box">
            <Image
              src={"/about-1.jpg"}
              alt="context"
              // height={300}
              // width={400}
              // sizes="(max-width: 763px) 100vw, 100vw, (max-width: 1200px) 50vw, 33vw"
              fill
            />
          </div>
          <div className="img-box">
            <Image
              src={"/about-1.jpg"}
              alt="context"
              // height={300}
              // width={400}
              // sizes="(max-width: 763px) 100vw, 100vw, (max-width: 1200px) 50vw, 33vw"
              fill
            />
          </div>
          <div className="img-box">
            <Image
              src={"/about-1.jpg"}
              alt="context"
              // height={300}
              // width={400}
              // sizes="(max-width: 763px) 100vw, 100vw, (max-width: 1200px) 50vw, 33vw"
              fill
            />
          </div>
          <div className="img-box">
            <Image
              src={"/about-1.jpg"}
              alt="context"
              // height={300}
              // width={400}
              // sizes="(max-width: 763px) 100vw, 100vw, (max-width: 1200px) 50vw, 33vw"
              fill
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default MotionLanguage;
