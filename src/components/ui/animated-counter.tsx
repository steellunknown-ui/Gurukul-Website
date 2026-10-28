"use client";

import React, { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

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

  // Initial value defaults to targetNumber so SSR HTML displays the verified metric
  const [displayValue, setDisplayValue] = useState(targetNumber ?? 0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (isStaticText || targetNumber === undefined || !isInView || hasAnimated.current) {
      return;
    }
    hasAnimated.current = true;
    setDisplayValue(0);

    let startTime: number | null = null;
    let animationFrame: number;

    // Smooth cubic ease out
    const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      const eased = easeOutCubic(progress);
      const current = eased * targetNumber!;

      setDisplayValue(current);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(step);
      } else {
        setDisplayValue(targetNumber!);
      }
    };

    animationFrame = requestAnimationFrame(step);

    return () => cancelAnimationFrame(animationFrame);
  }, [isInView, targetNumber, duration, isStaticText]);

  if (isStaticText || targetNumber === undefined) {
    return <span className={className}>{rawText}</span>;
  }

  const formatted =
    computedDecimals > 0
      ? displayValue.toFixed(computedDecimals)
      : Math.round(displayValue).toString();

  return (
    <span ref={ref} className={className}>
      {computedPrefix}
      {formatted}
      {computedSuffix}
    </span>
  );
}
