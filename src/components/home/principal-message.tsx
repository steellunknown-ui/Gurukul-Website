"use client";

import React, { useState } from "react";
import { COLLEGE_CONFIG } from "@/config/college-config";
import { Badge } from "@/components/ui/badge";
import { Quote, User, Award, ShieldCheck, Sparkles, Building2 } from "lucide-react";
import { MotionReveal } from "@/components/ui/motion-reveal";

export function PrincipalMessage() {
  const { leaders } = COLLEGE_CONFIG;
  const [selectedLeaderId, setSelectedLeaderId] = useState<"all" | "founder" | "chairman">("all");

  const displayedLeaders =
    selectedLeaderId === "all"
      ? leaders
      : leaders.filter((l) => l.id === selectedLeaderId);

  return (
    <section
      id="leadership"
      className="py-12 sm:py-20 bg-[#FCFAF7] border-b border-[#E8DFD7] relative overflow-hidden"
    >
      {/* Background Soft Glow */}
      <div className="absolute left-1/2 top-0 -translate-x-1/2 w-full max-w-7xl h-48 bg-gradient-to-b from-[#DDA743]/5 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <MotionReveal direction="down" className="max-w-3xl mx-auto text-center space-y-2.5 mb-8 sm:mb-12">
          <Badge variant="gold" size="sm">
            Trust Leadership &amp; Vision
          </Badge>
          <h2 className="font-editorial text-2xl xs:text-3xl sm:text-4xl font-bold tracking-tight text-[#1F1A1B] leading-tight">
            From the <span className="text-[#9E1B32]">Founder &amp; Chairman&apos;s Desk</span>
          </h2>
          <p className="text-xs sm:text-base text-[#5C5556] leading-relaxed max-w-2xl mx-auto">
            Governed under the visionary guidance of <strong className="text-slate-800">Bhagwat Prasad Gurukul Educational Trust&apos;s</strong>, blending timeless Indian moral values with Maharashtra State Board academic distinction.
          </p>

          {/* Interactive Leader Switcher Tabs */}
          <div className="pt-2 flex justify-center">
            <div
              role="tablist"
              aria-label="Leadership perspective selector"
              className="inline-flex p-1 rounded-xl bg-[#F4EFEA] border border-[#E8DFD7] shadow-inner max-w-full"
            >
              <button
                type="button"
                onClick={() => setSelectedLeaderId("all")}
                className={`px-3 sm:px-4 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  selectedLeaderId === "all"
                    ? "bg-[#9E1B32] text-white shadow-xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Both Leaders
              </button>
              <button
                type="button"
                onClick={() => setSelectedLeaderId("founder")}
                className={`px-3 sm:px-4 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  selectedLeaderId === "founder"
                    ? "bg-[#9E1B32] text-white shadow-xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                1st • Founder&apos;s Desk
              </button>
              <button
                type="button"
                onClick={() => setSelectedLeaderId("chairman")}
                className={`px-3 sm:px-4 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  selectedLeaderId === "chairman"
                    ? "bg-[#9E1B32] text-white shadow-xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                2nd • Chairman&apos;s Desk
              </button>
            </div>
          </div>
        </MotionReveal>

        {/* Leaders Showcase Container */}
        <div
          className={`grid gap-8 ${
            selectedLeaderId === "all"
              ? "grid-cols-1 lg:grid-cols-2"
              : "grid-cols-1 max-w-4xl mx-auto"
          }`}
        >
          {displayedLeaders.map((leader, idx) => (
            <MotionReveal
              key={leader.id}
              direction={
                selectedLeaderId === "all"
                  ? idx === 0
                    ? "left"
                    : "right"
                  : "up"
              }
              delay={0.15 + idx * 0.1}
              hoverLift={true}
              className="h-full"
            >
              <div className="h-full bg-white border border-slate-200/90 rounded-2xl sm:rounded-3xl p-5 sm:p-8 shadow-lg flex flex-col justify-between hover:border-[#DDA743] hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 cursor-pointer">
                <div className="space-y-6">
                  {/* Header Badge */}
                  <div className="flex items-center justify-between pb-3 border-b border-[#E8DFD7]">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#9E1B32]/10 text-[#9E1B32] text-xs font-bold border border-[#9E1B32]/20">
                      <Award className="w-3.5 h-3.5 text-[#DDA743]" />
                      {leader.badge}
                    </span>
                    <span className="text-[11px] font-mono text-stone-500">
                      Order: {leader.order === 1 ? "1st Founder" : "2nd Chairman"}
                    </span>
                  </div>

                  {/* Profile Card & Bio Header */}
                  <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
                    {/* Ornate Ceremonial Portrait Emblem */}
                    <div className="relative w-36 sm:w-40 aspect-4/5 rounded-2xl bg-gradient-to-b from-[#1A080C] via-[#2A0E15] to-[#1A080C] border-2 border-[#DDA743]/50 flex flex-col items-center justify-between p-3.5 shadow-xl overflow-hidden text-white shrink-0">
                      {/* Filigree Corner Accents */}
                      <div className="absolute top-2 left-2 w-2.5 h-2.5 border-t-2 border-l-2 border-[#DDA743]" />
                      <div className="absolute top-2 right-2 w-2.5 h-2.5 border-t-2 border-r-2 border-[#DDA743]" />
                      <div className="absolute bottom-2 left-2 w-2.5 h-2.5 border-b-2 border-l-2 border-[#DDA743]" />
                      <div className="absolute bottom-2 right-2 w-2.5 h-2.5 border-b-2 border-r-2 border-[#DDA743]" />

                      <span className="text-[8.5px] uppercase tracking-widest text-[#DDA743] font-bold text-center">
                        {leader.officeTitle}
                      </span>

                      <div className="my-auto flex flex-col items-center">
                        <div className="w-14 h-14 rounded-full bg-[#DDA743]/15 border-2 border-[#DDA743]/60 flex items-center justify-center mb-2 shadow-inner">
                          <User className="w-7 h-7 text-[#DDA743]" />
                        </div>
                        <span className="font-editorial text-xs sm:text-sm font-bold text-white text-center leading-tight">
                          {leader.name}
                        </span>
                        <span className="text-[10px] text-[#DDA743] font-medium text-center mt-0.5">
                          {leader.role}
                        </span>
                      </div>

                      <div className="w-full pt-1.5 border-t border-white/10 text-center">
                        <span className="text-[9.5px] text-stone-300 font-mono block">
                          ॥ विद्या धनम् ॥
                        </span>
                        <span className="text-[8px] text-[#DDA743]/80 tracking-wider uppercase font-semibold">
                          Gurukul Vidyapeeth
                        </span>
                      </div>
                    </div>

                    {/* Name and Designation Column */}
                    <div className="text-center sm:text-left space-y-1 my-auto">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-[#DDA743] block">
                        {leader.role === "Founder" ? "Founding Visionary" : "Governing Council"}
                      </span>
                      <h3 className="font-editorial text-lg sm:text-xl font-bold text-[#1F1A1B]">
                        {leader.name}
                      </h3>
                      <p className="text-xs font-semibold text-[#9E1B32]">
                        {leader.designation}
                      </p>
                      <p className="text-[11.5px] text-slate-500 leading-snug">
                        {leader.qualification}
                      </p>
                    </div>
                  </div>

                  {/* Vision Quote */}
                  <div className="relative pl-4 sm:pl-5 border-l-4 border-[#9E1B32] bg-[#FCFAF7] p-3 sm:p-4 rounded-r-xl">
                    <Quote className="absolute -top-1 left-1 w-3.5 h-3.5 text-[#DDA743] opacity-70" />
                    <p className="font-editorial italic text-xs sm:text-sm text-[#9E1B32] font-semibold leading-relaxed">
                      &ldquo;{leader.quote}&rdquo;
                    </p>
                  </div>

                  {/* Message Body Paragraphs */}
                  <div className="space-y-2.5 text-xs sm:text-sm text-[#5C5556] leading-relaxed">
                    {leader.bodyParagraphs.map((para, pIdx) => (
                      <p key={pIdx}>{para}</p>
                    ))}
                  </div>
                </div>

                {/* Formal Card Footer Sign-Off */}
                <div className="pt-4 mt-6 border-t border-[#E8DFD7] flex items-center justify-between text-xs text-slate-500">
                  <div className="flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="font-semibold text-slate-700">
                      Bhagwat Prasad Gurukul Educational Trust&apos;s
                    </span>
                  </div>
                  <div className="font-editorial italic text-xs text-[#9E1B32] font-semibold">
                    Academic Year 2026–27
                  </div>
                </div>
              </div>
            </MotionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
