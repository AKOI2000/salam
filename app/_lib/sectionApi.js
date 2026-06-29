import { createSupabaseServerClient } from "./supabase/server";
import { supabase } from "./supabase"; // keep for public reads

export async function createSectionApi({
  section_type,
  text,
  project_id,
  media,
  alt_text,
}) {
  const supabase = await createSupabaseServerClient();

  // Step 1 — create the section
  const { data: section, error: sectionError } = await supabase
    .from("project_sections")
    .insert({
      section_type,
      text,
      project_id,
    })
    .select()
    .single();

  if (sectionError) {
    if (sectionError.code === "23505") {
      throw new Error(
        `A "${section_type}" section already exists for this project`,
      );
    }
    throw new Error(sectionError.message);
  }

  // Step 2 — insert each image as its own row
  if (media.length > 0) {
    const mediaRows = media.map(({ url, media_type }) => ({
      section_id: section.id,
      media_url: url,
      media_type,
      alt_text: alt_text || null,
    }));

    const { error: mediaError } = await supabase
      .from("section_media")
      .insert(mediaRows);

    if (mediaError) throw new Error(mediaError.message);
  }

  return section;
}

export async function deleteSectionApi(sectionId) {
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase
    .from("project_sections")
    .delete()
    .eq("id", sectionId);

  if (error) throw new Error(error.message);
}

export async function updateSectionApi(sectionId, { section_type, text }) {
  const supabase = await createSupabaseServerClient();
  const { error: updateError } = await supabase
    .from("project_sections")
    .update({ section_type, text })
    .eq("id", sectionId);

  if (updateError) {
    if (updateError.code === "23505") {
      throw new Error(
        `A "${section_type}" section already exists for this project`,
      );
    }
    throw new Error(updateError.message);
  }
}

// public read — anon client is fine
export async function getSectionMediaApi(sectionId) {
  const { data, error } = await supabase
    .from("section_media")
    .select("*")
    .eq("section_id", sectionId);

  if (error) throw new Error(error.message);
  return data;
}

export async function deleteMediaItemApi(sectionId) {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("section_media")
    .delete()
    .eq("section_id", sectionId)
    .select();

  if (error) throw new Error(error.message);
  return data;
}

export async function createMediaItemApi(mediaRows) {
  const supabase = await createSupabaseServerClient();
  const { error: mediaError } = await supabase
    .from("section_media")
    .insert(mediaRows);

  if (mediaError) throw new Error(mediaError.message);
}