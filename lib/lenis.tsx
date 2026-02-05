"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";
import Lenis from "lenis";
import { gsap } from "./gsap";

// Lenis context for accessing the instance anywhere
const LenisContext = createContext<Lenis | null>(null);

export function useLenis() {
  return useContext(LenisContext);
}

interface LenisProviderProps {
  children: React.ReactNode;
  options?: ConstructorParameters<typeof Lenis>[0];
}

export function LenisProvider({ children, options }: LenisProviderProps) {
  const [lenis, setLenis] = useState<Lenis | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    // Create Lenis instance with micro.so-like settings
    const lenisInstance = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Smooth easing
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
      ...options,
    });

    setLenis(lenisInstance);

    // Sync Lenis with GSAP ScrollTrigger
    lenisInstance.on("scroll", () => {
      // Update ScrollTrigger on each Lenis scroll event
      if (typeof window !== "undefined" && window.ScrollTrigger) {
        window.ScrollTrigger.update();
      }
    });

    // Animation frame loop
    function raf(time: number) {
      lenisInstance.raf(time);
      rafRef.current = requestAnimationFrame(raf);
    }
    rafRef.current = requestAnimationFrame(raf);

    // Also connect to GSAP ticker for perfect sync
    gsap.ticker.add((time) => {
      lenisInstance.raf(time * 1000);
    });

    // Add lenis class to html element (like original)
    document.documentElement.classList.add("lenis");

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      gsap.ticker.remove((time) => {
        lenisInstance.raf(time * 1000);
      });
      lenisInstance.destroy();
      document.documentElement.classList.remove("lenis");
    };
  }, [options]);

  return (
    <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>
  );
}

// Extend window type for ScrollTrigger
declare global {
  interface Window {
    ScrollTrigger?: typeof import("gsap/ScrollTrigger").ScrollTrigger;
  }
}
