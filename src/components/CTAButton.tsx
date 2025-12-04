// src/components/CTAButton.tsx

"use client";

import { ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

interface CTAButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
  children: React.ReactNode;
}

const CTAButton = forwardRef<HTMLButtonElement, CTAButtonProps>(
  ({ variant = "primary", children, className, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          // Base styles
          "relative inline-flex items-center justify-center",
          "font-body text-body transition-all duration-200",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
          
          // Exact dimensions from Figma
          "h-[60px] w-full max-w-[350px]",
          
          // Border radius from Figma (12px)
          "rounded-[12px]",
          
          // Variant styles
          variant === "primary" && [
            "bg-[#CDAAFF]", // Exact primary color from Figma
            "text-[#0C0D10]", // Dark text on light button
            "shadow-[0px_0px_0px_0px_rgba(255,255,255,0.34)]",
            "hover:bg-[#BF94FF]", // Slightly darker on hover
            "active:scale-[0.98]",
            "focus-visible:ring-[#CDAAFF]",
          ],
          
          variant === "secondary" && [
            "bg-transparent",
            "text-[#FAFAFA]",
            "border border-[#FAFAFA]",
            "hover:bg-[rgba(255,255,255,0.05)]",
            "active:scale-[0.98]",
            "focus-visible:ring-[#FAFAFA]",
          ],
          
          className
        )}
        {...props}
      >
        <span className="font-[400] text-[18px] leading-[135%] tracking-[0.02em]">
          {children}
        </span>
      </button>
    );
  }
);

CTAButton.displayName = "CTAButton";

export default CTAButton;
