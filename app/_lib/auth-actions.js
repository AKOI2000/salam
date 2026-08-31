"use server";

import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { createSessionToken } from "@/lib/session";

export async function login({ email, password }) {
  const user = await prisma.adminUser.findUnique({ where: { email } });

  if (!user) {
    return { error: "Invalid email or password" };
  }

  const isValid = await bcrypt.compare(password, user.passwordHash);
  if (!isValid) {
    return { error: "Invalid email or password" };
  }

  const token = await createSessionToken({ userId: user.id, email: user.email });

  const cookieStore = await cookies();
  cookieStore.set("admin_session", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  });

  redirect("/admin");
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete("admin_session");
  redirect("/login");
}