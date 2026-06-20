"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import Image from "next/image";

export default function Preloader() {
  const preloaderRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Prevent scrolling while loading
    document.body.style.overflow = "hidden";

    // Logo pulse animation
    const pulseAnim = gsap.to(logoRef.current, {
      opacity: 0.4,
      scale: 0.95,
      duration: 0.8,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    const progressObj = { value: 0 };
    
    // Check if the page is already loaded
    let isLoaded = document.readyState === "complete";
    const onLoad = () => { isLoaded = true; };
    if (!isLoaded) {
      window.addEventListener("load", onLoad);
    }

    const updateCounter = () => {
      if (textRef.current) {
        textRef.current.innerText = `${Math.floor(progressObj.value)}%`;
      }
    };

    // Master timeline
    const tl = gsap.timeline({
      onComplete: () => {
        document.body.style.overflow = "";
        pulseAnim.kill();
      }
    });

    // Simulate loading progress to 90%
    tl.to(progressObj, {
      value: 90,
      duration: 1.5,
      ease: "power1.out",
      onUpdate: updateCounter,
    });

    // Wait for actual window load to complete the progress
    tl.to(progressObj, {
      value: 100,
      duration: 0.5,
      ease: "power2.out",
      onUpdate: updateCounter,
      onStart: function () {
        if (!isLoaded) {
          this.pause();
          const checkLoad = setInterval(() => {
            if (isLoaded) {
              clearInterval(checkLoad);
              this.resume();
            }
          }, 100);
        }
      }
    });

    // Exit animations
    tl.to([counterRef.current, logoRef.current], {
      opacity: 0,
      y: -20,
      duration: 0.5,
      stagger: 0.1,
      ease: "power2.inOut",
    })
    .to(preloaderRef.current, {
      yPercent: -100,
      duration: 0.8,
      ease: "power4.inOut",
      onComplete: () => {
        if (preloaderRef.current) {
          preloaderRef.current.style.display = "none";
        }
      }
    }, "-=0.2");

    return () => {
      window.removeEventListener("load", onLoad);
      document.body.style.overflow = "";
      pulseAnim.kill();
      tl.kill();
    };
  }, []);

  return (
    <div
      ref={preloaderRef}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white/95 backdrop-blur-sm text-[#171717]"
    >
      <div ref={logoRef} className="mb-6 relative w-20 h-20 md:w-24 md:h-24">
        <Image
          src="/images/icon.png"
          alt="Loading Logo"
          fill
          sizes="(max-width: 768px) 80px, 96px"
          className="object-contain"
          priority
        />
      </div>
      <div ref={counterRef} className="overflow-hidden">
        <div
          ref={textRef}
          className="text-4xl md:text-5xl font-light tracking-widest tabular-nums"
        >
          0%
        </div>
      </div>
    </div>
  );
}
