// lib/sections-actions.js
"use server";

import { revalidatePath } from "next/cache";
import { deleteFromCloudinary, uploadToCloudinary } from "./helpers";
import {
  createMediaItemApi,
  createSectionApi,
  deleteMediaItemApi,
  getSectionMediaApi,
  updateSectionApi,
} from "./sectionApi";
import { deleteSectionApi } from "./sectionApi";

export async function createSection(formData) {
  try {
    const section_type = formData.get("section_type");
    const text = formData.get("text");
    const project_id = formData.get("project_id");
    const alt_text = formData.get("media_alt") || ""; // Optional alt text for media
    const slug = formData.get("slug");

    const files = formData.getAll("section_images");
    const validFiles = files.filter((file) => file.size > 0);

    // console.log({ section_type, text, project_id, validFiles, alt_text });

    // Upload and keep track of each file's type alongside its URL
    const mediaItems = await Promise.all(
      validFiles.map(async (file) => {
        const url = await uploadToCloudinary(file);
        return {
          url,
          media_type: file.type.startsWith("video/") ? "video" : "image",
        };
      }),
    );

    await createSectionApi({
      section_type,
      text, // renamed here
      project_id,
      alt_text,
      media: mediaItems,
    });

    revalidatePath(`/admin/projects/${slug}`);
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

// Deletes the entire section + all its media
export async function deleteSection(sectionId, slug) {
  try {
    if (!sectionId) throw new Error("No section ID provided");

    // Step 1 — fetch all media so we can delete from Cloudinary
    const mediaItems = await getSectionMediaApi(sectionId);

    // Step 2 — delete each file from Cloudinary in parallel
    await Promise.all(
      mediaItems.map((item) =>
        deleteFromCloudinary(item.media_url, item.media_type),
      ),
    );

    // Step 3 — delete the section (cascade handles section_media rows)
    await deleteMediaItemApi(sectionId);
    await deleteSectionApi(sectionId);

    revalidatePath(`/admin/projects/${slug}`);
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

export async function editSection(sectionId, formData, params) {
  try {
    if (!sectionId) throw new Error("No section ID provided");

    const section_type = formData.get("section_type");
    const text = formData.get("section_text");
    const alt_text = formData.get("alt_text");
    const replaceMedia = formData.get("replace_media") === "on";

    // Step 1 — update the section's text fields
    await updateSectionApi(sectionId, { section_type, text });

    // Step 2 — if replace is checked, wipe existing media
    if (replaceMedia) {
      const existingMedia = await getSectionMediaApi(sectionId);

      // Delete from Cloudinary in parallel
      await Promise.all(
        existingMedia.map((item) =>
          deleteFromCloudinary(item.media_url, item.media_type),
        ),
      );

      // Delete the rows from Supabase
      await deleteMediaItemApi(sectionId);
    }

    // Step 3 — upload any new files
    const files = formData.getAll("media");
    const validFiles = files.filter((file) => file.size > 0);

    if (validFiles.length > 0) {
      const mediaItems = await Promise.all(
        validFiles.map(async (file) => {
          const url = await uploadToCloudinary(file);
          return {
            url,
            media_type: file.type.startsWith("video/") ? "video" : "image",
          };
        }),
      );

      // Step 4 — insert new media rows
      const mediaRows = mediaItems.map(({ url, media_type }) => ({
        section_id: sectionId,
        media_url: url,
        media_type,
        alt_text: alt_text || null,
      }));

      await createMediaItemApi(mediaRows);
    }

    // Step 5 — revalidate
    revalidatePath(`/admin/projects/${params}`);
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
}
