// lib/sections-actions.js
"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { deleteFromCloudinary } from "./helpers";
import {
  createMediaItemApi,
  createSectionApi,
  deleteMediaItemApi,
  getSectionMediaApi,
  updateSectionApi,
  deleteSectionApi,
} from "./sectionApi";
import { logActivityApi } from "./activityAPI";

export async function createSection(formData) {
  try {
    const section_type = formData.get("section_type");
    const text = formData.get("text");
    const project_id = formData.get("project_id");
    const alt_text = formData.get("media_alt") || "";
    const slug = formData.get("slug");

    // URLs already uploaded from client — just parse them
    const mediaItems = JSON.parse(formData.get("media_items") || "[]");

    await createSectionApi({
      section_type,
      text,
      project_id,
      alt_text,
      media: mediaItems,
    });

    await logActivityApi({
      type: "section",
      action: "created",
      message: `New "${section_type}" section added`,
    });

    revalidateTag("projects");
    revalidateTag("activity");
    revalidatePath(`/admin/projects/${slug}`);
    return { success: true };

  } catch (error) {
    return { success: false, error: error.message };
  }
}

export async function deleteSection(sectionId, slug) {
  try {
    if (!sectionId) throw new Error("No section ID provided");

    const mediaItems = await getSectionMediaApi(sectionId);

    await Promise.all(
      mediaItems.map((item) =>
        deleteFromCloudinary(item.media_url, item.media_type),
      ),
    );

    await deleteMediaItemApi(sectionId);
    await deleteSectionApi(sectionId);

    await logActivityApi({
      type: "section",
      action: "deleted",
      message: `Section deleted`,
    });

    revalidateTag("projects");
    revalidateTag("activity");
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

    await updateSectionApi(sectionId, { section_type, text });

    if (replaceMedia) {
      const existingMedia = await getSectionMediaApi(sectionId);

      await Promise.all(
        existingMedia.map((item) =>
          deleteFromCloudinary(item.media_url, item.media_type),
        ),
      );

      await deleteMediaItemApi(sectionId);
    }

    // URLs already uploaded from client — just parse them
    const mediaItems = JSON.parse(formData.get("media_items") || "[]");

    if (mediaItems.length > 0) {
      const mediaRows = mediaItems.map(({ url, media_type }) => ({
        section_id: sectionId,
        media_url: url,
        media_type,
        alt_text: alt_text || null,
      }));

      await createMediaItemApi(mediaRows);
    }

    await logActivityApi({
      type: "section",
      action: "updated",
      message: `"${section_type}" section updated`,
    });

    revalidateTag("projects");
    revalidateTag("activity");
    revalidatePath(`/admin/projects/${params}`);
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
}