"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger, easings, durations } from "@/lib/gsap";

interface UseScrollRevealOptions {
  /** Starting Y offset (default: 40) */
  y?: number;
  /** Starting opacity (default: 0) */
  opacity?: number;
  /** Animation duration (default: 0.5) */
  duration?: number;
  /** Stagger delay between children (default: 0.05) */
  stagger?: number;
  /** Easing function (default: power3.inOut) */
  ease?: string;
  /** ScrollTrigger start position (default: "top 80%") */
  start?: string;
  /** Whether to animate children or the element itself */
  animateChildren?: boolean;
  /** Child selector if animating children */
  childSelector?: string;
}

/**
 * Hook for scroll-triggered reveal animations
 */
export function useScrollReveal<T extends HTMLElement = HTMLDivElement>(
  options: UseScrollRevealOptions = {}
) {
  const {
    y = 40,
    opacity = 0,
    duration = durations.normal,
    stagger = 0.05,
    ease = easings.power3InOut,
    start = "top 80%",
    animateChildren = false,
    childSelector = "> *",
  } = options;

  const ref = useRef<T>(null);

  useEffect(() => {
    if (!ref.current) return;

    const targets = animateChildren
      ? ref.current.querySelectorAll(childSelector)
      : ref.current;

    const ctx = gsap.context(() => {
      gsap.from(targets, {
        y,
        opacity,
        duration,
        stagger: animateChildren ? stagger : 0,
        ease,
        scrollTrigger: {
          trigger: ref.current,
          start,
          toggleActions: "play none none reverse",
        },
      });
    }, ref);

    return () => ctx.revert();
  }, [y, opacity, duration, stagger, ease, start, animateChildren, childSelector]);

  return ref;
}

interface UseScrollPinOptions {
  /** End trigger element or selector */
  endTrigger?: string | Element;
  /** ScrollTrigger start position (default: "top top") */
  start?: string;
  /** ScrollTrigger end position (default: "bottom bottom") */
  end?: string;
  /** Scrub value for smooth scrolling (default: 1) */
  scrub?: boolean | number;
}

/**
 * Hook for pinned scroll sections like micro.so hero
 */
export function useScrollPin<T extends HTMLElement = HTMLDivElement>(
  options: UseScrollPinOptions = {}
) {
  const { endTrigger, start = "top top", end = "bottom bottom", scrub = 1 } = options;

  const ref = useRef<T>(null);
  const triggerRef = useRef<ScrollTrigger | null>(null);

  useEffect(() => {
    if (!ref.current) return;

    triggerRef.current = ScrollTrigger.create({
      trigger: ref.current,
      endTrigger: endTrigger || undefined,
      start,
      end,
      pin: true,
      pinType: "transform",
      scrub,
    });

    return () => {
      triggerRef.current?.kill();
    };
  }, [endTrigger, start, end, scrub]);

  return ref;
}

interface UseParallaxScrollOptions {
  /** Y movement range as percentage (default: 30) */
  yPercent?: number;
  /** Scale range [from, to] (default: [1, 1.2]) */
  scale?: [number, number];
  /** Opacity range [from, to] (default: [1, 1]) */
  opacity?: [number, number];
  /** ScrollTrigger start (default: "top bottom") */
  start?: string;
  /** ScrollTrigger end (default: "bottom top") */
  end?: string;
  /** Scrub value (default: true) */
  scrub?: boolean | number;
}

/**
 * Hook for scroll-driven parallax movement
 */
export function useParallaxScroll<T extends HTMLElement = HTMLDivElement>(
  options: UseParallaxScrollOptions = {}
) {
  const {
    yPercent = 30,
    scale = [1, 1],
    opacity = [1, 1],
    start = "top bottom",
    end = "bottom top",
    scrub = true,
  } = options;

  const ref = useRef<T>(null);

  useEffect(() => {
    if (!ref.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ref.current,
        {
          yPercent: 0,
          scale: scale[0],
          opacity: opacity[0],
        },
        {
          yPercent,
          scale: scale[1],
          opacity: opacity[1],
          ease: "none",
          scrollTrigger: {
            trigger: ref.current,
            start,
            end,
            scrub,
          },
        }
      );
    }, ref);

    return () => ctx.revert();
  }, [yPercent, scale, opacity, start, end, scrub]);

  return ref;
}
