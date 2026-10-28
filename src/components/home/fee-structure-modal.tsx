"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import {
  X,
  Lock,
  Unlock,
  Printer,
  CheckCircle2,
  Phone,
  MessageCircle,
  ShieldCheck,
  ChevronDown,
  GraduationCap,
  Check,
  Award,
  ArrowRight,
  User,
  Mail,
  CreditCard,
  Building,
} from "lucide-react";
import { COLLEGE_CONFIG } from "@/config/college-config";
import { StandardFeeItem } from "@/types";

interface FeeStructureModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialStandardId?: string;
}

export function FeeStructureModal({
  isOpen,
  onClose,
  initialStandardId = "std-1",
}: FeeStructureModalProps) {
  const [selectedStandardId, setSelectedStandardId] = useState(initialStandardId);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [studentName, setStudentName] = useState("");
  const [parentName, setParentName] = useState("");
  const [parentPhone, setParentPhone] = useState("");
  const [parentEmail, setParentEmail] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [refNumber, setRefNumber] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const printAreaRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (initialStandardId) {
      setSelectedStandardId(initialStandardId);
    }
  }, [initialStandardId]);

  // Close custom dropdown on click outside
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
          onClose();
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, isDropdownOpen, onClose]);

  // Prevent background scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const currentFeeItem: StandardFeeItem =
    COLLEGE_CONFIG.feeSchedule.find((item) => item.standardId === selectedStandardId) ||
    COLLEGE_CONFIG.feeSchedule[3];

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

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};

    if (!studentName.trim()) {
      errs.studentName = "Please enter student's full name.";
    }
    if (!parentPhone.trim() || parentPhone.replace(/\D/g, "").length < 10) {
      errs.parentPhone = "Valid 10-digit mobile number is required.";
    }

    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setErrors({});
    const randomId = "GVK-FEE-" + Math.floor(100000 + Math.random() * 900000);
    setRefNumber(randomId);
    setIsUnlocked(true);
  };

  const handlePrintSlip = () => {
    window.print();
  };

  const formatCurrency = (amt: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amt);
  };

  const getWhatsAppLink = () => {
    const text = encodeURIComponent(
      `Hello Gurukul Vidyapeeth Admissions Desk, I would like to confirm admission and fee details for ${studentName || "my child"} for ${currentFeeItem.standardName} (${currentFeeItem.academicYear}). Reference No: ${refNumber || "NEW-ENQ"}.`
    );
    return `https://wa.me/919326446097?text=${text}`;
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="bespoke-fee-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200 overflow-y-auto"
    >
      {/* Outer Card: Standard Vertical Rectangle with Refined 2xl Architectural Corners */}
      <div className="relative w-full max-w-xl sm:max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 ring-1 ring-black/5 overflow-hidden flex flex-col my-auto transition-all animate-in zoom-in-95 duration-200">
        
        {/* 1. TOP HEADER BANNER: Deep Navy Prestige Identity */}
        <div className="bg-gradient-to-r from-[#0B1E3F] via-[#102B57] to-[#0A1A36] px-5 sm:px-6 py-5 text-white relative border-b border-amber-400/30 shrink-0">
          {/* Subtle Ambient Glow */}
          <div className="absolute right-0 top-0 w-48 h-48 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute left-0 bottom-0 w-36 h-36 bg-red-600/15 rounded-full blur-2xl pointer-events-none" />

          {/* Close Button Top Right */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 p-2 rounded-xl bg-white/10 hover:bg-white/20 text-slate-200 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 cursor-pointer"
            aria-label="Close fee structure desk"
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
              <ShieldCheck className="w-3.5 h-3.5 text-amber-300" />
              Index No. J-15.14.086 • Reg: 28903-97/DI-15/11/2016
            </span>
          </div>
        </div>

        {/* 2. BODY CONTENT: Vertical Rectangular Format */}
        <div className="bg-[#FCFAF7]">
          {!isUnlocked ? (
            /* A. Gated Verification Form */
            <form onSubmit={handleUnlock} className="p-5 sm:p-7 space-y-4.5">
              <div>
                <div className="flex items-center gap-2 text-xs font-bold text-red-700 uppercase tracking-wider mb-1">
                  <Lock className="w-3.5 h-3.5" />
                  <span>Parent Verification Required</span>
                </div>
                <h3
                  id="bespoke-fee-title"
                  className="font-editorial text-xl sm:text-2xl font-bold text-slate-900 leading-snug"
                >
                  Select Grade &amp; Unlock Verified Fee Breakdown
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                  Enter student details and mobile number to reveal itemized tuition, laboratory, and activity heads for the selected standard.
                </p>
              </div>

              {/* 3 Pillar Hallmarks */}
              <div className="grid grid-cols-3 gap-2 py-1">
                <div className="p-2 rounded-xl bg-white border border-slate-200/80 text-center shadow-xs">
                  <CreditCard className="w-4 h-4 text-amber-600 mx-auto mb-1" />
                  <span className="text-[10px] font-bold text-slate-800 block leading-tight">
                    2 Terms / 4 EMIs
                  </span>
                  <span className="text-[9px] text-slate-500 block">Flexible Schedule</span>
                </div>
                <div className="p-2 rounded-xl bg-white border border-slate-200/80 text-center shadow-xs">
                  <ShieldCheck className="w-4 h-4 text-red-600 mx-auto mb-1" />
                  <span className="text-[10px] font-bold text-slate-800 block leading-tight">
                    Govt. Approved
                  </span>
                  <span className="text-[9px] text-slate-500 block">Composite Fee</span>
                </div>
                <div className="p-2 rounded-xl bg-white border border-slate-200/80 text-center shadow-xs">
                  <Printer className="w-4 h-4 text-emerald-600 mx-auto mb-1" />
                  <span className="text-[10px] font-bold text-slate-800 block leading-tight">
                    1-Click Slip
                  </span>
                  <span className="text-[9px] text-slate-500 block">Printable Voucher</span>
                </div>
              </div>

              {/* DOWNWARD CLASS SELECTOR WITH ISOLATED WHEEL SCROLLING */}
              <div className="space-y-1.5" ref={dropdownRef}>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  Select Applying Class / Standard: <span className="text-red-600">*</span>
                </label>

                <div className="relative">
                  <button
                    type="button"
                    aria-haspopup="listbox"
                    aria-expanded={isDropdownOpen}
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
                            {currentFeeItem.standardName}
                          </span>
                          <span className="text-[10px] font-semibold text-red-700 bg-red-50 px-2 py-0.5 rounded border border-red-200 shrink-0">
                            {currentFeeItem.tierName.split(" ")[0]}
                          </span>
                        </div>
                        <span className="text-xs text-slate-500 truncate block">
                          {currentFeeItem.classesLabel}
                        </span>
                      </div>
                    </div>

                    <ChevronDown
                      className={`w-5 h-5 text-slate-400 transition-transform duration-200 shrink-0 ml-2 ${
                        isDropdownOpen ? "rotate-180 text-red-600" : ""
                      }`}
                    />
                  </button>

                  {/* ISOLATED DOWNWARD OPENING DROPDOWN MENU */}
                  {isDropdownOpen && (
                    <div
                      role="listbox"
                      onWheel={(e) => e.stopPropagation()}
                      className="absolute top-full left-0 right-0 mt-2 z-50 bg-white rounded-xl shadow-2xl border-2 border-red-200 divide-y divide-slate-100 max-h-48 overflow-y-auto overscroll-contain animate-in fade-in slide-in-from-top-2 duration-150"
                      style={{ overscrollBehavior: "contain" }}
                    >
                      {standardGroups.map((group, groupIdx) => (
                        <div key={groupIdx} className="p-1.5">
                          <div className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-500 bg-slate-100/80 rounded-md flex items-center gap-1.5 mb-1">
                            <span>{group.icon}</span>
                            <span>{group.title}</span>
                          </div>

                          <div className="space-y-0.5">
                            {group.items.map((item) => {
                              const isSelected = item.standardId === selectedStandardId;
                              return (
                                <button
                                  key={item.standardId}
                                  role="option"
                                  aria-selected={isSelected}
                                  type="button"
                                  onClick={() => {
                                    setSelectedStandardId(item.standardId);
                                    setIsDropdownOpen(false);
                                  }}
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
              </div>

              {/* Styled Inputs with Icons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div className="space-y-1">
                  <label htmlFor="studentNameField" className="block text-xs font-bold text-slate-800">
                    Student Full Name <span className="text-red-600">*</span>
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      id="studentNameField"
                      type="text"
                      placeholder="e.g. Aarav Sharma"
                      value={studentName}
                      onChange={(e) => setStudentName(e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-900 bg-white focus:border-red-600 focus:ring-2 focus:ring-red-100 transition-colors"
                    />
                  </div>
                  {errors.studentName && (
                    <p className="text-[11px] text-red-600 font-semibold">{errors.studentName}</p>
                  )}
                </div>

                <div className="space-y-1">
                  <label htmlFor="parentNameField" className="block text-xs font-bold text-slate-800">
                    Parent / Guardian Name
                  </label>
                  <div className="relative">
                    <ShieldCheck className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      id="parentNameField"
                      type="text"
                      placeholder="e.g. Rajesh Sharma"
                      value={parentName}
                      onChange={(e) => setParentName(e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-900 bg-white focus:border-red-600 focus:ring-2 focus:ring-red-100 transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label htmlFor="parentPhoneField" className="block text-xs font-bold text-slate-800">
                    WhatsApp / Mobile Number <span className="text-red-600">*</span>
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      id="parentPhoneField"
                      type="tel"
                      placeholder="10-digit mobile number"
                      value={parentPhone}
                      onChange={(e) => setParentPhone(e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-900 bg-white focus:border-red-600 focus:ring-2 focus:ring-red-100 transition-colors"
                    />
                  </div>
                  {errors.parentPhone && (
                    <p className="text-[11px] text-red-600 font-semibold">{errors.parentPhone}</p>
                  )}
                </div>

                <div className="space-y-1">
                  <label htmlFor="parentEmailField" className="block text-xs font-bold text-slate-800">
                    Email Address (Optional)
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      id="parentEmailField"
                      type="email"
                      placeholder="parent@example.com"
                      value={parentEmail}
                      onChange={(e) => setParentEmail(e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-900 bg-white focus:border-red-600 focus:ring-2 focus:ring-red-100 transition-colors"
                    />
                  </div>
                </div>
              </div>

              {/* Submit CTA */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm bg-gradient-to-r from-red-600 via-red-700 to-rose-700 hover:from-red-700 hover:to-rose-800 text-white shadow-lg hover:shadow-xl transition-all duration-200 transform active:scale-[0.99] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:ring-offset-2"
                >
                  <Unlock className="w-4 h-4 text-amber-300" />
                  <span>Unlock {currentFeeItem.standardName.split("—")[0].trim()} Fee Breakdown</span>
                  <ArrowRight className="w-4 h-4 text-amber-300" />
                </button>
                <p className="text-[11px] text-slate-500 text-center mt-2">
                  🔒 We respect your privacy. Contact details are solely utilized for admission desk correspondence.
                </p>
              </div>
            </form>
          ) : (
            /* B. Unlocked Authentic Fee Voucher & Breakdown with Internal Scrollbar */
            <div
              className="p-5 sm:p-7 pr-3.5 sm:pr-5 space-y-4.5 max-h-[70vh] overflow-y-auto overscroll-contain"
              ref={printAreaRef}
            >
              {/* Top Verification Certificate Bar */}
              <div className="bg-gradient-to-r from-emerald-50 via-teal-50 to-emerald-50 border-2 border-emerald-300/80 rounded-xl p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-emerald-600 text-white shrink-0 shadow-xs">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-widest block">
                      Official Admission Fee Voucher
                    </span>
                    <h4 className="text-sm sm:text-base font-bold text-slate-900">
                      Verified for {studentName} ({currentFeeItem.standardName})
                    </h4>
                  </div>
                </div>

                <div className="text-left sm:text-right">
                  <span className="text-[10px] text-slate-500 block uppercase font-mono">Voucher Ref:</span>
                  <span className="font-mono text-xs font-bold text-red-700 bg-white px-2.5 py-1 rounded-md border border-red-200 shadow-xs">
                    {refNumber}
                  </span>
                </div>
              </div>

              {/* Standard Identification Banner */}
              <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 pb-2.5">
                  <div>
                    <span className="text-xs font-bold text-red-600 uppercase tracking-wider block">
                      {currentFeeItem.tierName}
                    </span>
                    <h4 className="text-lg sm:text-xl font-bold text-slate-900 font-editorial">
                      {currentFeeItem.standardName}
                    </h4>
                  </div>
                  <span className="text-xs font-bold text-amber-900 bg-amber-100 border border-amber-300 px-2.5 py-0.5 rounded-full">
                    AY {currentFeeItem.academicYear}
                  </span>
                </div>

                <p className="text-xs text-slate-600 mt-2">
                  <strong className="text-slate-900 font-semibold">Eligibility:</strong> {currentFeeItem.eligibility}
                </p>
              </div>

              {/* Fee Breakdown Table */}
              <div className="border border-slate-200 rounded-xl overflow-hidden shadow-xs bg-white">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                    <tr>
                      <th className="py-2.5 px-3.5 sm:px-4">Fee Head / Description</th>
                      <th className="py-2.5 px-3.5 sm:px-4">Schedule</th>
                      <th className="py-2.5 px-3.5 sm:px-4 text-right">Amount (INR)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-800 font-medium">
                    {currentFeeItem.admissionFee && (
                      <tr className="hover:bg-slate-50">
                        <td className="py-2 px-3.5 sm:px-4">
                          <span className="font-semibold block text-slate-900">One-Time Registration Fee</span>
                          <span className="text-[10px] text-slate-500">New students at initial admission</span>
                        </td>
                        <td className="py-2 px-3.5 sm:px-4 text-slate-600">At Admission</td>
                        <td className="py-2 px-3.5 sm:px-4 text-right font-semibold text-slate-900">
                          {formatCurrency(currentFeeItem.admissionFee)}
                        </td>
                      </tr>
                    )}
                    <tr className="hover:bg-slate-50">
                      <td className="py-2 px-3.5 sm:px-4">
                        <span className="font-semibold block text-slate-900">Term 1 Tuition &amp; Academic Fee</span>
                        <span className="text-[10px] text-slate-500">Instruction &amp; teacher mentorship</span>
                      </td>
                      <td className="py-2 px-3.5 sm:px-4 text-slate-600">June 2026</td>
                      <td className="py-2 px-3.5 sm:px-4 text-right font-semibold text-slate-900">
                        {formatCurrency(currentFeeItem.term1Fee)}
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="py-2 px-3.5 sm:px-4">
                        <span className="font-semibold block text-slate-900">Term 2 Tuition &amp; Academic Fee</span>
                        <span className="text-[10px] text-slate-500">Second semester instruction</span>
                      </td>
                      <td className="py-2 px-3.5 sm:px-4 text-slate-600">November 2026</td>
                      <td className="py-2 px-3.5 sm:px-4 text-right font-semibold text-slate-900">
                        {formatCurrency(currentFeeItem.term2Fee)}
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="py-2 px-3.5 sm:px-4">
                        <span className="font-semibold block text-slate-900">Activity, Computer &amp; Lab Consumables</span>
                        <span className="text-[10px] text-slate-500">Smart classes, IT suites, labs</span>
                      </td>
                      <td className="py-2 px-3.5 sm:px-4 text-slate-600">Annual Single</td>
                      <td className="py-2 px-3.5 sm:px-4 text-right font-semibold text-slate-900">
                        {formatCurrency(currentFeeItem.activityLabFee)}
                      </td>
                    </tr>
                    {/* Total Composite Fee Highlight */}
                    <tr className="bg-red-50/80 border-t-2 border-red-600 font-bold text-slate-900">
                      <td className="py-2.5 px-3.5 sm:px-4 text-sm sm:text-base">
                        <span className="text-red-700">Total Annual Composite Fee</span>
                        <span className="text-[10px] font-normal text-slate-600 block mt-0.5">
                          {currentFeeItem.instalmentPlan}
                        </span>
                      </td>
                      <td className="py-2.5 px-3.5 sm:px-4 text-slate-600 text-xs sm:text-sm">
                        2 Installments / 4 EMIs
                      </td>
                      <td className="py-2.5 px-3.5 sm:px-4 text-right text-base sm:text-lg font-bold text-red-700">
                        {formatCurrency(currentFeeItem.totalAnnualFee)}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Inclusions Strip */}
              <div className="bg-white border border-slate-200 rounded-xl p-3.5">
                <h5 className="text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-2">
                  Inclusions for {currentFeeItem.standardName}:
                </h5>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-xs text-slate-700">
                  {currentFeeItem.inclusions.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-red-600 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-2.5 pt-1">
                <button
                  onClick={handlePrintSlip}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm bg-gradient-to-r from-red-600 to-rose-700 hover:from-red-700 hover:to-rose-800 text-white shadow-md transition-colors cursor-pointer"
                >
                  <Printer className="w-4 h-4" />
                  <span>Download / Print Fee Slip</span>
                </button>

                <a
                  href={getWhatsAppLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm bg-emerald-600 hover:bg-emerald-700 text-white shadow-md transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp Admissions</span>
                </a>

                <button
                  onClick={() => setIsUnlocked(false)}
                  className="w-full sm:w-auto ml-auto px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:text-red-700 border border-slate-300 hover:border-red-600 bg-white transition-colors cursor-pointer"
                >
                  Check Another Standard
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
