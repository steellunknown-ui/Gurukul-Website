"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import {
  X,
  ChevronDown,
  Check,
  ShieldCheck,
  Award,
  ArrowRight,
  MessageCircle,
  Lock,
  Building2,
  GraduationCap,
  Calendar,
  CheckCircle2,
} from "lucide-react";
import { COLLEGE_CONFIG } from "@/config/college-config";

interface FirstVisitPopupProps {
  onOpenFeeModal: (standardId: string) => void;
  onOpenEnquiryModal: () => void;
}

export function FirstVisitPopup({
  onOpenFeeModal,
  onOpenEnquiryModal,
}: FirstVisitPopupProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedStandardId, setSelectedStandardId] = useState("std-1");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      const hasShown = sessionStorage.getItem("gurukul_first_visit_popup_v4");
      if (!hasShown) {
        const timer = setTimeout(() => {
          setIsOpen(true);
          sessionStorage.setItem("gurukul_first_visit_popup_v4", "true");
        }, 1200);
        return () => clearTimeout(timer);
      }
    } catch {
      // Storage unavailable fallback
    }

    const handleManualOpen = () => setIsOpen(true);
    window.addEventListener("open-first-visit-popup", handleManualOpen);
    return () => window.removeEventListener("open-first-visit-popup", handleManualOpen);
  }, []);

  // Close custom dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        if (isDropdownOpen) {
          setIsDropdownOpen(false);
        } else {
          setIsOpen(false);
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, isDropdownOpen]);

  if (!isOpen) return null;

  const currentStandard =
    COLLEGE_CONFIG.feeSchedule.find((item) => item.standardId === selectedStandardId) ||
    COLLEGE_CONFIG.feeSchedule[3];

  const handleSelectStandard = (stdId: string) => {
    setSelectedStandardId(stdId);
    setIsDropdownOpen(false);
  };

  const handleProceedToFees = () => {
    setIsOpen(false);
    onOpenFeeModal(selectedStandardId);
  };

  const handleGeneralEnquiry = () => {
    setIsOpen(false);
    onOpenEnquiryModal();
  };

  // Group standards by section for clear organization
  const standardGroups = [
    {
      title: "Pre-Primary Section (Foundational)",
      icon: "🧸",
      items: COLLEGE_CONFIG.feeSchedule.filter((s) =>
        ["nursery", "jr-kg", "sr-kg"].includes(s.standardId)
      ),
    },
    {
      title: "Primary Section (Classes 1 to 5 • English Medium)",
      icon: "📘",
      items: COLLEGE_CONFIG.feeSchedule.filter((s) =>
        ["std-1", "std-2", "std-3", "std-4", "std-5"].includes(s.standardId)
      ),
    },
    {
      title: "Upper Primary / Elementary (Classes 6 to 8)",
      icon: "🔬",
      items: COLLEGE_CONFIG.feeSchedule.filter((s) =>
        ["std-6", "std-7", "std-8"].includes(s.standardId)
      ),
    },
    {
      title: "Secondary Section (Classes 9 & 10 SSC Board)",
      icon: "🎓",
      items: COLLEGE_CONFIG.feeSchedule.filter((s) =>
        ["std-9", "std-10"].includes(s.standardId)
      ),
    },
    {
      title: "Higher Secondary (Classes 11 & 12 HSC Junior College)",
      icon: "🏛️",
      items: COLLEGE_CONFIG.feeSchedule.filter((s) =>
        s.standardId.startsWith("fyjc-") || s.standardId.startsWith("syjc-")
      ),
    },
  ];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="bespoke-popup-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200 overflow-y-auto"
    >
      {/* Outer Card: Standard Vertical Rectangle with Refined 2xl Architectural Corners */}
      <div className="relative w-full max-w-lg sm:max-w-xl bg-white rounded-2xl shadow-2xl border border-slate-200 ring-1 ring-black/5 overflow-hidden flex flex-col my-auto transition-all animate-in zoom-in-95 duration-200">
        
        {/* 1. TOP HEADER BANNER: Deep Navy Prestige Identity */}
        <div className="bg-gradient-to-r from-[#0B1E3F] via-[#102B57] to-[#0A1A36] px-5 sm:px-6 py-5 text-white relative border-b border-amber-400/30 shrink-0">
          {/* Subtle Ambient Glow */}
          <div className="absolute right-0 top-0 w-48 h-48 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute left-0 bottom-0 w-36 h-36 bg-red-600/15 rounded-full blur-2xl pointer-events-none" />

          {/* Close Button Top Right */}
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-4 right-4 z-20 p-2 rounded-xl bg-white/10 hover:bg-white/20 text-slate-200 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 cursor-pointer"
            aria-label="Close admissions announcement"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Header Content */}
          <div className="relative z-10 flex items-start gap-3.5 pr-8">
            <div className="relative w-12 h-12 rounded-xl bg-white/10 p-1.5 border border-amber-300/40 backdrop-blur-sm shadow-inner shrink-0">
              <Image
                src="/logo.png"
                alt="Gurukul Vidyapeeth Official Seal"
                width={48}
                height={48}
                className="w-full h-full object-contain"
              />
            </div>
            <div className="min-w-0">
              <span className="text-[10px] uppercase tracking-widest text-amber-300 font-crest block font-bold mb-1">
                BHAGWAT PRASAD GURUKUL EDUCATIONAL TRUST&apos;S
              </span>
              <h2 className="font-crest text-base sm:text-lg font-bold text-white tracking-wide leading-tight">
                GURUKUL VIDYAPEETH
              </h2>
              <span className="text-xs text-slate-300 block font-sans mt-1">
                English High School &amp; Jr. College • Thane (W)
              </span>
            </div>
          </div>

          <div className="mt-3 flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-red-600/40 text-amber-300 text-[10px] font-semibold border border-red-500/40 tracking-wider uppercase font-mono">
              <Award className="w-3.5 h-3.5 text-amber-300" />
              Index No. J-15.14.086 • Admissions Open 2026–27
            </span>
          </div>
        </div>

        {/* 2. BODY CONTENT: Vertical Rectangular Format */}
        <div className="p-5 sm:p-7 bg-[#FCFAF7] space-y-4.5">
          {/* Main Title & Description */}
          <div>
            <h3
              id="bespoke-popup-title"
              className="font-editorial text-xl sm:text-2xl font-bold tracking-tight text-slate-900 leading-snug"
            >
              Standard-Specific Curriculum &amp; Fee Voucher
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
              Choose your child’s standard below to inspect the verified Maharashtra Board subject curriculum and generate a printable admissions fee voucher.
            </p>
          </div>

          {/* 3 Pillar Hallmarks */}
          <div className="grid grid-cols-3 gap-2 py-1">
            <div className="p-2 rounded-xl bg-white border border-slate-200/80 text-center shadow-xs">
              <ShieldCheck className="w-4 h-4 text-amber-600 mx-auto mb-1" />
              <span className="text-[10px] font-bold text-slate-800 block leading-tight">
                State Board
              </span>
              <span className="text-[9px] text-slate-500 block">SSC &amp; HSC</span>
            </div>
            <div className="p-2 rounded-xl bg-white border border-slate-200/80 text-center shadow-xs">
              <Award className="w-4 h-4 text-red-600 mx-auto mb-1" />
              <span className="text-[10px] font-bold text-slate-800 block leading-tight">
                99.9% Board
              </span>
              <span className="text-[9px] text-slate-500 block">Passing Track Record</span>
            </div>
            <div className="p-2 rounded-xl bg-white border border-slate-200/80 text-center shadow-xs">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 mx-auto mb-1" />
              <span className="text-[10px] font-bold text-slate-800 block leading-tight">
                Zero Capitation
              </span>
              <span className="text-[9px] text-slate-500 block">Transparent Fees</span>
            </div>
          </div>

          {/* DOWNWARD CLASS SELECTOR WITH ISOLATED WHEEL SCROLLING */}
          <div className="space-y-1.5" ref={dropdownRef}>
            <label
              id="class-selector-label"
              className="block text-xs font-bold uppercase tracking-wider text-slate-700"
            >
              Select Applying Class / Standard: <span className="text-red-600">*</span>
            </label>

            <div className="relative">
              {/* Trigger Button */}
              <button
                type="button"
                aria-haspopup="listbox"
                aria-expanded={isDropdownOpen}
                aria-labelledby="class-selector-label"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className={`w-full flex items-center justify-between p-3.5 rounded-xl border-2 bg-white text-left transition-all duration-200 cursor-pointer shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600 ${
                  isDropdownOpen
                    ? "border-red-600 ring-2 ring-red-100"
                    : "border-slate-300 hover:border-red-600 hover:bg-slate-50/50"
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-8 h-8 rounded-lg bg-red-50 text-red-700 flex items-center justify-center font-bold text-xs shrink-0 border border-red-200">
                    <GraduationCap className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-slate-900 truncate">
                        {currentStandard.standardName}
                      </span>
                      <span className="text-[10px] font-semibold text-red-700 bg-red-50 px-2 py-0.5 rounded border border-red-200 shrink-0">
                        {currentStandard.tierName.split(" ")[0]}
                      </span>
                    </div>
                    <span className="text-xs text-slate-500 truncate block">
                      {currentStandard.classesLabel}
                    </span>
                  </div>
                </div>

                <div className="p-1 rounded-md text-slate-400 shrink-0 ml-2">
                  <ChevronDown
                    className={`w-5 h-5 transition-transform duration-200 ${
                      isDropdownOpen ? "rotate-180 text-red-600" : ""
                    }`}
                  />
                </div>
              </button>

              {/* ISOLATED DOWNWARD OPENING DROPDOWN MENU */}
              {isDropdownOpen && (
                <div
                  role="listbox"
                  aria-labelledby="class-selector-label"
                  onWheel={(e) => e.stopPropagation()}
                  className="absolute top-full left-0 right-0 mt-2 z-50 bg-white rounded-xl shadow-2xl border-2 border-red-200 divide-y divide-slate-100 max-h-48 overflow-y-auto overscroll-contain animate-in fade-in slide-in-from-top-2 duration-150"
                  style={{ overscrollBehavior: "contain" }}
                >
                  {standardGroups.map((group, groupIdx) => (
                    <div key={groupIdx} className="p-1.5">
                      {/* Section Header */}
                      <div className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-500 bg-slate-100/80 rounded-md flex items-center gap-1.5 mb-1">
                        <span>{group.icon}</span>
                        <span>{group.title}</span>
                      </div>

                      {/* Standard Items */}
                      <div className="space-y-0.5">
                        {group.items.map((item) => {
                          const isSelected = item.standardId === selectedStandardId;
                          return (
                            <button
                              key={item.standardId}
                              role="option"
                              aria-selected={isSelected}
                              type="button"
                              onClick={() => handleSelectStandard(item.standardId)}
                              className={`w-full flex items-center justify-between px-3.5 py-2 rounded-lg text-left text-xs font-medium transition-colors cursor-pointer ${
                                isSelected
                                  ? "bg-red-600 text-white font-bold shadow-xs"
                                  : "text-slate-800 hover:bg-red-50 hover:text-red-700"
                              }`}
                            >
                              <div className="min-w-0 pr-2">
                                <span className="block truncate font-semibold">
                                  {item.standardName}
                                </span>
                                <span
                                  className={`text-[10px] block truncate ${
                                    isSelected ? "text-red-100" : "text-slate-500"
                                  }`}
                                >
                                  {item.classesLabel}
                                </span>
                              </div>

                              {isSelected ? (
                                <Check className="w-4 h-4 text-amber-300 shrink-0" />
                              ) : (
                                <span className="text-[10px] font-mono text-slate-400 shrink-0">
                                  Select
                                </span>
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <p className="text-[11px] text-slate-500 flex items-center gap-1.5 pt-0.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>
                Selected: <strong className="text-slate-900">{currentStandard.standardName}</strong> • {currentStandard.tierName}
              </span>
            </p>
          </div>

          {/* Primary Action Button */}
          <div className="pt-2 space-y-2.5">
            <button
              onClick={handleProceedToFees}
              className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm bg-gradient-to-r from-red-600 via-red-700 to-rose-700 hover:from-red-700 hover:to-rose-800 text-white shadow-lg hover:shadow-xl transition-all duration-200 transform active:scale-[0.99] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:ring-offset-2"
            >
              <Lock className="w-4 h-4 text-amber-300" />
              <span>Unlock {currentStandard.standardName.split("—")[0].trim()} Fee Breakdown</span>
              <ArrowRight className="w-4 h-4 text-amber-300" />
            </button>

            {/* Quick Secondary Links */}
            <div className="flex items-center justify-between gap-2 pt-1 text-xs text-slate-500">
              <a
                href="https://wa.me/919326446097?text=Hello%20Gurukul%20Vidyapeeth%2C%20I%20would%20like%20to%20enquire%20about%20admissions%20for%20Academic%20Year%202026-27."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 font-semibold text-emerald-700 hover:text-emerald-800 hover:underline"
              >
                <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                <span>WhatsApp Admissions</span>
              </a>

              <button
                onClick={handleGeneralEnquiry}
                className="font-semibold text-slate-600 hover:text-red-700 hover:underline cursor-pointer"
              >
                Campus Visit
              </button>

              <button
                onClick={() => setIsOpen(false)}
                className="text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
              >
                Explore first
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
