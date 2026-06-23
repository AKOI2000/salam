"use client";

import { useRef, useTransition } from "react";
import { updateProject } from "../_lib/products-actions";
import { useForm } from "react-hook-form";
import { uploadToCloudinaryClient } from "@/app/_lib/uploadToCloudinaryClient";
import toast from "react-hot-toast";

function EditProjectForm({ product, onCloseModal }) {
  const [isPending, startTransition] = useTransition();
  const formRef = useRef(null);

  const {
    register,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm();

  async function onSubmit() {
    startTransition(async () => {
      try {
        // upload video from browser directly to Cloudinary
        const videoInput = formRef.current.querySelector(
          '[name="homepage_preview_video"]',
        );
        const videoFile = videoInput.files[0];

        let previewVideoUrl = null;
        if (videoFile && videoFile.size > 0) {
          previewVideoUrl = await uploadToCloudinaryClient(videoFile);
        }

        // build FormData — images stay as files, video becomes a URL
        const formData = new FormData(formRef.current);
        formData.delete("homepage_preview_video");
        if (previewVideoUrl) {
          formData.append("homepage_preview_video_url", previewVideoUrl);
        }

        const result = await updateProject(formData);
        if (result.success) {
          toast.success("Projecte edited successfully");
          reset();
          onCloseModal?.();
        } else {
          toast.error(result.error || "Something went wrong");
        }

        // in catch block
      } catch (error) {
        toast.error(error.message || "Upload failed");
      }
    });
  }

  return (
    <div className="add-project-box">
      <h3>Edit {product.title} Project</h3>

      <form ref={formRef} onSubmit={handleSubmit(onSubmit)}>
        <div className="input-box">
          <input
            type="text"
            name="title"
            placeholder="Project Title"
            defaultValue={product.title}
          />
        </div>

        <div className="input-box">
          <textarea
            name="short_description"
            placeholder="Short Description..."
            defaultValue={product.short_description}
          />
        </div>

        <div className="input-group">
          <label htmlFor="homepage_thumbnail">Homepage Thumbnail</label>
          <input
            type="file"
            name="homepage_thumbnail"
            id="homepage_thumbnail"
            accept="image/*"
          />
        </div>

        <div className="input-group">
          <label htmlFor="homepage_preview_video">Homepage Preview Video</label>
          <input
            type="file"
            name="homepage_preview_video"
            id="homepage_preview_video"
            accept="video/*"
          />
        </div>

        <div className="input-group">
          <label htmlFor="case_study_cover">Case Study Cover</label>
          <input
            type="file"
            name="case_study_cover"
            id="case_study_cover"
            accept="image/*"
          />
        </div>

        <input
          type="hidden"
          name="existing_product"
          value={JSON.stringify(product)}
        />

        <div className="input-box">
          <button className="btn-dashboard-primary" disabled={isPending}>
            {isPending ? "Updating Project..." : "Update Project"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditProjectForm;
