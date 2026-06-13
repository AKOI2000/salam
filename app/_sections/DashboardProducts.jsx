import DashboadrdProductCard from "./DashboadrdProductCard";

const fakeData = [
  {
    id: 1,
    title: "Product 1",
    homepage_thumbnail: "/bg.png",
    short_description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas, voluptate.",
    slug: "product-1",
    show_on_homepage: true,
    published: true,
  },
  {
    id: 2,
    title: "Product 2",
    homepage_thumbnail: "/bg.png",
    short_description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas, voluptate.",
    slug: "product-2",
    show_on_homepage: false,
    published: false,
  },
  {
    id: 3,
    title: "Product 3",
    homepage_thumbnail: "/bg.png",
    short_description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas, voluptate.",
    slug: "product-3",
    show_on_homepage: false,
    published: true,
  },
  {
    id: 4,
    title: "Product 4",
    homepage_thumbnail: "/bg.png",
    short_description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas, voluptate.",
    slug: "product-4",
    show_on_homepage: true,
    published: true,
  },
];

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
