"use client";

import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";

interface ProfileEntranceProps {
  children: ReactNode;
}

const GLITCH_DURATION = 0.65;
const GLITCH_DELAY = 0.15;
const SCAN_DURATION = 0.6;

export function View({ children }: ProfileEntranceProps) {
  const shouldReduceMotion = useReducedMotion();
  const [hasScanCompleted, setHasScanCompleted] = useState(false);

  const isScanning = !shouldReduceMotion && !hasScanCompleted;

  useEffect(() => {
    if (!isScanning) return;

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isScanning]);

  if (shouldReduceMotion) {
    return <>{children}</>;
  }

  return (
    <div
      aria-busy={isScanning}
      className={`relative isolate ${isScanning ? "overflow-hidden" : ""}`}
      inert={isScanning}
    >
      {/* Profile content with digital displacement */}
      <motion.div
        className={`relative z-10 ${isScanning ? "pointer-events-none" : ""}`}
        initial={{
          opacity: 0.7,
          x: 0,
        }}
        animate={{
          opacity: [0.7, 1, 0.85, 1],
          x: [0, -4, 3, -2, 0],
          skewX: [0, -0.5, 0.4, -0.2, 0],
        }}
        transition={{
          duration: GLITCH_DURATION,
          delay: GLITCH_DELAY,
          ease: "linear",
          times: [0, 0.2, 0.45, 0.7, 1],
        }}
        onAnimationComplete={() => setHasScanCompleted(true)}
      >
        {children}
      </motion.div>

      {/* Green digital glitch bands */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-[18%] z-30 h-5"
        style={{
          clipPath: "polygon(0 0, 100% 15%, 100% 85%, 0 100%)",
          background:
            "linear-gradient(90deg, transparent, rgba(138,255,0,0.75), rgba(138,255,0,0.15), transparent)",
        }}
        initial={{ x: "-100%", opacity: 0 }}
        animate={{
          x: ["-100%", "0%", "8%", "100%"],
          opacity: [0, 0.9, 0.65, 0],
        }}
        transition={{
          duration: GLITCH_DURATION,
          delay: 0.05,
          ease: "linear",
          times: [0, 0.3, 0.55, 1],
        }}
      />

      {/* Violet digital glitch bands */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-[48%] z-30 h-3"
        style={{
          clipPath: "polygon(0 20%, 100% 0, 100% 100%, 0 80%)",
          background:
            "linear-gradient(90deg, transparent, rgba(183,122,255,0.7), rgba(183,122,255,0.12), transparent)",
        }}
        initial={{ x: "100%", opacity: 0 }}
        animate={{
          x: ["100%", "0%", "-5%", "-100%"],
          opacity: [0, 0.8, 0.55, 0],
        }}
        transition={{
          duration: GLITCH_DURATION,
          delay: 0.12,
          ease: "linear",
          times: [0, 0.3, 0.6, 1],
        }}
      />

      {/* Short horizontal digital fragments */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-[72%] z-30 h-2 w-1/3"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(138,255,0,0.8), transparent)",
        }}
        initial={{ x: 30, opacity: 0 }}
        animate={{
          x: [30, -12, 8, 0],
          opacity: [0, 1, 0.7, 0],
        }}
        transition={{
          duration: 0.4,
          delay: 0.2,
          ease: "linear",
          times: [0, 0.35, 0.7, 1],
        }}
      />

      {/* Holographic scanner */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 z-20 h-8"
        style={{
          background:
            "linear-gradient(to bottom, transparent, rgba(138,255,0,0.08), rgba(138,255,0,0.65), rgba(138,255,0,0.08), transparent)",
          boxShadow:
            "0 0 12px rgba(138,255,0,0.35), 0 0 30px rgba(138,255,0,0.2)",
        }}
        initial={{
          top: "-2rem",
          opacity: 0,
        }}
        animate={{
          top: "100%",
          opacity: [0, 1, 1, 0],
        }}
        transition={{
          duration: SCAN_DURATION,
          ease: "easeInOut",
          times: [0, 0.12, 0.8, 1],
        }}
      />
    </div>
  );
}
