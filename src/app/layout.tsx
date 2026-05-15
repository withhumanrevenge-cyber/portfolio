import React from "react";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import InteractiveHeroBackground from "@/components/InteractiveHeroBackground";
import FloatingParticles from "@/components/FloatingParticles";
import LightFollower from "@/components/LightFollower";
import CustomCursor from "@/components/CustomCursor";
import { ThemeProvider } from "@/components/ThemeProvider";
import { FractalDotGrid } from "@/components/ui/bg-animated-fractal-dot-grid";
import { cn } from "@/lib/utils";

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
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
    <html lang="en" suppressHydrationWarning className={cn("font-sans", geistSans.variable, geistMono.variable)}>
      <body
        className={`antialiased bg-background text-foreground transition-colors duration-500`}
      >
        <ThemeProvider
          attribute="class"
          forcedTheme="light"
          disableTransitionOnChange
        >
          <div className="fixed inset-0 z-[-1] pointer-events-none">
            <FractalDotGrid
              dotSize={5.5}
              dotSpacing={13}
              dotOpacity={0.3}
              waveIntensity={60}
              waveRadius={300}
              dotColor="rgba(107, 76, 65, 0.15)"
              glowColor="rgba(107, 76, 65, 0.3)"
              enableNoise={true}
              noiseOpacity={0.02}
              enableMouseGlow={true}
              initialPerformance="medium"
            />
          </div>
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
