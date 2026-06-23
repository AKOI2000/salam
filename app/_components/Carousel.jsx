"use client";

import Image from "next/image";
import { motion, useAnimation } from "motion/react";
import { useEffect, useRef, useState } from "react";

const items = [
  { src: "/bg.png", label: "The backdrop", sub: "wide open" },
  { src: "/about-1.jpg", label: "About us", sub: "who we are" },
  { src: "/about-2.jpg", label: "Our craft", sub: "up close" },
  { src: "/test1.jpg", label: "Our craft", sub: "up close" },
  { src: "/test2.jpg", label: "Our craft", sub: "up close" },
  { src: "/test3.jpg", label: "Our craft", sub: "up close" },
  { src: "/test4.jpg", label: "Our craft", sub: "up close" },
  { src: "/test5.jpg", label: "Our craft", sub: "up close" },
];

// const"100%" = 220; // px — fixed width, height is fully natural
const GAP = 14;

export default function Carousel() {
  const controls = useAnimation();
  const trackRef = useRef(null);
  const [distance, setDistance] = useState(0);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    const measure = () => {
      const children = Array.from(el.children);
      const firstSet = children.slice(0, items.length);
      const width = firstSet.reduce((acc, child) => {
        return acc + child.getBoundingClientRect().width + GAP;
      }, 0);
      setDistance(width);
    };

    // Images may still be loading — wait for all before measuring
    const images = el.querySelectorAll("img");
    let loaded = 0;
    const onLoad = () => {
      loaded++;
      if (loaded === items.length) requestAnimationFrame(measure);
    };

    images.forEach((img) => {
      if (img.complete) onLoad();
      else img.addEventListener("load", onLoad);
    });

    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    if (!distance) return;
    controls.set({ x: 0 });
    controls.start({
      x: -distance,
      transition: {
        ease: "linear",
        duration: 22,
        repeat: Infinity,
        repeatType: "loop",
      },
    });
  }, [distance, controls]);

  return (
    <div style={{ overflow: "hidden", width: "100%", height: 2000 }}>
      <motion.div
        ref={trackRef}
        animate={controls}
        style={{
          display: "flex",
          alignItems: "flex-start", // cards don't stretch to match tallest
          gap: `${GAP}px`,
          willChange: "transform",
        }}
      >
        {[...items, ...items].map((item, i) => (
          <div key={i} style={{ flexShrink: 0, width: "auto" }}>
            <div style={{ borderRadius: 10, overflow: "hidden" }}>
              <Image
                src={item.src}
                alt={item.label}
                width={4} // ratio hint — Next uses this for aspect-ratio CSS
                height={3} // doesn't matter much, browser overrides with natural size
               sizes="(max-width: 763px) 100vw, (max-width: 1200px) 50vw, 33vw"
                style={{
                  width: "100%",
                  height: "auto", // ← the key: natural height from real dimensions
                  display: "block",
                }}
                priority={i < items.length}
              />
            </div>

            <div style={{ marginTop: 10, paddingLeft: 2 }}>
              <p
                style={{
                  margin: 0,
                  fontSize: 13,
                  fontWeight: 600,
                  color: "#f0f0f0",
                  lineHeight: 1.3,
                  letterSpacing: "0.01em",
                }}
              >
                {item.label}
              </p>
              <p
                style={{
                  margin: "3px 0 0",
                  fontSize: 11,
                  color: "#888",
                  fontWeight: 400,
                }}
              >
                {item.sub}
              </p>
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
