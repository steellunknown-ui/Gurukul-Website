"use client";

import { useEffect, useState } from "react";

/**
 * Institutional Security Component: Anti-Inspect & DevTools Restriction
 * Protects both the public website and the CMS Admin Panel from unauthorized
 * code inspection, right-click source viewing, and developer tool shortcuts.
 */
export function AntiInspect() {
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    let toastTimeout: NodeJS.Timeout;

    const showSecurityToast = (msg: string) => {
      setToastMessage(msg);
      clearTimeout(toastTimeout);
      toastTimeout = setTimeout(() => {
        setToastMessage(null);
      }, 3000);
    };

    // 1. Disable Right-Click Context Menu
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      showSecurityToast(
        "Institutional Security: Right-click is restricted on Gurukul Vidyapeeth portals."
      );
    };

    // 2. Block Developer Keyboard Shortcuts
    const handleKeyDown = (e: KeyboardEvent) => {
      const isMac = typeof window !== "undefined" && navigator.platform.toUpperCase().indexOf("MAC") >= 0;
      const cmdOrCtrl = isMac ? e.metaKey : e.ctrlKey;

      // F12 key
      if (e.key === "F12") {
        e.preventDefault();
        e.stopPropagation();
        showSecurityToast("Institutional Security: Developer Tools are restricted.");
        return;
      }

      // Ctrl+Shift+I or Cmd+Option+I (Inspect Element)
      if (cmdOrCtrl && e.shiftKey && (e.key === "I" || e.key === "i")) {
        e.preventDefault();
        e.stopPropagation();
        showSecurityToast("Institutional Security: Developer Tools are restricted.");
        return;
      }

      // Ctrl+Shift+J or Cmd+Option+J (Console)
      if (cmdOrCtrl && e.shiftKey && (e.key === "J" || e.key === "j")) {
        e.preventDefault();
        e.stopPropagation();
        showSecurityToast("Institutional Security: Developer Console is restricted.");
        return;
      }

      // Ctrl+Shift+C or Cmd+Option+C (Inspect Element)
      if (cmdOrCtrl && e.shiftKey && (e.key === "C" || e.key === "c")) {
        e.preventDefault();
        e.stopPropagation();
        showSecurityToast("Institutional Security: Element inspection is restricted.");
        return;
      }

      // Ctrl+U or Cmd+Option+U (View Page Source)
      if (cmdOrCtrl && (e.key === "U" || e.key === "u")) {
        e.preventDefault();
        e.stopPropagation();
        showSecurityToast("Institutional Security: Page source viewing is restricted.");
        return;
      }

      // Ctrl+S or Cmd+S (Save Page)
      if (cmdOrCtrl && (e.key === "S" || e.key === "s")) {
        e.preventDefault();
        e.stopPropagation();
        showSecurityToast("Institutional Security: Page saving is restricted.");
        return;
      }
    };

    // 3. DevTools Open Detection via Dimension Monitoring (in Production)
    let checkInterval: NodeJS.Timeout;
    if (process.env.NODE_ENV === "production") {
      const threshold = 160;
      checkInterval = setInterval(() => {
        const widthDiff = window.outerWidth - window.innerWidth > threshold;
        const heightDiff = window.outerHeight - window.innerHeight > threshold;
        if (widthDiff || heightDiff) {
          // DevTools dock detected
          showSecurityToast("Institutional Security: Developer Tools detected.");
        }
      }, 2000);
    }

    window.addEventListener("contextmenu", handleContextMenu);
    window.addEventListener("keydown", handleKeyDown, true);

    return () => {
      window.removeEventListener("contextmenu", handleContextMenu);
      window.removeEventListener("keydown", handleKeyDown, true);
      clearTimeout(toastTimeout);
      if (checkInterval) clearInterval(checkInterval);
    };
  }, []);

  if (!toastMessage) return null;

  return (
    <div
      role="alert"
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[9999] pointer-events-none transition-all duration-300 animate-in fade-in slide-in-from-bottom-4"
    >
      <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-[#1A080C]/95 text-white text-xs font-medium border border-[#DFBA73]/50 shadow-2xl backdrop-blur-md">
        <span className="w-2 h-2 rounded-full bg-[#DFBA73] animate-pulse shrink-0" />
        <span className="text-[#F4EFEA] tracking-wide">{toastMessage}</span>
      </div>
    </div>
  );
}
