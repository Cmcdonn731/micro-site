"use client";

import { useEffect, useRef } from "react";
import { gsap, createQuickTo } from "@/lib/gsap";

interface UseMouseParallaxOptions {
  /** Multiplier for x movement (default: 2.5 for background, 5 for foreground) */
  intensityX?: number;
  /** Multiplier for y movement (default: 2.5 for background, 5 for foreground) */
  intensityY?: number;
  /** Y offset to add (default: 0) */
  offsetY?: number;
  /** Duration of the quickTo animation (default: 0.8) */
  duration?: number;
  /** Whether to disable when parent has .disable-move class */
  respectDisableMove?: boolean;
}

/**
 * Hook for mouse-tracking parallax effect like micro.so hero
 *
 * Usage:
 * ```tsx
 * const ref = useMouseParallax({ intensityX: 2.5, intensityY: 2.5 });
 * return <div ref={ref}>...</div>
 * ```
 */
export function useMouseParallax<T extends HTMLElement = HTMLDivElement>(
  options: UseMouseParallaxOptions = {}
) {
  const {
    intensityX = 2.5,
    intensityY = 2.5,
    offsetY = 0,
    duration = 0.8,
    respectDisableMove = true,
  } = options;

  const ref = useRef<T>(null);
  const quickToXRef = useRef<ReturnType<typeof gsap.quickTo> | null>(null);
  const quickToYRef = useRef<ReturnType<typeof gsap.quickTo> | null>(null);

  useEffect(() => {
    if (!ref.current) return;

    // Create quickTo functions for smooth animation
    quickToXRef.current = gsap.quickTo(ref.current, "xPercent", { duration });
    quickToYRef.current = gsap.quickTo(ref.current, "yPercent", { duration });

    const handleMouseMove = (e: MouseEvent) => {
      // Check for disable-move class on ancestors
      if (respectDisableMove) {
        let target = e.target as HTMLElement | null;
        while (target) {
          if (target.classList?.contains("disable-move")) return;
          target = target.parentElement;
        }
      }

      // Normalize mouse position to -1 to 1
      const normalizedX = (e.clientX / window.innerWidth - 0.5) * 2;
      const normalizedY = (e.clientY / window.innerHeight - 0.5) * 2;

      // Apply transforms with intensity multipliers
      quickToXRef.current?.(normalizedX * intensityX);
      quickToYRef.current?.(normalizedY * intensityY + offsetY);
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [intensityX, intensityY, offsetY, duration, respectDisableMove]);

  return ref;
}

/**
 * Hook for combined background + foreground parallax (like micro.so hero)
 */
export function useHeroParallax() {
  const bgRef = useMouseParallax<HTMLDivElement>({
    intensityX: 2.5,
    intensityY: 2.5,
    offsetY: -2.5,
  });

  const fgRef = useMouseParallax<HTMLDivElement>({
    intensityX: 5,
    intensityY: 5,
    offsetY: 5,
  });

  return { bgRef, fgRef };
}
