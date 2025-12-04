// src/components/Header.tsx

"use client";

import { ArrowLeft, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";

interface HeaderProps {
  onReset?: () => void;
  onBack?: () => void;
  showReset?: boolean;
  showBack?: boolean;
  className?: string;
}

export default function Header({
  onReset,
  onBack,
  showReset = false,
  showBack = false,
  className,
}: HeaderProps) {
  return (
    <header
      className={cn(
        "relative flex items-center justify-between",
        "h-[86px] px-[20px]", // Exact from Figma
        "w-full",
        className
      )}
    >
      {/* Back Button */}
      {showBack && (
        <button
          onClick={onBack}
          className={cn(
            "flex items-center justify-center",
            "w-[46px] h-[46px]", 
            "rounded-full", 
            "glass-surface", 
            "transition-all duration-200",
            "hover:bg-[rgba(255,255,255,0.08)]",
            "active:scale-95",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#CDAAFF]"
          )}
          aria-label="Go back"
        >
          <ArrowLeft className="w-5 h-5 text-[#FAFAFA]" />
        </button>
      )}

      {/* Spacer when no back button */}
      {!showBack && <div className="w-[46px]" />}

      {/* Juicebox Logo (centered) */}
      <div className="absolute left-1/2 transform -translate-x-1/2">
        <JuiceboxLogo />
      </div>

      {/* Reset Button */}
      {showReset && (
        <button
          onClick={onReset}
          className={cn(
            "flex items-center justify-center",
            "w-[46px] h-[46px]",
            "rounded-full",
            "glass-surface",
            "transition-all duration-200",
            "hover:bg-[rgba(255,255,255,0.08)]",
            "active:scale-95",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#CDAAFF]"
          )}
          aria-label="Reset"
        >
          <RotateCcw className="w-5 h-5 text-[#FAFAFA]" />
        </button>
      )}

      {/* Spacer when no reset button */}
      {!showReset && <div className="w-[46px]" />}
    </header>
  );
}

// Juicebox Logo Component (Vector-based as per Figma)
function JuiceboxLogo() {
  return (
    <svg
      width="123"
      height="29"
      viewBox="0 0 123 29"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="text-[#FAFAFA]"
    >
      <text
        x="0"
        y="20"
        fill="currentColor"
        fontSize="24"
        fontWeight="500"
        fontFamily="system-ui, -apple-system, sans-serif"
      >
        juicebox
      </text>
    </svg>
  );
}


// "use client";

// import { RefreshCw, ArrowLeft } from "lucide-react";
// import { cn } from "@/lib/utils";

// interface HeaderProps {
//   onReset?: () => void;
//   showReset?: boolean;
//   showBack?: boolean;
//   onBack?: () => void;
// }

// export default function Header({
//   onReset,
//   showReset = false,
//   showBack = false,
//   onBack,
// }: HeaderProps) {
//   return (
//     <header className="flex items-center justify-between px-5 py-5 h-[86px]">
//       {/* Left: Back button or spacer */}
//       <div className="w-[46px] h-[46px] flex items-center justify-center">
//         {showBack && onBack ? (
//           <button
//             onClick={onBack}
//             className={cn(
//               "w-[46px] h-[46px] rounded-full flex items-center justify-center",
//               "bg-[#FFFFFF0D] backdrop-blur-[120px]",
//               "transition-all duration-200 hover:bg-[#FFFFFF1A]",
//               "focus:outline-none focus:ring-2 focus:ring-primary/50"
//             )}
//             aria-label="Go back"
//           >
//             <ArrowLeft className="w-5 h-5 text-foreground" strokeWidth={1.5} />
//           </button>
//         ) : (
//           <div className="w-[46px]" />
//         )}
//       </div>

//       {/* Center: Logo */}
//       <div className="flex-1 flex justify-center">
//         <span className="text-foreground font-medium text-[22px] tracking-tight">
//           juicebox
//         </span>
//       </div>

//       {/* Right: Reset button */}
//       <div className="w-[46px] h-[46px] flex items-center justify-center">
//         {showReset && onReset && (
//           <button
//             onClick={onReset}
//             className={cn(
//               "w-[46px] h-[46px] rounded-full flex items-center justify-center",
//               "bg-[#FFFFFF0D] backdrop-blur-[120px]",
//               "transition-all duration-200 hover:bg-[#FFFFFF1A]",
//               "focus:outline-none focus:ring-2 focus:ring-primary/50"
//             )}
//             aria-label="Reset application"
//           >
//             <RefreshCw className="w-5 h-5 text-foreground" strokeWidth={1.5} />
//           </button>
//         )}
//       </div>
//     </header>
//   );
// }
