
// src/app/(steps)/form/page.tsx

"use client";

import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import TextInput from "@/components/form/TextInput";
import CTAButton from "@/components/CTAButton";
import Header from "@/components/Header";
import SmallHexagon from "@/components/ui/SmallHexagon";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext";

export default function FormPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({ firstName: "", email: "" });
  const [errors, setErrors] = useState<{ firstName?: string; email?: string }>(
    {}
  );

  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const hexagonRef = useRef<HTMLDivElement>(null);
  const { setUserData } = useUser();

  useEffect(() => {
    // Animate form content
    if (formRef.current) {
      gsap.fromTo(
        formRef.current,
        { opacity: 0, x: 20 },
        { opacity: 1, x: 0, duration: 0.35, ease: "power2.out" }
      );
    }
    
    // Animate hexagon
    if (hexagonRef.current) {
      gsap.fromTo(
        hexagonRef.current,
        { opacity: 0, scale: 0.8, y: -10 },
        { opacity: 1, scale: 1, y: 0, duration: 0.5, ease: "back.out(1.7)" }
      );
    }
  }, [step]);

  const handleNext = () => {
    // Clear previous errors
    setErrors({});

    // Validate step 1 - First Name
    if (step === 1) {
      if (!formData.firstName.trim()) {
        setErrors({ firstName: "First name is required" });
        return;
      }
      setStep(2); // Move to next step
      return;
    }

    // Validate step 2 - Email
    if (step === 2) {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        setErrors({ email: "Enter a valid email" });
        return;
      }

      // Save to context
      setUserData({
        firstName: formData.firstName,
        email: formData.email,
      });

      // Navigate to confirmation (step 5)
      router.push("/results");
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    } else {
      router.back();
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header
        onReset={() => router.push("/")}
        showReset={false}
        showBack={true}
        onBack={handleBack}
      />

      <form
        ref={formRef}
        onSubmit={(e) => {
          e.preventDefault();
          handleNext();
        }}
        className="flex-1 flex flex-col px-[20px] pb-7"
      >
        {/* Form Content */}
        <div className="flex-1 flex flex-col items-center justify-center">
          {/* Small Hexagon at top - EXACTLY as in Figma */}
          <div 
            ref={hexagonRef}
            className="mb-12 flex justify-center"
          >
            <SmallHexagon size={32} />
          </div>

          {/* Step 1 - First Name */}
          {step === 1 && (
            <>
              <h2 className="text-[#FAFAFA] text-center mb-8 text-[18px] leading-[135%] tracking-[0.02em] font-body max-w-[320px]">
                Let's start with the basics. Type in your first name.
              </h2>
              <TextInput
                placeholder="First name"
                value={formData.firstName}
                onChange={(e) => {
                  setFormData({ ...formData, firstName: e.target.value });
                  setErrors({});
                }}
                error={errors.firstName}
                autoFocus
              />
            </>
          )}

          {/* Step 2 - Email */}
          {step === 2 && (
            <>
              <h2 className="text-[#FAFAFA] text-center mb-8 text-[18px] leading-[135%] tracking-[0.02em] font-body max-w-[320px]">
                How should we contact you? Type in your email address.
              </h2>
              <TextInput
                placeholder="Email address"
                type="email"
                value={formData.email}
                onChange={(e) => {
                  setFormData({ ...formData, email: e.target.value });
                  setErrors({});
                }}
                error={errors.email}
                autoFocus
              />
            </>
          )}
        </div>

        {/* CTA Button */}
        <div className="flex justify-center mt-8">
          <CTAButton type="submit">Continue</CTAButton>
        </div>
      </form>
    </div>
  );
}
