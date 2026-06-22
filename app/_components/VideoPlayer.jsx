"use client";

import { useEffect, useRef } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";

function VideoPlayer({ src, poster }) {
  const videoRef = useRef(null);
  const playerRef = useRef(null);

  useEffect(() => {
    // only initialize once
    if (!playerRef.current) {
      playerRef.current = videojs(videoRef.current, {
        controls: true,
        autoplay: false,
        preload: "auto",
        fluid: true, // makes it responsive
        poster: poster ?? "",
        aspectRatio: "16:9",
        sources: [
          {
            src,
            // type: "video/mp4",
          },
        ],
      });
    }

    // cleanup on unmount
    return () => {
      if (playerRef.current) {
        playerRef.current.dispose();
        playerRef.current = null;
      }
    };
  }, [poster, src]);

  // update src if it changes
  useEffect(() => {
    if (playerRef.current && src) {
      playerRef.current.src({ src, type: "video/mp4" });
    }
  }, [src]);

  return (
    <div data-vjs-player>
      <video ref={videoRef} className="video-js vjs-big-play-centered" />
    </div>
  );
}

export default VideoPlayer;
