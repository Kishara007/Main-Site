"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useContext } from "react";
import { ScrollContext } from "@/app/page";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Footer() {
  const container = useRef<HTMLElement>(null);
  const scrollTween = useContext(ScrollContext);

  useGSAP(() => {
    const isDesktop = window.innerWidth >= 1280;
    if (isDesktop && !scrollTween) return;

    gsap.fromTo(
      container.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: container.current,
          start: isDesktop ? "left 85%" : "top 85%",
          containerAnimation: isDesktop ? scrollTween || undefined : undefined,
        }
      }
    );
  }, { dependencies: [scrollTween], scope: container });

  return (
    <footer 
      id="contact" 
      ref={container} 
      className="w-full h-full flex flex-col justify-center px-6 md:px-16 lg:px-24 relative overflow-hidden"
    >
      <div className="w-full max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between relative z-10 gap-16 lg:gap-8">
        
        {/* Left Side: Massive Typography & CTA */}
        <div className="w-full lg:w-3/5 flex flex-col items-start text-left">
          <h2 className="text-5xl md:text-7xl lg:text-[5.5rem] font-bold text-transparent bg-clip-text bg-gradient-to-b from-white via-white/90 to-white/40 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)] mb-6 leading-[1.1] tracking-tight">
            Stop thinking.<br/>
            Start executing.
          </h2>
          <p className="text-white/60 font-light text-2xl md:text-3xl mb-12 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
            Let's build something great.
          </p>
          
          <button 
            onClick={() => {
              const isDesktop = window.innerWidth >= 1280;
              if (isDesktop) {
                window.scrollTo({ top: window.innerWidth * 4, behavior: "smooth" });
              } else {
                document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="inline-flex items-center gap-4 px-10 py-5 bg-white text-black rounded-full font-bold text-lg transition-all duration-300 hover:scale-105 hover:bg-gray-100 hover:shadow-[0_0_40px_rgba(255,255,255,0.5)] group"
          >
            Start a Project
            <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center text-white group-hover:-rotate-45 transition-transform duration-300">
              <ArrowUpRight className="w-4 h-4" />
            </div>
          </button>
        </div>

        {/* Right Side: Contact, Links, Credits */}
        <div className="w-full lg:w-2/5 flex flex-col items-start lg:items-end text-left lg:text-right gap-12 pt-8 lg:pt-0 lg:border-l lg:border-white/10 lg:pl-16">
          
          <div className="flex flex-col gap-2">
            <h4 className="text-white/40 text-sm tracking-widest uppercase mb-2">Website</h4>
            <a href="https://pixelpiestudio.com" className="text-2xl md:text-3xl font-medium text-white hover:text-white/70 transition-colors">
              pixelpiestudio.com
            </a>
          </div>

          <div className="flex flex-col gap-2">
            <h4 className="text-white/40 text-sm tracking-widest uppercase mb-2">Socials</h4>
            <div className="flex flex-col gap-3 mt-2">
              <a href="https://www.youtube.com/@PixelPie1111" target="_blank" rel="noopener noreferrer" className="text-xl text-white/80 hover:text-white transition-colors flex items-center lg:justify-end gap-2 group">
                <span className="lg:order-2">YouTube</span>
                <ArrowUpRight className="w-5 h-5 opacity-0 -translate-x-2 translate-y-2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all lg:order-1" />
              </a>
              <a href="https://www.instagram.com/pixelpie7777/" target="_blank" rel="noopener noreferrer" className="text-xl text-white/80 hover:text-white transition-colors flex items-center lg:justify-end gap-2 group">
                <span className="lg:order-2">Instagram</span>
                <ArrowUpRight className="w-5 h-5 opacity-0 -translate-x-2 translate-y-2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all lg:order-1" />
              </a>
              <a href="https://wa.me/94751670510" target="_blank" rel="noopener noreferrer" className="text-xl text-white/80 hover:text-white transition-colors flex items-center lg:justify-end gap-2 group">
                <span className="lg:order-2">WhatsApp</span>
                <ArrowUpRight className="w-5 h-5 opacity-0 -translate-x-2 translate-y-2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all lg:order-1" />
              </a>
            </div>
          </div>

          <div className="flex flex-col gap-4 mt-auto lg:items-end pt-4">
            <div className="text-4xl font-bold text-white tracking-tight drop-shadow-md">
              PixelPie.
            </div>
            <div className="text-sm text-white/50 font-light">
              © {new Date().getFullYear()} PixelPie Studio.
            </div>
            <div className="text-xs text-white/30 leading-relaxed max-w-xs">
              <a href="https://skfb.ly/6vLBp" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors underline decoration-transparent hover:decoration-white/30 underline-offset-4">"phoenix bird"</a> by NORBERTO-3D is licensed under <a href="http://creativecommons.org/licenses/by/4.0/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors underline decoration-transparent hover:decoration-white/30 underline-offset-4">CC BY 4.0</a>.
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
}
