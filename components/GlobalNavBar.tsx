"use client";

import { useEffect, useState } from "react";
import { gsap } from "gsap";

const NAV_ITEMS = [
  { label: "Home", index: 0 },
  { label: "Tools", index: 1 },
  { label: "Services", index: 2 },
  { label: "Process", index: 3 },
  { label: "Pricing", index: 4 },
  { label: "Contact", index: 5 }
];

export default function GlobalNavBar() {
  const [activeIndex, setActiveIndex] = useState(0);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    // Listen to scroll progress
    const handleScroll = () => {
      const p = (window as any).horizontalScrollProgress || 0;
      // We have 6 sections (0 to 5)
      const currentIdx = Math.round(p * 5);
      setActiveIndex(currentIdx);
    };

    const interval = setInterval(handleScroll, 50);
    return () => clearInterval(interval);
  }, []);

  const handleNavClick = (index: number) => {
    const isDesktop = window.innerWidth >= 1280;
    if (isDesktop) {
      // Horizontal scroll logic for desktop
      window.scrollTo({
        top: index * window.innerWidth,
        behavior: "smooth"
      });
    } else {
      // Vertical scroll logic for mobile/tablet
      const panels = document.querySelectorAll('.horizontal-panel');
      if (panels[index]) {
        panels[index].scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <>
      {/* Desktop/Tablet Pill Navigation */}
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 hidden md:flex items-center gap-2 px-3 py-2 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
        {NAV_ITEMS.map((item) => (
          <button
            key={item.label}
            onClick={() => handleNavClick(item.index)}
            className={`
              relative px-5 py-2 rounded-full text-sm font-medium transition-all duration-500
              ${activeIndex === item.index 
                ? "text-black bg-white shadow-[0_0_15px_rgba(255,255,255,0.8)] scale-105" 
                : "text-white/80 hover:text-white hover:bg-white/10 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
              }
            `}
          >
            {item.label}
          </button>
        ))}
      </nav>

      {/* Mobile Hamburger Button */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="fixed top-6 right-6 z-[60] w-10 h-10 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 shadow-lg flex flex-col items-center justify-center gap-[4px] md:hidden transition-transform duration-300 active:scale-95"
      >
        <span className={`w-4 h-[2px] bg-white transition-all duration-300 ${isMobileMenuOpen ? "rotate-45 translate-y-[6px]" : ""}`}></span>
        <span className={`w-4 h-[2px] bg-white transition-all duration-300 ${isMobileMenuOpen ? "opacity-0" : "opacity-100"}`}></span>
        <span className={`w-4 h-[2px] bg-white transition-all duration-300 ${isMobileMenuOpen ? "-rotate-45 -translate-y-[6px]" : ""}`}></span>
      </button>

      {/* Mobile Full-Screen Overlay Menu */}
      <div 
        className={`fixed inset-0 z-50 flex items-center justify-center transition-all duration-700 ease-[cubic-bezier(0.85,0,0.15,1)] md:hidden ${isMobileMenuOpen ? "pointer-events-auto" : "pointer-events-none"}`}
        style={{
          clipPath: isMobileMenuOpen ? "circle(150% at calc(100% - 2.5rem) 2.5rem)" : "circle(0% at calc(100% - 2.5rem) 2.5rem)",
          backgroundColor: "rgba(23, 23, 23, 0.95)", // Matches site bg-[#171717]
          backdropFilter: "blur(12px)"
        }}
      >
        <div className="flex flex-col items-center gap-6">
          {NAV_ITEMS.map((item, i) => (
            <button 
              key={item.label}
              onClick={() => {
                setIsMobileMenuOpen(false);
                setTimeout(() => handleNavClick(item.index), 400); // Wait for menu close animation
              }}
              className={`text-2xl font-semibold tracking-wide transition-all duration-500 hover:scale-105 
                ${isMobileMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}
                ${activeIndex === item.index ? "text-transparent bg-clip-text bg-gradient-to-r from-white to-white/50 drop-shadow-md" : "text-white/60 hover:text-white"}
              `}
              style={{ transitionDelay: isMobileMenuOpen ? `${100 + i * 40}ms` : "0ms" }}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
