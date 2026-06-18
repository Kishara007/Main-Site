"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const BACKGROUNDS = [
  "/images/sky.jpeg",
  "/images/skyn.jpeg"
];

export default function AnimatedBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sky2Ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!sky2Ref.current) return;

    // Create a timeline to handle multiple transitions across sections
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: document.body,
        start: "top top",
        // The timeline needs to cover the scroll distance of 5 full section transitions (6 sections total)
        end: () => window.innerWidth >= 1280 ? "+=" + (window.innerWidth * 5) : "bottom bottom", 
        scrub: true,
      }
    });

    // 1 -> 2 (Hero -> ProofOfWork): NO change
    tl.to(sky2Ref.current, { opacity: 0, ease: "none", duration: 1 });
    
    // 2 -> 3 (ProofOfWork -> Services): Change to skyn.jpeg
    tl.to(sky2Ref.current, { opacity: 1, ease: "none", duration: 1 });

    // 3 -> 4 (Services -> Process): Change back to sky.jpeg
    tl.to(sky2Ref.current, { opacity: 0, ease: "none", duration: 1 });

    // 4 -> 5 (Process -> Pricing): Change to skyn.jpeg
    tl.to(sky2Ref.current, { opacity: 1, ease: "none", duration: 1 });

    // 5 -> 6 (Pricing -> Footer): Change back to sky.jpeg
    tl.to(sky2Ref.current, { opacity: 0, ease: "none", duration: 1 });
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="fixed inset-0 w-full h-full z-0 pointer-events-none overflow-hidden bg-[#171717]">
      
      {/* Sky 1: sky.jpeg (Base layer) */}
      <div className="absolute inset-0 w-full h-full z-0">
        <Image 
          src={BACKGROUNDS[0]}
          alt="Sky Background 1" 
          fill
          className="object-cover object-center"
          priority
        />
      </div>

      {/* Sky 2: skyn.jpeg (Fades in seamlessly on scroll) */}
      <div ref={sky2Ref} className="absolute inset-0 w-full h-full z-0 opacity-0">
        <Image 
          src={BACKGROUNDS[1]}
          alt="Sky Background 2" 
          fill
          className="object-cover object-center"
          priority
        />
      </div>

    </div>
  );
}
