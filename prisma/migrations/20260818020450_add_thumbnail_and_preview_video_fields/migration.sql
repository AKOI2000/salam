/*
  Warnings:

  - You are about to drop the `ActivityLog` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "previewVideoPublicId" TEXT,
ADD COLUMN     "previewVideoResourceType" TEXT,
ADD COLUMN     "previewVideoUrl" TEXT,
ADD COLUMN     "thumbnail" TEXT,
ADD COLUMN     "thumbnailPublicId" TEXT,
ADD COLUMN     "thumbnailResourceType" TEXT;

-- DropTable
DROP TABLE "ActivityLog";

-- CreateTable
CREATE TABLE "activity_log" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "type" TEXT,
    "action" TEXT,
    "message" TEXT,

    CONSTRAINT "activity_log_pkey" PRIMARY KEY ("id")
);
