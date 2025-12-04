// src/app/layout.tsx

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { UserProvider } from "@/context/UserContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Juicebox Frontend Test",
  description: "Reality check onboarding flow",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Mobile viewport scaling control */}
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        />
      </head>

      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {/* ✅ Use the mobile-container class from globals.css */}
        <div className="mobile-container">
          <UserProvider>{children}</UserProvider>
        </div>
      </body>
    </html>
  );
}