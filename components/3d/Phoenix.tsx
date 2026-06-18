"use client";

import { useEffect, useRef, useContext } from "react";
import { useGLTF, useAnimations, Float } from "@react-three/drei";
import { Group, MathUtils } from "three";
import { useFrame } from "@react-three/fiber";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollContext } from "@/app/page";

gsap.registerPlugin(ScrollTrigger);

export default function Phoenix(props: any) {
  const group = useRef<Group>(null);
  const { scene, animations } = useGLTF("/models/phoenix_bird.glb");
  const { actions } = useAnimations(animations, group);
  const scrollTween = useContext(ScrollContext);

  useEffect(() => {
    if (actions) {
      const actionName = Object.keys(actions)[0];
      if (actionName) {
        actions[actionName]?.play();
      }
    }
  }, [actions]);

  // Cleaned up the failing GSAP ScrollTrigger. We will calculate flight path natively in the 3D loop!
  
  const innerGroup = useRef<Group>(null);

  useFrame((state) => {
    // 1. Calculate Flight Progress manually based on the exact page scroll progress
    const globalProgress = (typeof window !== "undefined" ? (window as any).horizontalScrollProgress : 0) || 0;
    
    // Phase 1: Section 1 (Hero) to Section 2 (ProofOfWork) -> globalProgress 0 to 0.2
    let p1 = Math.min(globalProgress / 0.2, 1);
    const ease1 = p1 < 0.5 ? 2 * p1 * p1 : 1 - Math.pow(-2 * p1 + 2, 2) / 2;

    // Phase 2: Section 2 (ProofOfWork) to Section 3 (Services) -> globalProgress 0.2 to 0.4
    let p2 = Math.min(Math.max((globalProgress - 0.2) / 0.2, 0), 1);
    const ease2 = p2 < 0.5 ? 2 * p2 * p2 : 1 - Math.pow(-2 * p2 + 2, 2) / 2;

    // Phase 3: Section 3 (Services) to Section 4 (Process) -> globalProgress 0.4 to 0.6
    let p3 = Math.min(Math.max((globalProgress - 0.4) / 0.2, 0), 1);
    const ease3 = p3 < 0.5 ? 2 * p3 * p3 : 1 - Math.pow(-2 * p3 + 2, 2) / 2;

    // Phase 4: Section 4 (Process) to Section 5 (Pricing) -> globalProgress 0.6 to 0.8
    let p4 = Math.min(Math.max((globalProgress - 0.6) / 0.2, 0), 1);
    const ease4 = p4 < 0.5 ? 2 * p4 * p4 : 1 - Math.pow(-2 * p4 + 2, 2) / 2;

    // Phase 5: Section 5 (Pricing) to Section 6 (Footer) -> globalProgress 0.8 to 1.0
    let p5 = Math.min(Math.max((globalProgress - 0.8) / 0.2, 0), 1);
    const ease5 = p5 < 0.5 ? 2 * p5 * p5 : 1 - Math.pow(-2 * p5 + 2, 2) / 2;

    const isMobile = typeof window !== "undefined" && window.innerWidth < 1280;

    if (group.current) {
      let currentX = -3;
      let currentY = isMobile ? 2.0 : -1; // 1st section: TOP
      let currentScale = 0.012;
      let currentRotY = 0.5;
      let currentRotZ = 0;

      // Apply first flight (Hero -> ProofOfWork)
      if (p1 > 0 && p2 === 0) {
        currentX = gsap.utils.interpolate(-3, isMobile ? 0 : 5, ease1);
        currentY = gsap.utils.interpolate(isMobile ? 2.0 : -1, isMobile ? -2.5 : 1.5, ease1);
        
        if (ease1 <= 0.5) {
          currentScale = gsap.utils.interpolate(0.012, isMobile ? 0.020 : 0.016, ease1 * 2);
        } else {
          currentScale = gsap.utils.interpolate(isMobile ? 0.020 : 0.016, 0.008, (ease1 - 0.5) * 2);
        }
      }

      // Apply second flight (ProofOfWork -> Services)
      if (p2 > 0 && p3 === 0) {
        currentX = gsap.utils.interpolate(isMobile ? 0 : 5, isMobile ? 0 : 3.5, ease2);
        currentY = gsap.utils.interpolate(isMobile ? -2.5 : 1.5, isMobile ? 2.0 : -0.5, ease2); 
        
        if (isMobile) {
          currentScale = ease2 <= 0.5 ? gsap.utils.interpolate(0.008, 0.020, ease2 * 2) : gsap.utils.interpolate(0.020, 0.010, (ease2 - 0.5) * 2);
        } else {
          currentScale = gsap.utils.interpolate(0.008, 0.014, ease2);
        }
      }

      // Apply third flight (Services -> Process)
      if (p3 > 0 && p4 === 0) {
        currentX = gsap.utils.interpolate(isMobile ? 0 : 3.5, isMobile ? -2 : 0, ease3); 
        currentY = gsap.utils.interpolate(isMobile ? 2.0 : -0.5, isMobile ? -2.5 : -3, ease3); 
        
        if (isMobile) {
          currentScale = ease3 <= 0.5 ? gsap.utils.interpolate(0.010, 0.020, ease3 * 2) : gsap.utils.interpolate(0.020, 0.012, (ease3 - 0.5) * 2);
        } else {
          currentScale = gsap.utils.interpolate(0.014, 0.006, ease3);
        }
      }

      // Apply fourth flight (Process -> Pricing)
      if (p4 > 0 && p5 === 0) {
        currentX = gsap.utils.interpolate(isMobile ? -2 : 0, -3.5, ease4); 
        currentY = gsap.utils.interpolate(isMobile ? -2.5 : -3, isMobile ? 2.0 : 1, ease4); 
        currentRotY = gsap.utils.interpolate(0.5, 0.8, ease4);

        if (isMobile) {
          currentScale = ease4 <= 0.5 ? gsap.utils.interpolate(0.012, 0.020, ease4 * 2) : gsap.utils.interpolate(0.020, 0.010, (ease4 - 0.5) * 2);
        } else {
          currentScale = gsap.utils.interpolate(0.006, 0.010, ease4);
        }
      }

      // Apply fifth flight (Pricing -> Footer)
      if (p5 > 0) {
        currentX = gsap.utils.interpolate(-3.5, isMobile ? -3.5 : 3, ease5); 
        currentY = gsap.utils.interpolate(isMobile ? 2.0 : 1, isMobile ? -2.0 : 0, ease5); 
        currentRotY = gsap.utils.interpolate(0.8, 0.2, ease5);
        currentRotZ = gsap.utils.interpolate(0, 0.15, ease5);

        if (isMobile) {
          currentScale = ease5 <= 0.5 ? gsap.utils.interpolate(0.010, 0.020, ease5 * 2) : gsap.utils.interpolate(0.020, 0.012, (ease5 - 0.5) * 2);
        } else {
          currentScale = gsap.utils.interpolate(0.010, 0.012, ease5);
        }
      }

      // Apply multipliers to keep the bird in view on narrow screens
      const xMult = isMobile ? 0.25 : 1;
      const scaleMult = isMobile ? 0.6 : 1;

      // Invert X and Rotation Y on mobile so the bird starts on the right side and faces inward!
      const finalX = isMobile ? -currentX * xMult : currentX * xMult;
      const finalRotY = isMobile ? -currentRotY : currentRotY;

      group.current.position.x = finalX;
      group.current.position.y = currentY;
      group.current.rotation.y = finalRotY;
      group.current.rotation.z = currentRotZ;
      
      const finalScale = currentScale * scaleMult;
      group.current.scale.set(finalScale, finalScale, finalScale);
    }
    
    if (innerGroup.current) {
      // Continuous organic hovering/bobbing effect so the bird never looks frozen mid-air
      innerGroup.current.position.y = Math.sin(state.clock.elapsedTime * 3) * 0.2;
      
      // Continuous subtle zooming in and out effect to simulate normal flying
      const hoverScale = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.08; // 8% smooth scale pulse
      innerGroup.current.scale.set(hoverScale, hoverScale, hoverScale);
    }
  });

  return (
    <group ref={group} {...props} dispose={null}>
      <group ref={innerGroup}>
        <Float
          speed={2} 
          rotationIntensity={0.5} 
          floatIntensity={1} 
        >
          {/* We use primitive to render the loaded GLTF scene */}
          <primitive object={scene} />
        </Float>
      </group>
    </group>
  );
}

useGLTF.preload("/models/phoenix_bird.glb");
