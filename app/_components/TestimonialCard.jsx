import Image from "next/image";

function TestimonialCard({testimonial}) {
  return (
    <div className="card">
      <div className="card-inner">
        <div className="card-front">
          <div className="img-box">
            <Image
              src={testimonial.imageUrl}
              alt={`${testimonial.name} as ${testimonial.role}`}
              width={150}
              height={150}
            />
          </div>
        </div>
        <div className="card-back">
          <p className="card-back_header">
          {testimonial.message}
          </p>

          <div className="card-back_info">
            <div className="">
              <h6>{testimonial.name}</h6>
              <p>{testimonial.role}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TestimonialCard;
