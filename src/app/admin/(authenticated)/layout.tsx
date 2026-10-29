"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Home,
  IndianRupee,
  Bell,
  Building2,
  Image as ImageIcon,
  Calendar,
  Award,
  BookOpen,
  Briefcase,
  Users,
  Inbox,
  LogOut,
  ExternalLink,
  ShieldCheck,
  Menu,
  X,
  ChevronRight,
  Database,
} from "lucide-react";
import { CrestLogo } from "@/components/ui/crest-logo";
import { COLLEGE_CONFIG } from "@/config/college-config";

interface NavItem {
  name: string;
  href: string;
  icon: React.ElementType;
  badge?: string;
}

interface NavSection {
  title: string;
  items: NavItem[];
}

const NAV_SECTIONS: NavSection[] = [
  {
    title: "Executive Overview",
    items: [
      { name: "Console Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
      { name: "Admission Enquiries", href: "/admin/enquiries", icon: Inbox, badge: "Leads" },
    ],
  },
  {
    title: "Institutional Content",
    items: [
      { name: "Homepage Manager", href: "/admin/homepage", icon: Home },
      { name: "Fee Structure (Jr.KG–12th)", href: "/admin/fees", icon: IndianRupee },
      { name: "Notices & Circulars", href: "/admin/notices", icon: Bell },
      { name: "Curriculum & Syllabus", href: "/admin/curriculum", icon: BookOpen },
    ],
  },
  {
    title: "Media & Campus Showcase",
    items: [
      { name: "Campus & Labs", href: "/admin/campus", icon: Building2 },
      { name: "Photo Gallery Archive", href: "/admin/gallery", icon: ImageIcon },
      { name: "Events & Celebrations", href: "/admin/events", icon: Calendar },
      { name: "Board Toppers Merit", href: "/admin/toppers", icon: Award },
      { name: "Alumni Network Registry", href: "/admin/alumni", icon: Users },
      { name: "Faculty Hiring & Resumes", href: "/admin/careers", icon: Briefcase },
    ],
  },
];

export default function AdminAuthenticatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      await fetch("/api/admin/logout", { method: "POST" });
      router.push("/admin/login");
      router.refresh();
    } catch (err) {
      console.error("Logout failed:", err);
      setIsLoggingOut(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-[#0D0406] text-[#F4EFEA] selection:bg-[#9E1B32] selection:text-white">
      {/* =========================================================================
          1. DESKTOP PERMANENT SIDEBAR
          ========================================================================= */}
      <aside className="hidden lg:flex flex-col w-72 shrink-0 border-r border-[#4E0B19]/80 bg-[#16060B] select-none">
        {/* Sidebar Institutional Crest Header */}
        <div className="p-5 border-b border-[#4E0B19]/80 space-y-2 bg-[#1B070E]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#9E1B32] to-[#4E0B19] p-0.5 border border-[#DFBA73]/50 shadow-md flex items-center justify-center shrink-0">
              <span className="font-serif font-black text-sm text-[#FFE29A]">॥ G ॥</span>
            </div>
            <div className="overflow-hidden">
              <h2 className="font-editorial text-sm font-bold text-white tracking-tight truncate">
                GURUKUL VIDYAPEETH
              </h2>
              <p className="text-[10px] text-[#DFBA73] font-mono tracking-wider uppercase">
                CMS Administrative Console
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#2D0A14] border border-[#DFBA73]/20 text-[10px] font-mono text-stone-300">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="truncate">Certified Session: gurukul_admin</span>
          </div>
        </div>

        {/* Sidebar Nav Links Directory */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6 scrollbar-thin scrollbar-thumb-stone-800">
          {NAV_SECTIONS.map((section) => (
            <div key={section.title} className="space-y-1">
              <h3 className="px-3 text-[10px] font-mono uppercase tracking-widest text-stone-400 font-semibold mb-2">
                {section.title}
              </h3>
              <div className="space-y-0.5">
                {section.items.map((item) => {
                  const isActive = pathname === item.href;
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`group flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                        isActive
                          ? "bg-gradient-to-r from-[#9E1B32] to-[#7D0E22] text-white shadow-md border border-[#DFBA73]/40"
                          : "text-stone-300 hover:text-white hover:bg-white/5"
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <Icon
                          className={`w-4 h-4 shrink-0 transition-colors ${
                            isActive ? "text-[#FFE29A]" : "text-stone-400 group-hover:text-[#DFBA73]"
                          }`}
                        />
                        <span className="truncate">{item.name}</span>
                      </div>
                      {item.badge && (
                        <span className="px-1.5 py-0.5 rounded text-[9px] font-mono font-bold bg-[#DFBA73] text-[#1A080C] shrink-0">
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Sidebar Footer: Public Link & Logout */}
        <div className="p-3 border-t border-[#4E0B19]/80 space-y-1 bg-[#120408]">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between px-3 py-2 rounded-xl text-xs text-stone-300 hover:text-white hover:bg-white/5 transition-colors"
          >
            <div className="flex items-center gap-2">
              <ExternalLink className="w-3.5 h-3.5 text-[#DFBA73]" />
              <span>View Live Website</span>
            </div>
            <ChevronRight className="w-3.5 h-3.5 text-stone-500" />
          </a>

          <button
            type="button"
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs text-red-300 hover:text-white hover:bg-red-950/60 border border-transparent hover:border-red-500/30 transition-all cursor-pointer disabled:opacity-50"
          >
            <LogOut className="w-3.5 h-3.5 text-red-400" />
            <span>{isLoggingOut ? "Ending Session..." : "Secure Sign Out"}</span>
          </button>
        </div>
      </aside>

      {/* =========================================================================
          2. MOBILE OFF-CANVAS SIDEBAR DRAWER
          ========================================================================= */}
      {isMobileSidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div
            onClick={() => setIsMobileSidebarOpen(false)}
            className="fixed inset-0 bg-black/80 backdrop-blur-xs"
          />
          <div className="relative flex flex-col w-72 max-w-[80vw] bg-[#16060B] border-r border-[#4E0B19] z-10">
            <div className="p-4 border-b border-[#4E0B19] flex items-center justify-between bg-[#1B070E]">
              <div className="flex items-center gap-2">
                <span className="font-serif font-black text-sm text-[#FFE29A]">॥ G ॥</span>
                <span className="font-editorial text-xs font-bold text-white">CMS Console</span>
              </div>
              <button
                type="button"
                onClick={() => setIsMobileSidebarOpen(false)}
                className="p-1.5 rounded-lg text-stone-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-3 space-y-5">
              {NAV_SECTIONS.map((section) => (
                <div key={section.title} className="space-y-1">
                  <h4 className="px-2 text-[10px] font-mono uppercase tracking-widest text-stone-400 font-semibold mb-1">
                    {section.title}
                  </h4>
                  {section.items.map((item) => {
                    const isActive = pathname === item.href;
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setIsMobileSidebarOpen(false)}
                        className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium ${
                          isActive
                            ? "bg-[#9E1B32] text-white border border-[#DFBA73]/40"
                            : "text-stone-300 hover:text-white hover:bg-white/5"
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <Icon className="w-4 h-4 text-[#DFBA73]" />
                          <span>{item.name}</span>
                        </div>
                        {item.badge && (
                          <span className="px-1.5 py-0.5 rounded text-[9px] font-mono bg-[#DFBA73] text-[#1A080C]">
                            {item.badge}
                          </span>
                        )}
                      </Link>
                    );
                  })}
                </div>
              ))}
            </div>

            <div className="p-3 border-t border-[#4E0B19] bg-[#120408]">
              <button
                type="button"
                onClick={handleLogout}
                className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs text-red-300 hover:bg-red-950/60"
              >
                <LogOut className="w-3.5 h-3.5 text-red-400" />
                <span>Secure Sign Out</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          3. MAIN ADMIN CONTENT WORKSPACE
          ========================================================================= */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Top Sticky Institutional Status Bar */}
        <header className="sticky top-0 z-30 h-16 border-b border-[#4E0B19]/80 bg-[#16060B]/90 backdrop-blur-md px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setIsMobileSidebarOpen(true)}
              aria-label="Open navigation menu"
              className="lg:hidden p-2 rounded-xl text-stone-300 hover:text-white hover:bg-white/5"
            >
              <Menu className="w-5 h-5 text-[#DFBA73]" />
            </button>
            <div>
              <span className="text-[10px] font-mono text-[#DFBA73] uppercase tracking-wider block">
                Bhagwat Prasad Gurukul Educational Trust
              </span>
              <h1 className="font-editorial text-base sm:text-lg font-bold text-white tracking-tight">
                Institutional Management Console
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            {/* Live Database Status Indicator */}
            <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#2A0C14] border border-[#DFBA73]/30 text-xs font-mono text-stone-300">
              <Database className="w-3.5 h-3.5 text-[#DFBA73]" />
              <span className="text-[11px]">Database Active</span>
            </div>

            {/* Quick Public View */}
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-white text-xs font-semibold border border-white/15 transition-all"
            >
              <ExternalLink className="w-3.5 h-3.5 text-[#DFBA73]" />
              <span className="hidden sm:inline">Live Site</span>
            </a>
          </div>
        </header>

        {/* Dynamic Nested Page Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
