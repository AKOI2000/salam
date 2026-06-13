"use server";

import { revalidatePath } from "next/cache";
import { createMetaDataApi, updateMetaDataApi } from "./projectAPI";

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
    .filter(Boolean); // removes any empty strings

  const toolsArray = tools
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean); // removes any empty strings

  const metadata = {
    client,
    role,
    timeline,
    project_id,
    deliverables: deliverablesArray,
    tools: toolsArray,
  };

  //   console.log(metadata, project_id);

  try {
    await createMetaDataApi(metadata);

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
    .filter(Boolean); // removes any empty strings

  const toolsArray = tools
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean); // removes any empty strings

  const metadata = {
    client,
    role,
    timeline,
    deliverables: deliverablesArray,
    tools: toolsArray,
  };

  try {
    await updateMetaDataApi(metadata, project_id);

    revalidatePath(`/admin/projects/${slug}`);

    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
}
