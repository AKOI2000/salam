// activityAPI.js
import { prisma } from "@/lib/prisma";
import { unstable_cache } from "next/cache";

export async function logActivityApi({ type, action, message }) {
  await prisma.activityLog.create({
    data: { type, action, message },
  });
}

export const getRecentActivityApi = unstable_cache(
  async () => {
    return prisma.activityLog.findMany({
      orderBy: { createdAt: "desc" },
      take: 10,
    });
  },
  ["activity"],
  {
    revalidate: false,
    tags: ["activity"],
  }
);