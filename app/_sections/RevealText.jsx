"use client";

import { motion, useInView } from "framer-motion";

import { useEffect, useRef, useState } from "react";

import { usePathname } from "next/navigation";
import SplitType from "split-type";

export default function RevealText({
  text,

  // semantic tag
  as = "h1",

  // animation
  duration = 0.8,
  stagger = 0.08,
  delay = 0,
  blur = true,

  // behavior
  once = true,
  animateOnLoad = true,
  animateOnPathChange = true,
  animateInView = false,

  // styling
  className = "",

  // motion offset
  y = "100%",
}) {
  const pathname = usePathname();

  const measureRef = useRef(null);

  const [lines, setLines] = useState([]);

  const containerRef = useRef(null);

  const isInView = useInView(containerRef, {
    once,
    margin: "-10%",
  });

  const Tag = as;

  /*
  -----------------------------
  SPLIT TEXT INTO LINES
  -----------------------------
  */

  useEffect(() => {
    if (!measureRef.current) return;

    const split = new SplitType(measureRef.current, {
      types: "lines",
    });

    const extractedLines = split.lines.map((line) => line.textContent);

    setLines(extractedLines);

    split.revert();
  }, [pathname, text]);

  /*
  -----------------------------
  DETERMINE ANIMATION STATE
  -----------------------------
  */

  const shouldAnimate = animateInView ? isInView : animateOnLoad;

  return (
    <Tag
      ref={containerRef}
      className={`reveal-text ${className}`}
      key={animateOnPathChange ? pathname : "static"}
    >
      {/* hidden measurement node */}
      <span ref={measureRef} className="split-measure">
        {text}
      </span>

      {/* animated lines */}
      {lines.map((line, index) => (
        <span className="line-mask" key={index}>
          <motion.span
            className="line-text"
            initial={{
              y,
              opacity: 0,
              filter: blur ? "blur(8px)" : "blur(0px)",
            }}
            animate={
              shouldAnimate
                ? {
                    y: "0%",
                    opacity: 1,
                    filter: "blur(0px)",
                  }
                : {}
            }
            transition={{
              duration,
              delay: delay + index * stagger,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
