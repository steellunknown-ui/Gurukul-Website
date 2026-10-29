"use client";

import React from "react";
import Link from "next/link";
import {
  Inbox,
  Briefcase,
  Bell,
  Users,
  IndianRupee,
  Building2,
  Image as ImageIcon,
  Award,
  BookOpen,
  ArrowRight,
  Database,
  CheckCircle2,
  AlertTriangle,
  Upload,
  Calendar,
  Sparkles,
} from "lucide-react";
import { COLLEGE_CONFIG } from "@/config/college-config";

export default function AdminDashboardPage() {
  const isSupabaseConfigured = Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    !process.env.NEXT_PUBLIC_SUPABASE_URL.includes("your-project")
  );

  return (
    <div className="space-y-8">
      {/* 1. Welcome & Institutional Seal Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#2B0A13] via-[#1E080F] to-[#120408] border border-[#DFBA73]/30 p-6 sm:p-8 shadow-xl">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#4E0B19] border border-[#DFBA73]/30 text-[#FFE29A] text-xs font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Certified Administrator Session</span>
            </div>
            <h1 className="font-editorial text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight">
              Gurukul Central Administrative Hub
            </h1>
            <p className="text-xs sm:text-sm text-stone-300 max-w-2xl leading-relaxed">
              Autonomous content control center for Bhagwat Prasad Gurukul Educational Trust&apos;s English High School &amp; Jr. College. Manage institutional fees, notices, parent leads, and replace AI photos with authentic campus media.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
            <Link
              href="/admin/fees"
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#9E1B32] to-[#7D0E22] hover:from-[#B01B36] hover:to-[#8E1028] text-white text-xs font-bold border border-[#DFBA73]/40 shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <IndianRupee className="w-4 h-4 text-[#FFE29A]" />
              <span>Manage Fee Matrix</span>
            </Link>
            <Link
              href="/admin/enquiries"
              className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-bold border border-white/20 flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <Inbox className="w-4 h-4 text-[#DFBA73]" />
              <span>Parent Leads</span>
            </Link>
          </div>
        </div>
      </div>

      {/* 2. Key Administrative Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {/* Card 1: Enquiries */}
        <Link
          href="/admin/enquiries"
          className="group p-5 rounded-2xl bg-[#16060B] border border-[#4E0B19] hover:border-[#DFBA73]/60 shadow-lg transition-all hover:-translate-y-1"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-xl bg-[#2D0A14] border border-[#DFBA73]/30 flex items-center justify-center text-[#DFBA73]">
              <Inbox className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-500/30">
              Active Inbound
            </span>
          </div>
          <div className="text-2xl font-bold font-mono text-white group-hover:text-[#FFE29A] transition-colors">
            Admissions Desk
          </div>
          <div className="text-xs text-stone-400 mt-1">Parent application inquiries &amp; export</div>
        </Link>

        {/* Card 2: Fee Matrix */}
        <Link
          href="/admin/fees"
          className="group p-5 rounded-2xl bg-[#16060B] border border-[#4E0B19] hover:border-[#DFBA73]/60 shadow-lg transition-all hover:-translate-y-1"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-xl bg-[#2D0A14] border border-[#DFBA73]/30 flex items-center justify-center text-[#DFBA73]">
              <IndianRupee className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-950 text-amber-400 border border-amber-500/30">
              Jr.KG – 12th
            </span>
          </div>
          <div className="text-2xl font-bold font-mono text-white group-hover:text-[#FFE29A] transition-colors">
            Fee Structure
          </div>
          <div className="text-xs text-stone-400 mt-1">Tuition, term &amp; installment schedules</div>
        </Link>

        {/* Card 3: Notices & Circulars */}
        <Link
          href="/admin/notices"
          className="group p-5 rounded-2xl bg-[#16060B] border border-[#4E0B19] hover:border-[#DFBA73]/60 shadow-lg transition-all hover:-translate-y-1"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-xl bg-[#2D0A14] border border-[#DFBA73]/30 flex items-center justify-center text-[#DFBA73]">
              <Bell className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-blue-950 text-blue-400 border border-blue-500/30">
              {COLLEGE_CONFIG.notices.length} Circulars
            </span>
          </div>
          <div className="text-2xl font-bold font-mono text-white group-hover:text-[#FFE29A] transition-colors">
            Notice Board
          </div>
          <div className="text-xs text-stone-400 mt-1">Manage official circulars &amp; PDFs</div>
        </Link>

        {/* Card 4: Teacher Applications */}
        <Link
          href="/admin/careers"
          className="group p-5 rounded-2xl bg-[#16060B] border border-[#4E0B19] hover:border-[#DFBA73]/60 shadow-lg transition-all hover:-translate-y-1"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-xl bg-[#2D0A14] border border-[#DFBA73]/30 flex items-center justify-center text-[#DFBA73]">
              <Briefcase className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-purple-950 text-purple-400 border border-purple-500/30">
              Hiring Cell
            </span>
          </div>
          <div className="text-2xl font-bold font-mono text-white group-hover:text-[#FFE29A] transition-colors">
            Faculty Resumes
          </div>
          <div className="text-xs text-stone-400 mt-1">Submitted teacher resumes &amp; profiles</div>
        </Link>
      </div>

      {/* 3. Section-Wise Website Content Management Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-editorial text-xl sm:text-2xl font-bold text-white tracking-tight">
            Section-by-Section Website Management
          </h2>
          <span className="text-xs text-stone-400 font-mono">10 Modules Configured</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Module 1: Homepage Hero & Highlights */}
          <Link
            href="/admin/homepage"
            className="p-5 rounded-2xl bg-[#16060B] border border-[#4E0B19] hover:border-[#DFBA73] transition-all group flex flex-col justify-between"
          >
            <div className="space-y-2">
              <div className="w-9 h-9 rounded-lg bg-[#2D0A14] text-[#DFBA73] flex items-center justify-center">
                <Building2 className="w-4 h-4" />
              </div>
              <h3 className="font-bold text-sm text-white group-hover:text-[#DFBA73] transition-colors">
                Homepage Hero &amp; Banners
              </h3>
              <p className="text-xs text-stone-400 leading-relaxed">
                Update sliding hero banners, institutional credentials, Founder &amp; Chairman vision statements.
              </p>
            </div>
            <div className="pt-4 flex items-center gap-1 text-xs text-[#DFBA73] font-semibold">
              <span>Open Module</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Module 2: Fees Matrix */}
          <Link
            href="/admin/fees"
            className="p-5 rounded-2xl bg-[#16060B] border border-[#4E0B19] hover:border-[#DFBA73] transition-all group flex flex-col justify-between"
          >
            <div className="space-y-2">
              <div className="w-9 h-9 rounded-lg bg-[#2D0A14] text-[#DFBA73] flex items-center justify-center">
                <IndianRupee className="w-4 h-4" />
              </div>
              <h3 className="font-bold text-sm text-white group-hover:text-[#DFBA73] transition-colors">
                Comprehensive Fee Structure
              </h3>
              <p className="text-xs text-stone-400 leading-relaxed">
                Full standard-by-standard fee schedule editor (Jr. KG to 12th HSC), tuition, labs, installment rules.
              </p>
            </div>
            <div className="pt-4 flex items-center gap-1 text-xs text-[#DFBA73] font-semibold">
              <span>Open Module</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Module 3: Campus & Science Labs */}
          <Link
            href="/admin/campus"
            className="p-5 rounded-2xl bg-[#16060B] border border-[#4E0B19] hover:border-[#DFBA73] transition-all group flex flex-col justify-between"
          >
            <div className="space-y-2">
              <div className="w-9 h-9 rounded-lg bg-[#2D0A14] text-[#DFBA73] flex items-center justify-center">
                <Building2 className="w-4 h-4" />
              </div>
              <h3 className="font-bold text-sm text-white group-hover:text-[#DFBA73] transition-colors">
                Campus &amp; Science Labs Photos
              </h3>
              <p className="text-xs text-stone-400 leading-relaxed">
                Replace AI images with genuine photographs of Physics, Chemistry, Biology, IT labs, and library.
              </p>
            </div>
            <div className="pt-4 flex items-center gap-1 text-xs text-[#DFBA73] font-semibold">
              <span>Open Module</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Module 4: Photo Gallery Archive */}
          <Link
            href="/admin/gallery"
            className="p-5 rounded-2xl bg-[#16060B] border border-[#4E0B19] hover:border-[#DFBA73] transition-all group flex flex-col justify-between"
          >
            <div className="space-y-2">
              <div className="w-9 h-9 rounded-lg bg-[#2D0A14] text-[#DFBA73] flex items-center justify-center">
                <ImageIcon className="w-4 h-4" />
              </div>
              <h3 className="font-bold text-sm text-white group-hover:text-[#DFBA73] transition-colors">
                Photo Gallery Archive
              </h3>
              <p className="text-xs text-stone-400 leading-relaxed">
                Upload albums for Annual Gathering, Sports Day, Science Exhibition, and Independence Day.
              </p>
            </div>
            <div className="pt-4 flex items-center gap-1 text-xs text-[#DFBA73] font-semibold">
              <span>Open Module</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Module 5: Board Toppers Merit */}
          <Link
            href="/admin/toppers"
            className="p-5 rounded-2xl bg-[#16060B] border border-[#4E0B19] hover:border-[#DFBA73] transition-all group flex flex-col justify-between"
          >
            <div className="space-y-2">
              <div className="w-9 h-9 rounded-lg bg-[#2D0A14] text-[#DFBA73] flex items-center justify-center">
                <Award className="w-4 h-4" />
              </div>
              <h3 className="font-bold text-sm text-white group-hover:text-[#DFBA73] transition-colors">
                Board Distinction &amp; Toppers
              </h3>
              <p className="text-xs text-stone-400 leading-relaxed">
                Upload real student passport photos, update percentages, board ranks, and student quotes.
              </p>
            </div>
            <div className="pt-4 flex items-center gap-1 text-xs text-[#DFBA73] font-semibold">
              <span>Open Module</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Module 6: Alumni Network */}
          <Link
            href="/admin/alumni"
            className="p-5 rounded-2xl bg-[#16060B] border border-[#4E0B19] hover:border-[#DFBA73] transition-all group flex flex-col justify-between"
          >
            <div className="space-y-2">
              <div className="w-9 h-9 rounded-lg bg-[#2D0A14] text-[#DFBA73] flex items-center justify-center">
                <Users className="w-4 h-4" />
              </div>
              <h3 className="font-bold text-sm text-white group-hover:text-[#DFBA73] transition-colors">
                Alumni Network &amp; Registry
              </h3>
              <p className="text-xs text-stone-400 leading-relaxed">
                Replace Hall of Fame portraits with real alumni, view registered directory entries and RSVPs.
              </p>
            </div>
            <div className="pt-4 flex items-center gap-1 text-xs text-[#DFBA73] font-semibold">
              <span>Open Module</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        </div>
      </div>

      {/* 4. Supabase Setup Assistant Card */}
      <div className="rounded-2xl bg-[#16060B] border border-[#DFBA73]/30 p-6 space-y-4">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Database className="w-5 h-5 text-[#DFBA73]" />
              <h3 className="font-bold text-base text-white">
                Supabase Database &amp; Cloud Storage Integration
              </h3>
            </div>
            <p className="text-xs text-stone-400 leading-relaxed max-w-2xl">
              Paste your Supabase credentials into <code className="text-[#FFE29A] font-mono bg-[#2A0C14] px-1.5 py-0.5 rounded">.env.local</code> to activate persistent PostgreSQL tables and global CDN photo storage.
            </p>
          </div>
          <div className="px-3 py-1 rounded-full text-[11px] font-mono font-semibold bg-[#2A0C14] border border-[#DFBA73]/40 text-[#DFBA73] shrink-0">
            {isSupabaseConfigured ? "Connected" : "Local Mode Active"}
          </div>
        </div>

        <div className="p-4 rounded-xl bg-[#20070E] border border-[#4E0B19] space-y-2 text-xs font-mono text-stone-300">
          <div className="text-[#DFBA73] font-bold">Configured in `.env.local`:</div>
          <div className="text-stone-400 text-[11px]">
            NEXT_PUBLIC_SUPABASE_URL | NEXT_PUBLIC_SUPABASE_ANON_KEY | SUPABASE_SERVICE_ROLE_KEY
          </div>
          <div className="text-stone-400 text-[11px]">
            Admin Username: <span className="text-white">gurukul_admin</span> • Protected by Server JWT
          </div>
        </div>
      </div>
    </div>
  );
}
