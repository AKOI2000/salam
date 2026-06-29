// leadsAPI.js
import { createSupabaseServerClient } from "./supabase/server";
import { unstable_cache } from "next/cache";
import { supabaseAdmin } from "./supabase/admin";

// ✅ use anon client for cached reads
export const getLeadsApi = unstable_cache(
  async () => {
    const { data: Leads, error } = await supabaseAdmin
      .from("Leads")
      .select("*");

    if (error) throw new Error(error.message);
    return Leads;
  },
  ["leads"],
  {
    revalidate: false,
    tags: ["leads"],
  }
);

// ✅ use server client for writes
export async function createLeadApi(leadData) {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("Leads")
    .insert([leadData])
    .select();

  if (error) throw new Error(error.message);
  return data[0];
}

export async function updateLeadApi(id, leadData) {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("Leads")
    .update(leadData)
    .eq("id", id)
    .select();

  if (error) throw new Error(error.message);
  return data[0];
}

export async function deleteLeadApi(id) {
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.from("Leads").delete().eq("id", id);

  if (error) throw new Error(error.message);
}