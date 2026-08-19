import { prisma } from "@/lib/prisma";
import { unstable_cache } from "next/cache";

export const getLeadsApi = unstable_cache(
  async () => {
    return prisma.lead.findMany({
      orderBy: { createdAt: "desc" },
    });
  },
  ["leads"],
  {
    revalidate: false,
    tags: ["leads"],
  }
);

export async function createLeadApi(leadData) {
  return prisma.lead.create({ data: leadData });
}

export async function updateLeadApi(id, leadData) {
  return prisma.lead.update({
    where: { id },
    data: leadData,
  });
}

export async function deleteLeadApi(id) {
  return prisma.lead.delete({ where: { id } });
}