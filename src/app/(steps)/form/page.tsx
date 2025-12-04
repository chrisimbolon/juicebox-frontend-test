// src/app/(steps)/form/page.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import TextInput from "@/components/form/TextInput";
import CTAButton from "@/components/CTAButton";
import Header from "@/components/Header";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext"; 

export default function FormPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({ firstName: "", email: "" });
  const [errors, setErrors] = useState<{ firstName?: string; email?: string }>({});

  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const { setUserData } = useUser(); 

  useEffect(() => {
    if (formRef.current) {
      gsap.fromTo(
        formRef.current, 
        { opacity: 0, x: 20 }, 
        { opacity: 1, x: 0, duration: 0.35 }
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

      
      setUserData({
        firstName: formData.firstName,
        email: formData.email,
      });

      // Navigate to results
      router.push("/results");
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header onReset={() => router.push("/")} showReset={false} showBack={true} onBack={() => {
        if (step > 1) {
          setStep(step - 1);
        } else {
          router.back();
        }
      }} />

      <form
        ref={formRef}
        onSubmit={(e) => {
          e.preventDefault();
          handleNext();
        }}
        className="flex-1 flex flex-col px-5 pb-7"
      >
        <div className="flex-1 flex flex-col items-center pt-8">
          {step === 1 && (
            <>
              <h2 className="text-white text-center mb-8 text-lg">
                Let's start with the basics. Type in your first name.
              </h2>
              <TextInput
                placeholder="First name"
                value={formData.firstName}
                onChange={(e) => {
                  setFormData({ ...formData, firstName: e.target.value });
                  setErrors({}); // Clear error on change
                }}
                error={errors.firstName}
              />
            </>
          )}

          {step === 2 && (
            <>
              <h2 className="text-white text-center mb-8 text-lg">
                How should we contact you? Type in your email address.
              </h2>
              <TextInput
                placeholder="Email address"
                type="email"
                value={formData.email}
                onChange={(e) => {
                  setFormData({ ...formData, email: e.target.value });
                  setErrors({}); // Clear error on change
                }}
                error={errors.email}
              />
            </>
          )}
        </div>

        <div className="flex justify-center mt-8">
          <CTAButton type="submit">Continue</CTAButton>
        </div>
      </form>
    </div>
  );
}