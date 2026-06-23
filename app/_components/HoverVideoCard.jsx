"use client";

import { useRef, useState } from "react";
import Image from "next/image";

function HoverVideoCard({ thumbnail, video, alt }) {
  const videoRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [videoReady, setVideoReady] = useState(false);

  const handleMouseEnter = async () => {
    setIsHovered(true);
    try {
      await videoRef.current?.play();
    } catch (error) {
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
      <div className="work-img-box__ratio">
        {/* natural dimensions — no fill */}
        <Image
          src={thumbnail}
          alt={alt}
          width={800}
          height={600}
          sizes="(max-width: 768px) 100vw, 50vw"
          className={isHovered && videoReady ? "hidden" : ""}
        />

        <video
          ref={videoRef}
          src={video}
          muted
          loop
          playsInline
          preload="none"
          onCanPlay={() => setVideoReady(true)}
          className={isHovered && videoReady ? "visible" : ""}
        />
      </div>
    </div>
  );
}

export default HoverVideoCard;