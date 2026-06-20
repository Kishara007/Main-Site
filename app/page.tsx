"use client";

import { useRef, useState, createContext } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Loader } from "@react-three/drei";

import Hero from "@/components/sections/Hero";
import ProofOfWork from "@/components/sections/ProofOfWork";
import Services from "@/components/sections/Services";
import Process from "@/components/sections/Process";
import Pricing from "@/components/sections/Pricing";
import Footer from "@/components/sections/Footer";
import AnimatedBackground from "@/components/AnimatedBackground";
import Clouds from "@/components/Clouds";
import GlobalScrollArrow from "@/components/GlobalScrollArrow";
import GlobalNavBar from "@/components/GlobalNavBar";
import dynamic from "next/dynamic";

// Asynchronously load the heavy 3D canvas so it doesn't block the initial HTML render and LCP
const GlobalBird = dynamic(() => import("@/components/GlobalBird"), { ssr: false });
// so they can trigger their entrance animations based on horizontal position.
export const ScrollContext = createContext<gsap.core.Tween | null>(null);

export default function Home() {
  const container = useRef<HTMLDivElement>(null);
  const wrapper = useRef<HTMLDivElement>(null);
  const [scrollTween, setScrollTween] = useState<gsap.core.Tween | null>(null);
  const [activeSection, setActiveSection] = useState(0);

  useGSAP(() => {
    // Prevent ScrollTrigger from aggressively resetting animations when the mobile address bar hides
    ScrollTrigger.config({ ignoreMobileResize: true });
    
    let mm = gsap.matchMedia();

    // Only apply horizontal scroll on tablet/desktop devices
    mm.add("(min-width: 1280px)", () => {
      const sections = gsap.utils.toArray(".horizontal-panel", wrapper.current);
      
      const tween = gsap.to(sections, {
        xPercent: -100 * (sections.length - 1),
        ease: "none",
        scrollTrigger: {
          trigger: container.current,
          pin: true,
          scrub: 1,
          end: () => "+=" + (wrapper.current?.offsetWidth || window.innerWidth * 5),
          onUpdate: (self) => {
            // Write exact scrub progress to the window so 3D elements can read it synchronously
            if (typeof window !== "undefined") {
              (window as any).horizontalScrollProgress = self.progress;
            }
            const sectionIndex = Math.round(self.progress * (sections.length - 1));
            setActiveSection(sectionIndex);
          }
        }
      });
      
      setScrollTween(tween);

      return () => {
        tween.kill();
      };
    });

    // Handle mobile vertical scroll tracking
    mm.add("(max-width: 1279px)", () => {
      const trigger = ScrollTrigger.create({
        trigger: container.current,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
        onUpdate: (self) => {
          if (typeof window !== "undefined") {
            (window as any).horizontalScrollProgress = self.progress;
          }
        }
      });

      return () => {
        trigger.kill();
      };
    });
  }, { scope: container });

  return (
    <main ref={container} className="relative w-full bg-[#171717] overflow-hidden">
      {/* Global Animated Background */}
      <AnimatedBackground />

      {/* Global Flying Clouds */}
      <Clouds />

      <div 
        ref={wrapper} 
        className="flex flex-col xl:flex-row xl:flex-nowrap w-full xl:w-[500vw] relative z-10"
      >
        <ScrollContext.Provider value={scrollTween}>
          <GlobalNavBar />
          <GlobalBird />
          <GlobalScrollArrow />
          <div className="horizontal-panel w-full xl:w-screen min-h-[100svh] xl:h-screen py-24 xl:py-0 flex-shrink-0 flex flex-col justify-center xl:items-center overflow-x-hidden xl:overflow-hidden relative">
            <div className="w-full h-full"><Hero /></div>
          </div>
          <div className="horizontal-panel w-full xl:w-screen min-h-[100svh] xl:h-screen py-24 xl:py-0 flex-shrink-0 flex flex-col justify-center xl:items-center overflow-x-hidden xl:overflow-hidden relative">
            <div className="w-full"><ProofOfWork /></div>
          </div>
          <div className="horizontal-panel w-full xl:w-screen min-h-[100svh] xl:h-screen py-24 xl:py-0 flex-shrink-0 flex flex-col justify-center xl:items-center overflow-x-hidden xl:overflow-hidden relative">
            <div className="w-full"><Services /></div>
          </div>
          <div className="horizontal-panel w-full xl:w-screen min-h-[100svh] xl:h-screen py-24 xl:py-0 flex-shrink-0 flex flex-col justify-center xl:items-center overflow-x-hidden xl:overflow-hidden relative">
            <div className="w-full"><Process /></div>
          </div>
          <div className="horizontal-panel w-full xl:w-screen min-h-[100svh] xl:h-screen py-24 xl:py-0 flex-shrink-0 flex flex-col justify-center xl:items-center overflow-x-hidden xl:overflow-hidden relative">
            <div className="w-full"><Pricing /></div>
          </div>
          <div className="horizontal-panel w-full xl:w-screen min-h-[100svh] xl:h-screen py-24 xl:py-0 flex-shrink-0 flex flex-col justify-center xl:items-center overflow-x-hidden xl:overflow-hidden relative">
            <div className="w-full"><Footer /></div>
          </div>
        </ScrollContext.Provider>
      </div>
      <Loader 
        containerStyles={{ background: '#171717', zIndex: 9999 }} 
        innerStyles={{ width: '300px', background: 'rgba(255,255,255,0.1)', height: '2px' }} 
        barStyles={{ background: 'white', height: '2px' }} 
        dataStyles={{ color: 'white', fontSize: '1rem', fontWeight: 'bold', letterSpacing: '0.1em' }} 
      />
    </main>
  );
}
