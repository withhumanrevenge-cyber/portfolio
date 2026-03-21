import React from "react";
import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import InteractiveHeroBackground from "@/components/InteractiveHeroBackground";
import FloatingParticles from "@/components/FloatingParticles";
import LightFollower from "@/components/LightFollower";
import CustomCursor from "@/components/CustomCursor";
import { ThemeProvider } from "@/components/ThemeProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  title: "Monu | Portfolio",
  description: "Personal portfolio of Monu, an Interactive Frontend Developer and UI Engineer specializing in high-performance web experiences.",
  keywords: ["Frontend Developer", "React Developer", "Next.js", "UI Engineer", "Web Animations", "GSAP", "Three.js", "Portfolio"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${outfit.variable} antialiased bg-background text-foreground transition-colors duration-500`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
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
