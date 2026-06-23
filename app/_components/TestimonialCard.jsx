import Image from "next/image";

function TestimonialCard() {
  return (
    <div className="card">
      <div className="card-inner">
        <div className="card-front">
          <div className="img-box">
            <Image
              src={"/Hennessy.png"}
              alt="hennessy"
              width={150}
              height={150}
            />
          </div>
        </div>
        <div className="card-back">
          <p className="card-back_header">
            There are talented creatives all around, but in all my years of
            works, I’m yet to find anyone able to express their creativity as
            well as AjaNwachuku. It doesn’t matter if it’s fintech, govtech or a
            media product — you’re guaranteed that aj will show up with big
            ideas, incredible execution and a big, big personality.
          </p>

          <div className="card-back_info">
            <div className="">
              <h6>Alausa Olayinka</h6>
              <p>Gbogbo nitishe</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TestimonialCard;
