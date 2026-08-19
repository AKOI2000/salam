"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { MdDragIndicator, MdDelete } from "react-icons/md";
import BlockContentEditor from "./BlockContentEditor";

function SortableBlock({ block, onChange, onRemove }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: block._key });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div ref={setNodeRef} style={style} className="block-item">
      <div className="block-item-header">
        <button
          type="button"
          className="drag-handle"
          {...attributes}
          {...listeners}
        >
          <MdDragIndicator />
        </button>
        <span className="block-type-label">{block.type}</span>
        <button type="button" className="block-remove" onClick={onRemove}>
          <MdDelete />
        </button>
      </div>

      <BlockContentEditor
        type={block.type}
        content={block.content}
        onChange={onChange}
      />
    </div>
  );
}

export default SortableBlock;
