import Image from "next/image";
import DashboardProductCardButtons from "./DashboardProductCardButtons";

function DashboadrdProductCard({ product }) {
const shortDescription =
  product.excerpt?.length > 50
    ? product.excerpt.substring(0, 42) + " ......."
    : product.excerpt ?? "";
  return (
    <div className="products-table-row">
      <Image
        alt={product.title}
        src={product.thumbnail}
        width={300}
        height={200}
      />
      <p className="title">{product.title}</p>
      <p>{shortDescription}</p>
      <p className={product.featured ? "active" : "inactive"}>
        {product.featured ? "Active" : "Inactive"}
      </p>
      <p className={product.published ? "published" : "draft"}>
        {product.published ? "Published" : "Draft"}
      </p>

      <DashboardProductCardButtons product={product} />
    </div>
  );
}

export default DashboadrdProductCard;
