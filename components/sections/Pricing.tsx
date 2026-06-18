"use client";

import { useRef, useContext } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Globe, FileSpreadsheet, Code2 } from "lucide-react";
import Link from "next/link";
import { ScrollContext } from "@/app/page";

const packages = [
  {
    icon: <Globe className="w-8 h-8 stroke-1 text-white group-hover:text-black transition-colors duration-500" />,
    title: "Portfolio Websites",
    desc: "High engaging creative portfolio websites built to convert.",
    price: "50",
    color: "bg-fuchsia-400"
  },
  {
    icon: <FileSpreadsheet className="w-8 h-8 stroke-1 text-white group-hover:text-black transition-colors duration-500" />,
    title: "Excel Automation",
    desc: "Creative Excel Automation tools exactly as you want them.",
    price: "30",
    color: "bg-amber-400"
  },
  {
    icon: <Code2 className="w-8 h-8 stroke-1 text-white group-hover:text-black transition-colors duration-500" />,
    title: "Custom Solutions",
    desc: "Wild tool ideas? Bring us the problem. We code the solution.",
    price: "50",
    color: "bg-indigo-400"
  }
];

export default function Pricing() {
  const container = useRef<HTMLDivElement>(null);
  const scrollTween = useContext(ScrollContext);

  // Card Throw Animation
  useGSAP(() => {
    const isDesktop = window.innerWidth >= 1280;
    if (isDesktop && !scrollTween) return;

    const cards = gsap.utils.toArray(".pricing-card");
    
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
      id="pricing"
      ref={container} 
      className="w-full h-full flex flex-col justify-center px-6 md:px-16 lg:px-24 relative"
    >
      <div className="w-full max-w-5xl mx-auto relative z-10">
        <div className="mb-10 text-center max-w-2xl mx-auto">
          <h2 className="text-sm font-semibold tracking-widest text-white/70 uppercase mb-4 drop-shadow-md">Pricing</h2>
          <h3 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-white/90 to-white/50 drop-shadow-[0_0_15px_rgba(255,255,255,0.4)] mb-4">
            Transparent Packages
          </h3>
          <p className="text-white/90 font-light text-base drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
            Clear, organized, and beautifully crafted solutions for every scale.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 relative z-10">
          {packages.map((pkg, idx) => (
            <div key={idx} className="pricing-card will-change-transform group relative rounded-3xl p-6 border border-white/10 bg-black/30 backdrop-blur-md shadow-2xl hover:border-white/30 transition-all duration-500 overflow-hidden flex flex-col text-left">
              
              {/* Sliding white background for hover */}
              <div className="absolute inset-y-0 left-0 w-0 bg-white transition-all duration-500 ease-out group-hover:w-full z-0"></div>

              {/* Colored blur glow removed based on user request */}

              <div className="relative z-10 flex flex-col h-full">
                {/* Icon */}
                <div className="w-14 h-14 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center mb-6 shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)] group-hover:bg-black/5 group-hover:border-black/10 transition-colors duration-500">
                  {pkg.icon}
                </div>
                
                <h4 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-white/90 to-white/50 drop-shadow-[0_0_15px_rgba(255,255,255,0.4)] group-hover:from-black group-hover:via-gray-900 group-hover:to-gray-800 group-hover:drop-shadow-none transition-all duration-500 mb-3">
                  {pkg.title}
                </h4>
                
                <p className="text-white/95 text-sm font-medium leading-relaxed drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] group-hover:text-gray-800 group-hover:drop-shadow-none transition-all duration-500 mb-6 flex-grow">
                  {pkg.desc}
                </p>

                <div className="mt-auto pt-5 border-t border-white/10 group-hover:border-black/10 transition-colors duration-500 flex items-end justify-between">
                  <div>
                    <span className="text-[10px] font-semibold tracking-widest text-white/50 uppercase group-hover:text-black/50 transition-colors duration-500 block mb-1">
                      Starting From
                    </span>
                    <span className="text-3xl font-bold text-white group-hover:text-black transition-colors duration-500">
                      ${pkg.price}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    {/* WhatsApp Button */}
                    <a 
                      href={`https://wa.me/94751670510?text=${encodeURIComponent(`Hi PixelPie Studio, I am interested in the ${pkg.title} package starting at $${pkg.price}.`)}`}
                      target="_blank" rel="noopener noreferrer"
                      title="Contact via WhatsApp"
                      className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center border border-white/10 group-hover:bg-black/5 group-hover:border-black/10 hover:!bg-[#25D366] hover:!border-[#25D366] transition-all duration-500 hover:scale-110 group/wa relative overflow-hidden"
                    >
                      <svg className="w-5 h-5 text-white group-hover:text-[#25D366] group-hover/wa:!text-white transition-colors relative z-10" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
                      </svg>
                    </a>
                    
                    {/* Email Button */}
                    <a 
                      href={`mailto:hellopixelpiestudio@gmail.com?subject=${encodeURIComponent(`Inquiry: ${pkg.title} Package ($${pkg.price})`)}&body=${encodeURIComponent(`Hi PixelPie Studio,\n\nI am interested in the ${pkg.title} package starting at $${pkg.price}.\n\nHere are some details about my project:\n- Name: \n- Project Description: \n- Timeline: \n\nLooking forward to hearing from you!`)}`} 
                      title="Contact via Email"
                      className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center border border-white/10 group-hover:bg-black/5 group-hover:border-black/10 hover:!bg-black hover:!border-black transition-all duration-500 hover:scale-110 group/email relative overflow-hidden"
                    >
                      <ArrowRight className="w-4 h-4 text-white group-hover:text-black group-hover/email:!text-white transition-colors relative z-10" />
                    </a>
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
