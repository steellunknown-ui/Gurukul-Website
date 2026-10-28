"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Award,
  Trophy,
  Medal,
  CheckCircle2,
  ChevronRight,
  GraduationCap,
  BookOpen,
  Filter,
  ArrowRight,
  ShieldCheck,
  Quote,
  Target,
  User,
  X,
  Maximize2,
} from "lucide-react";
import { UtilityBar } from "@/components/layout/utility-bar";
import { Header } from "@/components/layout/header";
import { MobileNav } from "@/components/layout/mobile-nav";
import { MobileDock } from "@/components/layout/mobile-dock";
import { Footer } from "@/components/layout/footer";
import { MotionReveal } from "@/components/ui/motion-reveal";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import { EnquiryModal, AdmissionClassLevel } from "@/components/home/enquiry-modal";
import { FeeStructureModal } from "@/components/home/fee-structure-modal";
import { NoticeDrawer } from "@/components/home/notice-drawer";
import { WhatsAppButton } from "@/components/ui/whatsapp-button";
import { TOPPERS_PAGE_DATA } from "@/config/toppers-data";
import { TopperStream, TopperItem } from "@/types";

export default function ToppersPage() {
  const [activeStream, setActiveStream] = useState<TopperStream>("All");
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [isEnquiryModalOpen, setIsEnquiryModalOpen] = useState(false);
  const [enquiryClassLevel, setEnquiryClassLevel] = useState<AdmissionClassLevel>("XI");
  const [selectedStreamForEnquiry, setSelectedStreamForEnquiry] = useState("science");

  // Fee modal state
  const [isFeeModalOpen, setIsFeeModalOpen] = useState(false);
  const [selectedFeeStandardId, setSelectedFeeStandardId] = useState("std-1");

  // Notice Drawer state
  const [isNoticeDrawerOpen, setIsNoticeDrawerOpen] = useState(false);

  // Lightbox Modal state for full portrait view
  const [selectedTopperForLightbox, setSelectedTopperForLightbox] = useState<TopperItem | null>(
    null
  );

  // Close lightbox on Escape key & lock body scroll
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedTopperForLightbox(null);
      }
    };
    if (selectedTopperForLightbox) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "unset";
      document.documentElement.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
      document.documentElement.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedTopperForLightbox]);

  const handleOpenEnquiry = (classLevel: AdmissionClassLevel = "XI", streamId?: string) => {
    setEnquiryClassLevel(classLevel);
    if (streamId) {
      setSelectedStreamForEnquiry(streamId);
    }
    setIsEnquiryModalOpen(true);
  };

  const handleOpenFeeModal = (standardId: string = "std-1") => {
    setSelectedFeeStandardId(standardId);
    setIsFeeModalOpen(true);
  };

  // Filtered toppers list based on active tab
  const filteredToppers = useMemo(() => {
    if (activeStream === "All") {
      return TOPPERS_PAGE_DATA.toppersList;
    }
    return TOPPERS_PAGE_DATA.toppersList.filter((t) => t.stream === activeStream);
  }, [activeStream]);

  const streamTabCounts = useMemo(() => {
    return {
      All: TOPPERS_PAGE_DATA.toppersList.length,
      Science: TOPPERS_PAGE_DATA.toppersList.filter((t) => t.stream === "Science").length,
      Commerce: TOPPERS_PAGE_DATA.toppersList.filter((t) => t.stream === "Commerce").length,
      Arts: TOPPERS_PAGE_DATA.toppersList.filter((t) => t.stream === "Arts").length,
      SSC: TOPPERS_PAGE_DATA.toppersList.filter((t) => t.stream === "SSC").length,
    };
  }, []);

  // Academic icons for summary metrics (without sparkles)
  const metricIcons = [Award, Trophy, GraduationCap, BookOpen];

  return (
    <div className="min-h-screen flex flex-col bg-[#FCFAF7] text-slate-900 relative selection:bg-red-600 selection:text-white">
      {/* Top Utility Helpline Bar */}
      <UtilityBar />

      {/* Main Sticky Header */}
      <Header
        onOpenMobileNav={() => setIsMobileNavOpen(true)}
        onOpenEnquiry={(classLevel) => handleOpenEnquiry(classLevel)}
        onOpenFeeModal={() => handleOpenFeeModal("std-1")}
      />

      <main id="main-content" className="flex-1 pb-16 lg:pb-0">
        {/* ========================================================= */}
        {/* 1. BREADCRUMBS & ROYAL PAGE HERO (BRIGHT, NON-DIMMED)     */}
        {/* ========================================================= */}
        <section className="relative text-white pt-8 pb-16 md:pt-14 md:pb-24 overflow-hidden border-b border-[#DDA743]/30">
          {/* Real Background Convocation / Merit Ceremony Image with Bright, Vivid Visibility */}
          <div className="absolute inset-0 z-0 overflow-hidden">
            <Image
              src="/images/toppers-hero-bg.jpg"
              alt="Gurukul Vidyapeeth Board Merit Awards & Felicitations"
              fill
              priority
              className="object-cover object-center scale-105 filter brightness-100 contrast-105"
            />
            {/* Soft Directional Gradients: Left side shaded for crisp text contrast, center & right stage brightly visible */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#180509]/80 via-[#23060c]/50 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#180509]/75 via-transparent to-black/25" />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            {/* Breadcrumb Navigation */}
            <nav aria-label="Breadcrumb" className="mb-6">
              <ol className="flex items-center space-x-2 text-xs md:text-sm text-stone-200 drop-shadow">
                <li>
                  <Link
                    href="/"
                    className="hover:text-[#DDA743] transition-colors flex items-center gap-1"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
                </li>
                <li>
                  <span className="text-stone-300">Academics</span>
                </li>
                <li>
                  <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
                </li>
                <li className="text-[#DDA743] font-semibold" aria-current="page">
                  Board Toppers & Merit Honors
                </li>
              </ol>
            </nav>

            {/* Hero Main Header Content */}
            <div className="max-w-3xl">
              <MotionReveal direction="down" delay={0.1}>
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#180509]/80 border border-[#DDA743]/50 text-[#DDA743] text-xs font-semibold uppercase tracking-wider mb-4 shadow-md backdrop-blur-md">
                  <Trophy className="w-3.5 h-3.5 text-[#DDA743]" />
                  <span>{TOPPERS_PAGE_DATA.hero.badge}</span>
                </div>
              </MotionReveal>

              <MotionReveal direction="up" delay={0.2}>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white tracking-tight leading-[1.15] drop-shadow-lg">
                  {TOPPERS_PAGE_DATA.hero.title}{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F6D074] via-[#DDA743] to-[#ECC460] block mt-1 drop-shadow">
                    {TOPPERS_PAGE_DATA.hero.highlight}
                  </span>
                </h1>
              </MotionReveal>

              <MotionReveal direction="up" delay={0.3}>
                <p className="mt-4 text-stone-100 text-sm sm:text-base leading-relaxed drop-shadow-md max-w-2xl font-medium">
                  {TOPPERS_PAGE_DATA.hero.description}
                </p>
              </MotionReveal>

              <MotionReveal direction="up" delay={0.4}>
                <div className="mt-6 flex flex-wrap items-center gap-3 text-xs text-stone-200">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#180509]/80 border border-white/20 font-mono text-stone-200 backdrop-blur-md shadow-sm">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    {TOPPERS_PAGE_DATA.hero.statutoryRef}
                  </span>
                  <span className="text-stone-400">•</span>
                  <span className="text-stone-200 font-medium drop-shadow">
                    Class X SSC & Class XII HSC Board Records
                  </span>
                </div>
              </MotionReveal>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* 2. SUMMARY METRICS BAND WITH ANIMATED COUNTERS            */}
        {/* ========================================================= */}
        <section className="relative -mt-8 z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5">
            {TOPPERS_PAGE_DATA.summaryMetrics.map((item, idx) => {
              const directions: ("left" | "up" | "right")[] = ["left", "up", "up", "right"];
              const IconComponent = metricIcons[idx % metricIcons.length];

              return (
                <MotionReveal
                  key={idx}
                  direction={directions[idx % directions.length]}
                  delay={0.15 + idx * 0.08}
                  hoverLift={true}
                  className="h-full"
                >
                  <div
                    className={`bg-white rounded-xl p-4 sm:p-5 border shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${item.border}`}
                  >
                    <div className="flex items-baseline justify-between gap-1">
                      <div
                        className={`text-2xl sm:text-3xl lg:text-4xl font-serif font-extrabold tracking-tight ${item.accent} whitespace-nowrap`}
                      >
                        <AnimatedCounter rawText={item.metric} duration={2.0} />
                      </div>
                      <div className={`p-1.5 rounded-lg ${item.bg}`}>
                        <IconComponent className={`w-4 h-4 ${item.accent}`} />
                      </div>
                    </div>
                    <div className="mt-2 text-xs sm:text-sm font-bold text-slate-800 leading-snug">
                      {item.label}
                    </div>
                    <div className="mt-0.5 text-[11px] text-slate-500 line-clamp-1">
                      {item.sublabel}
                    </div>
                  </div>
                </MotionReveal>
              );
            })}
          </div>
        </section>

        {/* ========================================================= */}
        {/* 3. INTERACTIVE STREAM FILTER TABS                         */}
        {/* ========================================================= */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 md:mt-16">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-stone-200">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#9E1B32] uppercase tracking-wider mb-1">
                <Filter className="w-3.5 h-3.5" />
                <span>Stream & Board Filtering</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-slate-900">
                Explore Merit Rankers by Discipline
              </h2>
            </div>

            {/* Filter Pills */}
            <div className="flex flex-wrap items-center gap-2">
              {(
                [
                  { key: "All", label: "All Toppers" },
                  { key: "Science", label: "HSC Science" },
                  { key: "Commerce", label: "HSC Commerce" },
                  { key: "Arts", label: "HSC Arts" },
                  { key: "SSC", label: "SSC Class X" },
                ] as { key: TopperStream; label: string }[]
              ).map((tab) => {
                const count = streamTabCounts[tab.key];
                const isActive = activeStream === tab.key;
                return (
                  <button
                    key={tab.key}
                    onClick={() => setActiveStream(tab.key)}
                    className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer ${
                      isActive
                        ? "bg-[#9E1B32] text-white shadow-md shadow-[#9E1B32]/25 ring-2 ring-[#DDA743]"
                        : "bg-white text-slate-700 border border-slate-200 hover:border-[#DDA743] hover:text-[#9E1B32]"
                    }`}
                  >
                    <span>{tab.label}</span>
                    <span
                      className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold ${
                        isActive ? "bg-[#DDA743] text-[#180509]" : "bg-stone-100 text-stone-600"
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* 4. DYNAMIC TOPPERS CARD GRID WITH ENLARGED PORTRAITS      */}
        {/* ========================================================= */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredToppers.map((topper, idx) => {
              const isEven = idx % 2 === 0;
              const cardDirection = isEven ? "left" : "right";

              return (
                <MotionReveal
                  key={topper.id}
                  direction={cardDirection}
                  delay={0.1 + (idx % 3) * 0.1}
                  hoverLift={true}
                  className="h-full"
                >
                  <div className="h-full flex flex-col bg-white rounded-2xl border border-stone-200 shadow-sm hover:shadow-xl transition-all duration-300 hover:border-[#DDA743] overflow-hidden group">
                    {/* Top Accent Strip & Stream Identifier */}
                    <div className="bg-gradient-to-r from-[#9E1B32] to-[#B3243D] px-4 py-2 text-white flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <Award className="w-3.5 h-3.5 text-[#DDA743]" />
                        <span className="text-xs font-bold tracking-wide">{topper.rank}</span>
                      </div>
                      <span className="text-[10.5px] font-mono font-semibold px-2 py-0.5 rounded bg-black/25 text-[#DDA743] border border-[#DDA743]/30">
                        {topper.exam} • {topper.year}
                      </span>
                    </div>

                    {/* Card Body - Streamlined & Compact */}
                    <div className="p-4 sm:p-4.5 flex-1 flex flex-col justify-between">
                      <div>
                        {/* Compact Portrait + Name & Quick Badges */}
                        <div className="flex items-start gap-3.5">
                          {/* Dedicated Topper Portrait Slot (Clickable Lightbox Trigger) */}
                          <button
                            type="button"
                            onClick={() => setSelectedTopperForLightbox(topper)}
                            className="relative w-18 h-18 sm:w-20 sm:h-20 shrink-0 rounded-xl overflow-hidden border-2 border-[#DDA743] shadow-sm bg-stone-100 group-hover:scale-105 group-hover:border-[#F6D074] transition-all duration-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#DDA743]"
                            title={`Click to view full portrait of ${topper.name}`}
                          >
                            {topper.photoUrl ? (
                              <Image
                                src={topper.photoUrl}
                                alt={topper.name}
                                fill
                                className="object-cover object-top"
                                sizes="(max-width: 640px) 72px, 80px"
                              />
                            ) : (
                              <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#9E1B32] to-[#600C1B] text-white">
                                <User className="w-8 h-8 text-[#DDA743]" />
                              </div>
                            )}

                            {/* Hover overlay hint */}
                            <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                              <Maximize2 className="w-5 h-5 text-white drop-shadow-md" />
                            </div>
                          </button>

                          {/* Name & Stream */}
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center justify-between gap-1">
                              <span className="text-[10px] font-bold text-[#9E1B32] uppercase tracking-wider truncate">
                                {topper.badge}
                              </span>
                              <span className="text-[9.5px] font-bold text-[#DDA743] uppercase tracking-wider bg-amber-50 px-1.5 py-0.5 rounded border border-[#DDA743]/40">
                                Ranker
                              </span>
                            </div>
                            <h3 className="text-base sm:text-lg font-serif font-bold text-slate-900 group-hover:text-[#9E1B32] transition-colors leading-snug">
                              {topper.name}
                            </h3>
                            <div className="text-[11px] text-stone-500">
                              {topper.stream === "SSC"
                                ? "Secondary Section (Class X)"
                                : `Higher Secondary (${topper.stream})`}
                            </div>
                            <button
                              type="button"
                              onClick={() => setSelectedTopperForLightbox(topper)}
                              className="mt-1 inline-flex items-center gap-1 text-[10.5px] font-semibold text-[#DDA743] hover:text-[#9E1B32] transition-colors cursor-pointer"
                            >
                              <Maximize2 className="w-2.5 h-2.5" />
                              <span>View Full Portrait</span>
                            </button>
                          </div>
                        </div>

                        {/* Streamlined Score Ribbon Bar */}
                        <div className="mt-2.5 flex items-center justify-between px-3 py-1.5 rounded-lg bg-gradient-to-r from-amber-50/80 via-[#FCFAF7] to-amber-50/50 border border-[#DDA743]/40">
                          <span className="text-[11px] font-semibold text-stone-700">
                            State Board Score
                          </span>
                          <span className="text-xl sm:text-2xl font-serif font-black text-[#9E1B32] tracking-tight leading-none">
                            <AnimatedCounter
                              value={topper.percentage}
                              decimals={1}
                              suffix="%"
                              duration={2.2}
                            />
                          </span>
                        </div>

                        {/* Subject Marks Breakdown Chips (2x2 Compact Grid) */}
                        <div className="mt-2.5 pt-2 border-t border-stone-100">
                          <div className="text-[10px] font-bold text-stone-600 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                            Key Subject Scores
                          </div>
                          <div className="grid grid-cols-2 gap-1.5">
                            {topper.keyMarks.map((km, kIdx) => (
                              <div
                                key={kIdx}
                                className="bg-[#FCFAF7] rounded-md px-2 py-1 border border-stone-200/80 flex items-center justify-between text-[11px]"
                              >
                                <span className="text-stone-600 font-medium truncate pr-1">
                                  {km.subject}
                                </span>
                                <span className="font-bold font-mono text-emerald-700 shrink-0">
                                  {km.score}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Concise Student Quote */}
                        <div className="mt-2.5 p-2 rounded-lg bg-stone-50 border border-stone-200/60 flex items-start gap-1.5">
                          <Quote className="w-3 h-3 text-[#DDA743] shrink-0 mt-0.5 opacity-70" />
                          <p className="text-[11px] italic text-stone-700 leading-snug font-serif line-clamp-2">
                            &ldquo;{topper.quote}&rdquo;
                          </p>
                        </div>
                      </div>

                      {/* Current Pursuit / Next Destination */}
                      <div className="mt-2.5 pt-2 border-t border-stone-100 flex items-center gap-1.5 text-[11px] text-stone-600">
                        <GraduationCap className="w-3.5 h-3.5 text-[#9E1B32] shrink-0" />
                        <span className="truncate text-slate-800 font-semibold">
                          {topper.currentPursuit}
                        </span>
                      </div>
                    </div>
                  </div>
                </MotionReveal>
              );
            })}
          </div>
        </section>

        {/* ========================================================= */}
        {/* 5. CENTUM & SUBJECT HONORS (100/100 PERFECT SCORERS)     */}
        {/* ========================================================= */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 md:mt-24">
          <div className="bg-gradient-to-br from-[#1E070B] via-[#2A0A10] to-[#140306] rounded-3xl p-6 sm:p-8 md:p-10 text-white relative overflow-hidden border border-[#DDA743]/40 shadow-2xl">
            {/* Background Ornaments */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-[#DDA743]/15 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-72 h-72 bg-[#9E1B32]/30 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10">
              <div className="max-w-3xl">
                <MotionReveal direction="down" delay={0.1}>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#DDA743]/20 border border-[#DDA743]/40 text-[#DDA743] text-xs font-semibold uppercase tracking-wider mb-3">
                    <Trophy className="w-3.5 h-3.5 text-[#DDA743]" />
                    <span>Academic Distinction</span>
                  </div>
                </MotionReveal>

                <MotionReveal direction="up" delay={0.2}>
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-white">
                    Centum & 98%+ Subject Legends
                  </h2>
                </MotionReveal>

                <MotionReveal direction="up" delay={0.3}>
                  <p className="mt-2 text-stone-300 text-sm sm:text-base leading-relaxed">
                    A testament to rigorous concept mastery and intensive paper solving. Gurukul
                    students consistently attain maximum possible board scores across challenging
                    quantitative and theoretical disciplines.
                  </p>
                </MotionReveal>
              </div>

              {/* Centum Scorers Grid */}
              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {TOPPERS_PAGE_DATA.centumScorers.map((scorer, sIdx) => {
                  const directions: ("left" | "up" | "right")[] = ["left", "up", "up", "right"];
                  return (
                    <MotionReveal
                      key={scorer.id}
                      direction={directions[sIdx % directions.length]}
                      delay={0.1 + (sIdx % 4) * 0.07}
                      hoverLift={true}
                      className="h-full"
                    >
                      <div className="bg-white/5 hover:bg-white/10 rounded-xl p-4 border border-white/10 hover:border-[#DDA743]/70 transition-all duration-300 backdrop-blur-sm h-full flex flex-col justify-between group">
                        <div>
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-[#9E1B32]/60 text-stone-200 border border-[#9E1B32]">
                              {scorer.exam} • {scorer.year}
                            </span>
                            <Medal className="w-4 h-4 text-[#DDA743]" />
                          </div>

                          <div className="mt-3 text-2xl font-serif font-bold text-[#DDA743] font-mono group-hover:scale-105 transition-transform origin-left">
                            {scorer.score}
                          </div>

                          <div className="mt-1 font-semibold text-white text-sm leading-snug">
                            {scorer.subject}
                          </div>
                        </div>

                        <div className="mt-4 pt-3 border-t border-white/10">
                          <div className="text-xs text-stone-300 font-medium">
                            {scorer.studentName}
                          </div>
                          <div className="text-[11px] text-stone-400 mt-0.5">
                            {scorer.stream}
                          </div>
                        </div>
                      </div>
                    </MotionReveal>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* 6. HOW GURUKUL NURTURES BOARD RANKERS (PEDAGOGY ROADMAP)  */}
        {/* ========================================================= */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 md:mt-24">
          <div className="text-center max-w-2xl mx-auto">
            <MotionReveal direction="down" delay={0.1}>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#9E1B32]/10 border border-[#9E1B32]/25 text-[#9E1B32] text-xs font-semibold uppercase tracking-wider mb-3">
                <Target className="w-3.5 h-3.5 text-[#9E1B32]" />
                <span>The Gurukul Edge</span>
              </div>
            </MotionReveal>

            <MotionReveal direction="up" delay={0.2}>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-slate-900">
                How Gurukul Consistently Produces Board Rankers
              </h2>
            </MotionReveal>

            <MotionReveal direction="up" delay={0.3}>
              <p className="mt-2 text-stone-600 text-sm sm:text-base leading-relaxed">
                Rankers are not born by chance; they are forged through systematic preparation,
                moderated answer rehearsals, and personalized faculty mentorship.
              </p>
            </MotionReveal>
          </div>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {TOPPERS_PAGE_DATA.pedagogyPillars.map((pillar, pIdx) => {
              const directions: ("left" | "up" | "right")[] = ["left", "up", "up", "right"];
              return (
                <MotionReveal
                  key={pillar.step}
                  direction={directions[pIdx % directions.length]}
                  delay={0.15 + pIdx * 0.1}
                  hoverLift={true}
                  className="h-full"
                >
                  <div className="h-full bg-white rounded-2xl p-6 border border-stone-200 shadow-sm hover:shadow-xl hover:border-[#DDA743] transition-all duration-300 flex flex-col justify-between group">
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-3xl font-serif font-extrabold text-[#9E1B32]/30 group-hover:text-[#9E1B32] transition-colors">
                          {pillar.step}
                        </span>
                        <div className="w-8 h-8 rounded-full bg-[#FCFAF7] border border-stone-200 flex items-center justify-center group-hover:border-[#DDA743] group-hover:bg-[#DDA743]/10 transition-colors">
                          <BookOpen className="w-4 h-4 text-[#9E1B32]" />
                        </div>
                      </div>

                      <h3 className="text-base font-bold text-slate-900 group-hover:text-[#9E1B32] transition-colors leading-snug">
                        {pillar.title}
                      </h3>

                      <p className="mt-2.5 text-xs sm:text-sm text-stone-600 leading-relaxed">
                        {pillar.description}
                      </p>
                    </div>

                    <div className="mt-5 pt-3 border-t border-stone-100 flex items-center gap-1 text-[11px] font-bold text-[#DDA743] uppercase tracking-wider">
                      <span>Proven System</span>
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    </div>
                  </div>
                </MotionReveal>
              );
            })}
          </div>
        </section>

        {/* ========================================================= */}
        {/* 7. ADMISSIONS CONSULTATION & VERIFICATION CTA BANNER      */}
        {/* ========================================================= */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 md:mt-24 mb-16">
          <MotionReveal direction="up" delay={0.2} hoverLift={true}>
            <div className="bg-gradient-to-r from-[#9E1B32] via-[#861226] to-[#600C1B] rounded-3xl p-8 sm:p-10 md:p-12 text-white shadow-xl relative overflow-hidden border border-[#DDA743]/30">
              {/* Background Accents */}
              <div className="absolute right-0 top-0 w-96 h-96 bg-white/5 rounded-full blur-2xl pointer-events-none" />

              <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
                <div className="max-w-2xl">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 text-[#DDA743] text-xs font-semibold uppercase tracking-wider mb-3">
                    <span className="w-2 h-2 rounded-full bg-[#DDA743] animate-pulse" />
                    <span>Admissions Open for Academic Year 2026–27</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-white leading-tight">
                    Start Your Journey Toward the 2026–27 Board Merit List
                  </h2>
                  <p className="mt-3 text-stone-200 text-sm sm:text-base leading-relaxed">
                    Join Gurukul Vidyapeeth Junior College for Class XI & XII (Science, Commerce,
                    Arts) or Secondary School (Classes V to X). Transparent merit-based admissions
                    with experienced board faculty and rigorous mock exam testing.
                  </p>

                  <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-stone-300">
                    <span className="flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#DDA743]" />
                      Zero Hidden Charges
                    </span>
                    <span className="flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#DDA743]" />
                      Bi-focal Computer Science Available
                    </span>
                    <span className="flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#DDA743]" />
                      3 Full Prelim Series
                    </span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0">
                  <button
                    onClick={() => handleOpenEnquiry("XI")}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#F6D074] via-[#DDA743] to-[#C9922C] text-[#180509] font-bold text-sm shadow-lg hover:shadow-xl hover:brightness-105 transition-all duration-200 cursor-pointer"
                  >
                    <span>Apply for Class XI Admissions</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => handleOpenFeeModal("std-11-sci")}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm border border-white/20 transition-all duration-200 cursor-pointer"
                  >
                    <span>View Junior College Fee Structure</span>
                  </button>

                  <button
                    onClick={() => handleOpenEnquiry("School")}
                    className="inline-flex items-center justify-center gap-2 px-6 py-2.5 text-xs text-stone-300 hover:text-white underline decoration-stone-400 hover:decoration-white transition-colors cursor-pointer"
                  >
                    <span>Enquire for School (Classes I to X)</span>
                  </button>
                </div>
              </div>
            </div>
          </MotionReveal>
        </section>
      </main>

      {/* ========================================================= */}
      {/* 8. INTERACTIVE TOPPER PORTRAIT LIGHTBOX MODAL             */}
      {/* ========================================================= */}
      {selectedTopperForLightbox && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Full portrait of ${selectedTopperForLightbox.name}`}
          className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-4 md:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setSelectedTopperForLightbox(null)}
        >
          {/* Outer Modal Card with Bright Royal Maroon & Gold Border - overflow-hidden prevents scrollbar from clipping or sticking out */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-lg bg-gradient-to-b from-[#9E1B32] via-[#851326] to-[#680C1B] rounded-3xl border-2 border-[#F6D074]/90 shadow-2xl shadow-[#9E1B32]/40 text-white overflow-hidden flex flex-col max-h-[90vh]"
          >
            {/* Pinned Header Bar with Exit Button */}
            <div className="bg-[#680C1B]/60 backdrop-blur-md px-5 py-3.5 border-b border-white/15 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2">
                <Trophy className="w-4 h-4 text-[#F6D074]" />
                <span className="text-xs font-bold text-[#F6D074] uppercase tracking-wider">
                  Merit Ranker Portrait
                </span>
              </div>
              <button
                onClick={() => setSelectedTopperForLightbox(null)}
                className="w-8 h-8 rounded-full bg-white/15 hover:bg-white/30 text-white hover:text-[#F6D074] border border-white/20 flex items-center justify-center transition-all duration-200 cursor-pointer group"
                aria-label="Close Lightbox"
              >
                <X className="w-4 h-4 group-hover:scale-110 transition-transform" />
              </button>
            </div>

            {/* Scrollable Inner Body with Custom Modal Scrollbar */}
            <div className="overflow-y-auto custom-modal-scrollbar p-5 sm:p-6 space-y-4 flex-1">
              <div className="flex flex-col items-center text-center">
                {/* Large Portrait with Gold Ring */}
                <div className="relative w-48 h-48 sm:w-56 sm:h-56 md:w-60 md:h-60 rounded-3xl overflow-hidden border-4 border-[#F6D074] shadow-2xl shadow-black/40 bg-white/10 shrink-0">
                  {selectedTopperForLightbox.photoUrl ? (
                    <Image
                      src={selectedTopperForLightbox.photoUrl}
                      alt={selectedTopperForLightbox.name}
                      fill
                      className="object-cover object-top"
                      sizes="(max-width: 640px) 192px, 240px"
                      priority
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-[#9E1B32]">
                      <User className="w-20 h-20 text-[#F6D074]" />
                    </div>
                  )}
                </div>

                {/* Student Credentials */}
                <div className="mt-4">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/25 border border-white/25 text-[#F6D074] text-xs font-bold uppercase tracking-wider shadow-sm">
                    <Award className="w-3.5 h-3.5" />
                    <span>{selectedTopperForLightbox.rank}</span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white mt-2">
                    {selectedTopperForLightbox.name}
                  </h3>

                  <div className="text-xs sm:text-sm text-stone-200 mt-1 font-medium">
                    {selectedTopperForLightbox.badge} •{" "}
                    {selectedTopperForLightbox.stream === "SSC"
                      ? "SSC Class X Board"
                      : `HSC Class XII (${selectedTopperForLightbox.stream})`}{" "}
                    • {selectedTopperForLightbox.year}
                  </div>
                </div>

                {/* Big Percentage Pill */}
                <div className="w-full mt-4 px-6 py-2.5 rounded-2xl bg-black/25 border border-white/20 flex items-center justify-center gap-4">
                  <div className="text-3xl sm:text-4xl font-serif font-black text-[#F6D074]">
                    {selectedTopperForLightbox.percentage}%
                  </div>
                  <div className="text-left text-xs text-stone-200 border-l border-white/20 pl-4">
                    <div className="font-bold text-white">Maharashtra State Board</div>
                    <div className="text-stone-300">Official Consolidated Result</div>
                  </div>
                </div>

                {/* Key Subjects */}
                <div className="w-full mt-4 pt-3 border-t border-white/15 text-left">
                  <div className="text-[11px] font-bold text-stone-200 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#F6D074]" />
                    Key Subject Scores
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {selectedTopperForLightbox.keyMarks.map((km, idx) => (
                      <div
                        key={idx}
                        className="bg-black/20 rounded-xl p-2.5 border border-white/15 flex items-center justify-between gap-2"
                      >
                        <span className="text-xs text-stone-200 font-medium truncate">
                          {km.subject}
                        </span>
                        <span className="text-xs font-bold font-mono text-[#F6D074] shrink-0">
                          {km.score}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Student Quote */}
                <div className="w-full mt-4 p-3.5 rounded-xl bg-black/20 border border-white/15 text-left">
                  <Quote className="w-4 h-4 text-[#F6D074] mb-1 opacity-90" />
                  <p className="text-xs italic text-stone-100 leading-relaxed font-serif">
                    &ldquo;{selectedTopperForLightbox.quote}&rdquo;
                  </p>
                </div>

                {/* Current Pursuit */}
                <div className="w-full mt-4 flex items-center gap-2 text-xs text-stone-200 justify-center">
                  <GraduationCap className="w-4 h-4 text-[#F6D074] shrink-0" />
                  <span className="font-semibold text-white">
                    {selectedTopperForLightbox.currentPursuit}
                  </span>
                </div>

                {/* Bottom Exit Button */}
                <button
                  onClick={() => setSelectedTopperForLightbox(null)}
                  className="w-full sm:w-auto mt-6 px-8 py-2.5 rounded-xl bg-white text-[#9E1B32] hover:bg-[#F6D074] hover:text-[#180509] font-bold text-xs shadow-lg hover:shadow-xl transition-all cursor-pointer"
                >
                  Close Full View (Esc)
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Institutional Footer */}
      <Footer />

      {/* Mobile Off-Canvas Drawer */}
      <MobileNav
        isOpen={isMobileNavOpen}
        onClose={() => setIsMobileNavOpen(false)}
        onOpenEnquiry={(classLevel) => handleOpenEnquiry(classLevel)}
      />

      {/* Mobile Quick Action Bottom Dock */}
      <MobileDock
        onOpenEnquiry={(classLevel) => handleOpenEnquiry(classLevel)}
        onOpenFeeModal={() => handleOpenFeeModal("std-1")}
        onOpenNoticeDrawer={() => setIsNoticeDrawerOpen(true)}
      />

      {/* Interactive Admission Enquiry Modal */}
      <EnquiryModal
        key={`${enquiryClassLevel}-${selectedStreamForEnquiry}`}
        isOpen={isEnquiryModalOpen}
        onClose={() => setIsEnquiryModalOpen(false)}
        defaultClassLevel={enquiryClassLevel}
        defaultStream={selectedStreamForEnquiry}
      />

      {/* Standard-Specific Gated Fee Structure & Printable Slip Modal */}
      <FeeStructureModal
        key={selectedFeeStandardId}
        isOpen={isFeeModalOpen}
        onClose={() => setIsFeeModalOpen(false)}
        initialStandardId={selectedFeeStandardId}
      />

      {/* Floating Left-Anchored Slide-Out Notice Panel */}
      <NoticeDrawer
        isOpen={isNoticeDrawerOpen}
        onClose={() => setIsNoticeDrawerOpen(false)}
        onOpen={() => setIsNoticeDrawerOpen(true)}
        onOpenEnquiry={(classLevel) => handleOpenEnquiry(classLevel)}
      />

      {/* Floating WhatsApp Admissions Helpdesk */}
      <WhatsAppButton />
    </div>
  );
}
