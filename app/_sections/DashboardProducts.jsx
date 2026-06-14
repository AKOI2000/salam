import DashboadrdProductCard from "./DashboadrdProductCard";


function DashboardProducts({projects}) {
  return (
    <div className="table-wrapper">
      <div className="products-table">
        <div className="products-table-header">
          <div></div>
          <p>Title</p>
          <p>Description</p>
          <p>Show on homepage</p>
          <p>Published</p>
        </div>
        {projects.map((product) => (
          <DashboadrdProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default DashboardProducts;
