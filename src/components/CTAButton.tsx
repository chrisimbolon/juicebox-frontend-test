"use client";

import { forwardRef, ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface CTAButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
  fullWidth?: boolean;
}

const CTAButton = forwardRef<HTMLButtonElement, CTAButtonProps>(
  ({ children, className, variant = "primary", fullWidth = true, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "h-[60px] rounded-[16px] font-normal text-base transition-all duration-300",
          "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background",
          "tracking-[0.02em] leading-[1.35]",
          variant === "primary" && [
            "bg-primary text-primary-foreground",
            "hover:opacity-90 hover:scale-[1.01]",
            "focus:ring-primary",
            "active:scale-[0.99]",
          ],
          variant === "secondary" && [
            "bg-secondary text-foreground border border-border",
            "hover:bg-[#FFFFFF1A]",
            "focus:ring-border",
          ],
          fullWidth ? "w-full max-w-[350px] mx-auto" : "px-8",
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

CTAButton.displayName = "CTAButton";

export default CTAButton;
