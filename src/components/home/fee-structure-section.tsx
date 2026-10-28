"use client";

import React, { useState } from "react";
import { COLLEGE_CONFIG } from "@/config/college-config";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ShieldCheck,
  CreditCard,
  Users2,
  ReceiptText,
  GraduationCap,
  BookOpen,
  ArrowRight,
  CheckCircle2,
  Calendar,
  Sparkles,
  Phone,
  FileText,
} from "lucide-react";

interface FeeStructureSectionProps {
  onOpenFeeModal: (standardId: string) => void;
}

type AcademicWingId = "pre-primary" | "primary" | "secondary" | "junior-college";

interface AcademicWing {
  id: AcademicWingId;
  title: string;
  subtitle: string;
  gradeBadge: string;
  icon: typeof GraduationCap;
  filter: (standardId: string) => boolean;
}

const ACADEMIC_WINGS: AcademicWing[] = [
  {
    id: "pre-primary",
    title: "Pre-Primary Wing",
    subtitle: "Nursery, Jr. KG & Sr. KG",
    gradeBadge: "Ages 3 to 5",
    icon: Sparkles,
    filter: (id) => ["nursery", "jr-kg", "sr-kg"].includes(id),
  },
  {
    id: "primary",
    title: "Primary School",
    subtitle: "Standards 1st to 5th",
    gradeBadge: "English Medium",
    icon: BookOpen,
    filter: (id) => ["std-1", "std-2", "std-3", "std-4", "std-5"].includes(id),
  },
  {
    id: "secondary",
    title: "Secondary Section",
    subtitle: "Standards 6th to 10th",
    gradeBadge: "SSC Board Track",
    icon: ShieldCheck,
    filter: (id) => ["std-6", "std-7", "std-8", "std-9", "std-10"].includes(id),
  },
  {
    id: "junior-college",
    title: "Junior College",
    subtitle: "Classes XI & XII (FYJC / SYJC)",
    gradeBadge: "Science, Commerce & Arts",
    icon: GraduationCap,
    filter: (id) => id.startsWith("fyjc") || id.startsWith("syjc"),
  },
];

export function FeeStructureSection({ onOpenFeeModal }: FeeStructureSectionProps) {
  const [activeWing, setActiveWing] = useState<AcademicWingId>("secondary");

  const formatINR = (amt: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amt);
  };

  const selectedWingConfig = ACADEMIC_WINGS.find((w) => w.id === activeWing) || ACADEMIC_WINGS[2];
  const activeGrades = COLLEGE_CONFIG.feeSchedule.filter((item) =>
    selectedWingConfig.filter(item.standardId)
  );

  return (
    <section id="fees" className="py-14 sm:py-24 bg-[#FAF7F2] border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-14">
        
        {/* 1. SECTION INTRO HEADER */}
        <div className="max-w-3xl mx-auto text-center space-y-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold bg-[#9E1B32]/10 text-[#9E1B32] border border-[#9E1B32]/20 uppercase tracking-widest">
            Parent Transparency Desk • AY 2026–2027
          </span>
          <h2 className="font-editorial text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 leading-tight">
            Academic Schedule &amp; <span className="text-[#9E1B32]">Fee Transparency Portal</span>
          </h2>
          <p className="text-xs sm:text-base text-slate-600 leading-relaxed max-w-2xl mx-auto">
            Governed by Bhagwat Prasad Gurukul Educational Trust, our fee architecture is completely transparent with zero capitation, zero donation, and zero mid-term surprise levies.
          </p>
        </div>

        {/* 2. INSTITUTIONAL PARENT FEE CHARTER (Replaces generic 4 SaaS cards with an authoritative collegiate policy document) */}
        <div className="bg-white rounded-2xl border border-stone-300/80 shadow-sm overflow-hidden">
          {/* Charter Header Ribbon */}
          <div className="bg-gradient-to-r from-[#1A080C] via-[#350C14] to-[#1A080C] text-white px-5 sm:px-8 py-4 sm:py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#4E0B19]">
            <div className="space-y-0.5">
              <span className="text-[10px] uppercase font-crest tracking-widest text-amber-300 font-bold block">
                BHAGWAT PRASAD GURUKUL EDUCATIONAL TRUST
              </span>
              <h3 className="font-editorial text-lg sm:text-xl font-bold text-white tracking-wide">
                Institutional Fee Charter &amp; Parent Guarantees
              </h3>
            </div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#4E0B19] text-amber-300 text-[10.5px] font-mono border border-amber-300/30 w-fit">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-300" />
              Index: J-15.14.086 • Govt. Reg.
            </span>
          </div>

          {/* 4 Pillars Unified Institutional Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-stone-200">
            {/* Pillar 1 */}
            <div className="p-5 sm:p-6 space-y-2.5">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-[#9E1B32]/10 text-[#9E1B32] flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#9E1B32]">
                  Composite Tuition
                </span>
              </div>
              <h4 className="font-bold text-sm text-slate-900 leading-snug">Zero Hidden Levies</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Tuition covers all classroom learning, experimental laboratories, computer terminals, and library access with zero hidden bills.
              </p>
            </div>

            {/* Pillar 2 */}
            <div className="p-5 sm:p-6 space-y-2.5">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-[#C5A059]/15 text-[#9E1B32] flex items-center justify-center shrink-0">
                  <CreditCard className="w-4 h-4 text-[#8A6A23]" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#8A6A23]">
                  Term Installments
                </span>
              </div>
              <h4 className="font-bold text-sm text-slate-900 leading-snug">Flexible Schedules</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Convenient 2-term schedule (June &amp; November) or 4 quarterly installment options designed to assist working parents.
              </p>
            </div>

            {/* Pillar 3 */}
            <div className="p-5 sm:p-6 space-y-2.5">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                  <Users2 className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700">
                  Family Benefit
                </span>
              </div>
              <h4 className="font-bold text-sm text-slate-900 leading-snug">Sibling Concessions</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Special tuition fee concession granted for families with two or more siblings concurrently enrolled at Gurukul Vidyapeeth.
              </p>
            </div>

            {/* Pillar 4 */}
            <div className="p-5 sm:p-6 space-y-2.5">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-[#0B1E3F]/10 text-[#0B1E3F] flex items-center justify-center shrink-0">
                  <ReceiptText className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#0B1E3F]">
                  Official Voucher
                </span>
              </div>
              <h4 className="font-bold text-sm text-slate-900 leading-snug">Printable Voucher Slip</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Download and print an authenticated fee voucher slip complete with official institutional seal and reference index number.
              </p>
            </div>
          </div>
        </div>

        {/* 3. SEGMENTED ACADEMIC WINGS (Replaces the 16 repetitive locked boxes) */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-300 pb-3">
            <div>
              <h3 className="font-crest text-base sm:text-lg font-bold text-slate-900 uppercase tracking-wide">
                Select Academic Division to Explore Grades
              </h3>
              <p className="text-xs text-slate-500">
                Choose an educational wing below to inspect standard-wise breakdowns and download official fee slips.
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs text-stone-500 font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>Admissions Active 2026–27</span>
            </div>
          </div>

          {/* Segmented Wing Tabs Bar */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3">
            {ACADEMIC_WINGS.map((wing) => {
              const isSelected = wing.id === activeWing;
              const Icon = wing.icon;
              return (
                <button
                  key={wing.id}
                  onClick={() => setActiveWing(wing.id)}
                  className={`text-left p-3.5 sm:p-4 rounded-xl border transition-all cursor-pointer relative ${
                    isSelected
                      ? "bg-white border-[#9E1B32] shadow-md ring-2 ring-[#9E1B32]/15"
                      : "bg-white/70 hover:bg-white border-stone-200/90 text-stone-600 hover:text-slate-900"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span
                      className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                        isSelected
                          ? "bg-[#9E1B32] text-white"
                          : "bg-stone-100 text-stone-600"
                      }`}
                    >
                      {wing.gradeBadge}
                    </span>
                    <Icon
                      className={`w-4 h-4 ${
                        isSelected ? "text-[#9E1B32]" : "text-stone-400"
                      }`}
                    />
                  </div>
                  <h4
                    className={`font-crest font-bold text-xs sm:text-sm ${
                      isSelected ? "text-[#9E1B32]" : "text-slate-800"
                    }`}
                  >
                    {wing.title}
                  </h4>
                  <p className="text-[11px] text-stone-500 line-clamp-1">{wing.subtitle}</p>
                </button>
              );
            })}
          </div>

          {/* Active Wing Standards Grid: Clear, Spacious, Human Cards without Lock Icons */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4 pt-2">
            {activeGrades.map((grade) => (
              <div
                key={grade.standardId}
                className="bg-white rounded-xl border border-stone-200 hover:border-[#9E1B32]/50 p-4 sm:p-5 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between group space-y-4"
              >
                {/* Grade Header */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] font-mono font-semibold text-stone-500 uppercase">
                      {grade.classesLabel.split("•")[0]}
                    </span>
                    <span className="text-[10px] font-semibold text-[#8A6A23] bg-amber-50 px-2 py-0.5 rounded border border-amber-200/60">
                      AY 2026–27
                    </span>
                  </div>
                  <h4 className="font-bold text-sm sm:text-base text-slate-900 group-hover:text-[#9E1B32] transition-colors leading-snug">
                    {grade.standardName}
                  </h4>
                  <p className="text-[11px] text-stone-500 leading-relaxed">
                    {grade.inclusions.slice(0, 2).join(" • ")}
                  </p>
                </div>

                {/* Fee Preview & Breakdown */}
                <div className="bg-[#FAF7F2] p-3 rounded-lg border border-stone-200/80 space-y-1">
                  <div className="flex items-baseline justify-between">
                    <span className="text-[11px] text-stone-600 font-medium">Total Composite Fee:</span>
                    <span className="font-crest font-bold text-sm sm:text-base text-slate-900">
                      {formatINR(grade.totalAnnualFee)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-[10.5px] text-stone-500 font-mono pt-1 border-t border-stone-200/60">
                    <span>Term 1: {formatINR(grade.term1Fee)}</span>
                    <span>Term 2: {formatINR(grade.term2Fee)}</span>
                  </div>
                </div>

                {/* Action Button */}
                <button
                  type="button"
                  onClick={() => onOpenFeeModal(grade.standardId)}
                  className="w-full inline-flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg bg-[#9E1B32]/5 hover:bg-[#9E1B32] text-[#9E1B32] hover:text-white font-semibold text-xs transition-colors border border-[#9E1B32]/20 hover:border-[#9E1B32] cursor-pointer"
                >
                  <FileText className="w-3.5 h-3.5 shrink-0" />
                  <span>View Breakdown &amp; Fee Voucher</span>
                  <ArrowRight className="w-3.5 h-3.5 shrink-0 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* 4. BOTTOM INSTITUTIONAL FOOTNOTE */}
        <div className="bg-stone-100 rounded-xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left border border-stone-200">
          <div className="space-y-0.5">
            <span className="text-xs font-bold text-slate-800">
              Need personalized installment counseling or scholarship guidance?
            </span>
            <p className="text-[11px] text-stone-600">
              Visit the Gurukul Vidyapeeth Admission &amp; Accounts Desk at D. N. Mohanty Estate, Thane (W) during office hours (Mon–Sat 08:00 AM – 04:30 PM).
            </p>
          </div>
          <a
            href={`tel:${COLLEGE_CONFIG.contact.admissionPhone.replace(/\s+/g, "")}`}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#9E1B32] text-white text-xs font-bold hover:bg-[#BA203B] transition-colors shrink-0 shadow-xs"
          >
            <Phone className="w-3.5 h-3.5 text-amber-300" />
            <span>Call Accounts Desk: {COLLEGE_CONFIG.contact.admissionPhone}</span>
          </a>
        </div>

      </div>
    </section>
  );
}
