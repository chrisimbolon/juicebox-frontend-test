"use client";

import { useRouter } from "next/navigation";
import HomePage from "@/components/pages/HomePage";

export default function Page() {
  const router = useRouter();

  return (
    <HomePage
      onGetStarted={() => router.push("/walkthrough")}
      onReset={() => router.push("/")}
    />
  );
}
