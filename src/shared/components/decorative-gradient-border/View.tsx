"use client";

import { useId } from "react";

interface DecorativeGradientBorderProps {
  className?: string;
  rectClassName?: string;
  radius?: number;
}

export function View({
  className = "",
  rectClassName = "",
  radius = 16,
}: DecorativeGradientBorderProps) {
  const gradientId = `decorative-gradient-${useId().replace(/:/g, "")}`;

  return (
    <svg
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
    >
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#A855F7" stopOpacity="0.7" />
          <stop offset="15%" stopColor="#A855F7" stopOpacity="0.55" />

          <stop offset="20%" stopColor="#80FF00" stopOpacity="0.8" />
          <stop offset="25%" stopColor="#80FF00" stopOpacity="1" />
          <stop offset="32%" stopColor="#80FF00" stopOpacity="0.65" />
          <stop offset="38%" stopColor="#80FF00" stopOpacity="0" />

          <stop offset="65%" stopColor="#A855F7" stopOpacity="0" />
          <stop offset="75%" stopColor="#A855F7" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#A855F7" stopOpacity="0.7" />
        </linearGradient>
      </defs>

      <rect
        x="0.5"
        y="0.5"
        width="calc(100% - 1px)"
        height="calc(100% - 1px)"
        rx={radius}
        ry={radius}
        fill="none"
        stroke={`url(#${gradientId})`}
        strokeWidth="1"
        vectorEffect="non-scaling-stroke"
        className={rectClassName}
      />
    </svg>
  );
}
