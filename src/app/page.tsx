"use client";

import React, { useState } from "react";
import { UtilityBar } from "@/components/layout/utility-bar";
import { Header } from "@/components/layout/header";
import { MobileNav } from "@/components/layout/mobile-nav";
import { MobileDock } from "@/components/layout/mobile-dock";
import { Footer } from "@/components/layout/footer";

import { Hero } from "@/components/home/hero";
import { Highlights } from "@/components/home/highlights";
import { SectionsExplorer } from "@/components/home/sections-explorer";
import { AcademicTrackRecord } from "@/components/home/academic-track-record";
import { StreamsExplorer } from "@/components/home/streams-explorer";
import { NoticeDrawer } from "@/components/home/notice-drawer";
import { PrincipalMessage } from "@/components/home/principal-message";
import { CampusShowcase } from "@/components/home/campus-showcase";
import { AdmissionsCta } from "@/components/home/admissions-cta";
import { EnquiryModal, AdmissionClassLevel } from "@/components/home/enquiry-modal";
import { FeeStructureModal } from "@/components/home/fee-structure-modal";
import { FirstVisitPopup } from "@/components/home/first-visit-popup";
import { WhatsAppButton } from "@/components/ui/whatsapp-button";

export default function HomePage() {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [isEnquiryModalOpen, setIsEnquiryModalOpen] = useState(false);
  const [enquiryClassLevel, setEnquiryClassLevel] = useState<AdmissionClassLevel>("XI");
  const [selectedStreamForEnquiry, setSelectedStreamForEnquiry] = useState("science");

  // Gated Standard-Specific Fee Modal State
  const [isFeeModalOpen, setIsFeeModalOpen] = useState(false);
  const [selectedFeeStandardId, setSelectedFeeStandardId] = useState("std-1");

  // Slide-out Left Notice Panel State
  const [isNoticeDrawerOpen, setIsNoticeDrawerOpen] = useState(false);

  // Auto-scroll to target section if URL contains an anchor hash
  React.useEffect(() => {
    const handleHashScroll = () => {
      if (typeof window === "undefined") return;
      const hash = window.location.hash.replace("#", "").trim();
      if (!hash) return;

      if (hash === "overview") {
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }

      if (hash === "notices") {
        setIsNoticeDrawerOpen(true);
        return;
      }

      let attempts = 0;
      const maxAttempts = 20;
      const interval = setInterval(() => {
        const el = document.getElementById(hash);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
          clearInterval(interval);
        } else {
          attempts++;
          if (attempts >= maxAttempts) {
            clearInterval(interval);
          }
        }
      }, 70);
    };

    handleHashScroll();
    window.addEventListener("hashchange", handleHashScroll);
    return () => window.removeEventListener("hashchange", handleHashScroll);
  }, []);

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
    <div className="min-h-screen flex flex-col bg-[#FCFAF7] text-slate-900 relative selection:bg-red-600 selection:text-white">
      {/* Top Utility Helpline Bar */}
      <UtilityBar />

      {/* Main Sticky Header */}
      <Header
        onOpenMobileNav={() => setIsMobileNavOpen(true)}
        onOpenEnquiry={(classLevel) => handleOpenEnquiry(classLevel)}
        onOpenFeeModal={() => handleOpenFeeModal("std-1")}
      />

      {/* Main Content Flow */}
      <main id="main-content" className="flex-1 pb-16 lg:pb-0">
        {/* A. Hero Slider with Continuous 5s Looping */}
        <Hero onOpenEnquiry={(classLevel) => handleOpenEnquiry(classLevel)} />

        {/* B. Institutional Highlights & Board Credibility */}
        <Highlights />

        {/* C. Maharashtra Board 5-Tier School Sections & Subject Structure */}
        <SectionsExplorer
          onOpenFeeModal={(stdId) => handleOpenFeeModal(stdId)}
          onOpenEnquiryModal={() => handleOpenEnquiry("School")}
        />

        {/* D. Academic Track Record & Board Distinction (SSC & HSC Pune/Mumbai Board) */}
        <AcademicTrackRecord onOpenEnquiry={(classLevel) => handleOpenEnquiry(classLevel)} />

        {/* E. Higher Secondary Junior College Streams (XI & XII Science, Commerce, Arts) */}
        <StreamsExplorer onOpenEnquiry={(streamId) => handleOpenEnquiry("XI", streamId)} />

        {/* F. Trust Leadership Vision (1st Founder & 2nd Chairman) */}
        <PrincipalMessage />

        {/* G. Campus Environments & Science Labs */}
        <CampusShowcase />

        {/* H. Admissions Call to Action */}
        <AdmissionsCta
          onOpenEnquiry={(classLevel) => handleOpenEnquiry(classLevel)}
          onOpenNoticeDrawer={() => setIsNoticeDrawerOpen(true)}
        />
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

      {/* Automated First-Visit Admission Pop-up */}
      <FirstVisitPopup
        onOpenFeeModal={(stdId) => handleOpenFeeModal(stdId)}
        onOpenEnquiryModal={() => handleOpenEnquiry("XI")}
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
