// src/app/(steps)/results/page.tsx
"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import Header from "@/components/Header";
import CTAButton from "@/components/CTAButton";
import LottieAnimation from "@/components/ui/LottieAnimation";
import { useUser } from "@/context/UserContext";
import { useRouter } from "next/navigation";

export default function ResultsPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

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
  }, []);

  const handleRestart = () => {
    reset(); 
    router.push("/");
  };

  // aviod render if data unavailable
  if (!userData?.firstName || !userData?.email) {
    return null;
  }

  return (
    <div ref={containerRef} className="min-h-screen bg-background flex flex-col">
      <Header onReset={handleRestart} showReset={true} showBack={false} />

      <main className="flex-1 flex flex-col px-6 pb-8">
        <div ref={contentRef} className="flex-1 flex flex-col items-center justify-center text-center">
          {/* Lottie Success animation */}
          <div className="w-48 h-48 mb-8">
            <LottieAnimation
              src="/animations/JB2G_Lottie.json"
              className="w-full h-full"
              loop={false}
            />
          </div>

          <h2 className="text-3xl font-semibold text-foreground mb-4">
            Thanks, {userData.firstName}! 
          </h2>

          <p className="text-muted-foreground text-lg mb-8 max-w-xs">
            Your reality check is on its way to your inbox.
          </p>

          {/* Summary Card */}
          <div className="w-full max-w-sm bg-[#FFFFFF0D] rounded-2xl p-6 space-y-4 mb-8 border border-[#FFFFFF1A]">
            <h3 className="text-lg font-medium">Your Details</h3>

            <div className="space-y-3 text-left">
              <div className="flex justify-between items-center py-2 border-b border-[#FFFFFF1A]">
                <span className="text-muted-foreground text-sm">Name</span>
                <span className="text-foreground font-medium">{userData.firstName}</span>
              </div>

              <div className="flex justify-between items-center py-2">
                <span className="text-muted-foreground text-sm">Email</span>
                <span className="text-foreground font-medium text-sm truncate max-w-[180px]">
                  {userData.email}
                </span>
              </div>
            </div>
          </div>
        </div>

        <CTAButton variant="secondary" onClick={handleRestart}>
          Start Over
        </CTAButton>
      </main>
    </div>
  );
}