import React from "react";
import { COLLEGE_CONFIG } from "@/config/college-config";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, AlertCircle } from "lucide-react";
import { MotionReveal, RevealDirection } from "@/components/ui/motion-reveal";
import { AnimatedCounter } from "@/components/ui/animated-counter";

export function Highlights() {
  const getHighlightDirection = (idx: number): RevealDirection => {
    if (idx === 0) return "left";
    if (idx === 3) return "right";
    return "up";
  };

  return (
    <section
      id="highlights"
      className="py-12 sm:py-20 bg-[#FFFFFF] border-b border-[#E8DFD7] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <MotionReveal direction="down" className="max-w-2xl mx-auto text-center space-y-2.5 mb-10 sm:mb-14">
          <Badge variant="maroon" size="sm">
            Institutional Strengths &amp; Credibility
          </Badge>
          <h2 className="font-editorial text-2xl xs:text-3xl sm:text-4xl font-bold tracking-tight text-[#1F1A1B] leading-tight">
            Nurturing Excellence from <span className="text-[#9E1B32]">Jr. KG to Class XII</span>
          </h2>
          <p className="text-xs sm:text-base text-[#5C5556] leading-relaxed">
            A values-rooted educational continuum under the Maharashtra State Board — delivering joyful foundational literacy, continuous 99.9% board passing track record, and premier Higher Secondary streams.
          </p>
        </MotionReveal>

        {/* Statutory Affiliation & Government Accreditation Banner */}
        <MotionReveal direction="up" delay={0.1} className="mb-8 sm:mb-12 p-3.5 sm:p-5 rounded-xl sm:rounded-2xl bg-gradient-to-r from-[#9E1B32]/10 via-[#DDA743]/15 to-[#9E1B32]/10 border border-[#9E1B32]/20 shadow-xs">
          <div className="flex flex-col md:flex-row items-center justify-between gap-3 sm:gap-4 text-center md:text-left">
            <div className="space-y-1">
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-1.5 sm:gap-2">
                <span className="px-2 py-0.5 rounded text-[10px] sm:text-[11px] font-bold bg-[#9E1B32] text-white uppercase tracking-wider">
                  Govt. of Maharashtra Registered
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] sm:text-[11px] font-semibold bg-[#DDA743]/30 text-[#6B1124]">
                  Est. 2016–17
                </span>
                <span className="text-xs font-serif font-bold text-[#9E1B32]">
                  ॥ विद्या धनम् ॥
                </span>
              </div>
              <h3 className="font-editorial text-base sm:text-xl font-bold text-slate-900">
                BHAGWAT PRASAD GURUKUL EDUCATIONAL TRUST&apos;S
              </h3>
              <p className="text-[11px] sm:text-sm text-slate-700 font-medium">
                GURUKUL VIDYAPEETH ENGLISH HIGH SCHOOL &amp; JR. COLLEGE (Higher Secondary / Self Finance)
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 shrink-0 w-full sm:w-auto">
              <div className="flex-1 sm:flex-initial px-3 sm:px-4 py-2 rounded-xl bg-white border border-slate-200/90 shadow-2xs text-center min-w-[120px]">
                <span className="block text-[9.5px] uppercase font-bold text-slate-500 tracking-wider">
                  State Board Index
                </span>
                <span className="font-mono text-sm sm:text-base font-bold text-[#9E1B32]">
                  J-15.14.086
                </span>
              </div>
              <div className="flex-1 sm:flex-initial px-3 sm:px-4 py-2 rounded-xl bg-white border border-slate-200/90 shadow-2xs text-center min-w-[140px]">
                <span className="block text-[9.5px] uppercase font-bold text-slate-500 tracking-wider">
                  Registration Ref.
                </span>
                <span className="font-mono text-xs sm:text-sm font-bold text-slate-800">
                  28903-97/DI-15/11/2016
                </span>
              </div>
            </div>
          </div>
        </MotionReveal>

        {/* Highlights Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {COLLEGE_CONFIG.highlights.map((item, idx) => (
            <MotionReveal
              key={item.id}
              direction={getHighlightDirection(idx)}
              delay={0.1 + idx * 0.1}
              hoverLift={true}
              className="h-full"
            >
              <div className="h-full relative bg-[#FCFAF7] border border-slate-200/90 rounded-xl sm:rounded-2xl p-4 sm:p-6 transition-all duration-300 hover:border-[#DDA743] hover:shadow-xl hover:-translate-y-2.5 flex flex-col justify-between cursor-pointer group">
                <div className="space-y-3 sm:space-y-4">
                  {/* Metric / Flag Badge */}
                  <div className="flex items-center justify-between">
                    <span className="font-crest text-base sm:text-xl font-bold text-[#9E1B32] group-hover:text-[#BA203B] transition-colors">
                      <AnimatedCounter rawText={item.metric} duration={2.0} />
                    </span>
                    <span className="inline-flex items-center gap-1 text-[10px] sm:text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      Verified
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-editorial text-lg sm:text-xl font-bold text-[#1F1A1B] leading-snug">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-[#5C5556] leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Status Note */}
                {item.statusNote && (
                  <div className="mt-3 sm:mt-4 pt-2.5 sm:pt-3 border-t border-[#E8DFD7] text-[10.5px] sm:text-[11px] text-slate-500 font-medium">
                    {item.statusNote}
                  </div>
                )}
              </div>
            </MotionReveal>
          ))}
        </div>

        {/* Editorial Footnote */}
        <MotionReveal direction="up" delay={0.4} className="mt-8 sm:mt-10 p-3.5 sm:p-4 rounded-xl bg-[#F4EFEA] border border-[#E8DFD7] text-xs text-[#5C5556] text-center max-w-2xl mx-auto">
          <strong>Institutional Integrity Note:</strong> Gurukul Vidyapeeth strictly reports only verified academic frameworks. Factual Board distinction ratios and competitive examination selections are published in accordance with certified Maharashtra State Board records.
        </MotionReveal>
      </div>
    </section>
  );
}
