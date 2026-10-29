"use client";

import React from "react";
import Link from "next/link";
import { COLLEGE_CONFIG } from "@/config/college-config";
import { CrestLogo } from "@/components/ui/crest-logo";
import { MapPin, Phone, Mail, Clock, ShieldCheck, ShieldAlert } from "lucide-react";
import { useInstitutionalNav } from "@/lib/use-institutional-nav";

export function Footer() {
  const { handleLinkClick } = useInstitutionalNav();

  return (
    <footer className="bg-[#1A080C] text-[#F4EFEA] border-t border-[#4E0B19] mt-auto">
      {/* Main Footer Directory */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 lg:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Col 1: Identity & Motto (4 cols) */}
          <div className="sm:col-span-2 lg:col-span-4 space-y-3.5">
            <CrestLogo variant="light" />
            <p className="font-editorial italic text-stone-300 text-base leading-relaxed">
              &ldquo;{COLLEGE_CONFIG.motto}&rdquo;
            </p>
            <p className="text-xs text-stone-400 leading-relaxed max-w-sm">
              Gurukul Vidyapeeth English High School &amp; Jr. College is established and managed under <strong className="text-stone-200">BHAGWAT PRASAD GURUKUL EDUCATIONAL TRUST&apos;S</strong>, providing comprehensive education from Jr. KG to Class XII (Maharashtra State Board SSC &amp; HSC) with dedicated faculty mentorship.
            </p>
            <div className="pt-2 space-y-1.5">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#4E0B19] text-[#DFBA73] text-[10.5px] font-mono border border-[#C5A059]/30">
                <ShieldCheck className="w-3.5 h-3.5 text-[#C5A059]" />
                Index No: J-15.14.086 • Ref: 28903-97/DI-15/11/2016
              </span>
              <p className="text-[10px] text-stone-400">
                <strong className="text-stone-300">BHAGWAT PRASAD GURUKUL EDUCATIONAL TRUST&apos;S</strong> • Registered by Govt. of Maharashtra (Est. 2016–17)
              </p>
            </div>
          </div>

          {/* Col 2: Academic Spectrum (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-crest text-xs uppercase tracking-widest text-[#DFBA73] font-semibold border-b border-[#4E0B19] pb-2">
              Academic Spectrum (Jr. KG – 12th)
            </h4>
            <ul className="space-y-2 text-xs text-stone-300">
              <li>
                <Link href="/#sections" onClick={handleLinkClick("sections")} className="hover:text-[#DFBA73] transition-colors block">
                  Pre-Primary (Nursery, Jr. KG, Sr. KG)
                </Link>
              </li>
              <li>
                <Link href="/#sections" onClick={handleLinkClick("sections")} className="hover:text-[#DFBA73] transition-colors block">
                  Primary &amp; Upper Primary (Std 1st – 8th)
                </Link>
              </li>
              <li>
                <Link href="/#sections" onClick={handleLinkClick("sections")} className="hover:text-[#DFBA73] transition-colors block">
                  Secondary SSC Board (Std 9th &amp; 10th)
                </Link>
              </li>
              <li>
                <Link href="/#streams" onClick={handleLinkClick("streams")} className="hover:text-[#DFBA73] transition-colors block">
                  HSC Science — PCM / PCB / Bifocal CS
                </Link>
              </li>
              <li>
                <Link href="/#streams" onClick={handleLinkClick("streams")} className="hover:text-[#DFBA73] transition-colors block">
                  HSC Commerce — Accounts &amp; Maths
                </Link>
              </li>
              <li>
                <Link href="/#streams" onClick={handleLinkClick("streams")} className="hover:text-[#DFBA73] transition-colors block text-[#DFBA73]">
                  HSC Arts — Psychology &amp; Economics
                </Link>
              </li>
              <li>
                <Link href="/curriculum" className="hover:text-[#DFBA73] transition-colors block text-[#DFBA73] font-semibold pt-1 border-t border-[#4E0B19]/50">
                  State Board Curriculum &amp; Syllabus
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Admissions & Institutional (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-crest text-xs uppercase tracking-widest text-[#DFBA73] font-semibold border-b border-[#4E0B19] pb-2">
              Admissions
            </h4>
            <ul className="space-y-2 text-xs text-stone-300">
              <li>
                <Link href="/#admissions" onClick={handleLinkClick("admissions")} className="hover:text-[#DFBA73] transition-colors block">
                  School Admissions
                </Link>
              </li>
              <li>
                <Link href="/#admissions" onClick={handleLinkClick("admissions")} className="hover:text-[#DFBA73] transition-colors block">
                  Class XI (FYJC) Intake
                </Link>
              </li>
              <li>
                <Link href="/#admissions" onClick={handleLinkClick("admissions")} className="hover:text-[#DFBA73] transition-colors block">
                  Admission Procedure &amp; Eligibility
                </Link>
              </li>
              <li>
                <Link href="/#notices" onClick={handleLinkClick("notices")} className="hover:text-[#DFBA73] transition-colors block">
                  Admission Notices
                </Link>
              </li>
              <li>
                <Link href="/#leadership" onClick={handleLinkClick("leadership")} className="hover:text-[#DFBA73] transition-colors block">
                  Founder &amp; Chairman&apos;s Desk
                </Link>
              </li>
              <li>
                <Link href="/campus" className="hover:text-[#DFBA73] transition-colors block">
                  Campus &amp; Science Labs
                </Link>
              </li>
              <li>
                <Link href="/anti-ragging" className="hover:text-[#DFBA73] transition-colors block text-[#DFBA73] font-semibold flex items-center gap-1.5 pt-1 border-t border-[#4E0B19]/50">
                  <ShieldAlert className="w-3.5 h-3.5 text-[#DFBA73]" />
                  <span>Anti-Ragging Cell (24×7)</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Campus Contact (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-crest text-xs uppercase tracking-widest text-[#DFBA73] font-semibold border-b border-[#4E0B19] pb-2">
              Campus Contact Info
            </h4>
            <div className="space-y-2.5 text-xs text-stone-300">
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#C5A059] shrink-0 mt-0.5" />
                <span className="text-stone-300 leading-snug">
                  {COLLEGE_CONFIG.contact.addressLines.join(", ")}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#C5A059] shrink-0" />
                <span className="font-mono text-stone-300">{COLLEGE_CONFIG.contact.admissionPhone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#C5A059] shrink-0" />
                <span className="text-stone-300 truncate">{COLLEGE_CONFIG.contact.admissionEmail}</span>
              </div>
              <div className="flex items-start gap-2">
                <Clock className="w-3.5 h-3.5 text-[#C5A059] shrink-0 mt-0.5" />
                <span className="text-stone-400">{COLLEGE_CONFIG.contact.officeHours}</span>
              </div>
              <div className="pt-1.5 border-t border-[#4E0B19] text-[10.5px] text-[#DFBA73] font-mono">
                Index No. J-15.14.086 • Reg. Ref: 28903-97/DI-15/11/2016
              </div>
            </div>
          </div>
        </div>

        {/* Regulatory & Disclosures Bar */}
        <div className="mt-8 sm:mt-10 pt-5 sm:pt-6 border-t border-[#4E0B19] text-[10.5px] sm:text-[11px] text-stone-400 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-x-4 sm:gap-x-6 gap-y-1.5">
            <span className="text-[#DFBA73] font-semibold">Government Recognition:</span>
            <span>Registered by Government of Maharashtra (Est. 2016–17)</span>
            <span>Higher Secondary / Self Finance</span>
            <span>Maharashtra State Board Index: J-15.14.086</span>
            <Link
              href="/anti-ragging"
              className="text-[#DFBA73] font-semibold underline underline-offset-2 hover:text-white transition-colors flex items-center gap-1"
            >
              <ShieldAlert className="w-3.5 h-3.5 text-[#DFBA73]" />
              <span>Anti-Ragging Cell &amp; Helplines (Act XXXIII/1999)</span>
            </Link>
            <span className="hover:text-stone-200 cursor-pointer">Terms &amp; Privacy</span>
          </div>
          <div className="text-[10px] text-[#DFBA73] font-mono">
            ॥ विद्या धनम् ॥
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="mt-4 pt-4 border-t border-white/5 text-[10.5px] sm:text-[11px] text-stone-400 flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
          <p>© 2026 BHAGWAT PRASAD GURUKUL EDUCATIONAL TRUST&apos;S • GURUKUL VIDYAPEETH. All rights reserved.</p>
          <p className="text-stone-400">
            Affiliated with Maharashtra State Board of Secondary and Higher Secondary Education (SSC &amp; HSC)
          </p>
        </div>
      </div>
    </footer>
  );
}
