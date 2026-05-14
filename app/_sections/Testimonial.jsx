import TestimonialCard from "../_components/TestimonialCard";

function Testimonial() {
  return (
    <section className="container">
      <div className="section-heading">
        <p>You better listen</p>
        <h3>
          words from the blessed.
        </h3>
      </div>

     <div className="testimonial-grid">
         <TestimonialCard />
         <TestimonialCard />
         <TestimonialCard />
         <TestimonialCard />
         <TestimonialCard />
         <TestimonialCard />
     </div>
    </section>
  );
}

export default Testimonial;
