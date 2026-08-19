"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { deleteFromCloudinary } from "./helpers";
import { saveProjectBlocksApi, getBlocksApi } from "./blocksApi";
import { logActivityApi } from "./activityAPI";

async function requireAuth() {
  return true;
}

// called by the dnd-kit editor's Save button — sends the full current block array
export async function saveBlocks(projectId, slug, blocks) {
  try {
    if (!projectId) throw new Error("No project ID provided");
    await requireAuth();

    const existingBlocks = await getBlocksApi(projectId);
    const newBlockIds = new Set(blocks.map((b) => b.id).filter(Boolean));

    const removedMediaBlocks = existingBlocks.filter(
      (b) =>
        (b.type === "image" || b.type === "video") &&
        b.content?.publicId &&
        !newBlockIds.has(b.id)
    );

    await Promise.all(
      removedMediaBlocks.map((b) =>
        deleteFromCloudinary(b.content.publicId, b.content.resourceType ?? "image")
      )
    );

    await saveProjectBlocksApi(projectId, blocks);

    await logActivityApi({
      type: "project",
      action: "updated",
      message: `Blocks updated for project`,
    });

    revalidateTag("projects");
    revalidateTag("activity");
    revalidatePath(`/admin/projects/${slug}`);
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
}