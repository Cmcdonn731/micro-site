"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import GlassOrb from "./GlassOrb";

export default function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const mountainsRef = useRef<HTMLDivElement>(null);
  const fgRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const desktopRef = useRef<HTMLDivElement>(null);

  // Mouse tracking quickTo refs
  const quickToBgX = useRef<ReturnType<typeof gsap.quickTo> | null>(null);
  const quickToBgY = useRef<ReturnType<typeof gsap.quickTo> | null>(null);
  const quickToFgX = useRef<ReturnType<typeof gsap.quickTo> | null>(null);
  const quickToFgY = useRef<ReturnType<typeof gsap.quickTo> | null>(null);

  // GSAP animations with ScrollTrigger
  useGSAP(
    () => {
      if (!sectionRef.current) return;

      // Create scroll-driven parallax for the layers
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });

      // Background moves slowest
      if (bgRef.current) {
        tl.to(
          bgRef.current,
          {
            yPercent: 30,
            scale: 1.1,
            ease: "none",
          },
          0
        );
      }

      // Mountains move medium speed
      if (mountainsRef.current) {
        tl.to(
          mountainsRef.current,
          {
            yPercent: 15,
            ease: "none",
          },
          0
        );
      }

      // Foreground moves fastest (creates depth)
      if (fgRef.current) {
        tl.to(
          fgRef.current,
          {
            yPercent: -10,
            scale: 1.3,
            ease: "none",
          },
          0
        );
      }

      // Desktop screenshot rises into view
      if (desktopRef.current) {
        tl.fromTo(
          desktopRef.current,
          { yPercent: 20, z: 0 },
          { yPercent: 0, z: 80, ease: "power2.out" },
          0
        );
      }

      // Content fades and moves on scroll
      if (contentRef.current) {
        tl.to(
          contentRef.current,
          {
            yPercent: -50,
            opacity: 0,
            ease: "power1.in",
          },
          0
        );
      }
    },
    { scope: sectionRef }
  );

  // Mouse tracking parallax
  useEffect(() => {
    if (!bgRef.current || !fgRef.current) return;

    // Create quickTo functions for smooth mouse following
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
      // Check for disable-move class
      let target = e.target as HTMLElement | null;
      while (target) {
        if (target.classList?.contains("disable-move")) return;
        target = target.parentElement;
      }

      // Normalize mouse position to -1 to 1
      const normalizedX = (e.clientX / window.innerWidth - 0.5) * 2;
      const normalizedY = (e.clientY / window.innerHeight - 0.5) * 2;

      // Background: ±2.5x movement (subtle)
      quickToBgX.current?.(normalizedX * 2.5);
      quickToBgY.current?.(normalizedY * 2.5 - 2.5);

      // Foreground: ±5x movement (more dramatic)
      quickToFgX.current?.(normalizedX * 5);
      quickToFgY.current?.(normalizedY * 5 + 5);
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Initial scale for interaction feel
    gsap.set([bgRef.current, fgRef.current], { scale: 1.1 });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden isolate"
      style={{ height: "calc(100vh - 83px)" }}
    >
      {/* Parallax background layer */}
      <div
        ref={bgRef}
        className="absolute inset-0 will-change-transform"
        style={{ transformOrigin: "top center" }}
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

      {/* Mountains middle layer */}
      <div ref={mountainsRef} className="absolute inset-0 will-change-transform">
        <Image
          src="/images/Mountains.png"
          alt="Mountains"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
      </div>

      {/* Parallax foreground layer */}
      <div
        ref={fgRef}
        className="absolute inset-0 will-change-transform"
        style={{ transformOrigin: "bottom center" }}
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

      {/* Floating glass orbs */}
      <GlassOrb size={120} left="20vw" top="30vh" blur={12} zIndex={5} />
      <GlassOrb size={180} left="50vw" top="40vh" blur={12} zIndex={4} />
      <GlassOrb size={70} right="15vw" top="25vh" blur={12} zIndex={5} />
      <GlassOrb size={100} left="10vw" top="60vh" blur={10} variant="dark" zIndex={3} />
      <GlassOrb size={150} right="25vw" top="55vh" blur={14} zIndex={4} />

      {/* Desktop screenshot */}
      <div
        ref={desktopRef}
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[min(100%,1440px)] will-change-transform"
        style={{ perspective: "100px" }}
      >
        <div className="relative w-full aspect-[1600/880]">
          <Image
            src="/images/desktop-background.png"
            alt="Micro desktop application"
            fill
            className="object-cover object-center rounded-t-[19px]"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[var(--black1)]" />
        </div>
      </div>

      {/* Content overlay */}
      <div
        ref={contentRef}
        className="absolute bottom-0 left-0 right-0 p-8 pb-16 z-10"
      >
        <div className="max-w-[1600px] mx-auto grid grid-cols-3 items-end">
          {/* Left: description */}
          <div>
            <p className="text-[16px] leading-[20px] text-[var(--white1)] max-w-[321px]">
              Micro is an all-in-one tool for email, CRM, project management and
              more that automatically organizes itself.
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
    </section>
  );
}
