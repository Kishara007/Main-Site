"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { Cloud } from "lucide-react";

export default function FlyingClouds() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!container.current) return;

    const clouds = gsap.utils.toArray(".flying-cloud", container.current);

    clouds.forEach((cloud: any) => {
      // Set random starting properties
      gsap.set(cloud, {
        x: () => window.innerWidth + Math.random() * 800, // start off-screen to the right
        y: () => Math.random() * 150 - 50, // strictly hug the very top of the page, some slightly clipped
        opacity: () => 0.1 + Math.random() * 0.3, // very subtle to blend with background clouds
        scale: () => 1 + Math.random() * 4, // varied sizes
      });

      // Create a slowly drifting timeline
      const tl = gsap.timeline({ repeat: -1, delay:  Math.random() * 15 });

      tl.to(cloud, {
        x: -800, // drift far past the left edge
        duration: () => 40 + Math.random() * 60, // slow, cinematic movement
        ease: "none",
      });
    });
  }, { scope: container });

  return (
    <div ref={container} className="absolute inset-0 z-0 pointer-events-none overflow-hidden mix-blend-overlay">
      {[...Array(8)].map((_, i) => (
        <div key={i} className="flying-cloud absolute top-0 text-white/80">
          <Cloud className="w-32 h-32" strokeWidth={0} fill="currentColor" />
        </div>
      ))}
    </div>
  );
}
