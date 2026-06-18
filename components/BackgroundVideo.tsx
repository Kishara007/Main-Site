"use client";

import { useRef, useState } from "react";

export default function BackgroundVideo({ src }: { src: string }) {
  const video1Ref = useRef<HTMLVideoElement>(null);
  const video2Ref = useRef<HTMLVideoElement>(null);
  const [activeVideo, setActiveVideo] = useState<1 | 2>(1);

  // The duration of the crossfade in seconds
  const fadeDuration = 1.5; 

  const handleTimeUpdate = (e: React.SyntheticEvent<HTMLVideoElement, Event>, id: 1 | 2) => {
    const video = e.currentTarget;
    if (!video.duration) return;

    // If the video is nearing its end, trigger the crossfade to the other video
    if (video.currentTime >= video.duration - fadeDuration) {
      if (id === 1 && activeVideo === 1) {
        setActiveVideo(2);
        if (video2Ref.current) {
          video2Ref.current.currentTime = 0;
          video2Ref.current.play().catch(() => {});
        }
      } else if (id === 2 && activeVideo === 2) {
        setActiveVideo(1);
        if (video1Ref.current) {
          video1Ref.current.currentTime = 0;
          video1Ref.current.play().catch(() => {});
        }
      }
    }
  };

  return (
    <div className="absolute inset-0 w-full h-full z-0 pointer-events-none bg-[#171717] overflow-hidden">
      <video
        ref={video1Ref}
        src={src}
        muted
        playsInline
        autoPlay
        onTimeUpdate={(e) => handleTimeUpdate(e, 1)}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity ease-in-out ${
          activeVideo === 1 ? "opacity-100" : "opacity-0"
        }`}
        style={{ transitionDuration: `${fadeDuration * 1000}ms` }}
      />
      <video
        ref={video2Ref}
        src={src}
        muted
        playsInline
        onTimeUpdate={(e) => handleTimeUpdate(e, 2)}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity ease-in-out ${
          activeVideo === 2 ? "opacity-100" : "opacity-0"
        }`}
        style={{ transitionDuration: `${fadeDuration * 1000}ms` }}
      />
    </div>
  );
}
