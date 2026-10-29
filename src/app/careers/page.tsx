"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Briefcase,
  GraduationCap,
  CheckCircle2,
  Award,
  FileText,
  ChevronRight,
  UploadCloud,
  Mail,
  Phone,
  Clock,
  Send,
  Building2,
  Users,
  Compass,
  ArrowRight,
  ShieldCheck,
  AlertCircle,
  FileCheck,
  X,
  Layers,
  Laptop,
  BookOpen,
  HeartHandshake,
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

// Open Positions Data Structure
interface JobOpening {
  id: string;
  title: string;
  wing: "Junior College (HSC)" | "Secondary (SSC)" | "Pre-Primary & Primary" | "Administration & Labs";
  department: string;
  type: "Full-Time" | "Part-Time / Visiting";
  vacancies: number;
  qualification: string;
  experience: string;
  description: string;
  skills: string[];
}

const JOB_OPENINGS: JobOpening[] = [
  {
    id: "job-1",
    title: "Lecturer in Physics / Chemistry (HSC XI & XII)",
    wing: "Junior College (HSC)",
    department: "Science Wing",
    type: "Full-Time",
    vacancies: 2,
    qualification: "M.Sc (Physics / Chemistry) + B.Ed (Mandatory)",
    experience: "2–5 years teaching Maharashtra State Board HSC syllabus",
    description:
      "Responsible for delivering concept-driven lectures, conducting weekly 30-mark board laboratory practicals, and guiding students on competitive entrance foundations (MHT-CET/JEE).",
    skills: ["State Board HSC Physics/Chem", "Laboratory Apparatus Handling", "Numerical Problem Solving", "CCE Evaluation"],
  },
  {
    id: "job-2",
    title: "Lecturer in Bifocal Computer Science / IT",
    wing: "Junior College (HSC)",
    department: "Science & IT Wing",
    type: "Full-Time",
    vacancies: 1,
    qualification: "B.E / B.Tech (CS/IT) or MCA / M.Sc (Computer Science)",
    experience: "2+ years in teaching C++, Microprocessors & Hardware labs",
    description:
      "Instruct Class XI & XII Bifocal Computer Science students (200 Marks syllabus), supervising hardware workstations, C++ coding labs, and preliminary board project files.",
    skills: ["C++ Programming", "8085 Microprocessor Labs", "Hardware Troubleshooting", "Board Practical Moderation"],
  },
  {
    id: "job-3",
    title: "Lecturer in Book-Keeping & Accountancy / OCM",
    wing: "Junior College (HSC)",
    department: "Commerce Wing",
    type: "Full-Time",
    vacancies: 2,
    qualification: "M.Com (Accountancy) + B.Ed",
    experience: "3+ years in Junior College Commerce teaching",
    description:
      "Engage commerce students with practical ledger accounting, partnership accounts, company shares, and parallel CA Foundation aptitude coaching.",
    skills: ["Financial Accounting", "Partnership Final Accounts", "Secretarial Practice / OCM", "State Board Marking Schemes"],
  },
  {
    id: "job-4",
    title: "TGT Mathematics & Science (Std VIII to X)",
    wing: "Secondary (SSC)",
    department: "Secondary School",
    type: "Full-Time",
    vacancies: 3,
    qualification: "B.Sc (Maths / Physics) + B.Ed",
    experience: "2–4 years preparing students for SSC Board exams",
    description:
      "Build rigorous mathematical concepts (Algebra & Geometry) and science practical comprehension, administering regular chapter tests and preliminary rehearsals.",
    skills: ["SSC Algebra & Geometry", "Science Practical Demonstrations", "Remedial Coaching", "Paper Presentation Guidance"],
  },
  {
    id: "job-5",
    title: "TGT English Language & Literature",
    wing: "Secondary (SSC)",
    department: "Languages & Humanities",
    type: "Full-Time",
    vacancies: 2,
    qualification: "M.A / B.A (English Literature) + B.Ed",
    experience: "2+ years in English-medium high schools",
    description:
      "Foster grammatical mastery, formal composition, oral communication drills, and literary appreciation adhering to Maharashtra State Board syllabus.",
    skills: ["English Grammar & Composition", "Public Speaking Coaching", "Literature Analysis", "Creative Writing"],
  },
  {
    id: "job-6",
    title: "Pre-Primary & Nursery Lead Educator",
    wing: "Pre-Primary & Primary",
    department: "Foundational Wing",
    type: "Full-Time",
    vacancies: 2,
    qualification: "ECCE / NTT / D.El.Ed / Montessori Certified",
    experience: "1–3 years in reputed kindergarten schools",
    description:
      "Facilitate play-way phonics, sensory-motor activities, rhythm, rhymes, and foundational numeracy in a warm, encouraging environment.",
    skills: ["Jolly Phonics", "Playway Methodology", "Child Psychology", "Parental Communication"],
  },
  {
    id: "job-7",
    title: "Science & Computer Laboratory Assistant",
    wing: "Administration & Labs",
    department: "Laboratory Infrastructure",
    type: "Full-Time",
    vacancies: 1,
    qualification: "B.Sc / Diploma in Lab Technology / Computer Hardware",
    experience: "1+ years managing academic laboratories",
    description:
      "Maintain physical lab apparatus, chemical reagents, safety compliance, digital microscopes, and support faculty during practical sessions.",
    skills: ["Lab Safety Standards", "Chemical Inventory", "Hardware Maintenance", "Logbook Documentation"],
  },
];

// Why Work at Gurukul Pillars
const WHY_WORK_PILLARS = [
  {
    title: "Scholarly Autonomy & Respect",
    description: "Educators are valued as intellectual mentors with freedom to innovate classroom pedagogy and inspire future leaders.",
    icon: GraduationCap,
  },
  {
    title: "Competitive Compensation & P.F.",
    description: "Structured pay scales, provident fund (P.F.), prompt salary crediting, and yearly performance recognition increments.",
    icon: Award,
  },
  {
    title: "Modern Smart Infrastructure",
    description: "Equipped with digital interactive panels, high-grade science laboratories, and high-speed Wi-Fi computing suites.",
    icon: Laptop,
  },
  {
    title: "Professional Faculty Development",
    description: "Regular workshops, Maharashtra State Board evaluation seminars, and continuous skill upskilling opportunities.",
    icon: Users,
  },
];

export default function CareersPage() {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [isEnquiryModalOpen, setIsEnquiryModalOpen] = useState(false);
  const [enquiryClassLevel, setEnquiryClassLevel] = useState<AdmissionClassLevel>("XI");
  const [selectedStreamForEnquiry, setSelectedStreamForEnquiry] = useState("science");

  // Fee modal state
  const [isFeeModalOpen, setIsFeeModalOpen] = useState(false);
  const [selectedFeeStandardId, setSelectedFeeStandardId] = useState("std-1");

  // Notice Drawer state
  const [isNoticeDrawerOpen, setIsNoticeDrawerOpen] = useState(false);

  // Filter state for job openings
  const [selectedWing, setSelectedWing] = useState<string>("All");

  // Form & File upload state
  const formRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    positionApplied: "Lecturer in Physics / Chemistry (HSC XI & XII)",
    departmentWing: "Junior College (HSC)",
    highestQualification: "M.Sc + B.Ed",
    totalExperience: "3–5 Years",
    currentCTC: "",
    expectedCTC: "",
    coverNote: "",
  });

  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedApplication, setSubmittedApplication] = useState<{
    referenceId: string;
    candidateName: string;
    position: string;
    fileName: string;
    submittedAt: string;
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

  const scrollToApplication = (positionName?: string, wingName?: string) => {
    if (positionName) {
      setFormData((prev) => ({
        ...prev,
        positionApplied: positionName,
        departmentWing: wingName || prev.departmentWing,
      }));
    }
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    validateAndSetFile(file);
  };

  const validateAndSetFile = (file?: File) => {
    setFileError(null);
    if (!file) return;

    // Allowed extensions: pdf, doc, docx
    const allowedExtensions = ["pdf", "doc", "docx"];
    const ext = file.name.split(".").pop()?.toLowerCase();
    if (!ext || !allowedExtensions.includes(ext)) {
      setFileError("Please upload a PDF or Microsoft Word (.doc / .docx) document.");
      return;
    }

    // Max 10MB
    const maxSize = 10 * 1024 * 1024;
    if (file.size > maxSize) {
      setFileError("File size exceeds 10MB. Please upload a smaller resume document.");
      return;
    }

    setUploadedFile(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    validateAndSetFile(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadedFile) {
      setFileError("Please attach your updated Resume / CV before submitting.");
      return;
    }

    setIsSubmitting(true);

    // Generate unique application reference ID
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const refId = `GVK-REC-2026-${randomNum}`;
    const destinationEmail = getDepartmentEmail("careers");

    setTimeout(() => {
      setSubmittedApplication({
        referenceId: refId,
        candidateName: formData.fullName,
        position: formData.positionApplied,
        fileName: uploadedFile.name,
        submittedAt: new Date().toLocaleDateString("en-IN", {
          day: "numeric",
          month: "short",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        }),
        routedEmail: destinationEmail,
      });
      setIsSubmitting(false);
    }, 700);
  };

  const resetForm = () => {
    setSubmittedApplication(null);
    setUploadedFile(null);
    setFileError(null);
    setFormData({
      fullName: "",
      phone: "",
      email: "",
      positionApplied: "Lecturer in Physics / Chemistry (HSC XI & XII)",
      departmentWing: "Junior College (HSC)",
      highestQualification: "M.Sc + B.Ed",
      totalExperience: "3–5 Years",
      currentCTC: "",
      expectedCTC: "",
      coverNote: "",
    });
  };

  const filteredJobs =
    selectedWing === "All"
      ? JOB_OPENINGS
      : JOB_OPENINGS.filter((job) => job.wing === selectedWing);

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
        {/* 1. HERO SECTION: CAREERS & FACULTY RECRUITMENT            */}
        {/* ========================================================= */}
        <section className="relative text-white pt-10 pb-16 md:pt-16 md:pb-24 overflow-hidden border-b border-[#DDA743]/30 min-h-[480px] flex items-center">
          {/* User-Provided Distinguished Faculty & Staff Hero Image */}
          <div className="absolute inset-0 z-0 overflow-hidden">
            <Image
              src="/images/careers/careers-hero.jpg"
              alt="Gurukul Vidyapeeth distinguished faculty, educators, coaches and staff team on campus"
              fill
              priority
              className="object-cover object-center filter brightness-100 contrast-100"
              sizes="100vw"
            />
            {/* Natural gradient for readability on left while keeping faculty team vibrant */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/65 via-50% to-black/25 pointer-events-none" />
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
                    <span className="text-stone-300">About</span>
                  </li>
                  <li>
                    <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
                  </li>
                  <li className="text-[#DDA743] font-semibold" aria-current="page">
                    Faculty &amp; Staff Careers
                  </li>
                </ol>
              </nav>
            </MotionReveal>

            <div className="max-w-3xl">
              <MotionReveal direction="down" delay={0.1}>
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/70 border border-[#DDA743]/60 text-[#DDA743] text-xs font-semibold uppercase tracking-wider mb-4 shadow-md backdrop-blur-md">
                  <Briefcase className="w-3.5 h-3.5 text-[#F6D074]" />
                  <span>Academic Year 2026–27 Faculty Hiring Drive • Jr. KG to Std XII</span>
                </div>
              </MotionReveal>

              <MotionReveal direction="up" delay={0.18}>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white tracking-tight leading-[1.18] drop-shadow-lg">
                  Inspire the Next Generation:{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F6D074] via-[#DDA743] to-[#ECC460] block mt-1 drop-shadow">
                    Teach &amp; Lead at Gurukul
                  </span>
                </h1>
              </MotionReveal>

              <MotionReveal direction="up" delay={0.26}>
                <p className="mt-4 text-stone-100 text-sm sm:text-base leading-relaxed max-w-2xl font-medium drop-shadow-md">
                  We invite passionate, visionary educators and administrators to join our distinguished faculty. Experience scholarly autonomy, modern laboratory suites, respectful remuneration, and an inspiring academic culture under Bhagwat Prasad Gurukul Educational Trust.
                </p>
              </MotionReveal>

              <MotionReveal direction="up" delay={0.34}>
                <div className="mt-7 flex flex-wrap items-center gap-3.5">
                  <button
                    onClick={() => scrollToApplication()}
                    className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#9E1B32] hover:bg-[#BA203B] text-white text-xs sm:text-sm font-bold tracking-wide transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 cursor-pointer"
                  >
                    <UploadCloud className="w-4 h-4 text-[#F6D074]" />
                    <span>Upload Your Resume &amp; Apply</span>
                    <ArrowRight className="w-4 h-4 text-[#F6D074]" />
                  </button>

                  <a
                    href="#openings"
                    className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/30 text-xs sm:text-sm font-bold backdrop-blur-md transition-all hover:-translate-y-0.5 cursor-pointer"
                  >
                    <Briefcase className="w-4 h-4 text-[#F6D074]" />
                    <span>View Open Positions ({JOB_OPENINGS.length})</span>
                  </a>
                </div>
              </MotionReveal>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* 2. WHY WORK AT GURUKUL (4 PILLARS)                        */}
        {/* ========================================================= */}
        <section className="relative -mt-6 z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {WHY_WORK_PILLARS.map((pillar, idx) => {
              const Icon = pillar.icon;
              const directions: ("left" | "up" | "right")[] = ["left", "up", "up", "right"];
              return (
                <MotionReveal
                  key={idx}
                  direction={directions[idx]}
                  delay={0.1 + idx * 0.08}
                  hoverLift={true}
                  className="h-full"
                >
                  <div className="bg-white rounded-xl p-4 sm:p-5 shadow-md border border-slate-200/90 flex flex-col justify-between h-full hover:border-[#9E1B32]/40 transition-all duration-300 group">
                    <div>
                      <div className="w-10 h-10 rounded-lg bg-[#9E1B32]/10 text-[#9E1B32] flex items-center justify-center shrink-0 mb-3 group-hover:scale-110 group-hover:bg-[#9E1B32] group-hover:text-white transition-all duration-300">
                        <Icon className="w-5 h-5" />
                      </div>
                      <h2 className="text-sm font-bold text-slate-900 leading-snug">{pillar.title}</h2>
                      <p className="text-xs text-slate-600 mt-1 leading-relaxed">{pillar.description}</p>
                    </div>
                  </div>
                </MotionReveal>
              );
            })}
          </div>
        </section>

        {/* ========================================================= */}
        {/* 3. CURRENT OPEN POSITIONS (FILTERABLE CARDS)              */}
        {/* ========================================================= */}
        <section id="openings" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20">
          <MotionReveal direction="down">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#9E1B32]/10 text-[#9E1B32] text-xs font-bold uppercase tracking-wider mb-2.5">
                <Compass className="w-3.5 h-3.5" />
                <span>Vacancies for 2026–27 Academic Term</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900">
                Current Faculty &amp; Staff Openings
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-2">
                Explore available teaching and non-teaching positions across Junior College (HSC), High School (SSC), and Primary Wings.
              </p>
            </div>
          </MotionReveal>

          {/* Wing Category Filter Buttons */}
          <MotionReveal direction="up" delay={0.1} className="max-w-3xl mx-auto mb-8">
            <div className="flex flex-wrap items-center justify-center gap-2 p-1.5 bg-slate-100/90 rounded-2xl border border-slate-200">
              {["All", "Junior College (HSC)", "Secondary (SSC)", "Pre-Primary & Primary", "Administration & Labs"].map(
                (wing) => (
                  <button
                    key={wing}
                    onClick={() => setSelectedWing(wing)}
                    className={`py-2 px-3.5 rounded-xl text-xs sm:text-sm font-bold transition-all text-center cursor-pointer ${
                      selectedWing === wing
                        ? "bg-white text-[#9E1B32] shadow-sm border border-slate-200/90 font-extrabold"
                        : "text-slate-600 hover:text-slate-900 hover:bg-white/60"
                    }`}
                  >
                    {wing}
                  </button>
                )
              )}
            </div>
          </MotionReveal>

          {/* Job Openings Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredJobs.map((job, idx) => (
              <MotionReveal
                key={job.id}
                direction="up"
                delay={0.1 + (idx % 3) * 0.08}
                hoverLift={true}
                className="h-full"
              >
                <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-sm hover:border-[#9E1B32]/40 transition-all duration-300 flex flex-col justify-between h-full group">
                  <div>
                    {/* Header Badges */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="text-[11px] font-mono font-bold text-[#9E1B32] px-2.5 py-0.5 rounded-md bg-[#9E1B32]/10 uppercase">
                        {job.wing}
                      </span>
                      <span className="text-[11px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-semibold">
                        {job.vacancies} {job.vacancies > 1 ? "Openings" : "Opening"}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-slate-900 leading-snug group-hover:text-[#9E1B32] transition-colors">
                      {job.title}
                    </h3>
                    <p className="text-xs text-slate-500 font-medium mt-1 mb-3">
                      {job.department} • {job.type}
                    </p>

                    <p className="text-xs text-slate-600 leading-relaxed mb-4">
                      {job.description}
                    </p>

                    <div className="space-y-1.5 text-xs text-slate-700 pt-3 border-t border-slate-100">
                      <div>
                        <strong className="text-slate-900">Eligibility:</strong> {job.qualification}
                      </div>
                      <div>
                        <strong className="text-slate-900">Experience:</strong> {job.experience}
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1.5 mt-3.5">
                      {job.skills.map((skill, sIdx) => (
                        <span
                          key={sIdx}
                          className="text-[10.5px] px-2 py-0.5 rounded bg-slate-100 text-slate-600 font-mono"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Apply Trigger Button */}
                  <div className="mt-5 pt-3.5 border-t border-slate-100 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => scrollToApplication(job.title, job.wing)}
                      className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#9E1B32]/10 hover:bg-[#9E1B32] text-[#9E1B32] hover:text-white text-xs font-bold transition-all duration-200 cursor-pointer"
                    >
                      <UploadCloud className="w-3.5 h-3.5" />
                      <span>Apply for this Role</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </MotionReveal>
            ))}
          </div>
        </section>

        {/* ========================================================= */}
        {/* 4. INTERACTIVE APPLICATION FORM & RESUME UPLOADER         */}
        {/* ========================================================= */}
        <section ref={formRef} className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20">
          <div className="bg-white rounded-3xl shadow-xl border border-slate-200/90 overflow-hidden">
            {/* Header Strip */}
            <div className="p-6 sm:p-8 bg-gradient-to-r from-slate-900 via-[#1A080C] to-slate-900 text-white border-b border-[#DDA743]/30">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-[#DDA743]/20 text-[#F6D074] text-xs font-mono font-bold mb-2 border border-[#DDA743]/30">
                <UploadCloud className="w-3.5 h-3.5" />
                <span>Online Recruitment Portal • Direct HR Submission</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-white">
                Submit Your Job Application &amp; Upload Resume
              </h2>
              <p className="text-xs sm:text-sm text-stone-300 mt-1 max-w-2xl font-light">
                Fill in your candidate details, select the role, and upload your CV (PDF or Word format). Applications are directly routed to the HR &amp; Faculty Recruitment desk.
              </p>
            </div>

            {/* Form Content / Submission Receipt */}
            <div className="p-6 sm:p-10">
              {submittedApplication ? (
                /* SUCCESS ACKNOWLEDGEMENT RECEIPT */
                <div className="text-center py-6 sm:py-8 max-w-xl mx-auto space-y-5 animate-in fade-in duration-300">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-sm">
                    <CheckCircle2 className="w-9 h-9" />
                  </div>

                  <div>
                    <span className="text-xs font-mono uppercase tracking-widest text-emerald-700 font-bold block mb-1">
                      Application Submitted Successfully
                    </span>
                    <h3 className="text-2xl font-serif font-bold text-slate-900">
                      Thank You, {submittedApplication.candidateName}!
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 mt-1.5">
                      Your resume and application profile have been recorded and dispatched to the College HR Committee.
                    </p>
                  </div>

                  {/* Reference ID Card */}
                  <div className="bg-slate-50 rounded-2xl p-4 sm:p-5 border border-slate-200 text-left space-y-2.5">
                    <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                      <span className="text-xs text-slate-500 font-medium">Application Ref ID</span>
                      <span className="font-mono text-sm font-bold text-[#9E1B32]">
                        {submittedApplication.referenceId}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-500 font-medium">Position Applied For</span>
                      <span className="font-semibold text-slate-800">{submittedApplication.position}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-500 font-medium">Attached Resume</span>
                      <span className="font-mono text-slate-700 flex items-center gap-1 truncate max-w-[220px]">
                        <FileCheck className="w-3.5 h-3.5 text-emerald-600" />
                        {submittedApplication.fileName}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-500 font-medium">Routed Destination Inbox</span>
                      <span className="font-mono text-slate-700">{submittedApplication.routedEmail}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs pt-1 border-t border-slate-200">
                      <span className="text-slate-500 font-medium">Submission Timestamp</span>
                      <span className="text-slate-600">{submittedApplication.submittedAt}</span>
                    </div>
                  </div>

                  <div className="bg-[#9E1B32]/5 p-3.5 rounded-xl border border-[#9E1B32]/15 text-xs text-slate-700 text-left leading-relaxed">
                    <strong className="text-[#9E1B32]">Next Steps:</strong> Our Academic Interview Panel evaluates all incoming applications within <strong>3 to 5 working days</strong>. Shortlisted candidates will be contacted via telephone and email for a demo lecture and interview at our Thane campus.
                  </div>

                  <div className="pt-3">
                    <button
                      type="button"
                      onClick={resetForm}
                      className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#9E1B32] hover:bg-[#BA203B] text-white text-xs font-bold transition-all shadow-md cursor-pointer"
                    >
                      <span>Submit Another Application</span>
                    </button>
                  </div>
                </div>
              ) : (
                /* INTERACTIVE FORM */
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Row 1: Personal Details */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Prof. / Dr. / Ms. Full Name"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#9E1B32] focus:border-transparent transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
                        Contact Phone / WhatsApp <span className="text-red-500">*</span>
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

                  {/* Row 2: Position & Wing Selection */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
                        Position / Role Applied For <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={formData.positionApplied}
                        onChange={(e) => setFormData({ ...formData, positionApplied: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#9E1B32] focus:border-transparent transition-all bg-white"
                      >
                        {JOB_OPENINGS.map((j) => (
                          <option key={j.id} value={j.title}>
                            {j.title} ({j.wing})
                          </option>
                        ))}
                        <option value="General Faculty Application">Other / General Faculty Application</option>
                        <option value="Administrative / Support Staff">Administrative / Support Staff</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
                        Academic Department / Wing <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={formData.departmentWing}
                        onChange={(e) => setFormData({ ...formData, departmentWing: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#9E1B32] focus:border-transparent transition-all bg-white"
                      >
                        <option value="Junior College (HSC)">Junior College (HSC XI &amp; XII Science, Comm, Arts)</option>
                        <option value="Secondary (SSC)">Secondary School (Std V to X SSC Board)</option>
                        <option value="Pre-Primary & Primary">Pre-Primary &amp; Primary School (Jr. KG to Std IV)</option>
                        <option value="Administration & Labs">Science Labs &amp; Academic Administration</option>
                      </select>
                    </div>
                  </div>

                  {/* Row 3: Qualification & Experience */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
                        Highest Qualification <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. M.Sc (Physics) + B.Ed / M.Com"
                        value={formData.highestQualification}
                        onChange={(e) => setFormData({ ...formData, highestQualification: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#9E1B32] focus:border-transparent transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
                        Total Teaching / Work Experience <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={formData.totalExperience}
                        onChange={(e) => setFormData({ ...formData, totalExperience: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#9E1B32] focus:border-transparent transition-all bg-white"
                      >
                        <option value="Fresher (0–1 Year)">Fresher (0–1 Year)</option>
                        <option value="1–2 Years">1–2 Years</option>
                        <option value="3–5 Years">3–5 Years</option>
                        <option value="5–10 Years">5–10 Years</option>
                        <option value="10+ Years">10+ Years (Senior Faculty)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
                        Expected CTC (Annual / Monthly)
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. ₹ 4.5 – 6.0 LPA / Negotiable"
                        value={formData.expectedCTC}
                        onChange={(e) => setFormData({ ...formData, expectedCTC: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#9E1B32] focus:border-transparent transition-all"
                      />
                    </div>
                  </div>

                  {/* Row 4: RESUME UPLOADER DROPZONE */}
                  <div>
                    <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
                      Upload Resume / Curriculum Vitae (PDF / Word) <span className="text-red-500">*</span>
                    </label>

                    <input
                      ref={fileInputRef}
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileChange}
                      className="hidden"
                    />

                    {uploadedFile ? (
                      /* File Attached Preview */
                      <div className="flex items-center justify-between p-4 rounded-2xl bg-emerald-50 border border-emerald-200">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                            <FileCheck className="w-5 h-5" />
                          </div>
                          <div>
                            <span className="text-xs font-bold text-slate-900 block truncate max-w-xs sm:max-w-md">
                              {uploadedFile.name}
                            </span>
                            <span className="text-[11px] text-slate-500 font-mono">
                              {(uploadedFile.size / (1024 * 1024)).toFixed(2)} MB • Ready to dispatch
                            </span>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => setUploadedFile(null)}
                          className="p-1.5 text-slate-400 hover:text-red-600 rounded-lg hover:bg-white transition-colors"
                          title="Remove attached file"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      /* Drag & Drop Area */
                      <div
                        onDragOver={handleDragOver}
                        onDrop={handleDrop}
                        onClick={() => fileInputRef.current?.click()}
                        className="border-2 border-dashed border-slate-300 hover:border-[#9E1B32] rounded-2xl p-6 sm:p-8 text-center cursor-pointer transition-colors bg-slate-50/60 hover:bg-[#9E1B32]/5 group"
                      >
                        <div className="w-12 h-12 rounded-2xl bg-[#9E1B32]/10 text-[#9E1B32] flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                          <UploadCloud className="w-6 h-6" />
                        </div>
                        <span className="text-xs sm:text-sm font-bold text-slate-800 block">
                          Click to browse or drag and drop your Resume here
                        </span>
                        <span className="text-[11px] text-slate-500 mt-1 block">
                          Supports PDF, DOC, or DOCX formats (Maximum file size: 10 MB)
                        </span>
                      </div>
                    )}

                    {fileError && (
                      <p className="text-xs text-red-600 mt-2 flex items-center gap-1.5">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        <span>{fileError}</span>
                      </p>
                    )}
                  </div>

                  {/* Row 5: Statement of Purpose / Cover Message */}
                  <div>
                    <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
                      Brief Statement of Purpose / Cover Note (Optional)
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Share your teaching philosophy, board achievements, or specific subject interests..."
                      value={formData.coverNote}
                      onChange={(e) => setFormData({ ...formData, coverNote: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#9E1B32] focus:border-transparent transition-all"
                    />
                  </div>

                  {/* Submission Notice & Button */}
                  <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-100">
                    <p className="text-[11px] text-slate-500 leading-snug text-center sm:text-left">
                      Applications are processed in confidence and routed to{" "}
                      <span className="font-mono text-slate-700 font-semibold">{getDepartmentEmail("careers")}</span>.
                    </p>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-[#9E1B32] hover:bg-[#BA203B] disabled:opacity-50 text-white text-xs sm:text-sm font-bold transition-all shadow-md hover:shadow-lg cursor-pointer"
                    >
                      {isSubmitting ? (
                        <>
                          <Clock className="w-4 h-4 animate-spin text-[#F6D074]" />
                          <span>Dispatching Application...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4 text-[#F6D074]" />
                          <span>Submit Application &amp; Send Resume</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* 5. HIRING PROCESS & TIMELINE (4 PHASES)                   */}
        {/* ========================================================= */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20">
          <MotionReveal direction="down">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#9E1B32]/10 text-[#9E1B32] text-xs font-bold uppercase tracking-wider mb-2">
                <Clock className="w-3.5 h-3.5" />
                <span>Transparent Hiring Roadmap</span>
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900">
                Our 4-Stage Faculty Selection Process
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-2">
                Every application is evaluated with academic rigor, fairness, and mutual professional alignment.
              </p>
            </div>
          </MotionReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                step: "01",
                title: "Resume & Credential Screening",
                desc: "Verification of academic marks, B.Ed certifications, and prior Maharashtra State Board teaching history.",
              },
              {
                step: "02",
                title: "Telephonic Academic Interaction",
                desc: "Short introductory conversation with the Department HOD regarding syllabus comfort and pedagogy approach.",
              },
              {
                step: "03",
                title: "Classroom Demo Lecture",
                desc: "A 20-minute live demo topic delivered to current students and evaluated by senior subject coordinators.",
              },
              {
                step: "04",
                title: "Management & Principal Dialogue",
                desc: "Final discussion with Principal & Trust Trustees for compensation offer and appointment formalization.",
              },
            ].map((phase, idx) => (
              <MotionReveal
                key={idx}
                direction="up"
                delay={0.1 + idx * 0.08}
                hoverLift={true}
                className="h-full"
              >
                <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-sm flex flex-col justify-between h-full hover:border-[#9E1B32]/40 transition-all duration-300">
                  <div>
                    <span className="text-2xl font-serif font-extrabold text-[#DDA743] block mb-2">
                      {phase.step}
                    </span>
                    <h3 className="text-sm font-bold text-slate-900 leading-snug">{phase.title}</h3>
                    <p className="text-xs text-slate-600 mt-2 leading-relaxed">{phase.desc}</p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-1.5 text-[11px] font-semibold text-[#9E1B32]">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Stage {idx + 1} Milestone</span>
                  </div>
                </div>
              </MotionReveal>
            ))}
          </div>
        </section>

        {/* ========================================================= */}
        {/* 6. FAST-TRACK EMAIL CONTACT BANNER                        */}
        {/* ========================================================= */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20">
          <MotionReveal direction="up" delay={0.15} hoverLift={true}>
            <div className="bg-gradient-to-r from-slate-900 via-[#1A080C] to-slate-900 rounded-3xl p-6 sm:p-10 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 border border-[#DDA743]/30">
              <div className="max-w-xl text-center md:text-left">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#DDA743]/20 text-[#F6D074] text-xs font-bold uppercase tracking-wider mb-2 border border-[#DDA743]/30">
                  <Mail className="w-3.5 h-3.5" />
                  <span>Direct HR Desk Inquiry</span>
                </span>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white leading-tight">
                  Have an Updated CV Ready to Email?
                </h2>
                <p className="text-xs sm:text-sm text-stone-300 mt-2 leading-relaxed">
                  You can also email your CV directly to our HR desk at{" "}
                  <strong className="text-[#F6D074] font-mono">{INSTITUTIONAL_EMAILS.careers.fallbackEmail}</strong>{" "}
                  with the email subject line:{" "}
                  <span className="italic text-stone-200">&ldquo;Faculty Application - [Subject / Role] - [Your Name]&rdquo;</span>.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full sm:w-auto">
                <a
                  href={`mailto:${INSTITUTIONAL_EMAILS.careers.fallbackEmail}?subject=Faculty%20Application%20at%20Gurukul%20Vidyapeeth`}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#9E1B32] hover:bg-[#BA203B] text-white font-bold text-xs sm:text-sm transition-all shadow-md hover:-translate-y-0.5 cursor-pointer"
                >
                  <Mail className="w-4 h-4 text-[#F6D074]" />
                  <span>Email Resume to HR Desk</span>
                </a>

                <button
                  type="button"
                  onClick={() => scrollToApplication()}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/30 font-semibold text-xs sm:text-sm transition-all hover:-translate-y-0.5 cursor-pointer"
                >
                  <UploadCloud className="w-4 h-4" />
                  <span>Use Online Form</span>
                </button>
              </div>
            </div>
          </MotionReveal>
        </section>
      </main>

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
