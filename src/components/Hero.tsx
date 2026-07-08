"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ArrowDown, FileDown } from "lucide-react";

const stack = [
  "Next.js",
  "React",
  "TypeScript",
  "Tailwind",
  "Supabase",
  "Framer Motion",
];

export default function Hero() {
  const reduceMotion = useReducedMotion();

  const fadeUp = (delay: number) => ({
    initial: reduceMotion ? {} : { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, delay, ease: "easeOut" as const },
  });

  return (
    <section className="relative overflow-hidden pb-24 pt-36 md:pb-32 md:pt-44">
      <div
        className="bg-grid absolute inset-0 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_20%,black,transparent)]"
        aria-hidden="true"
      />
      <div
        className="absolute left-1/2 top-0 h-[420px] w-[720px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/15 blur-[120px]"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div
          {...fadeUp(0)}
          className="mb-8 inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-xs font-medium text-muted-foreground"
        >
          <span className="relative flex h-2 w-2" aria-hidden="true">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75 motion-reduce:animate-none" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
          </span>
          Available for new opportunities
        </motion.div>

        <motion.p
          {...fadeUp(0.1)}
          className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-primary"
        >
          Monu · Full-Stack Engineer
        </motion.p>

        <motion.h1
          {...fadeUp(0.2)}
          className="mb-6 max-w-4xl font-heading text-4xl font-black leading-[1.05] tracking-tight sm:text-6xl md:text-7xl"
        >
          I turn ideas into working products —{" "}
          <span className="text-primary">in hours, not weeks.</span>
        </motion.h1>

        <motion.p
          {...fadeUp(0.3)}
          className="mb-10 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg"
        >
          Specializing in high-performance web architectures with React,
          Next.js and TypeScript. Shipping production-ready software in hours,
          not weeks.
        </motion.p>

        <motion.div {...fadeUp(0.4)} className="mb-14 flex flex-wrap gap-4">
          <a
            href="#work"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3 text-sm font-bold text-primary-foreground transition-opacity duration-200 hover:opacity-90"
          >
            See my work
            <ArrowRight size={16} aria-hidden="true" />
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-7 py-3 text-sm font-bold transition-colors duration-200 hover:border-primary/50 hover:text-primary"
          >
            Get in touch
            <ArrowDown size={16} aria-hidden="true" />
          </a>
          <a
            href="/monu_resume.pdf"
            download
            className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-7 py-3 text-sm font-bold transition-colors duration-200 hover:border-primary/50 hover:text-primary"
          >
            Resume
            <FileDown size={16} aria-hidden="true" />
          </a>
        </motion.div>

        <motion.ul
          {...fadeUp(0.5)}
          className="flex flex-wrap gap-2"
          aria-label="Core technologies"
        >
          {stack.map((tech) => (
            <li
              key={tech}
              className="rounded-full border border-border bg-secondary px-3 py-1 text-xs font-semibold text-secondary-foreground"
            >
              {tech}
            </li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
