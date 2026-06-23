"use client";

import { useForm } from "react-hook-form";
import { useRef, useTransition, useState } from "react";
import { editSection } from "../_lib/sections-actions";
import { uploadToCloudinaryClient } from "@/app/_lib/uploadToCloudinaryClient";
import toast from "react-hot-toast";

function EditSectionForm({ section, params, onCloseModal }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      section_type: section?.section_type,
      section_text: section?.text,
      alt_text: section?.section_media[0]?.alt_text,
    },
  });
  const formRef = useRef(null);
  const [isPending, startTransition] = useTransition();
  const [replaceMedia, setReplaceMedia] = useState(false);

  async function onSubmit() {
    startTransition(async () => {
      try {
        // Step 1 — upload files directly to Cloudinary from browser
        const fileInput = formRef.current.querySelector('[name="media"]');
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
        formData.delete("media");
        formData.append("media_items", JSON.stringify(mediaItems));

        // Step 3 — server action saves to Supabase
        const result = await editSection(section.id, formData, params);
        if (result.success) {
          toast.success("Section edited successfully");
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
    <div className="add-section-box">
      <h3>Edit Section</h3>
      <form ref={formRef} onSubmit={handleSubmit(onSubmit)}>
        {/* hidden input carries value into FormData */}
        <input
          type="hidden"
          name="section_type"
          value={section?.section_type}
        />

        <div className="input-box">
          {/* display only — disabled so it doesn't conflict */}
          <input type="text" value={section?.section_type} disabled readOnly />
        </div>

        <div className="input-box">
          <textarea
            name="section_text"
            placeholder="Section Text ..."
            {...register("section_text", {
              required: "Section text is required",
            })}
          ></textarea>
          {errors.section_text && (
            <span className="error-message">{errors.section_text.message}</span>
          )}
        </div>

        <div className="input-group">
          <label htmlFor="media">Section Media</label>
          <input
            type="file"
            name="media"
            id="media"
            accept="image/*,video/*"
            multiple
          />
        </div>

        <div className="input-flex">
          <label>
            <input
              type="checkbox"
              name="replace_media"
              checked={replaceMedia}
              onChange={(e) => setReplaceMedia(e.target.checked)}
            />
            Replace existing media (instead of adding to it)
          </label>
        </div>

        <div className="input-box">
          <input
            type="text"
            name="alt_text"
            placeholder="Alt text for the media"
            {...register("alt_text", {
              required: "Alt text is required",
            })}
          />
          {errors.alt_text && (
            <span className="error-message">{errors.alt_text.message}</span>
          )}
        </div>

        <div className="input-box">
          <button
            type="submit"
            disabled={isPending}
            className="btn-dashboard-primary"
          >
            {isPending ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditSectionForm;
