"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";

export default function Mist() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!container.current) return;
    
    const mists = gsap.utils.toArray(".mist-layer", container.current);
    
    mists.forEach((mist: any, i: number) => {
      // Gentle, drifting sine wave movement for a natural fog effect
      gsap.to(mist, {
        x: () => (i % 2 === 0 ? "-15vw" : "15vw"), 
        y: () => (i % 2 === 0 ? "5vh" : "-5vh"),
        rotation: () => (i % 2 === 0 ? 5 : -5),
        duration: () => 15 + Math.random() * 15,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });
    });
  }, { scope: container });

  return (
    <div ref={container} className="absolute inset-0 z-0 pointer-events-none overflow-hidden mix-blend-screen opacity-70">
      {/* Massive, heavily blurred elements simulate dense, drifting mist */}
      <div className="mist-layer absolute -bottom-[30%] -left-[20%] w-[150vw] h-[80vh] bg-white/20 blur-[120px] rounded-full" />
      <div className="mist-layer absolute -bottom-[10%] -right-[20%] w-[120vw] h-[60vh] bg-white/15 blur-[100px] rounded-full" />
      <div className="mist-layer absolute top-[30%] left-[-10%] w-[100vw] h-[50vh] bg-white/10 blur-[140px] rounded-full" />
      <div className="mist-layer absolute top-[50%] right-[-10%] w-[100vw] h-[40vh] bg-white/10 blur-[100px] rounded-full" />
    </div>
  );
}
