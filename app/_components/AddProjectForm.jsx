"use client";

import { useForm } from "react-hook-form";
import { createNewProject } from "../_lib/products-actions";
import { useRef, useTransition } from "react";
import { uploadToCloudinaryClient } from "@/app/_lib/uploadToCloudinaryClient";
import toast from "react-hot-toast";

function AddProjectForm({ onCloseModal }) {
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
        formData.delete("homepage_preview_video"); // remove raw video file
        if (previewVideoUrl) {
          formData.append("homepage_preview_video_url", previewVideoUrl); // add URL instead
        }

        const result = await createNewProject(formData);

        if (result.success) {
          toast.success("Project added successfully");
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
      <h3>Add new Project</h3>

      <form ref={formRef} onSubmit={handleSubmit(onSubmit)}>
        <div className="input-box">
          <input
            type="text"
            name="title"
            placeholder="Project Title"
            {...register("title", { required: "This field is required" })}
          />
          {errors.title && <span>{errors.title.message}</span>}
        </div>

        <div className="input-box">
          <textarea
            name="short_description"
            placeholder="Short Description..."
            {...register("short_description", {
              required: "This field is required",
            })}
          />
          {errors.short_description && (
            <span>{errors.short_description.message}</span>
          )}
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

        <div className="input-box">
          <button className="btn-dashboard-primary" disabled={isPending}>
            {isPending ? "Creating..." : "Create Project"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddProjectForm;
