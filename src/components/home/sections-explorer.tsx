"use client";

import React, { useState } from "react";
import { COLLEGE_CONFIG } from "@/config/college-config";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  BookOpen,
  CheckCircle,
  GraduationCap,
  Award,
  Layers,
  ArrowRight,
  ShieldCheck,
  Palette,
  Compass,
  FileText,
  Lock,
} from "lucide-react";
import { SectionTierId } from "@/types";
import { MotionReveal } from "@/components/ui/motion-reveal";

interface SectionsExplorerProps {
  onOpenFeeModal: (standardId: string) => void;
  onOpenEnquiryModal: () => void;
}

export function SectionsExplorer({
  onOpenFeeModal,
  onOpenEnquiryModal,
}: SectionsExplorerProps) {
  const [activeTierId, setActiveTierId] = useState<SectionTierId>("primary");

  const activeTier =
    COLLEGE_CONFIG.schoolSectionTiers.find((tier) => tier.id === activeTierId) ||
    COLLEGE_CONFIG.schoolSectionTiers[1];

  const getDefaultStandardIdForTier = (tierId: SectionTierId): string => {
    switch (tierId) {
      case "pre-primary":
        return "jr-kg";
      case "primary":
        return "std-1";
      case "upper-primary":
        return "std-6";
      case "secondary":
        return "std-9";
      case "higher-secondary":
        return "fyjc-science";
      default:
        return "std-1";
    }
  };

  return (
    <section id="sections" className="py-12 sm:py-20 bg-white border-b border-slate-200 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <MotionReveal direction="down" className="max-w-3xl mx-auto text-center space-y-2.5 mb-8 sm:mb-12">
          <Badge variant="crimson" size="sm">
            Maharashtra State Board English Medium Structure
          </Badge>
          <h2 className="font-editorial text-2xl xs:text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 leading-tight">
            Comprehensive <span className="text-[#9E1B32]">K–12 Academic Sections</span>
          </h2>
          <p className="text-xs sm:text-base text-slate-600 leading-relaxed">
            From foundational Kindergarten to board-topping SSC and Junior College certifications, explore our government-prescribed tri-lingual subject structures, core disciplines, and graded co-curricular frameworks.
          </p>
        </MotionReveal>

        {/* Section Tiers Switcher Tabs */}
        <MotionReveal direction="up" delay={0.1} className="flex justify-center mb-6 sm:mb-8">
          <div
            role="tablist"
            aria-label="Maharashtra State Board School Section Tiers"
            className="inline-flex p-1 sm:p-1.5 rounded-xl sm:rounded-2xl bg-slate-100 border border-slate-200 max-w-full overflow-x-auto shadow-inner scrollbar-none snap-x"
          >
            {COLLEGE_CONFIG.schoolSectionTiers.map((tier) => {
              const isActive = tier.id === activeTierId;
              return (
                <button
                  key={tier.id}
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={`tier-panel-${tier.id}`}
                  id={`tier-tab-${tier.id}`}
                  onClick={() => setActiveTierId(tier.id)}
                  className={`inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg sm:rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer whitespace-nowrap shrink-0 snap-start ${
                    isActive
                      ? "bg-[#9E1B32] text-white shadow-md transform scale-[1.02]"
                      : "text-slate-600 hover:text-slate-900 hover:bg-white/80"
                  }`}
                >
                  <Layers className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${isActive ? "text-amber-300" : "text-slate-400"}`} />
                  <span>{tier.tierName}</span>
                </button>
              );
            })}
          </div>
        </MotionReveal>

        {/* Active Section Content Panel */}
        <div
          role="tabpanel"
          id={`tier-panel-${activeTier.id}`}
          aria-labelledby={`tier-tab-${activeTier.id}`}
          className="bg-[#FCFAF7] border border-[#9E1B32]/25 rounded-2xl sm:rounded-3xl p-4 sm:p-8 shadow-lg space-y-6 sm:space-y-8 animate-in fade-in duration-200"
        >
          {/* Top Panel Banner */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-5 sm:pb-6">
            <div className="space-y-1.5">
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                <Badge variant="crimson" size="sm">
                  {activeTier.classesIncluded}
                </Badge>
                <span className="text-xs font-semibold text-slate-500 bg-white px-2.5 py-0.5 rounded-full border border-slate-200">
                  {activeTier.ageGroup}
                </span>
                <span className="text-xs font-mono text-[#9E1B32] bg-[#9E1B32]/10 px-2 py-0.5 rounded border border-[#9E1B32]/20 font-semibold">
                  {activeTier.boardAffiliation}
                </span>
              </div>
              <h3 className="font-editorial text-xl sm:text-3xl font-bold text-slate-900 leading-snug">
                {activeTier.tierName} ({activeTier.classesIncluded})
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-3xl">
                {activeTier.description}
              </p>
            </div>

            {/* Quick Fee Unlock Button */}
            <Button
              variant="gold"
              size="md"
              className="w-full sm:w-auto gap-2 shrink-0 font-bold shadow-md justify-center"
              onClick={() => onOpenFeeModal(getDefaultStandardIdForTier(activeTier.id))}
            >
              <Lock className="w-4 h-4 text-slate-950 shrink-0" />
              <span>Check {activeTier.tierName.split(" ")[0]} Fees</span>
            </Button>
          </div>

          {/* 2-Column Maharashtra Board Subject Architecture */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6">
            {/* Col 1: Core Main Examination Subjects (6 cols) - comes from left */}
            <MotionReveal direction="left" delay={0.15} hoverLift={true} className="lg:col-span-6 h-full">
              <div className="h-full bg-white border border-slate-200/90 rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-xs hover:border-[#DDA743] hover:shadow-xl hover:-translate-y-2 transition-all duration-300 space-y-4 cursor-pointer">
                <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-lg bg-[#9E1B32]/10 text-[#9E1B32]">
                      <BookOpen className="w-4 h-4" />
                    </div>
                    <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-900">
                      Core Main Subjects (Maharashtra Board)
                    </h4>
                  </div>
                  <Badge variant="subtle" size="sm">
                    Evaluated / Written Board
                  </Badge>
                </div>

                <ul className="space-y-2 sm:space-y-2.5 text-xs sm:text-sm text-slate-700 font-medium">
                  {activeTier.coreSubjects.map((subj, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-100">
                      <CheckCircle className="w-4 h-4 text-[#9E1B32] shrink-0 mt-0.5" />
                      <span className="leading-snug">{subj}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </MotionReveal>

            {/* Col 2: Graded / Non-Exam Subjects (6 cols) - comes from right */}
            <MotionReveal direction="right" delay={0.2} hoverLift={true} className="lg:col-span-6 space-y-5 sm:space-y-6">
              {/* Graded Subjects Card */}
              <div className="bg-white border border-slate-200/90 rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-xs hover:border-[#DDA743] hover:shadow-xl hover:-translate-y-2 transition-all duration-300 space-y-4 cursor-pointer">
                <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-lg bg-amber-100 text-amber-800">
                      <Palette className="w-4 h-4" />
                    </div>
                    <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-900">
                      Graded / Non-Exam Subjects
                    </h4>
                  </div>
                  <Badge variant="gold" size="sm">
                    Holistic / Grades A–D
                  </Badge>
                </div>

                <ul className="space-y-2 text-xs sm:text-sm text-slate-700 font-medium">
                  {activeTier.gradedSubjects.map((subj, idx) => (
                    <li key={idx} className="flex items-center gap-2.5 p-2 rounded-lg bg-amber-50/50 border border-amber-100">
                      <CheckCircle className="w-4 h-4 text-amber-600 shrink-0" />
                      <span>{subj}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Pedagogy & Classroom Highlights */}
              <div className="bg-white border border-slate-200/90 rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-xs hover:border-[#DDA743] hover:shadow-xl hover:-translate-y-2 transition-all duration-300 space-y-3 cursor-pointer">
                <h5 className="text-xs font-bold uppercase tracking-wider text-[#9E1B32]">
                  Pedagogical Highlights for {activeTier.classesIncluded}:
                </h5>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600">
                  {activeTier.keyHighlights.map((hl, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#9E1B32] shrink-0 mt-1.5" />
                      <span>{hl}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </MotionReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
