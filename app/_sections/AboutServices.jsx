import ServicesList from "../_components/ServicesList";

export default function ServicesHover() {


  return (
    <>
      {/* <style>{css}</style> */}
      <section className="container">
        <div className="section-heading">
          <p className="no-padding">Hover..</p>
          <h3>Services.</h3>
        </div>
        

        <ServicesList />
      </section>
    </>
  );
}
