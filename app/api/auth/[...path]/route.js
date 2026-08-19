// app/api/auth/[...path]/route.ts
import { auth } from "@/app/_lib/neon/server";

export const { GET, POST } = auth.handler();