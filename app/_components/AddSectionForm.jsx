"use client";

import { useForm } from "react-hook-form";
import { useRef, useTransition, useState } from "react";
import { createSection } from "@/app/_lib/sections-actions";

const SECTION_TYPES = [
  "context",
  "motion language",
  "narrative & sequencing",
  "process",
  "final film",
  "reflection",
  "results and impact",
];

function AddSectionForm({ id, slug, oncloseModal }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const formRef = useRef(null);
  const [selectedType, setSelectedType] = useState(null);
  const [isPending, startTransition] = useTransition();

  const onSubmit = () => {
    if (!selectedType) return;

    const formData = new FormData(formRef.current);

    startTransition(async () => {
      const result = await createSection(formData);
      if (!result.success) console.error(result.error);

      if (result.success) {
        reset();
        setSelectedType(null);
        oncloseModal?.(); // close the modal after successful submission
      }
    });
  };

  return (
    <div className="add-section-box">
      <h3>Add new Section</h3>
      <form ref={formRef} onSubmit={handleSubmit(onSubmit)}>
        <input type="hidden" name="section_type" value={selectedType ?? ""} />
        <input type="hidden" name="project_id" value={id} />
        <input type="hidden" name="slug" value={slug} />

        <div className="input-box">
          <div className="section-type-box">
            {SECTION_TYPES.map((type) => (
              <button
                key={type}
                type="button" // important — prevents form submission
                onClick={() => setSelectedType(type)}
                className={selectedType === type ? "selected" : "btn-inactive"}
              >
                {type}
              </button>
            ))}
          </div>

          {!selectedType && (
            <span className="error-message">Please select a section type</span>
          )}
        </div>
        <div className="input-box">
          <textarea
            name="text"
            id=""
            placeholder="Section Text ..."
            {...register("text", { required: "Section text is required" })}
          ></textarea>
          {errors.text && (
            <span className="error-message">{errors.text.message}</span>
          )}
        </div>

        <div className="input-group">
          <label htmlFor="section_images">Section Media(s)</label>
          <input
            type="file"
            name="section_images"
            id="section_images"
            accept="image/*,video/*"
            multiple
            // {...register("media", {
            //   required: "At least one media file is required",
            // })}
          />
        </div>

        <div className="input-box">
          <input
            type="text"
            name="media_alt"
            placeholder="Alt text for the media"
            {...register("media_alt", {
              required: "Media alt text is required",
            })}
          />
          {errors.media_alt && (
            <span className="error-message">{errors.media_alt.message}</span>
          )}
        </div>

        <div className="input-box">
          <button
            className="btn-dashboard-primary"
            type="submit"
            disabled={isPending}
          >
            {isPending ? "Saving..." : "Add Section"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddSectionForm;
