import React from "react";
import Image from "next/image";
import { COLLEGE_CONFIG } from "@/config/college-config";
import { Badge } from "@/components/ui/badge";
import { Microscope, Library, Monitor, Users, Check } from "lucide-react";
import { MotionReveal } from "@/components/ui/motion-reveal";

export function CampusShowcase() {
  const getFacilityIcon = (cat: string) => {
    switch (cat) {
      case "Laboratories":
        return <Microscope className="w-4 h-4 text-[#DDA743]" />;
      case "Library":
        return <Library className="w-4 h-4 text-[#DDA743]" />;
      case "Academics":
        return <Monitor className="w-4 h-4 text-[#DDA743]" />;
      case "Sports & Welfare":
        return <Users className="w-4 h-4 text-[#DDA743]" />;
      default:
        return <Microscope className="w-4 h-4 text-[#DDA743]" />;
    }
  };

  const getFacilityImage = (id: string) => {
    switch (id) {
      case "fac-1":
        return "/images/hero/slide-3.jpg";
      case "fac-2":
        return "/images/hero/slide-4.jpg";
      case "fac-3":
        return "/images/hero/slide-2.jpg";
      case "fac-4":
        return "/images/hero/slide-1.jpg";
      default:
        return "/images/hero/slide-1.jpg";
    }
  };

  return (
    <section
      id="campus"
      className="scroll-mt-20 sm:scroll-mt-24 py-12 sm:py-20 bg-[#FFFFFF] border-b border-[#E8DFD7] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <MotionReveal direction="down" className="max-w-3xl mx-auto text-center space-y-2.5 mb-8 sm:mb-14">
          <Badge variant="maroon" size="sm">
            Academic Infrastructure
          </Badge>
          <h2 className="font-editorial text-2xl xs:text-3xl sm:text-4xl font-bold tracking-tight text-[#1F1A1B] leading-tight">
            Campus Environments Built for <span className="text-[#9E1B32]">Focused Learning</span>
          </h2>
          <p className="text-xs sm:text-base text-[#5C5556] leading-relaxed">
            Every square foot of Gurukul Vidyapeeth is designed for disciplined study habits, laboratory experimentation, and quiet intellectual immersion from early grades to Board certifications.
          </p>
        </MotionReveal>

        {/* Facilities Grid (2x2 Grid) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-8">
          {COLLEGE_CONFIG.facilities.map((facility, idx) => (
            <MotionReveal
              key={facility.id}
              direction={idx % 2 === 0 ? "left" : "right"}
              delay={0.1 + (idx % 2) * 0.1}
              hoverLift={true}
              className="h-full"
            >
              <div
                className="h-full bg-[#FCFAF7] border border-slate-200/90 rounded-xl sm:rounded-2xl overflow-hidden shadow-xs hover:border-[#DDA743] hover:shadow-2xl hover:-translate-y-2.5 transition-all duration-300 flex flex-col justify-between group cursor-pointer"
              >
              {/* Media Container with Real Campus Visual */}
              <div className="relative aspect-16/9 w-full overflow-hidden bg-[#1A080C]">
                <Image
                  src={getFacilityImage(facility.id)}
                  alt={facility.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-85"
                />
                {/* Gradient vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A080C] via-[#1A080C]/40 to-transparent" />

                {/* Overlaid Badges & Title */}
                <div className="absolute top-3 left-3 flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-xs text-white text-[10.5px] font-bold border border-white/20">
                    {getFacilityIcon(facility.category)}
                    <span>{facility.category}</span>
                  </span>
                </div>

                <div className="absolute bottom-3 inset-x-3 text-white">
                  <h3 className="font-editorial text-base sm:text-xl font-bold drop-shadow-sm leading-tight text-[#FCFAF7]">
                    {facility.title}
                  </h3>
                  <p className="text-[11px] text-[#F3CA7E] font-medium truncate mt-0.5 drop-shadow-xs">
                    {facility.caption}
                  </p>
                </div>
              </div>

              {/* Facility Details */}
              <div className="p-4 sm:p-6 space-y-3.5 sm:space-y-4 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-crest uppercase tracking-wider text-[#9E1B32] font-bold">
                      State Board Compliant
                    </span>
                    <Badge variant="subtle" size="sm">
                      K–12 Infrastructure
                    </Badge>
                  </div>
                  <p className="text-xs sm:text-sm text-[#5C5556] leading-relaxed">
                    {facility.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#E8DFD7]">
                  <ul className="space-y-1.5 text-xs text-[#1F1A1B]">
                    {facility.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-[#9E1B32] shrink-0 mt-0.5" />
                        <span className="leading-snug">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </MotionReveal>
        ))}
      </div>
      </div>
    </section>
  );
}
