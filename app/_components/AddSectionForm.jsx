"use client";

import { useForm } from "react-hook-form";
import { useRef, useTransition, useState } from "react";
import { createSection } from "@/app/_lib/sections-actions";
import { uploadToCloudinaryClient } from "@/app/_lib/uploadToCloudinaryClient";
import toast from "react-hot-toast";

const SECTION_TYPES = [
  "context",
  "motion language",
  "narrative & sequencing",
  "process",
  "final film",
  "reflection",
  "results and impact",
];

function AddSectionForm({ id, slug, onCloseModal }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const formRef = useRef(null);
  const [selectedType, setSelectedType] = useState(null);
  const [isPending, startTransition] = useTransition();

  const onSubmit = async () => {
    if (!selectedType) return;

    startTransition(async () => {
      try {
        // Step 1 — upload files directly to Cloudinary from browser
        const fileInput = formRef.current.querySelector(
          '[name="section_images"]',
        );
        const files = Array.from(fileInput.files).filter((f) => f.size > 0);

        const mediaItems = await Promise.all(
          files.map(async (file) => {
            const url = await uploadToCloudinaryClient(file);
            return {
              url,
              media_type: file.type.startsWith("video/") ? "video" : "image",
            };
          }),
        );

        // Step 2 — build FormData with text fields + URLs (no raw files)
        const formData = new FormData(formRef.current);
        formData.delete("section_images");
        formData.append("media_items", JSON.stringify(mediaItems));

        // Step 3 — server action just saves to Supabase
        const result = await createSection(formData);

        if (result.success) {
          toast.success("Section added successfully");
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
                type="button"
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
