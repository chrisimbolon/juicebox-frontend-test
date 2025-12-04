
// src/app/(steps)/results/page.tsx

"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import Header from "@/components/Header";
import CTAButton from "@/components/CTAButton";
import SmallHexagon from "@/components/ui/SmallHexagon";
import { useUser } from "@/context/UserContext";
import { useRouter } from "next/navigation";

export default function ResultsPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const hexagonRef = useRef<HTMLDivElement>(null);

  const { userData, reset } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!userData?.firstName || !userData?.email) {
      router.push("/form");
      return;
    }
  }, [userData, router]);

  useEffect(() => {
    if (contentRef.current) {
      gsap.fromTo(
        contentRef.current.children,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.15,
          ease: "power3.out",
        }
      );
    }

    if (hexagonRef.current) {
      gsap.fromTo(
        hexagonRef.current,
        { opacity: 0, scale: 0.8, y: -10 },
        { opacity: 1, scale: 1, y: 0, duration: 0.55, ease: "back.out(1.7)" }
      );
    }
  }, []);

  const handleRestart = () => {
    reset();
    router.push("/");
  };

  if (!userData?.firstName || !userData?.email) return null;

  return (
    <div ref={containerRef} className="min-h-screen bg-background flex flex-col">
      <Header onReset={handleRestart} showReset={true} showBack={false} />

      <main className="flex-1 flex flex-col px-6 pb-8">
        <div ref={contentRef} className="flex-1 flex flex-col items-center justify-center text-center">

          {/* Small Hexagon */}
          <div ref={hexagonRef} className="mb-10 flex justify-center">
            <SmallHexagon size={32} />
          </div>

          <p className="text-[20px] font-semibold text-foreground mb-4 max-w-[300px] leading-[1.3]">
            Thanks, {userData.firstName}! Now it’s time to get a reality check.
          </p>

          <p className="text-muted-foreground text-[16px] mb-8 max-w-[280px]">
            This will take 2–3 minutes.
          </p>
        </div>

        <CTAButton variant="secondary" onClick={handleRestart}>
          Continue
        </CTAButton>
      </main>
    </div>
  );
}
