import React from "react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { COLLEGE_CONFIG } from "@/config/college-config";

interface CrestLogoProps {
  className?: string;
  variant?: "full" | "compact" | "light";
  logoClassName?: string;
}

export function CrestLogo({ className, variant = "full", logoClassName }: CrestLogoProps) {
  const isLight = variant === "light";

  return (
    <Link
      href="/"
      className={cn(
        "inline-flex items-center gap-2.5 sm:gap-3 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A059] rounded-sm py-1 max-w-full",
        className
      )}
      aria-label={`${COLLEGE_CONFIG.name} Home`}
    >
      {/* Official College Emblem Image - Enlarged per user instruction */}
      <div
        className={cn(
          "relative shrink-0 transition-transform duration-300 group-hover:scale-105",
          logoClassName || "w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16"
        )}
      >
        <Image
          src="/logo.png"
          alt="Gurukul Vidyapeeth Official Seal"
          width={72}
          height={72}
          className="w-full h-full object-contain drop-shadow-sm"
          priority
        />
      </div>

      {/* Collegiate Typography */}
      <div className="flex flex-col justify-center min-w-0 text-left">
        {/* Trust Super-title */}
        <span
          className={cn(
            "text-[6.5px] xs:text-[7.2px] sm:text-[8.5px] md:text-[9px] uppercase tracking-wider font-bold whitespace-nowrap leading-none mb-1 sm:mb-1.5 block",
            isLight ? "text-amber-300" : "text-[#9E1B32]"
          )}
        >
          BHAGWAT PRASAD GURUKUL EDUCATIONAL TRUST&apos;S
        </span>

        {/* Institution Brand Headline */}
        <span
          className={cn(
            "font-crest text-[12.5px] xs:text-[14px] sm:text-[15px] lg:text-[16px] font-bold tracking-wider leading-none whitespace-nowrap transition-colors block",
            isLight
              ? "text-white group-hover:text-amber-400"
              : "text-[#9E1B32] group-hover:text-[#BA203B]"
          )}
        >
          GURUKUL VIDYAPEETH
        </span>

        {/* Academic Level Subtitle */}
        <span
          className={cn(
            "text-[8px] xs:text-[8.5px] sm:text-[9.5px] tracking-wide font-medium whitespace-nowrap mt-1 sm:mt-1.5 block",
            isLight ? "text-stone-300" : "text-slate-600 font-semibold"
          )}
        >
          English High School &amp; Jr. College<span className="hidden xs:inline"> • Index J-15.14.086</span>
        </span>
      </div>
    </Link>
  );
}
