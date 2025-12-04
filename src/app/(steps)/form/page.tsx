// src/app/(steps)/form/page.tsx
"use client";

import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import TextInput from "@/components/form/TextInput";
import CTAButton from "@/components/CTAButton";
import { useUser } from "@/context/UserContext";

type FormData = {
  firstName: string;
  email: string;
};

export default function FormPage() {
  const { userData, setUserData } = useUser();
  const [step, setStep] = useState<number>(1);
  const [formData, setFormData] = useState<FormData>({ firstName: userData.firstName || "", email: userData.email || "" });
  const [errors, setErrors] = useState<{ firstName?: string; email?: string }>({});
  const containerRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const router = useRouter();
  const totalSteps = 2;

  useEffect(() => {
    if (formRef.current) {
      gsap.fromTo(formRef.current, { opacity: 0, x: 20 }, { opacity: 1, x: 0, duration: 0.4, ease: "power2.out" });
    }
  }, [step]);

  const validateStep = (): boolean => {
    const newErrors: typeof errors = {};
    if (step === 1) {
      if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
      else if (formData.firstName.trim().length < 2) newErrors.firstName = "First name must be at least 2 characters";
    }
    if (step === 2) {
      if (!formData.email.trim()) newErrors.email = "Email address is required";
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = "Please enter a valid email address";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (!validateStep()) return;
    if (step < totalSteps) {
      setStep((s) => s + 1);
      return;
    }
    // finish
    setUserData(formData);
    router.push("/results");
  };

  const handleBack = () => {
    if (step > 1) {
      setStep((s) => s - 1);
      setErrors({});
    } else {
      router.back();
    }
  };

  const handleInputChange = (field: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((p) => ({ ...p, [field]: e.target.value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleNext();
    }
  };

  return (
    <div ref={containerRef} className="min-h-screen bg-background flex flex-col">
      <Header onReset={() => router.push("/")} showBack={step > 1} onBack={handleBack} />

      <main className="flex-1 flex flex-col px-5 pb-7">
        <form ref={formRef} className="flex-1 flex flex-col" onSubmit={(e) => { e.preventDefault(); handleNext(); }}>
          <div className="flex-1 flex flex-col items-center pt-8">
            {step === 1 && (
              <div className="w-full max-w-[350px] space-y-8">
                <div className="flex justify-center">
                  <div className="w-3 h-3 rounded-full" style={{ background: "linear-gradient(135deg, #FFD700 0%, #FFA500 100%)" }} />
                </div>

                <div className="text-center">
                  <p className="text-foreground text-[16px] leading-[1.5] tracking-[0.02em]">
                    Let's start with the basics. Type in your first name.
                  </p>
                </div>

                <TextInput
                  placeholder="First name"
                  value={formData.firstName}
                  onChange={handleInputChange("firstName")}
                  onKeyDown={handleKeyDown}
                  error={errors.firstName}
                  autoFocus
                  autoComplete="given-name"
                />
              </div>
            )}

            {step === 2 && (
              <div className="w-full max-w-[350px] space-y-8">
                <div className="flex justify-center">
                  <div className="w-3 h-3 rounded-full" style={{ background: "linear-gradient(135deg, #FFD700 0%, #FFA500 100%)" }} />
                </div>

                <div className="text-center space-y-2">
                  <p className="text-foreground text-[16px] leading-[1.5] tracking-[0.02em]">
                    How should we contact you? Type in your email address.
                  </p>
                  <p className="text-muted-foreground text-[14px] leading-[1.5] tracking-[0.02em]">
                    Thanks, {formData.firstName}! Now, it's time to get a reality check.
                  </p>
                  <p className="text-muted-foreground text-[14px] leading-[1.5] tracking-[0.02em]">
                    This will take 2-3 minutes.
                  </p>
                </div>

                <TextInput
                  type="email"
                  placeholder="Email address"
                  value={formData.email}
                  onChange={handleInputChange("email")}
                  onKeyDown={handleKeyDown}
                  error={errors.email}
                  autoFocus
                  autoComplete="email"
                />
              </div>
            )}
          </div>

          <div className="flex justify-center mt-8">
            <CTAButton type="submit">Continue</CTAButton>
          </div>
        </form>
      </main>
    </div>
  );
}
