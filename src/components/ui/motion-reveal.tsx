"use client";

import React from "react";
import { motion, type HTMLMotionProps, type Variants } from "framer-motion";

export type RevealDirection = "left" | "right" | "up" | "down" | "fade" | "scale";

interface MotionRevealProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  direction?: RevealDirection;
  delay?: number;
  duration?: number;
  className?: string;
  viewportAmount?: number;
  once?: boolean;
  hoverLift?: boolean;
}

export function MotionReveal({
  children,
  direction = "up",
  delay = 0,
  duration = 0.55,
  className = "",
  viewportAmount = 0.05,
  once = false,
  hoverLift = false,
  whileHover,
  ...props
}: MotionRevealProps) {
  const getInitialPosition = () => {
    switch (direction) {
      case "left":
        return { opacity: 0, x: -25, y: 0 };
      case "right":
        return { opacity: 0, x: 25, y: 0 };
      case "up":
        return { opacity: 0, x: 0, y: 25 };
      case "down":
        return { opacity: 0, x: 0, y: -20 };
      case "scale":
        return { opacity: 0, scale: 0.96 };
      case "fade":
      default:
        return { opacity: 0, x: 0, y: 0 };
    }
  };

  const variants: Variants = {
    hidden: {
      ...getInitialPosition(),
      transition: {
        duration: 0.25,
        ease: "easeOut",
      },
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      transition: {
        duration,
        delay,
        ease: [0.21, 0.47, 0.32, 0.98], // smooth luxury easeOutCubic
      },
    },
  };

  const effectiveWhileHover =
    whileHover ??
    (hoverLift
      ? {
          y: -8,
          transition: { duration: 0.25, ease: "easeOut" },
        }
      : undefined);

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: viewportAmount, margin: "0px 0px -40px 0px" }}
      variants={variants}
      whileHover={effectiveWhileHover}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

/**
 * Grid Card Helper:
 * Automatically picks direction based on card index and total columns:
 * - Leftmost column: enters from "left"
 * - Rightmost column: enters from "right"
 * - Middle columns: enters from "up" (downwards to upwards)
 */
export function getCardDirection(
  index: number,
  totalCols: number = 3
): RevealDirection {
  if (totalCols <= 1) return "up";
  const colIndex = index % totalCols;
  if (colIndex === 0) return "left";
  if (colIndex === totalCols - 1) return "right";
  return "up";
}
