"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import GlassOrb from "./GlassOrb";
import MetallicOrb from "./MetallicOrb";

export default function HeroTransition() {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const landscapeRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const mountainsRef = useRef<HTMLDivElement>(null);
  const fgRef = useRef<HTMLDivElement>(null);
  const pillRef = useRef<HTMLDivElement>(null);
  const pillContentRef = useRef<HTMLDivElement>(null);
  const verticalBarsRef = useRef<HTMLDivElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);
  const workingHardRef = useRef<HTMLDivElement>(null);
  const fallingLinesRef = useRef<HTMLDivElement>(null);

  // Mouse tracking quickTo refs
  const quickToBgX = useRef<ReturnType<typeof gsap.quickTo> | null>(null);
  const quickToBgY = useRef<ReturnType<typeof gsap.quickTo> | null>(null);
  const quickToFgX = useRef<ReturnType<typeof gsap.quickTo> | null>(null);
  const quickToFgY = useRef<ReturnType<typeof gsap.quickTo> | null>(null);

  useGSAP(
    () => {
      if (!containerRef.current) return;

      const sections = gsap.utils.toArray<HTMLElement>("[data-section]");

      // Pin the entire container for the scroll sequence
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "+=300%",
        pin: true,
        scrub: 1,
      });

      // Master timeline for the hero transition
      const masterTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=300%",
          scrub: 1,
        },
      });

      // Phase 1: Initial parallax (0% - 10%)
      if (bgRef.current && mountainsRef.current && fgRef.current) {
        masterTl.to(
          bgRef.current,
          { yPercent: 10, scale: 1.05, duration: 0.1 },
          0
        );
        masterTl.to(
          mountainsRef.current,
          { yPercent: 5, duration: 0.1 },
          0
        );
        masterTl.to(
          fgRef.current,
          { yPercent: -5, scale: 1.1, duration: 0.1 },
          0
        );
      }

      // Phase 2: Vertical bars appear (10% - 25%)
      if (verticalBarsRef.current) {
        const bars = verticalBarsRef.current.querySelectorAll("[data-bar]");
        masterTl.fromTo(
          bars,
          { scaleY: 0 },
          { scaleY: 1, duration: 0.15, stagger: 0.02, ease: "power2.out" },
          0.1
        );
      }

      // Phase 3: Pill emerges and grows (25% - 50%)
      if (pillRef.current) {
        masterTl.fromTo(
          pillRef.current,
          { scale: 0, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.25, ease: "power3.out" },
          0.25
        );
      }

      // Phase 4: Landscape zooms into pill (50% - 70%)
      if (landscapeRef.current && pillRef.current) {
        masterTl.to(
          landscapeRef.current,
          {
            scale: 0.4,
            duration: 0.2,
            ease: "power2.inOut",
          },
          0.5
        );

        // Pill grows to dominate
        masterTl.to(
          pillRef.current,
          {
            scale: 1.5,
            duration: 0.2,
            ease: "power2.inOut",
          },
          0.5
        );
      }

      // Phase 5: Hero content fades out (50% - 60%)
      if (heroContentRef.current) {
        masterTl.to(
          heroContentRef.current,
          { opacity: 0, y: -50, duration: 0.1 },
          0.5
        );
      }

      // Phase 6: Transition to Working Hard (70% - 85%)
      if (heroRef.current && workingHardRef.current) {
        masterTl.to(
          heroRef.current,
          { opacity: 0, duration: 0.15 },
          0.7
        );
        masterTl.fromTo(
          workingHardRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.15 },
          0.7
        );
      }

      // Phase 7: Falling lines animation (75% - 90%)
      if (fallingLinesRef.current) {
        const lines = fallingLinesRef.current.querySelectorAll("[data-line]");
        masterTl.fromTo(
          lines,
          { y: "-100%", opacity: 0 },
          {
            y: "100vh",
            opacity: 1,
            duration: 0.3,
            stagger: 0.02,
            ease: "none",
          },
          0.75
        );
      }

      // Phase 8: Text reveal (85% - 100%)
      const headingWords = workingHardRef.current?.querySelectorAll("[data-word]");
      if (headingWords) {
        masterTl.fromTo(
          headingWords,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.15, stagger: 0.02 },
          0.85
        );
      }
    },
    { scope: containerRef }
  );

  // Mouse tracking parallax
  useEffect(() => {
    if (!bgRef.current || !fgRef.current) return;

    quickToBgX.current = gsap.quickTo(bgRef.current, "xPercent", {
      duration: 0.8,
    });
    quickToBgY.current = gsap.quickTo(bgRef.current, "yPercent", {
      duration: 0.8,
    });
    quickToFgX.current = gsap.quickTo(fgRef.current, "xPercent", {
      duration: 0.8,
    });
    quickToFgY.current = gsap.quickTo(fgRef.current, "yPercent", {
      duration: 0.8,
    });

    const handleMouseMove = (e: MouseEvent) => {
      const normalizedX = (e.clientX / window.innerWidth - 0.5) * 2;
      const normalizedY = (e.clientY / window.innerHeight - 0.5) * 2;

      quickToBgX.current?.(normalizedX * 2.5);
      quickToBgY.current?.(normalizedY * 2.5);
      quickToFgX.current?.(normalizedX * 5);
      quickToFgY.current?.(normalizedY * 5);
    };

    window.addEventListener("mousemove", handleMouseMove);
    gsap.set([bgRef.current, fgRef.current], { scale: 1.1 });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  // Split text into words for animation
  const splitIntoWords = (text: string, highlightWords: string[] = []) => {
    return text.split(" ").map((word, i) => {
      const isHighlight = highlightWords.some((hw) =>
        word.toLowerCase().includes(hw.toLowerCase())
      );
      return (
        <span
          key={i}
          data-word
          className={`inline-block mr-[0.3em] ${
            isHighlight ? "text-[var(--teal)]" : ""
          }`}
        >
          {word}
        </span>
      );
    });
  };

  return (
    <div ref={containerRef} className="relative h-screen overflow-hidden">
      {/* Hero Section */}
      <div
        ref={heroRef}
        data-section
        className="absolute inset-0 w-full h-full"
      >
        {/* Landscape layers */}
        <div ref={landscapeRef} className="absolute inset-0 will-change-transform">
          {/* Background layer */}
          <div
            ref={bgRef}
            className="absolute inset-0 will-change-transform"
            style={{ transformOrigin: "center center" }}
          >
            <Image
              src="/images/Background.png"
              alt="Background sky"
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
          </div>

          {/* Mountains layer */}
          <div
            ref={mountainsRef}
            className="absolute inset-0 will-change-transform"
          >
            <Image
              src="/images/Mountains.png"
              alt="Mountains"
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
          </div>

          {/* Foreground layer */}
          <div
            ref={fgRef}
            className="absolute inset-0 will-change-transform"
            style={{ transformOrigin: "center center" }}
          >
            <Image
              src="/images/Foreground.png"
              alt="Foreground"
              fill
              className="object-cover object-bottom"
              priority
              sizes="100vw"
            />
          </div>
        </div>

        {/* Glass orbs (initial state) */}
        <GlassOrb size={120} left="15vw" top="20vh" blur={12} zIndex={5} />
        <GlassOrb size={180} left="45vw" top="15vh" blur={12} zIndex={4} />
        <GlassOrb size={90} right="20vw" top="25vh" blur={12} zIndex={5} />

        {/* Vertical bars overlay */}
        <div
          ref={verticalBarsRef}
          className="absolute inset-0 flex justify-center gap-[2vw] pointer-events-none z-20"
        >
          <div
            data-bar
            className="w-[30vw] h-full bg-[var(--black1)] origin-top"
            style={{ transform: "scaleY(0)" }}
          />
          <div
            data-bar
            className="w-[30vw] h-full bg-[var(--black1)] origin-top"
            style={{ transform: "scaleY(0)" }}
          />
        </div>

        {/* Pill mask */}
        <div
          ref={pillRef}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-30 opacity-0"
          style={{ transform: "translate(-50%, -50%) scale(0)" }}
        >
          <div className="relative w-[300px] h-[500px] bg-[var(--black1)] rounded-full overflow-hidden">
            {/* Inner landscape (clipped) */}
            <div
              ref={pillContentRef}
              className="absolute inset-0 overflow-hidden"
            >
              <div className="absolute inset-[-50%] w-[200%] h-[200%]">
                <Image
                  src="/images/Background.png"
                  alt=""
                  fill
                  className="object-cover"
                  sizes="100vw"
                />
              </div>
            </div>
            {/* Metallic orb inside pill */}
            <div className="absolute bottom-[20%] left-1/2 -translate-x-1/2">
              <MetallicOrb size={80} />
            </div>
          </div>
        </div>

        {/* Hero content */}
        <div
          ref={heroContentRef}
          className="absolute bottom-0 left-0 right-0 p-8 pb-16 z-40"
        >
          <div className="max-w-[1600px] mx-auto grid grid-cols-3 items-end">
            {/* Left: description */}
            <div>
              <p className="text-[16px] leading-[20px] text-[var(--white1)] max-w-[321px]">
                Micro is an all-in-one tool for email, CRM, project management
                and more that automatically organizes itself.
              </p>
              <Link
                href="#waitlist"
                className="inline-flex items-center gap-2 bg-[var(--white2)] text-[var(--black2)] px-[38px] py-[22px] rounded-full text-[15px] font-medium mt-10 hover:opacity-90 transition-opacity"
              >
                Join the Waitlist
                <Image
                  src="/images/arrow.f400b257.svg"
                  alt=""
                  width={8}
                  height={8}
                  className="opacity-50"
                />
              </Link>
            </div>

            {/* Center: headline */}
            <div className="text-center">
              <h1 className="font-[family-name:var(--font-playfair)] text-[148px] leading-[100%] tracking-[-0.05em] text-[var(--white1)]">
                Organized.
              </h1>
            </div>

            {/* Right: subtitle */}
            <div className="text-right">
              <h2 className="font-[family-name:var(--font-playfair)] text-[31px] leading-[36px] text-[var(--white1)]">
                So you don&apos;t
                <br />
                have to be.
              </h2>
            </div>
          </div>
        </div>
      </div>

      {/* Working Hard Section */}
      <div
        ref={workingHardRef}
        data-section
        className="absolute inset-0 w-full h-full bg-[var(--black1)] opacity-0"
      >
        {/* Falling lines */}
        <div
          ref={fallingLinesRef}
          className="absolute inset-0 pointer-events-none overflow-hidden"
        >
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              data-line
              className="absolute w-[1px] h-[100px] bg-gradient-to-b from-transparent via-[var(--white5)] to-transparent"
              style={{
                left: `${5 + i * 5}%`,
                top: 0,
                opacity: 0,
              }}
            />
          ))}
        </div>

        {/* Metallic orbs */}
        <MetallicOrb size={180} left="5vw" top="20vh" delay={0} />
        <MetallicOrb size={120} right="10vw" top="15vh" delay={0.3} />
        <MetallicOrb size={200} left="20vw" bottom="10vh" delay={0.6} />
        <MetallicOrb size={100} right="25vw" bottom="30vh" delay={0.9} />

        {/* Text content */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="max-w-[653px] text-center px-8">
            <h2 className="font-[family-name:var(--font-playfair)] text-[72px] leading-[100%] tracking-[-0.05em] text-[var(--white1)] mb-[46px]">
              {splitIntoWords("Working hard just got easy")}
            </h2>
            <h3 className="text-[44px] leading-[52px] tracking-[-0.05em] text-[var(--white1)] mb-[66px]">
              {splitIntoWords(
                "The era of Brute Force Productivity™ is over and a new one has begun."
              )}
            </h3>
            <div className="text-[19px] leading-[32px] tracking-[-0.05em] text-[var(--white1)] max-w-[503px] mx-auto text-left">
              <p>
                {splitIntoWords(
                  "Where everything is centralized - one place to catch up on all your messages, check in on a project or prep for a meeting with a customer or investor.",
                  ["messages", "project"]
                )}
              </p>
              <p className="mt-4">
                {splitIntoWords(
                  "Where your work is done for you - CRM records are updated, emails are triaged and documents are drafted automatically.",
                  ["CRM", "emails", "documents"]
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
