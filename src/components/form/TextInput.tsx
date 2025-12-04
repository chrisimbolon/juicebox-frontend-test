// src/components/form/TextInput.tsx

"use client";

import { forwardRef, InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  ({ label, error, helperText, className, id, ...props }, ref) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : "input");

    return (
      <div className="w-full space-y-2">
        {label && <label htmlFor={inputId} className="block text-sm font-medium tracking-[0.02em]">{label}</label>}
        <div className="relative">
          <input
            ref={ref}
            id={inputId}
            className={cn(
              "w-full h-[56px] px-4 rounded-[16px]",
              "bg-[#FFFFFF0D] border border-[#FFFFFF1A]",
              "text-white placeholder:text-gray-400",
              "text-[16px] tracking-[0.02em]",
              "focus:outline-none focus:ring-2 focus:ring-[#8B5CF6] transition-all duration-200",
              className
            )}
            {...props}
          />
          <div className="absolute right-4 top-1/2 -translate-y-1/2">
            <div className="w-5 h-5 rounded-full border border-[#FFFFFF33]" />
          </div>
        </div>
        {error && <p className="text-sm text-red-500 tracking-[0.02em]">{error}</p>}
        {helperText && !error && <p className="text-sm text-gray-400 tracking-[0.02em]">{helperText}</p>}
      </div>
    );
  }
);

TextInput.displayName = "TextInput";
export default TextInput;
