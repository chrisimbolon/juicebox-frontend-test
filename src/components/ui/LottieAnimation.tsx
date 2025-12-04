"use client";

import dynamic from "next/dynamic";
import { useRef, useEffect } from "react";
import gsap from "gsap";

const Player = dynamic(
  () => import("@lottiefiles/react-lottie-player").then((mod) => mod.Player),
  { ssr: false }
);

interface LottieAnimationProps {
  src: string;
  className?: string;
  autoplay?: boolean;
  loop?: boolean;
  onComplete?: () => void;
}

export default function LottieAnimation({
  src,
  className = "",
  autoplay = true,
  loop = true,
  onComplete,
}: LottieAnimationProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      gsap.fromTo(
        containerRef.current,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 1, ease: "power3.out" }
      );
    }
  }, []);

  return (
    <div ref={containerRef} className={className}>
      <Player
        src={src}
        autoplay={autoplay}
        loop={loop}
        onEvent={(event) => {
          if (event === "complete" && onComplete) onComplete();
        }}
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
}
