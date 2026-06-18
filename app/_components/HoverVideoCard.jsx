"use client";

import { useRef, useState } from "react";
import Image from "next/image";

function HoverVideoCard({ thumbnail, video, alt }) {
  const videoRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = async () => {
    setIsHovered(true);
    try {
      await videoRef.current?.play();
    } catch (error) {
      // AbortError is expected when hovering quickly — ignore it
      if (error.name !== "AbortError") {
        console.error(error);
      }
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    videoRef.current?.pause();
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <div
      className="work-img-box"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* this div controls the height — aspect ratio box */}
      <div className="work-img-box__ratio">
        <Image
          src={thumbnail}
          alt={alt}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className={isHovered ? "hidden" : ""}
        />

        <video
          ref={videoRef}
          src={video}
          muted
          loop
          playsInline
          preload="none"
          className={isHovered ? "visible" : ""}
        />
      </div>
    </div>
  );
}

export default HoverVideoCard;
