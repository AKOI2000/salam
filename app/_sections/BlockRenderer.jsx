// BlockRenderer.jsx
import Image from "next/image";
import VideoPlayer from "../_components/VideoPlayer";

function BlockRenderer({ blocks }) {
  const groups = groupConsecutiveImages(blocks);

  return (
    <div className="block-renderer">
      {groups.map((group, i) =>
        group.type === "image-group" ? (
          <div key={i} className="block-image-group" data-count={group.blocks.length}>
            {group.blocks.map((block) => (
              <BlockImage key={block.id} block={block} />
            ))}
          </div>
        ) : (
          <BlockItem key={group.block.id} block={group.block} />
        )
      )}
    </div>
  );
}

// walks the flat blocks array and bundles consecutive "image" blocks
// into groups, leaving every other block type untouched and in order
function groupConsecutiveImages(blocks) {
  const groups = [];

  for (const block of blocks) {
    const lastGroup = groups[groups.length - 1];

    if (block.type === "image") {
      if (lastGroup?.type === "image-group") {
        lastGroup.blocks.push(block);
      } else {
        groups.push({ type: "image-group", blocks: [block] });
      }
    } else {
      groups.push({ type: "single", block });
    }
  }

  return groups;
}

function BlockImage({ block }) {
  const { content } = block;
  return (
    <figure className="block-image">
      <Image
        src={content.url}
        alt={content.alt || ""}
        width={1200}
        height={800}
        className="block-image-el"
      />
      {content.caption && <figcaption>{content.caption}</figcaption>}
    </figure>
  );
}

function BlockItem({ block }) {
  const { type, content } = block;

  switch (type) {
    case "heading":
      return <h2 className="block-heading">{content.text}</h2>;

    case "subheading":
      return <h3 className="block-subheading">{content.text}</h3>;

    case "paragraph":
      return <p className="block-paragraph">{content.text}</p>;

    case "quote":
      return <blockquote className="block-quote">{content.text}</blockquote>;

    case "list":
      return content.style === "numbered" ? (
        <ol className="block-list">
          {content.items.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ol>
      ) : (
        <ul className="block-list">
          {content.items.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      );

    case "image":
      return <BlockImage block={block} />;

    case "video":
      return (
        <div className="block-video">
          <VideoPlayer src={content.url} />
        </div>
      );

    case "link":
      return (
        <a
          href={content.url}
          className="block-link"
          target={content.external ? "_blank" : undefined}
          rel={content.external ? "noopener noreferrer" : undefined}
        >
          {content.label}
        </a>
      );

    default:
      return null;
  }
}

export default BlockRenderer;