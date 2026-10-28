"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Building2,
  FlaskConical,
  Laptop,
  BookOpen,
  MonitorPlay,
  Award,
  Trophy,
  ShieldCheck,
  ChevronRight,
  Eye,
  Calendar,
  Clock,
  MapPin,
  CheckCircle2,
  ArrowRight,
  Maximize2,
  X,
  Compass,
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

// Comprehensive campus facilities data
const CAMPUS_FACILITIES = [
  {
    id: "science-labs",
    name: "Tiered Science Laboratories",
    category: "Laboratories",
    tagline: "Hands-on Experimental Physics, Chemistry & Biology",
    image: "/images/campus/campus-lab.jpg",
    specs: [
      "Dedicated workstations with chemical-resistant granite surfaces",
      "Optical benches, spectrometer arrays & laser experiment kits",
      "Compound & dissection microscopes with digital specimen cameras",
      "Maharashtra State Board HSC practical curriculum compliant",
      "Comprehensive lab safety: eyewash stations, fire control & fume extraction",
    ],
    curriculum: "Classes IX, X (SSC) & Classes XI, XII Science (HSC)",
    highlight: "State Board Approved Practical Center",
  },
  {
    id: "it-suites",
    name: "Computer Science & IT Suites",
    category: "IT & Computing",
    tagline: "Modern High-Performance Computing & Coding Hub",
    image: "/images/campus/campus-computer-lab.jpg",
    specs: [
      "High-speed Intel Core-i7 networked desktop terminals",
      "Dual high-speed 100 Mbps commercial fiber broadband redundant lines",
      "Integrated software suites for C++, Python, HTML5, Java & RDBMS",
      "Interactive 75-inch smart digital interactive flat panel for live coding",
      "Air-conditioned computing hall with ergonomic seating & cable management",
    ],
    curriculum: "Class 1 to 10 Computer Studies & Class XI–XII Bifocal CS / IT",
    highlight: "100% Practical Seat Ratio (1:1 Student per PC)",
  },
  {
    id: "central-library",
    name: "Air-Conditioned Digital Library",
    category: "Library & Archives",
    tagline: "Scholarly Sanctuary with 25,000+ Physical & Digital Volumes",
    image: "/images/campus/campus-library.jpg",
    specs: [
      "25,000+ volumes spanning academic curricula, classics & literature",
      "Dedicated entrance exam reserve: MHT-CET, NEET, JEE Main & NDA",
      "Digital terminal section for open educational resources & e-journals",
      "Individual quiet cubicles with dedicated brass reading lamps",
      "Automated barcode library cataloging system for seamless book issues",
    ],
    curriculum: "Open to all students from Primary, Secondary to Jr. College",
    highlight: "Quiet Scholarly Reading Hall (150+ Seating Capacity)",
  },
  {
    id: "smart-classrooms",
    name: "Interactive Smart Classrooms",
    category: "Classrooms",
    tagline: "Technology-Enabled Audio-Visual Interactive Learning",
    image: "/images/campus/campus-classroom.jpg",
    specs: [
      "Ultra-HD interactive flat panels with touch annotation & screen recording",
      "Tiered ergonomic wooden seating engineered for correct student posture",
      "Expansive floor-to-ceiling windows providing natural light & cross-ventilation",
      "Acoustically tuned sound dampening panels for clear teacher audibility",
      "Smart classroom lesson recording archives for revision and remedial review",
    ],
    curriculum: "All standards from Pre-Primary, Primary to HSC Board Classes",
    highlight: "Audio-Visual Smart Pedagogy",
  },
  {
    id: "sports-ground",
    name: "Sports Complex & Athletic Grounds",
    category: "Sports & Athletics",
    tagline: "Lush Green Ground, Running Track & Practice Nets",
    image: "/images/campus/campus-sports.jpg",
    specs: [
      "Full-sized multi-sport grass turf ground with mountain views",
      "Standard red running tracks for sprint drills and athletic training",
      "Dedicated turf cricket practice nets with bowling machine access",
      "Outdoor volleyball & basketball courts with tournament markings",
      "Indoor arena for Table Tennis, Carrom, Chess & Martial Arts",
    ],
    curriculum: "Compulsory Physical Education (PE) for all enrolled students",
    highlight: "Host Venue for Inter-School Tournaments",
  },
];

// Campus & Infrastructure Achievements (Laurels)
const CAMPUS_ACHIEVEMENTS = [
  {
    title: "Best Modern Laboratory Infrastructure",
    organizer: "District Educational Quality Forum",
    year: "2024–25",
    description: "Awarded for advanced physics, chemistry and computerized bifocal laboratory safety standards.",
    badge: "Excellence in Science Labs",
    icon: FlaskConical,
  },
  {
    title: "District Interschool Athletics Championship",
    organizer: "Maharashtra State District Sports Office (DSO)",
    year: "2024–25",
    description: "Gurukul student athletes bagged 14 gold, 8 silver, and 11 bronze medals in track & field events.",
    badge: "Overall Sports Champions",
    icon: Trophy,
  },
  {
    title: "Clean, Green & Safe Eco-Campus Certification",
    organizer: "Council of Environmental Education & Safety",
    year: "2023–24",
    description: "Recognized for solar-assisted power, rainwater harvesting, zero-plastic policy, and continuous air quality.",
    badge: "Green Campus Award",
    icon: ShieldCheck,
  },
  {
    title: "Digital Smart Pedagogy Institutional Honor",
    organizer: "Smart Educator Conclave Maharashtra",
    year: "2024–25",
    description: "Honored for successful 100% integration of interactive digital panels across secondary and junior college classes.",
    badge: "Smart Learning Leader",
    icon: Laptop,
  },
];

// Gallery Filter Categories
type GalleryCategory = "All" | "Laboratories" | "IT & Computing" | "Library & Archives" | "Classrooms" | "Sports & Athletics";

export default function CampusLifePage() {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [isEnquiryModalOpen, setIsEnquiryModalOpen] = useState(false);
  const [enquiryClassLevel, setEnquiryClassLevel] = useState<AdmissionClassLevel>("XI");
  const [selectedStreamForEnquiry, setSelectedStreamForEnquiry] = useState("science");

  // Fee modal state
  const [isFeeModalOpen, setIsFeeModalOpen] = useState(false);
  const [selectedFeeStandardId, setSelectedFeeStandardId] = useState("std-1");

  // Notice Drawer state
  const [isNoticeDrawerOpen, setIsNoticeDrawerOpen] = useState(false);

  // Gallery active filter
  const [activeCategory, setActiveCategory] = useState<GalleryCategory>("All");
  const [activeLightboxImage, setActiveLightboxImage] = useState<string | null>(null);

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

  const filteredFacilities =
    activeCategory === "All"
      ? CAMPUS_FACILITIES
      : CAMPUS_FACILITIES.filter((f) => f.category === activeCategory);

  return (
    <div className="min-h-screen flex flex-col bg-[#FCFAF7] text-slate-900 relative selection:bg-[#9E1B32] selection:text-white">
      {/* Top Utility Helpline Bar */}
      <UtilityBar />

      {/* Main Sticky Header */}
      <Header
        onOpenMobileNav={() => setIsMobileNavOpen(true)}
        onOpenEnquiry={(classLevel) => handleOpenEnquiry(classLevel)}
        onOpenFeeModal={() => handleOpenFeeModal("std-1")}
      />

      <main id="main-content" className="flex-1 pb-16 sm:pb-24">
        {/* ========================================================= */}
        {/* 1. HERO SECTION: CAMPUS & MODERN FACILITIES              */}
        {/* ========================================================= */}
        <section className="relative text-white pt-10 pb-20 md:pt-16 md:pb-28 overflow-hidden border-b border-[#DDA743]/30 min-h-[540px] flex items-center">
          {/* Panoramic Campus Hero Background Image — Natural & Crisp */}
          <div className="absolute inset-0 z-0 overflow-hidden">
            <Image
              src="/images/campus/campus-hero.jpg"
              alt="Gurukul Vidyapeeth Sprawling Collegiate Campus & Modern Infrastructure"
              fill
              priority
              className="object-cover object-center filter brightness-100 contrast-100"
              sizes="100vw"
            />
            {/* Localized neutral shadow on the left for text contrast — leaving the campus scenery vibrant */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 via-45% to-transparent pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
            {/* Breadcrumb */}
            <nav aria-label="Breadcrumb" className="mb-6">
              <ol className="flex items-center space-x-2 text-xs md:text-sm text-stone-200 drop-shadow">
                <li>
                  <Link href="/" className="hover:text-[#DDA743] transition-colors flex items-center gap-1">
                    Home
                  </Link>
                </li>
                <li>
                  <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
                </li>
                <li>
                  <span className="text-stone-300">Campus Experience</span>
                </li>
                <li>
                  <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
                </li>
                <li className="text-[#DDA743] font-semibold" aria-current="page">
                  Campus Life &amp; Facilities
                </li>
              </ol>
            </nav>

            <div className="max-w-3xl">
              <MotionReveal direction="down">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/70 border border-[#DDA743]/60 text-[#DDA743] text-xs font-semibold uppercase tracking-wider mb-4 shadow-md backdrop-blur-md">
                  <Building2 className="w-3.5 h-3.5 text-[#F6D074]" />
                  <span>Sprawling Academic Sanctuary • Built for Excellence</span>
                </div>
              </MotionReveal>

              <MotionReveal direction="up" delay={0.1}>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white tracking-tight leading-[1.15] drop-shadow-lg">
                  World-Class Campus &amp;{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F6D074] via-[#DDA743] to-[#ECC460] block mt-1 drop-shadow">
                    Modern Infrastructure
                  </span>
                </h1>
              </MotionReveal>

              <MotionReveal direction="up" delay={0.2}>
                <p className="mt-4 text-stone-100 text-sm sm:text-base leading-relaxed max-w-2xl font-medium drop-shadow-md">
                  Step inside Gurukul Vidyapeeth English High School &amp; Jr. College. An inspiring academic sanctuary blending serene collegiate architecture with cutting-edge science laboratories, high-speed computing hubs, scholarly digital libraries, and championship sports grounds.
                </p>
              </MotionReveal>

              <MotionReveal direction="up" delay={0.3}>
                <div className="mt-8 flex flex-wrap items-center gap-3.5">
                  <a
                    href="#facilities-explorer"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#9E1B32] hover:bg-[#BA203B] text-white text-xs sm:text-sm font-bold tracking-wide transition-all shadow-lg hover:shadow-xl cursor-pointer"
                  >
                    <span>Explore Modern Facilities</span>
                    <ArrowRight className="w-4 h-4 text-[#F6D074]" />
                  </a>

                  <button
                    onClick={() => handleOpenEnquiry("XI")}
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/30 text-xs sm:text-sm font-bold backdrop-blur-md transition-all cursor-pointer"
                  >
                    <Calendar className="w-4 h-4 text-[#F6D074]" />
                    <span>Schedule Campus Tour</span>
                  </button>
                </div>
              </MotionReveal>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* 2. STATUTORY & INFRASTRUCTURE METRIC COUNTERS             */}
        {/* ========================================================= */}
        <section className="relative -mt-8 z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5">
            {/* Metric 1: Modern Labs */}
            <MotionReveal direction="up" delay={0.05} hoverLift={true} className="h-full">
              <div className="bg-white rounded-xl p-4 sm:p-5 border shadow-lg hover:shadow-xl transition-all duration-300 border-[#9E1B32]/25 h-full flex flex-col justify-between">
                <div className="flex items-baseline justify-between gap-1">
                  <div className="text-2xl sm:text-3xl lg:text-4xl font-serif font-extrabold tracking-tight text-[#9E1B32] whitespace-nowrap">
                    <AnimatedCounter value={15} decimals={0} suffix="+" duration={1.8} />
                  </div>
                  <div className="p-1.5 rounded-lg bg-[#9E1B32]/10 text-[#9E1B32]">
                    <FlaskConical className="w-4 h-4" />
                  </div>
                </div>
                <div className="mt-2 text-xs sm:text-sm font-bold text-slate-800 leading-snug">
                  Modern Labs &amp; Studios
                </div>
                <div className="mt-0.5 text-[11px] text-slate-500 line-clamp-1">
                  Physics, Chemistry, Bio &amp; CS
                </div>
              </div>
            </MotionReveal>

            {/* Metric 2: Scholarly Volumes */}
            <MotionReveal direction="up" delay={0.1} hoverLift={true} className="h-full">
              <div className="bg-white rounded-xl p-4 sm:p-5 border shadow-lg hover:shadow-xl transition-all duration-300 border-[#DDA743]/30 h-full flex flex-col justify-between">
                <div className="flex items-baseline justify-between gap-1">
                  <div className="text-2xl sm:text-3xl lg:text-4xl font-serif font-extrabold tracking-tight text-[#DDA743] whitespace-nowrap">
                    <AnimatedCounter value={25} decimals={0} suffix="K+" duration={2.0} />
                  </div>
                  <div className="p-1.5 rounded-lg bg-[#DDA743]/15 text-[#9E1B32]">
                    <BookOpen className="w-4 h-4" />
                  </div>
                </div>
                <div className="mt-2 text-xs sm:text-sm font-bold text-slate-800 leading-snug">
                  Books &amp; Digital Volumes
                </div>
                <div className="mt-0.5 text-[11px] text-slate-500 line-clamp-1">
                  Central AC Reading Sanctuary
                </div>
              </div>
            </MotionReveal>

            {/* Metric 3: Safety & CCTV */}
            <MotionReveal direction="up" delay={0.15} hoverLift={true} className="h-full">
              <div className="bg-white rounded-xl p-4 sm:p-5 border shadow-lg hover:shadow-xl transition-all duration-300 border-emerald-200 h-full flex flex-col justify-between">
                <div className="flex items-baseline justify-between gap-1">
                  <div className="text-2xl sm:text-3xl lg:text-4xl font-serif font-extrabold tracking-tight text-emerald-700 whitespace-nowrap">
                    <AnimatedCounter value={100} decimals={0} suffix="%" duration={1.8} />
                  </div>
                  <div className="p-1.5 rounded-lg bg-emerald-50 text-emerald-700">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                </div>
                <div className="mt-2 text-xs sm:text-sm font-bold text-slate-800 leading-snug">
                  CCTV Safety &amp; Vigilance
                </div>
                <div className="mt-0.5 text-[11px] text-slate-500 line-clamp-1">
                  24×7 Monitored Campus Area
                </div>
              </div>
            </MotionReveal>

            {/* Metric 4: Board Passing Record */}
            <MotionReveal direction="up" delay={0.2} hoverLift={true} className="h-full">
              <div className="bg-white rounded-xl p-4 sm:p-5 border shadow-lg hover:shadow-xl transition-all duration-300 border-stone-200 h-full flex flex-col justify-between">
                <div className="flex items-baseline justify-between gap-1">
                  <div className="text-2xl sm:text-3xl lg:text-4xl font-serif font-extrabold tracking-tight text-slate-900 whitespace-nowrap">
                    <AnimatedCounter value={99.9} decimals={1} suffix="%" duration={2.2} />
                  </div>
                  <div className="p-1.5 rounded-lg bg-stone-100 text-slate-800">
                    <Trophy className="w-4 h-4" />
                  </div>
                </div>
                <div className="mt-2 text-xs sm:text-sm font-bold text-slate-800 leading-snug">
                  State Board Pass Record
                </div>
                <div className="mt-0.5 text-[11px] text-slate-500 line-clamp-1">
                  SSC &amp; HSC Consistent Distinction
                </div>
              </div>
            </MotionReveal>
          </div>
        </section>

        {/* ========================================================= */}
        {/* 3. FACILITIES DEEP DIVE SHOWCASE (WITH PHOTO PREVIEWS)     */}
        {/* ========================================================= */}
        <section id="facilities-explorer" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 sm:mt-24">
          <MotionReveal direction="down" className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#9E1B32] uppercase tracking-wider mb-2">
              <Building2 className="w-3.5 h-3.5" />
              <span>State-of-the-Art Infrastructure</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-slate-900">
              Purpose-Built Spaces for Academic &amp; Personal Growth
            </h2>
            <p className="mt-3 text-stone-600 text-xs sm:text-sm leading-relaxed max-w-2xl mx-auto">
              Every corner of Gurukul Vidyapeeth is designed to ignite curiosity, encourage collaboration, and nurture balanced development from early schooling through board graduation.
            </p>
          </MotionReveal>

          {/* Facility Cards Grid with Alternating Visual Flow */}
          <div className="space-y-12 sm:space-y-16">
            {CAMPUS_FACILITIES.map((facility, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <MotionReveal key={facility.id} direction="up" delay={0.1}>
                  <div
                    className={`bg-white rounded-3xl border border-stone-200/80 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-0 group`}
                  >
                    {/* Facility Image Container */}
                    <div
                      className={`relative min-h-[300px] sm:min-h-[380px] lg:col-span-7 overflow-hidden cursor-pointer ${
                        isEven ? "lg:order-1" : "lg:order-2"
                      }`}
                      onClick={() => setActiveLightboxImage(facility.image)}
                    >
                      <Image
                        src={facility.image}
                        alt={facility.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                        sizes="(max-width: 1024px) 100vw, 60vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-black/70 text-white text-xs font-semibold backdrop-blur-md">
                          <Maximize2 className="w-3.5 h-3.5 text-[#F6D074]" />
                          <span>Click to View Fullscreen</span>
                        </span>
                      </div>

                      {/* Top Corner Category Pill */}
                      <div className="absolute top-4 left-4 z-10">
                        <span className="px-3 py-1 rounded-full bg-black/75 border border-white/20 text-[#F6D074] text-xs font-bold uppercase tracking-wider backdrop-blur-md shadow-md">
                          {facility.category}
                        </span>
                      </div>
                    </div>

                    {/* Facility Content Container */}
                    <div
                      className={`p-6 sm:p-8 lg:p-10 lg:col-span-5 flex flex-col justify-between ${
                        isEven ? "lg:order-2" : "lg:order-1"
                      }`}
                    >
                      <div>
                        <div className="inline-flex items-center gap-1.5 text-[11px] font-bold text-[#9E1B32] uppercase tracking-wider bg-[#9E1B32]/10 px-2.5 py-0.5 rounded-md mb-2.5">
                          <Award className="w-3.5 h-3.5 text-[#DDA743]" />
                          <span>{facility.highlight}</span>
                        </div>

                        <h3 className="text-xl sm:text-2xl font-serif font-bold text-slate-900 leading-tight">
                          {facility.name}
                        </h3>

                        <p className="mt-1 text-xs sm:text-sm font-medium text-[#DDA743]">
                          {facility.tagline}
                        </p>

                        <div className="mt-5 space-y-2.5">
                          {facility.specs.map((spec, sIdx) => (
                            <div key={sIdx} className="flex items-start gap-2.5 text-xs text-stone-600 leading-relaxed">
                              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                              <span>{spec}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="mt-6 pt-5 border-t border-stone-100 flex items-center justify-between">
                        <div className="text-[11px] text-stone-500">
                          <span className="font-bold text-slate-700 block">Applicable Cohort:</span>
                          <span>{facility.curriculum}</span>
                        </div>

                        <button
                          onClick={() => handleOpenEnquiry("XI")}
                          className="inline-flex items-center gap-1 text-xs font-bold text-[#9E1B32] hover:text-[#BA203B] transition-colors cursor-pointer group/link"
                        >
                          <span>Enquire</span>
                          <ChevronRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                        </button>
                      </div>
                    </div>
                  </div>
                </MotionReveal>
              );
            })}
          </div>
        </section>

        {/* ========================================================= */}
        {/* 4. CAMPUS & INFRASTRUCTURE ACHIEVEMENTS (LAURELS)         */}
        {/* ========================================================= */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 sm:mt-24">
          <MotionReveal direction="up">
            <div className="rounded-3xl bg-gradient-to-br from-[#1A080C] via-[#350A14] to-[#1A080C] text-white p-6 sm:p-10 md:p-12 border border-[#DDA743]/50 shadow-2xl">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-8">
                <div className="max-w-2xl">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#DDA743]/20 border border-[#DDA743]/40 text-[#F6D074] text-xs font-bold uppercase tracking-wider mb-3">
                    <Trophy className="w-3.5 h-3.5" />
                    <span>Infrastructure &amp; Facility Laurels</span>
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white">
                    Institutional Milestones &amp; Facility Honors
                  </h2>
                  <p className="mt-2 text-xs sm:text-sm text-stone-200 leading-relaxed">
                    Our relentless commitment to providing top-tier classrooms, scientific apparatus, athletic grounds, and safety infrastructure has been celebrated across regional and state educational conclaves.
                  </p>
                </div>

                <div className="shrink-0 font-mono text-xs text-[#F6D074] bg-black/40 px-3.5 py-2 rounded-xl border border-white/10">
                  Accreditation: State Board Index J-15.14.086
                </div>
              </div>

              {/* Achievements Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
                {CAMPUS_ACHIEVEMENTS.map((achieve, idx) => {
                  const Icon = achieve.icon;
                  return (
                    <MotionReveal key={idx} direction="up" delay={idx * 0.08} hoverLift={true}>
                      <div className="p-5 rounded-2xl bg-black/35 border border-white/10 hover:border-[#DDA743]/60 transition-all flex flex-col justify-between h-full">
                        <div>
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-bold text-[#F6D074] bg-[#DDA743]/20 px-2 py-0.5 rounded border border-[#DDA743]/30">
                              {achieve.year}
                            </span>
                            <div className="w-8 h-8 rounded-lg bg-white/10 text-[#F6D074] flex items-center justify-center">
                              <Icon className="w-4 h-4" />
                            </div>
                          </div>

                          <h3 className="mt-3 text-sm font-serif font-bold text-white leading-snug">
                            {achieve.title}
                          </h3>

                          <div className="text-[11px] font-medium text-[#DDA743] mt-1">
                            {achieve.organizer}
                          </div>

                          <p className="mt-2 text-xs text-stone-300 leading-relaxed">
                            {achieve.description}
                          </p>
                        </div>

                        <div className="mt-4 pt-3 border-t border-white/10 text-[10px] font-mono text-stone-400">
                          {achieve.badge}
                        </div>
                      </div>
                    </MotionReveal>
                  );
                })}
              </div>
            </div>
          </MotionReveal>
        </section>

        {/* ========================================================= */}
        {/* 5. INTERACTIVE FILTERABLE CAMPUS PHOTO GALLERY            */}
        {/* ========================================================= */}
        <section id="photo-gallery" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 sm:mt-24">
          <MotionReveal direction="down" className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#9E1B32] uppercase tracking-wider mb-2">
              <Eye className="w-3.5 h-3.5" />
              <span>Campus Visual Tour</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900">
              Interactive Campus Photo Gallery
            </h2>
            <p className="mt-2 text-stone-600 text-xs sm:text-sm">
              Explore authentic photographs of our laboratories, library archives, smart classrooms, and athletic fields.
            </p>
          </MotionReveal>

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
            {(
              [
                "All",
                "Laboratories",
                "IT & Computing",
                "Library & Archives",
                "Classrooms",
                "Sports & Athletics",
              ] as GalleryCategory[]
            ).map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeCategory === cat
                    ? "bg-[#9E1B32] text-white shadow-md"
                    : "bg-white text-stone-700 border border-stone-200 hover:border-[#DDA743] hover:text-[#9E1B32]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Filtered Gallery Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredFacilities.map((item, idx) => (
              <MotionReveal key={item.id} direction="up" delay={idx * 0.05} hoverLift={true}>
                <div
                  onClick={() => setActiveLightboxImage(item.image)}
                  className="bg-white rounded-2xl border border-stone-200 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer group flex flex-col h-full"
                >
                  <div className="relative aspect-4/3 w-full overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                      <div className="w-10 h-10 rounded-full bg-white/90 text-slate-900 flex items-center justify-center shadow-md">
                        <Maximize2 className="w-4 h-4 text-[#9E1B32]" />
                      </div>
                    </div>
                    <div className="absolute bottom-3 left-3">
                      <span className="px-2.5 py-0.5 rounded-full bg-black/75 text-[#F6D074] text-[10.5px] font-bold backdrop-blur-md">
                        {item.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="text-base font-serif font-bold text-slate-900 group-hover:text-[#9E1B32] transition-colors">
                        {item.name}
                      </h4>
                      <p className="mt-1 text-xs text-stone-500 line-clamp-2">
                        {item.tagline}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-xs text-stone-400">
                      <span className="text-[11px] font-mono text-[#9E1B32] font-semibold">{item.highlight}</span>
                      <span className="flex items-center gap-1 text-[11px] font-medium text-stone-600 group-hover:text-[#9E1B32]">
                        <span>View</span>
                        <ChevronRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                </div>
              </MotionReveal>
            ))}
          </div>
        </section>

        {/* ========================================================= */}
        {/* 6. VISIT CAMPUS / SCHEDULE A TOUR INVITATION CARD          */}
        {/* ========================================================= */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 sm:mt-24">
          <MotionReveal direction="up">
            <div className="p-6 sm:p-10 rounded-3xl bg-amber-50/80 border border-[#DDA743]/60 shadow-md flex flex-col lg:flex-row items-center justify-between gap-8">
              <div className="space-y-3 max-w-2xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#9E1B32] text-white text-xs font-bold uppercase tracking-wider">
                  <MapPin className="w-3.5 h-3.5 text-[#F6D074]" />
                  <span>Campus Visit &amp; Guided Tours</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 leading-tight">
                  Experience Gurukul Vidyapeeth in Person
                </h3>
                <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
                  We warmly invite parents and prospective students to tour our academic wings, science laboratories, central library, and sports grounds. Meet our faculty and witness the vibrant learning atmosphere firsthand.
                </p>

                <div className="flex flex-wrap items-center gap-4 text-xs text-stone-700 pt-2 font-medium">
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-[#9E1B32]" />
                    Visiting Hours: Mon–Sat, 9:00 AM – 4:00 PM
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    Prior appointment recommended
                  </span>
                </div>
              </div>

              <div className="shrink-0 flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
                <button
                  onClick={() => handleOpenEnquiry("XI")}
                  className="px-6 py-3.5 rounded-xl bg-[#9E1B32] hover:bg-[#BA203B] text-white text-xs sm:text-sm font-bold tracking-wide transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Calendar className="w-4 h-4 text-[#F6D074]" />
                  <span>Schedule Guided Visit</span>
                </button>

                <button
                  onClick={() => handleOpenFeeModal("std-1")}
                  className="px-5 py-3.5 rounded-xl bg-white hover:bg-stone-50 border border-stone-300 text-slate-800 text-xs sm:text-sm font-bold transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Compass className="w-4 h-4 text-[#9E1B32]" />
                  <span>Download Fee Voucher</span>
                </button>
              </div>
            </div>
          </MotionReveal>
        </section>

        {/* Reassuring Closing Institutional Statement */}
        <MotionReveal direction="up" delay={0.1}>
          <div className="mt-12 sm:mt-16 text-center max-w-2xl mx-auto px-4">
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-medium">
              « Gurukul Vidyapeeth: Transforming potential into academic and character brilliance through state-of-the-art facilities and Vedic values. »
            </p>
            <p className="text-[11px] text-stone-400 mt-1 font-mono">
              Bhagwat Prasad Gurukul Educational Trust • Govt. Ref: 28903-97/DI-15/11/2016
            </p>
          </div>
        </MotionReveal>
      </main>

      {/* Lightbox Modal for Fullscreen Photo Viewing */}
      {activeLightboxImage && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 animate-in fade-in duration-200"
          onClick={() => setActiveLightboxImage(null)}
        >
          <button
            onClick={() => setActiveLightboxImage(null)}
            className="absolute top-5 right-5 p-2 rounded-full bg-white/20 hover:bg-white/40 text-white transition-colors cursor-pointer"
            aria-label="Close Fullscreen View"
          >
            <X className="w-6 h-6" />
          </button>
          <div
            className="relative max-w-5xl max-h-[85vh] w-full h-[70vh] rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={activeLightboxImage}
              alt="Campus Facility Fullscreen View"
              fill
              className="object-contain"
              sizes="90vw"
            />
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
