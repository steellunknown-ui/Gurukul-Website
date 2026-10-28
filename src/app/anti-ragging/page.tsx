"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ShieldAlert,
  ShieldCheck,
  Phone,
  Mail,
  AlertTriangle,
  Gavel,
  Users,
  CheckCircle2,
  Lock,
  Send,
  ExternalLink,
  ChevronRight,
  Clock,
  BookOpen,
  Award,
  EyeOff,
  Building2,
  FileCheck,
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

export default function AntiRaggingPage() {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [isEnquiryModalOpen, setIsEnquiryModalOpen] = useState(false);
  const [enquiryClassLevel, setEnquiryClassLevel] = useState<AdmissionClassLevel>("XI");
  const [selectedStreamForEnquiry, setSelectedStreamForEnquiry] = useState("science");

  // Fee modal state
  const [isFeeModalOpen, setIsFeeModalOpen] = useState(false);
  const [selectedFeeStandardId, setSelectedFeeStandardId] = useState("std-1");

  // Notice Drawer state
  const [isNoticeDrawerOpen, setIsNoticeDrawerOpen] = useState(false);

  // Confidential grievance form state
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [complaintData, setComplaintData] = useState({
    fullName: "",
    phone: "",
    email: "",
    standard: "Class XI (FYJC)",
    incidentCategory: "Verbal Harassment / Mockery",
    location: "Campus Common Area",
    incidentDate: "",
    description: "",
  });

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

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  // Official Anti-Ragging Committee Members
  const committeeMembers = [
    {
      role: "Head of Institution / Chairman",
      name: "Principal, Gurukul Vidyapeeth",
      designation: "Chairman, Anti-Ragging Committee",
      contact: "+91 93264 46097",
      email: "principal@gurukulvidyapeeth.edu.in",
    },
    {
      role: "Management / Trust Representative",
      name: "Managing Trustee / Board Nominee",
      designation: "Bhagwat Prasad Gurukul Educational Trust",
      contact: "+91 91722 09299",
      email: "trust@gurukulvidyapeeth.edu.in",
    },
    {
      role: "Senior Faculty In-Charge (Science Wing)",
      name: "Vice Principal (Academic Affairs)",
      designation: "Member Secretary & Squad Lead",
      contact: "Via Campus Desk",
      email: "science.lead@gurukulvidyapeeth.edu.in",
    },
    {
      role: "Senior Faculty In-Charge (Commerce & Arts)",
      name: "HOD Commerce & Humanities",
      designation: "Faculty Representative",
      contact: "Via Campus Desk",
      email: "commerce.lead@gurukulvidyapeeth.edu.in",
    },
    {
      role: "Civil & Police Administration Liaison",
      name: "Station House Officer (Local Jurisdiction)",
      designation: "Maharashtra Police Liaison Officer",
      contact: "112 / Local Police Station",
      email: "police.liaison@mahapolice.gov.in",
    },
    {
      role: "Parent-Teacher Association (PTA) Nominee",
      name: "President / Member, Executive PTA",
      designation: "Guardian & Community Representative",
      contact: "Confidential Roster",
      email: "pta.grievance@gurukulvidyapeeth.edu.in",
    },
    {
      role: "Student Welfare & Counseling Lead",
      name: "Senior Student Counselor",
      designation: "Mental Health & Safe Space Officer",
      contact: "+91 93264 46097",
      email: "counselor@gurukulvidyapeeth.edu.in",
    },
  ];

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
        {/* 1. HERO SECTION: STATUTORY ZERO-TOLERANCE DECLARATION     */}
        {/* ========================================================= */}
        <section className="relative bg-gradient-to-br from-[#180509] via-[#2A0810] to-[#180509] text-white pt-8 pb-16 md:pt-14 md:pb-20 overflow-hidden border-b border-[#DDA743]/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            {/* Breadcrumb */}
            <nav aria-label="Breadcrumb" className="mb-6">
              <ol className="flex items-center space-x-2 text-xs md:text-sm text-stone-300">
                <li>
                  <Link href="/" className="hover:text-[#DDA743] transition-colors flex items-center gap-1">
                    Home
                  </Link>
                </li>
                <li>
                  <ChevronRight className="w-3.5 h-3.5 text-stone-500" />
                </li>
                <li>
                  <span className="text-stone-300">Statutory &amp; Safety</span>
                </li>
                <li>
                  <ChevronRight className="w-3.5 h-3.5 text-stone-500" />
                </li>
                <li className="text-[#DDA743] font-semibold" aria-current="page">
                  Anti-Ragging Cell &amp; Helplines
                </li>
              </ol>
            </nav>

            <div className="max-w-3xl">
              <MotionReveal direction="down">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#3B0A15] border border-[#DDA743]/50 text-[#DDA743] text-xs font-semibold uppercase tracking-wider mb-4 shadow-md">
                  <ShieldAlert className="w-3.5 h-3.5 text-[#F6D074]" />
                  <span>Statutory Compliance • Maharashtra Act No. XXXIII of 1999</span>
                </div>
              </MotionReveal>

              <MotionReveal direction="up" delay={0.1}>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white tracking-tight leading-[1.15] drop-shadow-md">
                  Statutory Anti-Ragging Cell &amp;{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F6D074] via-[#DDA743] to-[#ECC460] block mt-1">
                    Zero-Tolerance Policy
                  </span>
                </h1>
              </MotionReveal>

              <MotionReveal direction="up" delay={0.2}>
                <p className="mt-4 text-stone-200 text-sm sm:text-base leading-relaxed max-w-2xl font-normal">
                  Gurukul Vidyapeeth English High School &amp; Jr. College enforces an unyielding, zero-tolerance policy against any form of ragging, intimidation, or harassment. We guarantee an intellectually rigorous, respectful, and safe campus environment for every student from Jr. KG through Class XII.
                </p>
              </MotionReveal>

              <MotionReveal direction="up" delay={0.3}>
                <div className="mt-6 flex flex-wrap items-center gap-3 text-xs text-stone-300">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-black/40 border border-white/15 font-mono text-stone-200">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    Board Index: J-15.14.086 • Govt. Ref: 28903-97/DI-15/11/2016
                  </span>
                  <span className="text-stone-400">•</span>
                  <span className="text-[#DDA743] font-semibold">100% Ragging-Free Campus</span>
                </div>
              </MotionReveal>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* 2. 24×7 EMERGENCY HELPLINES COMMAND CENTER                */}
        {/* ========================================================= */}
        <section className="relative -mt-8 z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl border-2 border-[#DDA743] shadow-xl p-5 sm:p-7 md:p-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-stone-200 pb-5">
              <div>
                <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-red-100 text-red-800 text-[11px] font-bold uppercase tracking-wider mb-1.5">
                  <AlertTriangle className="w-3.5 h-3.5 text-red-700" />
                  <span>Immediate Emergency Assistance</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-serif font-bold text-slate-900">
                  24×7 Anti-Ragging Emergency Helplines
                </h2>
                <p className="text-xs sm:text-sm text-stone-600 mt-0.5">
                  If you or someone you know is experiencing ragging or harassment, contact any of the official helplines immediately.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href="#report-grievance"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#9E1B32] hover:bg-[#BA203B] text-white text-xs font-bold transition-all shadow-sm"
                >
                  <Send className="w-3.5 h-3.5 text-[#F6D074]" />
                  <span>File Confidential Report</span>
                </a>
              </div>
            </div>

            {/* Helpline Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
              {/* Helpline 1: National Anti-Ragging Helpline */}
              <div className="p-4 rounded-xl bg-gradient-to-br from-red-50 to-amber-50/40 border border-red-200 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-red-800 uppercase tracking-wider bg-red-100 px-2 py-0.5 rounded">
                      National Toll-Free (24×7)
                    </span>
                    <Phone className="w-4 h-4 text-red-600" />
                  </div>
                  <div className="mt-3 text-lg sm:text-xl font-serif font-black text-[#9E1B32] font-mono">
                    1800-180-5522
                  </div>
                  <div className="text-xs text-stone-700 font-semibold mt-1">
                    National Anti-Ragging Helpline
                  </div>
                  <div className="text-[11px] text-stone-500 mt-0.5">
                    Government of India / UGC
                  </div>
                </div>
                <a
                  href="tel:18001805522"
                  className="mt-3 w-full py-1.5 px-3 rounded-lg bg-red-600 hover:bg-red-700 text-white text-xs font-bold text-center block transition-colors shadow-xs"
                >
                  Call National Toll-Free
                </a>
              </div>

              {/* Helpline 2: College Internal Discipline Cell */}
              <div className="p-4 rounded-xl bg-gradient-to-br from-amber-50 to-stone-50 border border-[#DDA743]/60 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-[#8A1428] uppercase tracking-wider bg-amber-100 px-2 py-0.5 rounded">
                      Gurukul Campus Cell
                    </span>
                    <ShieldCheck className="w-4 h-4 text-[#9E1B32]" />
                  </div>
                  <div className="mt-3 text-lg sm:text-xl font-serif font-black text-[#9E1B32] font-mono">
                    +91 93264 46097
                  </div>
                  <div className="text-xs text-stone-700 font-semibold mt-1">
                    Gurukul Anti-Ragging Cell
                  </div>
                  <div className="text-[11px] text-stone-500 mt-0.5">
                    Direct Discipline Committee Line
                  </div>
                </div>
                <a
                  href="tel:+919326446097"
                  className="mt-3 w-full py-1.5 px-3 rounded-lg bg-[#9E1B32] hover:bg-[#BA203B] text-white text-xs font-bold text-center block transition-colors shadow-xs"
                >
                  Call Campus Desk
                </a>
              </div>

              {/* Helpline 3: Maharashtra Emergency Police Helpline */}
              <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-blue-800 uppercase tracking-wider bg-blue-100 px-2 py-0.5 rounded">
                      Maharashtra Police
                    </span>
                    <Phone className="w-4 h-4 text-blue-600" />
                  </div>
                  <div className="mt-3 text-lg sm:text-xl font-serif font-black text-blue-900 font-mono">
                    112 / 100
                  </div>
                  <div className="text-xs text-stone-700 font-semibold mt-1">
                    State Police Emergency
                  </div>
                  <div className="text-[11px] text-stone-500 mt-0.5">
                    Maharashtra State Police Liaison
                  </div>
                </div>
                <a
                  href="tel:112"
                  className="mt-3 w-full py-1.5 px-3 rounded-lg bg-blue-700 hover:bg-blue-800 text-white text-xs font-bold text-center block transition-colors shadow-xs"
                >
                  Call State Police (112)
                </a>
              </div>

              {/* Helpline 4: National Portal & Email */}
              <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider bg-emerald-100 px-2 py-0.5 rounded">
                      Online Portal &amp; Email
                    </span>
                    <Mail className="w-4 h-4 text-emerald-600" />
                  </div>
                  <div className="mt-3 text-xs font-mono font-bold text-slate-800 truncate">
                    helpline@antiragging.in
                  </div>
                  <div className="text-xs text-stone-700 font-semibold mt-1">
                    UGC Monitoring Web Portal
                  </div>
                  <div className="text-[11px] text-stone-500 mt-0.5">
                    www.antiragging.in
                  </div>
                </div>
                <a
                  href="https://www.antiragging.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 w-full py-1.5 px-3 rounded-lg bg-stone-800 hover:bg-black text-white text-xs font-bold text-center block transition-colors shadow-xs flex items-center justify-center gap-1"
                >
                  <span>Visit Portal</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* 3. LEGAL DEFINITION & WHAT CONSTITUTES RAGGING            */}
        {/* ========================================================= */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-14 sm:mt-20">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#9E1B32] uppercase tracking-wider mb-2">
              <Gavel className="w-3.5 h-3.5" />
              <span>Legal Provisions &amp; Prohibited Actions</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900">
              What Constitutes Ragging Under Maharashtra Law?
            </h2>
            <p className="mt-2 text-stone-600 text-xs sm:text-sm leading-relaxed">
              Under Section 2(e) of the <strong>Maharashtra Prohibition of Ragging Act, 1999</strong>, ragging involves any disorderly conduct whether by words spoken or written, or by an act that causes teasing, treating with rudeness, financial extortion, or psychological harm.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              {
                title: "Physical Abuse & Coercion",
                desc: "Any act of assault, physical force, pushing, striking, or causing bodily harm or danger to health.",
                icon: AlertTriangle,
                badge: "Strictly Prohibited",
              },
              {
                title: "Verbal Harassment & Mockery",
                desc: "Name-calling, teasing, making offensive remarks, using abusive language, or humiliating a student publicly.",
                icon: ShieldAlert,
                badge: "Strictly Prohibited",
              },
              {
                title: "Psychological Intimidation",
                desc: "Forced isolation, fear-mongering, creating anxiety or shame, or forcing students to perform embarrassing tasks.",
                icon: Lock,
                badge: "Strictly Prohibited",
              },
              {
                title: "Financial Extortion & Demands",
                desc: "Demanding money, unauthorized collections, forcing students to pay for meals, errands, or personal purchases.",
                icon: Gavel,
                badge: "Strictly Prohibited",
              },
              {
                title: "Digital & Cyber Harassment",
                desc: "Harassment via WhatsApp, social media, sending degrading messages, sharing unconsented pictures, or online bullying.",
                icon: EyeOff,
                badge: "Strictly Prohibited",
              },
              {
                title: "Discriminatory Conduct",
                desc: "Targeting any student based on language, region, community, gender, academic standing, or appearance.",
                icon: Users,
                badge: "Strictly Prohibited",
              },
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-white border border-stone-200 hover:border-[#DDA743] hover:shadow-lg transition-all"
                >
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-[#9E1B32]/10 text-[#9E1B32] flex items-center justify-center">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-bold text-red-700 bg-red-50 border border-red-200 px-2 py-0.5 rounded">
                      {item.badge}
                    </span>
                  </div>
                  <h3 className="mt-4 text-base font-serif font-bold text-slate-900">
                    {item.title}
                  </h3>
                  <p className="mt-1.5 text-xs text-stone-600 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* ========================================================= */}
        {/* 4. STATUTORY PUNITIVE ACTIONS & LEGAL CONSEQUENCES        */}
        {/* ========================================================= */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-14 sm:mt-20">
          <div className="rounded-3xl bg-gradient-to-br from-[#1A080C] via-[#350A14] to-[#1A080C] text-white p-6 sm:p-10 border border-[#DDA743]/50 shadow-xl">
            <div className="max-w-3xl">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#DDA743]/20 border border-[#DDA743]/40 text-[#F6D074] text-xs font-bold uppercase tracking-wider mb-3">
                <Gavel className="w-3.5 h-3.5" />
                <span>Statutory Penalties Under Maharashtra Law</span>
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white">
                Legal Penalties Under Maharashtra Act No. XXXIII of 1999
              </h2>
              <p className="mt-3 text-xs sm:text-sm text-stone-200 leading-relaxed">
                The Maharashtra Prohibition of Ragging Act imposes stringent criminal liabilities and institutional sanctions. The institution is legally mandated to report any cognizable ragging offense to the police within 24 hours.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
              <div className="p-4 rounded-2xl bg-black/30 border border-white/10">
                <div className="text-2xl font-serif font-bold text-[#F6D074]">Section 4</div>
                <div className="text-sm font-bold text-white mt-1">Criminal Imprisonment &amp; Fine</div>
                <p className="text-xs text-stone-300 mt-2 leading-relaxed">
                  Whoever directly or indirectly commits, participates in, abets or propagates ragging shall, on conviction, be punished with <strong>imprisonment for a term up to two years</strong> and a fine up to <strong>₹10,000</strong>.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-black/30 border border-white/10">
                <div className="text-2xl font-serif font-bold text-[#F6D074]">Section 5</div>
                <div className="text-sm font-bold text-white mt-1">Mandatory Dismissal &amp; 5-Yr Debarment</div>
                <p className="text-xs text-stone-300 mt-2 leading-relaxed">
                  Any student convicted of an offense under Section 4 shall be <strong>dismissed from the educational institution</strong> and cannot be admitted to any other educational institution for a period of <strong>five years</strong>.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-black/30 border border-white/10">
                <div className="text-2xl font-serif font-bold text-[#F6D074]">Institutional</div>
                <div className="text-sm font-bold text-white mt-1">Immediate Campus Sanctions</div>
                <p className="text-xs text-stone-300 mt-2 leading-relaxed">
                  Immediate suspension pending inquiry, withholding admission cards/hall tickets for Maharashtra Board exams, cancellation of scholarships, and debarring from campus representation.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* 5. OFFICIAL ANTI-RAGGING COMMITTEE ROSTER                */}
        {/* ========================================================= */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-14 sm:mt-20">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#9E1B32] uppercase tracking-wider mb-2">
              <Users className="w-3.5 h-3.5" />
              <span>Campus Governance &amp; Vigilance</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900">
              Institutional Anti-Ragging Committee &amp; Flying Squad
            </h2>
            <p className="mt-2 text-stone-600 text-xs sm:text-sm">
              Constitution of the official vigilance squad under the aegis of Bhagwat Prasad Gurukul Educational Trust.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-[#1A080C] text-[#DFBA73] text-[11px] uppercase tracking-wider font-semibold border-b border-[#4E0B19]">
                  <tr>
                    <th scope="col" className="px-5 py-3.5">Designation in Committee</th>
                    <th scope="col" className="px-5 py-3.5">Name / Representation</th>
                    <th scope="col" className="px-5 py-3.5">Role in Institution</th>
                    <th scope="col" className="px-5 py-3.5">Contact / Access</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100 text-slate-800">
                  {committeeMembers.map((member, idx) => (
                    <tr key={idx} className="hover:bg-stone-50/80 transition-colors">
                      <td className="px-5 py-3 font-semibold text-[#9E1B32]">
                        {member.role}
                      </td>
                      <td className="px-5 py-3 font-medium">
                        {member.name}
                      </td>
                      <td className="px-5 py-3 text-stone-600 text-xs">
                        {member.designation}
                      </td>
                      <td className="px-5 py-3 font-mono text-xs text-stone-700">
                        {member.contact}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* 6. MANDATORY ANTI-RAGGING AFFIDAVIT / UNDERTAKING         */}
        {/* ========================================================= */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-14 sm:mt-20">
          <div className="p-6 sm:p-8 rounded-2xl bg-amber-50/70 border border-[#DDA743]/50 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-[#9E1B32] text-white text-[10.5px] font-bold uppercase tracking-wider">
                <FileCheck className="w-3.5 h-3.5 text-[#F6D074]" />
                <span>Mandatory at Admission</span>
              </div>
              <h3 className="text-xl font-serif font-bold text-slate-900">
                Annual Anti-Ragging Undertaking / Affidavit (Std XI &amp; XII)
              </h3>
              <p className="text-xs sm:text-sm text-stone-700 max-w-2xl leading-relaxed">
                As per Maharashtra State Board and UGC guidelines, every student and their parent/guardian must submit an online anti-ragging undertaking at the time of admission to Class XI (Science, Commerce, Arts) and Class XII.
              </p>
              <div className="text-[11px] text-stone-600 flex items-center gap-2 pt-1 font-mono">
                <span>Direct portal:</span>
                <a
                  href="https://www.antiragging.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#9E1B32] font-bold underline"
                >
                  www.antiragging.in
                </a>
                <span>or</span>
                <a
                  href="https://www.amanmovement.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#9E1B32] font-bold underline"
                >
                  www.amanmovement.org
                </a>
              </div>
            </div>

            <div className="shrink-0 flex flex-col sm:flex-row gap-2.5 w-full md:w-auto">
              <a
                href="https://www.antiragging.in/affidavit_registration_disclaimer.html"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#9E1B32] hover:bg-[#BA203B] text-white text-xs font-bold transition-all shadow-sm"
              >
                <span>Fill Online Affidavit</span>
                <ExternalLink className="w-3.5 h-3.5 text-[#F6D074]" />
              </a>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* 7. CONFIDENTIAL GRIEVANCE REPORTING FORM                  */}
        {/* ========================================================= */}
        <section id="report-grievance" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-14 sm:mt-20">
          <div className="bg-white rounded-3xl border border-stone-200 shadow-xl overflow-hidden">
            <div className="bg-gradient-to-r from-[#9E1B32] to-[#B3243D] px-6 py-5 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <Lock className="w-4 h-4 text-[#F6D074]" />
                    <span className="text-xs font-bold uppercase tracking-wider text-[#F6D074]">
                      Confidential &amp; Anonymous Reporting
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-serif font-bold mt-1">
                    Report an Incident to Anti-Ragging Cell
                  </h3>
                </div>
                <div className="hidden sm:block text-right text-[11px] text-stone-200 font-mono">
                  Guaranteed Confidentiality
                </div>
              </div>
            </div>

            <div className="p-6 sm:p-8">
              {formSubmitted ? (
                <div className="text-center py-8 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="text-2xl font-serif font-bold text-slate-900">
                    Grievance Registered Successfully
                  </h4>
                  <p className="text-sm text-stone-600 max-w-md mx-auto leading-relaxed">
                    Your report has been received directly by the Chairman and Principal of the Anti-Ragging Squad. Immediate confidential verification and protective measures have been initiated.
                  </p>
                  <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 font-mono text-xs text-stone-700 max-w-sm mx-auto">
                    Emergency Direct Helpline: <strong className="text-[#9E1B32]">+91 93264 46097</strong>
                  </div>
                  <button
                    onClick={() => setFormSubmitted(false)}
                    className="mt-4 px-6 py-2 rounded-xl bg-slate-900 hover:bg-black text-white text-xs font-bold cursor-pointer transition-colors"
                  >
                    Submit Another Report
                  </button>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-5">
                  <p className="text-xs text-stone-600 leading-relaxed">
                    Students, parents, or staff members can report any incident safely. You may report <strong>anonymously</strong> without revealing your identity.
                  </p>

                  {/* Anonymous Toggle */}
                  <div className="p-3.5 rounded-xl bg-amber-50 border border-[#DDA743]/50 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <EyeOff className="w-4 h-4 text-[#9E1B32]" />
                      <span className="text-xs font-bold text-slate-900">
                        Keep My Identity 100% Anonymous
                      </span>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={isAnonymous}
                        onChange={(e) => setIsAnonymous(e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-stone-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-stone-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#9E1B32]" />
                    </label>
                  </div>

                  {!isAnonymous && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-800 mb-1">
                          Full Name (Optional if reporting for someone else)
                        </label>
                        <input
                          type="text"
                          value={complaintData.fullName}
                          onChange={(e) =>
                            setComplaintData({ ...complaintData, fullName: e.target.value })
                          }
                          placeholder="Your Name"
                          className="w-full px-3.5 py-2 text-xs rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-[#9E1B32] bg-white"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-800 mb-1">
                          Phone Number (For confidential inquiry updates)
                        </label>
                        <input
                          type="tel"
                          value={complaintData.phone}
                          onChange={(e) =>
                            setComplaintData({ ...complaintData, phone: e.target.value })
                          }
                          placeholder="+91 9XXXXXXXXX"
                          className="w-full px-3.5 py-2 text-xs rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-[#9E1B32] bg-white"
                        />
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-800 mb-1">
                        Incident Category *
                      </label>
                      <select
                        value={complaintData.incidentCategory}
                        onChange={(e) =>
                          setComplaintData({
                            ...complaintData,
                            incidentCategory: e.target.value,
                          })
                        }
                        className="w-full px-3 py-2 text-xs rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-[#9E1B32] bg-white cursor-pointer"
                        required
                      >
                        <option>Verbal Harassment / Mockery</option>
                        <option>Physical Assault / Threat</option>
                        <option>Psychological Coercion</option>
                        <option>Extortion of Money / Errands</option>
                        <option>Cyberbullying / Social Media</option>
                        <option>Discriminatory Behavior</option>
                        <option>Other Grievance</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-800 mb-1">
                        Location of Occurrence *
                      </label>
                      <select
                        value={complaintData.location}
                        onChange={(e) =>
                          setComplaintData({ ...complaintData, location: e.target.value })
                        }
                        className="w-full px-3 py-2 text-xs rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-[#9E1B32] bg-white cursor-pointer"
                        required
                      >
                        <option>Campus Common Area</option>
                        <option>Classroom / Corridor</option>
                        <option>Science / IT Laboratories</option>
                        <option>Library / Reading Hall</option>
                        <option>Canteen / Ground</option>
                        <option>School Gate / Transit</option>
                        <option>Online / Digital Chat</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-800 mb-1">
                        Approx Date / Time
                      </label>
                      <input
                        type="text"
                        value={complaintData.incidentDate}
                        onChange={(e) =>
                          setComplaintData({ ...complaintData, incidentDate: e.target.value })
                        }
                        placeholder="e.g. Yesterday morning"
                        className="w-full px-3.5 py-2 text-xs rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-[#9E1B32] bg-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-800 mb-1">
                      Detailed Incident Description *
                    </label>
                    <textarea
                      rows={4}
                      value={complaintData.description}
                      onChange={(e) =>
                        setComplaintData({ ...complaintData, description: e.target.value })
                      }
                      placeholder="Please provide details of what occurred. Include names of persons involved, witnesses, or specific statements made..."
                      className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-[#9E1B32] bg-white resize-y"
                      required
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full sm:w-auto px-8 py-3 rounded-xl bg-[#9E1B32] hover:bg-[#BA203B] text-white text-xs font-bold uppercase tracking-wider transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Send className="w-3.5 h-3.5 text-[#F6D074]" />
                      <span>Submit Grievance to Anti-Ragging Cell</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </section>
      </main>

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
