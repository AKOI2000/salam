// app/(public)/portfolio/[slug]/page.jsx
import ProjectMeta from "@/app/_components/ProjectMeta";
import CaseStudyHero from "@/app/_sections/CaseStudyHero";
import BlockRenderer from "@/app/_sections/BlockRenderer";
import { getProjectBySlug, getPublishedProjects } from "@/app/_lib/projectsAPI";

export async function generateStaticParams() {
  const projects = await getPublishedProjects();
  return projects.map((project) => ({ slug: String(project.slug) }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  return {
    title: project.title,
    description: project.excerpt,
    openGraph: {
      title: project.title,
      description: project.excerpt,
      url: `https://yoursite.com/portfolio/${slug}`,
      images: [
        {
          url: project.coverImage ?? project.thumbnail,
          width: 1200,
          height: 630,
          alt: project.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: project.title,
      description: project.excerpt,
      images: [project.coverImage ?? project.thumbnail],
    },
  };
}

async function page({ params }) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  return (
    <>
      <CaseStudyHero project={project} />
      <ProjectMeta project={project} />
      <div className="container">
        <BlockRenderer blocks={project.blocks} />
      </div>
    </>
  );
}

export default page;
