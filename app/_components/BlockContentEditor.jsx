"use client";

import { uploadToCloudinaryClient } from "@/app/_lib/uploadToCloudinaryClient";
import { useState } from "react";
import toast from "react-hot-toast";

function BlockContentEditor({ type, content, onChange }) {
  const [uploading, setUploading] = useState(false);

  async function handleFileUpload(file) {
    if (!file) return;
    setUploading(true);
    try {
      const result = await uploadToCloudinaryClient(file);
      onChange({
        ...content,
        url: result.url,
        publicId: result.publicId,
        resourceType: result.resourceType,
      });
    } catch (error) {
      toast.error("Upload failed");
    } finally {
      setUploading(false);
    }
  }

  switch (type) {
    case "heading":
    case "subheading":
    case "paragraph":
    case "quote":
      return (
        <textarea
          className="block-input"
          placeholder={`Enter ${type} text...`}
          value={content.text}
          onChange={(e) => onChange({ ...content, text: e.target.value })}
        />
      );

    case "list": {
      function updateItem(index, value) {
        const items = [...content.items];
        items[index] = value;
        onChange({ ...content, items });
      }
      function addItem() {
        onChange({ ...content, items: [...content.items, ""] });
      }
      function removeItem(index) {
        onChange({
          ...content,
          items: content.items.filter((_, i) => i !== index),
        });
      }

      return (
        <div className="block-list-editor">
          <select
            value={content.style}
            onChange={(e) => onChange({ ...content, style: e.target.value })}
          >
            <option value="bullet">Bullet</option>
            <option value="numbered">Numbered</option>
          </select>
          {content.items.map((item, i) => (
            <div key={i} className="list-item-row">
              <input
                type="text"
                value={item}
                onChange={(e) => updateItem(i, e.target.value)}
                placeholder={`Item ${i + 1}`}
              />
              <button type="button" onClick={() => removeItem(i)}>
                ✕
              </button>
            </div>
          ))}
          <button
            type="button"
            className="btn-dashboard-tertiary small"
            onClick={addItem}
          >
            + Add item
          </button>
        </div>
      );
    }

    case "image":
      return (
        <div className="block-image-editor">
          {content.url && (
            <img
              src={content.url}
              alt={content.alt || ""}
              className="block-image-preview"
            />
          )}
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleFileUpload(e.target.files[0])}
          />
          {uploading && <p>Uploading...</p>}
          <input
            type="text"
            placeholder="Alt text"
            value={content.alt || ""}
            onChange={(e) => onChange({ ...content, alt: e.target.value })}
          />
          <input
            type="text"
            placeholder="Caption (optional)"
            value={content.caption || ""}
            onChange={(e) => onChange({ ...content, caption: e.target.value })}
          />
        </div>
      );

    case "video":
      return (
        <div className="block-video-editor">
          {content.url && (
            <video src={content.url} controls className="block-video-preview" />
          )}
          <input
            type="file"
            accept="video/*"
            onChange={(e) => handleFileUpload(e.target.files[0])}
          />
          {uploading && <p>Uploading...</p>}
        </div>
      );

    case "link":
      return (
        <div className="block-link-editor">
          <input
            type="text"
            placeholder="Link label"
            value={content.label}
            onChange={(e) => onChange({ ...content, label: e.target.value })}
          />
          <input
            type="url"
            placeholder="https://..."
            value={content.url}
            onChange={(e) => onChange({ ...content, url: e.target.value })}
          />
        </div>
      );

    default:
      return null;
  }
}

export default BlockContentEditor;
