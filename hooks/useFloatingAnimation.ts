"use client";

import { useEffect, useRef } from "react";
import { gsap, easings, randomDuration, randomOffset } from "@/lib/gsap";

interface UseFloatingAnimationOptions {
  /** Size of the element for calculating movement range */
  size?: number;
  /** Minimum duration for one float cycle (default: 3) */
  minDuration?: number;
  /** Maximum duration for one float cycle (default: 8) */
  maxDuration?: number;
  /** Whether animation is enabled (default: true) */
  enabled?: boolean;
}

/**
 * Hook for floating animation like micro.so glass orbs
 *
 * Movement ranges are calculated based on size:
 * - X range: ±(0.25 * size + 50)
 * - Y range: ±(0.5 * size + 100)
 *
 * Uses sine.inOut easing with random 3-8s duration per axis
 */
export function useFloatingAnimation<T extends HTMLElement = HTMLDivElement>(
  options: UseFloatingAnimationOptions = {}
) {
  const { size = 100, minDuration = 3, maxDuration = 8, enabled = true } = options;

  const ref = useRef<T>(null);
  const tweenXRef = useRef<gsap.core.Tween | null>(null);
  const tweenYRef = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    if (!ref.current || !enabled) return;

    const element = ref.current;

    // Calculate movement ranges based on size (from micro.so)
    const rangeX = 0.25 * size + 50;
    const rangeY = 0.5 * size + 100;

    // Recursive animation functions for continuous random movement
    const animateX = () => {
      const targetX = randomOffset(rangeX);
      const duration = randomDuration(minDuration, maxDuration);

      tweenXRef.current = gsap.to(element, {
        x: targetX,
        duration,
        ease: easings.sineInOut,
        onComplete: animateX,
      });
    };

    const animateY = () => {
      const targetY = randomOffset(rangeY);
      const duration = randomDuration(minDuration + 1, maxDuration);

      tweenYRef.current = gsap.to(element, {
        y: targetY,
        duration,
        ease: easings.sineInOut,
        onComplete: animateY,
      });
    };

    // Start both animations
    animateX();
    animateY();

    return () => {
      tweenXRef.current?.kill();
      tweenYRef.current?.kill();
    };
  }, [size, minDuration, maxDuration, enabled]);

  return ref;
}
