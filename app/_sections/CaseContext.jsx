import Image from "next/image";

function CaseContext() {
  return (
    <section className="container case-study-context">
      <div className="col-4-by-1">
        <div className="section-heading no-margin">
          <h2>Context.</h2>
        </div>

        <p>
          Guinness needed a motion system capable of translating the feeling of
          the product into a cinematic digital experience. The objective was not
          simply to advertise a drink, but to emphasize ritual, craftsmanship,
          anticipation, and reward. The challenge was balancing modern motion
          language with the heritage and iconic visual identity associated with
          Guinness.
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

export default CaseContext;
