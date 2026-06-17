import { Suspense } from "react";
import SelectedWorksLayout from "../_components/SelectedWorksLayout";

function SelectedWorks() {
  return (
    <section className="container">
      <div className="section-heading">
        <h3>work.</h3>
      </div>

      <Suspense fallback={<p>Loading..</p>}>
        <SelectedWorksLayout />
      </Suspense>
    </section>
  );
}

export default SelectedWorks;
