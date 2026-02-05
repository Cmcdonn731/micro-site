"use client";

import { useState, useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

const marqueeWords = [
  "AI-Powered",
  "All-In-One Tool",
  "Automatically",
  "Organizes Itself",
];

export default function LoadingScreen() {
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const digit1Ref = useRef<HTMLDivElement>(null);
  const digit2Ref = useRef<HTMLDivElement>(null);
  const digit3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const duration = 2; // 2 seconds loading
    const digitHeight = 80; // Height of each digit

    // Create master timeline
    const tl = gsap.timeline({
      onComplete: () => {
        // Exit animation
        gsap.to(containerRef.current, {
          yPercent: -110,
          duration: 1.5,
          ease: "power2.inOut",
          onComplete: () => setVisible(false),
        });
      },
    });

    // Progress bar animation
    if (progressBarRef.current) {
      tl.fromTo(
        progressBarRef.current,
        { scaleX: 0 },
        { scaleX: 1, duration, ease: "power1.inOut" },
        0
      );
    }

    // Digit animations - flip through numbers
    // First digit (0-1 for 100)
    if (digit1Ref.current) {
      const digits = digit1Ref.current.children;
      tl.to(
        digit1Ref.current,
        {
          y: -digitHeight, // Move to show "1"
          duration: duration * 0.9,
          ease: "power2.inOut",
        },
        duration * 0.1
      );
    }

    // Second digit (0-9, then 0)
    if (digit2Ref.current) {
      tl.to(
        digit2Ref.current,
        {
          y: -digitHeight * 10, // Scroll through all digits
          duration: duration * 0.9,
          ease: "power1.inOut",
        },
        0
      );
    }

    // Third digit (0-9 multiple times, ends on 0)
    if (digit3Ref.current) {
      tl.to(
        digit3Ref.current,
        {
          y: -digitHeight * 20, // Scroll through digits twice
          duration: duration * 0.95,
          ease: "power1.in",
        },
        0
      );
    }

    // Update progress state for any additional UI
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 2;
      });
    }, duration * 10);

    return () => {
      clearInterval(progressInterval);
      tl.kill();
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[1000] flex flex-col items-center justify-center bg-[var(--black2)] overflow-hidden"
    >
      {/* Scrolling marquee background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-[60px] opacity-[0.08]">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="whitespace-nowrap text-[8vw] font-bold uppercase text-[var(--white1)] font-[family-name:var(--font-space-mono)]"
              style={{
                animation: `marquee-scroll 10s ${i * 0.8}s infinite linear both`,
              }}
            >
              {marqueeWords[i % marqueeWords.length]}
            </div>
          ))}
        </div>
      </div>

      {/* Percentage counter with digit flip */}
      <div className="relative z-10 flex items-end font-[family-name:var(--font-outfit)] h-[80px] overflow-hidden">
        {/* First digit (hundreds place - 0 or 1) */}
        <div className="h-[80px] overflow-hidden">
          <div
            ref={digit1Ref}
            className="flex flex-col"
            style={{ transform: "translateY(0)" }}
          >
            <span className="text-[80px] font-medium text-[var(--white1)] leading-[80px] tabular-nums">
              0
            </span>
            <span className="text-[80px] font-medium text-[var(--white1)] leading-[80px] tabular-nums">
              1
            </span>
          </div>
        </div>

        {/* Second digit (tens place - 0-9, then 0) */}
        <div className="h-[80px] overflow-hidden">
          <div
            ref={digit2Ref}
            className="flex flex-col"
            style={{ transform: "translateY(0)" }}
          >
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((d, i) => (
              <span
                key={i}
                className="text-[80px] font-medium text-[var(--white1)] leading-[80px] tabular-nums"
              >
                {d}
              </span>
            ))}
          </div>
        </div>

        {/* Third digit (ones place - cycles through 0-9) */}
        <div className="h-[80px] overflow-hidden">
          <div
            ref={digit3Ref}
            className="flex flex-col"
            style={{ transform: "translateY(0)" }}
          >
            {[...Array(21)].map((_, i) => (
              <span
                key={i}
                className="text-[80px] font-medium text-[var(--white1)] leading-[80px] tabular-nums"
              >
                {i % 10}
              </span>
            ))}
          </div>
        </div>

        {/* Percent sign */}
        <span className="text-[40px] font-medium text-[var(--white1)] ml-1 mb-2">
          %
        </span>
      </div>

      {/* Progress bar */}
      <div className="absolute bottom-[45%] left-1/2 -translate-x-1/2 w-[400px] h-[1.5px] bg-[var(--white5)] overflow-hidden">
        <div
          ref={progressBarRef}
          className="h-full bg-[var(--white1)] origin-left"
          style={{ transform: "scaleX(0)" }}
        />
      </div>
    </div>
  );
}
