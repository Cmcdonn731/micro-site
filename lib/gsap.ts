import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

// Default easing functions used by micro.so
export const easings = {
  // Linear-ish
  power1In: "power1.in",
  power1InOut: "power1.inOut",
  // Moderate acceleration
  power2In: "power2.in",
  power2InOut: "power2.inOut",
  // Strong acceleration
  power3In: "power3.in",
  power3InOut: "power3.inOut",
  // Fast entry, slow exit
  power4Out: "power4.out",
  // Smooth wave (for orbs)
  sineInOut: "sine.inOut",
  // Elastic bounce (for UI elements)
  elasticOut: "elastic.out(0.9, 0.3)",
  elasticIn: "elastic.in(0.5, 0.5)",
  // Linear
  linear: "linear",
} as const;

// Default durations used by micro.so
export const durations = {
  instant: 0.001,
  characterStagger: 0.1,
  fast: 0.2,
  normal: 0.5,
  slow: 0.8,
  section: 1.5,
  large: 1.7,
  extraLarge: 2.25,
  orbMin: 3,
  orbMax: 8,
  loopDelay: 10,
} as const;

// Utility to create random duration for floating animations
export function randomDuration(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

// Utility to create random offset for floating animations
export function randomOffset(range: number): number {
  return (Math.random() - 0.5) * 2 * range;
}

// QuickTo factory for mouse tracking
export function createQuickTo(
  target: gsap.TweenTarget,
  property: string,
  duration = 0.8
) {
  return gsap.quickTo(target, property, { duration });
}

// ScrollTrigger defaults matching micro.so
export const scrollTriggerDefaults = {
  scrub: 1, // 1-second lag for smooth scroll-linked animations
  start: "top top",
  end: "bottom bottom",
} as const;

// Create a pinned scroll section
export function createPinnedSection(
  trigger: Element,
  animation: gsap.core.Timeline,
  options?: ScrollTrigger.Vars
) {
  return ScrollTrigger.create({
    trigger,
    pin: true,
    pinType: "transform",
    scrub: 1,
    ...options,
    animation,
  });
}

// Stagger animation utility
export function staggerReveal(
  targets: gsap.TweenTarget,
  options?: {
    y?: number;
    opacity?: number;
    duration?: number;
    stagger?: number;
    ease?: string;
  }
) {
  const {
    y = 40,
    opacity = 0,
    duration = durations.fast,
    stagger = 0.05,
    ease = easings.power3InOut,
  } = options || {};

  return gsap.from(targets, {
    y,
    opacity,
    duration,
    stagger,
    ease,
  });
}

// Export gsap and ScrollTrigger for direct use
export { gsap, ScrollTrigger, useGSAP };
