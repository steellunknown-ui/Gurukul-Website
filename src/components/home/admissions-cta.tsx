import React from "react";
import { ArrowRight, GraduationCap, BookOpen } from "lucide-react";
import { COLLEGE_CONFIG } from "@/config/college-config";
import { AdmissionClassLevel } from "@/components/home/enquiry-modal";
import { MotionReveal } from "@/components/ui/motion-reveal";

interface AdmissionsCtaProps {
  onOpenEnquiry: (classLevel?: AdmissionClassLevel) => void;
}

export function AdmissionsCta({ onOpenEnquiry }: AdmissionsCtaProps) {
  return (
    <section
      id="admissions"
      className="scroll-mt-20 sm:scroll-mt-24 py-12 sm:py-20 bg-[#FCFAF7] border-b border-[#E8DFD7] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden bg-gradient-to-br from-[#9E1B32] via-[#7A1224] to-[#4E0B19] text-[#FCFAF7] rounded-2xl sm:rounded-3xl border border-[#DDA743]/40 shadow-2xl p-5 sm:p-10 lg:p-14">
          {/* Subtle Background Pattern */}
          <div
            className="absolute -right-10 -bottom-10 opacity-5 select-none pointer-events-none"
            aria-hidden="true"
          >
            <svg width="400" height="400" viewBox="0 0 100 100" fill="#FFFFFF">
              <path d="M50 6 L86 18 C86 52 74 78 50 94 C26 78 14 52 14 18 L50 6 Z" />
            </svg>
          </div>

          <div className="relative z-10 max-w-3xl mx-auto text-center space-y-4 sm:space-y-6">
            <MotionReveal direction="down" className="space-y-4">
              <span className="inline-flex items-center gap-2 px-3 sm:px-3.5 py-1 rounded-full bg-[#DDA743]/20 border border-[#DDA743]/40 text-[#DFBA73] text-[11px] sm:text-xs font-crest tracking-widest uppercase">
                Admissions Open 2026–27 • Jr. KG to Std XII
              </span>

              <h2 className="font-editorial text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
                Begin Your Child&apos;s Academic Journey at Gurukul.
              </h2>

              <p className="text-xs sm:text-base text-stone-200 leading-relaxed max-w-2xl mx-auto">
                Admissions open for Pre-Primary &amp; Primary School (Jr. KG to Std 10th SSC), alongside Junior College Class XI (FYJC) across Science, Commerce &amp; Arts, and lateral Class XII (SYJC) transfers.
              </p>
            </MotionReveal>

            {/* Step-by-Step Flow Preview: Left from left, middle from up/bottom, right from right */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3 pt-1 sm:pt-2 text-left">
              <MotionReveal direction="left" delay={0.15} hoverLift={true}>
                <div className="h-full p-3 sm:p-3.5 rounded-xl bg-black/25 border border-white/10 space-y-1 hover:border-[#DDA743] hover:shadow-xl hover:-translate-y-2 transition-all duration-300 cursor-pointer">
                  <span className="text-[10px] font-mono text-[#DFBA73] uppercase block font-bold">
                    Step 01
                  </span>
                  <span className="text-xs font-bold text-white block">
                    Online Inquiry &amp; Standard Choice
                  </span>
                  <span className="text-[11px] text-stone-300 block leading-tight">
                    Choose School (Jr. KG–10th) or College stream (XI/XII).
                  </span>
                </div>
              </MotionReveal>

              <MotionReveal direction="up" delay={0.2} hoverLift={true}>
                <div className="h-full p-3.5 rounded-xl bg-black/25 border border-white/10 space-y-1 hover:border-[#DDA743] hover:shadow-xl hover:-translate-y-2 transition-all duration-300 cursor-pointer">
                  <span className="text-[10px] font-mono text-[#DFBA73] uppercase block font-bold">
                    Step 02
                  </span>
                  <span className="text-xs font-bold text-white block">
                    Campus Visit &amp; Interaction
                  </span>
                  <span className="text-[11px] text-stone-300 block leading-tight">
                    Meet teachers, view science labs, and understand pedagogy.
                  </span>
                </div>
              </MotionReveal>

              <MotionReveal direction="right" delay={0.25} hoverLift={true}>
                <div className="h-full p-3.5 rounded-xl bg-black/25 border border-white/10 space-y-1 hover:border-[#DDA743] hover:shadow-xl hover:-translate-y-2 transition-all duration-300 cursor-pointer">
                  <span className="text-[10px] font-mono text-[#DFBA73] uppercase block font-bold">
                    Step 03
                  </span>
                  <span className="text-xs font-bold text-white block">
                    Document &amp; Fee Voucher
                  </span>
                  <span className="text-[11px] text-stone-300 block leading-tight">
                    Confirm seat with verified standard-wise fee schedule.
                  </span>
                </div>
              </MotionReveal>
            </div>

            {/* Primary Action Buttons: School, Class XI & Class XII */}
            <MotionReveal direction="up" delay={0.3} className="pt-3 sm:pt-4 flex flex-col sm:flex-row items-center justify-center gap-2.5 sm:gap-3.5 w-full">
              <button
                type="button"
                onClick={() => onOpenEnquiry("School")}
                className="w-full sm:w-auto min-h-[44px] inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-3 rounded-xl font-bold text-xs xs:text-sm sm:text-base bg-[#DDA743] hover:bg-[#E8B558] text-slate-950 shadow-lg hover:shadow-xl transition-all cursor-pointer active:scale-95"
              >
                <BookOpen className="w-4 h-4 text-slate-950 shrink-0" />
                <span>Apply for School (Jr. KG – 10th)</span>
              </button>

              <button
                type="button"
                onClick={() => onOpenEnquiry("XI")}
                className="w-full sm:w-auto min-h-[44px] inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-3 rounded-xl font-bold text-xs xs:text-sm sm:text-base bg-white/10 hover:bg-white/20 text-white border border-[#DDA743]/70 hover:border-[#DDA743] shadow-md transition-all cursor-pointer active:scale-95 backdrop-blur-sm"
              >
                <GraduationCap className="w-4 h-4 text-[#DDA743] shrink-0" />
                <span>Apply for Class XI (FYJC)</span>
              </button>

              <button
                type="button"
                onClick={() => onOpenEnquiry("XII")}
                className="w-full sm:w-auto min-h-[44px] inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-3 rounded-xl font-bold text-xs xs:text-sm sm:text-base bg-white/10 hover:bg-white/20 text-white border border-white/30 hover:border-white/60 shadow-md transition-all cursor-pointer active:scale-95 backdrop-blur-sm"
              >
                <GraduationCap className="w-4 h-4 text-[#DDA743] shrink-0" />
                <span>Apply for Class XII (SYJC)</span>
              </button>
            </MotionReveal>

            {/* Sub-row: Circulars Link */}
            <div className="pt-1 sm:pt-2 flex items-center justify-center">
              <a
                href="#notices"
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm text-stone-200 hover:text-[#DDA743] transition-colors py-1 px-3 rounded-md hover:bg-white/5"
              >
                <span>View Official Admission Circulars &amp; Schedules</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#DDA743]" />
              </a>
            </div>

            <div className="pt-1 text-[11px] text-stone-300">
              Admission Helpline: <span className="font-mono text-[#DFBA73] font-bold">{COLLEGE_CONFIG.contact.admissionPhone}</span> • Office Desk Open Mon–Sat
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
