// import { supabase } from "./supabase";
import { supabaseAdmin } from "./supabase/admin";
import { createSupabaseServerClient } from "./supabase/server";
import { unstable_cache } from "next/cache";

export async function logActivityApi({ type, action, message }) {
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase
    .from("activity_log")
    .insert({ type, action, message });

  if (error) throw new Error(error.message);
}

export const getRecentActivityApi = unstable_cache(
  async () => {
    const { data, error } = await supabaseAdmin // ← anon client
      .from("activity_log")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(10);

    if (error) throw new Error(error.message);
    return data;
  },
  ["activity"],
  {
    revalidate: false,
    tags: ["activity"],
  },
);