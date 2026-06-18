"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import Image from "next/image";

export default function Mountain() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!container.current) return;
    
    // Animate like a mountain: incredibly slow, subtle scale to feel massive and alive
    gsap.to(".mountain-img", {
      scale: 1.05,
      y: 15, // slight vertical breath
      duration: 30, // very slow to emphasize massive scale
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
    });
  }, { scope: container });

  return (
    <div ref={container} className="fixed bottom-0 left-0 w-full h-[70vh] z-0 pointer-events-none overflow-hidden">
      {/* 
        The gradient overlay helps blend the bottom of the mountain seamlessly into the layout if needed,
        though object-bottom usually anchors it perfectly.
      */}
      <div className="mountain-img relative w-[110%] h-full -left-[5%] origin-bottom">
        <Image 
          src="/images/5.png" 
          alt="Mountain landscape" 
          fill
          className="object-cover object-bottom"
          priority
        />
      </div>
    </div>
  );
}
