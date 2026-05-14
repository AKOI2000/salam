import Image from "next/image";

function LearningReflection() {
  return (
    <section className="container case-study-reflection">
      <div className="col-4-by-1">
        <div className="section-heading no-margin">
          <h2>Reflection.</h2>
        </div>

        <p>
          One of the biggest challenges was balancing realism with emotional
          pacing. Early iterations focused too heavily on detailed simulation
          work, which reduced the dramatic rhythm of the edit. Later versions
          introduced more restraint, stronger negative space, and longer pauses
          to create more impactful moments of release.
        </p>

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
    </section>
  );
}

export default LearningReflection;
