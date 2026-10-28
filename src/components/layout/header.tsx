"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  Menu,
  GraduationCap,
  ChevronDown,
  BookOpen,
  Building2,
  Award,
  Users,
  Compass,
  CreditCard,
  Briefcase,
  Layers,
  ArrowRight,
  ShieldCheck,
  ShieldAlert,
} from "lucide-react";
import { CrestLogo } from "@/components/ui/crest-logo";
import { Button } from "@/components/ui/button";
import { AdmissionClassLevel } from "@/components/home/enquiry-modal";
import { useInstitutionalNav } from "@/lib/use-institutional-nav";

interface HeaderProps {
  onOpenMobileNav: () => void;
  onOpenEnquiry: (classLevel?: AdmissionClassLevel) => void;
  onOpenFeeModal?: () => void;
}

export function Header({ onOpenMobileNav, onOpenEnquiry, onOpenFeeModal }: HeaderProps) {
  const { handleLinkClick } = useInstitutionalNav();
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMouseEnter = (menuName: string) => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
    }
    setActiveDropdown(menuName);
  };

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 150);
  };

  const closeDropdowns = () => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
    }
    setActiveDropdown(null);
  };

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-200 border-b ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm border-slate-200"
          : "bg-[#FCFAF7] border-slate-200/70"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between min-h-[4.25rem] sm:min-h-[4.75rem] py-1.5">
          {/* 1. Left: Institution Identity & Crest */}
          <CrestLogo />

          {/* 2. Center: Desktop Waterfall (Cascading Dropdown) Navigation */}
          <nav
            aria-label="Main institutional navigation"
            className="hidden lg:flex items-center gap-1 xl:gap-2"
          >
            {/* Overview Direct Link */}
            <Link
              href="/"
              onClick={handleLinkClick("overview", closeDropdowns)}
              className="px-3 py-2 text-xs xl:text-sm font-semibold text-slate-700 hover:text-[#9E1B32] rounded-md transition-colors hover:bg-[#9E1B32]/5 cursor-pointer"
            >
              Overview
            </Link>

            {/* A. ACADEMICS WATERFALL DROPDOWN */}
            <div
              className="relative"
              onMouseEnter={() => handleMouseEnter("academics")}
              onMouseLeave={handleMouseLeave}
            >
              <button
                type="button"
                onClick={() =>
                  setActiveDropdown(activeDropdown === "academics" ? null : "academics")
                }
                className={`flex items-center gap-1 px-3 py-2 text-xs xl:text-sm font-semibold rounded-md transition-colors cursor-pointer ${
                  activeDropdown === "academics"
                    ? "text-[#9E1B32] bg-[#9E1B32]/10"
                    : "text-slate-700 hover:text-[#9E1B32] hover:bg-[#9E1B32]/5"
                }`}
                aria-expanded={activeDropdown === "academics"}
              >
                <span>Academics</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    activeDropdown === "academics" ? "rotate-180 text-[#9E1B32]" : "text-slate-400"
                  }`}
                />
              </button>

              {activeDropdown === "academics" && (
                <div
                  className="absolute top-full left-0 mt-1 w-80 bg-white rounded-xl shadow-2xl border border-slate-200/90 p-2 z-50 animate-in fade-in slide-in-from-top-1 duration-150 divide-y divide-slate-100"
                  onMouseEnter={() => handleMouseEnter("academics")}
                  onMouseLeave={handleMouseLeave}
                >
                  <div className="py-1">
                    <Link
                      href="/#sections"
                      onClick={handleLinkClick("sections", closeDropdowns)}
                      className="group flex items-start gap-3 p-2.5 rounded-lg hover:bg-[#9E1B32]/5 transition-colors cursor-pointer"
                    >
                      <div className="w-8 h-8 rounded-lg bg-[#9E1B32]/10 text-[#9E1B32] flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-[#9E1B32] group-hover:text-white transition-colors">
                        <BookOpen className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="block text-xs font-bold text-slate-900 group-hover:text-[#9E1B32] transition-colors">
                          School Sections (Jr. KG to Std X)
                        </span>
                        <span className="text-[11px] text-slate-500 block leading-tight">
                          Pre-Primary, Primary, Upper Primary &amp; Secondary SSC Board
                        </span>
                      </div>
                    </Link>

                    <Link
                      href="/#streams"
                      onClick={handleLinkClick("streams", closeDropdowns)}
                      className="group flex items-start gap-3 p-2.5 rounded-lg hover:bg-[#9E1B32]/5 transition-colors cursor-pointer"
                    >
                      <div className="w-8 h-8 rounded-lg bg-[#9E1B32]/10 text-[#9E1B32] flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-[#9E1B32] group-hover:text-white transition-colors">
                        <GraduationCap className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="block text-xs font-bold text-slate-900 group-hover:text-[#9E1B32] transition-colors">
                          Junior College (XI &amp; XII HSC)
                        </span>
                        <span className="text-[11px] text-slate-500 block leading-tight">
                          Science (PCM/PCB/Bifocal CS), Commerce &amp; Arts
                        </span>
                      </div>
                    </Link>
                  </div>

                  <div className="py-1">
                    <button
                      type="button"
                      onClick={() => {
                        closeDropdowns();
                        if (onOpenFeeModal) onOpenFeeModal();
                      }}
                      className="w-full text-left group flex items-start gap-3 p-2.5 rounded-lg hover:bg-[#9E1B32]/5 transition-colors cursor-pointer"
                    >
                      <div className="w-8 h-8 rounded-lg bg-[#DDA743]/15 text-[#9E1B32] flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-[#9E1B32] group-hover:text-white transition-colors">
                        <CreditCard className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="block text-xs font-bold text-slate-900 group-hover:text-[#9E1B32] transition-colors">
                          Fee Structure &amp; Printable Voucher
                        </span>
                        <span className="text-[11px] text-slate-500 block leading-tight">
                          Official standard-wise fees &amp; term installment details
                        </span>
                      </div>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* B. CAMPUS LIFE WATERFALL DROPDOWN */}
            <div
              className="relative"
              onMouseEnter={() => handleMouseEnter("campus")}
              onMouseLeave={handleMouseLeave}
            >
              <button
                type="button"
                onClick={() =>
                  setActiveDropdown(activeDropdown === "campus" ? null : "campus")
                }
                className={`flex items-center gap-1 px-3 py-2 text-xs xl:text-sm font-semibold rounded-md transition-colors cursor-pointer ${
                  activeDropdown === "campus"
                    ? "text-[#9E1B32] bg-[#9E1B32]/10"
                    : "text-slate-700 hover:text-[#9E1B32] hover:bg-[#9E1B32]/5"
                }`}
                aria-expanded={activeDropdown === "campus"}
              >
                <span>Campus Life</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    activeDropdown === "campus" ? "rotate-180 text-[#9E1B32]" : "text-slate-400"
                  }`}
                />
              </button>

              {activeDropdown === "campus" && (
                <div
                  className="absolute top-full left-0 mt-1 w-72 bg-white rounded-xl shadow-2xl border border-slate-200/90 p-2 z-50 animate-in fade-in slide-in-from-top-1 duration-150"
                  onMouseEnter={() => handleMouseEnter("campus")}
                  onMouseLeave={handleMouseLeave}
                >
                  <Link
                    href="/campus"
                    onClick={closeDropdowns}
                    className="group flex items-start gap-3 p-2.5 rounded-lg hover:bg-[#9E1B32]/5 transition-colors"
                  >
                    <div className="w-8 h-8 rounded-lg bg-[#9E1B32]/10 text-[#9E1B32] flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-[#9E1B32] group-hover:text-white transition-colors">
                      <Building2 className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="block text-xs font-bold text-slate-900 group-hover:text-[#9E1B32] transition-colors">
                        Campus &amp; Modern Labs
                      </span>
                      <span className="text-[11px] text-slate-500 block leading-tight">
                        Science labs, IT suites, AC digital library
                      </span>
                    </div>
                  </Link>

                  <Link
                    href="/festivals"
                    onClick={closeDropdowns}
                    className="group flex items-start gap-3 p-2.5 rounded-lg hover:bg-[#9E1B32]/5 transition-colors"
                  >
                    <div className="w-8 h-8 rounded-lg bg-[#9E1B32]/10 text-[#9E1B32] flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-[#9E1B32] group-hover:text-white transition-colors">
                      <Award className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="block text-xs font-bold text-slate-900 group-hover:text-[#9E1B32] transition-colors">
                        Festivals &amp; Events
                      </span>
                      <span className="text-[11px] text-slate-500 block leading-tight">
                        Annual exhibitions, cultural fests, sports
                      </span>
                    </div>
                  </Link>

                  <Link
                    href="/toppers"
                    onClick={closeDropdowns}
                    className="group flex items-start gap-3 p-2.5 rounded-lg hover:bg-[#9E1B32]/5 transition-colors"
                  >
                    <div className="w-8 h-8 rounded-lg bg-[#DDA743]/20 text-[#DDA743] flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-[#9E1B32] group-hover:text-white transition-colors">
                      <Award className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="block text-xs font-bold text-slate-900 group-hover:text-[#9E1B32] transition-colors">
                        Board Toppers &amp; Honors
                      </span>
                      <span className="text-[11px] text-slate-500 block leading-tight">
                        99.9% board passing track record
                      </span>
                    </div>
                  </Link>
                </div>
              )}
            </div>

            {/* C. ABOUT & HERITAGE WATERFALL DROPDOWN */}
            <div
              className="relative"
              onMouseEnter={() => handleMouseEnter("about")}
              onMouseLeave={handleMouseLeave}
            >
              <button
                type="button"
                onClick={() =>
                  setActiveDropdown(activeDropdown === "about" ? null : "about")
                }
                className={`flex items-center gap-1 px-3 py-2 text-xs xl:text-sm font-semibold rounded-md transition-colors cursor-pointer ${
                  activeDropdown === "about"
                    ? "text-[#9E1B32] bg-[#9E1B32]/10"
                    : "text-slate-700 hover:text-[#9E1B32] hover:bg-[#9E1B32]/5"
                }`}
                aria-expanded={activeDropdown === "about"}
              >
                <span>About</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    activeDropdown === "about" ? "rotate-180 text-[#9E1B32]" : "text-slate-400"
                  }`}
                />
              </button>

              {activeDropdown === "about" && (
                <div
                  className="absolute top-full left-0 mt-1 w-68 bg-white rounded-xl shadow-2xl border border-slate-200/90 p-2 z-50 animate-in fade-in slide-in-from-top-1 duration-150"
                  onMouseEnter={() => handleMouseEnter("about")}
                  onMouseLeave={handleMouseLeave}
                >
                  <Link
                    href="/#leadership"
                    onClick={handleLinkClick("leadership", closeDropdowns)}
                    className="group flex items-start gap-3 p-2.5 rounded-lg hover:bg-[#9E1B32]/5 transition-colors cursor-pointer"
                  >
                    <div className="w-8 h-8 rounded-lg bg-[#9E1B32]/10 text-[#9E1B32] flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-[#9E1B32] group-hover:text-white transition-colors">
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="block text-xs font-bold text-slate-900 group-hover:text-[#9E1B32] transition-colors">
                        Founder &amp; Chairman&apos;s Desk
                      </span>
                      <span className="text-[11px] text-slate-500 block leading-tight">
                        1st Founder &amp; 2nd Chairman vision
                      </span>
                    </div>
                  </Link>

                  <Link
                    href="/anti-ragging"
                    onClick={closeDropdowns}
                    className="group flex items-start gap-3 p-2.5 rounded-lg hover:bg-[#9E1B32]/5 transition-colors"
                  >
                    <div className="w-8 h-8 rounded-lg bg-amber-500/15 text-[#9E1B32] flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-[#9E1B32] group-hover:text-white transition-colors">
                      <ShieldAlert className="w-4 h-4 text-[#9E1B32] group-hover:text-white transition-colors" />
                    </div>
                    <div>
                      <span className="block text-xs font-bold text-slate-900 group-hover:text-[#9E1B32] transition-colors">
                        Anti-Ragging Cell &amp; Helplines
                      </span>
                      <span className="text-[11px] text-slate-500 block leading-tight">
                        Zero-tolerance policy &amp; 24×7 emergency numbers
                      </span>
                    </div>
                  </Link>

                  <Link
                    href="/careers"
                    onClick={closeDropdowns}
                    className="group flex items-start gap-3 p-2.5 rounded-lg hover:bg-[#9E1B32]/5 transition-colors"
                  >
                    <div className="w-8 h-8 rounded-lg bg-[#9E1B32]/10 text-[#9E1B32] flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-[#9E1B32] group-hover:text-white transition-colors">
                      <Briefcase className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="block text-xs font-bold text-slate-900 group-hover:text-[#9E1B32] transition-colors">
                        Careers at Gurukul
                      </span>
                      <span className="text-[11px] text-slate-500 block leading-tight">
                        Faculty openings &amp; mentor positions
                      </span>
                    </div>
                  </Link>

                  <Link
                    href="/alumni"
                    onClick={closeDropdowns}
                    className="group flex items-start gap-3 p-2.5 rounded-lg hover:bg-[#9E1B32]/5 transition-colors"
                  >
                    <div className="w-8 h-8 rounded-lg bg-[#9E1B32]/10 text-[#9E1B32] flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-[#9E1B32] group-hover:text-white transition-colors">
                      <Users className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="block text-xs font-bold text-slate-900 group-hover:text-[#9E1B32] transition-colors">
                        Alumni Network
                      </span>
                      <span className="text-[11px] text-slate-500 block leading-tight">
                        Alumni registry &amp; success stories
                      </span>
                    </div>
                  </Link>
                </div>
              )}
            </div>
          </nav>

          {/* 3. Right: Action Buttons (Admissions Waterfall Dropdown) */}
          <div className="flex items-center gap-2.5 shrink-0">

            {/* ADMISSIONS WATERFALL ACTION DROPDOWN */}
            <div
              className="relative hidden sm:block"
              onMouseEnter={() => handleMouseEnter("admissions")}
              onMouseLeave={handleMouseLeave}
            >
              <Button
                variant="primary"
                size="sm"
                className="inline-flex items-center gap-1.5 text-xs font-bold bg-[#9E1B32] hover:bg-[#BA203B] text-white shadow-sm px-3.5 py-1.5 cursor-pointer"
                onClick={() =>
                  setActiveDropdown(activeDropdown === "admissions" ? null : "admissions")
                }
              >
                <GraduationCap className="w-3.5 h-3.5 text-[#DDA743]" />
                <span>Admissions 2026–27</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    activeDropdown === "admissions" ? "rotate-180" : ""
                  }`}
                />
              </Button>

              {activeDropdown === "admissions" && (
                <div
                  className="absolute top-full right-0 mt-1 w-64 bg-white rounded-xl shadow-2xl border border-slate-200/90 p-2 z-50 animate-in fade-in slide-in-from-top-1 duration-150"
                  onMouseEnter={() => handleMouseEnter("admissions")}
                  onMouseLeave={handleMouseLeave}
                >
                  <button
                    type="button"
                    onClick={() => {
                      closeDropdowns();
                      onOpenEnquiry("School");
                    }}
                    className="w-full text-left group flex items-start gap-2.5 p-2 rounded-lg hover:bg-[#9E1B32]/5 transition-colors cursor-pointer"
                  >
                    <div className="w-7 h-7 rounded-md bg-[#9E1B32]/10 text-[#9E1B32] flex items-center justify-center shrink-0 mt-0.5">
                      <BookOpen className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <span className="block text-xs font-bold text-slate-900 group-hover:text-[#9E1B32]">
                        School Admissions (Jr. KG – 10th)
                      </span>
                      <span className="text-[10px] text-slate-500 block">
                        Pre-Primary, Primary &amp; Secondary SSC
                      </span>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      closeDropdowns();
                      onOpenEnquiry("XI");
                    }}
                    className="w-full text-left group flex items-start gap-2.5 p-2 rounded-lg hover:bg-[#9E1B32]/5 transition-colors cursor-pointer"
                  >
                    <div className="w-7 h-7 rounded-md bg-[#DDA743]/20 text-[#DDA743] flex items-center justify-center shrink-0 mt-0.5">
                      <GraduationCap className="w-3.5 h-3.5 text-[#9E1B32]" />
                    </div>
                    <div>
                      <span className="block text-xs font-bold text-slate-900 group-hover:text-[#9E1B32]">
                        Class XI (FYJC) Admissions
                      </span>
                      <span className="text-[10px] text-slate-500 block">
                        Science, Commerce &amp; Arts Wings
                      </span>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      closeDropdowns();
                      onOpenEnquiry("XII");
                    }}
                    className="w-full text-left group flex items-start gap-2.5 p-2 rounded-lg hover:bg-[#9E1B32]/5 transition-colors cursor-pointer"
                  >
                    <div className="w-7 h-7 rounded-md bg-[#9E1B32]/10 text-[#9E1B32] flex items-center justify-center shrink-0 mt-0.5">
                      <GraduationCap className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <span className="block text-xs font-bold text-slate-900 group-hover:text-[#9E1B32]">
                        Class XII (SYJC) Admissions
                      </span>
                      <span className="text-[10px] text-slate-500 block">
                        Transfer &amp; Direct Board Enrollments
                      </span>
                    </div>
                  </button>

                  <Link
                    href="/#admissions"
                    onClick={handleLinkClick("admissions", closeDropdowns)}
                    className="w-full text-left group flex items-start gap-2.5 p-2 rounded-lg hover:bg-[#9E1B32]/5 transition-colors cursor-pointer border-t border-slate-100 mt-1 pt-2"
                  >
                    <div className="w-7 h-7 rounded-md bg-[#DDA743]/15 text-[#9E1B32] flex items-center justify-center shrink-0 mt-0.5">
                      <ArrowRight className="w-3.5 h-3.5 text-[#9E1B32]" />
                    </div>
                    <div>
                      <span className="block text-xs font-bold text-slate-900 group-hover:text-[#9E1B32]">
                        Admission Guidelines &amp; Desk
                      </span>
                      <span className="text-[10px] text-slate-500 block">
                        Documentation, procedure &amp; criteria
                      </span>
                    </div>
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile Navigation Toggle Button */}
            <button
              onClick={onOpenMobileNav}
              className="lg:hidden p-2 rounded-lg text-slate-700 hover:text-[#9E1B32] hover:bg-[#9E1B32]/5 border border-slate-200 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9E1B32]"
              aria-label="Open mobile navigation menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
