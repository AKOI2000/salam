import Image from "next/image";
import DashboardProductCardButtons from "./DashboardProductCardButtons";

function DashboadrdProductCard({ product }) {
  const shortDescription =
    product.short_description.length > 50
      ? product.short_description.substring(0, 42) + " ......."
      : product.short_description;
  return (
    <div className="products-table-row">
      <Image
        alt={product.tile}
        src={product.homepage_thumbnail}
        width={300}
        height={200}
      />
      <p className="title">{product.title}</p>
      <p>{shortDescription}</p>
      <p className={product.show_on_homepage ? "active" : "inactive"}>
        {product.show_on_homepage ? "Active" : "Inactive"}
      </p>
      <p className={product.published ? "published" : "draft"}>
        {product.published ? "Published" : "Draft"}
      </p>

      <DashboardProductCardButtons product={product} />
    </div>
  );
}

export default DashboadrdProductCard;
