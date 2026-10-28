import React from "react";
import { cn } from "@/lib/utils";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "maroon" | "crimson" | "gold" | "navy" | "subtle" | "outline" | "placeholder";
  size?: "sm" | "md";
}

export function Badge({
  children,
  className,
  variant = "crimson",
  size = "md",
  ...props
}: BadgeProps) {
  const variantStyles = {
    maroon:
      "bg-red-600 text-white border border-red-700/50 shadow-xs font-semibold",
    crimson:
      "bg-red-600 text-white border border-red-700/50 shadow-xs font-semibold",
    gold:
      "bg-amber-100 text-amber-900 border border-amber-300 font-bold",
    navy:
      "bg-[#0F3E7A] text-white border border-[#0A1E3F] font-semibold",
    subtle:
      "bg-slate-100 text-slate-800 border border-slate-200",
    outline:
      "bg-transparent text-red-600 border border-red-300 font-medium",
    placeholder:
      "bg-amber-50 text-amber-900 border border-amber-300 text-xs font-mono",
  };

  const sizeStyles = {
    sm: "px-2 py-0.5 text-xs tracking-wider",
    md: "px-3 py-1 text-xs sm:text-sm tracking-wide",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full font-medium transition-colors",
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
