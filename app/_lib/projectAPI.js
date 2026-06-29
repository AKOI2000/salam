import { createSupabaseServerClient } from "./supabase/server";
import { supabase } from "./supabase"; // keep for public reads
import { unstable_cache } from "next/cache";

export async function createProjectApi(newProject) {
  const supabase = await createSupabaseServerClient();
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
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("Projects")
    .update({ [field]: value })
    .eq("id", id)
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data;
}

// public read — anon client is fine
export const getProjectBySlug = unstable_cache(
  async (slug) => {
    const { data: Projects, error } = await supabase
      .from("Projects")
      .select("*, project_metadata(*), project_sections(*, section_media(*))")
      .eq("slug", slug)
      .eq("published", true) // ← only published projects accessible publicly
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
  },
);

// admin only — no published filter
export const getProjectBySlugAdmin = unstable_cache(
  async (slug) => {
    const { data: Projects, error } = await supabase
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
  ["project-by-slug-admin"],
  {
    revalidate: false,
    tags: ["projects"],
  },
);

// used in deleteProject — no cache needed
export async function getProjectByIdApi(id) {
  const { data: project, error } = await supabase
    .from("Projects")
    .select("*, project_metadata(*), project_sections(*, section_media(*))")
    .eq("id", id)
    .single();

  if (error) {
    console.error(error);
    throw new Error("Project could not be fetched... try again...");
  }

  return project;
}

// public read — anon client is fine
export const getProjects = unstable_cache(
  async () => {
    const { data: Projects, error } = await supabase
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
  },
);

// public portfolio page — only published
export const getPublishedProjects = unstable_cache(
  async () => {
    const { data, error } = await supabase
      .from("Projects")
      .select("*")
      .eq("published", true);

    if (error) {
      console.error(error);
      throw new Error("Projects could not be fetched");
    }

    return data;
  },
  ["published-projects"],
  {
    revalidate: false,
    tags: ["projects"],
  },
);

// homepage selected works — only show_on_homepage
export const getHomepageProjects = unstable_cache(
  async () => {
    const { data, error } = await supabase
      .from("Projects")
      .select("*")
      .eq("show_on_homepage", true)
      .eq("published", true);

    if (error) {
      console.error(error);
      throw new Error("Projects could not be fetched");
    }

    return data;
  },
  ["homepage-projects"],
  {
    revalidate: false,
    tags: ["projects"],
  },
);

export async function updateProjectApi(id, newProject) {
  const supabase = await createSupabaseServerClient();
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
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.from("Projects").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Projects could not be deleted");
  }
}

export async function deleteSectionsApi(id) {
  const supabase = await createSupabaseServerClient();
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
  const supabase = await createSupabaseServerClient();
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
  const supabase = await createSupabaseServerClient();
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

export async function deleteMetaDataApi(id) {
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase
    .from("project_metadata")
    .delete()
    .eq("project_id", id);

  if (error) {
    console.error(error);
    throw new Error("Project Metadata could not be deleted");
  }
}
