"use client";

import React, { useState, useEffect, useMemo } from "react";
import {
  Bell,
  X,
  Calendar,
  FileText,
  ShieldCheck,
  ChevronRight,
  Download,
  Phone,
  AlertCircle,
  Sparkles,
  Filter,
} from "lucide-react";
import { COLLEGE_CONFIG } from "@/config/college-config";
import { Badge } from "@/components/ui/badge";
import { NoticeCategory, NoticeItem } from "@/types";

interface NoticeDrawerProps {
  isOpen?: boolean;
  onClose?: () => void;
  onOpen?: () => void;
  onOpenEnquiry?: (classLevel: "School" | "XI" | "XII") => void;
}

export function NoticeDrawer({
  isOpen: controlledIsOpen,
  onClose: controlledOnClose,
  onOpen: controlledOnOpen,
  onOpenEnquiry,
}: NoticeDrawerProps) {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [downloadNoticeId, setDownloadNoticeId] = useState<string | null>(null);

  const isControlled = typeof controlledIsOpen === "boolean";
  const isOpen = isControlled ? controlledIsOpen : internalIsOpen;

  const handleOpen = () => {
    if (isControlled && controlledOnOpen) {
      controlledOnOpen();
    } else {
      setInternalIsOpen(true);
    }
  };

  const handleClose = () => {
    if (isControlled && controlledOnClose) {
      controlledOnClose();
    } else {
      setInternalIsOpen(false);
    }
  };

  // Keyboard navigation: Escape key closes the drawer
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        handleClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      const originalStyle = window.getComputedStyle(document.body).overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = originalStyle;
      };
    }
  }, [isOpen]);

  // Total urgent count for badge beacon
  const urgentCount = useMemo(
    () => COLLEGE_CONFIG.notices.filter((n) => n.isUrgent).length,
    []
  );

  const categories = useMemo(() => {
    const cats = Array.from(new Set(COLLEGE_CONFIG.notices.map((n) => n.category)));
    return ["All", ...cats];
  }, []);

  const filteredNotices = useMemo(() => {
    if (activeCategory === "All") return COLLEGE_CONFIG.notices;
    return COLLEGE_CONFIG.notices.filter((n) => n.category === activeCategory);
  }, [activeCategory]);

  const handleDownloadNotice = (notice: NoticeItem) => {
    setDownloadNoticeId(notice.id);
    setTimeout(() => {
      // Simulate official certified circular voucher download
      const content = `=====================================================
BHAGWAT PRASAD GURUKUL EDUCATIONAL TRUST'S
GURUKUL VIDYAPEETH ENGLISH HIGH SCHOOL & JR. COLLEGE
Regd. by Govt. of Maharashtra • Index No: J-15.14.086
Govt Ref: 28903-97/DI-15/11/2016
=====================================================

OFFICIAL ADMINISTRATIVE CIRCULAR
Ref: ${notice.id.toUpperCase()}
Date: ${notice.date}
Category: ${notice.category}
Status: ${notice.isUrgent ? "URGENT / PRIORITY" : "STANDARD NOTICE"}

TITLE: ${notice.title}

CIRCULAR DETAILS:
${notice.summary}

ADMISSION & LIAISON DESK:
Phone: ${COLLEGE_CONFIG.contact.admissionPhone}
Email: ${COLLEGE_CONFIG.contact.admissionEmail}
Office Hours: ${COLLEGE_CONFIG.contact.officeHours}
Address: ${COLLEGE_CONFIG.contact.addressLines.join(", ")}, ${COLLEGE_CONFIG.contact.campusCity}

Motto: ॥ विद्या धनम् सर्वधन प्रधानम् ॥
=====================================================`;

      const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `Gurukul-Circular-${notice.id}.txt`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      setDownloadNoticeId(null);
    }, 600);
  };

  return (
    <>
      {/* =========================================================================
          A. FLOATING DOCKED TRIGGER RIBBON (LEFT SCREEN EDGE - BRIGHT MAROON ROYAL PLAQUE)
          ========================================================================= */}
      {/* 1. Desktop Trigger (Left Mid-Screen Bright Maroon Royal Plaque - Sleeker Width) */}
      <div className="hidden md:block fixed left-0 top-1/2 -translate-y-1/2 z-40">
        <button
          type="button"
          onClick={handleOpen}
          aria-label="Open Official Notice Board & Circulars"
          aria-expanded={isOpen}
          title="Click to view Official Board Notices & Circulars"
          className="group relative flex flex-col items-center justify-between py-5 px-1.5 w-10 sm:w-11 rounded-r-2xl bg-gradient-to-b from-[#C41C3B] via-[#A31630] to-[#7D0E22] text-white border-y-2 border-r-2 border-[#DDA743] shadow-[0_10px_35px_rgba(196,28,59,0.5)] hover:shadow-[0_14px_45px_rgba(221,167,67,0.6)] hover:translate-x-1.5 transition-all duration-300 cursor-pointer select-none overflow-hidden"
        >
          {/* Inner Golden Inset Filigree Border */}
          <div className="absolute inset-y-1.5 right-1 left-0 rounded-r-xl border-y border-r border-[#DDA743]/50 pointer-events-none" />

          {/* Golden Shimmer Sheen on Hover */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none" />

          {/* Top: Royal Medallion with Gilded Bell & Pulsing Beacon */}
          <div className="relative mb-1.5 shrink-0">
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-[#FFE29A] via-[#DDA743] to-[#8C6214] p-0.5 shadow-md flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
              <div className="w-full h-full rounded-full bg-[#6E0B1C] flex items-center justify-center text-[#FFE29A]">
                <Bell className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#FFE29A]" />
              </div>
            </div>
            {urgentCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-300 opacity-90" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500 border-2 border-white shadow-sm" />
              </span>
            )}
          </div>

          {/* Sanskrit Motto Header */}
          <span className="text-[7.5px] font-serif font-bold text-[#FFE29A] tracking-widest text-center uppercase block mb-1 drop-shadow-sm">
            ॥ विद्या ॥
          </span>

          {/* Vertical Gilded Typography */}
          <div className="my-auto py-1 flex flex-col items-center">
            <span
              className="font-crest text-[10px] sm:text-[10.5px] font-black uppercase tracking-[0.16em] text-[#FFF9EE] drop-shadow-[0_2px_4px_rgba(80,10,20,0.9)]"
              style={{
                writingMode: "vertical-rl",
                transform: "rotate(180deg)",
              }}
            >
              Notice Board
            </span>
          </div>

          {/* Bottom Royal Gold Wax Seal Badge */}
          <div className="mt-1.5 shrink-0 flex flex-col items-center gap-1">
            <div className="w-6 h-6 sm:w-6.5 sm:h-6.5 rounded-full bg-gradient-to-br from-[#FFE29A] via-[#DDA743] to-[#8C6214] p-0.5 shadow-md flex items-center justify-center">
              <span className="w-full h-full rounded-full bg-[#6E0B1C] text-[#FFE29A] text-[9.5px] sm:text-[10px] font-mono font-black flex items-center justify-center border border-[#FFE29A]/50">
                {COLLEGE_CONFIG.notices.length}
              </span>
            </div>

            {/* Expand Indicator Chevron */}
            <ChevronRight className="w-3 h-3 text-[#FFE29A] group-hover:translate-x-1 transition-transform" />
          </div>
        </button>
      </div>

      {/* 2. Mobile Responsive Trigger (Floating Royal Pill on Left Edge) */}
      <div className="md:hidden fixed left-0 top-[35%] -translate-y-1/2 z-40">
        <button
          type="button"
          onClick={handleOpen}
          aria-label="Open Notice Board"
          aria-expanded={isOpen}
          className="group relative flex items-center gap-2 py-2.5 pl-2.5 pr-3.5 rounded-r-2xl bg-gradient-to-r from-[#B01B36] via-[#9E1B32] to-[#7D0E22] text-white border-y-2 border-r-2 border-[#DDA743] shadow-[0_8px_30px_rgba(176,27,54,0.55)] active:scale-95 transition-all duration-200 cursor-pointer select-none"
        >
          {/* Inner Golden Line */}
          <div className="absolute inset-y-1 right-1 left-0 rounded-r-xl border-y border-r border-[#DDA743]/40 pointer-events-none" />

          {/* Gilded Bell Icon */}
          <div className="relative shrink-0">
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#FFE29A] to-[#8C6214] p-0.5 shadow-sm flex items-center justify-center">
              <div className="w-full h-full rounded-full bg-[#6E0B1C] flex items-center justify-center">
                <Bell className="w-3.5 h-3.5 text-[#FFE29A]" />
              </div>
            </div>
            {urgentCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-300 opacity-90" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500 border border-white" />
              </span>
            )}
          </div>

          {/* Text Message */}
          <div className="flex flex-col text-left">
            <span className="text-[7.5px] font-serif font-bold text-[#FFE29A] tracking-widest uppercase leading-none">
              ॥ विद्या धनम् ॥
            </span>
            <span className="text-[11.5px] font-crest font-bold tracking-wide text-white leading-tight">
              Notice Board
            </span>
          </div>

          {/* Gilded Counter */}
          <span className="w-5 h-5 rounded-full bg-gradient-to-br from-[#FFE29A] to-[#8C6214] text-[#6E0B1C] text-[10px] font-mono font-black flex items-center justify-center shadow-xs ml-0.5">
            {COLLEGE_CONFIG.notices.length}
          </span>
        </button>
      </div>

      {/* =========================================================================
          B. SLIDE-OUT LEFT DRAWER & BACKDROP OVERLAY
          ========================================================================= */}
      {/* Backdrop */}
      <div
        onClick={handleClose}
        aria-hidden="true"
        className={`fixed inset-0 bg-stone-900/60 backdrop-blur-xs transition-opacity duration-300 z-60 ${
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Drawer Container (Slides from Left) */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Official College Notice Board and Board Circulars"
        className={`fixed inset-y-0 left-0 z-70 w-full max-w-[90vw] sm:max-w-[440px] bg-white shadow-2xl flex flex-col border-r border-[#E8DFD7] transform transition-transform duration-300 ease-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* 1. Regal Institutional Header */}
        <div className="bg-gradient-to-r from-[#1A080C] via-[#2A0E15] to-[#1A080C] text-white p-4 sm:p-5 border-b-2 border-[#DDA743]/50 shrink-0 relative">
          {/* Ornate Corner Elements */}
          <div className="absolute top-2 left-2 w-2 h-2 border-t-2 border-l-2 border-[#DDA743]" />
          <div className="absolute top-2 right-2 w-2 h-2 border-t-2 border-r-2 border-[#DDA743]" />

          <div className="flex items-start justify-between gap-3">
            <div className="space-y-1">
              <span className="text-[9px] uppercase tracking-widest text-[#DDA743] font-bold block">
                Bhagwat Prasad Gurukul Educational Trust&apos;s
              </span>
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-[#DDA743]/15 border border-[#DDA743]/50 flex items-center justify-center text-[#DFBA73]">
                  <Bell className="w-4 h-4" />
                </div>
                <h2 className="font-editorial text-lg sm:text-xl font-bold text-white tracking-tight">
                  Official Notice Bulletin
                </h2>
              </div>
              <p className="text-[10.5px] font-mono text-stone-300">
                Index: J-15.14.086 • SSC &amp; HSC Pune/Mumbai Board
              </p>
            </div>

            {/* Close Button */}
            <button
              type="button"
              onClick={handleClose}
              aria-label="Close Notice Board"
              className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-stone-200 hover:text-white transition-colors cursor-pointer shrink-0"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* 2. Category Filter Pills Bar */}
        <div className="px-4 py-2.5 bg-[#FCFAF7] border-b border-[#E8DFD7] shrink-0">
          <div className="flex items-center justify-between gap-2 mb-1.5">
            <div className="flex items-center gap-1.5 text-xs text-[#5C5556] font-semibold">
              <Filter className="w-3.5 h-3.5 text-[#9E1B32]" />
              <span>Filter by Category:</span>
            </div>
            <span className="text-[11px] font-mono text-slate-500">
              Showing {filteredNotices.length} of {COLLEGE_CONFIG.notices.length}
            </span>
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {categories.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3 py-1 rounded-full text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                    isActive
                      ? "bg-[#9E1B32] text-white shadow-xs"
                      : "bg-white text-slate-700 border border-[#E8DFD7] hover:bg-[#F4EFEA]"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* 3. Scrollable Notices Feed */}
        <div className="flex-1 overflow-y-auto overscroll-contain p-4 space-y-3.5 bg-[#FAF7F2]">
          {filteredNotices.length === 0 ? (
            <div className="text-center py-12 px-4 space-y-2">
              <AlertCircle className="w-8 h-8 text-stone-400 mx-auto" />
              <p className="text-sm font-semibold text-slate-700">
                No circulars found in this category.
              </p>
              <button
                onClick={() => setActiveCategory("All")}
                className="text-xs text-[#9E1B32] font-bold underline"
              >
                Reset to All Notices
              </button>
            </div>
          ) : (
            filteredNotices.map((notice) => (
              <article
                key={notice.id}
                className="bg-white rounded-xl sm:rounded-2xl border border-[#E8DFD7] p-3.5 sm:p-4 shadow-xs hover:shadow-md transition-all space-y-2.5"
              >
                {/* Meta Row */}
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5">
                    <span
                      className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                        notice.category === "Admissions"
                          ? "bg-[#9E1B32] text-white"
                          : notice.category === "Examinations"
                          ? "bg-blue-100 text-blue-900 border border-blue-200"
                          : notice.category === "Circular"
                          ? "bg-[#DDA743]/20 text-[#9E1B32] border border-[#DDA743]/40"
                          : "bg-emerald-100 text-emerald-900 border border-emerald-200"
                      }`}
                    >
                      {notice.category}
                    </span>

                    {notice.isUrgent && (
                      <span className="text-[10px] font-bold text-red-700 bg-red-100 px-2 py-0.5 rounded-full flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse" />
                        Urgent
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-1 text-[11px] text-[#5C5556]">
                    <Calendar className="w-3.5 h-3.5 text-[#DDA743]" />
                    <span>{notice.date}</span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="font-editorial text-sm sm:text-base font-bold text-[#1F1A1B] leading-snug">
                  {notice.title}
                </h3>

                {/* Summary */}
                <p className="text-xs text-[#5C5556] leading-relaxed">
                  {notice.summary}
                </p>

                {/* Action Row */}
                <div className="pt-2.5 border-t border-[#E8DFD7] flex items-center justify-between gap-2">
                  <span className="text-[10px] font-mono text-stone-400">
                    REF: {notice.id.toUpperCase()}
                  </span>

                  <div className="flex items-center gap-2">
                    {/* If Admissions related, allow direct enquiry trigger */}
                    {notice.category === "Admissions" && onOpenEnquiry && (
                      <button
                        onClick={() => {
                          handleClose();
                          onOpenEnquiry("XI");
                        }}
                        className="px-2.5 py-1 rounded-md bg-[#9E1B32] text-white text-[11px] font-bold hover:bg-[#801426] transition-colors flex items-center gap-1 cursor-pointer"
                      >
                        <span>Apply</span>
                        <ChevronRight className="w-3 h-3" />
                      </button>
                    )}

                    {/* Download official circular text file */}
                    <button
                      onClick={() => handleDownloadNotice(notice)}
                      disabled={downloadNoticeId === notice.id}
                      className="px-2.5 py-1 rounded-md bg-[#FCFAF7] border border-[#E8DFD7] text-slate-700 text-[11px] font-semibold hover:bg-[#F4EFEA] hover:text-[#9E1B32] transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      <Download className="w-3 h-3 text-[#DDA743]" />
                      <span>
                        {downloadNoticeId === notice.id ? "Saving..." : "Notice Slip"}
                      </span>
                    </button>
                  </div>
                </div>
              </article>
            ))
          )}
        </div>

        {/* 4. Bottom Administrative Helpline Footer */}
        <div className="p-3.5 sm:p-4 bg-white border-t border-[#E8DFD7] shrink-0 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-[#5C5556]">Admission Liaison Desk:</span>
            <a
              href={`tel:${COLLEGE_CONFIG.contact.admissionPhone.replace(/\s+/g, "")}`}
              className="font-bold text-[#9E1B32] hover:underline flex items-center gap-1"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>{COLLEGE_CONFIG.contact.admissionPhone}</span>
            </a>
          </div>

          <div className="pt-1.5 border-t border-slate-100 flex items-center justify-between text-[10px] text-stone-500">
            <span>Govt. of Maharashtra Regd.</span>
            <span className="font-serif font-bold text-[#DDA743]">
              ॥ विद्या धनम् ॥
            </span>
          </div>
        </div>
      </aside>
    </>
  );
}
