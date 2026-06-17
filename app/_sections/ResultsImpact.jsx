function ResultsImpact({section}) {
  const { text } = section;

  return (
    <section className="container">
      <div className="section-heading">
        <h2>Results & Impact</h2>
      </div>

        <div className="case-study">
        <p>{text}</p>
      </div>
    </section>
  );
}

export default ResultsImpact;
