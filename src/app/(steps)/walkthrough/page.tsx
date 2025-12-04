// src/app/(steps)/walkthrough/page.tsx
"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import gsap from "gsap";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import CTAButton from "@/components/CTAButton";
import "swiper/css";
import "swiper/css/pagination";

const slides = [
  {
    description:
      "Professionals around the world shared how they feel about technology and I've listened. Now it's your turn.",
  },
  {
    description:
      "I'll ask you a handful of meaningful questions and compare your responses with people in your industry.",
  },
  {
    description:
      "You'll get insights into current industry sentiments and a reality check about technology in a few minutes. Deal? Great!",
  },
];

export default function WalkthroughPage() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [swiper, setSwiper] = useState<SwiperType | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const isLastSlide = activeIndex === slides.length - 1;

  useEffect(() => {
    if (containerRef.current) {
      gsap.fromTo(
        containerRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.5, ease: "power2.out" }
      );
    }
  }, []);

  const handleNext = () => {
    if (isLastSlide) {
      router.push("/form");
    } else {
      swiper?.slideNext();
    }
  };

  const handleBack = () => {
    if (activeIndex > 0) swiper?.slidePrev();
    else router.back();
  };

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-background flex flex-col relative overflow-hidden"
    >
      <Header
        onReset={() => router.push("/")}
        showReset={true}
        showBack={activeIndex > 0}
        onBack={handleBack}
      />

      <main className="flex-1 flex flex-col px-5 pb-7">
        <div className="flex-1 flex flex-col items-center justify-center">
          <Swiper
            modules={[Pagination]}
            pagination={{ clickable: true }}
            onSwiper={setSwiper}
            onSlideChange={(s) => setActiveIndex(s.activeIndex)}
            className="w-full max-w-[350px]"
            spaceBetween={20}
          >
            {slides.map((slide, index) => (
              <SwiperSlide key={index}>
                <div className="flex flex-col items-center justify-center text-center px-2 py-8">
                  {/* AI Blob (using next/image for optimization) */}
                  <div className="mb-6">
                    <Image
                      src="/assets/ai-blob.png"
                      alt="AI Blob"
                      width={146}
                      height={155}
                      priority
                      className="rotate-180 slow-rotate opacity-100"
                    />
                  </div>

                  {/* Slide text */}
                  <p className="text-foreground text-[16px] leading-[1.5] tracking-[0.02em] max-w-[320px]">
                    <span className="font-medium">{slide.description}</span>
                  </p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div className="flex justify-center mt-8">
          <CTAButton onClick={handleNext}>
            {isLastSlide ? "Get started" : "Continue"}
          </CTAButton>
        </div>
      </main>
    </div>
  );
}
