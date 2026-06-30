"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { createMetaDataApi, updateMetaDataApi } from "./projectAPI";
import { logActivityApi } from "./activityAPI";
import { createSupabaseServerClient } from "./supabase/server";

export async function createMetaData(formData) {
  try {
    const supabase = await createSupabaseServerClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("Unauthorized");

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

    await createMetaDataApi(metadata);

    await logActivityApi({
      type: "project",
      action: "created",
      message: `Project metadata created for client: ${client}`,
    });

    revalidateTag("projects");
    revalidateTag("activity");
    revalidatePath(`/admin/projects/${slug}`);
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

export async function updateMetaData(formData) {
  try {
    const supabase = await createSupabaseServerClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("Unauthorized");

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

    await updateMetaDataApi(metadata, project_id);

    await logActivityApi({
      type: "project",
      action: "updated",
      message: `Project metadata updated for client: ${client}`,
    });

    revalidateTag("projects");
    revalidateTag("activity");
    revalidatePath(`/admin/projects/${slug}`);
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
}