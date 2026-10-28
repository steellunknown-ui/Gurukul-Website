"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Compass,
  ArrowRight,
  Shield,
  GraduationCap,
  ChevronLeft,
  ChevronRight,
  BookOpen,
  Award,
} from "lucide-react";

import { AdmissionClassLevel } from "@/components/home/enquiry-modal";

interface HeroProps {
  onOpenEnquiry: (classLevel?: AdmissionClassLevel) => void;
  onOpenFeeModal?: (standardId?: string) => void;
}

interface SlideItem {
  id: number;
  image: string;
  badge: string;
  kicker: string;
  titlePrefix: string;
  titleHighlight: string;
  tagline: string;
  description: string;
  cardStream: string;
  cardElectives: string;
  cardFocus: string;
}

const HERO_SLIDES: SlideItem[] = [
  {
    id: 1,
    image: "/images/hero/pre-primary.jpg",
    badge: "School Section • Nursery & Jr. KG to Class 5",
    kicker: "English Medium Pre-Primary & Primary Foundation",
    titlePrefix: "Nurturing Young Minds with",
    titleHighlight: "Curiosity & Character.",
    tagline: "Activity-Based Phonics, Mathematics, EVS & Moral Values",
    description:
      "From joyful kindergarten discovery corners to foundational primary English fluency, Gurukul Vidyapeeth empowers young learners with dedicated mentorship, interactive smart classes, and strong moral values.",
    cardStream: "Pre-Primary & Primary School",
    cardElectives: "English Medium • Phonics • Mathematics • Marathi • Hindi",
    cardFocus: "Nursery, Jr. KG, Sr. KG, and Classes 1 to 5 admissions now open for AY 2026–27.",
  },
  {
    id: 2,
    image: "/images/hero/secondary-lab.jpg",
    badge: "Secondary Section • Classes 6 to 10 (SSC Board)",
    kicker: "99.9% Maharashtra State Board Passing Track Record",
    titlePrefix: "Empowering Academic Rigour &",
    titleHighlight: "99.9% Board Passing.",
    tagline: "Modern Laboratories, Language Fluency & SSC Coaching",
    description:
      "Rigorous Maharashtra State Board curriculum with interactive classrooms, experimental science laboratories, tri-lingual mastery in English, Marathi, & Hindi, and dedicated board examination coaching.",
    cardStream: "Secondary Section (SSC Board)",
    cardElectives: "Advanced Science • Mathematics • Social Sciences • ICT",
    cardFocus: "Continuous 99.9% SSC and HSC board passing track record with dedicated mentorship.",
  },
  {
    id: 3,
    image: "/images/hero/slide-3.jpg",
    badge: "Junior College • Science Stream (XI & XII HSC)",
    kicker: "Junior College Science & Practical Laboratories",
    titlePrefix: "Scholarly Immersion in Tiered",
    titleHighlight: "Science & Technology Wings.",
    tagline: "Distinguished Faculty Mentorship & State Board Excellence",
    description:
      "Advanced physics, chemistry, biology, and computerized laboratories with senior educators preparing students for Maharashtra HSC Board merit with comprehensive academic rigor.",
    cardStream: "Junior College Science",
    cardElectives: "Physics • Chemistry • Maths • Biology • Bifocal CS",
    cardFocus: "State-of-the-art labs, unit test series, and personalized board mentorship.",
  },
  {
    id: 4,
    image: "/images/hero/slide-4.jpg",
    badge: "Junior College • Commerce & Arts Wings (XI & XII)",
    kicker: "Commerce, Financial Studies & Humanities",
    titlePrefix: "Professional Pathways in",
    titleHighlight: "Commerce, Finance & Humanities.",
    tagline: "Accountancy Mentorship & Civil Services Orientation",
    description:
      "Comprehensive accountancy, economics, secretarial practice, and humanities mentorship cultivating visionary business professionals and future civil servants in an inspiring academic sanctuary.",
    cardStream: "Junior College Commerce & Arts",
    cardElectives: "Book Keeping • Economics • SP • Maths • History • Politics",
    cardFocus: "Dedicated faculty mentorship and digital library archives for board toppers.",
  },
];

export function Hero({ onOpenEnquiry, onOpenFeeModal }: HeroProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [exitingSlide, setExitingSlide] = useState<number | null>(null);
  const [timerKey, setTimerKey] = useState(0);
  const [failedImages, setFailedImages] = useState<Record<number, boolean>>({});

  const totalSlides = HERO_SLIDES.length;

  const goToSlide = useCallback((nextIdx: number) => {
    setCurrentSlide((prev) => {
      if (prev === nextIdx) return prev;
      setExitingSlide(prev);
      return nextIdx;
    });
    setTimerKey((k) => k + 1);
  }, []);

  const nextSlide = useCallback(() => {
    goToSlide((currentSlide + 1) % totalSlides);
  }, [currentSlide, totalSlides, goToSlide]);

  const prevSlide = useCallback(() => {
    goToSlide((currentSlide - 1 + totalSlides) % totalSlides);
  }, [currentSlide, totalSlides, goToSlide]);

  // Clear exiting slide state after transition completes (750ms)
  useEffect(() => {
    if (exitingSlide === null) return;
    const timer = setTimeout(() => {
      setExitingSlide(null);
    }, 750);
    return () => clearTimeout(timer);
  }, [exitingSlide]);

  // Non-stop auto-slide effect: loops every 5 seconds, never stops on hover, resets on user slide selection
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, [nextSlide, timerKey]);

  // Keyboard navigation for accessible slider
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") nextSlide();
      if (e.key === "ArrowLeft") prevSlide();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [nextSlide, prevSlide]);

  const activeSlideData = HERO_SLIDES[currentSlide];

  return (
    <section
      id="overview"
      className="scroll-mt-20 sm:scroll-mt-24 relative overflow-hidden w-full max-w-full bg-[#1A080C] text-[#FCFAF7] border-b border-[#4E0B19] min-h-[640px] lg:min-h-[720px] flex flex-col justify-between"
      aria-label="Campus Highlights Carousel"
    >
      {/* Background Slides Container — Strict Right-to-Left Slide Motion */}
      <div className="absolute inset-0 z-0 overflow-hidden w-full">
        {HERO_SLIDES.map((slide, index) => {
          const isActive = index === currentSlide;
          const isExiting = index === exitingSlide;
          const defaultFallback =
            slide.id % 2 === 0 ? "/images/hero/slide-2.jpg" : "/images/hero/slide-1.jpg";
          const imageSrc = failedImages[slide.id] ? defaultFallback : slide.image;

          let slideClasses = "translate-x-full opacity-0 pointer-events-none transition-none z-0";

          if (isActive) {
            slideClasses = "translate-x-0 opacity-100 z-10 transition-transform duration-700 ease-out";
          } else if (isExiting) {
            slideClasses = "-translate-x-full opacity-100 z-10 transition-transform duration-700 ease-out";
          }

          return (
            <div
              key={slide.id}
              className={`absolute inset-0 will-change-transform ${slideClasses}`}
            >
              <Image
                src={imageSrc}
                alt={slide.kicker}
                fill
                priority={index <= 2}
                sizes="100vw"
                className="object-cover object-right md:object-center"
                onError={() => {
                  setFailedImages((prev) => ({ ...prev, [slide.id]: true }));
                }}
              />

              {/* Master Gradient Overlay — Clean neutral shadow strictly on the left for text contrast, leaving the right side bright and natural */}
              <div
                className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/75 via-42% lg:via-36% to-transparent"
                aria-hidden="true"
              />
              {/* Secondary Bottom Vignette for Mobile Viewports where text stacks vertically */}
              <div
                className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/50 via-45% to-transparent lg:hidden"
                aria-hidden="true"
              />
            </div>
          );
        })}
      </div>

      {/* Floating Edge Navigation Chevrons */}
      <button
        onClick={prevSlide}
        className="hidden md:flex absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-black/40 hover:bg-[#9E1B32] text-white/80 hover:text-white items-center justify-center border border-white/20 backdrop-blur-xs transition-all cursor-pointer shadow-lg hover:scale-105"
        aria-label="Previous Slide"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        onClick={nextSlide}
        className="hidden md:flex absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-black/40 hover:bg-[#9E1B32] text-white/80 hover:text-white items-center justify-center border border-white/20 backdrop-blur-xs transition-all cursor-pointer shadow-lg hover:scale-105"
        aria-label="Next Slide"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Main Foreground Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-14 lg:pt-16 pb-10 w-full flex-1 flex flex-col justify-center">
        <div className="max-w-3xl lg:max-w-4xl space-y-4 text-center lg:text-left">
          
          {/* Official Board Accreditation Tag */}
          <div className="inline-flex items-center justify-center lg:justify-start">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-medium bg-black/40 text-stone-200 border border-white/10 backdrop-blur-xs">
              <Shield className="w-3.5 h-3.5 text-[#DDA743]" />
              <span>Maharashtra State Board • SSC &amp; HSC Affiliated</span>
            </span>
          </div>

          {/* Prestige Headline */}
          <div key={`headline-${currentSlide}`} className="space-y-1.5 transition-all duration-500 animate-fadeIn">
            <h1 className="font-editorial text-[clamp(1.75rem,5.5vw,3.5rem)] font-bold tracking-tight text-[#FCFAF7] leading-[1.12] drop-shadow-sm break-words">
              {activeSlideData.titlePrefix}{" "}
              <span className="text-[#DDA743]">{activeSlideData.titleHighlight}</span>
            </h1>
            <p className="font-editorial italic text-sm sm:text-lg text-[#F3CA7E]/90 max-w-2xl mx-auto lg:mx-0">
              &ldquo;{activeSlideData.tagline}&rdquo;
            </p>
          </div>

          {/* Description */}
          <p key={`desc-${currentSlide}`} className="text-xs sm:text-sm lg:text-[15px] text-stone-200 leading-relaxed max-w-2xl mx-auto lg:mx-0 drop-shadow-xs transition-opacity duration-500">
            {activeSlideData.description}
          </p>

          {/* Action CTAs: Exactly 2 Balanced Admissions Buttons (School & Junior College) */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-2.5 sm:gap-4 w-full">
            <Button
              variant="gold"
              size="lg"
              className="w-full sm:w-auto min-h-[44px] justify-center gap-2 text-xs xs:text-sm sm:text-base font-bold shadow-lg hover:shadow-xl px-4 xs:px-6 py-3 sm:py-3.5"
              onClick={() => onOpenEnquiry("XI")}
            >
              <GraduationCap className="w-4 h-4 text-slate-950 shrink-0" />
              <span>Apply for Junior College (XI &amp; XII)</span>
            </Button>

            <Button
              variant="primary"
              size="lg"
              className="w-full sm:w-auto min-h-[44px] justify-center gap-2 text-xs xs:text-sm sm:text-base font-bold bg-[#9E1B32] hover:bg-[#BA203B] text-white border border-[#BA203B]/50 shadow-lg hover:shadow-xl px-4 xs:px-6 py-3 sm:py-3.5 cursor-pointer"
              onClick={() => onOpenEnquiry("School")}
            >
              <BookOpen className="w-4 h-4 text-[#DDA743] shrink-0" />
              <span>Apply for School (Jr. KG – 10th)</span>
            </Button>
          </div>

          {/* Institutional Academic Scope Footnote */}
          <div className="pt-3 border-t border-white/10 flex flex-wrap items-center justify-center lg:justify-start gap-x-4 sm:gap-x-6 gap-y-1.5 text-[11px] sm:text-xs text-stone-300">
            <span className="flex items-center gap-1.5 font-medium">
              <span className="w-2 h-2 rounded-full bg-[#DDA743] shrink-0" />
              Pre-Primary &amp; Primary (Nursery – 5th)
            </span>
            <span className="flex items-center gap-1.5 font-medium">
              <span className="w-2 h-2 rounded-full bg-[#DDA743] shrink-0" />
              Secondary Section (Classes 6 – 10 SSC)
            </span>
            <span className="flex items-center gap-1.5 font-medium">
              <span className="w-2 h-2 rounded-full bg-[#BA203B] shrink-0" />
              Junior College (Classes 11 &amp; 12 HSC)
            </span>
          </div>
        </div>
      </div>

      {/* 5-Second Master Loading Bar across Bottom Controls Bar */}
      <div className="relative z-20 w-full h-1 bg-white/10 overflow-hidden">
        <div
          key={`master-bar-${currentSlide}-${timerKey}`}
          className="h-full bg-gradient-to-r from-[#C5A059] via-[#DDA743] to-[#F3CA7E] shadow-[0_0_8px_#DDA743] animate-slide-progress"
        />
      </div>

      {/* Bottom Slider Progress Indicator Tabs: 2 School + 2 Junior College */}
      <div className="relative z-20 bg-black/50 backdrop-blur-md py-2.5 sm:py-3 px-3 sm:px-6 lg:px-8 border-t border-white/10">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2.5 sm:gap-3">
          {/* Tab Progress Pills */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 sm:gap-3 w-full sm:w-auto flex-1">
            {HERO_SLIDES.map((slide, idx) => {
              const isActive = idx === currentSlide;
              return (
                <button
                  key={slide.id}
                  onClick={() => goToSlide(idx)}
                  className={`text-left p-2 sm:p-2.5 rounded-lg transition-all duration-200 cursor-pointer ${
                    isActive
                      ? "bg-white/15 border border-[#DDA743]/60 shadow-md"
                      : "hover:bg-white/5 opacity-70 hover:opacity-100 border border-white/5"
                  }`}
                >
                  <div className="flex items-center justify-between text-[10px] sm:text-[11px] font-mono text-[#DDA743] mb-0.5">
                    <span>0{slide.id}</span>
                    {isActive && (
                      <span className="text-[8.5px] uppercase tracking-wider text-stone-300 font-sans">
                        Active
                      </span>
                    )}
                  </div>
                  <span className="text-[11px] sm:text-xs font-semibold text-white truncate block">
                    {slide.cardStream}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
