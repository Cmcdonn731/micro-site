"use client";

import { useRef, useEffect } from "react";
import { gsap } from "@/lib/gsap";

interface MetallicOrbProps {
  size: number;
  left?: string;
  right?: string;
  top?: string;
  bottom?: string;
  zIndex?: number;
  delay?: number;
  className?: string;
}

export default function MetallicOrb({
  size,
  left,
  right,
  top,
  bottom,
  zIndex = 10,
  delay = 0,
  className = "",
}: MetallicOrbProps) {
  const orbRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!orbRef.current) return;

    // Floating animation
    const floatDuration = 4 + Math.random() * 3;
    const floatY = 15 + Math.random() * 20;

    gsap.to(orbRef.current, {
      y: floatY,
      duration: floatDuration,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
      delay,
    });

    // Subtle rotation
    gsap.to(orbRef.current, {
      rotateZ: 5,
      rotateX: 3,
      duration: floatDuration * 1.3,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
      delay: delay + 0.5,
    });
  }, [delay]);

  return (
    <div
      ref={orbRef}
      className={`absolute will-change-transform ${className}`}
      style={{
        left,
        right,
        top,
        bottom,
        zIndex,
        width: size,
        height: size,
      }}
    >
      <svg
        viewBox="0 0 200 200"
        width={size}
        height={size}
        className="drop-shadow-2xl"
      >
        <defs>
          {/* Main gradient for 3D metallic effect */}
          <radialGradient
            id={`metallic-gradient-${size}`}
            cx="35%"
            cy="25%"
            r="60%"
            fx="30%"
            fy="20%"
          >
            <stop offset="0%" stopColor="#f0f0f0" stopOpacity="1" />
            <stop offset="25%" stopColor="#c0c0c0" stopOpacity="1" />
            <stop offset="50%" stopColor="#808080" stopOpacity="1" />
            <stop offset="75%" stopColor="#505050" stopOpacity="1" />
            <stop offset="100%" stopColor="#202020" stopOpacity="1" />
          </radialGradient>

          {/* Highlight for top-left shine */}
          <radialGradient
            id={`highlight-${size}`}
            cx="30%"
            cy="25%"
            r="30%"
          >
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#ffffff" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </radialGradient>

          {/* Rim light effect */}
          <radialGradient
            id={`rim-light-${size}`}
            cx="70%"
            cy="70%"
            r="50%"
          >
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
            <stop offset="70%" stopColor="#ffffff" stopOpacity="0" />
            <stop offset="90%" stopColor="#606060" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#808080" stopOpacity="0.5" />
          </radialGradient>

          {/* Shadow filter */}
          <filter id={`orb-shadow-${size}`} x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="0" dy="10" stdDeviation="15" floodColor="#000000" floodOpacity="0.5" />
          </filter>
        </defs>

        {/* Main sphere */}
        <circle
          cx="100"
          cy="100"
          r="95"
          fill={`url(#metallic-gradient-${size})`}
          filter={`url(#orb-shadow-${size})`}
        />

        {/* Rim light overlay */}
        <circle
          cx="100"
          cy="100"
          r="95"
          fill={`url(#rim-light-${size})`}
        />

        {/* Top highlight */}
        <ellipse
          cx="70"
          cy="55"
          rx="35"
          ry="25"
          fill={`url(#highlight-${size})`}
        />

        {/* Small specular highlight */}
        <ellipse
          cx="60"
          cy="45"
          rx="12"
          ry="8"
          fill="#ffffff"
          opacity="0.8"
        />
      </svg>
    </div>
  );
}
