// app/_lib/auth-actions.js
"use server";

import { createSupabaseServerClient } from "./supabase/server";
import { redirect } from "next/navigation";

export async function login({ email, password }) {
  const supabase = await createSupabaseServerClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { success: false, error: error.message };
  }

  redirect("/admin"); // ← outside try/catch
}

export async function logout() {
  const supabase = await createSupabaseServerClient();
  
  const { error } = await supabase.auth.signOut();

  if (error) {
    return { success: false, error: error.message };
  }

  redirect("/login"); // ← outside try/catch
}