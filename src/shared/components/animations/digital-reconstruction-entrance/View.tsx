"use client";

import { useState } from "react";
import type { ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";

interface DigitalReconstructionEntranceProps {
  children: ReactNode;
}

const FRAGMENTS = [
  { x: -90, y: -45, color: "green" },
  { x: 65, y: -80, color: "violet" },
  { x: -45, y: 70, color: "green" },
  { x: 100, y: 35, color: "violet" },
  { x: -75, y: 25, color: "violet" },
  { x: 55, y: -65, color: "green" },
  { x: 85, y: 75, color: "violet" },
  { x: -100, y: -30, color: "green" },
  { x: 70, y: 55, color: "green" },
  { x: -55, y: -75, color: "violet" },
  { x: 95, y: -40, color: "green" },
  { x: -80, y: 65, color: "violet" },
  { x: 45, y: 80, color: "green" },
  { x: -65, y: -55, color: "violet" },
  { x: 90, y: 20, color: "green" },
  { x: -40, y: 85, color: "violet" },
] as const;

const FRAGMENT_DURATION = 0.7;
const FRAGMENT_STAGGER = 0.01;

export function View({ children }: DigitalReconstructionEntranceProps) {
  const shouldReduceMotion = useReducedMotion();

  const [hasReconstructionCompleted, setHasReconstructionCompleted] =
    useState(false);

  const isReconstructing = !shouldReduceMotion && !hasReconstructionCompleted;

  if (shouldReduceMotion) {
    return <>{children}</>;
  }

  return (
    <div
      aria-busy={isReconstructing}
      className="relative isolate w-full min-w-0"
      inert={isReconstructing}
    >
      {/* Page content */}
      <motion.div
        className={`relative z-10 ${
          isReconstructing ? "pointer-events-none" : ""
        }`}
        initial={{
          opacity: 0.55,
          filter: "blur(3px)",
        }}
        animate={{
          opacity: 1,
          filter: "blur(0px)",
        }}
        transition={{
          duration: 1.05,
          delay: 0.08,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        {children}
      </motion.div>

      {/* Isolated glitch animation layer */}
      {isReconstructing && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-20 overflow-hidden"
        >
          {/* Digital reconstruction fragments */}
          {FRAGMENTS.map((fragment, index) => {
            const isLastFragment = index === FRAGMENTS.length - 1;

            return (
              <motion.div
                key={index}
                className="absolute overflow-hidden"
                style={{
                  top: `${Math.floor(index / 4) * 25}%`,
                  left: `${(index % 4) * 25}%`,
                  width: "25%",
                  height: "25%",
                  background:
                    fragment.color === "green"
                      ? "linear-gradient(135deg, rgba(138,255,0,0.16), rgba(8,5,22,0.88))"
                      : "linear-gradient(135deg, rgba(183,122,255,0.18), rgba(8,5,22,0.88))",
                  border:
                    fragment.color === "green"
                      ? "1px solid rgba(138,255,0,0.45)"
                      : "1px solid rgba(183,122,255,0.45)",
                  boxShadow:
                    fragment.color === "green"
                      ? "0 0 14px rgba(138,255,0,0.18)"
                      : "0 0 14px rgba(183,122,255,0.18)",
                }}
                initial={{
                  x: fragment.x,
                  y: fragment.y,
                  opacity: 0,
                  scale: 1.08,
                }}
                animate={{
                  x: [fragment.x, fragment.x * -0.12, 0],
                  y: [fragment.y, fragment.y * -0.12, 0],
                  opacity: [0, 0.9, 0],
                  scale: [1.08, 1.02, 1],
                }}
                transition={{
                  duration: FRAGMENT_DURATION,
                  delay: index * FRAGMENT_STAGGER,
                  ease: [0.22, 1, 0.36, 1],
                  times: [0, 0.65, 1],
                }}
                onAnimationComplete={
                  isLastFragment
                    ? () => setHasReconstructionCompleted(true)
                    : undefined
                }
              >
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "repeating-linear-gradient(0deg, transparent 0px, transparent 3px, rgba(255,255,255,0.08) 4px)",
                  }}
                />
              </motion.div>
            );
          })}

          {/* Brief horizontal digital interference */}
          <motion.div
            className="absolute left-0 top-[35%] h-[2px] w-full"
            style={{
              background:
                "linear-gradient(90deg, transparent, #8AFF00, #B77AFF, transparent)",
              boxShadow: "0 0 12px rgba(138,255,0,0.5)",
            }}
            initial={{
              x: "-100%",
              opacity: 0,
            }}
            animate={{
              x: ["-100%", "0%", "100%"],
              opacity: [0, 0.9, 0],
            }}
            transition={{
              duration: 0.35,
              delay: 0.18,
              ease: "linear",
            }}
          />
        </div>
      )}
    </div>
  );
}
