// blocksAPI.js
import { prisma } from "@/lib/prisma";

export async function createBlockApi(projectId, { type, content, order }) {
  try {
    const blockCount =
      order ?? (await prisma.block.count({ where: { projectId } }));

    return await prisma.block.create({
      data: { projectId, type, content, order: blockCount },
    });
  } catch (error) {
    console.error(error);
    throw new Error("Block could not be created");
  }
}

export async function updateBlockApi(blockId, { type, content }) {
  try {
    return await prisma.block.update({
      where: { id: blockId },
      data: { type, content },
    });
  } catch (error) {
    console.error(error);
    throw new Error("Block could not be updated");
  }
}

export async function deleteBlockApi(blockId) {
  try {
    await prisma.block.delete({ where: { id: blockId } });
  } catch (error) {
    console.error(error);
    throw new Error("Block could not be deleted");
  }
}

export async function getBlocksApi(projectId) {
  try {
    return await prisma.block.findMany({
      where: { projectId },
      orderBy: { order: "asc" },
    });
  } catch (error) {
    console.error(error);
    throw new Error("Blocks could not be fetched");
  }
}

// bulk replace-all — used by the dnd-kit editor's "Save" action
export async function saveProjectBlocksApi(projectId, blocks) {
  try {
    return await prisma.$transaction(async (tx) => {
      await tx.block.deleteMany({ where: { projectId } });

      if (blocks.length === 0) return [];

      await tx.block.createMany({
        data: blocks.map((block, index) => ({
          projectId,
          type: block.type,
          order: index, // trust array position, not client-sent order values
          content: block.content,
        })),
      });

      return tx.block.findMany({
        where: { projectId },
        orderBy: { order: "asc" },
      });
    });
  } catch (error) {
    console.error(error);
    throw new Error("Blocks could not be saved");
  }
}

// used before deleting a project's whole block set in isolation
// (not needed for project deletion itself — Prisma's onDelete: Cascade handles that)
export async function deleteBlocksApi(projectId) {
  try {
    await prisma.block.deleteMany({ where: { projectId } });
  } catch (error) {
    console.error(error);
    throw new Error("Blocks could not be deleted");
  }
}