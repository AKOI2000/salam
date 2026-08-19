"use client";

import { useState, useTransition } from "react";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import { saveBlocks } from "@/app/_lib/block-actions";
import SortableBlock from "../_components/SortableBlock";
import toast from "react-hot-toast";

const BLOCK_TYPES = [
  "heading",
  "subheading",
  "paragraph",
  "quote",
  "list",
  "image",
  "video",
  "link",
];

// one blank-content default per block type, so a freshly added block
// always has a valid shape before the user's typed anything into it
function emptyContent(type) {
  switch (type) {
    case "heading":
    case "subheading":
    case "paragraph":
    case "quote":
      return { text: "" };
    case "list":
      return { style: "bullet", items: [""] };
    case "image":
      return {
        url: "",
        publicId: "",
        resourceType: "image",
        alt: "",
        caption: "",
      };
    case "video":
      return {
        url: "",
        publicId: "",
        resourceType: "video",
        provider: "cloudinary",
      };
    case "link":
      return { url: "", label: "", external: true };
    default:
      return {};
  }
}

// blocks coming from the DB have real cuids; blocks added in this session
// don't have a server id yet — this gives them a stable key for dnd-kit
// and for the diffing logic in saveBlocks, without pretending they're saved
function tempId() {
  return `tmp_${Math.random().toString(36).slice(2)}_${Date.now()}`;
}

function BlockEditor({ projectId, slug, initialBlocks }) {
  const [blocks, setBlocks] = useState(
    initialBlocks.map((b) => ({ ...b, _key: b.id })),
  );
  const [isPending, startTransition] = useTransition();

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 5 }, // avoid firing drag on a simple click
    }),
  );

  function addBlock(type) {
    setBlocks((prev) => [
      ...prev,
      { _key: tempId(), type, content: emptyContent(type) },
    ]);
  }

  function updateBlockContent(key, newContent) {
    setBlocks((prev) =>
      prev.map((b) => (b._key === key ? { ...b, content: newContent } : b)),
    );
  }

  function removeBlock(key) {
    setBlocks((prev) => prev.filter((b) => b._key !== key));
  }

  function handleDragEnd(event) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    setBlocks((prev) => {
      const oldIndex = prev.findIndex((b) => b._key === active.id);
      const newIndex = prev.findIndex((b) => b._key === over.id);
      return arrayMove(prev, oldIndex, newIndex);
    });
  }

  function handleSave() {
    startTransition(async () => {
      // strip the client-only _key before sending to the server
      const payload = blocks.map(({ _key, ...rest }) => rest);
      const result = await saveBlocks(projectId, slug, payload);

      if (result.success) {
        toast.success("Blocks saved");
      } else {
        toast.error(result.error || "Failed to save blocks");
      }
    });
  }

  return (
    <div className="block-editor">
      <div className="block-editor-toolbar">
        {BLOCK_TYPES.map((type) => (
          <button
            key={type}
            type="button"
            className="btn-dashboard-secondary small"
            onClick={() => addBlock(type)}
          >
            + {type}
          </button>
        ))}
      </div>

      <DndContext
        id="block-editor-dnd"
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={blocks.map((b) => b._key)}
          strategy={verticalListSortingStrategy}
        >
          <div className="block-list">
            {blocks.map((block) => (
              <SortableBlock
                key={block._key}
                block={block}
                onChange={(content) => updateBlockContent(block._key, content)}
                onRemove={() => removeBlock(block._key)}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>

      {blocks.length === 0 && (
        <p className="block-editor-empty">No blocks yet — add one above.</p>
      )}

      <button
        type="button"
        className="btn-dashboard-primary"
        onClick={handleSave}
        disabled={isPending}
      >
        {isPending ? "Saving..." : "Save Blocks"}
      </button>
    </div>
  );
}

export default BlockEditor;
