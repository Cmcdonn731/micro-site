"use client";

import { useFloatingAnimation } from "@/hooks/useFloatingAnimation";

interface GlassOrbProps {
  /** Size of the orb in pixels */
  size?: number;
  /** Position from left as CSS value */
  left?: string;
  /** Position from top as CSS value */
  top?: string;
  /** Position from right as CSS value */
  right?: string;
  /** Position from bottom as CSS value */
  bottom?: string;
  /** Blur amount for backdrop filter (default: 12) */
  blur?: number;
  /** Whether this is a light or dark variant */
  variant?: "light" | "dark";
  /** Custom className */
  className?: string;
  /** Z-index */
  zIndex?: number;
}

/**
 * Floating glass orb component like micro.so
 * Uses SVG with blur filters and floating animation
 */
export default function GlassOrb({
  size = 120,
  left,
  top,
  right,
  bottom,
  blur = 12,
  variant = "light",
  className = "",
  zIndex = 1,
}: GlassOrbProps) {
  const ref = useFloatingAnimation<HTMLDivElement>({ size });

  // Generate unique IDs for SVG filters
  const id = `orb-${Math.random().toString(36).slice(2, 9)}`;

  const gradientColors =
    variant === "light"
      ? {
          outer: "rgba(255, 255, 255, 0.1)",
          inner: "rgba(255, 255, 255, 0.05)",
          highlight: "rgba(255, 255, 255, 0.2)",
        }
      : {
          outer: "rgba(0, 0, 0, 0.2)",
          inner: "rgba(0, 0, 0, 0.1)",
          highlight: "rgba(255, 255, 255, 0.1)",
        };

  return (
    <div
      ref={ref}
      className={`absolute pointer-events-none ${className}`}
      style={{
        width: size,
        height: size,
        left,
        top,
        right,
        bottom,
        zIndex,
        willChange: "transform, filter",
      }}
    >
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ filter: `blur(${blur * 0.1}px)` }}
      >
        <defs>
          {/* Blur filter */}
          <filter
            id={`${id}-blur`}
            x="-50%"
            y="-50%"
            width="200%"
            height="200%"
          >
            <feGaussianBlur in="SourceGraphic" stdDeviation={size * 0.08} />
          </filter>

          {/* Radial gradient for glass effect */}
          <radialGradient id={`${id}-gradient`} cx="30%" cy="30%" r="70%">
            <stop offset="0%" stopColor={gradientColors.highlight} />
            <stop offset="50%" stopColor={gradientColors.inner} />
            <stop offset="100%" stopColor={gradientColors.outer} />
          </radialGradient>

          {/* Edge highlight gradient */}
          <linearGradient
            id={`${id}-edge`}
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="rgba(255, 255, 255, 0.3)" />
            <stop offset="50%" stopColor="rgba(255, 255, 255, 0.1)" />
            <stop offset="100%" stopColor="rgba(255, 255, 255, 0)" />
          </linearGradient>
        </defs>

        {/* Main orb body */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={size / 2 - 2}
          fill={`url(#${id}-gradient)`}
          filter={`url(#${id}-blur)`}
        />

        {/* Glass edge highlight */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={size / 2 - 2}
          fill="none"
          stroke={`url(#${id}-edge)`}
          strokeWidth="1"
        />

        {/* Inner highlight for depth */}
        <ellipse
          cx={size * 0.35}
          cy={size * 0.35}
          rx={size * 0.15}
          ry={size * 0.1}
          fill="rgba(255, 255, 255, 0.15)"
          filter={`url(#${id}-blur)`}
        />
      </svg>

      {/* Backdrop blur layer */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          backdropFilter: `blur(${blur}px)`,
          WebkitBackdropFilter: `blur(${blur}px)`,
          background: "transparent",
        }}
      />
    </div>
  );
}
