import React from "react";
import type { Metadata } from "next";
import { Hanken_Grotesk, Instrument_Sans } from "next/font/google";
import "./globals.css";
import InteractiveHeroBackground from "@/components/InteractiveHeroBackground";
import FloatingParticles from "@/components/FloatingParticles";
import LightFollower from "@/components/LightFollower";
import CustomCursor from "@/components/CustomCursor";
import { ThemeProvider } from "@/components/ThemeProvider";

const bodyFont = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-inter",
});

const headlineFont = Hanken_Grotesk({
  subsets: ["latin"],
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  title: "Monu | Full-Stack AI Engineer",
  description: "Personal portfolio of Monu, Building Full-Stack Apps with AI + Modern Tools. Specializing in high-performance web experiences.",
  keywords: ["AI Engineer", "Full-Stack Developer", "Next.js", "Supabase", "UI Engineer", "Web Animations", "GSAP", "Three.js", "Portfolio"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${bodyFont.variable} ${headlineFont.variable} antialiased bg-background text-foreground transition-colors duration-500`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          forcedTheme="light"
          disableTransitionOnChange
        >
          <InteractiveHeroBackground />
          <FloatingParticles />
          <LightFollower />
          <CustomCursor />
          <div className="relative z-10">
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
