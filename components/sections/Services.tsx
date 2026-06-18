"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { Settings, Globe, Lightbulb } from "lucide-react";

import { useContext } from "react";
import { ScrollContext } from "@/app/page";

const services = [
  {
    icon: <Settings className="w-8 h-8 stroke-1 text-white group-hover:text-black transition-colors duration-500" />,
    title: "Custom Automation",
    desc: "We build bespoke software to replace your messy spreadsheets.",
    color: "bg-sky-400"
  },
  {
    icon: <Globe className="w-8 h-8 stroke-1 text-white group-hover:text-black transition-colors duration-500" />,
    title: "Web Applications",
    desc: "Scalable, fast, and responsive apps built with modern frameworks.",
    color: "bg-purple-400"
  },
  {
    icon: <Lightbulb className="w-8 h-8 stroke-1 text-white group-hover:text-black transition-colors duration-500" />,
    title: "Bespoke Innovation",
    desc: "Tedious workflows or wild tool ideas? Bring us the problem. We code the solution.",
    color: "bg-emerald-400"
  }
];

export default function Services() {
  const container = useRef<HTMLDivElement>(null);
  const scrollTween = useContext(ScrollContext);

  useGSAP(() => {
    const isDesktop = window.innerWidth >= 1280;
    if (isDesktop && !scrollTween) return;

    const cards = gsap.utils.toArray(".service-card");

    gsap.fromTo(
      cards,
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
  }, { dependencies: [scrollTween], scope: container });

  return (
    <section 
      ref={container} 
      className="w-full h-full flex flex-col justify-center px-6 md:px-16 lg:px-24 relative"
    >
      <div className="w-full max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Side: Content & Cards */}
        <div className="flex flex-col">
          <div className="mb-10 text-left">
            <h2 className="text-sm font-semibold tracking-widest text-white/70 uppercase mb-4 drop-shadow-md">Our Services</h2>
            <h3 className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-white/90 to-white/50 drop-shadow-[0_0_15px_rgba(255,255,255,0.4)] mb-6">
              What We Build
            </h3>
            <p className="text-white/90 font-light text-xl drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] max-w-lg">
              Logic meets aesthetics. Custom web apps and creative tools meticulously engineered to multiply your time.
            </p>
          </div>

          <div className="flex flex-col gap-6">
            {services.map((service, idx) => (
              <div key={idx} className="service-card will-change-transform group w-full relative rounded-3xl p-6 border border-white/10 bg-black/30 backdrop-blur-md shadow-2xl hover:translate-x-2 hover:border-white/30 transition-all duration-500 overflow-hidden flex flex-row items-center text-left gap-6">
                
                {/* Sliding white background for hover */}
                <div className="absolute inset-y-0 left-0 w-0 bg-white transition-all duration-500 ease-out group-hover:w-full z-0"></div>
                
                <div className="relative z-10 flex-shrink-0">
                  <div className="service-icon w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center border border-white/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)] group-hover:bg-black/5 group-hover:border-black/10 transition-colors duration-500">
                    {service.icon}
                  </div>
                </div>
                
                <div className="relative z-10 flex flex-col">
                  <h4 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-white/90 to-white/50 drop-shadow-[0_0_15px_rgba(255,255,255,0.4)] group-hover:from-black group-hover:via-gray-900 group-hover:to-gray-800 group-hover:drop-shadow-none transition-all duration-500 mb-2">
                    {service.title}
                  </h4>
                  
                  <p className="text-white/95 text-sm font-medium leading-relaxed drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] group-hover:text-gray-800 group-hover:drop-shadow-none transition-all duration-500 max-w-sm">
                    {service.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Right Side: Empty Space reserved for 3D Model Animation */}
        <div className="hidden lg:block w-full h-full min-h-[500px]">
          {/* The Phoenix bird model will fly into this space via Phoenix.tsx */}
        </div>
      </div>
    </section>
  );
}
