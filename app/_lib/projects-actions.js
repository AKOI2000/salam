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

// TODO: swap for real Neon Auth session check once auth is wired back up
async function requireAuth() {
  return true;
}

export async function createNewProject(formData) {
  try {
    await requireAuth();

    const title = formData.get("title");
    const excerpt = formData.get("excerpt");
    const thumbnail = formData.get("thumbnail");
    const previewVideo = formData.get("preview_video");
    const coverImage = formData.get("cover_image");

    const [thumbnailUpload, previewVideoUpload, coverUpload] = await Promise.all([
      thumbnail?.size > 0 ? uploadToCloudinary(thumbnail) : null,
      previewVideo?.size > 0 ? uploadToCloudinary(previewVideo) : null,
      coverImage?.size > 0 ? uploadToCloudinary(coverImage) : null,
    ]);

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

    await createProjectApi(project);

    await logActivityApi({
      type: "project",
      action: "created",
      message: `New project created: ${title}`,
    });

    revalidateTag("projects");
    revalidateTag("activity");
    revalidatePath("/admin/projects");
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
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
      if (existingProject.thumbnailPublicId) {
        await deleteFromCloudinary(existingProject.thumbnailPublicId, "image");
      }
      const upload = await uploadToCloudinary(thumbnail);
      updatedData.thumbnail = upload.url;
      updatedData.thumbnailPublicId = upload.publicId;
      updatedData.thumbnailResourceType = upload.resourceType;
    }

    if (previewVideo?.size > 0) {
      if (existingProject.previewVideoPublicId) {
        await deleteFromCloudinary(existingProject.previewVideoPublicId, "video");
      }
      const upload = await uploadToCloudinary(previewVideo);
      updatedData.previewVideoUrl = upload.url;
      updatedData.previewVideoPublicId = upload.publicId;
      updatedData.previewVideoResourceType = upload.resourceType;
    }

    if (coverImage?.size > 0) {
      if (existingProject.coverImagePublicId) {
        await deleteFromCloudinary(existingProject.coverImagePublicId, "image");
      }
      const upload = await uploadToCloudinary(coverImage);
      updatedData.coverImage = upload.url;
      updatedData.coverImagePublicId = upload.publicId;
      updatedData.coverImageResourceType = upload.resourceType;
    }

    await updateProjectApi(existingProject.id, updatedData);

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
    return { success: false, error: error.message };
  }
}

export async function deleteProject(id) {
  try {
    if (!id) throw new Error("No project ID provided");
    await requireAuth();

    const project = await getProjectByIdApi(id);

    const imageOrVideoBlocks = project.blocks.filter(
      (b) => (b.type === "image" || b.type === "video") && b.content?.publicId
    );

    await Promise.all([
      project.thumbnailPublicId &&
        deleteFromCloudinary(project.thumbnailPublicId, "image"),
      project.previewVideoPublicId &&
        deleteFromCloudinary(project.previewVideoPublicId, "video"),
      project.coverImagePublicId &&
        deleteFromCloudinary(project.coverImagePublicId, "image"),
      ...imageOrVideoBlocks.map((b) =>
        deleteFromCloudinary(b.content.publicId, b.content.resourceType ?? "image")
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