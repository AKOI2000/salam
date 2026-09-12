// BlockRenderer.jsx
import Image from "next/image";
import VideoPlayer from "../_components/VideoPlayer";

function BlockRenderer({ blocks }) {
  const groups = groupConsecutiveImages(blocks);

  return (
    <div className="block-renderer">
      {groups.map((group, i) =>
        group.type === "image-group" ? (
          <div className="container small" key={i}>
            <div className="block-image-group" data-count={group.blocks.length}>
              {group.blocks.map((block) => (
                <BlockImage key={block.id} block={block} />
              ))}
            </div>
          </div>
        ) : (
          <BlockItem key={group.block.id} block={group.block} />
        ),
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
      return (
        <div className="container medium">
          <h2 className="block-heading">{content.text}</h2>
        </div>
      );

    case "subheading":
      return (
        <div className="container medium">
          <h5 className="block-subheading">{content.text}</h5>
        </div>
      );

    case "paragraph":
      return (
        <div className="container medium">
          <p className="block-paragraph">{content.text}</p>
        </div>
      );

    case "quote":
      return (
        <div className="container medium">
          <blockquote className="block-quote">{content.text}</blockquote>
        </div>
      );

    case "list":
      return (
        <div className="container medium">
          {content.style === "numbered" ? (
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
          )}
        </div>
      );

    case "image":
      return (
        <div className="container small">
          <BlockImage block={block} />
        </div>
      );

    case "video":
      return (
       <div className="container small">
         <div className="block-video">
          <VideoPlayer src={content.url} />
        </div>
       </div>
      );

    case "link":
      return (
        <div className="container medium">
          <a
            href={content.url}
            className="block-link"
            target={content.external ? "_blank" : undefined}
            rel={content.external ? "noopener noreferrer" : undefined}
          >
            {content.label}
          </a>
        </div>
      );

    default:
      return null;
  }
}

export default BlockRenderer;
