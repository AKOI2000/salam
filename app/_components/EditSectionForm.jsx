"use client";

import { useForm } from "react-hook-form";
import { useRef, useTransition, useState } from "react";
import { editSection } from "../_lib/sections-actions";

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

  async function onSubmit(data) {
    const formData = new FormData(formRef.current);

    startTransition(async () => {
      const result = await editSection(section.id, formData, params);
      if (result.success) {
        reset();
        onCloseModal?.();
      }
    });
  }

  return (
    <div className="add-section-box">
      <h3>Edit Section</h3>
      <form action="" ref={formRef} onSubmit={handleSubmit(onSubmit)}>
        <div className="input-box">
          <input
            type="hidden"
            name="section_type"
            value={section?.section_type}
          />
          <input
            type="text"
            placeholder="Section Type..."
            name="section_type"
            value={section?.section_type}
            {...register("section_type", {
              required: "Section type is required",
            })}
            disabled
          />
        </div>
        <div className="input-box">
          <textarea
            name="text"
            id=""
            placeholder="Section Text ..."
            {...register("section_text", {
              required: "Section text is required",
            })}
          ></textarea>
        </div>

        <div className="input-group">
          <label htmlFor="case_study_cover">Section Media</label>
          <input
            type="file"
            name="media"
            id=""
            accept="image/*, video/*"
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
