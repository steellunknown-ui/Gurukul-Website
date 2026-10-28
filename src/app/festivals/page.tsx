"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Trophy,
  Medal,
  Award,
  Calendar,
  Flag,
  Users,
  Compass,
  BookOpen,
  ChevronRight,
  ArrowRight,
  Clock,
  MapPin,
  CheckCircle2,
  X,
  Maximize2,
  GraduationCap,
  Flame,
  Music,
  Palette,
  Shield,
  Star,
  Zap,
} from "lucide-react";

import { UtilityBar } from "@/components/layout/utility-bar";
import { Header } from "@/components/layout/header";
import { MobileNav } from "@/components/layout/mobile-nav";
import { MobileDock } from "@/components/layout/mobile-dock";
import { Footer } from "@/components/layout/footer";
import { WhatsAppButton } from "@/components/ui/whatsapp-button";
import { NoticeDrawer } from "@/components/home/notice-drawer";
import { EnquiryModal, AdmissionClassLevel } from "@/components/home/enquiry-modal";
import { FeeStructureModal } from "@/components/home/fee-structure-modal";
import { Badge } from "@/components/ui/badge";
import { MotionReveal } from "@/components/ui/motion-reveal";
import { COLLEGE_CONFIG } from "@/config/college-config";

// Hydration-safe animated metric counter
function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    let start = 0;
    const duration = 1600;
    const steps = 30;
    const increment = target / steps;
    const stepTime = duration / steps;

    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [target]);

  if (!mounted) {
    return <span>{target}{suffix}</span>;
  }

  return (
    <span>
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

// Student Laurels & Institutional Achievements Data (Integrated per User Mandate)
interface AchievementItem {
  id: string;
  category: "Cultural & Arts" | "Sports & Athletics" | "STEM & Innovation" | "Scholastic & Olympiads";
  year: string;
  rank: string;
  rankBadgeColor: "gold" | "crimson" | "blue" | "green";
  title: string;
  organizer: string;
  recipients: string;
  standard: string;
  description: string;
  iconType: "trophy" | "medal" | "award" | "star";
}

const ACHIEVEMENTS_DATA: AchievementItem[] = [
  {
    id: "ach-1",
    category: "Sports & Athletics",
    year: "2025–26",
    rank: "1st Place • District Champions",
    rankBadgeColor: "gold",
    title: "Thane District Inter-School Kho-Kho Championship",
    organizer: "District Sports Office (DSO), Govt. of Maharashtra",
    recipients: "Gurukul Senior Girls Team",
    standard: "Standards IX & X",
    description:
      "Defeated 24 top schools across Thane municipal division in an undefeated run to lift the prestigious DSO Rolling Shield Trophy.",
    iconType: "trophy",
  },
  {
    id: "ach-2",
    category: "Cultural & Arts",
    year: "2025–26",
    rank: "Zonal Gold Medal",
    rankBadgeColor: "gold",
    title: "Maharashtra State Traditional Folk Dance & Lezim Trophy",
    organizer: "Directorate of Cultural Affairs, Maharashtra",
    recipients: "Gurukul Performing Arts Troupe (18 Students)",
    standard: "Secondary & Junior College Wings",
    description:
      "Secured 1st prize across 40 competing institutions for an authentic, synchronized presentation of traditional Maharashtrian Lezim and Gondhal.",
    iconType: "trophy",
  },
  {
    id: "ach-3",
    category: "STEM & Innovation",
    year: "2025–26",
    rank: "1st Prize • Best Working Model",
    rankBadgeColor: "blue",
    title: "Thane Municipal STEM & Robotics Innovation Fair",
    organizer: "Thane Science Teachers' Association & Homi Bhabha Trust",
    recipients: "Master Aarav Kulkarni & Miss Riya Shinde",
    standard: "Class XI Science (Bifocal CS)",
    description:
      "Engineered an IoT-enabled smart rainwater filtration and automated municipal tank monitoring prototype with solar backup.",
    iconType: "star",
  },
  {
    id: "ach-4",
    category: "Sports & Athletics",
    year: "2024–25",
    rank: "Gold Medal (Under-17)",
    rankBadgeColor: "crimson",
    title: "All-Maharashtra State Interschool Taekwondo Championship",
    organizer: "Taekwondo Association of Maharashtra (Recognized by IOA)",
    recipients: "Master Pratham Patil",
    standard: "Class X SSC",
    description:
      "Clinched Gold in the Under-55kg category, showcasing disciplined combat technique and mental endurance across 5 consecutive rounds.",
    iconType: "medal",
  },
  {
    id: "ach-5",
    category: "Cultural & Arts",
    year: "2025–26",
    rank: "State Special Jury Award",
    rankBadgeColor: "gold",
    title: "Bal Natya Mahotsav (Inter-School Marathi One-Act Play)",
    organizer: "Akhil Bharatiya Marathi Natya Parishad",
    recipients: "Gurukul Drama Club (Cast of 12)",
    standard: "Standards VII to IX",
    description:
      "Honored for original script writing, character portrayal, and emotional depth in the historical theatrical production 'Swarajyaache Doot'.",
    iconType: "award",
  },
  {
    id: "ach-6",
    category: "Scholastic & Olympiads",
    year: "2025–26",
    rank: "State Merit Rank #4",
    rankBadgeColor: "green",
    title: "Maharashtra Talent Search Examination (MTSE State Honors)",
    organizer: "Centre for Talent Search, Pune University",
    recipients: "Miss Tanvi Deshmukh",
    standard: "Class IX Secondary",
    description:
      "Scored in the top 99.8th percentile across 45,000 state aspirants with distinction in Mathematics and Logical Reasoning.",
    iconType: "medal",
  },
  {
    id: "ach-7",
    category: "STEM & Innovation",
    year: "2024–25",
    rank: "District Innovation Shield",
    rankBadgeColor: "blue",
    title: "Dr. Homi Bhabha Young Scientist Practical Laurels",
    organizer: "Mumbai Science Teachers' Association (MSTA)",
    recipients: "Master Rohan Sawant",
    standard: "Class IX SSC",
    description:
      "Cleared the written and laboratory experimental round with silver medal distinction for practical physics and chemistry demonstrations.",
    iconType: "award",
  },
  {
    id: "ach-8",
    category: "Sports & Athletics",
    year: "2025–26",
    rank: "Runners-Up Silver Shield",
    rankBadgeColor: "crimson",
    title: "Thane Division Inter-Junior College Kabaddi Tournament",
    organizer: "Maharashtra State Higher Secondary Sports Board",
    recipients: "Gurukul Junior College Boys Team",
    standard: "Classes XI & XII (Commerce & Arts)",
    description:
      "Demonstrated outstanding raiding tactics and team synergy, qualifying through 4 knockout stages to finish runners-up in the division.",
    iconType: "trophy",
  },
  {
    id: "ach-9",
    category: "Cultural & Arts",
    year: "2024–25",
    rank: "1st Prize • Open Category",
    rankBadgeColor: "gold",
    title: "Inter-School Patriotic Choral & Band Competition",
    organizer: "Rotary Club of Thane North & Sanskar Bharati",
    recipients: "Gurukul Senior Choir & Music Wing",
    standard: "Standards VI to X",
    description:
      "Awarded top honors for multi-part harmony singing of Vande Mataram accompanied by Indian classical percussion (Tabla & Harmonium).",
    iconType: "award",
  },
  {
    id: "ach-10",
    category: "Scholastic & Olympiads",
    year: "2025–26",
    rank: "International Gold Medal",
    rankBadgeColor: "green",
    title: "National Cyber Olympiad (NCO Science Olympiad Foundation)",
    organizer: "Science Olympiad Foundation (SOF), New Delhi",
    recipients: "Master Siddharth Jadhav",
    standard: "Class VIII Upper Primary",
    description:
      "Achieved a 100/100 perfect score in computational algorithms, internet safety, and binary arithmetic to win the Gold Medal.",
    iconType: "medal",
  },
  {
    id: "ach-11",
    category: "STEM & Innovation",
    year: "2025–26",
    rank: "Eco-Hero Trophy",
    rankBadgeColor: "blue",
    title: "Maharashtra State Green Campus Innovation Challenge",
    organizer: "Department of Environment & Climate Change, Govt. of Maharashtra",
    recipients: "Gurukul Eco-Warriors Nature Club",
    standard: "Classes VIII to XII",
    description:
      "Recognized for creating campus organic compost pits, zero-plastic waste awareness campaigns, and rainwater harvesting auditing.",
    iconType: "star",
  },
  {
    id: "ach-12",
    category: "Scholastic & Olympiads",
    year: "2024–25",
    rank: "State Top 10 Distinction",
    rankBadgeColor: "green",
    title: "Elementary & Intermediate State Drawing Grade Examinations",
    organizer: "Directorate of Art, Maharashtra State, Mumbai",
    recipients: "28 Gurukul Students ('A' Grade Certificate)",
    standard: "Classes VII, VIII & IX",
    description:
      "28 students achieved 'A' Grade distinction in Memory Drawing, Design & Nature Sketching, earning bonus marks toward SSC board eligibility.",
    iconType: "award",
  },
  {
    id: "ach-13",
    category: "Cultural & Arts",
    year: "2025–26",
    rank: "1st Place Gold Trophy",
    rankBadgeColor: "gold",
    title: "Thane Zilla Sanskrit Shloka & Stotra Pathan Championship",
    organizer: "Bhartiya Sanskriti Pratishthan & Chinmaya Mission",
    recipients: "Miss Vedika Joshi",
    standard: "Class VIII Upper Primary",
    description:
      "Demonstrated flawless Sanskrit diction, authentic Vedic meter cadence, and profound memory in the Bhagavad Gita chanting competition.",
    iconType: "trophy",
  },
  {
    id: "ach-14",
    category: "Sports & Athletics",
    year: "2025–26",
    rank: "Top 5 Finishers • Silver Medal",
    rankBadgeColor: "crimson",
    title: "Thane Mayor's Trophy Road Race & 5K Sprint",
    organizer: "Thane Municipal Corporation (TMC) Sports Wing",
    recipients: "Master Aditya Gaikwad",
    standard: "Class XI Junior College (Science)",
    description:
      "Finished 4th overall out of 350 junior athletes with an impressive 17:42 personal best timing in the Thane city 5-kilometer circuit.",
    iconType: "medal",
  },
  {
    id: "ach-15",
    category: "STEM & Innovation",
    year: "2025–26",
    rank: "1st Prize • Best Junior App",
    rankBadgeColor: "blue",
    title: "Mumbai Regional Junior CodeFest & AI Hackathon",
    organizer: "Computer Society of India (CSI) Student Chapter",
    recipients: "Master Devansh Shah & Master Neil Fernandes",
    standard: "Class XII Junior College (Bifocal CS)",
    description:
      "Built an AI-powered offline educational flashcard and quiz generator web application tailored to the Maharashtra State Board HSC curriculum.",
    iconType: "star",
  },
  {
    id: "ach-16",
    category: "Scholastic & Olympiads",
    year: "2024–25",
    rank: "National Merit Gold Medal",
    rankBadgeColor: "green",
    title: "All-India Rashtrabhasha Hindi Nibandh (Essay) Pratiyogita",
    organizer: "Rashtrabhasha Prachar Samiti, Wardha",
    recipients: "Miss Ananya Mishra",
    standard: "Class X SSC",
    description:
      "Awarded top honors for an insightful Hindi analytical essay on 'Viksit Bharat Me Yuva Varg Ki Bhumika' (Role of Youth in Developed India).",
    iconType: "award",
  },
];

// Institutional Hall of Fame Accolades
interface InstitutionalHonor {
  id: string;
  badge: string;
  title: string;
  awardedBy: string;
  citation: string;
  icon: "trophy" | "medal" | "award" | "star";
}

const INSTITUTIONAL_HONORS: InstitutionalHonor[] = [
  {
    id: "inst-1",
    badge: "Maharashtra Shikshan Ratna",
    title: "Excellence in Holistic K–12 Education & Character Building",
    awardedBy: "Maharashtra Council of Educational Excellence & Trust Federation",
    citation:
      "Recognized as a premier English Medium school in Thane (West) for balanced moral values, cutting-edge science laboratories, and 99.9% board distinctions.",
    icon: "trophy",
  },
  {
    id: "inst-2",
    badge: "District Sports Championship",
    title: "Best March-Past & Cadet Troop Contingent Award",
    awardedBy: "Thane District Sports Authority & Police Commissionerate",
    citation:
      "Awarded 1st place across 32 regional high school squads for parade precision, cadet synchronization, and athletic discipline during Republic Day honors.",
    icon: "medal",
  },
  {
    id: "inst-3",
    badge: "State Board Merit Roll",
    title: "Exemplary SSC & HSC Board Examination Center Citation",
    awardedBy: "Maharashtra State Board of Secondary & Higher Secondary Education (MSBSHSE)",
    citation:
      "Commended by the Mumbai Divisional Board for zero-defect testing integrity, top-tier examination logistics, and exceptional cumulative passing track record.",
    icon: "award",
  },
  {
    id: "inst-4",
    badge: "National Green Campus Merit",
    title: "Clean Energy, Water Harvesting & Eco-Campus Award",
    awardedBy: "Department of Environment & Climate Change, Govt. of Maharashtra",
    citation:
      "Honored for 100% solar-assisted campus energy, 20,000L rooftop rainwater harvesting recharge wells, and student-managed organic bio-composting.",
    icon: "star",
  },
];

// Signature Campus Festivals & Traditions
interface SignatureEvent {
  id: string;
  title: string;
  marathiTitle?: string;
  timeline: string;
  tagline: string;
  category: "Cultural Extravaganza" | "Heritage & Patriotism" | "Athletic Championship" | "STEM & Innovation";
  image: string;
  highlights: string[];
  description: string;
}

const SIGNATURE_EVENTS: SignatureEvent[] = [
  {
    id: "utsav",
    title: "Annual Gathering & Cultural Fest — 'Utsav'",
    marathiTitle: "वार्षिक स्नेहसंमेलन 'उत्सव'",
    timeline: "January (2 Full Days)",
    tagline: "The crown jewel of Gurukul's performing arts calendar with 650+ student performers.",
    category: "Cultural Extravaganza",
    image: "/images/events/festival-hero.jpg",
    highlights: [
      "Over 650 students performing classical, semi-classical, folk & contemporary dances",
      "Grand Prize Distribution felicitating SSC/HSC board toppers and co-curricular champions",
      "Auditorium gathering of 1,200+ proud parents, alumni, and distinguished guests",
      "Theatrical one-act plays addressing social values and environmental consciousness",
    ],
    description:
      "Held across two vibrant evenings in a prestigious modern auditorium, 'Utsav' brings together students from Jr. KG all the way to Class XII. Every child is encouraged to discover their stage presence through classical choral music, choreographed folk traditions, instrumental fusion, and thought-provoking drama.",
  },
  {
    id: "shiv-jayanti",
    title: "Chhatrapati Shivaji Maharaj Jayanti",
    marathiTitle: "छत्रपती शिवाजी महाराज जयंती",
    timeline: "19th February",
    tagline: "Paying heartfelt homage to the legendary Maratha visionary and champion of Swarajya.",
    category: "Heritage & Patriotism",
    image: "/images/events/event-shiv-jayanti.jpg",
    highlights: [
      "Traditional Dhol-Tasha musical troupe formed entirely by Gurukul students and alumni",
      "Procession of historical pride with traditional saffron phetas and ceremonial banners",
      "Inspiring Powada (heroic ballad) recitals and oration competitions on ethical leadership",
      "Living history exhibits on Shivaji Maharaj's naval forts and progressive governance",
    ],
    description:
      "Shiv Jayanti is celebrated with deep cultural reverence and unbounded energy at Gurukul. Students don traditional Maharashtrian attire, learn about Chhatrapati Shivaji Maharaj's administrative genius, military discipline, and respect for all communities, reinforcing values of righteousness and courage.",
  },
  {
    id: "kridotsav",
    title: "Annual Sports Meet & Athletic Championship — 'Kridotsav'",
    marathiTitle: "क्रीडामहोत्सव",
    timeline: "December (3 Days)",
    tagline: "High-octane track, field, and team sports fostering athletic grit and sportsmanship.",
    category: "Athletic Championship",
    image: "/images/events/event-sports-day.jpg",
    highlights: [
      "Track & Field: 100m, 200m, 400m sprints, 4x100m relay, long jump & shot put",
      "Traditional Indian Team Sports: Intense inter-house Kho-Kho and Kabaddi tournaments",
      "Grand March-Past parade judged by retired defense personnel and sports officers",
      "Annual Best House Rolling Trophy & Individual Championship Shields",
    ],
    description:
      "Spanning three days of spirited competition, 'Kridotsav' turns our sports grounds into an electrifying arena. Students compete under their respective house banners—Shivaji, Ashoka, Raman, and Tagore—learning team trust, physical resilience, and how to win with grace and lose with dignity.",
  },
  {
    id: "science-exhibition",
    title: "Dr. A.P.J. Abdul Kalam STEM & Science Exhibition",
    marathiTitle: "विज्ञान व तंत्रज्ञान प्रदर्शन",
    timeline: "28th February (National Science Day)",
    tagline: "Unleashing scientific curiosity with 85+ interactive working experiments and prototypes.",
    category: "STEM & Innovation",
    image: "/images/events/event-science-fair.jpg",
    highlights: [
      "85+ live student-built working models spanning physics, robotics, chemistry & green energy",
      "Junior College Science wing demonstrations of advanced optics, genetics, and automated systems",
      "Interactive presentations evaluated by guest professors and research scientists",
      "Young Inventors' Award with cash scholarships and mentorship opportunities",
    ],
    description:
      "Honoring India's beloved 'Missile Man' Dr. A.P.J. Abdul Kalam, this exhibition bridges theoretical textbook concepts with hands-on invention. Students explain working hydro-generators, clean energy setups, smart city layouts, and automated robotics to visiting parents, teachers, and junior peers.",
  },
];

// Institutional House System
const HOUSES_DATA = [
  {
    name: "Shivaji House",
    color: "#9E1B32",
    accent: "bg-[#9E1B32] text-white",
    border: "border-[#9E1B32]/40",
    bgSoft: "bg-[#9E1B32]/5",
    motto: "Valor, Grit & Courage",
    mascot: "Royal Bengal Tiger",
    annualPoints: "1,420 Pts",
    leadership: "House Master: Prof. S. Kadam",
    description: "Named after Chhatrapati Shivaji Maharaj, inspiring students toward fearless leadership, strategic discipline, and ethical action in sports and debates.",
  },
  {
    name: "Ashoka House",
    color: "#DDA743",
    accent: "bg-[#DDA743] text-slate-900",
    border: "border-[#DDA743]/50",
    bgSoft: "bg-[#DDA743]/10",
    motto: "Integrity, Peace & Wisdom",
    mascot: "Majestic Golden Lion",
    annualPoints: "1,385 Pts",
    leadership: "House Master: Mrs. N. Sharma",
    description: "Inspired by Emperor Ashoka, upholding moral integrity, compassionate service, social empathy, and steadfast scholarship across all standards.",
  },
  {
    name: "Raman House",
    color: "#1E3A8A",
    accent: "bg-[#1E3A8A] text-white",
    border: "border-[#1E3A8A]/40",
    bgSoft: "bg-[#1E3A8A]/5",
    motto: "Inquiry, Logic & Discovery",
    mascot: "Visionary Falcon",
    annualPoints: "1,410 Pts",
    leadership: "House Master: Dr. P. Joshi",
    description: "Dedicated to Nobel Laureate Sir C.V. Raman, cultivating scientific temper, computational thinking, analytical problem solving, and technological innovation.",
  },
  {
    name: "Tagore House",
    color: "#065F46",
    accent: "bg-[#065F46] text-white",
    border: "border-[#065F46]/40",
    bgSoft: "bg-[#065F46]/5",
    motto: "Culture, Harmony & Eloquence",
    mascot: "Graceful Sovereign Swan",
    annualPoints: "1,390 Pts",
    leadership: "House Master: Mrs. M. Patil",
    description: "Commemorating Rabindranath Tagore, celebrating artistic brilliance, literary elegance, classical poetry, theatre, and harmonious global outlook.",
  },
];

// Photo Gallery Items with Lightbox
interface EventGalleryItem {
  id: string;
  title: string;
  category: "Cultural & Utsav" | "Sports & Athletics" | "Science Exhibition" | "Traditions & Heritage";
  date: string;
  image: string;
  caption: string;
}

const EVENT_GALLERY: EventGalleryItem[] = [
  {
    id: "gal-1",
    title: "Annual Gathering Stage Finale",
    category: "Cultural & Utsav",
    date: "January 2026",
    image: "/images/events/festival-hero.jpg",
    caption: "Senior dance troupe receiving a standing ovation from faculty and parents during the Utsav grand finale.",
  },
  {
    id: "gal-2",
    title: "Shiv Jayanti Dhol-Tasha Rally",
    category: "Traditions & Heritage",
    date: "February 2026",
    image: "/images/events/event-shiv-jayanti.jpg",
    caption: "Students in traditional Maharashtrian attire leading the Shivaji Maharaj Jayanti cultural procession.",
  },
  {
    id: "gal-3",
    title: "100m Sprint Track Finals",
    category: "Sports & Athletics",
    date: "December 2025",
    image: "/images/events/event-sports-day.jpg",
    caption: "Student athletes crossing the finish line amidst spirited cheers from House squads at Kridotsav.",
  },
  {
    id: "gal-4",
    title: "STEM Project Live Demonstration",
    category: "Science Exhibition",
    date: "February 2026",
    image: "/images/events/event-science-fair.jpg",
    caption: "Junior college science team demonstrating an IoT automated solar pump prototype to visiting judges.",
  },
  {
    id: "gal-5",
    title: "Campus Flag Hoisting Ceremony",
    category: "Traditions & Heritage",
    date: "January 2026",
    image: "/images/campus/campus-hero.jpg",
    caption: "Solemn Republic Day parade and tricolor salutation on the main institution quadrangle.",
  },
  {
    id: "gal-6",
    title: "Computer Science Code Fair",
    category: "Science Exhibition",
    date: "November 2025",
    image: "/images/campus/campus-computer-lab.jpg",
    caption: "Bifocal Computer Science students presenting interactive software applications and web designs.",
  },
];

// Academic Year Calendar Table
const CALENDAR_EVENTS = [
  { month: "June", event: "Pravshotsav (School Reopening & Welcoming Ceremony)", category: "Institutional", standards: "Jr. KG to Std XII" },
  { month: "July", event: "Guru Purnima & Investiture Ceremony (Student Council Badging)", category: "Tradition & Leadership", standards: "Std V to XII" },
  { month: "August", event: "Independence Day & Dahi Handi Govinda Celebration", category: "National & Cultural", standards: "All Standards" },
  { month: "September", event: "Teachers' Day Felicitation & Hindi Diwas Elocution", category: "Academic & Respect", standards: "All Standards" },
  { month: "October", event: "Diwali Festivities & Rangoli / Diya Decoration Competition", category: "Cultural Arts", standards: "Jr. KG to Std XII" },
  { month: "November", event: "Children's Day Carnival & Inter-School Drawing Exam", category: "Co-Curricular", standards: "Primary & Secondary" },
  { month: "December", event: "Kridotsav — 3-Day Annual Sports Championship", category: "Athletics", standards: "All Standards" },
  { month: "January", event: "Utsav — Annual Cultural Gathering & Republic Day Parade", category: "Signature Fest", standards: "All Standards" },
  { month: "February", event: "Chhatrapati Shivaji Maharaj Jayanti & National Science Day", category: "Heritage & STEM", standards: "All Standards" },
  { month: "March", event: "HSC & SSC Board Examination Farewell (Ashirwad Samarambha)", category: "Academic Milestone", standards: "Classes X & XII" },
];

export default function FestivalsPage() {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [isNoticeDrawerOpen, setIsNoticeDrawerOpen] = useState(false);
  const [isEnquiryModalOpen, setIsEnquiryModalOpen] = useState(false);
  const [enquiryClassLevel, setEnquiryClassLevel] = useState<AdmissionClassLevel>("XI");
  const [isFeeModalOpen, setIsFeeModalOpen] = useState(false);

  // Filter states
  const [selectedAchievementCategory, setSelectedAchievementCategory] = useState<string>("All");
  const [selectedGalleryTab, setSelectedGalleryTab] = useState<string>("All");

  // Lightbox state
  const [activeLightboxImage, setActiveLightboxImage] = useState<EventGalleryItem | null>(null);

  // Close lightbox on ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveLightboxImage(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleOpenEnquiry = (classLevel: AdmissionClassLevel = "XI") => {
    setEnquiryClassLevel(classLevel);
    setIsEnquiryModalOpen(true);
  };

  const filteredAchievements =
    selectedAchievementCategory === "All"
      ? ACHIEVEMENTS_DATA
      : ACHIEVEMENTS_DATA.filter((ach) => ach.category === selectedAchievementCategory);

  const filteredGallery =
    selectedGalleryTab === "All"
      ? EVENT_GALLERY
      : EVENT_GALLERY.filter((item) => item.category === selectedGalleryTab);

  return (
    <div className="min-h-screen flex flex-col bg-[#FCFAF7] text-slate-900 selection:bg-[#9E1B32] selection:text-white">
      {/* 1. Global Utility Bar */}
      <UtilityBar />

      {/* 2. Global Header */}
      <Header
        onOpenMobileNav={() => setIsMobileNavOpen(true)}
        onOpenEnquiry={(lvl) => handleOpenEnquiry(lvl)}
        onOpenFeeModal={() => setIsFeeModalOpen(true)}
      />

      <main className="flex-1 pb-16 lg:pb-0">
        {/* 3. HERO BANNER: High-Impact Cultural Gathering Visual */}
        <section className="relative min-h-[520px] sm:min-h-[600px] flex items-center justify-center overflow-hidden bg-[#1A080C] text-white">
          {/* Hero Photographic Background */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/events/festival-hero.jpg"
              alt="Gurukul Annual Cultural Gathering Utsav Stage"
              fill
              priority
              className="object-cover object-center scale-105 transition-transform duration-1000 ease-out"
            />
            {/* Neutral Scrim Overlay - Clean contrast, no artificial red haze */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#1A080C] via-[#1A080C]/75 to-[#1A080C]/40" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(26,8,12,0.6)_100%)]" />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 text-center">
            {/* Breadcrumb Path */}
            <nav className="inline-flex items-center gap-2 text-xs sm:text-sm text-stone-300 font-medium mb-4 sm:mb-6 bg-black/40 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/10">
              <Link href="/" className="hover:text-[#DDA743] transition-colors">
                Home
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
              <Link href="/campus" className="hover:text-[#DDA743] transition-colors">
                Campus Life
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
              <span className="text-[#DDA743] font-semibold">Festivals &amp; Laurels</span>
            </nav>

            <MotionReveal direction="down" className="max-w-4xl mx-auto space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#DDA743]/20 border border-[#DDA743]/50 text-[#DFBA73] text-xs font-crest tracking-widest uppercase">
                <Calendar className="w-3.5 h-3.5 text-[#DDA743]" />
                <span>Vibrant Campus Traditions &amp; Championship Laurels</span>
              </div>

              <h1 className="font-editorial text-3xl xs:text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
                Celebrating Culture, Athletic Grit &amp;{" "}
                <span className="text-[#DFBA73]">Student Laurels.</span>
              </h1>

              <p className="text-sm sm:text-base lg:text-lg text-stone-200 leading-relaxed max-w-3xl mx-auto font-normal">
                At Gurukul Vidyapeeth, education extends far beyond textbook memorization. From the grand annual gathering <strong className="text-white">&ldquo;Utsav&rdquo;</strong> and historic <strong className="text-white">Chhatrapati Shivaji Maharaj Jayanti</strong> to inter-collegiate sports championships and STEM exhibitions, explore our dynamic co-curricular life and the medals won by our students.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center gap-3 pt-3">
                <a
                  href="#achievements"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#9E1B32] hover:bg-[#BA203B] text-white text-xs sm:text-sm font-bold shadow-lg transition-all active:scale-95"
                >
                  <Trophy className="w-4 h-4 text-[#DDA743]" />
                  <span>Explore Student Laurels</span>
                </a>
                <a
                  href="#signature-festivals"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-semibold backdrop-blur-md border border-white/20 transition-all active:scale-95"
                >
                  <Flag className="w-4 h-4 text-[#DFBA73]" />
                  <span>Signature Events</span>
                </a>
              </div>
            </MotionReveal>

            {/* 4 Dynamic Metric Counters */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-5xl mx-auto mt-10 sm:mt-14 pt-8 border-t border-white/15">
              <div className="p-3 sm:p-4 rounded-xl bg-black/40 backdrop-blur-md border border-white/10 text-center">
                <span className="font-editorial text-2xl sm:text-3xl lg:text-4xl font-bold text-[#DFBA73] block">
                  <AnimatedCounter target={35} suffix="+" />
                </span>
                <span className="text-[11px] sm:text-xs text-stone-300 font-medium uppercase tracking-wider block mt-1">
                  Annual Cultural &amp; National Events
                </span>
              </div>

              <div className="p-3 sm:p-4 rounded-xl bg-black/40 backdrop-blur-md border border-white/10 text-center">
                <span className="font-editorial text-2xl sm:text-3xl lg:text-4xl font-bold text-[#DFBA73] block">
                  <AnimatedCounter target={120} suffix="+" />
                </span>
                <span className="text-[11px] sm:text-xs text-stone-300 font-medium uppercase tracking-wider block mt-1">
                  District &amp; State Level Laurels
                </span>
              </div>

              <div className="p-3 sm:p-4 rounded-xl bg-black/40 backdrop-blur-md border border-white/10 text-center">
                <span className="font-editorial text-2xl sm:text-3xl lg:text-4xl font-bold text-[#DFBA73] block">
                  <AnimatedCounter target={1400} suffix="+" />
                </span>
                <span className="text-[11px] sm:text-xs text-stone-300 font-medium uppercase tracking-wider block mt-1">
                  Student Participants Annually
                </span>
              </div>

              <div className="p-3 sm:p-4 rounded-xl bg-black/40 backdrop-blur-md border border-white/10 text-center">
                <span className="font-editorial text-2xl sm:text-3xl lg:text-4xl font-bold text-[#DFBA73] block">
                  <AnimatedCounter target={4} suffix=" Houses" />
                </span>
                <span className="text-[11px] sm:text-xs text-stone-300 font-medium uppercase tracking-wider block mt-1">
                  Inter-House Championship League
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* 4. DEDICATED SECTION: INTEGRATED STUDENT LAURELS & ACHIEVEMENTS (USER MANDATE) */}
        <section id="achievements" className="scroll-mt-20 sm:scroll-mt-24 py-14 sm:py-20 bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <MotionReveal direction="down" className="max-w-3xl mx-auto text-center space-y-3 mb-8 sm:mb-12">
              <Badge variant="gold" size="sm">
                Hall of Laurels &amp; Trophies
              </Badge>
              <h2 className="font-editorial text-2xl xs:text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 leading-tight">
                Student Achievements Across <span className="text-[#9E1B32]">Cultural, Sports &amp; STEM</span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-2xl mx-auto">
                Celebrating the dedication, artistic brilliance, athletic championships, and scholastic laurels earned by Gurukul students across Thane district, Mumbai division, and Maharashtra State competitions.
              </p>
            </MotionReveal>

            {/* A. Institutional Honors & Hall of Fame Showcase */}
            <div className="mb-10 sm:mb-14 p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#1A080C] via-[#2D0D15] to-[#1A080C] text-white border border-[#DDA743]/40 shadow-xl">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-6 pb-4 border-b border-white/10">
                <div>
                  <span className="text-xs font-crest text-[#DFBA73] tracking-widest uppercase font-bold block mb-1">
                    Institutional Distinction
                  </span>
                  <h3 className="font-editorial text-xl sm:text-2xl font-bold text-white">
                    Hall of Institutional Accolades &amp; State Citations
                  </h3>
                </div>
                <span className="text-xs text-stone-300 font-medium">
                  Recognized by Govt. of Maharashtra &amp; State Sports Board
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {INSTITUTIONAL_HONORS.map((honor) => (
                  <div
                    key={honor.id}
                    className="p-4 rounded-xl bg-black/40 backdrop-blur-md border border-[#DDA743]/30 hover:border-[#DDA743] transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#DDA743]/20 text-[#DFBA73] border border-[#DDA743]/30">
                          {honor.badge}
                        </span>
                        <Trophy className="w-4 h-4 text-[#DDA743]" />
                      </div>
                      <h4 className="font-editorial text-sm font-bold text-white leading-snug mb-1">
                        {honor.title}
                      </h4>
                      <p className="text-[11px] text-stone-400 mb-2">
                        {honor.awardedBy}
                      </p>
                    </div>
                    <p className="text-[10.5px] text-stone-300 leading-relaxed pt-2 border-t border-white/10">
                      {honor.citation}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* B. Student Laurels Section Header & Filter Tabs */}
            <div className="text-center space-y-3 mb-8">
              <span className="text-xs font-bold text-[#9E1B32] uppercase tracking-wider block">
                Student Wall of Accolades
              </span>
              <h3 className="font-editorial text-xl sm:text-2xl font-bold text-slate-900">
                Individual &amp; Team Championship Honours
              </h3>

              {/* Filter Tabs */}
              <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 pt-2">
                {[
                  { id: "All", label: "All Laurels" },
                  { id: "Cultural & Arts", label: "Cultural & Performing Arts" },
                  { id: "Sports & Athletics", label: "Sports & Athletics" },
                  { id: "STEM & Innovation", label: "STEM & Science" },
                  { id: "Scholastic & Olympiads", label: "Olympiads & Talent Search" },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setSelectedAchievementCategory(tab.id)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                      selectedAchievementCategory === tab.id
                        ? "bg-[#9E1B32] text-white shadow-sm"
                        : "bg-slate-100 hover:bg-slate-200 text-slate-700"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Achievements Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {filteredAchievements.map((item, index) => {
                const getIcon = () => {
                  switch (item.iconType) {
                    case "trophy":
                      return <Trophy className="w-5 h-5 text-[#DDA743]" />;
                    case "medal":
                      return <Medal className="w-5 h-5 text-[#9E1B32]" />;
                    case "star":
                      return <Zap className="w-5 h-5 text-blue-600" />;
                    default:
                      return <Award className="w-5 h-5 text-[#DDA743]" />;
                  }
                };

                return (
                  <MotionReveal
                    key={item.id}
                    direction="up"
                    delay={index * 0.05}
                    hoverLift={true}
                    className="h-full"
                  >
                    <div className="h-full flex flex-col justify-between p-5 rounded-2xl bg-[#FCFAF7] border border-stone-200/90 hover:border-[#DDA743]/80 hover:shadow-lg transition-all duration-300">
                      <div>
                        {/* Top Meta Bar */}
                        <div className="flex items-center justify-between gap-2 mb-3">
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-[#9E1B32]/10 text-[#9E1B32] text-[11px] font-bold">
                            {getIcon()}
                            <span>{item.category}</span>
                          </span>
                          <span className="text-[11px] font-mono font-semibold text-slate-500 bg-white px-2 py-0.5 rounded border border-slate-200">
                            {item.year}
                          </span>
                        </div>

                        {/* Rank Badge */}
                        <div className="inline-block px-2.5 py-1 rounded bg-[#DDA743]/15 text-[#9E1B32] text-xs font-bold font-crest tracking-wide border border-[#DDA743]/40 mb-2.5">
                          {item.rank}
                        </div>

                        {/* Title */}
                        <h3 className="font-editorial text-base sm:text-lg font-bold text-slate-900 leading-snug mb-2">
                          {item.title}
                        </h3>

                        {/* Organizing Body */}
                        <div className="text-[11px] text-slate-500 mb-3 flex items-start gap-1.5">
                          <Compass className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                          <span>{item.organizer}</span>
                        </div>

                        {/* Citation Description */}
                        <p className="text-xs text-slate-600 leading-relaxed mb-4">
                          {item.description}
                        </p>
                      </div>

                      {/* Recipient Footer */}
                      <div className="pt-3 border-t border-stone-200/80 flex items-center justify-between text-[11px]">
                        <div>
                          <span className="text-slate-400 block text-[10px]">Honoree:</span>
                          <strong className="text-slate-800 font-semibold">{item.recipients}</strong>
                        </div>
                        <span className="px-2 py-0.5 rounded bg-white text-slate-600 font-medium border border-slate-200">
                          {item.standard}
                        </span>
                      </div>
                    </div>
                  </MotionReveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* 5. SIGNATURE ANNUAL FESTIVALS & TRADITIONS DEEP-DIVE */}
        <section id="signature-festivals" className="scroll-mt-20 sm:scroll-mt-24 py-14 sm:py-20 bg-[#FCFAF7] border-b border-[#E8DFD7]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <MotionReveal direction="down" className="max-w-3xl mx-auto text-center space-y-3 mb-10 sm:mb-14">
              <Badge variant="maroon" size="sm">
                Institutional Traditions
              </Badge>
              <h2 className="font-editorial text-2xl xs:text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 leading-tight">
                Our Signature <span className="text-[#9E1B32]">Annual Celebrations</span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Four pillar events that unite the entire Gurukul family—students, mentors, and parents—fostering community bond, heritage values, and scholastic excellence.
              </p>
            </MotionReveal>

            {/* Event Showcase Cards */}
            <div className="space-y-8 sm:space-y-12">
              {SIGNATURE_EVENTS.map((event, index) => {
                const isEven = index % 2 === 0;

                return (
                  <div
                    key={event.id}
                    className={`flex flex-col ${
                      isEven ? "lg:flex-row" : "lg:flex-row-reverse"
                    } items-center gap-6 sm:gap-8 lg:gap-12 p-5 sm:p-8 rounded-3xl bg-white border border-stone-200/90 shadow-sm hover:shadow-md transition-shadow`}
                  >
                    {/* Event Photo Preview */}
                    <div className="w-full lg:w-1/2 relative h-64 sm:h-80 md:h-96 rounded-2xl overflow-hidden group">
                      <Image
                        src={event.image}
                        alt={event.title}
                        fill
                        className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                      {/* Top Category Badge */}
                      <div className="absolute top-3 left-3 z-10">
                        <span className="px-3 py-1 rounded-full bg-[#9E1B32] text-white text-xs font-bold shadow-md">
                          {event.category}
                        </span>
                      </div>

                      {/* Bottom Date Badge */}
                      <div className="absolute bottom-3 left-3 right-3 z-10 flex items-center justify-between text-white text-xs">
                        <span className="inline-flex items-center gap-1.5 bg-black/60 backdrop-blur-md px-3 py-1 rounded-md font-medium">
                          <Clock className="w-3.5 h-3.5 text-[#DDA743]" />
                          <span>{event.timeline}</span>
                        </span>
                        {event.marathiTitle && (
                          <span className="font-editorial text-sm text-[#DFBA73] font-bold bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-md">
                            {event.marathiTitle}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Event Detailed Write-Up */}
                    <div className="w-full lg:w-1/2 space-y-4 text-left">
                      <div>
                        <span className="text-xs font-bold text-[#9E1B32] tracking-wider uppercase block mb-1">
                          {event.timeline}
                        </span>
                        <h3 className="font-editorial text-xl xs:text-2xl sm:text-3xl font-bold text-slate-900 leading-tight">
                          {event.title}
                        </h3>
                        <p className="font-editorial italic text-stone-500 text-sm mt-1">
                          &ldquo;{event.tagline}&rdquo;
                        </p>
                      </div>

                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                        {event.description}
                      </p>

                      {/* Key Highlights Bulleted Points */}
                      <div className="space-y-2 pt-2 border-t border-slate-100">
                        <span className="text-[11px] font-crest uppercase tracking-widest text-[#9E1B32] font-bold block">
                          Event Highlights &amp; Inclusions:
                        </span>
                        <ul className="grid grid-cols-1 gap-2">
                          {event.highlights.map((hl, i) => (
                            <li key={i} className="flex items-start gap-2 text-xs text-slate-700">
                              <CheckCircle2 className="w-4 h-4 text-[#DDA743] shrink-0 mt-0.5" />
                              <span>{hl}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* 6. THE 4-HOUSE INSTITUTIONAL CHAMPIONSHIP SYSTEM */}
        <section className="py-14 sm:py-20 bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <MotionReveal direction="down" className="max-w-3xl mx-auto text-center space-y-3 mb-10 sm:mb-14">
              <Badge variant="gold" size="sm">
                House League System
              </Badge>
              <h2 className="font-editorial text-2xl xs:text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 leading-tight">
                The 4 Institutional Houses of <span className="text-[#9E1B32]">Gurukul Vidyapeeth</span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                From Jr. KG through Class XII, every student is assigned to one of four historic houses. Throughout the year, students earn points in sports, academics, debates, and conduct toward the coveted Annual House Shield.
              </p>
            </MotionReveal>

            {/* 4 Houses Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {HOUSES_DATA.map((house, idx) => (
                <MotionReveal
                  key={house.name}
                  direction="up"
                  delay={idx * 0.1}
                  hoverLift={true}
                  className="h-full"
                >
                  <div className={`h-full flex flex-col justify-between p-5 rounded-2xl ${house.bgSoft} border ${house.border} transition-all`}>
                    <div>
                      {/* House Header */}
                      <div className="flex items-center justify-between mb-3">
                        <span className={`px-2.5 py-1 rounded-md text-xs font-bold ${house.accent}`}>
                          {house.name}
                        </span>
                        <span className="text-xs font-mono font-bold text-slate-700 bg-white px-2 py-0.5 rounded border border-slate-200">
                          {house.annualPoints}
                        </span>
                      </div>

                      {/* Motto */}
                      <h4 className="font-editorial text-lg font-bold text-slate-900 mb-1">
                        {house.motto}
                      </h4>
                      <span className="text-[11px] text-slate-500 block mb-3">
                        Mascot: <strong className="text-slate-700">{house.mascot}</strong>
                      </span>

                      {/* Description */}
                      <p className="text-xs text-slate-600 leading-relaxed mb-4">
                        {house.description}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-slate-200/70 text-[11px] text-slate-500">
                      {house.leadership}
                    </div>
                  </div>
                </MotionReveal>
              ))}
            </div>
          </div>
        </section>

        {/* 7. EVENT PHOTO GALLERY & FULLSCREEN LIGHTBOX */}
        <section className="py-14 sm:py-20 bg-[#FCFAF7] border-b border-[#E8DFD7]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <MotionReveal direction="down" className="max-w-3xl mx-auto text-center space-y-3 mb-8 sm:mb-12">
              <Badge variant="maroon" size="sm">
                Visual Chronicle
              </Badge>
              <h2 className="font-editorial text-2xl xs:text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 leading-tight">
                Event Photo Moments &amp; <span className="text-[#9E1B32]">Celebration Gallery</span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Click any photograph below to explore in full-resolution view. Authentic captures from our recent annual gatherings, sports days, and science fairs.
              </p>

              {/* Gallery Filter Tabs */}
              <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 pt-3">
                {[
                  { id: "All", label: "All Photos" },
                  { id: "Cultural & Utsav", label: "Cultural & Utsav" },
                  { id: "Sports & Athletics", label: "Sports & Kridotsav" },
                  { id: "Science Exhibition", label: "Science & STEM" },
                  { id: "Traditions & Heritage", label: "Traditions & Heritage" },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setSelectedGalleryTab(tab.id)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                      selectedGalleryTab === tab.id
                        ? "bg-[#9E1B32] text-white shadow-sm"
                        : "bg-white hover:bg-slate-100 text-slate-700 border border-slate-200"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </MotionReveal>

            {/* Gallery Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
              {filteredGallery.map((item) => (
                <div
                  key={item.id}
                  onClick={() => setActiveLightboxImage(item)}
                  className="group relative h-64 sm:h-72 rounded-2xl overflow-hidden bg-slate-900 cursor-pointer shadow-sm hover:shadow-xl transition-all"
                >
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />

                  {/* Top Category Badge */}
                  <div className="absolute top-3 left-3 z-10">
                    <span className="px-2.5 py-0.5 rounded-md bg-white/90 text-[#9E1B32] text-[10.5px] font-bold shadow-xs">
                      {item.category}
                    </span>
                  </div>

                  {/* Expand Icon */}
                  <div className="absolute top-3 right-3 z-10 w-7 h-7 rounded-full bg-black/50 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Maximize2 className="w-3.5 h-3.5" />
                  </div>

                  {/* Bottom Text Content */}
                  <div className="absolute bottom-3 left-3 right-3 z-10 text-white">
                    <span className="text-[10px] text-[#DFBA73] font-mono block">
                      {item.date}
                    </span>
                    <h4 className="font-editorial text-base font-bold text-white leading-tight mb-1">
                      {item.title}
                    </h4>
                    <p className="text-[11px] text-stone-300 line-clamp-2">
                      {item.caption}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 8. ANNUAL ACADEMIC & CULTURAL CALENDAR 2026-2027 */}
        <section className="py-14 sm:py-20 bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <MotionReveal direction="down" className="max-w-3xl mx-auto text-center space-y-3 mb-10 sm:mb-12">
              <Badge variant="gold" size="sm">
                Annual Almanac
              </Badge>
              <h2 className="font-editorial text-2xl xs:text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 leading-tight">
                Academic &amp; Co-Curricular Calendar <span className="text-[#9E1B32]">2026–2027</span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Planned year-round observances, competitive leagues, and academic milestones from June to March.
              </p>
            </MotionReveal>

            {/* Table Container */}
            <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-xs bg-[#FCFAF7]">
              <table className="w-full text-left text-xs sm:text-sm border-collapse">
                <thead>
                  <tr className="bg-[#1A080C] text-[#DFBA73] font-crest uppercase tracking-wider text-[11px] border-b border-[#4E0B19]">
                    <th className="py-3.5 px-4 sm:px-6">Month</th>
                    <th className="py-3.5 px-4 sm:px-6">Key Event / Observance</th>
                    <th className="py-3.5 px-4 sm:px-6">Category</th>
                    <th className="py-3.5 px-4 sm:px-6">Participating Standards</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 text-slate-700">
                  {CALENDAR_EVENTS.map((item, i) => (
                    <tr
                      key={item.month}
                      className={i % 2 === 0 ? "bg-white" : "bg-stone-50/50 hover:bg-stone-100/50 transition-colors"}
                    >
                      <td className="py-3 px-4 sm:px-6 font-bold text-[#9E1B32] whitespace-nowrap">
                        {item.month}
                      </td>
                      <td className="py-3 px-4 sm:px-6 font-semibold text-slate-900">
                        {item.event}
                      </td>
                      <td className="py-3 px-4 sm:px-6">
                        <span className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-[#9E1B32]/10 text-[#9E1B32]">
                          {item.category}
                        </span>
                      </td>
                      <td className="py-3 px-4 sm:px-6 font-mono text-xs text-slate-600">
                        {item.standards}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* 9. CALL TO ACTION: ADMISSIONS & CO-CURRICULAR ENQUIRY */}
        <section className="py-14 sm:py-20 bg-gradient-to-br from-[#9E1B32] via-[#7A1224] to-[#4E0B19] text-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
            <Badge variant="gold" size="sm" className="bg-[#DDA743]/20 text-[#DFBA73] border-[#DDA743]/50">
              Join the Gurukul Family
            </Badge>

            <h2 className="font-editorial text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
              Give Your Child the Perfect Balance of Scholastic Rigour &amp; Vibrant Cultural Life.
            </h2>

            <p className="text-xs sm:text-base text-stone-200 leading-relaxed max-w-2xl mx-auto">
              Admissions are open for academic year 2026–2027 from Jr. KG to Std X (Maharashtra SSC Board) and Class XI &amp; XII Junior College (HSC Science, Commerce &amp; Arts).
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3.5 pt-2">
              <button
                type="button"
                onClick={() => handleOpenEnquiry("School")}
                className="px-6 py-3 rounded-xl bg-white text-[#9E1B32] hover:bg-stone-100 font-bold text-xs sm:text-sm shadow-xl transition-all active:scale-95 cursor-pointer"
              >
                Apply for School (Jr. KG – 10th)
              </button>

              <button
                type="button"
                onClick={() => handleOpenEnquiry("XI")}
                className="px-6 py-3 rounded-xl bg-[#DDA743] text-slate-950 hover:bg-[#C99432] font-bold text-xs sm:text-sm shadow-xl transition-all active:scale-95 cursor-pointer"
              >
                Apply for Junior College (XI FYJC)
              </button>

              <Link
                href="/campus"
                className="px-6 py-3 rounded-xl bg-black/30 hover:bg-black/50 text-white font-semibold text-xs sm:text-sm border border-white/20 transition-all active:scale-95"
              >
                Explore Campus &amp; Labs
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* 10. Global Footer */}
      <Footer />

      {/* 11. Mobile Off-Canvas Drawer */}
      <MobileNav
        isOpen={isMobileNavOpen}
        onClose={() => setIsMobileNavOpen(false)}
        onOpenEnquiry={(lvl) => handleOpenEnquiry(lvl)}
      />

      {/* 12. Mobile Dock */}
      <MobileDock
        onOpenEnquiry={(lvl) => handleOpenEnquiry(lvl)}
        onOpenFeeModal={() => setIsFeeModalOpen(true)}
        onOpenNoticeDrawer={() => setIsNoticeDrawerOpen(true)}
      />

      {/* 13. Floating Notice Drawer */}
      <NoticeDrawer
        isOpen={isNoticeDrawerOpen}
        onClose={() => setIsNoticeDrawerOpen(false)}
        onOpen={() => setIsNoticeDrawerOpen(true)}
        onOpenEnquiry={(lvl) => handleOpenEnquiry(lvl)}
      />

      {/* 14. Admission Enquiry Modal */}
      <EnquiryModal
        isOpen={isEnquiryModalOpen}
        onClose={() => setIsEnquiryModalOpen(false)}
        defaultClassLevel={enquiryClassLevel}
      />

      {/* 15. Standard-Specific Fee Modal */}
      <FeeStructureModal
        isOpen={isFeeModalOpen}
        onClose={() => setIsFeeModalOpen(false)}
      />

      {/* 16. WhatsApp Floating Button */}
      <WhatsAppButton />

      {/* 17. FULLSCREEN LIGHTBOX MODAL */}
      {activeLightboxImage && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
          onClick={() => setActiveLightboxImage(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="relative max-w-4xl w-full bg-[#1A080C] rounded-2xl overflow-hidden border border-[#DDA743]/40 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setActiveLightboxImage(null)}
              className="absolute top-3 right-3 z-20 p-2 rounded-full bg-black/60 text-white hover:bg-black/80 transition-colors"
              aria-label="Close image modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Large Image */}
            <div className="relative w-full h-72 sm:h-96 md:h-[450px]">
              <Image
                src={activeLightboxImage.image}
                alt={activeLightboxImage.title}
                fill
                className="object-contain bg-black"
                priority
              />
            </div>

            {/* Caption & Metadata */}
            <div className="p-4 sm:p-5 bg-[#1A080C] text-white border-t border-[#4E0B19] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div>
                <span className="text-[11px] font-mono text-[#DFBA73] uppercase block">
                  {activeLightboxImage.category} • {activeLightboxImage.date}
                </span>
                <h3 className="font-editorial text-lg sm:text-xl font-bold text-white">
                  {activeLightboxImage.title}
                </h3>
                <p className="text-xs text-stone-300 mt-1 max-w-2xl">
                  {activeLightboxImage.caption}
                </p>
              </div>

              <span className="text-[10px] text-stone-400 font-mono shrink-0">
                Press ESC to close
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
