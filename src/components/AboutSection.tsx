"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Zap, Star, Rocket } from "lucide-react";

const built = [
  {
    title: "AI Product Engineering",
    description: "Designing intelligent workflows and interactive product experiences",
  },
  {
    title: "System Architecture",
    description: "Building clean, scalable software foundations for real-world use",
  },
  {
    title: "Experience Design",
    description: "Combining performance, usability, and polished product thinking",
  },
];

export default function AboutSection() {
  const reduceMotion = useReducedMotion();

  const reveal = {
    initial: reduceMotion ? {} : { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-80px" },
    transition: { duration: 0.5 },
  };

  return (
    <section id="about" className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
        <motion.div {...reveal}>
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.25em] text-primary">
            About
          </p>
          <h2 className="mb-6 font-heading text-4xl font-black tracking-tight md:text-5xl">
            Hey, I&apos;m Monu.
          </h2>
          <div className="space-y-4 leading-relaxed text-muted-foreground">
            <p>
              I turn ideas into real, working products with a strong balance of
              product thinking, engineering discipline, and design clarity.
            </p>
            <p>
              My focus is on{" "}
              <span className="font-semibold text-primary">
                AI systems, RAG applications, agent workflows, and polished digital products
              </span>
              . I build experiences that are not only technically capable, but also intuitive, performant, and easy to trust.
            </p>
            <p className="flex items-center gap-2 border-t border-border pt-4 text-sm italic">
              <Rocket size={16} className="shrink-0 text-primary" aria-hidden="true" />
              Open to AI engineering, product engineering, and software design opportunities.
            </p>
          </div>
        </motion.div>

        <motion.div {...reveal} className="space-y-6">
          <div className="rounded-2xl border border-border bg-card p-6">
            <h3 className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary">
              <Zap size={15} aria-hidden="true" /> My WorkFLow
            </h3>
            <p className="text-sm leading-relaxed text-muted-foreground">
              I focus on architecture, decisions and product outcomes. The
              mechanics get moved fast so I can ship{" "}
              <span className="font-bold text-foreground">in hours</span>{" "}
              without sacrificing quality.
            </p>
          </div>

          <div className="rounded-2xl border border-border bg-card p-6">
            <h3 className="mb-4 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary">
              <Star size={15} aria-hidden="true" /> What I&apos;ve Built
            </h3>
            <ul className="space-y-3">
              {built.map((item) => (
                <li
                  key={item.title}
                  className="flex items-start gap-3 rounded-xl border border-border bg-secondary/40 p-3 text-sm"
                >
                  <span
                    className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary"
                    aria-hidden="true"
                  />
                  <span className="text-muted-foreground">
                    <span className="font-bold text-foreground">
                      {item.title}
                    </span>{" "}
                    — {item.description}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
