"use client";

import { usePathname, useRouter } from "next/navigation";
import { useCallback } from "react";

/**
 * Universal navigation hook for seamless institutional cross-page and same-page routing.
 * Ensures that anchor links (e.g. #sections, #streams, #leadership, #overview)
 * reliably scroll smoothly when on the homepage, and properly redirect from sub-pages
 * (e.g. /campus, /anti-ragging, /toppers) without being swallowed or trapped.
 */
export function useInstitutionalNav() {
  const pathname = usePathname();
  const router = useRouter();

  const navigateToSection = useCallback(
    (targetHash: string, onAfterNavigate?: () => void) => {
      // Normalise hash: e.g. "/#leadership", "#leadership", or "leadership" -> "leadership"
      const cleanHash = targetHash.replace(/^\/?#?/, "").trim();

      if (onAfterNavigate) {
        onAfterNavigate();
      }

      if (pathname === "/") {
        // We are already on the homepage
        if (!cleanHash || cleanHash === "overview") {
          window.scrollTo({ top: 0, behavior: "smooth" });
          window.history.pushState(null, "", "/");
        } else {
          const element = document.getElementById(cleanHash);
          if (element) {
            element.scrollIntoView({ behavior: "smooth" });
            window.history.pushState(null, "", `/#${cleanHash}`);
          } else {
            // Fallback if element not found
            window.scrollTo({ top: 0, behavior: "smooth" });
          }
        }
      } else {
        // We are on a sub-page: route to the homepage with the target anchor
        if (!cleanHash || cleanHash === "overview") {
          router.push("/");
        } else {
          router.push(`/#${cleanHash}`);
        }
      }
    },
    [pathname, router]
  );

  const handleLinkClick = useCallback(
    (targetHash: string, onAfterNavigate?: () => void) => {
      return (e: React.MouseEvent) => {
        // Allow ctrl/cmd/shift/alt click or middle click for opening in new tab
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) {
          return;
        }
        e.preventDefault();
        navigateToSection(targetHash, onAfterNavigate);
      };
    },
    [navigateToSection]
  );

  return {
    pathname,
    navigateToSection,
    handleLinkClick,
  };
}
