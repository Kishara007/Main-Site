"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import Phoenix from "@/components/3d/Phoenix";

export default function GlobalBird() {
  return (
    // Added a strong drop-shadow to the canvas so the bird stands out perfectly against any bright sky
    <div className="fixed inset-0 z-0 pointer-events-none drop-shadow-[0_15px_25px_rgba(0,0,0,0.6)]">
      <Canvas camera={{ position: [0, 0, 14], fov: 45 }}>
        <ambientLight intensity={1.5} />
        <directionalLight position={[10, 10, 5]} intensity={2} color="#f9fafb" />
        <directionalLight position={[-10, -10, -5]} intensity={1} color="#e0f2fe" />
        <Suspense fallback={null}>
          {/* Increased base scale from 0.012 to 0.016 so it's clearly visible */}
          <Phoenix position={[-3, -1, 0]} scale={0.016} rotation={[0.2, 0.5, 0]} />
        </Suspense>
      </Canvas>
    </div>
  );
}
