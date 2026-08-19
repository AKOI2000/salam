"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { upsertMetaDataApi } from "./projectsAPI";
import { logActivityApi } from "./activityAPI";

async function requireAuth() {
  return true;
}

export async function saveMetaData(formData) {
  try {
    await requireAuth();

    const deliverables = formData.get("deliverables");
    const tools = formData.get("tools");
    const client = formData.get("client");
    const role = formData.get("role");
    const timeline = formData.get("timeline");
    const project_id = formData.get("project_id");
    const slug = formData.get("slug");

    const deliverablesArray = deliverables
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);

    const toolsArray = tools
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);

    await upsertMetaDataApi(project_id, {
      client,
      role,
      timeline,
      deliverables: deliverablesArray,
      tools: toolsArray,
    });

    await logActivityApi({
      type: "project",
      action: "updated",
      message: `Project metadata saved for client: ${client}`,
    });

    revalidateTag("projects");
    revalidateTag("activity");
    revalidatePath(`/admin/projects/${slug}`);
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
}