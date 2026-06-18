import { supabase } from "./supabase";
import { unstable_cache } from "next/cache";

export async function createProjectApi(newProject) {
  console.log(newProject);

  const { data, error } = await supabase
    .from("Projects")
    .insert([newProject])
    .select();

  if (error) {
    console.error(error);
    throw new Error("Project could not be created");
  }

  return data;
}

export async function updateProjectChecklist(id, field, value) {
  const { data, error } = await supabase
    .from("Projects")
    .update({ [field]: value })
    .eq("id", id)
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data;
}

export const getProjectBySlug = unstable_cache(
  async (slug) => {
    let { data: Projects, error } = await supabase
      .from("Projects")
      .select("*, project_metadata(*), project_sections(*, section_media(*))")
      .eq("slug", slug)
      .single();

    if (error) {
      console.error(error);
      throw new Error("Project could not be fetched... try again...");
    }

    return Projects;
  },
  ["project-by-slug"],
  {
    revalidate: false,
    tags: ["projects"],
  }
);

export const getProjects = unstable_cache(
  async () => {
    let { data: Projects, error } = await supabase
      .from("Projects")
      .select("*");

    if (error) {
      console.error(error);
      throw new Error("Projects could not be fetched");
    }

    return Projects;
  },
  ["projects"],
  {
    revalidate: false,
    tags: ["projects"],
  }
);

export async function updateProjectApi(id, newProject) {
  const { data, error } = await supabase
    .from("Projects")
    .update(newProject)
    .eq("id", id)
    .select();

  if (error) {
    console.error(error);
    throw new Error("Projects could not be updated");
  }

  return data;
}

export async function deleteProjectApi(id) {
  const { error } = await supabase.from("Projects").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Projects could not be deleted");
  }
}

export async function deleteSectionsApi(id) {
  const { error } = await supabase
    .from("project_sections")
    .delete()
    .eq("project_id", id);

  if (error) {
    console.error(error);
    throw new Error("Sections could not be deleted");
  }
}

export async function createMetaDataApi(metaData) {
  const { data, error } = await supabase
    .from("project_metadata")
    .insert([metaData])
    .select();

  if (error) {
    console.error(error);
    throw new Error("Project Metadata could not be created");
  }

  return data;
}

export async function updateMetaDataApi(metaData, id) {
  const { data, error } = await supabase
    .from("project_metadata")
    .update(metaData)
    .eq("project_id", id)
    .select();

  if (error) {
    console.error(error);
    throw new Error("Project Metadata could not be updated");
  }

  return data;
}