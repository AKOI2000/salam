import TestimonialCard from "../_components/TestimonialCard";

const testimonials = [
  {
    id: 1,
    imageUrl: "/imatination.png",
    name: "Matin",
    role: "Lead and Creative Director, Imatinations",
    message:
      "Mo salam is an exceptional Motion Designer who is incredibly diligent in his work. He is professional and consistently delivers outstanding quality. What impresses me most is his ability to produce top-notch results within a remarkably short turnaround time. I highly recommend him to anyone looking for quality, reliability, and excellence.",
  },
  {
    id: 2,
    imageUrl: "/hook1.png",
    name: "Miracle",
    role: "Brand Manager, The Hook Creative Agency",
    message:
      "In my experience at a 360 advertising agency, I have only worked closely with two motion designers, and Salam is at the top of that list. He has an incredible ability to manage multiple projects and accounts at the same time without compromising on quality. We worked together on three different brands, each with unique requirements and the same tight deadlines, and he consistently delivered excellent results.",
  },
  {
    id: 3,
    imageUrl: "/hook1.png",
    name: "Ugochukwu",
    role: "Manager, The Hook Creative Agency",
    message:
      "Working with him has been a great experience. He has a strong instinct for brand storytelling and consistently turns ideas into engaging motion graphics and video. He is very creative, open to feedback, and always professional. I genuinely enjoy working with him and would happily recommend for future projects.",
  },
  {
    id: 4,
    imageUrl: "/gtco.png",
    name: "Asiwaju",
    role: "Sales Executive, GTCO",
    message:
      "He clearly brings to life your ideas regardless of how vague you present them to him. I think that extra mile he goes to clearly communicate in visuals trumps every other thing for me.",
  },
  {
    id: 5,
    imageUrl: "/hook1.png",
    name: "Aisha Adeniyi",
    role: "Digital Lead, The Hook Creative Agency",
    message:
      "Working with Mo Salam has been such an experience. As a brilliant motion designer, he brings energy, creativity, and authenticity to every project. It's always impressive how I can share ideas straight off the top of my head, and Salam is able to bring them to life in ways that often exceed expectations. And yes, his attention to detail is exceptional. He is a reliable team member to work with.",
  },
  {
    id: 6,
    imageUrl: "/So&u.png",
    name: "Inomakora",
    role: "Art Director, So&U",
    message:
      "I really enjoyed working with Salam. He’s a creative person who loves and understands his craft. I look forward to working with you again man!",
  },
];

function Testimonial() {
  return (
    <section className="container">
      <div className="section-heading">
        <p className="no-margin no-padding">You better listen</p>
        <h3>words from the blessed.</h3>
      </div>

      <div className="testimonial-grid">
        {/* <TestimonialCard />
        <TestimonialCard />
        <TestimonialCard />
        <TestimonialCard />
        <TestimonialCard />
        <TestimonialCard /> */}

        {testimonials?.map(testimonial => (
          <TestimonialCard key={testimonial.id} testimonial={testimonial}/>
        ))}
      </div>
    </section>
  );
}

export default Testimonial;
