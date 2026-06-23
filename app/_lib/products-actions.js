"use server";
import { deleteFromCloudinary, uploadToCloudinary } from "./helpers";
import slugify from "slugify";
import {
  createProjectApi,
  deleteProjectApi,
  deleteSectionsApi,
  updateProjectApi,
  updateProjectChecklist,
} from "./projectAPI";
import { revalidatePath, revalidateTag } from "next/cache";
import { logActivityApi } from "./activityAPI";

export async function createNewProject(formData) {
  try {
    const title = formData.get("title");
    const short_description = formData.get("short_description");
    const homepage_thumbnail = formData.get("homepage_thumbnail");
    const homepage_preview_video = formData.get("homepage_preview_video");
    const case_study_cover = formData.get("case_study_cover");

    const [thumbnailUrl, previewVideoUrl, coverUrl] = await Promise.all([
      homepage_thumbnail?.size > 0
        ? uploadToCloudinary(homepage_thumbnail)
        : null,
      homepage_preview_video?.size > 0
        ? uploadToCloudinary(homepage_preview_video)
        : null,
      case_study_cover?.size > 0 ? uploadToCloudinary(case_study_cover) : null,
    ]);

    const slug = slugify(title, { lower: true, strict: true });

    const project = {
      title,
      slug,
      short_description,
      homepage_thumbnail: thumbnailUrl,
      homepage_preview_video: previewVideoUrl,
      case_study_cover: coverUrl,
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
    const title = formData.get("title");
    const short_description = formData.get("short_description");
    const homepage_thumbnail = formData.get("homepage_thumbnail");
    const homepage_preview_video = formData.get("homepage_preview_video");
    const case_study_cover = formData.get("case_study_cover");
    const existing_product = formData.get("existing_product");
    const parsedProduct = JSON.parse(existing_product);

    const updatedData = {};

    if (title !== parsedProduct.title) {
      updatedData.title = title;
    }

    if (short_description !== parsedProduct.short_description) {
      updatedData.short_description = short_description;
    }

    if (homepage_thumbnail?.size > 0) {
      if (parsedProduct.homepage_thumbnail) {
        await deleteFromCloudinary(parsedProduct.homepage_thumbnail, "image");
      }
      updatedData.homepage_thumbnail =
        await uploadToCloudinary(homepage_thumbnail);
    }

    if (homepage_preview_video?.size > 0) {
      if (parsedProduct.homepage_preview_video) {
        await deleteFromCloudinary(
          parsedProduct.homepage_preview_video,
          "video",
        );
      }
      updatedData.homepage_preview_video = await uploadToCloudinary(
        homepage_preview_video,
      );
    }

    if (case_study_cover?.size > 0) {
      if (parsedProduct.case_study_cover) {
        await deleteFromCloudinary(parsedProduct.case_study_cover, "image");
      }
      updatedData.case_study_cover = await uploadToCloudinary(case_study_cover);
    }

    await updateProjectApi(parsedProduct.id, updatedData);

    await logActivityApi({
      type: "project",
      action: "updated",
      message: `Project updated: ${parsedProduct.title}`,
    });

    revalidateTag("projects");
    revalidateTag("activity");
    revalidatePath("/admin/projects");
    revalidatePath(`/admin/projects/${parsedProduct.slug}`);
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

export async function deleteProject(id) {
  try {
    if (!id) throw new Error("No project ID provided");

    const project = await getProjectByIdApi(id);

    const allMedia = [
      ...(project.homepage_thumbnail
        ? [{ url: project.homepage_thumbnail, type: "image" }]
        : []),
      ...(project.homepage_preview_video
        ? [{ url: project.homepage_preview_video, type: "video" }]
        : []),
      ...(project.case_study_cover
        ? [{ url: project.case_study_cover, type: "image" }]
        : []),
      ...project.project_sections.flatMap((section) =>
        section.section_media.map((m) => ({
          url: m.media_url,
          type: m.media_type,
        })),
      ),
    ];

    await Promise.all(
      allMedia.map((item) => deleteFromCloudinary(item.url, item.type)),
    );

    await deleteSectionsApi(id);
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

export async function updateCheckList(id, slug, field, currentValue) {
  try {
    if (!id) throw new Error("No project ID provided");

    await updateProjectChecklist(id, field, currentValue);

    await logActivityApi({
      type: "project",
      action: "updated",
      message: `Project ${field} set to ${!currentValue}`,
    });

    revalidateTag("projects");
    revalidateTag("activity");
    updateT
    revalidatePath(`/admin/projects/${slug}`);
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
}