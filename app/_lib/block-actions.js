"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { deleteFromCloudinary } from "./helpers";
import { saveProjectBlocksApi, getBlocksApi } from "./blocksApi";
import { logActivityApi } from "./activityAPI";
import { requireAuth } from "@/lib/requireAuth";

// called by the dnd-kit editor's Save button — sends the full current block array
export async function saveBlocks(projectId, slug, blocks) {
  try {
    if (!projectId) throw new Error("No project ID provided");
    await requireAuth();

    // catch obviously incomplete blocks before hitting the DB —
    // e.g. an image block added but never actually uploaded
    const incompleteBlock = blocks.find((b) => {
      if (b.type === "image" || b.type === "video") {
        return !b.content?.url;
      }
      if (b.type === "link") {
        return !b.content?.url || !b.content?.label;
      }
      return false;
    });

    if (incompleteBlock) {
      const label =
        incompleteBlock.type === "image" || incompleteBlock.type === "video"
          ? `a ${incompleteBlock.type} block is missing its file — please upload one or remove the block`
          : `a link block is missing its URL or label`;
      return { success: false, error: `Cannot save: ${label}.` };
    }

    let existingBlocks = [];
    try {
      existingBlocks = await getBlocksApi(projectId);
    } catch (error) {
      return { success: false, error: "Could not load existing blocks to compare. Please try again." };
    }

    const newBlockIds = new Set(blocks.map((b) => b.id).filter(Boolean));

    const removedMediaBlocks = existingBlocks.filter(
      (b) =>
        (b.type === "image" || b.type === "video") &&
        b.content?.publicId &&
        !newBlockIds.has(b.id)
    );

    // Cloudinary cleanup failures shouldn't block the actual save —
    // an orphaned asset is a minor cost; losing the user's edits isn't
    const cleanupResults = await Promise.allSettled(
      removedMediaBlocks.map((b) =>
        deleteFromCloudinary(b.content.publicId, b.content.resourceType ?? "image")
      )
    );
    const cleanupFailures = cleanupResults.filter((r) => r.status === "rejected");
    if (cleanupFailures.length > 0) {
      console.error(`${cleanupFailures.length} Cloudinary asset(s) failed to delete during block save`, cleanupFailures);
    }

    try {
      await saveProjectBlocksApi(projectId, blocks);
    } catch (error) {
      return { success: false, error: "Could not save blocks to the database. Your changes were not saved — please try again." };
    }

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
    return { success: false, error: error.message || "Something went wrong. Please try again." };
  }
}