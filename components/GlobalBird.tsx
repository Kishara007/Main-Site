"use client";

import { Canvas, useThree } from "@react-three/fiber";
import { Suspense, useEffect, useState } from "react";
import Phoenix from "@/components/3d/Phoenix";
import { OrbitControls } from "@react-three/drei";

// Mobile framerate limiter to prevent battery drain
function MobileFpsLimiter({ isMobile }: { isMobile: boolean }) {
  const set = useThree((state) => state.set);
  const advance = useThree((state) => state.advance);

  useEffect(() => {
    if (!isMobile) {
      set({ frameloop: "always" });
      return;
    }
    
    // Limit to 30fps on mobile
    set({ frameloop: "never" });
    let frameId: number;
    let lastTime = performance.now();
    const interval = 1000 / 30; // 30 FPS target

    const render = (time: number) => {
      frameId = requestAnimationFrame(render);
      const delta = time - lastTime;
      if (delta >= interval) {
        lastTime = time - (delta % interval);
        advance(time);
      }
    };
    
    frameId = requestAnimationFrame(render);
    return () => {
      cancelAnimationFrame(frameId);
      set({ frameloop: "always" });
    };
  }, [isMobile, set, advance]);

  return null;
}

export default function GlobalBird() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile(); // Initial check
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    // Added a strong drop-shadow to the canvas so the bird stands out perfectly against any bright sky
    <div className="fixed inset-0 z-0 pointer-events-none drop-shadow-[0_15px_25px_rgba(0,0,0,0.6)]">
      {/* 1. Cap the pixel ratio and limit max frame rate on mobile */}
      <Canvas 
        camera={{ position: [0, 0, 14], fov: 45 }}
        dpr={isMobile ? [1, 1.5] : [1, 2]}
        shadows={!isMobile} // 2. Disable heavy post-processing effects (like complex shadows) if under 768px
        gl={{ powerPreference: "high-performance", antialias: !isMobile }}
      >
        <MobileFpsLimiter isMobile={isMobile} />
        
        <ambientLight intensity={1.5} />
        <directionalLight position={[10, 10, 5]} intensity={2} color="#f9fafb" castShadow={!isMobile} />
        <directionalLight position={[-10, -10, -5]} intensity={1} color="#e0f2fe" />
        
        <Suspense fallback={null}>
          {/* Increased base scale from 0.012 to 0.016 so it's clearly visible */}
          <Phoenix position={[-3, -1, 0]} scale={0.016} rotation={[0.2, 0.5, 0]} />
        </Suspense>

        {/* 3. Crucial: Disable touch-based orbit controls on mobile, let it auto-rotate slowly instead */}
        <OrbitControls 
          enableZoom={!isMobile} 
          enablePan={!isMobile} 
          enableRotate={!isMobile} 
          autoRotate={isMobile}
          autoRotateSpeed={0.5} 
          makeDefault
        />
      </Canvas>
    </div>
  );
}
