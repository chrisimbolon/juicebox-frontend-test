 // src/app/(steps)/page.tsx

"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { useRouter } from "next/navigation";
import Image from "next/image";
import CTAButton from "@/components/CTAButton";

export default function HomePage() {
  const router = useRouter();
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const labelsRef = useRef<(HTMLSpanElement | null)[]>([]);
  const blobRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const opinions = [
    {
      text: "WA businesses feel confident about future growth",
      style: { top: "10%", left: "5%" },
    },
    {
      text: "AI can't replace creativity",
      style: { top: "15%", right: "8%" },
    },
    {
      text: "Sales measure true success",
      style: { top: "35%", left: "5%" },
    },
    {
      text: "Human connection drives WA business",
      style: { top: "42%", right: "5%" },
    },
    {
      text: "The primary barrier to digital transformation is financial investment",
      style: { bottom: "18%", left: "5%", maxWidth: "236px" },
    },
  ];

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    // Animate blob first
    if (blobRef.current) {
      tl.fromTo(
        blobRef.current,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.8 }
      );
    }

    // Then animate labels with stagger
    labelsRef.current.forEach((label, index) => {
      if (label) {
        tl.fromTo(
          label,
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.5 },
          0.4 + index * 0.1
        );
      }
    });

    // Finally animate headline
    if (headlineRef.current) {
      tl.fromTo(
        headlineRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8 },
        0.8
      );
    }
  }, []);

  return (
    <main
      ref={containerRef}
      className="min-h-screen flex flex-col px-[20px] pb-8"
    >
      {/* AI Blob Section with Opinion Labels */}
      <div className="flex-1 flex items-center justify-center py-6 min-h-[400px]">
        <div className="relative w-full max-w-[350px] h-[400px]">
          {/* AI Blob - Centered */}
          <div
            ref={blobRef}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[274px] h-[290px]"
          >
            <Image
              src="/ai-blob.png"
              alt="AI visualization"
              width={274}
              height={290}
              priority
              className="w-full h-full object-contain"
            />
          </div>

          {/* Opinion Labels - Absolutely positioned as per Figma */}
          {opinions.map((opinion, index) => (
            <span
              key={index}
              ref={(el) => (labelsRef.current[index] = el)}
              className="absolute text-[12px] leading-[135%] tracking-[0.02em] text-[#FAFAFA] font-body"
              style={opinion.style}
            >
              {opinion.text}
            </span>
          ))}
        </div>
      </div>

      {/* Headline */}
      <h1
        ref={headlineRef}
        className="text-center text-[34px] leading-[120%] tracking-[0.01em] font-heading text-[#FAFAFA] px-4 mb-6"
      >
        Compare your thoughts on{" "}
        <span className="jb-text-gradient">technology</span> with current
        industry opinions.
      </h1>

      {/* CTA Button */}
      <div className="flex justify-center pb-6">
        <CTAButton onClick={() => router.push("/walkthrough")}>
          Get a reality check
        </CTAButton>
      </div>
    </main>
  );
}