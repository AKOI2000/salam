"use client";

import { useRef, useState } from "react";
import Image from "next/image";

function HoverVideoCard({ thumbnail, video, alt, title, excerpt }) {
  const videoRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [videoReady, setVideoReady] = useState(false);

  const words = excerpt ? excerpt.trim().split(/\s+/) : [];
  
  const displayExcerpt =
    words.length > 30 ? `${words.slice(0, 30).join(" ")}...` : excerpt;

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

        <div className="work-img-box__overlay">
          <div className="work-img-box__content">
            <h6>{title}</h6>
            {displayExcerpt ? <p>{displayExcerpt}</p> : null}
          </div>
        </div>
      </div>
    </div>
  );
}

export default HoverVideoCard;