"use client";

import React, { useState } from "react";
import { COLLEGE_CONFIG } from "@/config/college-config";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Atom,
  TrendingUp,
  BookOpen,
  CheckCircle,
  GraduationCap,
  ArrowRight,
} from "lucide-react";
import { MotionReveal } from "@/components/ui/motion-reveal";

interface StreamsExplorerProps {
  onOpenEnquiry: (streamId: string) => void;
}

export function StreamsExplorer({ onOpenEnquiry }: StreamsExplorerProps) {
  const [activeStreamId, setActiveStreamId] = useState("science");

  const activeStream =
    COLLEGE_CONFIG.academicStreams.find((s) => s.id === activeStreamId) ||
    COLLEGE_CONFIG.academicStreams[0];

  const getStreamIcon = (id: string) => {
    switch (id) {
      case "science":
        return <Atom className="w-4 h-4" />;
      case "commerce":
        return <TrendingUp className="w-4 h-4" />;
      case "arts":
        return <BookOpen className="w-4 h-4" />;
      default:
        return <GraduationCap className="w-4 h-4" />;
    }
  };

  return (
    <section
      id="streams"
      className="scroll-mt-20 sm:scroll-mt-24 py-12 sm:py-20 bg-[#FCFAF7] border-b border-[#E8DFD7] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <MotionReveal direction="down" className="max-w-3xl mx-auto text-center space-y-2.5 mb-8 sm:mb-12">
          <Badge variant="gold" size="sm">
            Standards XI &amp; XII Curriculum
          </Badge>
          <h2 className="font-editorial text-2xl xs:text-3xl sm:text-4xl font-bold tracking-tight text-[#1F1A1B] leading-tight">
            Academic Streams &amp; <span className="text-[#9E1B32]">Junior College Wings</span>
          </h2>
          <p className="text-xs sm:text-base text-[#5C5556] leading-relaxed">
            Every stream at Gurukul combines Maharashtra State Board depth with dedicated practical laboratory hours, unit test series, and faculty mentorship.
          </p>
        </MotionReveal>

        {/* Stream Selector Tabs */}
        <MotionReveal direction="up" delay={0.1} className="flex justify-center mb-6 sm:mb-8">
          <div
            role="tablist"
            aria-label="Academic stream choices"
            className="inline-flex p-1 sm:p-1.5 rounded-xl bg-[#F4EFEA] border border-[#E8DFD7] max-w-full overflow-x-auto shadow-inner snap-x"
          >
            {COLLEGE_CONFIG.academicStreams.map((stream) => {
              const isActive = stream.id === activeStreamId;
              return (
                <button
                  key={stream.id}
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={`panel-${stream.id}`}
                  id={`tab-${stream.id}`}
                  onClick={() => setActiveStreamId(stream.id)}
                  className={`inline-flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-6 py-2 sm:py-2.5 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer whitespace-nowrap shrink-0 snap-start ${
                    isActive
                      ? "bg-[#9E1B32] text-[#FCFAF7] shadow-sm font-bold"
                      : "text-[#5C5556] hover:text-[#1F1A1B] hover:bg-white/60"
                  }`}
                >
                  {getStreamIcon(stream.id)}
                  <span>{stream.name}</span>
                </button>
              );
            })}
          </div>
        </MotionReveal>

        {/* Active Stream Panel */}
        <div
          role="tabpanel"
          id={`panel-${activeStream.id}`}
          aria-labelledby={`tab-${activeStream.id}`}
          className="bg-white border border-[#E8DFD7] rounded-2xl sm:rounded-3xl p-4 sm:p-8 shadow-lg space-y-6 sm:space-y-8"
        >
          {/* Top Banner of Active Stream */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#E8DFD7] pb-5 sm:pb-6">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Badge variant="maroon" size="sm">
                  {activeStream.badge}
                </Badge>
                <span className="text-xs text-[#5C5556] font-mono">Standards XI &amp; XII</span>
              </div>
              <h3 className="font-editorial text-xl sm:text-3xl font-bold text-[#1F1A1B] leading-snug">
                {activeStream.name}
              </h3>
              <p className="font-editorial italic text-xs sm:text-base text-[#9E1B32]">
                {activeStream.tagline}
              </p>
            </div>

            <Button
              variant="gold"
              size="md"
              className="w-full sm:w-auto gap-2 shrink-0 font-semibold justify-center"
              onClick={() => onOpenEnquiry(activeStream.id)}
            >
              <GraduationCap className="w-4 h-4 text-slate-950 shrink-0" />
              <span>Enquire for {activeStream.name.replace(" Stream", "")}</span>
            </Button>
          </div>

          {/* Overview Paragraph */}
          <p className="text-xs sm:text-base text-[#5C5556] leading-relaxed">
            {activeStream.overview}
          </p>

          {/* Detailed 3-Column Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 pt-2">
            {/* 1. Left Card: Subject Combinations (enters from left) */}
            <MotionReveal direction="left" delay={0.15} hoverLift={true} className="h-full">
              <div className="h-full p-4 sm:p-5 rounded-xl sm:rounded-2xl bg-[#FCFAF7] border border-[#E8DFD7] space-y-3.5 sm:space-y-4 hover:border-[#DDA743] hover:shadow-xl hover:-translate-y-2 transition-all duration-300 cursor-pointer">
                <h4 className="font-crest text-xs uppercase tracking-wider text-[#9E1B32] font-bold border-b border-[#E8DFD7] pb-2">
                  Subject Combinations
                </h4>
                <div className="space-y-3">
                  <div>
                    <span className="text-[11px] font-semibold text-[#1F1A1B] uppercase tracking-wider block mb-1.5">
                      Core Curriculum:
                    </span>
                    <ul className="space-y-1.5 text-xs text-[#5C5556]">
                      {activeStream.coreSubjects.map((subj, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle className="w-3.5 h-3.5 text-[#9E1B32] shrink-0 mt-0.5" />
                          <span className="leading-snug">{subj}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-2 border-t border-[#E8DFD7]">
                    <span className="text-[11px] font-semibold text-[#1F1A1B] uppercase tracking-wider block mb-1.5">
                      Electives / Bifocal Options:
                    </span>
                    <ul className="space-y-1.5 text-xs text-[#5C5556]">
                      {activeStream.electiveSubjects.map((subj, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#DDA743] shrink-0 mt-1.5" />
                          <span className="leading-snug">{subj}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </MotionReveal>

            {/* 2. Middle Card: Academic & Laboratory Highlights (enters from bottom/up) */}
            <MotionReveal direction="up" delay={0.2} hoverLift={true} className="h-full">
              <div className="h-full p-4 sm:p-5 rounded-xl sm:rounded-2xl bg-[#FCFAF7] border border-[#E8DFD7] space-y-3.5 sm:space-y-4 hover:border-[#DDA743] hover:shadow-xl hover:-translate-y-2 transition-all duration-300 cursor-pointer">
                <h4 className="font-crest text-xs uppercase tracking-wider text-[#9E1B32] font-bold border-b border-[#E8DFD7] pb-2">
                  Academic &amp; Laboratory Highlights
                </h4>
                <p className="text-xs text-[#5C5556] leading-relaxed">
                  Structured academic components designed for maximum board marks and practical skill acquisition:
                </p>
                <ul className="space-y-2 text-xs text-[#1F1A1B] font-medium">
                  {activeStream.academicHighlights?.map((item, idx) => (
                    <li
                      key={idx}
                      className="p-2 sm:p-2.5 rounded-lg bg-white border border-[#E8DFD7] flex items-center justify-between text-xs"
                    >
                      <span>{item}</span>
                      <Badge variant="gold" size="sm">
                        Academic Wing
                      </Badge>
                    </li>
                  ))}
                </ul>
                <div className="text-[10.5px] sm:text-[11px] text-[#5C5556] italic pt-1">
                  Regular unit tests and 3 preliminary board examination rounds are conducted annually.
                </div>
              </div>
            </MotionReveal>

            {/* 3. Right Card: Future University Pathways (enters from right) */}
            <MotionReveal direction="right" delay={0.25} hoverLift={true} className="h-full">
              <div className="h-full p-4 sm:p-5 rounded-xl sm:rounded-2xl bg-[#FCFAF7] border border-[#E8DFD7] space-y-3.5 sm:space-y-4 hover:border-[#DDA743] hover:shadow-xl hover:-translate-y-2 transition-all duration-300 cursor-pointer">
                <h4 className="font-crest text-xs uppercase tracking-wider text-[#9E1B32] font-bold border-b border-[#E8DFD7] pb-2">
                  Future University Pathways
                </h4>
                <p className="text-xs text-[#5C5556] leading-relaxed">
                  Destinations typically pursued by graduates completing this stream:
                </p>
                <ul className="space-y-2 text-xs text-[#5C5556]">
                  {activeStream.careerPathways.map((career, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <ArrowRight className="w-3.5 h-3.5 text-[#DDA743] shrink-0 mt-0.5" />
                      <span className="font-medium text-[#1F1A1B] leading-snug">{career}</span>
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
