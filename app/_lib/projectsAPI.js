// projectsAPI.js
import { prisma } from "@/lib/prisma";
import { unstable_cache } from "next/cache";

const projectWithRelations = {
  metadata: true,
  blocks: { orderBy: { order: "asc" } },
};

export async function createProjectApi(newProject) {
  try {
    return await prisma.project.create({ data: newProject });
  } catch (error) {
    console.error(error);
    throw new Error("Project could not be created");
  }
}

export async function updateProjectChecklist(id, field, value) {
  try {
    return await prisma.project.update({
      where: { id },
      data: { [field]: value },
    });
  } catch (error) {
    console.error(error);
    throw new Error(error.message);
  }
}

// public read
export const getProjectBySlug = unstable_cache(
  async (slug) => {
    const project = await prisma.project.findFirst({
      where: { slug, published: true },
      include: projectWithRelations,
    });

    if (!project) throw new Error("Project could not be fetched... try again...");
    return project;
  },
  ["project-by-slug"],
  { revalidate: false, tags: ["projects"] }
);

// admin only — no published filter
export const getProjectBySlugAdmin = unstable_cache(
  async (slug) => {
    const project = await prisma.project.findUnique({
      where: { slug },
      include: projectWithRelations,
    });

    if (!project) throw new Error("Project could not be fetched... try again...");
    return project;
  },
  ["project-by-slug-admin"],
  { revalidate: false, tags: ["projects"] }
);

// used in deleteProject — no cache needed
export async function getProjectByIdApi(id) {
  const project = await prisma.project.findUnique({
    where: { id },
    include: projectWithRelations,
  });

  if (!project) throw new Error("Project could not be fetched... try again...");
  return project;
}

export const getProjects = unstable_cache(
  async () => {
    return prisma.project.findMany({ orderBy: { order: "asc" } });
  },
  ["projects"],
  { revalidate: false, tags: ["projects"] }
);

export const getPublishedProjects = unstable_cache(
  async () => {
    return prisma.project.findMany({
      where: { published: true },
      orderBy: { order: "asc" },
    });
  },
  ["published-projects"],
  { revalidate: false, tags: ["projects"] }
);

export const getHomepageProjects = unstable_cache(
  async () => {
    return prisma.project.findMany({
      where: { featured: true, published: true },
      orderBy: { order: "asc" },
    });
  },
  ["homepage-projects"],
  { revalidate: false, tags: ["projects"] }
);

export async function updateProjectApi(id, newProject) {
  try {
    return await prisma.project.update({
      where: { id },
      data: newProject,
    });
  } catch (error) {
    console.error(error);
    throw new Error("Projects could not be updated");
  }
}

export async function deleteProjectApi(id) {
  try {
    await prisma.project.delete({ where: { id } });
  } catch (error) {
    console.error(error);
    throw new Error("Projects could not be deleted");
  }
}

export async function upsertMetaDataApi(projectId, metaData) {
  try {
    return await prisma.projectMetadata.upsert({
      where: { projectId },
      update: metaData,
      create: { ...metaData, projectId },
    });
  } catch (error) {
    console.error(error);
    throw new Error("Project Metadata could not be saved");
  }
}

export async function deleteMetaDataApi(projectId) {
  try {
    await prisma.projectMetadata.delete({ where: { projectId } });
  } catch (error) {
    console.error(error);
    throw new Error("Project Metadata could not be deleted");
  }
}