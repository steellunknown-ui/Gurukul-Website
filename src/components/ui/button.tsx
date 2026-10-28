import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "gold" | "outline" | "ghost" | "link";
  size?: "sm" | "md" | "lg";
  href?: string;
  isExternal?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      href,
      isExternal,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center font-medium transition-all duration-200 select-none cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A059] focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98]";

    const variantStyles = {
      primary:
        "bg-[#9E1B32] text-white hover:bg-[#BA203B] shadow-md hover:shadow-lg border border-[#7A1224]/50 active:bg-[#7A1224]",
      gold:
        "bg-[#DDA743] text-slate-950 font-bold hover:bg-[#E8B558] shadow-sm hover:shadow-md border border-[#C69232]/50",
      outline:
        "bg-white text-[#9E1B32] border border-[#9E1B32] hover:bg-[#9E1B32]/10 hover:border-[#BA203B] shadow-xs",
      ghost:
        "bg-transparent text-slate-800 hover:bg-[#9E1B32]/10 hover:text-[#9E1B32]",
      link:
        "bg-transparent text-[#9E1B32] underline-offset-4 hover:underline p-0 h-auto",
    };

    const sizeStyles = {
      sm: "min-h-[38px] px-3.5 py-1.5 text-xs sm:text-sm rounded-md tracking-wide",
      md: "min-h-[44px] px-5 py-2 text-sm sm:text-base rounded-md tracking-wide",
      lg: "min-h-[48px] px-7 py-3 text-base sm:text-lg rounded-md tracking-wide font-medium",
    };

    const combinedClasses = cn(
      baseStyles,
      variantStyles[variant],
      variant !== "link" && sizeStyles[size],
      className
    );

    if (href) {
      if (isExternal || href.startsWith("http") || href.startsWith("tel:") || href.startsWith("mailto:")) {
        return (
          <a
            href={href}
            className={combinedClasses}
            target={isExternal ? "_blank" : undefined}
            rel={isExternal ? "noopener noreferrer" : undefined}
          >
            {children}
          </a>
        );
      }
      return (
        <Link href={href} className={combinedClasses}>
          {children}
        </Link>
      );
    }

    return (
      <button
        ref={ref}
        disabled={disabled}
        className={combinedClasses}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
