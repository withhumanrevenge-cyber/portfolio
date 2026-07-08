"use client";

import React from "react";
import { Orbit } from "lucide-react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ProjectsSection from "@/components/ProjectsSection";
import ProcessSection from "@/components/ProcessSection";
import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import { Project } from "@/lib/github";

export default function ClassicSite({
  projects,
  onEnterWorld,
}: {
  projects: Project[];
  onEnterWorld?: () => void;
}) {
  return (
    <div id="top">
      <a
        href="#work"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-bold focus:text-primary-foreground"
      >
        Skip to content
      </a>
      <Navbar />
      <main>
        <Hero />
        <ProjectsSection projects={projects} />
        <ProcessSection />
        <AboutSection />
        <ContactSection />
      </main>
      <Footer />

      {onEnterWorld && (
        <button
          onClick={onEnterWorld}
          className="fixed bottom-6 right-6 z-50 inline-flex cursor-pointer items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-bold text-primary-foreground shadow-2xl shadow-primary/30 transition-opacity duration-200 hover:opacity-90"
        >
          <Orbit size={17} aria-hidden="true" />
          Enter the 3D world
        </button>
      )}
    </div>
  );
}
