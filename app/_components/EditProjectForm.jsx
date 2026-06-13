import { useRef, useTransition } from "react";
import { updateProject } from "../_lib/products-actions";
import { useForm } from "react-hook-form";

function EditProjectForm({ product, onCloseModal }) {
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
      const result = await updateProject(formData);
      if (result.success) {
        reset();
        onCloseModal?.();
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
            type="text"
            name="short_description"
            placeholder="Short Description... "
            defaultValue={product.short_description}
          />
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

        <input
          type="hidden"
          name="existing_product"
          value={JSON.stringify(product)}
        />

        <div className="input-box">
          <button className="btn-dashboard-primary">
            {" "}
            {isPending ? "Updating Project..." : "Update Project"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditProjectForm;
