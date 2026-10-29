"use client";

import React, { useState, Suspense } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import {
  ShieldCheck,
  Lock,
  User,
  Eye,
  EyeOff,
  ArrowRight,
  AlertCircle,
  KeyRound,
  CheckCircle2,
  Building2,
  Shield,
} from "lucide-react";
import { CrestLogo } from "@/components/ui/crest-logo";
import { motion } from "framer-motion";

function AdminLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const returnUrl = searchParams.get("returnUrl") || "/admin/dashboard";

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!username.trim() || !password) {
      setErrorMessage("Please enter both administrative username and passkey.");
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setErrorMessage(data.error || "Invalid administrative credentials. Access denied.");
        setIsLoading(false);
        return;
      }

      setIsSuccess(true);
      setTimeout(() => {
        router.push(returnUrl);
        router.refresh();
      }, 700);
    } catch (err) {
      console.error("Login attempt failed:", err);
      setErrorMessage("Connection to authentication server failed. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-white text-slate-900 overflow-hidden selection:bg-[#9E1B32] selection:text-white">
      {/* 1. Subtle Elegant White Background Accents */}
      <div
        className="absolute inset-0 bg-[radial-gradient(#9E1B32_0.75px,transparent_0.75px)] [background-size:24px_24px] opacity-[0.035] pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-stone-100/70 to-transparent pointer-events-none"
        aria-hidden="true"
      />

      {/* 2. Broad & Compact Two-Column Login Card */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full max-w-4xl"
      >
        <div className="relative rounded-3xl bg-gradient-to-br from-[#A31630] via-[#8C1327] to-[#6E0B1C] text-white border-2 border-[#DFBA73] shadow-[0_20px_60px_rgba(158,27,50,0.35)] overflow-hidden">
          {/* Inner Golden Top Trim Accent */}
          <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#FFE29A] to-transparent pointer-events-none" />

          <div className="grid grid-cols-1 md:grid-cols-12">
            {/* =========================================================================
                LEFT COLUMN: Institutional Identity & Heritage (Broad & Compact)
                ========================================================================= */}
            <div className="md:col-span-5 p-6 sm:p-7 lg:p-8 bg-gradient-to-b from-black/20 via-black/10 to-transparent border-b md:border-b-0 md:border-r border-[#DFBA73]/30 flex flex-col justify-between space-y-4">
              <div className="space-y-3.5">
                {/* Crest & Trust Title without the box bubble */}
                <div className="space-y-2">
                  <div className="py-0.5">
                    <CrestLogo variant="light" />
                  </div>

                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#4E0B19] border border-[#DFBA73]/50 text-[#FFE29A] text-[10px] font-mono tracking-wider uppercase shadow-xs">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#DFBA73]" />
                    <span>Gated Admin Console</span>
                  </div>
                </div>

                {/* New Administrative Heritage Building Photo */}
                <div className="relative w-full h-28 sm:h-32 rounded-2xl overflow-hidden border border-[#DFBA73]/50 shadow-md group">
                  <Image
                    src="/images/admin/admin-campus-entrance.jpg"
                    alt="Gurukul Vidyapeeth Central Administrative Block"
                    fill
                    sizes="(max-width: 768px) 100vw, 360px"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent pointer-events-none" />
                  <div className="absolute bottom-2 left-2.5 right-2.5 flex items-center justify-between text-[10px] font-mono text-[#FFE29A]">
                    <span className="font-semibold drop-shadow-sm">Administrative Block</span>
                    <span className="px-1.5 py-0.5 rounded bg-black/60 backdrop-blur-xs border border-[#DFBA73]/40 text-[9px] text-white">
                      Central Campus
                    </span>
                  </div>
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] font-serif font-bold text-[#FFE29A] tracking-widest uppercase block">
                    ॥ सा विद्या या विमुक्तये ॥
                  </span>
                  <p className="text-[11.5px] text-stone-200 leading-relaxed">
                    Bhagwat Prasad Gurukul Educational Trust&apos;s administrative gateway. Autonomous content, fees, notices, and media management.
                  </p>
                </div>
              </div>

              {/* Compliance & Security Badges (Compact) */}
              <div className="pt-3 border-t border-white/15 space-y-1 text-[10.5px] font-mono text-stone-200">
                <div className="flex items-center gap-2">
                  <Shield className="w-3.5 h-3.5 text-[#DFBA73] shrink-0" />
                  <span>Index: J-15.14.086 • Est. 2016–17</span>
                </div>
                <div className="text-[10px] text-stone-300">
                  256-Bit Encrypted Session • Trust Governance
                </div>
              </div>
            </div>

            {/* =========================================================================
                RIGHT COLUMN: Authentication Form (Clean, Broad & Shorter Height)
                ========================================================================= */}
            <div className="md:col-span-7 p-6 sm:p-8 lg:p-9 flex flex-col justify-center">
              <div className="mb-5 space-y-1">
                <h1 className="font-editorial text-2xl sm:text-3xl font-bold tracking-tight text-[#FFF8ED]">
                  Institutional Sign In
                </h1>
                <p className="text-xs text-stone-200">
                  Authorized Trustees, Principals &amp; Head Coordinators
                </p>
              </div>

              {/* Error Message Box */}
              {errorMessage && (
                <motion.div
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-4 p-3 rounded-xl bg-[#4A0A15] border border-red-400/50 text-red-100 text-xs flex items-center gap-2.5 shadow-sm"
                >
                  <AlertCircle className="w-4 h-4 text-red-300 shrink-0" />
                  <span className="font-medium text-[11.5px]">{errorMessage}</span>
                </motion.div>
              )}

              {/* Success Message Box */}
              {isSuccess && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mb-4 p-3 rounded-xl bg-emerald-950/90 border border-emerald-400 text-emerald-200 text-xs flex items-center gap-2.5 shadow-sm"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-300 shrink-0" />
                  <span className="font-medium text-[11.5px]">Credentials certified. Launching dashboard...</span>
                </motion.div>
              )}

              {/* Compact Form */}
              <form onSubmit={handleSubmit} className="space-y-3.5">
                {/* Username Input */}
                <div className="space-y-1">
                  <label
                    htmlFor="admin-username"
                    className="block text-[11px] font-semibold text-[#FFE29A] uppercase tracking-wider"
                  >
                    Administrative UID / Username
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-300">
                      <User className="w-4 h-4 text-[#FFE29A]" />
                    </div>
                    <input
                      id="admin-username"
                      type="text"
                      required
                      autoComplete="username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="e.g. gurukul_admin"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#520B17]/90 border border-[#DFBA73]/50 text-white placeholder-stone-300 text-sm focus:outline-none focus:border-[#FFE29A] focus:ring-2 focus:ring-[#FFE29A]/30 transition-all font-mono"
                    />
                  </div>
                </div>

                {/* Password Input */}
                <div className="space-y-1">
                  <label
                    htmlFor="admin-password"
                    className="block text-[11px] font-semibold text-[#FFE29A] uppercase tracking-wider"
                  >
                    Master Security Passkey
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-300">
                      <Lock className="w-4 h-4 text-[#FFE29A]" />
                    </div>
                    <input
                      id="admin-password"
                      type={showPassword ? "text" : "password"}
                      required
                      autoComplete="current-password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter administrative passkey"
                      className="w-full pl-10 pr-11 py-2.5 rounded-xl bg-[#520B17]/90 border border-[#DFBA73]/50 text-white placeholder-stone-300 text-sm focus:outline-none focus:border-[#FFE29A] focus:ring-2 focus:ring-[#FFE29A]/30 transition-all font-mono"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label={showPassword ? "Hide password" : "Show password"}
                      className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-stone-300 hover:text-white transition-colors cursor-pointer"
                    >
                      {showPassword ? (
                        <EyeOff className="w-4 h-4 text-stone-300" />
                      ) : (
                        <Eye className="w-4 h-4 text-stone-300" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Radiant Golden CTA Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isLoading || isSuccess}
                    className="w-full min-h-[44px] inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#FFE29A] via-[#DFBA73] to-[#C99836] hover:brightness-105 active:scale-[0.99] text-[#420B16] font-black text-sm tracking-wide border border-[#FFF0C7] shadow-[0_6px_20px_rgba(223,186,115,0.45)] transition-all cursor-pointer disabled:opacity-50"
                  >
                    {isLoading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-[#420B16]/30 border-t-[#420B16] rounded-full animate-spin" />
                        <span>Verifying Credentials...</span>
                      </>
                    ) : isSuccess ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 text-[#420B16]" />
                        <span>Authorized — Redirecting</span>
                      </>
                    ) : (
                      <>
                        <KeyRound className="w-4 h-4 text-[#420B16]" />
                        <span>Authenticate &amp; Enter Console</span>
                        <ArrowRight className="w-4 h-4 ml-0.5" />
                      </>
                    )}
                  </button>
                </div>
              </form>

              {/* Bottom Security Note */}
              <p className="mt-4 text-[10px] text-stone-300 text-center leading-relaxed">
                Unauthorized access attempts are monitored and logged under Maharashtra Trust Governance Regulations.
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-white flex items-center justify-center text-[#9E1B32] font-mono text-xs">
          Loading Security Console...
        </div>
      }
    >
      <AdminLoginForm />
    </Suspense>
  );
}
