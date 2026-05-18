import Image from "next/image";

function NarrativeSequence() {
  return (
    <section className="container case-study-ns">
      <div className="col-2_5-by-1">
        <div className="section-heading no-margin">
          <h2>
            Narrative <br /> & <br /> Sequencing.
          </h2>
          <p className="no-padding">
            The campaign was structured around escalation. Early scenes rely on
            stillness and negative space to create tension before transitioning
            into faster cuts, liquid motion, and typography reveals. Each
            sequence was designed to reinforce anticipation and reward,
            mirroring the emotional rhythm behind the Guinness pouring ritual.
          </p>
        </div>

        <div className="img-flex col-eq-4">
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

export default NarrativeSequence;
