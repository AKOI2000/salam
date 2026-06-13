"use client";

import { useForm } from "react-hook-form";
import { createNewProject } from "../_lib/products-actions";
import { FaPray } from "react-icons/fa";
import { useRef, useTransition } from "react";

function AddProjectForm({onCloseModal}) {
  const [isPending, startTransition] = useTransition();
  const formRef = useRef(null);

  const {
    register,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm();

  async function onSubmit(data) {
    const formData = new FormData(formRef.current);
    startTransition(async () => {
      const result = await createNewProject(formData);

      if (result.success) {
        reset();
        onCloseModal?.(); // close the modal after successful creation
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
            type="text"
            name="short_description"
            placeholder="Short Description... "
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
          <input type="file" name="homepage_thumbnail" id="" accept="image" />
        </div>

        <div className="input-group">
          <label htmlFor="homepage_preview_video">Homepage Preview Video</label>
          <input
            type="file"
            name="homepage_preview_video"
            id=""
            accept="video"
          />
        </div>

        <div className="input-group">
          <label htmlFor="case_study_cover">Case Study Cover</label>
          <input type="file" name="case_study_cover" id="" />
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
