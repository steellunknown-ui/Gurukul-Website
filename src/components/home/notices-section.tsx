import React from "react";
import { COLLEGE_CONFIG } from "@/config/college-config";
import { Badge } from "@/components/ui/badge";
import { Calendar, ChevronRight, FileText, ShieldCheck } from "lucide-react";
import { MotionReveal } from "@/components/ui/motion-reveal";

interface NoticesSectionProps {
  onOpenNoticeDrawer?: () => void;
}

export function NoticesSection({ onOpenNoticeDrawer }: NoticesSectionProps) {
  return (
    <section
      id="notices"
      className="scroll-mt-20 sm:scroll-mt-24 py-12 sm:py-20 bg-[#FFFFFF] border-b border-[#E8DFD7] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <MotionReveal direction="down" className="flex flex-col md:flex-row md:items-end justify-between gap-3 sm:gap-4 mb-8 sm:mb-12">
          <div className="space-y-2">
            <Badge variant="maroon" size="sm">
              Official Institutional Bulletin
            </Badge>
            <h2 className="font-editorial text-2xl xs:text-3xl sm:text-4xl font-bold tracking-tight text-[#1F1A1B] leading-tight">
              Notices &amp; Admission Circulars
            </h2>
            <p className="text-xs sm:text-base text-[#5C5556] max-w-xl leading-relaxed">
              Official circulars, cut-off advisories, and Class XI &amp; XII enrollment notifications certified by the administration.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            {onOpenNoticeDrawer && (
              <button
                type="button"
                onClick={onOpenNoticeDrawer}
                className="px-3.5 py-2 rounded-lg bg-[#9E1B32] text-white text-xs font-bold hover:bg-[#801426] transition-colors flex items-center gap-1.5 shadow-xs cursor-pointer"
              >
                <FileText className="w-3.5 h-3.5 text-[#DFBA73]" />
                <span>Open Notice Panel</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            )}
            <div className="flex items-center gap-2 p-2 sm:p-2.5 rounded-lg bg-[#9E1B32]/10 border border-[#9E1B32]/20 text-[#9E1B32] text-xs font-semibold shrink-0">
              <ShieldCheck className="w-4 h-4 text-[#9E1B32] shrink-0" />
              <span>Certified Liaison Desk</span>
            </div>
          </div>
        </MotionReveal>

        {/* Notices Cards List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
          {COLLEGE_CONFIG.notices.map((notice, idx) => (
            <MotionReveal
              key={notice.id}
              direction={idx % 2 === 0 ? "left" : "right"}
              delay={0.1 + (idx % 2) * 0.1}
              hoverLift={true}
              className="h-full"
            >
              <article
                className="h-full bg-[#FCFAF7] border border-slate-200/90 rounded-xl sm:rounded-2xl p-4 sm:p-6 transition-all duration-300 hover:border-[#DDA743] hover:shadow-xl hover:-translate-y-2 flex flex-col justify-between cursor-pointer group"
              >
              <div className="space-y-3">
                {/* Meta row: Category & Date */}
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-[10px] sm:text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                        notice.category === "Admissions"
                          ? "bg-[#9E1B32] text-white"
                          : notice.category === "Circular"
                          ? "bg-[#DDA743]/25 text-[#9E1B32] border border-[#DDA743]/50 font-bold"
                          : "bg-[#F4EFEA] text-[#1F1A1B] border border-[#E8DFD7]"
                      }`}
                    >
                      {notice.category}
                    </span>
                    {notice.isUrgent && (
                      <span className="text-[10px] font-bold text-red-700 bg-red-100 px-2 py-0.5 rounded">
                        Urgent
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-1.5 text-xs text-[#5C5556]">
                    <Calendar className="w-3.5 h-3.5 text-[#DDA743]" />
                    <span className="text-[11px] sm:text-xs font-medium">{notice.date}</span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="font-editorial text-base sm:text-xl font-bold text-[#1F1A1B] leading-snug">
                  {notice.title}
                </h3>

                {/* Summary */}
                <p className="text-xs sm:text-sm text-[#5C5556] leading-relaxed">
                  {notice.summary}
                </p>
              </div>

              {/* Footer action link */}
              <div className="mt-4 sm:mt-5 pt-3 border-t border-[#E8DFD7] flex items-center justify-between">
                <span className="text-[10px] font-mono text-stone-500 font-medium">
                  REF: {notice.id.toUpperCase()}
                </span>
                {onOpenNoticeDrawer ? (
                  <button
                    type="button"
                    onClick={onOpenNoticeDrawer}
                    className="inline-flex items-center gap-1 text-xs font-bold text-[#9E1B32] hover:text-[#BA203B] transition-colors cursor-pointer"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>View Notice</span>
                    <ChevronRight className="w-3 h-3" />
                  </button>
                ) : (
                  <a
                    href={notice.href || "#admissions"}
                    className="inline-flex items-center gap-1 text-xs font-bold text-[#9E1B32] hover:text-[#BA203B] transition-colors"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>View Notice</span>
                    <ChevronRight className="w-3 h-3" />
                  </a>
                )}
              </div>
            </article>
          </MotionReveal>
        ))}
      </div>
      </div>
    </section>
  );
}
