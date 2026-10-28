"use client";

import React, { useState } from "react";
import { COLLEGE_CONFIG } from "@/config/college-config";
import { Phone, Mail, ShieldCheck, Clock, GraduationCap } from "lucide-react";

function UtilityMarqueeContent() {
  return (
    <div className="flex items-center gap-6 sm:gap-8 px-4 shrink-0">
      {/* 1. Govt Recognition & State Board */}
      <span className="inline-flex items-center gap-1.5 text-stone-200">
        <ShieldCheck className="w-3.5 h-3.5 text-[#DDA743] shrink-0" aria-hidden="true" />
        <span className="text-[#DFBA73] font-semibold">Govt. Recognised:</span>
        <span className="font-mono text-stone-300">Regd. by Govt. of Maharashtra</span>
      </span>

      <span className="text-stone-500">•</span>

      {/* 2. Board Index & Registration Reference */}
      <span className="inline-flex items-center gap-1.5 text-stone-300 font-mono">
        <span className="text-[#DFBA73] font-semibold font-sans">Index No:</span>
        <span>J-15.14.086</span>
        <span className="text-stone-500">|</span>
        <span className="text-[#DFBA73] font-semibold font-sans">Ref:</span>
        <span>28903-97/DI-15/11/2016</span>
      </span>

      <span className="text-stone-500">•</span>

      {/* 3. Direct Phone Helpline */}
      <a
        href={`tel:${COLLEGE_CONFIG.contact.admissionPhone.replace(/\s+/g, "")}`}
        className="inline-flex items-center gap-1.5 text-stone-200 hover:text-[#DDA743] transition-colors group/link"
      >
        <Phone className="w-3.5 h-3.5 text-[#DDA743] shrink-0" aria-hidden="true" />
        <span className="text-stone-400 group-hover/link:text-stone-200">Admission Desk:</span>
        <span className="font-mono font-medium underline underline-offset-2 decoration-[#DDA743]/50">
          {COLLEGE_CONFIG.contact.admissionPhone}
        </span>
      </a>

      <span className="text-stone-500">•</span>

      {/* 4. Official Email */}
      <a
        href={`mailto:${COLLEGE_CONFIG.contact.admissionEmail}`}
        className="inline-flex items-center gap-1.5 text-stone-200 hover:text-[#DDA743] transition-colors group/link"
      >
        <Mail className="w-3.5 h-3.5 text-[#DDA743] shrink-0" aria-hidden="true" />
        <span className="text-stone-400 group-hover/link:text-stone-200">Email:</span>
        <span className="font-mono underline underline-offset-2 decoration-[#DDA743]/50">
          {COLLEGE_CONFIG.contact.admissionEmail}
        </span>
      </a>

      <span className="text-stone-500">•</span>

      {/* 5. Admissions Open Status */}
      <span className="inline-flex items-center gap-1.5 text-stone-200">
        <GraduationCap className="w-3.5 h-3.5 text-[#DDA743] shrink-0" aria-hidden="true" />
        <span className="text-[#DFBA73] font-semibold">Admissions Open 2026–27:</span>
        <span className="text-stone-300">Jr. KG to Std XII (Science, Commerce &amp; Arts)</span>
      </span>

      <span className="text-stone-500">•</span>

      {/* 6. Office Hours */}
      <span className="inline-flex items-center gap-1.5 text-stone-300">
        <Clock className="w-3.5 h-3.5 text-[#DDA743] shrink-0" aria-hidden="true" />
        <span className="text-stone-400">{COLLEGE_CONFIG.contact.officeHours}</span>
      </span>

      <span className="text-stone-500">•</span>

      {/* 7. Institutional Motto */}
      <span className="inline-flex items-center gap-1.5 text-[#DFBA73] font-serif font-bold tracking-wider">
        ॥ विद्या धनम् ॥
      </span>
    </div>
  );
}

export function UtilityBar() {
  const [isPaused, setIsPaused] = useState(false);

  return (
    <aside
      aria-label="Institutional announcements and accreditation marquee"
      className="marquee-wrapper relative overflow-hidden bg-[#1A080C] text-[#F4EFEA] border-b border-[#4E0B19] text-[10.5px] sm:text-xs py-2 select-none group transition-all"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => setIsPaused(false)}
      title="Hover or touch to pause announcement"
    >
      <style>{`
        @keyframes marqueeFlow {
          0% {
            transform: translate3d(0, 0, 0);
          }
          100% {
            transform: translate3d(-50%, 0, 0);
          }
        }
        .marquee-track-inner {
          display: flex !important;
          width: max-content !important;
          animation: marqueeFlow 32s linear infinite !important;
          will-change: transform;
        }
        .marquee-wrapper:hover .marquee-track-inner,
        .marquee-wrapper:active .marquee-track-inner {
          animation-play-state: paused !important;
        }
      `}</style>

      {/* Edge Gradient Masks for Smooth In/Out Fades */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-8 sm:w-16 bg-gradient-to-r from-[#1A080C] to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-8 sm:w-16 bg-gradient-to-l from-[#1A080C] to-transparent z-10" />

      {/* Marquee Track (Duplicated 2x for Seamless 50% Infinite Loop) */}
      <div
        className="marquee-track-inner flex items-center"
        style={{
          animationPlayState: isPaused ? "paused" : "running",
        }}
      >
        <UtilityMarqueeContent />
        <UtilityMarqueeContent />
      </div>
    </aside>
  );
}
