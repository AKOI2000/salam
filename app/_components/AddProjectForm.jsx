"use client";

import { useForm } from "react-hook-form";
import { createNewProject } from "../_lib/projects-actions";
import { useRef, useTransition } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useModal } from "./Modal";

function AddProjectForm() {
  const [isPending, startTransition] = useTransition();
  const formRef = useRef(null);
  const router = useRouter();
  const { close: onCloseModal } = useModal();
  const {
    register,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm();

  async function onSubmit() {
    startTransition(async () => {
      const formData = new FormData(formRef.current);
      const result = await createNewProject(formData);

      if (result.success) {
        toast.success("Project added successfully");
        reset();
        onCloseModal?.();
        router.push(`/admin/projects/${result.slug}`);
      } else {
        toast.error(result.error || "Something went wrong");
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
            name="excerpt"
            placeholder="Short Description..."
            {...register("excerpt", {
              required: "This field is required",
            })}
          />
          {errors.excerpt && <span>{errors.excerpt.message}</span>}
        </div>

        <div className="input-group">
          <label htmlFor="thumbnail">Homepage Thumbnail</label>
          <input type="file" name="thumbnail" id="thumbnail" accept="image/*" />
        </div>

        <div className="input-group">
          <label htmlFor="preview_video">Homepage Preview Video</label>
          <input
            type="file"
            name="preview_video"
            id="preview_video"
            accept="video/*"
          />
        </div>

        <div className="input-group">
          <label htmlFor="cover_image">Case Study Cover</label>
          <input
            type="file"
            name="cover_image"
            id="cover_image"
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