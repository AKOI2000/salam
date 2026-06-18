import { supabase } from "./supabase";
import { unstable_cache } from "next/cache";

export const getLeadsApi = unstable_cache(
  async () => {
    let { data: Leads, error } = await supabase.from("Leads").select("*");

    if (error) throw new Error(error.message);
    return Leads;
  },
  ["leads"],
  {
    revalidate: false,
    tags: ["leads"],
  }
);

export async function createLeadApi(leadData) {
  const { data, error } = await supabase
    .from("Leads")
    .insert([leadData])
    .select();

  if (error) throw new Error(error.message);
  return data[0];
}

export async function updateLeadApi(id, leadData) {
  const { data, error } = await supabase
    .from("Leads")
    .update(leadData)
    .eq("id", id)
    .select();

  if (error) throw new Error(error.message);
  return data[0];
}

export async function deleteLeadApi(id) {
  const { error } = await supabase.from("Leads").delete().eq("id", id);

  if (error) throw new Error(error.message);
}