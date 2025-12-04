// src/components/form/TextInput.tsx

"use client";

import { InputHTMLAttributes, forwardRef, useState } from "react";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  showIcon?: boolean;
}

const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  ({ error, showIcon = true, className, ...props }, ref) => {
    const [hasValue, setHasValue] = useState(false);

    return (
      <div className="relative w-full max-w-[330px]">
        {showIcon && hasValue && (
          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 z-10">
            <HexagonIcon />
          </div>
        )}

        {/* Input Container */}
        <div className="relative">
          <input
            ref={ref}
            className={cn(
              // Base styles
              "w-full h-[44px]", 
              "px-4",
              "rounded-[12px]", 
              "text-[16px] leading-[100%] tracking-[-0.028em]", 
              "text-[#FAFAFA]",
              "placeholder:text-[#FAFAFA] placeholder:opacity-50",
              "font-body",
              
              
              "bg-[rgba(255,255,255,0.2)]", // #FFFFFF33 from Figma
              "backdrop-blur-[20px]",
              
              // Border
              "border border-[rgba(255,255,255,0.1)]",
              
              // Focus states
              "focus:outline-none focus:border-[#CDAAFF] focus:ring-1 focus:ring-[#CDAAFF]",
              
              // Transitions
              "transition-all duration-200",
              
              // Error state
              error && "border-red-500 focus:border-red-500 focus:ring-red-500",
              
              className
            )}
            onChange={(e) => {
              setHasValue(e.target.value.length > 0);
              props.onChange?.(e);
            }}
            {...props}
          />

          {hasValue && !error && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <div className="w-[30px] h-[30px] rounded-full bg-[rgba(255,255,255,0.1)] flex items-center justify-center">
                <Check className="w-4 h-4 text-[#67CE67]" />
              </div>
            </div>
          )}
        </div>

        {/* Error message */}
        {error && (
          <p className="mt-2 text-sm text-red-400 text-center animate-in fade-in duration-200">
            {error}
          </p>
        )}
      </div>
    );
  }
);

TextInput.displayName = "TextInput";

export default TextInput;

// Hexagon SVG Component
function HexagonIcon() {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="animate-in fade-in zoom-in duration-300"
    >
      <path
        d="M16 2L27.8564 9V23L16 30L4.14359 23V9L16 2Z"
        fill="url(#hexagon-gradient)"
        fillOpacity="0.8"
      />
      <path
        d="M16 2L27.8564 9V23L16 30L4.14359 23V9L16 2Z"
        stroke="#CDAAFF"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <defs>
        <linearGradient
          id="hexagon-gradient"
          x1="4.14359"
          y1="16"
          x2="27.8564"
          y2="16"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#C0A4FF" />
          <stop offset="1" stopColor="#73BFF9" />
        </linearGradient>
      </defs>
    </svg>
  );
}
