"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { useContext } from "react";
import { ScrollContext } from "@/app/page";

const steps = [
  {
    num: "01",
    title: "Submit",
    desc: "Send your requirements."
  },
  {
    num: "02",
    title: "Progress",
    desc: "Review the working draft in real-time."
  },
  {
    num: "03",
    title: "Deliver",
    desc: "Get the final, production-ready product."
  }
];

export default function Process() {
  const container = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const scrollTween = useContext(ScrollContext);

  useGSAP(() => {
    const isDesktop = window.innerWidth >= 1280;
    if (isDesktop && !scrollTween) return;

    // Animate progress line
    gsap.fromTo(
      lineRef.current,
      { scaleX: 0 },
      {
        scaleX: 1,
        ease: "none",
        scrollTrigger: {
          trigger: container.current,
          start: isDesktop ? "left center" : "top center",
          end: isDesktop ? "right center" : "bottom center",
          scrub: 1,
          containerAnimation: isDesktop ? scrollTween || undefined : undefined,
        }
      }
    );

    // Animate steps (Creative Swing-In)
    const stepEls = gsap.utils.toArray(".process-step");
    gsap.fromTo(
      stepEls,
      { 
        opacity: 0, 
        y: 150, 
        x: -100,
        scale: 0.5,
        rotationZ: -15
      },
      {
        opacity: 1,
        y: 0,
        x: 0,
        scale: 1,
        rotationZ: 0,
        stagger: 0.1,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: {
          trigger: container.current,
          start: isDesktop ? "left 75%" : "top 75%",
          end: isDesktop ? "right 25%" : "bottom 20%",
          toggleActions: "play none none reverse",
          containerAnimation: isDesktop ? scrollTween || undefined : undefined,
        }
      }
    );

    // Sequential Auto-Hover based on horizontal scroll progress
    stepEls.forEach((card: any) => {
      ScrollTrigger.create({
        trigger: card,
        start: isDesktop ? "left 55%" : "top 55%",
        end: isDesktop ? "right 45%" : "bottom 45%",
        containerAnimation: isDesktop ? scrollTween || undefined : undefined,
        toggleClass: { targets: card, className: "is-active" }
      });
    });
  }, { dependencies: [scrollTween], scope: container });

  return (
    <section 
      ref={container} 
      className="w-full h-full flex flex-col pt-24 px-6 md:px-16 lg:px-24 relative"
    >
      {/* Top Section: Content & Cards */}
      <div className="w-full max-w-7xl mx-auto relative z-10">
        <div className="mb-12 text-center max-w-3xl mx-auto">
          <h2 className="text-sm font-semibold tracking-widest text-white/70 uppercase mb-4 drop-shadow-md">How it Works</h2>
          <h3 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-white/90 to-white/50 drop-shadow-[0_0_15px_rgba(255,255,255,0.4)] mb-4">
            The Process
          </h3>
          <p className="text-white/90 font-light text-lg drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
            Building trust through transparency and speed.
          </p>
        </div>

        <div className="relative">
          {/* Background horizontal line */}
          <div className="absolute top-12 left-0 right-0 h-px bg-white/10 hidden md:block" />
          
          {/* Animated progress line */}
          <div 
            ref={lineRef} 
            className="absolute top-12 left-0 right-0 h-px bg-white hidden md:block origin-left shadow-[0_0_10px_rgba(255,255,255,0.8)] z-0"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
            {steps.map((step, idx) => (
              <div key={idx} className="process-step group relative rounded-3xl p-6 border border-white/10 bg-black/30 backdrop-blur-md shadow-2xl hover:border-white/30 group-[.is-active]:border-white/30 transition-all duration-500 overflow-hidden flex flex-col text-left">
                
                {/* Sliding white background for hover */}
                <div className="absolute inset-y-0 left-0 w-0 bg-white transition-all duration-500 ease-out group-hover:w-full group-[.is-active]:w-full z-0"></div>

                <div className="relative z-10">
                  {/* Number circle */}
                  <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center mb-6 shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)] text-white font-bold text-xl group-hover:bg-black/5 group-hover:text-black group-hover:border-black/10 group-[.is-active]:bg-black/5 group-[.is-active]:text-black group-[.is-active]:border-black/10 transition-colors duration-500">
                    {step.num}
                  </div>
                  
                  <h4 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-white/90 to-white/50 drop-shadow-[0_0_15px_rgba(255,255,255,0.4)] group-hover:from-black group-hover:via-gray-900 group-hover:to-gray-800 group-hover:drop-shadow-none group-[.is-active]:from-black group-[.is-active]:via-gray-900 group-[.is-active]:to-gray-800 group-[.is-active]:drop-shadow-none transition-all duration-500 mb-3">
                    {step.title}
                  </h4>
                  <p className="text-white/95 text-sm font-medium leading-relaxed drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] group-hover:text-gray-800 group-hover:drop-shadow-none group-[.is-active]:text-gray-800 group-[.is-active]:drop-shadow-none transition-all duration-500">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Section: Empty Space reserved for 3D Model Animation */}
      <div className="w-full flex-grow relative min-h-[300px]">
        {/* The Phoenix bird model will fly into this space via Phoenix.tsx */}
      </div>
    </section>
  );
}
