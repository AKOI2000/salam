"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export default function HoverVideo({ src, muted = true }) {
  const videoRef = useRef(null);
  const containerRef = useRef(null);

  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    const container = containerRef.current;

    if (!video || !container) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          video.pause();
        }
      },
      {
        threshold: 0.2,
      },
    );

    observer.observe(container);

    return () => observer.disconnect();
  }, []);

  const handleEnter = async () => {
    setIsHovering(true);

    try {
      await videoRef.current.play();
    } catch (err) {
      console.log(err);
    }
  };

  const handleLeave = () => {
    setIsHovering(false);

    videoRef.current.pause();
    videoRef.current.currentTime = 0;
  };

  return (
    <div className="video-box">
      <motion.div
        ref={containerRef}
        className="hover-video"
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
        animate={{
          scale: isHovering ? 1.02 : 1,
        }}
        transition={{
          duration: 0.7,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        <video
          ref={videoRef}
          muted={muted}
          loop
          playsInline
          preload="metadata"
          className="hover-video__media"
        >
          <source src={src} type="video/mp4" />
        </video>

        <motion.div
          className="hover-video__overlay"
          animate={{
            opacity: isHovering ? 0 : 1,
          }}
          transition={{
            duration: 0.4,
          }}
        />
      </motion.div>
    </div>
  );
}
