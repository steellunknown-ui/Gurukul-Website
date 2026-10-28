"use client";

import React, { useState } from "react";
import {
  Award,
  BookOpen,
  CheckCircle2,
  GraduationCap,
  ShieldCheck,
  TrendingUp,
  Users,
  FileCheck2,
  ChevronRight,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { COLLEGE_CONFIG } from "@/config/college-config";

import { MotionReveal, RevealDirection } from "@/components/ui/motion-reveal";
import { AnimatedCounter } from "@/components/ui/animated-counter";

interface AcademicTrackRecordProps {
  onOpenEnquiry?: (classLevel: "School" | "XI" | "XII") => void;
}

export function AcademicTrackRecord({ onOpenEnquiry }: AcademicTrackRecordProps) {
  const [activePillar, setActivePillar] = useState<number>(0);

  const getMetricDirection = (idx: number): RevealDirection => {
    if (idx === 0) return "left";
    if (idx === 3) return "right";
    return "up";
  };

  const stats = [
    {
      metric: "99.9%",
      label: "Board Passing Track Record",
      sublabel: "SSC (Class X) & HSC (Class XII)",
      icon: Award,
      accent: "text-[#9E1B32]",
      bg: "bg-[#9E1B32]/10",
      border: "border-[#9E1B32]/25",
    },
    {
      metric: "78%+",
      label: "Distinction & 1st Class Rate",
      sublabel: "Scoring 75% and above in Board Exams",
      icon: TrendingUp,
      accent: "text-[#DDA743]",
      bg: "bg-[#DDA743]/15",
      border: "border-[#DDA743]/30",
    },
    {
      metric: "15 : 1",
      label: "Student-Teacher Ratio",
      sublabel: "Personalized desk mentoring & doubt clinics",
      icon: Users,
      accent: "text-emerald-700",
      bg: "bg-emerald-50",
      border: "border-emerald-200",
    },
    {
      metric: "3 Rounds",
      label: "Prelim Board Mock Series",
      sublabel: "Full syllabus papers with board moderation",
      icon: FileCheck2,
      accent: "text-blue-700",
      bg: "bg-blue-50",
      border: "border-blue-200",
    },
  ];

  const distinctionPillars = [
    {
      id: "ssc-mastery",
      tag: "Secondary Section (Classes 9th & 10th)",
      title: "SSC Board Mastery & Moderation",
      subtitle: "Systematic preparation for the Maharashtra SSC Board examination milestone.",
      points: [
        "Three complete prelim exam series simulating official Maharashtra State Board conditions.",
        "Step-wise mark allocation drills for Algebra, Geometry, and Science Diagrams.",
        "Specialized handwriting, neat presentation, and time-management workshops.",
        "Comprehensive language clinics for English First Language, Marathi, and Hindi grammar.",
      ],
      badgeText: "SSC Pune/Mumbai Board",
      actionLevel: "School" as const,
    },
    {
      id: "hsc-excellence",
      tag: "Junior College (Classes 11th & 12th)",
      title: "HSC Junior College Distinction",
      subtitle: "Pre-university academic immersion across Science, Commerce & Arts.",
      points: [
        "Hands-on laboratory sessions in Physics, Chemistry, Biology, and Bifocal Computer Science.",
        "Commerce accountancy journals, ledger workshops, and secretarial practice viva rehearsals.",
        "Continuous evaluation, internal assessments, and compulsory Environmental Education (EVS).",
        "Dedicated revision lectures, past 10-year board paper archives, and answer template booklets.",
      ],
      badgeText: "HSC State Board",
      actionLevel: "XI" as const,
    },
    {
      id: "mentorship-ethos",
      tag: "Academic Philosophy & Values",
      title: "Disciplined Mentorship & Zero-Gap Clinics",
      subtitle: "Rooted in our timeless institutional motto: ॥ विद्या धनम् सर्वधन प्रधानम् ॥",
      points: [
        "Weekly diagnostic appraisals identifying individual learning gaps before exams.",
        "Daily zero-period remedial coaching for students needing extra conceptual clarity.",
        "Structured parent-educator dialogue every term to track student development.",
        "Value-based atmosphere blending Vedic moral ethos with modern analytical education.",
      ],
      badgeText: "Gurukul Ethos",
      actionLevel: "School" as const,
    },
  ];

  return (
    <section
      id="academic-record"
      className="scroll-mt-20 sm:scroll-mt-24 py-12 sm:py-20 bg-gradient-to-b from-[#FCFAF7] via-[#F8F4EE] to-[#FCFAF7] border-y border-[#E8DFD7] relative overflow-hidden"
    >
      {/* Subtle Collegiate Watermark Motif */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-[#DDA743]/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <MotionReveal direction="down" className="max-w-3xl mx-auto text-center space-y-3 mb-10 sm:mb-14">
          <Badge variant="gold" size="sm">
            Maharashtra State Board Academic Standards
          </Badge>
          <h2 className="font-editorial text-2xl xs:text-3xl sm:text-4xl font-bold tracking-tight text-[#1F1A1B] leading-tight">
            Proven Academic Track Record &amp;{" "}
            <span className="text-[#9E1B32]">Board Distinction</span>
          </h2>
          <p className="text-xs sm:text-base text-[#5C5556] leading-relaxed max-w-2xl mx-auto">
            At Gurukul Vidyapeeth, academic excellence is a structured habit. Our students consistently achieve outstanding results in Maharashtra State Board SSC (Class X) and HSC (Class XII) examinations through disciplined pedagogy.
          </p>

          {/* Statutory Verification Tag */}
          <div className="inline-flex flex-wrap items-center justify-center gap-2 pt-1 text-xs text-[#5C5556]">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#E8DFD7] shadow-2xs font-mono text-[11px] text-[#9E1B32]">
              <ShieldCheck className="w-3.5 h-3.5 text-[#DDA743]" />
              State Board Index: J-15.14.086
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#E8DFD7] shadow-2xs text-[11px] text-slate-700">
              <GraduationCap className="w-3.5 h-3.5 text-[#9E1B32]" />
              Govt. Ref: 28903-97/DI-15/11/2016
            </span>
          </div>
        </MotionReveal>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-12 sm:mb-16">
          {stats.map((item, idx) => {
            const Icon = item.icon;
            return (
              <MotionReveal
                key={idx}
                direction={getMetricDirection(idx)}
                delay={idx * 0.1}
                hoverLift={true}
                className="h-full"
              >
                <div className="h-full p-3.5 sm:p-6 rounded-2xl bg-white border border-[#E8DFD7] shadow-xs hover:border-[#DDA743] hover:shadow-xl hover:-translate-y-2.5 transition-all duration-300 text-center flex flex-col items-center justify-center group cursor-pointer">
                  <div
                    className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl ${item.bg} border ${item.border} flex items-center justify-center mb-2.5 sm:mb-4 group-hover:scale-110 group-hover:rotate-2 transition-transform duration-300`}
                  >
                    <Icon className={`w-5 h-5 sm:w-6 sm:h-6 ${item.accent}`} />
                  </div>
                  <div className="font-editorial text-2xl xs:text-3xl sm:text-4xl font-bold text-[#1F1A1B] tracking-tight mb-1 whitespace-nowrap">
                    <AnimatedCounter rawText={item.metric} duration={2.2} />
                  </div>
                  <div className="text-xs sm:text-sm font-bold text-slate-800 leading-snug mb-1">
                    {item.label}
                  </div>
                  <div className="text-[10px] sm:text-xs text-[#5C5556] leading-tight">
                    {item.sublabel}
                  </div>
                </div>
              </MotionReveal>
            );
          })}
        </div>

        {/* 3 Pillars of Distinction Showcase */}
        <MotionReveal direction="up" delay={0.2} className="bg-white rounded-2xl sm:rounded-3xl border border-[#E8DFD7] shadow-xs overflow-hidden">
          {/* Pillar Navigation Tabs */}
          <div className="grid grid-cols-1 md:grid-cols-3 border-b border-[#E8DFD7] bg-[#FCFAF7]">
            {distinctionPillars.map((pillar, idx) => {
              const isActive = activePillar === idx;
              return (
                <button
                  key={pillar.id}
                  onClick={() => setActivePillar(idx)}
                  className={`p-4 sm:p-5 text-left transition-all relative border-b md:border-b-0 md:border-r border-[#E8DFD7] last:border-r-0 cursor-pointer ${
                    isActive
                      ? "bg-white text-[#9E1B32]"
                      : "text-slate-600 hover:bg-[#F4EFEA] hover:text-slate-900"
                  }`}
                >
                  {isActive && (
                    <div className="absolute top-0 left-0 right-0 h-1 bg-[#9E1B32]" />
                  )}
                  <span className="block text-[11px] font-bold uppercase tracking-wider text-[#DDA743] mb-1">
                    {pillar.tag}
                  </span>
                  <span className="block font-bold text-sm sm:text-base text-[#1F1A1B]">
                    {pillar.title}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Active Pillar Content Display */}
          <div className="p-6 sm:p-10">
            {distinctionPillars.map((pillar, idx) => {
              if (activePillar !== idx) return null;
              return (
                <div
                  key={pillar.id}
                  className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center animate-in fade-in duration-200"
                >
                  <MotionReveal direction="left" delay={0.1} className="lg:col-span-7 space-y-4">
                    <div className="flex items-center gap-2">
                      <Badge variant="maroon" size="sm">
                        {pillar.badgeText}
                      </Badge>
                      <span className="text-xs text-stone-500 font-medium">
                        Standardised Curriculum Excellence
                      </span>
                    </div>

                    <h3 className="font-editorial text-xl sm:text-2xl lg:text-3xl font-bold text-[#1F1A1B]">
                      {pillar.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#5C5556] leading-relaxed">
                      {pillar.subtitle}
                    </p>

                    <div className="pt-2 space-y-3">
                      {pillar.points.map((pt, pIdx) => (
                        <div key={pIdx} className="flex items-start gap-3">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          <span className="text-xs sm:text-sm text-slate-700 leading-snug">
                            {pt}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="pt-4 flex flex-wrap items-center gap-3">
                      {onOpenEnquiry && (
                        <button
                          onClick={() => onOpenEnquiry(pillar.actionLevel)}
                          className="px-4 py-2.5 rounded-lg bg-[#9E1B32] text-white text-xs sm:text-sm font-bold hover:bg-[#801426] transition-colors shadow-xs flex items-center gap-1.5 cursor-pointer"
                        >
                          <span>Enquire for {pillar.badgeText}</span>
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      )}
                      <a
                        href="#streams"
                        className="px-4 py-2.5 rounded-lg bg-[#FCFAF7] border border-[#E8DFD7] text-slate-800 text-xs sm:text-sm font-medium hover:bg-[#F4EFEA] transition-colors"
                      >
                        Explore Streams &amp; Subjects
                      </a>
                    </div>
                  </MotionReveal>

                  {/* Right Institutional Callout Box */}
                  <MotionReveal direction="right" delay={0.15} className="lg:col-span-5">
                    <div className="p-6 rounded-2xl bg-gradient-to-br from-[#9E1B32]/5 via-amber-500/5 to-transparent border border-[#9E1B32]/15 space-y-4">
                      <div className="flex items-center gap-2 text-[#9E1B32] font-crest text-xs font-bold uppercase tracking-wider">
                        <Award className="w-4 h-4 text-[#DDA743]" />
                        <span>The Gurukul Advantage</span>
                      </div>
                      <blockquote className="font-editorial text-base sm:text-lg italic text-[#1F1A1B] leading-relaxed">
                        &ldquo;{COLLEGE_CONFIG.motto}&rdquo;
                      </blockquote>
                      <p className="text-xs text-[#5C5556] leading-relaxed">
                        Knowledge is the greatest wealth. Every student at Gurukul receives structured guidance designed not just to clear examinations, but to secure top rank distinctions under the Maharashtra State Board.
                      </p>
                      <div className="pt-2 border-t border-[#E8DFD7] flex items-center justify-between text-xs text-stone-600">
                        <span className="font-semibold text-slate-800">SSC &amp; HSC Faculty Council</span>
                        <span className="text-[#9E1B32] font-bold">2026–27 Academic Cycle</span>
                      </div>
                    </div>
                  </MotionReveal>
                </div>
              );
            })}
          </div>
        </MotionReveal>
      </div>
    </section>
  );
}
