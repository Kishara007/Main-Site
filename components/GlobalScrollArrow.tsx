"use client";

import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { gsap } from "gsap";

export default function GlobalScrollArrow() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Bounce animation for the arrow
    gsap.to(".scroll-arrow-icon", {
      x: 8,
      duration: 1,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut"
    });

    // Listen to scroll progress
    const handleScroll = () => {
      const p = (window as any).horizontalScrollProgress || 0;
      setProgress(p);
    };

    // Poll for progress since GSAP updates it synchronously on the window object
    const interval = setInterval(handleScroll, 50);
    return () => clearInterval(interval);
  }, []);

  // Hide the arrow when we reach the very end (Footer)
  if (progress > 0.95) return null;

  // Calculate SVG stroke dashoffset for the progress ring
  const radius = 24;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - progress * circumference;

  const scrollToNext = () => {
    // Each section is exactly window.innerWidth in scroll distance
    window.scrollTo({
      top: window.scrollY + window.innerWidth,
      behavior: "smooth"
    });
  };

  return (
    <button 
      onClick={scrollToNext}
      className="fixed right-6 md:right-12 bottom-8 z-50 hidden md:flex items-center gap-4 group cursor-pointer"
      aria-label="Scroll to next section"
    >
      {/* Scroll Text */}
      <span className="text-white/50 text-xs font-bold tracking-[0.2em] uppercase group-hover:text-white transition-colors duration-300">
        Next
      </span>

      {/* Progress Ring & Arrow */}
      <div className="relative flex items-center justify-center w-16 h-16">
        {/* Background Circle */}
        <svg className="absolute inset-0 w-full h-full -rotate-90">
          <circle
            cx="32"
            cy="32"
            r={radius}
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="2"
            fill="transparent"
          />
          {/* Progress Circle */}
          <circle
            cx="32"
            cy="32"
            r={radius}
            stroke="rgba(255,255,255,0.8)"
            strokeWidth="2"
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            className="transition-all duration-300 ease-out"
          />
        </svg>

        {/* Glassmorphic Inner Circle */}
        <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 shadow-[0_0_15px_rgba(255,255,255,0.1)] group-hover:bg-white/20 transition-all duration-300">
          <ArrowRight className="scroll-arrow-icon w-5 h-5 text-white" />
        </div>
      </div>
    </button>
  );
}
