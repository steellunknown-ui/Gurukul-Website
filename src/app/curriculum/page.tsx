"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  BookOpen,
  GraduationCap,
  CheckCircle2,
  Award,
  FileText,
  ChevronRight,
  Languages,
  FlaskConical,
  Calculator,
  Download,
  HelpCircle,
  Compass,
  ShieldCheck,
  Layers,
  Calendar,
  ArrowRight,
  Clock,
  Target,
  Cpu,
  TrendingUp,
  Palette,
  BookMarked,
  Scale,
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

// Academic Tier Configuration
type TierId = "pre-primary" | "primary" | "secondary" | "junior-college";

interface TierData {
  id: TierId;
  tabLabel: string;
  badge: string;
  standards: string;
  title: string;
  focus: string;
  description: string;
  boardAffiliation: string;
  subjects: { name: string; type: string; details: string }[];
  pedagogyPillars: { title: string; desc: string }[];
  evaluationMethod: string;
}

const CURRICULUM_TIERS: TierData[] = [
  {
    id: "pre-primary",
    tabLabel: "Pre-Primary",
    badge: "Foundational Years",
    standards: "Nursery, Jr. KG & Sr. KG",
    title: "Foundational Literacy & Playway Discovery",
    focus: "Cognitive, sensory-motor, phonics & socio-emotional development",
    description:
      "Our early childhood curriculum bridges joyful exploration with foundational phonics, numeric readiness, and creative play. Guided by child-centric methodology, little learners discover language, numbers, and physical dexterity without undue exam pressures.",
    boardAffiliation: "Early Childhood Care & Education (ECCE) aligned with NEP 2020",
    subjects: [
      { name: "Phonics & Early English", type: "Language & Reading", details: "Sound recognition, letter blending, picture reading, oral expression" },
      { name: "Number Concepts & Math Fun", type: "Pre-Numeracy", details: "Count & match, shape sorting, patterning, spatial awareness" },
      { name: "Environmental Discovery", type: "World & Nature", details: "Flora, fauna, seasons, community helpers, hygiene & etiquette" },
      { name: "Fine Motor & Creative Arts", type: "Skill & Dexterity", details: "Clay modeling, paper craft, finger painting, rhythm and rhymes" },
      { name: "Physical Play & Coordination", type: "Wellness", details: "Outdoor agility, balance activities, collaborative games" },
    ],
    pedagogyPillars: [
      { title: "No Rote Learning", desc: "Interactive sensory kits and storytelling cultivate organic comprehension." },
      { title: "Bilingual Soft Transition", desc: "English medium foundation with supportive Hindi and Marathi conversational warmth." },
      { title: "Continuous Observation", desc: "Milestone-based progress reporting rather than formal grading or test stress." },
    ],
    evaluationMethod: "Anecdotal observation, monthly milestone charts, and parental collaborative feedback sessions.",
  },
  {
    id: "primary",
    tabLabel: "Primary School",
    badge: "Core Literacy & Numeracy",
    standards: "Standard I to IV",
    title: "Concept Building & Holistic Expression",
    focus: "Mental math, creative writing, bilingual fluency & ethical values",
    description:
      "The primary stage strengthens foundational learning with structured textbooks, hands-on activities, mental arithmetic, and multi-language introduction under the Maharashtra State Board framework.",
    boardAffiliation: "Maharashtra State Board of Secondary and Higher Secondary Education (MSBSHSE)",
    subjects: [
      { name: "English (First Language)", type: "Core Medium", details: "Grammar foundation, prose comprehension, cursive penmanship, creative composition" },
      { name: "Mathematics & Mental Arithmetic", type: "Analytical", details: "Fundamental operations, times tables mastery, word problems, geometric shapes" },
      { name: "Environmental Studies (EVS)", type: "Science & Society", details: "Natural systems, community hygiene, family values, Indian heritage" },
      { name: "Marathi (Compulsory State Language)", type: "Regional Language", details: "Basic alphabet, matras, conversational phrases, simple poems" },
      { name: "Art, Craft & Creative Expression", type: "Aesthetics", details: "Drawing, origami, indigenous crafts, folk rhythm" },
      { name: "Health, Yoga & Physical Education", type: "Wellness", details: "Posture drills, basic yogasanas, playground discipline, team games" },
    ],
    pedagogyPillars: [
      { title: "Activity-Oriented Teaching", desc: "Math manipulatives and science discovery charts cement abstract ideas." },
      { title: "Tri-Language Groundwork", desc: "Gentle phased mastery of English, Marathi, and early Hindi spoken readiness." },
      { title: "Handwriting & Spelling Focus", desc: "Regular transcription and spelling drills develop lifelong academic neatness." },
    ],
    evaluationMethod: "CCE System: 2 Formative unit tests (class assignments, orals) + 2 Summative terminal examinations per academic session.",
  },
  {
    id: "secondary",
    tabLabel: "Upper Primary & Secondary (SSC)",
    badge: "State Board SSC Tier",
    standards: "Standard V to X (SSC Board)",
    title: "Rigorous Academic Mastery & SSC Board Pedagogy",
    focus: "Analytical STEM, Tri-Language Formula, social sciences & board exam readiness",
    description:
      "Secondary education prepares students for the Maharashtra SSC Board examinations through thorough syllabus coverage, dedicated science laboratory practicals, mathematical problem-solving drills, and consistent mock board series.",
    boardAffiliation: "Maharashtra State Board SSC (MSBSHSE Pune Board)",
    subjects: [
      { name: "English (First Language / Medium)", type: "Language I", details: "Textual literature, unseen comprehension, formal letter writing, report drafting (100 Marks)" },
      { name: "Marathi (Compulsory State Language)", type: "Language II", details: "State board prescribed syllabus, grammar, Nibandh lekhan, Patra lekhan (100 Marks)" },
      { name: "Hindi (Second / Composite Language)", type: "Language III", details: "Vyakaran, Gadhya & Padhya, Bhasha abhyas (100 Marks / 50 Marks Composite)" },
      { name: "Mathematics (Algebra & Geometry)", type: "STEM Core", details: "Linear equations, quadratic equations, trigonometry, circle theorems & practicals (100 Marks)" },
      { name: "Science & Technology (Part 1 & 2)", type: "STEM Lab Core", details: "Physics, Chemistry, Biology & environmental sciences with 20-mark practical viva (100 Marks)" },
      { name: "Social Sciences (History, Civics & Geography)", type: "Humanities", details: "Indian national movement, political system, world geography & map work (100 Marks)" },
      { name: "ICT & Computer Studies", type: "Digital Literacy", details: "Office applications, basic algorithms, internet safety, digital project files" },
      { name: "Health, Physical Education & Work Experience", type: "Graded", details: "School athletic meets, PT drill, yoga, SUPW social responsibility project" },
    ],
    pedagogyPillars: [
      { title: "Experimental Laboratory Work", desc: "Students execute individual physics, chemistry, and biology experiments every week." },
      { title: "Chapter-Wise SSC Question Bank", desc: "Targeted practice on past 10-year board questions, marking schemes, and time management." },
      { title: "Two Prelim Board Rehearsals", desc: "Full-syllabus prelim examinations simulating the exact SSC Maharashtra board atmosphere." },
    ],
    evaluationMethod: "80 Marks written board paper + 20 Marks internal assessment (10 Marks practicals/orals + 10 Marks unit test/journal work).",
  },
  {
    id: "junior-college",
    tabLabel: "Junior College (HSC XI & XII)",
    badge: "Higher Secondary HSC Tier",
    standards: "Class XI & XII (FYJC & SYJC)",
    title: "Stream Specialization & Competitive Gateway",
    focus: "In-depth specialization across Science, Commerce & Arts with entrance test foundation",
    description:
      "Our Junior College curriculum empowers young scholars with comprehensive Maharashtra HSC Board syllabus mastery while simultaneously reinforcing parallel preparation for national and state entrance examinations like MHT-CET, NEET, JEE, and CA Foundation.",
    boardAffiliation: "Maharashtra State Board HSC (College Index: J-15.14.086)",
    subjects: [
      { name: "HSC Science (General PCM / PCB / PCMB)", type: "Core Science", details: "Physics, Chemistry, Mathematics, Biology, English, EVS & Physical Education with 30-mark board lab exams" },
      { name: "Bifocal Computer Science (200 Marks)", type: "Tech Specialization", details: "Hardware, software, microprocessors, C++ programming, replacing Biology and 2nd Language" },
      { name: "HSC Commerce (Accounts & Management)", type: "Commerce Core", details: "Book-Keeping & Accountancy, Organization of Commerce & Management (OCM), Economics, English" },
      { name: "Commerce Electives (SP / Maths)", type: "Elective", details: "Secretarial Practice (company law & corporate correspondence) OR Mathematics & Statistics" },
      { name: "HSC Arts (Humanities)", type: "Humanities", details: "Economics, Psychology, Sociology, Political Science, History / Philosophy, English & Language" },
      { name: "Environmental Education (EVS) & PE", type: "Compulsory Graded", details: "Independent research project journal, viva voce, health and physical evaluation" },
    ],
    pedagogyPillars: [
      { title: "Advanced Practical Laboratories", desc: "State-of-the-art physics, chemistry, and computer suites with certified equipment and apparatus." },
      { title: "Competitive Foundation Cell", desc: "Weekly MCQ test series aligned with MHT-CET, JEE Main, NEET-UG, and CA Foundation." },
      { title: "Mentorship & Board Moderation", desc: "Experienced faculty guides on board answer presentation to secure 95%+ distinction scores." },
    ],
    evaluationMethod: "Science: 70 Marks Theory + 30 Marks Practical Lab. Commerce/Arts: 80 Marks Theory + 20 Marks Internal Project / Application-based test.",
  },
];

// Tri-Language Formula Overview
const TRI_LANGUAGE_DETAILS = [
  {
    language: "English (First Language & Instruction Medium)",
    badge: "Medium of Instruction",
    color: "from-blue-600 to-indigo-700",
    role: "Global Communication & Academic Discourse",
    highlights: [
      "Medium of instruction across Science, Mathematics, and scholastic disciplines",
      "Emphasis on grammatical precision, formal essay writing, and public speaking",
      "Exposure to classic and contemporary literature, poetry, and analytical essays",
      "Oral communication workshops to eliminate stage fright and build interview confidence",
    ],
  },
  {
    language: "Marathi (Compulsory State Language)",
    badge: "Maharashtra Mandate",
    color: "from-[#9E1B32] to-[#7A1224]",
    role: "State Heritage & Administrative Fluency",
    highlights: [
      "Strict compliance with Maharashtra State Language Policy from primary to secondary",
      "Development of proficient reading, cursive writing, and formal correspondence",
      "Appreciation of Maharashtra's rich cultural literature, Saint literature, and historical texts",
      "Equips students for state government competitive exams and official administration",
    ],
  },
  {
    language: "Hindi (Second / Composite Language)",
    badge: "National Link Language",
    color: "from-amber-600 to-orange-700",
    role: "National Inter-State Articulation",
    highlights: [
      "Comprehensive grammar fundamentals: Sandhi, Samas, Muhavare, and Alankar",
      "Critical reading of short stories, prose essays, and patriotic poetry",
      "Enhances bilingual versatility across diverse national collegiate environments",
      "Available as full 100-mark or composite 50-mark option in secondary board exams",
    ],
  },
];

// Assessment & Evaluation Scheme
const EVALUATION_SCHEME = [
  {
    title: "Formative Assessment (Continuous)",
    weightage: "20% Internal Weightage",
    icon: Target,
    items: [
      "Classroom participation & active discussion",
      "Weekly concept quizzes & homework notebooks",
      "Oral assessments (reading, recitation, viva)",
      "Individual and group project portfolios",
    ],
  },
  {
    title: "Summative Semester Exams",
    weightage: "80% Terminal Weightage",
    icon: Award,
    items: [
      "Mid-Term Terminal Examination (October)",
      "Annual Final Examination (March / April)",
      "Class X & XII Board Preliminary series",
      "Standardized Maharashtra State Board blueprints",
    ],
  },
  {
    title: "Practical & Laboratory Viva",
    weightage: "Hands-on Practical Marks",
    icon: FlaskConical,
    items: [
      "Compulsory science journals and certified experiments",
      "Hands-on microscope, reagent & circuit testing",
      "Computer Science lab programs and project execution",
      "Board-appointed external examiners for HSC boards",
    ],
  },
];

// Competitive Exam Cells
const COMPETITIVE_EXAM_CELLS = [
  {
    stream: "Science (Engineering)",
    exams: "MHT-CET & JEE Main",
    icon: Cpu,
    tag: "Engineering & Tech",
    description: "Rigorous parallel problem-solving targeting Maharashtra engineering colleges (VJTI, COEP, SPIT) and national NITs/IITs.",
  },
  {
    stream: "Science (Medical)",
    exams: "NEET-UG Foundation",
    icon: FlaskConical,
    tag: "Medical & Healthcare",
    description: "Deep conceptual coverage of NCERT & State Board PCB with weekly diagram drills and timed negative-marking simulations.",
  },
  {
    stream: "Commerce (Finance)",
    exams: "CA Foundation & CS Executive",
    icon: TrendingUp,
    tag: "Commerce & Corporate",
    description: "Mastery of financial accounting, commercial law principles, and business statistics for aspiring Chartered Accountants.",
  },
];

export default function CurriculumPage() {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [isEnquiryModalOpen, setIsEnquiryModalOpen] = useState(false);
  const [enquiryClassLevel, setEnquiryClassLevel] = useState<AdmissionClassLevel>("XI");
  const [selectedStreamForEnquiry, setSelectedStreamForEnquiry] = useState("science");

  // Fee modal state
  const [isFeeModalOpen, setIsFeeModalOpen] = useState(false);
  const [selectedFeeStandardId, setSelectedFeeStandardId] = useState("std-1");

  // Notice Drawer state
  const [isNoticeDrawerOpen, setIsNoticeDrawerOpen] = useState(false);

  // Active Curriculum Tier Tab
  const [activeTier, setActiveTier] = useState<TierId>("secondary");

  const currentTierData = CURRICULUM_TIERS.find((t) => t.id === activeTier) || CURRICULUM_TIERS[2];

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
        {/* 1. HERO SECTION: ACADEMIC CURRICULUM & SYLLABUS          */}
        {/* ========================================================= */}
        <section className="relative text-white pt-10 pb-16 md:pt-16 md:pb-24 overflow-hidden border-b border-[#DDA743]/30 min-h-[500px] flex items-center">
          {/* Panoramic Campus Hero Background Image — Natural, Crisp & Real */}
          <div className="absolute inset-0 z-0 overflow-hidden">
            <Image
              src="/images/curriculum/curriculum-hero.jpg"
              alt="Gurukul Vidyapeeth students studying collaboratively with books and laptop on campus"
              fill
              priority
              className="object-cover object-center filter brightness-100 contrast-100"
              sizes="100vw"
            />
            {/* Localized neutral shadow on the left for text contrast — leaving image bright & natural */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/65 via-50% to-black/20 pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
            {/* Breadcrumb Navigation */}
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
                  <span className="text-stone-300">Academics</span>
                </li>
                <li>
                  <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
                </li>
                <li className="text-[#DDA743] font-semibold" aria-current="page">
                  Curriculum &amp; Board Syllabus
                </li>
              </ol>
            </nav>

            <div className="max-w-3xl">
              <MotionReveal direction="down">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/70 border border-[#DDA743]/60 text-[#DDA743] text-xs font-semibold uppercase tracking-wider mb-4 shadow-md backdrop-blur-md">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#F6D074]" />
                  <span>Maharashtra State Board (MSBSHSE) • Jr. KG to Std XII (SSC &amp; HSC)</span>
                </div>
              </MotionReveal>

              <MotionReveal direction="up" delay={0.1}>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white tracking-tight leading-[1.18] drop-shadow-lg">
                  Holistic Academic Curriculum &amp;{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F6D074] via-[#DDA743] to-[#ECC460] block mt-1 drop-shadow">
                    Proven Board Pedagogy
                  </span>
                </h1>
              </MotionReveal>

              <MotionReveal direction="up" delay={0.2}>
                <p className="mt-4 text-stone-100 text-sm sm:text-base leading-relaxed max-w-2xl font-medium drop-shadow-md">
                  A structured learning journey bridging foundational literacy, Tri-Language fluency, hands-on science laboratories, and high-impact HSC specialization. Built to empower critical thinking, board excellence, and competitive entrance readiness.
                </p>
              </MotionReveal>

              <MotionReveal direction="up" delay={0.3}>
                <div className="mt-7 flex flex-wrap items-center gap-3.5">
                  <a
                    href="#syllabus-framework"
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#9E1B32] hover:bg-[#BA203B] text-white text-xs sm:text-sm font-bold tracking-wide transition-all shadow-lg hover:shadow-xl cursor-pointer"
                  >
                    <BookOpen className="w-4 h-4 text-[#F6D074]" />
                    <span>Explore Syllabus Blueprint</span>
                    <ArrowRight className="w-4 h-4 text-[#F6D074]" />
                  </a>

                  <button
                    onClick={() => handleOpenEnquiry("XI")}
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/30 text-xs sm:text-sm font-bold backdrop-blur-md transition-all cursor-pointer"
                  >
                    <GraduationCap className="w-4 h-4 text-[#F6D074]" />
                    <span>Admission Enquiry 2026–27</span>
                  </button>

                  <button
                    onClick={() => handleOpenFeeModal("std-1")}
                    className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-black/40 hover:bg-black/60 text-stone-200 border border-[#DDA743]/40 text-xs font-semibold backdrop-blur-md transition-all cursor-pointer"
                  >
                    <span>View Fee Structure</span>
                  </button>
                </div>
              </MotionReveal>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* 2. CORE CURRICULAR HIGHLIGHTS (4 PILLARS)                 */}
        {/* ========================================================= */}
        <section className="relative -mt-6 z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white rounded-xl p-4 shadow-md border border-slate-200/90 flex items-start gap-3.5 hover:border-[#9E1B32]/40 transition-colors">
              <div className="w-10 h-10 rounded-lg bg-[#9E1B32]/10 text-[#9E1B32] flex items-center justify-center shrink-0 mt-0.5 font-bold">
                <BookMarked className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-sm font-bold text-slate-900 leading-snug">100% MSBSHSE Aligned</h2>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  Strictly synchronized with current Maharashtra State Board syllabus and textbooks.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-xl p-4 shadow-md border border-slate-200/90 flex items-start gap-3.5 hover:border-[#9E1B32]/40 transition-colors">
              <div className="w-10 h-10 rounded-lg bg-[#DDA743]/20 text-[#9E1B32] flex items-center justify-center shrink-0 mt-0.5 font-bold">
                <Languages className="w-5 h-5 text-[#9E1B32]" />
              </div>
              <div>
                <h2 className="text-sm font-bold text-slate-900 leading-snug">Tri-Language Formula</h2>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  English medium instruction with compulsory Marathi literacy and Hindi proficiency.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-xl p-4 shadow-md border border-slate-200/90 flex items-start gap-3.5 hover:border-[#9E1B32]/40 transition-colors">
              <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5 font-bold">
                <FlaskConical className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-sm font-bold text-slate-900 leading-snug">Dedicated Lab Practicals</h2>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  Individual experiment workstations for Physics, Chemistry, Biology and Computer Science.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-xl p-4 shadow-md border border-slate-200/90 flex items-start gap-3.5 hover:border-[#9E1B32]/40 transition-colors">
              <div className="w-10 h-10 rounded-lg bg-indigo-50 text-indigo-700 flex items-center justify-center shrink-0 mt-0.5 font-bold">
                <Target className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-sm font-bold text-slate-900 leading-snug">Competitive Foundation</h2>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  Parallel test-prep guidance for MHT-CET, NEET, JEE Main, and CA Foundation.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* 3. INTERACTIVE TIERED CURRICULUM BLUEPRINT                */}
        {/* ========================================================= */}
        <section id="syllabus-framework" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#9E1B32]/10 text-[#9E1B32] text-xs font-bold uppercase tracking-wider mb-2.5">
              <Compass className="w-3.5 h-3.5" />
              <span>Standard-Wise Syllabus Blueprint</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900">
              Curriculum Across Academic Tiers
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-2">
              Select an educational tier to inspect the standard-wise subject matrix, pedagogy focus, and evaluation system.
            </p>
          </div>

          {/* Tier Switcher Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-2 p-1.5 bg-slate-100/90 rounded-2xl max-w-3xl mx-auto mb-8 border border-slate-200">
            {CURRICULUM_TIERS.map((tier) => {
              const isActive = activeTier === tier.id;
              return (
                <button
                  key={tier.id}
                  onClick={() => setActiveTier(tier.id)}
                  className={`flex-1 min-w-[130px] sm:min-w-[150px] py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold transition-all text-center cursor-pointer ${
                    isActive
                      ? "bg-white text-[#9E1B32] shadow-sm border border-slate-200/90 font-extrabold"
                      : "text-slate-600 hover:text-slate-900 hover:bg-white/60"
                  }`}
                >
                  <span className="block">{tier.tabLabel}</span>
                  <span className="text-[10px] block opacity-75 font-normal">{tier.standards}</span>
                </button>
              );
            })}
          </div>

          {/* Active Tier Content Panel */}
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200/90 overflow-hidden">
            {/* Tier Header Banner */}
            <div className="p-6 sm:p-8 bg-gradient-to-r from-slate-900 via-[#1A080C] to-slate-900 text-white border-b border-[#DDA743]/30">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-[#DDA743]/20 text-[#F6D074] text-xs font-mono font-bold mb-2 border border-[#DDA743]/30">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>{currentTierData.badge} • {currentTierData.standards}</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-serif font-bold text-white tracking-wide">
                    {currentTierData.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-300 mt-1 max-w-2xl font-light">
                    {currentTierData.focus}
                  </p>
                </div>

                <div className="shrink-0 bg-white/10 backdrop-blur-md px-4 py-2.5 rounded-xl border border-white/15 text-right">
                  <span className="text-[10.5px] uppercase tracking-wider block text-stone-300">Affiliation Standard</span>
                  <span className="text-xs sm:text-sm font-semibold text-[#F6D074] block mt-0.5">
                    {currentTierData.boardAffiliation}
                  </span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-stone-200 mt-4 pt-4 border-t border-white/10 leading-relaxed">
                {currentTierData.description}
              </p>
            </div>

            {/* Subject Matrix Table */}
            <div className="p-6 sm:p-8 space-y-8">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-[#9E1B32]" />
                    <span>Prescribed Course Subjects &amp; Scope</span>
                  </h4>
                  <span className="text-[11px] font-mono text-slate-500">
                    {currentTierData.subjects.length} Core Curriculum Modules
                  </span>
                </div>

                <div className="overflow-x-auto rounded-xl border border-slate-200">
                  <table className="w-full text-left text-xs sm:text-sm border-collapse">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-200 text-slate-700 font-bold text-xs uppercase tracking-wider">
                        <th className="py-3 px-4">Subject Title</th>
                        <th className="py-3 px-4">Domain / Type</th>
                        <th className="py-3 px-4">Curriculum Scope &amp; Learning Outcomes</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {currentTierData.subjects.map((subj, idx) => (
                        <tr key={idx} className="hover:bg-slate-50/70 transition-colors">
                          <td className="py-3 px-4 font-bold text-slate-900 flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#9E1B32]" />
                            {subj.name}
                          </td>
                          <td className="py-3 px-4 text-slate-600 font-medium">
                            <span className="inline-block px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-[11px] font-mono">
                              {subj.type}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-slate-600 leading-relaxed">
                            {subj.details}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Pedagogy Pillars & Evaluation Method */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
                <div className="md:col-span-2 space-y-3">
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5 text-[#9E1B32]">
                    <Layers className="w-4 h-4" />
                    <span>Pedagogical Approach &amp; Classroom Delivery</span>
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {currentTierData.pedagogyPillars.map((pillar, pIdx) => (
                      <div key={pIdx} className="bg-slate-50 p-3.5 rounded-xl border border-slate-200/80">
                        <span className="text-xs font-bold text-slate-900 block">{pillar.title}</span>
                        <p className="text-[11px] text-slate-600 mt-1 leading-snug">{pillar.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-[#9E1B32]/5 p-4 rounded-xl border border-[#9E1B32]/15 flex flex-col justify-between">
                  <div>
                    <h4 className="text-xs font-bold text-[#9E1B32] uppercase tracking-wider flex items-center gap-1.5 mb-2">
                      <Scale className="w-4 h-4" />
                      <span>Grading &amp; Assessment Model</span>
                    </h4>
                    <p className="text-xs text-slate-700 leading-relaxed font-medium">
                      {currentTierData.evaluationMethod}
                    </p>
                  </div>
                  <div className="pt-3 mt-3 border-t border-[#9E1B32]/10 flex items-center justify-between text-[11px] text-[#9E1B32] font-semibold">
                    <span>Terminal Progress Reports</span>
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* 4. TRI-LANGUAGE FORMULA (MAHARASHTRA MANDATE)             */}
        {/* ========================================================= */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20">
          <div className="bg-gradient-to-br from-white to-slate-50 rounded-2xl p-6 sm:p-10 border border-slate-200 shadow-sm">
            <div className="max-w-3xl mb-8">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#9E1B32]/10 text-[#9E1B32] text-xs font-bold uppercase tracking-wider mb-2">
                <Languages className="w-3.5 h-3.5" />
                <span>State Language Policy Implementation</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900">
                The Maharashtra Tri-Language Formula
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                As per Maharashtra State Board regulations and national linguistic standards, Gurukul Vidyapeeth implements a balanced 3-language pedagogical framework ensuring global competence, regional roots, and inter-state fluency.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {TRI_LANGUAGE_DETAILS.map((lang, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-xl p-5 border border-slate-200/90 shadow-sm flex flex-col justify-between hover:border-[#9E1B32]/40 transition-colors"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="text-[11px] font-mono font-bold text-[#9E1B32] uppercase px-2 py-0.5 rounded bg-[#9E1B32]/10">
                        {lang.badge}
                      </span>
                      <span className="text-xs text-slate-400 font-mono">Tier {idx + 1}</span>
                    </div>
                    <h3 className="text-sm font-bold text-slate-900 leading-snug">
                      {lang.language}
                    </h3>
                    <p className="text-xs text-slate-500 italic mt-0.5 mb-3.5 font-serif">
                      {lang.role}
                    </p>

                    <ul className="space-y-2 text-xs text-slate-600">
                      {lang.highlights.map((item, hIdx) => (
                        <li key={hIdx} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span className="leading-snug">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                    <span>Weekly Periods: 6–8 Sessions</span>
                    <span className="font-semibold text-slate-700">Classroom &amp; Lab</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* 5. CCE ASSESSMENT & BOARD EXAMINATION SCHEME              */}
        {/* ========================================================= */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#9E1B32]/10 text-[#9E1B32] text-xs font-bold uppercase tracking-wider mb-2.5">
              <Scale className="w-3.5 h-3.5" />
              <span>Assessment Architecture</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900">
              Evaluation &amp; Board Examination Scheme
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-2">
              Combining Continuous Comprehensive Evaluation (CCE) with rigorous board exam preparatory discipline.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {EVALUATION_SCHEME.map((scheme, idx) => {
              const Icon = scheme.icon;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-xl p-6 border border-slate-200/90 shadow-sm flex flex-col justify-between"
                >
                  <div>
                    <div className="w-10 h-10 rounded-lg bg-[#9E1B32]/10 text-[#9E1B32] flex items-center justify-center mb-4">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="inline-block text-[11px] font-mono font-bold text-[#9E1B32] uppercase mb-1">
                      {scheme.weightage}
                    </div>
                    <h3 className="text-base font-bold text-slate-900 mb-3">{scheme.title}</h3>
                    <ul className="space-y-2 text-xs text-slate-600">
                      {scheme.items.map((item, iIdx) => (
                        <li key={iIdx} className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#DDA743] shrink-0 mt-1.5" />
                          <span className="leading-relaxed">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-5 pt-3 border-t border-slate-100 text-[11px] text-slate-500 flex items-center justify-between">
                    <span>Verified by Board Standards</span>
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ========================================================= */}
        {/* 6. COMPETITIVE EXAM FOUNDATION CELL (MHT-CET, NEET, JEE)  */}
        {/* ========================================================= */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20">
          <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-10 border border-slate-800 shadow-xl relative overflow-hidden">
            {/* Subtle background glow */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-[#9E1B32]/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#DDA743]/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10">
              <div className="max-w-2xl mb-8">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#DDA743]/20 text-[#F6D074] text-xs font-bold uppercase tracking-wider mb-2 border border-[#DDA743]/30">
                  <Target className="w-3.5 h-3.5" />
                  <span>Integrated Entrance Preparation Cell</span>
                </span>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white mt-1">
                  Competitive Exam Foundations for Junior College
                </h2>
                <p className="text-xs sm:text-sm text-stone-300 mt-2 leading-relaxed">
                  We empower Std XI and XII students with dual-track preparation: mastering textbook board questions while cultivating MCQ speed, numerical agility, and conceptual depth for national &amp; state competitive gateways.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {COMPETITIVE_EXAM_CELLS.map((cell, idx) => {
                  const Icon = cell.icon;
                  return (
                    <div
                      key={idx}
                      className="bg-white/5 border border-white/10 rounded-xl p-5 hover:bg-white/10 transition-colors backdrop-blur-sm"
                    >
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <div className="w-9 h-9 rounded-lg bg-[#9E1B32]/40 text-[#F6D074] flex items-center justify-center">
                          <Icon className="w-4 h-4" />
                        </div>
                        <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-white/10 text-stone-300">
                          {cell.tag}
                        </span>
                      </div>
                      <h3 className="text-sm font-bold text-white">{cell.stream}</h3>
                      <div className="text-xs font-semibold text-[#F6D074] mt-0.5 mb-2">
                        {cell.exams}
                      </div>
                      <p className="text-xs text-stone-300 leading-relaxed">
                        {cell.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* 7. ADMISSIONS & SYLLABUS ENQUIRY CTA                      */}
        {/* ========================================================= */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20">
          <div className="bg-gradient-to-r from-[#9E1B32] via-[#851629] to-[#680F1F] rounded-2xl p-6 sm:p-10 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 border border-[#BA203B]/50">
            <div className="max-w-xl text-center md:text-left">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 text-[#F6D074] text-xs font-bold uppercase tracking-wider mb-2">
                <Calendar className="w-3.5 h-3.5" />
                <span>Admissions Open for Academic Year 2026–27</span>
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white leading-tight">
                Empower Your Child with a Proven Curriculum
              </h2>
              <p className="text-xs sm:text-sm text-stone-200 mt-2 leading-relaxed">
                Connect with our academic counsellors to discuss stream selection (Science, Commerce, Arts), subject combinations, or school admissions from Jr. KG to Std X.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full sm:w-auto">
              <button
                onClick={() => handleOpenEnquiry("XI")}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white text-[#9E1B32] hover:bg-stone-100 font-bold text-xs sm:text-sm transition-all shadow-md cursor-pointer"
              >
                <GraduationCap className="w-4 h-4 text-[#9E1B32]" />
                <span>Apply for Admission</span>
              </button>

              <button
                onClick={() => handleOpenFeeModal("std-1")}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-black/20 hover:bg-black/30 text-white border border-white/30 font-semibold text-xs sm:text-sm transition-all cursor-pointer"
              >
                <span>View Fee Structure</span>
              </button>
            </div>
          </div>
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
