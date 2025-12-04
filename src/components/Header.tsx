"use client";

import { RefreshCw, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

interface HeaderProps {
  onReset?: () => void;
  showReset?: boolean;
  showBack?: boolean;
  onBack?: () => void;
}

export default function Header({
  onReset,
  showReset = false,
  showBack = false,
  onBack,
}: HeaderProps) {
  return (
    <header className="flex items-center justify-between px-5 py-5 h-[86px]">
      {/* Left: Back button or spacer */}
      <div className="w-[46px] h-[46px] flex items-center justify-center">
        {showBack && onBack ? (
          <button
            onClick={onBack}
            className={cn(
              "w-[46px] h-[46px] rounded-full flex items-center justify-center",
              "bg-[#FFFFFF0D] backdrop-blur-[120px]",
              "transition-all duration-200 hover:bg-[#FFFFFF1A]",
              "focus:outline-none focus:ring-2 focus:ring-primary/50"
            )}
            aria-label="Go back"
          >
            <ArrowLeft className="w-5 h-5 text-foreground" strokeWidth={1.5} />
          </button>
        ) : (
          <div className="w-[46px]" />
        )}
      </div>

      {/* Center: Logo */}
      <div className="flex-1 flex justify-center">
        <span className="text-foreground font-medium text-[22px] tracking-tight">
          juicebox
        </span>
      </div>

      {/* Right: Reset button */}
      <div className="w-[46px] h-[46px] flex items-center justify-center">
        {showReset && onReset && (
          <button
            onClick={onReset}
            className={cn(
              "w-[46px] h-[46px] rounded-full flex items-center justify-center",
              "bg-[#FFFFFF0D] backdrop-blur-[120px]",
              "transition-all duration-200 hover:bg-[#FFFFFF1A]",
              "focus:outline-none focus:ring-2 focus:ring-primary/50"
            )}
            aria-label="Reset application"
          >
            <RefreshCw className="w-5 h-5 text-foreground" strokeWidth={1.5} />
          </button>
        )}
      </div>
    </header>
  );
}
