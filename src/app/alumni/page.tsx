"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Users,
  GraduationCap,
  Award,
  Briefcase,
  Calendar,
  CheckCircle2,
  ChevronRight,
  Globe,
  HeartHandshake,
  Mail,
  MapPin,
  Maximize2,
  Phone,
  Send,
  ShieldCheck,
  Star,
  Trophy,
  X,
  Compass,
  ArrowRight,
  Clock,
  BookOpen,
} from "lucide-react";
import { UtilityBar } from "@/components/layout/utility-bar";
import { Header } from "@/components/layout/header";
import { MobileNav } from "@/components/layout/mobile-nav";
import { MobileDock } from "@/components/layout/mobile-dock";
import { Footer } from "@/components/layout/footer";
import { MotionReveal } from "@/components/ui/motion-reveal";
import { EnquiryModal, AdmissionClassLevel } from "@/components/home/enquiry-modal";
import { FeeStructureModal } from "@/components/home/fee-structure-modal";
import { NoticeDrawer } from "@/components/home/notice-drawer";
import { WhatsAppButton } from "@/components/ui/whatsapp-button";
import { INSTITUTIONAL_EMAILS, getDepartmentEmail } from "@/config/email-routing";

// Distinguished Alumni Profiles
interface AlumniProfile {
  id: string;
  name: string;
  batch: string;
  stream: string;
  role: string;
  company: string;
  location: string;
  image: string;
  achievement: string;
  quote: string;
}

const DISTINGUISHED_ALUMNI: AlumniProfile[] = [
  {
    id: "alum-1",
    name: "Dr. Anjali Sharma, MD",
    batch: "Class of 2017",
    stream: "HSC Science (PCB)",
    role: "Senior Resident Cardiologist",
    company: "Apollo Hospitals / AIIMS Alum",
    location: "Mumbai, India",
    image: "/images/alumni/portraits/portrait_doctor.jpg",
    achievement: "Secured All-India Top 1% in NEET-UG with 98.4% in HSC Science",
    quote:
      "Gurukul's rigorous biology and chemistry practicals gave me the conceptual foundation, discipline, and scientific curiosity needed to thrive in medical school.",
  },
  {
    id: "alum-2",
    name: "Aditya Deshmukh",
    batch: "Class of 2018",
    stream: "HSC Science (Bifocal CS)",
    role: "Staff Software Engineer & Tech Lead",
    company: "Google Cloud (Ex-IIT Bombay)",
    location: "Bengaluru, India",
    image: "/images/alumni/portraits/portrait_tech.jpg",
    achievement: "Lead architect for enterprise distributed data pipelines",
    quote:
      "Writing my first C++ programs and debugging hardware in Gurukul's computer suite sparked my lifelong obsession with building scalable cloud software.",
  },
  {
    id: "alum-3",
    name: "Neha Kulkarni, CA",
    batch: "Class of 2019",
    stream: "HSC Commerce (Accounts & Maths)",
    role: "Senior Corporate Audit Manager",
    company: "Deloitte India",
    location: "Thane / Mumbai, India",
    image: "/images/alumni/portraits/portrait_finance.jpg",
    achievement: "All-India Rank 28 in CA Final with 99/100 in HSC Bookkeeping",
    quote:
      "The dedication of Gurukul's commerce teachers turned complex balance sheets and partnership accounts into second nature, setting me up for CA success.",
  },
  {
    id: "alum-4",
    name: "Vikram Singh, IAS",
    batch: "Class of 2016",
    stream: "SSC & HSC Arts / Humanities",
    role: "Assistant Secretary, Civil Administration",
    company: "Ministry of Finance, Govt. of India",
    location: "New Delhi, India",
    image: "/images/alumni/portraits/portrait_civil.jpg",
    achievement: "Cracked UPSC Civil Services Examination in 1st attempt",
    quote:
      "Beyond academic excellence, Gurukul instilled in us empathy, civic responsibility, and resilience — values that guide every administrative decision I make today.",
  },
];

// Alumni Impact Metrics
const ALUMNI_METRICS = [
  {
    value: "10,000+",
    label: "Graduates Worldwide",
    subtext: "Across India, US, UK, UAE & Singapore",
    icon: Globe,
    accent: "text-[#9E1B32]",
    bg: "bg-[#9E1B32]/10",
  },
  {
    value: "15+",
    label: "Graduating Batches",
    subtext: "SSC & HSC Maharashtra Board Alumni",
    icon: GraduationCap,
    accent: "text-[#DDA743]",
    bg: "bg-[#DDA743]/15",
  },
  {
    value: "99.9%",
    label: "Passing Legacy",
    subtext: "Continuous Board Distinction Track Record",
    icon: Award,
    accent: "text-emerald-700",
    bg: "bg-emerald-50",
  },
  {
    value: "₹25L+",
    label: "Mentorship & Scholarships",
    subtext: "Contributed by Alumni to Deserving Students",
    icon: HeartHandshake,
    accent: "text-indigo-700",
    bg: "bg-indigo-50",
  },
];

export default function AlumniPage() {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [isEnquiryModalOpen, setIsEnquiryModalOpen] = useState(false);
  const [enquiryClassLevel, setEnquiryClassLevel] = useState<AdmissionClassLevel>("XI");
  const [selectedStreamForEnquiry, setSelectedStreamForEnquiry] = useState("science");

  // Fee modal state
  const [isFeeModalOpen, setIsFeeModalOpen] = useState(false);
  const [selectedFeeStandardId, setSelectedFeeStandardId] = useState("std-1");

  // Notice Drawer state
  const [isNoticeDrawerOpen, setIsNoticeDrawerOpen] = useState(false);

  // Lightbox Modal for Alumni Portrait
  const [activePortrait, setActivePortrait] = useState<AlumniProfile | null>(null);

  // Registration Form State
  const formRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({
    fullName: "",
    batchYear: "2018",
    streamCompleted: "HSC Science (PCM / PCB / Bifocal)",
    currentRole: "",
    organization: "",
    currentCity: "Mumbai / Thane",
    phone: "",
    email: "",
    linkedIn: "",
    willingToMentor: true,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [registeredMember, setRegisteredMember] = useState<{
    memberId: string;
    name: string;
    batch: string;
    stream: string;
    routedEmail: string;
  } | null>(null);

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

  const scrollToRegistration = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const randomCode = Math.floor(1000 + Math.random() * 9000);
    const memberId = `GVK-ALUM-${formData.batchYear}-${randomCode}`;
    const destinationEmail = getDepartmentEmail("alumni");

    setTimeout(() => {
      setRegisteredMember({
        memberId,
        name: formData.fullName,
        batch: formData.batchYear,
        stream: formData.streamCompleted,
        routedEmail: destinationEmail,
      });
      setIsSubmitting(false);
    }, 700);
  };

  const resetForm = () => {
    setRegisteredMember(null);
    setFormData({
      fullName: "",
      batchYear: "2018",
      streamCompleted: "HSC Science (PCM / PCB / Bifocal)",
      currentRole: "",
      organization: "",
      currentCity: "Mumbai / Thane",
      phone: "",
      email: "",
      linkedIn: "",
      willingToMentor: true,
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FCFAF7] text-slate-800 font-sans selection:bg-[#9E1B32]/10 selection:text-[#9E1B32]">
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
        {/* 1. HERO SECTION: GURUKUL ALUMNI ASSOCIATION               */}
        {/* ========================================================= */}
        <section className="relative text-white pt-10 pb-16 md:pt-16 md:pb-24 overflow-hidden border-b border-[#DDA743]/30 min-h-[500px] flex items-center">
          {/* Panoramic Alumni Reunion Photo (User Provided) */}
          <div className="absolute inset-0 z-0 overflow-hidden">
            <Image
              src="/images/alumni/alumni-hero.jpg"
              alt="Gurukul Vidyapeeth alumni gathering for homecoming and reunion on the green campus courtyard"
              fill
              priority
              className="object-cover object-center filter brightness-100 contrast-100"
              sizes="100vw"
            />
            {/* Natural gradient for readability on left while keeping alumni gathering bright & visible */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/65 via-50% to-black/20 pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
            {/* Breadcrumb Navigation */}
            <MotionReveal direction="down" delay={0.05}>
              <nav aria-label="Breadcrumb" className="mb-5">
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
                    <span className="text-stone-300">Community</span>
                  </li>
                  <li>
                    <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
                  </li>
                  <li className="text-[#DDA743] font-semibold" aria-current="page">
                    Alumni Network &amp; Registry
                  </li>
                </ol>
              </nav>
            </MotionReveal>

            <div className="max-w-3xl">
              <MotionReveal direction="down" delay={0.1}>
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/70 border border-[#DDA743]/60 text-[#DDA743] text-xs font-semibold uppercase tracking-wider mb-4 shadow-md backdrop-blur-md">
                  <Users className="w-3.5 h-3.5 text-[#F6D074]" />
                  <span>Gurukul Alumni Association • Reconnect • Relive • Reimagine</span>
                </div>
              </MotionReveal>

              <MotionReveal direction="up" delay={0.18}>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white tracking-tight leading-[1.18] drop-shadow-lg">
                  A Lifelong Bond of Scholars:{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F6D074] via-[#DDA743] to-[#ECC460] block mt-1 drop-shadow">
                    Gurukul Alumni Network
                  </span>
                </h1>
              </MotionReveal>

              <MotionReveal direction="up" delay={0.26}>
                <p className="mt-4 text-stone-100 text-sm sm:text-base leading-relaxed max-w-2xl font-medium drop-shadow-md">
                  Once a Gurukulite, always a Gurukulite. Reconnect with batchmates, mentor ambitious school and junior college scholars, share professional opportunities, and celebrate our collective journey of impact across the globe.
                </p>
              </MotionReveal>

              <MotionReveal direction="up" delay={0.34}>
                <div className="mt-7 flex flex-wrap items-center gap-3.5">
                  <button
                    onClick={scrollToRegistration}
                    className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#9E1B32] hover:bg-[#BA203B] text-white text-xs sm:text-sm font-bold tracking-wide transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 cursor-pointer"
                  >
                    <Users className="w-4 h-4 text-[#F6D074]" />
                    <span>Register in Alumni Directory</span>
                    <ArrowRight className="w-4 h-4 text-[#F6D074]" />
                  </button>

                  <a
                    href="#hall-of-fame"
                    className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/30 text-xs sm:text-sm font-bold backdrop-blur-md transition-all hover:-translate-y-0.5 cursor-pointer"
                  >
                    <Award className="w-4 h-4 text-[#F6D074]" />
                    <span>Explore Alumni Portraits</span>
                  </a>
                </div>
              </MotionReveal>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* 2. ALUMNI IMPACT METRICS (4 STATS)                        */}
        {/* ========================================================= */}
        <section className="relative -mt-6 z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5">
            {ALUMNI_METRICS.map((metric, idx) => {
              const Icon = metric.icon;
              const directions: ("left" | "up" | "right")[] = ["left", "up", "up", "right"];
              return (
                <MotionReveal
                  key={idx}
                  direction={directions[idx]}
                  delay={0.1 + idx * 0.08}
                  hoverLift={true}
                  className="h-full"
                >
                  <div className="bg-white rounded-xl p-4 sm:p-5 border shadow-md hover:shadow-xl transition-all duration-300 border-slate-200/90 h-full flex flex-col justify-between group">
                    <div className="flex items-baseline justify-between gap-1">
                      <div
                        className={`text-2xl sm:text-3xl lg:text-4xl font-serif font-extrabold tracking-tight ${metric.accent} whitespace-nowrap`}
                      >
                        {metric.value}
                      </div>
                      <div className={`p-2 rounded-lg ${metric.bg} group-hover:scale-110 transition-transform`}>
                        <Icon className={`w-4 h-4 ${metric.accent}`} />
                      </div>
                    </div>
                    <div className="mt-2 text-xs sm:text-sm font-bold text-slate-800 leading-snug">
                      {metric.label}
                    </div>
                    <div className="mt-0.5 text-[11px] text-slate-500 line-clamp-1">
                      {metric.subtext}
                    </div>
                  </div>
                </MotionReveal>
              );
            })}
          </div>
        </section>

        {/* ========================================================= */}
        {/* 3. DISTINGUISHED ALUMNI PORTRAITS (HALL OF FAME)          */}
        {/* ========================================================= */}
        <section id="hall-of-fame" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20">
          <MotionReveal direction="down">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#9E1B32]/10 text-[#9E1B32] text-xs font-bold uppercase tracking-wider mb-2">
                <Trophy className="w-3.5 h-3.5" />
                <span>Distinguished Hall of Fame</span>
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900">
                Portraits of Excellence &amp; Leadership
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-2">
                Meet our alumni trailblazers who began their journey in Gurukul classrooms and now make meaningful contributions across global industries.
              </p>
            </div>
          </MotionReveal>

          {/* Alumni Portraits Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {DISTINGUISHED_ALUMNI.map((alumnus, idx) => (
              <MotionReveal
                key={alumnus.id}
                direction="up"
                delay={0.1 + idx * 0.08}
                hoverLift={true}
                className="h-full"
              >
                <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:border-[#DDA743] hover:shadow-xl transition-all duration-300 flex flex-col justify-between h-full overflow-hidden group">
                  <div>
                    {/* Portrait Image Container */}
                    <div className="relative w-full aspect-square overflow-hidden bg-slate-100">
                      <Image
                        src={alumnus.image}
                        alt={`Portrait of ${alumnus.name}`}
                        fill
                        className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, 25vw"
                      />
                      {/* Gradient Overlay for name contrast */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

                      {/* Clickable Full Portrait Icon */}
                      <button
                        type="button"
                        onClick={() => setActivePortrait(alumnus)}
                        className="absolute top-3 right-3 p-1.5 rounded-lg bg-black/60 text-white/90 hover:text-white hover:bg-black/80 backdrop-blur-md transition-all cursor-pointer"
                        title="View Full Portrait & Story"
                      >
                        <Maximize2 className="w-3.5 h-3.5" />
                      </button>

                      {/* Batch Badge on Image */}
                      <div className="absolute top-3 left-3 px-2 py-0.5 rounded-md bg-[#9E1B32]/90 text-[#F6D074] text-[10.5px] font-mono font-bold backdrop-blur-md border border-[#DDA743]/30">
                        {alumnus.batch}
                      </div>

                      {/* Floating Name & Stream on Portrait Base */}
                      <div className="absolute bottom-3 left-3 right-3 text-white">
                        <h3 className="text-base font-bold text-white leading-tight drop-shadow">
                          {alumnus.name}
                        </h3>
                        <p className="text-[11px] text-[#F6D074] font-medium mt-0.5">
                          {alumnus.stream}
                        </p>
                      </div>
                    </div>

                    {/* Card Body */}
                    <div className="p-4 space-y-2.5">
                      <div>
                        <span className="text-xs font-bold text-slate-900 block leading-snug">
                          {alumnus.role}
                        </span>
                        <span className="text-[11.5px] text-slate-500 block leading-tight">
                          {alumnus.company}
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5 text-[11px] text-slate-500 font-mono">
                        <MapPin className="w-3.5 h-3.5 text-[#9E1B32] shrink-0" />
                        <span>{alumnus.location}</span>
                      </div>

                      <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-[11px] text-slate-600 italic leading-relaxed">
                        &ldquo;{alumnus.quote}&rdquo;
                      </div>
                    </div>
                  </div>

                  {/* Card Footer */}
                  <div className="p-4 pt-0">
                    <button
                      type="button"
                      onClick={() => setActivePortrait(alumnus)}
                      className="w-full inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-[#9E1B32]/10 hover:bg-[#9E1B32] text-[#9E1B32] hover:text-white text-xs font-bold transition-all duration-200 cursor-pointer"
                    >
                      <span>Read Story &amp; Honors</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </MotionReveal>
            ))}
          </div>
        </section>

        {/* ========================================================= */}
        {/* 4. ALUMNI ENGAGEMENT PILLARS & ANNUAL HOMECOMING          */}
        {/* ========================================================= */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20">
          <div className="bg-gradient-to-br from-white to-slate-50 rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm">
            <MotionReveal direction="down">
              <div className="max-w-3xl mb-8">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#9E1B32]/10 text-[#9E1B32] text-xs font-bold uppercase tracking-wider mb-2">
                  <Compass className="w-3.5 h-3.5" />
                  <span>Ways to Stay Connected</span>
                </span>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900">
                  How Gurukul Alumni Give Back &amp; Network
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                  The Gurukul Alumni Association organizes year-round engagement, mentorship initiatives, and homecoming reunions to support both alumni and current students.
                </p>
              </div>
            </MotionReveal>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  title: "Student Mentorship & Career Talks",
                  badge: "Giving Back",
                  desc: "Senior alumni conduct monthly online and offline masterclasses for Class X and XII students preparing for MHT-CET, NEET, JEE, and CA exams.",
                  icon: GraduationCap,
                },
                {
                  title: "Annual Winter Homecoming",
                  badge: "Campus Reunion",
                  desc: "Every December, past batches assemble on the lush Gurukul campus for nostalgic reunions, faculty felicitation, and inter-batch sports matches.",
                  icon: Calendar,
                },
                {
                  title: "Global City Chapters",
                  badge: "Professional Network",
                  desc: "Active professional alumni chapters across Mumbai, Pune, Bengaluru, Dubai, and the US for career referrals, startup mentorship, and housing help.",
                  icon: Globe,
                },
              ].map((pillar, idx) => {
                const Icon = pillar.icon;
                return (
                  <MotionReveal
                    key={idx}
                    direction="up"
                    delay={0.1 + idx * 0.1}
                    hoverLift={true}
                    className="h-full"
                  >
                    <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-sm flex flex-col justify-between h-full hover:border-[#9E1B32]/40 transition-all duration-300">
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-4">
                          <div className="w-10 h-10 rounded-xl bg-[#9E1B32]/10 text-[#9E1B32] flex items-center justify-center font-bold">
                            <Icon className="w-5 h-5" />
                          </div>
                          <span className="text-[10.5px] font-mono uppercase px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                            {pillar.badge}
                          </span>
                        </div>
                        <h3 className="text-base font-bold text-slate-900 mb-2">{pillar.title}</h3>
                        <p className="text-xs text-slate-600 leading-relaxed">{pillar.desc}</p>
                      </div>

                      <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-[#9E1B32] font-semibold">
                        <span>Get Involved</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  </MotionReveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* 5. INTERACTIVE ALUMNI REGISTRATION DIRECTORY FORM         */}
        {/* ========================================================= */}
        <section ref={formRef} className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20">
          <div className="bg-white rounded-3xl shadow-xl border border-slate-200/90 overflow-hidden">
            {/* Header Strip */}
            <div className="p-6 sm:p-8 bg-gradient-to-r from-slate-900 via-[#1A080C] to-slate-900 text-white border-b border-[#DDA743]/30">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-[#DDA743]/20 text-[#F6D074] text-xs font-mono font-bold mb-2 border border-[#DDA743]/30">
                <Users className="w-3.5 h-3.5" />
                <span>Official Alumni Registry • Lifetime Membership</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-white">
                Join the Gurukul Alumni Association Directory
              </h2>
              <p className="text-xs sm:text-sm text-stone-300 mt-1 max-w-2xl font-light">
                Update your professional profile, reconnect with peers, and receive invitations to the annual campus reunion and student mentorship forums.
              </p>
            </div>

            {/* Registration Form / Confirmation Screen */}
            <div className="p-6 sm:p-10">
              {registeredMember ? (
                /* SUCCESS MEMBERSHIP RECEIPT */
                <div className="text-center py-6 sm:py-8 max-w-xl mx-auto space-y-5 animate-in fade-in duration-300">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-sm">
                    <CheckCircle2 className="w-9 h-9" />
                  </div>

                  <div>
                    <span className="text-xs font-mono uppercase tracking-widest text-emerald-700 font-bold block mb-1">
                      Alumni Registration Confirmed
                    </span>
                    <h3 className="text-2xl font-serif font-bold text-slate-900">
                      Welcome Home, {registeredMember.name}!
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 mt-1.5">
                      Your alumni profile has been added to the official Gurukul Vidyapeeth Alumni Association Registry.
                    </p>
                  </div>

                  {/* Membership Card */}
                  <div className="bg-gradient-to-r from-slate-900 to-[#1A080C] text-white rounded-2xl p-5 border border-[#DDA743]/40 text-left shadow-lg space-y-3">
                    <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
                      <div>
                        <span className="text-[10px] uppercase font-mono tracking-wider text-[#F6D074] block">
                          Lifetime Membership Card
                        </span>
                        <span className="text-sm font-bold text-white block">
                          Gurukul Vidyapeeth Alumni Association
                        </span>
                      </div>
                      <ShieldCheck className="w-6 h-6 text-[#F6D074]" />
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-xs">
                      <div>
                        <span className="text-stone-400 text-[11px] block">Alumni Member ID</span>
                        <span className="font-mono font-bold text-[#F6D074] text-sm">
                          {registeredMember.memberId}
                        </span>
                      </div>
                      <div>
                        <span className="text-stone-400 text-[11px] block">Passing Batch</span>
                        <span className="font-semibold text-white">Class of {registeredMember.batch}</span>
                      </div>
                      <div className="col-span-2">
                        <span className="text-stone-400 text-[11px] block">Academic Stream</span>
                        <span className="text-stone-200">{registeredMember.stream}</span>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-white/10 text-[10.5px] text-stone-400 flex items-center justify-between">
                      <span>Monitored by Alumni Cell</span>
                      <span className="font-mono text-[#F6D074]">{registeredMember.routedEmail}</span>
                    </div>
                  </div>

                  <div className="pt-3">
                    <button
                      type="button"
                      onClick={resetForm}
                      className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#9E1B32] hover:bg-[#BA203B] text-white text-xs font-bold transition-all shadow-md cursor-pointer"
                    >
                      <span>Register Another Batchmate</span>
                    </button>
                  </div>
                </div>
              ) : (
                /* REGISTRATION FORM */
                <form onSubmit={handleFormSubmit} className="space-y-6">
                  {/* Row 1: Name, Phone, Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Your Full Name"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#9E1B32] focus:border-transparent transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
                        Mobile / WhatsApp Number <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 98765 43210"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#9E1B32] focus:border-transparent transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="yourname@domain.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#9E1B32] focus:border-transparent transition-all"
                      />
                    </div>
                  </div>

                  {/* Row 2: Passing Year & Stream */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
                        Passing Out Batch Year <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={formData.batchYear}
                        onChange={(e) => setFormData({ ...formData, batchYear: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#9E1B32] focus:border-transparent transition-all bg-white"
                      >
                        {[2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, "Prior to 2016"].map(
                          (yr) => (
                            <option key={yr} value={String(yr)}>
                              Class of {yr}
                            </option>
                          )
                        )}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
                        Stream / Level Completed at Gurukul <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={formData.streamCompleted}
                        onChange={(e) => setFormData({ ...formData, streamCompleted: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#9E1B32] focus:border-transparent transition-all bg-white"
                      >
                        <option value="HSC Science (PCM / PCB / Bifocal)">HSC Junior College Science (PCM / PCB / Bifocal CS)</option>
                        <option value="HSC Commerce (Accounts / Maths)">HSC Junior College Commerce (Accounts / OCM / SP / Maths)</option>
                        <option value="HSC Arts (Humanities)">HSC Junior College Arts (Humanities / Economics)</option>
                        <option value="Secondary SSC Board (Class X)">Secondary SSC Board (Class X Matriculation)</option>
                      </select>
                    </div>
                  </div>

                  {/* Row 3: Current Professional Role & Organization */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
                        Current Designation / Role <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Software Engineer / Doctor / Student"
                        value={formData.currentRole}
                        onChange={(e) => setFormData({ ...formData, currentRole: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#9E1B32] focus:border-transparent transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
                        Current Company / University <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Google / AIIMS / Mumbai University"
                        value={formData.organization}
                        onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#9E1B32] focus:border-transparent transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
                        Current City / Country
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Thane, Mumbai, Pune, Dubai, USA"
                        value={formData.currentCity}
                        onChange={(e) => setFormData({ ...formData, currentCity: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#9E1B32] focus:border-transparent transition-all"
                      />
                    </div>
                  </div>

                  {/* Mentorship Opt-in Checkbox */}
                  <div className="p-4 rounded-2xl bg-[#9E1B32]/5 border border-[#9E1B32]/15 flex items-start gap-3">
                    <input
                      type="checkbox"
                      id="mentorship-optin"
                      checked={formData.willingToMentor}
                      onChange={(e) => setFormData({ ...formData, willingToMentor: e.target.checked })}
                      className="mt-0.5 h-4 w-4 rounded border-slate-300 text-[#9E1B32] focus:ring-[#9E1B32]"
                    />
                    <label htmlFor="mentorship-optin" className="text-xs text-slate-700 cursor-pointer">
                      <strong className="text-slate-900 block font-bold">
                        Volunteer as an Alumni Mentor (Optional)
                      </strong>
                      I am happy to guide current Gurukul students on stream selection, MHT-CET/NEET/CA prep, or career advice.
                    </label>
                  </div>

                  {/* Form Submission Button */}
                  <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-100">
                    <p className="text-[11px] text-slate-500 leading-snug text-center sm:text-left">
                      Directory records are stored securely and routed to{" "}
                      <span className="font-mono text-slate-700 font-semibold">{getDepartmentEmail("alumni")}</span>.
                    </p>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-[#9E1B32] hover:bg-[#BA203B] disabled:opacity-50 text-white text-xs sm:text-sm font-bold transition-all shadow-md hover:shadow-lg cursor-pointer"
                    >
                      {isSubmitting ? (
                        <>
                          <Clock className="w-4 h-4 animate-spin text-[#F6D074]" />
                          <span>Generating Membership ID...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4 text-[#F6D074]" />
                          <span>Complete Alumni Registration</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </section>
      </main>

      {/* PORTRAIT DETAIL MODAL / LIGHTBOX */}
      {activePortrait && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setActivePortrait(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-slate-200 relative animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setActivePortrait(null)}
              className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/60 text-white hover:bg-black/80 transition-colors"
              aria-label="Close portrait details"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="grid grid-cols-1 sm:grid-cols-2">
              {/* Image Side */}
              <div className="relative aspect-square sm:aspect-auto sm:h-full bg-slate-900 min-h-[300px]">
                <Image
                  src={activePortrait.image}
                  alt={activePortrait.name}
                  fill
                  className="object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <span className="text-[11px] font-mono text-[#F6D074] font-bold block">
                    {activePortrait.batch}
                  </span>
                  <h3 className="text-xl font-serif font-bold text-white leading-tight">
                    {activePortrait.name}
                  </h3>
                  <p className="text-xs text-stone-300 mt-0.5">{activePortrait.stream}</p>
                </div>
              </div>

              {/* Story / Details Side */}
              <div className="p-6 sm:p-8 flex flex-col justify-between space-y-4">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#9E1B32]/10 text-[#9E1B32] text-xs font-bold uppercase mb-2">
                    <Trophy className="w-3 h-3" />
                    <span>Hall of Fame Inductee</span>
                  </div>

                  <div className="space-y-1 mb-4">
                    <span className="text-sm font-bold text-slate-900 block">{activePortrait.role}</span>
                    <span className="text-xs text-slate-600 block">{activePortrait.company}</span>
                    <span className="text-xs text-slate-500 flex items-center gap-1 font-mono pt-1">
                      <MapPin className="w-3.5 h-3.5 text-[#9E1B32]" />
                      {activePortrait.location}
                    </span>
                  </div>

                  <div className="bg-[#DDA743]/15 p-3 rounded-xl border border-[#DDA743]/30 text-xs text-slate-800 font-medium mb-4">
                    <strong className="text-[#9E1B32] block font-bold mb-0.5">Key Distinction:</strong>
                    {activePortrait.achievement}
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 italic leading-relaxed">
                    &ldquo;{activePortrait.quote}&rdquo;
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] text-slate-500 font-mono">Gurukul Vidyapeeth Heritage</span>
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Institutional Footer */}
      <Footer />

      {/* Floating WhatsApp Action Button */}
      <WhatsAppButton />

      {/* Mobile Sticky Bottom Action Dock */}
      <MobileDock
        onOpenEnquiry={(classLevel) => handleOpenEnquiry(classLevel)}
        onOpenFeeModal={() => handleOpenFeeModal("std-1")}
        onOpenNoticeDrawer={() => setIsNoticeDrawerOpen(true)}
      />

      {/* Mobile Drawer Navigation */}
      <MobileNav
        isOpen={isMobileNavOpen}
        onClose={() => setIsMobileNavOpen(false)}
        onOpenEnquiry={(classLevel) => handleOpenEnquiry(classLevel)}
      />

      {/* Admission Enquiry Modal */}
      <EnquiryModal
        key={`${enquiryClassLevel}-${selectedStreamForEnquiry}`}
        isOpen={isEnquiryModalOpen}
        onClose={() => setIsEnquiryModalOpen(false)}
        defaultClassLevel={enquiryClassLevel}
        defaultStream={selectedStreamForEnquiry}
      />

      {/* Fee Structure Modal */}
      <FeeStructureModal
        key={selectedFeeStandardId}
        isOpen={isFeeModalOpen}
        onClose={() => setIsFeeModalOpen(false)}
        initialStandardId={selectedFeeStandardId}
      />

      {/* Live Notice Drawer */}
      <NoticeDrawer
        isOpen={isNoticeDrawerOpen}
        onClose={() => setIsNoticeDrawerOpen(false)}
        onOpen={() => setIsNoticeDrawerOpen(true)}
        onOpenEnquiry={(classLevel) => handleOpenEnquiry(classLevel)}
      />
    </div>
  );
}
