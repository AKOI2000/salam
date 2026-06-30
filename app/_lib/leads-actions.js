"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { createLeadApi, deleteLeadApi, updateLeadApi } from "./leadsAPI";
import { logActivityApi } from "./activityAPI";
import { createSupabaseServerClient } from "./supabase/server";

export async function sendLead(formData) {
  try {
    const name = formData.get("name");
    const email = formData.get("email");
    const phone = formData.get("phone");
    const message = formData.get("message");

    await createLeadApi({ name, email, phone, message });

    await logActivityApi({
      type: "lead",
      action: "created",
      message: `New lead from ${name}`,
    });

    revalidateTag("leads");
    revalidateTag("activity");
    revalidatePath("/admin/leads");
    return { success: true };
  } catch (error) {
    if (error.message.includes("23505")) {
      return { success: false, error: "This email has already been submitted" };
    }
    return { success: false, error: error.message };
  }
}

export async function updateLeadStatus(id, status) {
  try {
    if (!id) throw new Error("No lead ID provided");

    const supabase = await createSupabaseServerClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("Unauthorized");

    await updateLeadApi(id, { status });

    await logActivityApi({
      type: "lead",
      action: "updated",
      message: `Lead status updated to ${status}`,
    });

    revalidateTag("leads");
    revalidateTag("activity");
    revalidatePath("/admin/leads");
    return { success: true };

  } catch (error) {
    return { success: false, error: error.message };
  }
}

export async function deleteLead(id) {
  try {
    if (!id) throw new Error("No lead ID provided");

    const supabase = await createSupabaseServerClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("Unauthorized");

    await deleteLeadApi(id);

    await logActivityApi({
      type: "lead",
      action: "deleted",
      message: `Lead deleted`,
    });

    revalidateTag("leads");
    revalidateTag("activity");
    revalidatePath("/admin/leads");
    return { success: true };

  } catch (error) {
    return { success: false, error: error.message };
  }
}