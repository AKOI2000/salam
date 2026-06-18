import { supabase } from "./supabase";
import { unstable_cache } from "next/cache";

export async function logActivityApi({ type, action, message }) {
  const { error } = await supabase
    .from("activity_log")
    .insert({ type, action, message });

  if (error) throw new Error(error.message);
}

export const getRecentActivityApi = unstable_cache(
  async () => {
    const { data, error } = await supabase
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
  }
);