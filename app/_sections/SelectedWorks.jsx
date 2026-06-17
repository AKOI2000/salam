import { Suspense } from "react";
import SelectedWorksLayout from "../_components/SelectedWorksLayout";
import SelectedWorksSkeleton from "../_components/SelectedWorksSkeleton";

function SelectedWorks() {
  return (
    <section className="container">
      <div className="section-heading">
        <h3>work.</h3>
      </div>

      <Suspense fallback={<SelectedWorksSkeleton />}>
        <SelectedWorksLayout />
      </Suspense>
    </section>
  );
}

export default SelectedWorks;
