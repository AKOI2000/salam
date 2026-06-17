"use server";

import { revalidatePath } from "next/cache";
import { createLeadApi, deleteLeadApi, updateLeadApi } from "./leadsAPI";

export async function sendLead(formData) {
  try {
    const name = formData.get("name");
    const email = formData.get("email");
    const phone = formData.get("phone");
    const message = formData.get("message");

    await createLeadApi({ name, email, phone, message });

    revalidatePath("/admin/leads");
    return { success: true };
  } catch (error) {
    // Handle duplicate email specifically
    if (error.message.includes("23505")) {
      return { success: false, error: "This email has already been submitted" };
    }
    return { success: false, error: error.message };
  }
}

export async function updateLeadStatus(id, status) {
  try {
    if (!id) throw new Error("No lead ID provided");

    await updateLeadApi(id, { status });

    revalidatePath("/admin/leads");
    revalidatePath(`/admin/leads`);
    return { success: true };

  } catch (error) {
    return { success: false, error: error.message };
  }
}


export async function deleteLead(id) {
  try {
    if (!id) throw new Error("No lead ID provided");

    await deleteLeadApi(id);

    revalidatePath("/admin/leads");
    return { success: true };

  } catch (error) {
    return { success: false, error: error.message };
  }
}