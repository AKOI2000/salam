"use server";
import { deleteFromCloudinary, uploadToCloudinary } from "./helpers";
import slugify from "slugify";
import { revalidatePath, revalidateTag } from "next/cache";
import { logActivityApi } from "./activityAPI";
import {
  createProjectApi,
  deleteProjectApi,
  getProjectByIdApi,
  updateProjectApi,
  updateProjectChecklist,
  deleteMetaDataApi,
} from "./projectsAPI";
import { translatePrismaError } from "./errorMessage";
import { requireAuth } from "@/lib/requireAuth";

export async function createNewProject(formData) {
  try {
    await requireAuth();

    const title = formData.get("title");
    const excerpt = formData.get("excerpt");
    const thumbnail = formData.get("thumbnail");
    const previewVideo = formData.get("preview_video");
    const coverImage = formData.get("cover_image");

    if (!title) {
      return { success: false, error: "Project title is required." };
    }

    let thumbnailUpload = null;
    if (thumbnail?.size > 0) {
      try {
        thumbnailUpload = await uploadToCloudinary(thumbnail);
      } catch (error) {
        return {
          success: false,
          error: `Thumbnail upload failed: ${error.message}`,
        };
      }
    }

    let previewVideoUpload = null;
    if (previewVideo?.size > 0) {
      try {
        previewVideoUpload = await uploadToCloudinary(previewVideo);
      } catch (error) {
        return {
          success: false,
          error: `Preview video upload failed: ${error.message}`,
        };
      }
    }

    let coverUpload = null;
    if (coverImage?.size > 0) {
      try {
        coverUpload = await uploadToCloudinary(coverImage);
      } catch (error) {
        return {
          success: false,
          error: `Cover image upload failed: ${error.message}`,
        };
      }
    }

    const slug = slugify(title, { lower: true, strict: true });

    const project = {
      title,
      slug,
      excerpt,
      thumbnail: thumbnailUpload?.url ?? null,
      thumbnailPublicId: thumbnailUpload?.publicId ?? null,
      thumbnailResourceType: thumbnailUpload?.resourceType ?? null,
      previewVideoUrl: previewVideoUpload?.url ?? null,
      previewVideoPublicId: previewVideoUpload?.publicId ?? null,
      previewVideoResourceType: previewVideoUpload?.resourceType ?? null,
      coverImage: coverUpload?.url ?? null,
      coverImagePublicId: coverUpload?.publicId ?? null,
      coverImageResourceType: coverUpload?.resourceType ?? null,
    };

    try {
      await createProjectApi(project);
    } catch (error) {
      return { success: false, error: translatePrismaError(error) };
    }

    await logActivityApi({
      type: "project",
      action: "created",
      message: `New project created: ${title}`,
    });

    revalidateTag("projects");
    revalidateTag("activity");
    revalidatePath("/admin/projects");
    return { success: true, slug };
  } catch (error) {
    return {
      success: false,
      error: error.message || "Something went wrong. Please try again.",
    };
  }
}

export async function updateProject(formData) {
  try {
    await requireAuth();

    const title = formData.get("title");
    const excerpt = formData.get("excerpt");
    const thumbnail = formData.get("thumbnail");
    const previewVideo = formData.get("preview_video");
    const coverImage = formData.get("cover_image");
    const existingProject = JSON.parse(formData.get("existing_product"));

    const updatedData = {};

    if (title !== existingProject.title) updatedData.title = title;
    if (excerpt !== existingProject.excerpt) updatedData.excerpt = excerpt;

    if (thumbnail?.size > 0) {
      try {
        if (existingProject.thumbnailPublicId) {
          await deleteFromCloudinary(
            existingProject.thumbnailPublicId,
            "image",
          );
        }
        const upload = await uploadToCloudinary(thumbnail);
        updatedData.thumbnail = upload.url;
        updatedData.thumbnailPublicId = upload.publicId;
        updatedData.thumbnailResourceType = upload.resourceType;
      } catch (error) {
        return {
          success: false,
          error: `Thumbnail upload failed: ${error.message}`,
        };
      }
    }

    if (previewVideo?.size > 0) {
      try {
        if (existingProject.previewVideoPublicId) {
          await deleteFromCloudinary(
            existingProject.previewVideoPublicId,
            "video",
          );
        }
        const upload = await uploadToCloudinary(previewVideo);
        updatedData.previewVideoUrl = upload.url;
        updatedData.previewVideoPublicId = upload.publicId;
        updatedData.previewVideoResourceType = upload.resourceType;
      } catch (error) {
        return {
          success: false,
          error: `Preview video upload failed: ${error.message}`,
        };
      }
    }

    if (coverImage?.size > 0) {
      try {
        if (existingProject.coverImagePublicId) {
          await deleteFromCloudinary(
            existingProject.coverImagePublicId,
            "image",
          );
        }
        const upload = await uploadToCloudinary(coverImage);
        updatedData.coverImage = upload.url;
        updatedData.coverImagePublicId = upload.publicId;
        updatedData.coverImageResourceType = upload.resourceType;
      } catch (error) {
        return {
          success: false,
          error: `Cover image upload failed: ${error.message}`,
        };
      }
    }

    try {
      await updateProjectApi(existingProject.id, updatedData);
    } catch (error) {
      return { success: false, error: translatePrismaError(error) };
    }

    await logActivityApi({
      type: "project",
      action: "updated",
      message: `Project updated: ${existingProject.title}`,
    });

    revalidateTag("projects");
    revalidateTag("activity");
    revalidatePath("/admin/projects");
    revalidatePath(`/admin/projects/${existingProject.slug}`);
    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: error.message || "Something went wrong. Please try again.",
    };
  }
}

export async function deleteProject(id) {
  try {
    if (!id) throw new Error("No project ID provided");
    await requireAuth();

    const project = await getProjectByIdApi(id);

    const imageOrVideoBlocks = project.blocks.filter(
      (b) => (b.type === "image" || b.type === "video") && b.content?.publicId,
    );

    await Promise.all([
      project.thumbnailPublicId &&
        deleteFromCloudinary(project.thumbnailPublicId, "image"),
      project.previewVideoPublicId &&
        deleteFromCloudinary(project.previewVideoPublicId, "video"),
      project.coverImagePublicId &&
        deleteFromCloudinary(project.coverImagePublicId, "image"),
      ...imageOrVideoBlocks.map((b) =>
        deleteFromCloudinary(
          b.content.publicId,
          b.content.resourceType ?? "image",
        ),
      ),
    ]);

    // blocks + metadata are also removed automatically via onDelete: Cascade,
    // this call is just to keep behavior explicit/predictable
    await deleteMetaDataApi(id).catch(() => {});
    await deleteProjectApi(id);

    await logActivityApi({
      type: "project",
      action: "deleted",
      message: `Project deleted: ${project.title}`,
    });

    revalidateTag("projects");
    revalidateTag("activity");
    revalidatePath("/admin/projects");
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
}
export async function updateCheckList(id, slug, field, newValue) {
  try {
    if (!id) throw new Error("No project ID provided");
    await requireAuth();

    await updateProjectChecklist(id, field, newValue);

    await logActivityApi({
      type: "project",
      action: "updated",
      message: `Project ${field} set to ${newValue}`,
    });

    revalidateTag("projects");
    revalidateTag("activity");
    revalidatePath(`/admin/projects/${slug}`);
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
}
