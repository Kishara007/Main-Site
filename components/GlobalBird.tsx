"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect, useState } from "react";
import Phoenix from "@/components/3d/Phoenix";
import { OrbitControls, PerformanceMonitor } from "@react-three/drei";

export default function GlobalBird() {
  const [isMobile, setIsMobile] = useState(false);
  const [dpr, setDpr] = useState<number | [number, number]>([1, 2]);

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      // Initialize DPR correctly based on device
      setDpr(mobile ? [1, 1.5] : [1, 2]);
    };
    checkMobile(); // Initial check
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    // Added a strong drop-shadow to the canvas so the bird stands out perfectly against any bright sky
    <div className="fixed inset-0 z-0 pointer-events-none drop-shadow-[0_15px_25px_rgba(0,0,0,0.6)]">
      {/* 1. Cap the pixel ratio (default dpr={[1, 1.5]} on mobile) */}
      <Canvas 
        camera={{ position: [0, 0, 14], fov: 45 }}
        dpr={dpr as any}
        shadows={!isMobile} // Disable heavy post-processing effects (like complex shadows) if under 768px
        // 2. Disable Anti-aliasing on mobile: gl={{ antialias: false }} if under 768px
        gl={{ powerPreference: "high-performance", antialias: !isMobile }}
      >
        {/* 3. Frameloop optimization: dynamically drop resolution to 1 if phone struggles on mobile */}
        {isMobile && (
          <PerformanceMonitor 
            onDecline={() => setDpr(1)} // Phone struggling, drop to baseline dpr
            onIncline={() => setDpr([1, 1.5])} // Phone recovering, restore capped dpr
          />
        )}
        
        <ambientLight intensity={1.5} />
        <directionalLight position={[10, 10, 5]} intensity={2} color="#f9fafb" castShadow={!isMobile} />
        <directionalLight position={[-10, -10, -5]} intensity={1} color="#e0f2fe" />
        
        <Suspense fallback={null}>
          {/* Increased base scale from 0.012 to 0.016 so it's clearly visible */}
          <Phoenix position={[-3, -1, 0]} scale={0.016} rotation={[0.2, 0.5, 0]} />
        </Suspense>

        {/* Disable touch-based orbit controls on mobile */}
        <OrbitControls 
          enableZoom={!isMobile} 
          enablePan={!isMobile} 
          enableRotate={!isMobile} 
          autoRotate={false}
          autoRotateSpeed={0.5} 
          makeDefault
        />
      </Canvas>
    </div>
  );
}
