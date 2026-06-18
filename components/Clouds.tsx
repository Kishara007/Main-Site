"use client";

import { useRef, useState, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import Image from "next/image";

const CLOUD_IMAGES = ["/images/9.png", "/images/10.png"];

interface CloudData {
  id: number;
  src: string;
  top: number;
  size: number;
  duration: number;
  delay: number;
}

export default function Clouds() {
  const container = useRef<HTMLDivElement>(null);
  const [clouds, setClouds] = useState<CloudData[]>([]);

  useEffect(() => {
    // Generate a diverse pool of 12 clouds on client mount to prevent hydration mismatch
    const generatedClouds: CloudData[] = Array.from({ length: 12 }).map((_, i) => {
      // Size modifier from 0.4x to 1.2x natural size
      const size = 0.4 + Math.random() * 0.8; 
      return {
        id: i,
        src: CLOUD_IMAGES[Math.floor(Math.random() * CLOUD_IMAGES.length)],
        top: Math.random() * 75, // Randomly scattered across the entire sky (top 75%)
        size: size,
        duration: 60 + Math.random() * 40, // Moderate realistic drifting speeds (between 60s and 100s)
        delay: Math.random() * -100, // Negative delay so the sky is already populated on load
      };
    });
    setClouds(generatedClouds);
  }, []);

  useGSAP(() => {
    if (!container.current || clouds.length === 0) return;
    
    const cloudElements = gsap.utils.toArray(".random-cloud", container.current);
    
    cloudElements.forEach((el: any, i) => {
      const data = clouds[i];
      // Animate strictly right-to-left
      gsap.fromTo(el, 
        { x: "100vw" }, // Start just off-screen right
        {
          x: "-100vw", // Guarantee it completely clears the left side before looping
          duration: data.duration,
          ease: "none",
          repeat: -1,
          delay: data.delay,
        }
      );
    });
  }, { scope: container, dependencies: [clouds] });

  // Only render once mounted
  if (clouds.length === 0) return null;

  return (
    <div ref={container} className="fixed top-0 left-0 w-full h-screen z-0 pointer-events-none overflow-hidden mix-blend-normal">
      {clouds.map((cloud) => (
        <div 
          key={cloud.id}
          className="random-cloud absolute will-change-transform"
          style={{
            top: `${cloud.top}vh`,
            width: `${40 * cloud.size}vw`, // Scaled width
            height: `${25 * cloud.size}vh`, // Scaled height
            left: 0,
            // Smaller clouds (further back) are slightly more transparent to simulate atmospheric depth
            opacity: 0.3 + (cloud.size * 0.5), 
            // Larger clouds are layered in front of smaller ones
            zIndex: Math.floor(cloud.size * 10) 
          }}
        >
          <Image 
            src={cloud.src} 
            alt={`Flying Cloud ${cloud.id}`} 
            fill 
            sizes="(max-width: 1280px) 100vw, 50vw"
            className="object-contain object-top" 
            priority={cloud.id < 3} // Prioritize loading a few immediately
          />
        </div>
      ))}
    </div>
  );
}
