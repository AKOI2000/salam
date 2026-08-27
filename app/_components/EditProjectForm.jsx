"use client";

import { useRef, useTransition } from "react";
import { updateProject } from "../_lib/projects-actions";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

function EditProjectForm({ product, onCloseModal }) {
  const [isPending, startTransition] = useTransition();
  const formRef = useRef(null);

  const {
    reset,
    handleSubmit,
  } = useForm();

  async function onSubmit() {
    startTransition(async () => {
      const formData = new FormData(formRef.current);
      const result = await updateProject(formData);

      if (result.success) {
        toast.success("Project updated successfully");
        reset();
        onCloseModal?.();
      } else {
        toast.error(result.error || "Something went wrong");
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
            defaultValue={product?.title}
          />
        </div>
        <div className="input-box">
          <textarea
            name="excerpt"
            placeholder="Short Description..."
            defaultValue={product?.excerpt}
          />
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