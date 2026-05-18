import Image from "next/image";

function Process() {
  return (
    <section className="container case-study-process">
      <div className="col-2_5-by-1">
        <div className="section-heading no-margin">
          <h2>Process.</h2>
          <p className="no-padding">From early ideas to final execution - refining every frame</p>
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

export default Process;
