"use server";
import { redirect } from "next/navigation";

export async function login(data) {
  // TODO: replace with real auth
  redirect("/admin");
}

export async function logout() {
  // TODO: replace with real auth
  redirect("/login");
}