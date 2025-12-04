"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import Image from "next/image";
import Header from "@/components/Header";
import CTAButton from "@/components/CTAButton";


interface HomePageProps {
  onGetStarted: () => void;
  onReset: () => void;
}

const opinions = [
  { text: "WA businesses feel confident about future growth", position: "top-left" },
  { text: "AI cant replace creativity", position: "top-right" },
  { text: "Sales measure true success", position: "left" },
  { text: "Human connection drives WA business", position: "right" },
  { text: "The primary barrier to digital transformation is financial investment", position: "bottom-left" },
];

const HomePage = ({ onGetStarted, onReset }: HomePageProps) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);
  const labelsRef = useRef<(HTMLSpanElement | null)[]>([]);
  const blobRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    if (blobRef.current) {
      tl.fromTo(
        blobRef.current,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 1 },
        0
      );
    }

    labelsRef.current.forEach((label, index) => {
      if (label) {
        tl.fromTo(
          label,
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.5 },
          0.3 + index * 0.1
        );
      }
    });

    if (headlineRef.current) {
      tl.fromTo(
        headlineRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8 },
        0.6
      );
    }

    if (buttonRef.current) {
      tl.fromTo(
        buttonRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6 },
        0.8
      );
    }
  }, []);

  const getPositionStyles = (position: string) => {
    const styles: Record<string, string> = {
      "top-left": "top-[5%] left-0",
      "top-right": "top-[15%] right-0 text-right",
      "left": "top-[45%] left-0",
      "right": "top-[55%] right-0 text-right",
      "bottom-left": "bottom-[5%] left-0",
    };
    return styles[position] || "";
  };

  return (
    <div className="min-h-screen jb-bg-gradient flex flex-col overflow-auto">
      <Header onReset={onReset} showReset={false} />

      <main ref={contentRef} className="flex-1 flex flex-col px-5 pb-8">
        <div className="flex-1 flex items-center justify-center py-6 min-h-[400px]">
          <div className="relative w-full max-w-[350px] h-[350px]">
            <div
              ref={blobRef}
              className="absolute inset-0 flex items-center justify-center"
            >
              <Image
                src="/assets/ai-blob.png"
                alt="AI visualization"
                width={274}
                height={290}
                className="object-contain"
                priority
                />
            </div>

            {opinions.map((opinion, index) => (
              <span
                key={index}
                ref={(el) => { labelsRef.current[index] = el;}}
                className={`absolute text-[12px] leading-[1.35] tracking-[0.02em] text-foreground max-w-[140px] opacity-0
                  ${getPositionStyles(opinion.position)}`}
              >
                {opinion.text}
              </span>
            ))}
          </div>
        </div>

        <div className="space-y-6 pb-4">
          <h1
            ref={headlineRef}
            className="text-[22px] sm:text-[24px] font-normal text-center leading-[1.35] tracking-[0.02em] text-foreground"
          >
            Compare your thoughts on{" "}
            <span className="jb-text-gradient">technology</span>{" "}
            with current industry opinions.
          </h1>

          <div ref={buttonRef} className="flex justify-center">
            <CTAButton
              onClick={onGetStarted}
              aria-label="Get a reality check - Start the assessment"
            >
              Get a reality check
            </CTAButton>
          </div>
        </div>
      </main>
    </div>
  );
};

export default HomePage;
