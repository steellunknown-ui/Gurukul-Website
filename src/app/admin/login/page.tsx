"use client";

import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  ShieldCheck,
  Lock,
  User,
  Eye,
  EyeOff,
  ArrowRight,
  AlertCircle,
  School,
  KeyRound,
  CheckCircle2,
} from "lucide-react";
import { COLLEGE_CONFIG } from "@/config/college-config";
import { CrestLogo } from "@/components/ui/crest-logo";
import { Suspense } from "react";
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
        setErrorMessage(data.error || "Authentication failed. Access denied.");
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
    <div className="min-h-screen relative flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-[#0D0406] text-[#F4EFEA] overflow-hidden selection:bg-[#9E1B32] selection:text-white">
      {/* 1. Ambient Royal Background Glows */}
      <div
        className="absolute top-1/4 -left-48 w-96 h-96 bg-[#9E1B32]/20 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-1/4 -right-48 w-96 h-96 bg-[#DFBA73]/15 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-[radial-gradient(#DFBA73_1px,transparent_1px)] [background-size:32px_32px] opacity-5 pointer-events-none"
        aria-hidden="true"
      />

      {/* 2. Main Login Card Container */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full max-w-md"
      >
        <div className="relative rounded-3xl bg-gradient-to-b from-[#1E090F] via-[#15060A] to-[#0E0306] border border-[#DFBA73]/30 shadow-[0_20px_60px_rgba(0,0,0,0.85)] p-6 sm:p-9 backdrop-blur-xl">
          {/* Inner Golden Top Trim Accent */}
          <div className="absolute top-0 inset-x-12 h-1 bg-gradient-to-r from-transparent via-[#DFBA73] to-transparent rounded-t-3xl" />

          {/* Header & Crest */}
          <div className="text-center space-y-3 mb-7">
            <div className="flex justify-center mb-1">
              <CrestLogo variant="light" />
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#4E0B19]/80 border border-[#DFBA73]/40 text-[#FFE29A] text-[10.5px] font-mono tracking-wider uppercase">
              <ShieldCheck className="w-3.5 h-3.5 text-[#DFBA73]" />
              <span>Gated Administrative Console</span>
            </div>

            <div>
              <h1 className="font-editorial text-2xl sm:text-3xl font-bold tracking-tight text-[#FFF8ED]">
                Institutional Sign In
              </h1>
              <p className="text-xs text-stone-400 mt-1">
                Authorized Trustees, Principals &amp; Head Coordinators
              </p>
            </div>
          </div>

          {/* Error Message Box */}
          {errorMessage && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-5 p-3.5 rounded-xl bg-red-950/80 border border-red-500/40 text-red-200 text-xs flex items-start gap-2.5"
            >
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
              <div className="flex-1 font-medium leading-relaxed">{errorMessage}</div>
            </motion.div>
          )}

          {/* Success Message Box */}
          {isSuccess && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mb-5 p-3.5 rounded-xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-200 text-xs flex items-center gap-2.5"
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <div className="font-medium">Credentials verified. Initializing secure dashboard...</div>
            </motion.div>
          )}

          {/* Authentication Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Username Input */}
            <div className="space-y-1.5">
              <label
                htmlFor="admin-username"
                className="block text-xs font-semibold text-stone-300 uppercase tracking-wider"
              >
                Administrative UID / Username
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
                  <User className="w-4 h-4 text-[#DFBA73]" />
                </div>
                <input
                  id="admin-username"
                  type="text"
                  required
                  autoComplete="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="e.g. gurukul_admin"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#2A0C14]/70 border border-[#DFBA73]/30 text-white placeholder-stone-500 text-sm focus:outline-none focus:border-[#DFBA73] focus:ring-2 focus:ring-[#DFBA73]/20 transition-all font-mono"
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="space-y-1.5">
              <label
                htmlFor="admin-password"
                className="block text-xs font-semibold text-stone-300 uppercase tracking-wider"
              >
                Master Security Passkey
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
                  <Lock className="w-4 h-4 text-[#DFBA73]" />
                </div>
                <input
                  id="admin-password"
                  type={showPassword ? "text" : "password"}
                  required
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter administrative passkey"
                  className="w-full pl-10 pr-11 py-3 rounded-xl bg-[#2A0C14]/70 border border-[#DFBA73]/30 text-white placeholder-stone-500 text-sm focus:outline-none focus:border-[#DFBA73] focus:ring-2 focus:ring-[#DFBA73]/20 transition-all font-mono"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-stone-400 hover:text-white transition-colors cursor-pointer"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4 text-stone-400" />
                  ) : (
                    <Eye className="w-4 h-4 text-stone-400" />
                  )}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isLoading || isSuccess}
                className="w-full min-h-[46px] inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-[#C41C3B] via-[#9E1B32] to-[#7D0E22] hover:from-[#D42244] hover:to-[#8E1028] text-white font-bold text-sm tracking-wide border border-[#DFBA73]/50 shadow-[0_8px_25px_rgba(196,28,59,0.5)] transition-all cursor-pointer disabled:opacity-50 active:scale-[0.98]"
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Verifying Credentials...</span>
                  </>
                ) : isSuccess ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-[#FFE29A]" />
                    <span>Authorized — Redirecting</span>
                  </>
                ) : (
                  <>
                    <KeyRound className="w-4 h-4 text-[#FFE29A]" />
                    <span>Authenticate &amp; Enter Console</span>
                    <ArrowRight className="w-4 h-4 ml-0.5" />
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Confidential Notice Disclaimer */}
          <div className="mt-7 pt-5 border-t border-[#4E0B19]/80 text-center space-y-2">
            <p className="text-[10px] text-stone-400 leading-relaxed">
              <strong className="text-stone-300">CONFIDENTIAL TRUST CONSOLE:</strong> Unauthorised access attempts are logged with IP &amp; hardware telemetry. Managed by Bhagwat Prasad Gurukul Educational Trust.
            </p>
            <div className="flex items-center justify-center gap-3 text-[10.5px] text-stone-500 font-mono">
              <span>Ref: J-15.14.086</span>
              <span>•</span>
              <span>Est. 2016–17</span>
              <span>•</span>
              <span>SSL 256-Bit</span>
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
        <div className="min-h-screen bg-[#0D0406] flex items-center justify-center text-[#DFBA73] font-mono text-xs">
          Loading Security Console...
        </div>
      }
    >
      <AdminLoginForm />
    </Suspense>
  );
}
