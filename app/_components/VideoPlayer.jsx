"use client";

import { useEffect, useRef } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";

function VideoPlayer({ src, poster }) {
  const containerRef = useRef(null);
  const playerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    if (!playerRef.current) {
      // video.js creates and owns this <video> element itself —
      // React never renders or touches it directly
      const videoElement = document.createElement("video-js");
      videoElement.classList.add("vjs-big-play-centered");
      containerRef.current.appendChild(videoElement);

      playerRef.current = videojs(videoElement, {
        controls: true,
        autoplay: false,
        preload: "auto",
        fluid: true,
        poster: poster ?? "",
        aspectRatio: "16:9",
        sources: [{ src }],
      });
    } else {
      playerRef.current.src({ src, type: "video/mp4" });
    }
  }, [src, poster]);

  // separate cleanup effect — runs only on true unmount
  useEffect(() => {
    return () => {
      if (playerRef.current) {
        playerRef.current.dispose();
        playerRef.current = null;
      }
    };
  }, []);

  return (
    <div data-vjs-player>
      <div ref={containerRef} />
    </div>
  );
}

export default VideoPlayer;