"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import {
  X,
  ChevronRight,
  GraduationCap,
  BookOpen,
  Phone,
  MapPin,
  CreditCard,
  Building2,
  Award,
  Users,
  ShieldAlert,
} from "lucide-react";
import { COLLEGE_CONFIG } from "@/config/college-config";
import { CrestLogo } from "@/components/ui/crest-logo";
import { Button } from "@/components/ui/button";
import { AdmissionClassLevel } from "@/components/home/enquiry-modal";

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenEnquiry: (classLevel?: AdmissionClassLevel) => void;
}

export function MobileNav({ isOpen, onClose, onOpenEnquiry }: MobileNavProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

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

  return (
    <div
      className="fixed inset-0 z-50 lg:hidden"
      role="dialog"
      aria-modal="true"
      aria-label="Mobile Navigation Menu"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#1A080C]/75 backdrop-blur-xs transition-opacity duration-300"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div className="fixed inset-y-0 right-0 w-full max-w-xs sm:max-w-sm bg-[#FCFAF7] border-l border-[#DDA743]/30 shadow-2xl flex flex-col z-10 transition-transform duration-300">
        {/* Drawer Header */}
        <div className="p-4 bg-gradient-to-r from-[#9E1B32] to-[#7A1224] text-white border-b border-[#7A1224] flex items-center justify-between">
          <CrestLogo variant="light" />
          <button
            onClick={onClose}
            className="p-2 text-stone-200 hover:text-white rounded-md hover:bg-white/10 transition-colors focus-visible:ring-2 focus-visible:ring-[#DDA743]"
            aria-label="Close navigation drawer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Navigation Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6">
          {/* Admissions Action Buttons */}
          <div className="space-y-2">
            <span className="text-[11px] font-crest font-bold text-[#9E1B32] uppercase tracking-wider block">
              Admissions 2026–2027
            </span>
            <Button
              variant="primary"
              size="md"
              className="w-full justify-center gap-2 font-bold shadow-md bg-[#9E1B32] hover:bg-[#BA203B] text-white"
              onClick={() => {
                onClose();
                onOpenEnquiry("School");
              }}
            >
              <BookOpen className="w-4 h-4 text-[#DDA743]" />
              Apply for School (Jr. KG – 10th)
            </Button>

            <Button
              variant="outline"
              size="md"
              className="w-full justify-center gap-2 font-bold border-[#9E1B32] text-[#9E1B32] hover:bg-[#9E1B32]/10"
              onClick={() => {
                onClose();
                onOpenEnquiry("XI");
              }}
            >
              <GraduationCap className="w-4 h-4 text-[#9E1B32]" />
              Apply for Class XI (FYJC)
            </Button>

            <Button
              variant="outline"
              size="md"
              className="w-full justify-center gap-2 font-bold border-slate-300 text-slate-700 hover:bg-slate-100"
              onClick={() => {
                onClose();
                onOpenEnquiry("XII");
              }}
            >
              <GraduationCap className="w-4 h-4 text-[#9E1B32]" />
              Apply for Class XII (SYJC)
            </Button>
          </div>

          {/* Academic Sections (School & College) */}
          <div className="space-y-2">
            <span className="text-[11px] font-crest font-bold text-[#9E1B32] uppercase tracking-wider block">
              Academic Spectrum (Jr. KG to Std XII)
            </span>
            <div className="grid grid-cols-1 gap-1.5">
              <a
                href="#sections"
                onClick={onClose}
                className="flex items-center justify-between p-2.5 rounded-lg bg-white hover:bg-[#9E1B32]/5 text-sm font-semibold text-slate-800 border border-slate-200 transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <BookOpen className="w-4 h-4 text-[#9E1B32]" />
                  <span>School Sections (Jr. KG to 10th SSC)</span>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </a>

              <a
                href="#streams"
                onClick={onClose}
                className="flex items-center justify-between p-2.5 rounded-lg bg-white hover:bg-[#9E1B32]/5 text-sm font-semibold text-slate-800 border border-slate-200 transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <GraduationCap className="w-4 h-4 text-[#9E1B32]" />
                  <span>Junior College (XI &amp; XII Science, Comm, Arts)</span>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </a>

              <a
                href="#admissions"
                onClick={onClose}
                className="flex items-center justify-between p-2.5 rounded-lg bg-white hover:bg-[#9E1B32]/5 text-sm font-semibold text-slate-800 border border-slate-200 transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <BookOpen className="w-4 h-4 text-[#DDA743]" />
                  <span>Admission Procedure &amp; Guidelines</span>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </a>
            </div>
          </div>

          {/* Campus & Community Links */}
          <div className="space-y-1">
            <span className="text-[11px] font-crest font-bold text-[#9E1B32] uppercase tracking-wider block mb-2">
              Campus Life &amp; Community
            </span>
            <nav className="flex flex-col space-y-1" aria-label="Mobile main navigation">
              <Link
                href="/gallery"
                onClick={onClose}
                className="flex items-center justify-between py-2 px-3 rounded-md text-sm font-medium text-slate-700 hover:text-[#9E1B32] hover:bg-slate-100 transition-colors"
              >
                <span className="flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-slate-400" />
                  Campus &amp; Modern Labs
                </span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </Link>
              <Link
                href="/festivals"
                onClick={onClose}
                className="flex items-center justify-between py-2 px-3 rounded-md text-sm font-medium text-slate-700 hover:text-[#9E1B32] hover:bg-slate-100 transition-colors"
              >
                <span className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-slate-400" />
                  Festivals &amp; Events
                </span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </Link>
              <Link
                href="/toppers"
                onClick={onClose}
                className="flex items-center justify-between py-2 px-3 rounded-md text-sm font-medium text-slate-700 hover:text-[#9E1B32] hover:bg-slate-100 transition-colors"
              >
                <span className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-[#DDA743]" />
                  Board Toppers &amp; Honors
                </span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </Link>
              <Link
                href="/anti-ragging"
                onClick={onClose}
                className="flex items-center justify-between py-2 px-3 rounded-md text-sm font-medium text-slate-700 hover:text-[#9E1B32] hover:bg-slate-100 transition-colors"
              >
                <span className="flex items-center gap-2">
                  <ShieldAlert className="w-4 h-4 text-[#9E1B32]" />
                  Anti-Ragging Cell &amp; Helplines
                </span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </Link>
              <Link
                href="/careers"
                onClick={onClose}
                className="flex items-center justify-between py-2 px-3 rounded-md text-sm font-medium text-slate-700 hover:text-[#9E1B32] hover:bg-slate-100 transition-colors"
              >
                <span>Careers at Gurukul</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </Link>
              <Link
                href="/alumni"
                onClick={onClose}
                className="flex items-center justify-between py-2 px-3 rounded-md text-sm font-medium text-slate-700 hover:text-[#9E1B32] hover:bg-slate-100 transition-colors"
              >
                <span>Alumni Network</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </Link>
            </nav>
          </div>

          {/* Contact Details Notice */}
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 space-y-2">
            <div className="flex items-center gap-2 font-bold text-slate-900">
              <Phone className="w-3.5 h-3.5 text-[#9E1B32]" />
              <span>Admissions Desk</span>
            </div>
            <p className="font-mono text-slate-800">{COLLEGE_CONFIG.contact.admissionPhone}</p>
            <div className="flex items-start gap-2 pt-1 border-t border-slate-200">
              <MapPin className="w-3.5 h-3.5 text-[#9E1B32] shrink-0 mt-0.5" />
              <span>{COLLEGE_CONFIG.contact.campusCity}</span>
            </div>
          </div>
        </div>

        {/* Drawer Footer */}
        <div className="p-3 bg-[#0B1E3F] text-white text-[11px] text-center border-t border-[#DDA743]/30">
          <span className="text-amber-300 block text-[9px] uppercase font-bold tracking-wider mb-1">
            BHAGWAT PRASAD GURUKUL EDUCATIONAL TRUST&apos;S
          </span>
          <span className="text-[#DDA743] block font-crest font-bold text-xs mt-0.5">GURUKUL VIDYAPEETH</span>
          <span className="text-slate-300 text-[10px] block mt-1">English High School &amp; Junior College (Jr. KG to Std XII)</span>
        </div>
      </div>
    </div>
  );
}
