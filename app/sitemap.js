const routes = ["", "/about", "/portfolio"];

export default function sitemap() {
  const baseUrl = "https://www.moosalam.com";

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: route === "" ? 1 : 0.8,
  }));
}
