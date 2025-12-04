// src/components/ui/SmallHexagon.tsx

"use client";

interface SmallHexagonProps {
  className?: string;
  size?: number;
}

export default function SmallHexagon({ className = "", size = 32 }: SmallHexagonProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Main hexagon shape with gradient */}
      <path
        d="M16 2L27.8564 9V23L16 30L4.14359 23V9L16 2Z"
        fill="url(#hexagon-gradient)"
        fillOpacity="0.6"
      />
      
      {/* Hexagon border */}
      <path
        d="M16 2L27.8564 9V23L16 30L4.14359 23V9L16 2Z"
        stroke="url(#hexagon-stroke-gradient)"
        strokeWidth="1"
        strokeOpacity="0.8"
      />
      
      {/* Gradient definitions */}
      <defs>
        {/* Fill gradient */}
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
        
        {/* Stroke gradient */}
        <linearGradient
          id="hexagon-stroke-gradient"
          x1="4.14359"
          y1="16"
          x2="27.8564"
          y2="16"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#CDAAFF" />
          <stop offset="1" stopColor="#73BFF9" />
        </linearGradient>
      </defs>
    </svg>
  );
}