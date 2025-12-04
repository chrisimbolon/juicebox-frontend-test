"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { useRouter } from "next/navigation";
import Image from "next/image";
import aiBlob from "/ai-blob.png"; // moved to /public
import { Button } from "@/components/ui/button";

export default function HomePage() {
  const router = useRouter();
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const labelsRef = useRef<(HTMLSpanElement | null)[]>([]);
  const blobRef = useRef<HTMLImageElement>(null);

  const opinions = [
    { text: "WA businesses feel confident about future growth", position: "top-left" },
    { text: "AI can't replace creativity", position: "top-right" },
    { text: "Sales measure true success", position: "left" },
    { text: "Human connection drives WA business", position: "right" },
    { text: "The primary barrier to digital transformation is financial investment", position: "bottom-left" },
  ];

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    labelsRef.current.forEach((label, index) => {
      if (label) {
        tl.fromTo(label, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.5 }, 0.3 + index * 0.1);
      }
    });

    if (headlineRef.current) {
      tl.fromTo(headlineRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8 }, 0.6);
    }
  }, []);

  return (
    <main className="min-h-screen flex flex-col px-5 pb-8">
      <div className="flex-1 flex items-center justify-center py-6 min-h-[400px]">
        <div className="relative w-full max-w-[350px] h-[350px]">
          <div className="absolute inset-0 flex items-center justify-center">
            <Image ref={blobRef} src={aiBlob} alt="AI visualization" width={180} height={180} />
          </div>

          {opinions.map((opinion, index) => (
            <span
              key={index}
              ref={(el) => (labelsRef.current[index] = el)}
              className={`absolute text-[12px] text-foreground`}
            >
              {opinion.text}
            </span>
          ))}
        </div>
      </div>

      <h1 ref={headlineRef} className="text-center text-xl">
        Compare your thoughts on <span className="jb-text-gradient">technology</span> with people in your industry.
      </h1>

      <div className="flex justify-center py-6">
        <Button onClick={() => router.push("/walkthrough")}>Get a reality check</Button>
      </div>
    </main>
  );
}
