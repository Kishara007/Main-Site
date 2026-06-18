"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import Link from "next/link";
import Image from "next/image";

export default function Hero() {
  const container = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subheadlineRef = useRef<HTMLParagraphElement>(null);
  const overlineRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: "power4.out", duration: 1.2 } });

    tl.fromTo(
      overlineRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8 }
    )
    .fromTo(
      ".hero-word",
      { y: 100, opacity: 0, rotate: 2 },
      { y: 0, opacity: 1, rotate: 0, stagger: 0.05, duration: 1.4 },
      "-=0.4"
    )
    .fromTo(
      subheadlineRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1 },
      "-=0.8"
    )
    .fromTo(
      ".hero-btn-wrapper",
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.1, duration: 0.8, ease: "power2.out" },
      "-=0.8"
    );
  }, { scope: container });

  // Helper to split headline into animated words
  const text = "Beautifully designed. Brutally effective.";
  const words = text.split(" ");

  return (
    <section 
      ref={container} 
      className="relative w-full h-full min-h-screen flex flex-col lg:flex-row items-center px-6 lg:px-0 overflow-hidden"
    >
      {/* Left Side Spacer */}
      <div className="hidden lg:block lg:w-1/2 h-full flex-shrink-0 pointer-events-none"></div>

      {/* Right Side: Text Content */}
      <div className="w-full lg:w-1/2 flex flex-col items-start text-left z-10 mt-8 lg:mt-0 pb-16 lg:pb-0">
        <div 
          ref={overlineRef}
          className="mb-8 px-5 py-2 rounded-full border border-white/20 bg-white/10 backdrop-blur-sm text-xs font-semibold tracking-widest text-white uppercase shadow-lg opacity-0 [text-shadow:0_1px_2px_rgba(0,0,0,0.8)]"
        >
          PIXELPIE STUDIO
        </div>
        <div className="drop-shadow-[0_10px_20px_rgba(0,0,0,0.9)]">
          <h1 
            ref={headlineRef}
            className="text-5xl lg:text-7xl font-semibold tracking-tight leading-[1.1] mb-8 text-white [text-shadow:0_4px_8px_rgba(0,0,0,1)]"
          >
            {words.map((word, i) => (
              <span key={i} className="inline-block overflow-hidden pb-4 pr-3 -mb-2">
                <span className="hero-word inline-block origin-bottom-left">
                  {word}
                </span>
              </span>
            ))}
          </h1>
        </div>

        <div 
          ref={subheadlineRef}
          className="text-lg md:text-xl text-white mb-10 max-w-lg leading-relaxed font-medium bg-white/10 backdrop-blur-sm px-8 py-6 rounded-2xl border border-white/20 shadow-2xl opacity-0 [text-shadow:0_2px_4px_rgba(0,0,0,0.8)]"
        >
          Premium creative websites and bespoke automation tools. No boring templates. No bloated agency timelines. Just pure digital craftsmanship. Shipped fast.
        </div>

        <div ref={ctaRef} className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
          <div className="hero-btn-wrapper opacity-0 will-change-transform">
            <button 
              onClick={() => {
                const isDesktop = window.innerWidth >= 1280;
                if (isDesktop) {
                  window.scrollTo({ top: window.innerWidth * 4, behavior: "smooth" });
                } else {
                  document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="group relative px-8 py-4 border border-white rounded-full font-semibold overflow-hidden transition-all duration-300 hover:-translate-y-1 bg-white/10 backdrop-blur-md text-black hover:text-white shadow-lg"
            >
              <span className="relative z-10 flex items-center gap-2 transition-colors duration-300">
                Start a Project
                <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
              </span>
              <div className="absolute inset-y-0 right-0 w-full bg-white transition-all duration-300 ease-out group-hover:w-0 z-0"></div>
            </button>
          </div>
          
          <div className="hero-btn-wrapper opacity-0 will-change-transform">
            <button 
              onClick={() => {
                const isDesktop = window.innerWidth >= 1280;
                if (isDesktop) {
                  window.scrollTo({ top: window.innerWidth, behavior: "smooth" });
                } else {
                  document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="group px-8 py-4 bg-transparent text-white border border-white/30 rounded-full font-medium transition-all duration-300 hover:bg-white/10 hover:border-white/60 hover:-translate-y-1"
            >
              Explore Our Tools
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
