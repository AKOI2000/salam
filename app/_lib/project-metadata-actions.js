"use server";

import { revalidatePath } from "next/cache";
import { createMetaDataApi, updateMetaDataApi } from "./projectAPI";
import { logActivityApi } from "./activityAPI";

export async function createMetaData(formData) {
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

  const metadata = {
    client,
    role,
    timeline,
    project_id,
    deliverables: deliverablesArray,
    tools: toolsArray,
  };

  try {
    await createMetaDataApi(metadata);

    await logActivityApi({
      type: "project",
      action: "created",
      message: `Project metadata created for client: ${client}`,
    });

    revalidatePath(`/admin/projects/${slug}`);
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

export async function updateMetaData(formData) {
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

  const metadata = {
    client,
    role,
    timeline,
    deliverables: deliverablesArray,
    tools: toolsArray,
  };

  try {
    await updateMetaDataApi(metadata, project_id);

    await logActivityApi({
      type: "project",
      action: "updated",
      message: `Project metadata updated for client: ${client}`,
    });

    revalidatePath(`/admin/projects/${slug}`);
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
}


