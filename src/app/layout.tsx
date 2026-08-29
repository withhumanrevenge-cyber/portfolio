import React from "react";
import type { Metadata } from "next";
import { Archivo, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
});

export const metadata: Metadata = {
  title: "Monu | AI Engineer",
  description:
    "Portfolio of Monu — building AI-powered solutions with modern tooling. High-performance web experiences with React, Next.js and TypeScript.",
  keywords: [
    "AI Engineer",
    "Next.js",
    "React",
    "TypeScript",
    "Portfolio",
  ],
  openGraph: {
    title: "Monu | AI Engineer",
    description:
      "Building AI-powered solutions with modern tooling. Shipping production-ready software.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${archivo.variable} ${spaceGrotesk.variable}`}
    >
      <body className="bg-background font-sans text-foreground antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
