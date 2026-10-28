"use client";

import React from "react";
import { BookOpen, Bell, GraduationCap, Phone } from "lucide-react";
import { COLLEGE_CONFIG } from "@/config/college-config";
import { AdmissionClassLevel } from "@/components/home/enquiry-modal";

interface MobileDockProps {
  onOpenEnquiry: (classLevel?: AdmissionClassLevel) => void;
  onOpenFeeModal?: () => void;
  onOpenNoticeDrawer?: () => void;
}

export function MobileDock({ onOpenEnquiry, onOpenFeeModal, onOpenNoticeDrawer }: MobileDockProps) {
  return (
    <aside
      aria-label="Mobile quick actions"
      className="fixed bottom-0 inset-x-0 z-40 lg:hidden bg-white/95 backdrop-blur-md border-t border-slate-200 shadow-xl px-2 py-1.5"
    >
      <div className="max-w-md mx-auto grid grid-cols-4 gap-1.5">
        {/* 1. Apply School (Jr. KG - 10th) */}
        <button
          onClick={() => onOpenEnquiry("School")}
          className="flex flex-col items-center justify-center py-1.5 px-1 rounded-lg text-slate-800 hover:text-[#9E1B32] hover:bg-slate-100 active:scale-95 transition-all cursor-pointer"
        >
          <BookOpen className="w-4 h-4 text-[#9E1B32] mb-0.5" />
          <span className="text-[10px] font-bold tracking-tight">School</span>
        </button>

        {/* 2. Apply College (XI & XII) */}
        <button
          onClick={() => onOpenEnquiry("XI")}
          className="flex flex-col items-center justify-center py-1.5 px-1 rounded-lg bg-[#9E1B32] text-white shadow-xs hover:bg-[#BA203B] active:scale-95 transition-all cursor-pointer"
        >
          <GraduationCap className="w-4 h-4 text-[#DDA743] mb-0.5" />
          <span className="text-[10px] font-bold tracking-tight text-white">College XI</span>
        </button>

        {/* 3. Admission Helpline */}
        <a
          href={`tel:${COLLEGE_CONFIG.contact.admissionPhone.replace(/\s+/g, "")}`}
          className="flex flex-col items-center justify-center py-1.5 px-1 rounded-lg bg-[#DDA743]/15 border border-[#DDA743]/40 text-[#9E1B32] shadow-xs active:scale-95 transition-all cursor-pointer"
        >
          <Phone className="w-4 h-4 text-[#9E1B32] mb-0.5" />
          <span className="text-[10px] font-bold tracking-tight">Call Desk</span>
        </a>

        {/* 4. Notices Bulletin */}
        {onOpenNoticeDrawer ? (
          <button
            type="button"
            onClick={onOpenNoticeDrawer}
            className="flex flex-col items-center justify-center py-1.5 px-1 rounded-lg text-slate-800 hover:text-[#9E1B32] hover:bg-slate-100 active:scale-95 transition-all cursor-pointer"
          >
            <Bell className="w-4 h-4 text-[#9E1B32] mb-0.5" />
            <span className="text-[10px] font-bold tracking-tight text-[#9E1B32]">Notices</span>
          </button>
        ) : (
          <a
            href="#notices"
            className="flex flex-col items-center justify-center py-1.5 px-1 rounded-lg text-slate-800 hover:text-[#9E1B32] hover:bg-slate-100 active:scale-95 transition-all"
          >
            <Bell className="w-4 h-4 text-slate-600 mb-0.5" />
            <span className="text-[10px] font-semibold tracking-tight">Notices</span>
          </a>
        )}
      </div>
    </aside>
  );
}
