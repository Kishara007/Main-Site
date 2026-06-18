"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { Leaf } from "lucide-react";

export default function FallingLeaves() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!container.current) return;

    const leaves = gsap.utils.toArray(".falling-leaf", container.current);

    leaves.forEach((leaf: any) => {
      // Set random starting properties
      gsap.set(leaf, {
        x: () => Math.random() * window.innerWidth,
        y: -100,
        rotationX: () => Math.random() * 360,
        rotationY: () => Math.random() * 360,
        rotationZ: () => Math.random() * 360,
        opacity: () => 0.3 + Math.random() * 0.5,
        scale: () => 0.4 + Math.random() * 0.8,
      });

      // Create a falling timeline for each leaf
      const tl = gsap.timeline({ repeat: -1, delay:  Math.random() * 10 });

      tl.to(leaf, {
        y: window.innerHeight + 100,
        x: () => "+=" + (Math.random() * 200 - 100), // Drift left or right randomly
        rotationX: () => "+=" + (Math.random() * 360),
        rotationY: () => "+=" + (Math.random() * 360),
        rotationZ: () => "+=" + (Math.random() * 360),
        duration: () => 8 + Math.random() * 7, // Slow, elegant fall
        ease: "none",
      });
    });
  }, { scope: container });

  return (
    <div ref={container} className="absolute inset-0 z-0 pointer-events-none overflow-hidden mix-blend-multiply">
      {[...Array(20)].map((_, i) => (
        <div key={i} className="falling-leaf absolute top-0 text-[#171717]/40">
          <Leaf className="w-8 h-8" strokeWidth={1} fill="currentColor" />
        </div>
      ))}
    </div>
  );
}
