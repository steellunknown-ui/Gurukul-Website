import React from "react";
import { CrestLogo } from "@/components/ui/crest-logo";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#FCFAF7] flex flex-col items-center justify-center p-6 text-center">
      <div className="max-w-md w-full space-y-6">
        <CrestLogo className="justify-center" />

        <div className="space-y-2 pt-4">
          <span className="font-crest text-4xl sm:text-5xl font-bold text-[#6B1124] block">
            404
          </span>
          <h1 className="font-editorial text-2xl sm:text-3xl font-bold text-[#1F1A1B]">
            Page Under Academic Archiving
          </h1>
          <p className="text-xs sm:text-sm text-[#5C5556] leading-relaxed">
            The requested departmental route or document is not located within the current Phase 1 catalog. Please return to the Gurukul Junior College homepage.
          </p>
        </div>

        <div className="pt-4 flex items-center justify-center gap-3">
          <Button variant="primary" size="md" href="/" className="gap-2">
            <Home className="w-4 h-4" />
            <span>Return to Homepage</span>
          </Button>
        </div>

        <div className="text-[11px] text-stone-600 font-mono pt-4 border-t border-[#E8DFD7]">
          Gurukul Junior College • Standards XI &amp; XII
        </div>
      </div>
    </div>
  );
}
