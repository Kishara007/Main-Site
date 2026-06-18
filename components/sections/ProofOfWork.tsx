"use client";

import { useRef, useContext, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Sparkles, LineChart, ChevronRight, ChevronLeft } from "lucide-react";
import Link from "next/link";
import { ScrollContext } from "@/app/page";

const tools = [
  // Page 1
  {
    category: "Future Release",
    title: "Coming Soon",
    desc: "We are currently building something amazing here. Stay tuned for updates.",
    link: "#",
    color: "bg-white/30",
    icon: <div className="w-6 h-6 rounded border-2 border-dashed border-white/30" />
  },
  {
    category: "Future Release",
    title: "Coming Soon",
    desc: "We are currently building something amazing here. Stay tuned for updates.",
    link: "#",
    color: "bg-white/30",
    icon: <div className="w-6 h-6 rounded-full border-2 border-dashed border-white/30" />
  },
  {
    category: "Future Release",
    title: "Coming Soon",
    desc: "We are currently building something amazing here. Stay tuned for updates.",
    link: "#",
    color: "bg-white/30",
    icon: <div className="w-6 h-6 rounded border-2 border-dashed border-white/30" />
  },
  {
    category: "Future Release",
    title: "Coming Soon",
    desc: "We are currently building something amazing here. Stay tuned for updates.",
    link: "#",
    color: "bg-white/30",
    icon: <div className="w-6 h-6 rounded-full border-2 border-dashed border-white/30" />
  },
  // Page 2
  {
    category: "Future Release",
    title: "Coming Soon",
    desc: "We are currently building something amazing here. Stay tuned for updates.",
    link: "#",
    color: "bg-white/30",
    icon: <div className="w-6 h-6 rounded border-2 border-dashed border-white/30" />
  },
  {
    category: "Future Release",
    title: "Coming Soon",
    desc: "We are currently building something amazing here. Stay tuned for updates.",
    link: "#",
    color: "bg-white/30",
    icon: <div className="w-6 h-6 rounded-full border-2 border-dashed border-white/30" />
  },
  {
    category: "Future Release",
    title: "Coming Soon",
    desc: "We are currently building something amazing here. Stay tuned for updates.",
    link: "#",
    color: "bg-white/30",
    icon: <div className="w-6 h-6 rounded border-2 border-dashed border-white/30" />
  },
  {
    category: "Future Release",
    title: "Coming Soon",
    desc: "We are currently building something amazing here. Stay tuned for updates.",
    link: "#",
    color: "bg-white/30",
    icon: <div className="w-6 h-6 rounded-full border-2 border-dashed border-white/30" />
  },
  // Page 3
  {
    category: "Future Release",
    title: "Coming Soon",
    desc: "We are currently building something amazing here. Stay tuned for updates.",
    link: "#",
    color: "bg-white/30",
    icon: <div className="w-6 h-6 rounded border-2 border-dashed border-white/30" />
  },
  {
    category: "Future Release",
    title: "Coming Soon",
    desc: "We are currently building something amazing here. Stay tuned for updates.",
    link: "#",
    color: "bg-white/30",
    icon: <div className="w-6 h-6 rounded-full border-2 border-dashed border-white/30" />
  },
  {
    category: "Future Release",
    title: "Coming Soon",
    desc: "We are currently building something amazing here. Stay tuned for updates.",
    link: "#",
    color: "bg-white/30",
    icon: <div className="w-6 h-6 rounded border-2 border-dashed border-white/30" />
  },
  {
    category: "Future Release",
    title: "Coming Soon",
    desc: "We are currently building something amazing here. Stay tuned for updates.",
    link: "#",
    color: "bg-white/30",
    icon: <div className="w-6 h-6 rounded-full border-2 border-dashed border-white/30" />
  }
];

export default function ProofOfWork() {
  const container = useRef<HTMLDivElement>(null);
  const scrollTween = useContext(ScrollContext);
  const [page, setPage] = useState(0);
  const totalPages = Math.ceil(tools.length / 4);

  const { contextSafe } = useGSAP({ scope: container });

  // Initial scroll animation
  useGSAP(() => {
    const isDesktop = window.innerWidth >= 1280;
    if (isDesktop && !scrollTween) return;

    const wrappers = gsap.utils.toArray(".bento-wrapper");
    
    gsap.fromTo(
      wrappers,
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
          start: isDesktop ? "left 75%" : "top 80%",
          end: isDesktop ? "right 25%" : "bottom 20%",
          toggleActions: "play none none reverse",
          containerAnimation: isDesktop ? scrollTween || undefined : undefined,
        }
      }
    );
  }, { dependencies: [scrollTween], scope: container });

  // Smooth transition for pagination
  const animatePageChange = contextSafe((newPage: number) => {
    const wrappers = gsap.utils.toArray(".bento-wrapper");
    gsap.to(wrappers, {
      y: -20,
      opacity: 0,
      duration: 0.3,
      stagger: 0.05,
      ease: "power2.in",
      onComplete: () => {
        setPage(newPage);
        // Wait briefly for React to update the DOM content, then animate in
        setTimeout(() => {
          gsap.fromTo(wrappers, 
            { y: 20, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.6, stagger: 0.05, ease: "power2.out" }
          );
        }, 50);
      }
    });
  });

  const handleNext = () => {
    if (page < totalPages - 1) animatePageChange(page + 1);
  };

  const handlePrev = () => {
    if (page > 0) animatePageChange(page - 1);
  };

  const visibleTools = tools.slice(page * 4, (page + 1) * 4);

  return (
    <section 
      id="portfolio" 
      ref={container} 
      className="w-full h-full flex flex-col justify-center px-6 md:px-16 lg:px-24 relative"
    >
      <div className="w-full max-w-6xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 md:mb-14 gap-6">
          <div>
            <h2 className="text-sm font-semibold tracking-widest text-white/70 uppercase mb-3 drop-shadow-md">Proof of Work</h2>
            <h3 className="text-4xl md:text-5xl font-bold text-white tracking-tight drop-shadow-lg">Tools that empower your workflow.</h3>
          </div>
          
          {/* Creative Pagination Control */}
          <div className="flex items-center gap-6 bg-white/10 backdrop-blur-md border border-white/20 p-2 rounded-full shadow-lg">
            <button 
              onClick={handlePrev}
              disabled={page === 0}
              className={`p-3 rounded-full transition-all duration-300 ${page === 0 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-white/20 text-white'}`}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            
            <div className="flex items-center gap-3 font-mono text-sm tracking-widest text-white/90">
              <span className="font-bold text-white">0{page + 1}</span>
              <div className="flex gap-1">
                {[...Array(totalPages)].map((_, i) => (
                  <div key={i} className={`w-2 h-2 rounded-full transition-all duration-500 ${i === page ? 'bg-white scale-110 shadow-[0_0_8px_rgba(255,255,255,0.8)]' : 'bg-white/30'}`} />
                ))}
              </div>
              <span className="text-white/50">0{totalPages}</span>
            </div>

            <button 
              onClick={handleNext}
              disabled={page === totalPages - 1}
              className={`p-3 rounded-full transition-all duration-300 ${page === totalPages - 1 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-white/20 text-white'}`}
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-4 lg:gap-6 min-h-[460px]">
          {visibleTools.map((tool, idx) => (
            <div 
              key={idx} 
              className={`bento-wrapper will-change-transform ${idx === 0 ? 'md:col-span-2' : ''} ${idx === 3 ? 'md:col-span-2' : ''}`}
            >
              <div className="group w-full h-full relative rounded-3xl p-8 border border-white/10 bg-black/20 backdrop-blur-md shadow-2xl hover:-translate-y-2 hover:border-white/30 transition-all duration-500 overflow-hidden flex flex-col justify-between">
                {/* Sliding SOLID WHITE background mimicking the Hero button */}
                <div className="absolute inset-y-0 left-0 w-0 bg-white transition-all duration-500 ease-out group-hover:w-full z-0"></div>

                <div className="relative z-10 flex flex-col h-full">
                  <div className="flex items-center gap-3 mb-6">
                    {tool.icon}
                    <span className="text-xs font-semibold px-3 py-1 rounded-full bg-white/10 text-white border border-white/10 backdrop-blur-sm shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] group-hover:bg-black/5 group-hover:text-black group-hover:border-black/10 transition-colors duration-500">
                      {tool.category}
                    </span>
                  </div>
                  
                  <div className="mt-auto">
                    <h4 className="text-2xl font-bold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-white via-white/90 to-white/50 drop-shadow-[0_0_15px_rgba(255,255,255,0.4)] group-hover:from-black group-hover:via-gray-900 group-hover:to-gray-800 group-hover:drop-shadow-none transition-all duration-500">
                      {tool.title}
                    </h4>
                    <p className="text-white/95 font-medium leading-relaxed mb-8 max-w-md drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] group-hover:text-gray-800 group-hover:drop-shadow-none transition-all duration-500">
                      {tool.desc}
                    </p>
                    
                    <Link href={tool.link} className="inline-flex items-center text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-white/70 drop-shadow-[0_0_10px_rgba(255,255,255,0.3)] group-hover:from-black group-hover:to-gray-900 group-hover:drop-shadow-none transition-all duration-500">
                      Try it for free
                      <ArrowRight className="w-4 h-4 ml-2 text-white group-hover:text-black transition-colors duration-500" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
