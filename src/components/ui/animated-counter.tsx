"use client";

import React, { useEffect, useRef, useState } from "react";
import { useInView, animate, useMotionValue } from "framer-motion";

interface AnimatedCounterProps {
  value?: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  duration?: number; // duration in seconds
  rawText?: string; // e.g. "99.9%", "78%+", "15 : 1", "3 Rounds"
  className?: string;
}

/**
 * AnimatedCounter / CountUp
 * Smoothly animates numbers from 0 to target value when scrolled into view.
 * Powered by Framer Motion's animate engine and useMotionValue.
 * Automatically parses strings like "99.9%", "78%+", "15 : 1", "3 Rounds".
 * Falls back to target number on SSR so tunnel/remote connections never see 0 or blank.
 */
export function AnimatedCounter({
  value,
  decimals,
  prefix = "",
  suffix = "",
  duration = 2.0,
  rawText,
  className = "",
}: AnimatedCounterProps) {
  // If rawText is provided, parse it
  let targetNumber = value;
  let computedDecimals = decimals;
  let computedPrefix = prefix;
  let computedSuffix = suffix;
  let isStaticText = false;

  if (rawText !== undefined && value === undefined) {
    const match = rawText.match(/^([^\d]*)([\d]+(?:\.[\d]+)?)(.*)$/);
    if (match) {
      computedPrefix = match[1];
      targetNumber = parseFloat(match[2]);
      computedSuffix = match[3];

      if (computedDecimals === undefined) {
        const parts = match[2].split(".");
        computedDecimals = parts.length > 1 ? parts[1].length : 0;
      }
    } else {
      isStaticText = true;
    }
  }

  if (computedDecimals === undefined) {
    computedDecimals = 0;
  }

  const formatNum = (num: number) => {
    return computedDecimals! > 0
      ? num.toFixed(computedDecimals!)
      : Math.round(num).toString();
  };

  // SSR initial state uses the full target number so it's instantly readable
  const [displayValue, setDisplayValue] = useState<string>(() => {
    return targetNumber !== undefined ? formatNum(targetNumber) : (rawText || "");
  });

  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const motionVal = useMotionValue(0);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (isStaticText || targetNumber === undefined || !isInView || hasAnimated.current) {
      return;
    }
    hasAnimated.current = true;

    // Reset to 0 and animate smoothly to targetNumber using Framer Motion
    motionVal.set(0);
    setDisplayValue(formatNum(0));

    const controls = animate(motionVal, targetNumber, {
      duration: Math.max(duration, 0.8),
      ease: [0.16, 1, 0.3, 1], // easeOutExpo
      onUpdate: (latest) => {
        setDisplayValue(formatNum(latest));
      },
      onComplete: () => {
        setDisplayValue(formatNum(targetNumber!));
      },
    });

    return () => controls.stop();
  }, [isInView, targetNumber, duration, isStaticText, computedDecimals]);

  if (isStaticText || targetNumber === undefined) {
    return <span className={className}>{rawText}</span>;
  }

  return (
    <span ref={ref} className={className}>
      {computedPrefix}
      {displayValue}
      {computedSuffix}
    </span>
  );
}
