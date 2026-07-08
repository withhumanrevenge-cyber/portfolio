"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Compass, Zap, Rocket } from "lucide-react";

const steps = [
  {
    title: "Strategy",
    description:
      "Defining schema, auth flow and architecture decisions before a single line of code.",
    Icon: Compass,
  },
  {
    title: "Forge",
    description:
      "High-fidelity implementation at speed. Boilerplate moves fast so the important decisions get the time they deserve.",
    Icon: Zap,
  },
  {
    title: "Scale",
    description:
      "Instant deployment with CI/CD sync, edge-optimized delivery and Core Web Vitals in the green.",
    Icon: Rocket,
  },
];

export default function ProcessSection() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="process" className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
      <div className="mb-12">
        <p className="mb-2 text-sm font-semibold uppercase tracking-[0.25em] text-primary">
          Process
        </p>
        <h2 className="mb-3 font-heading text-4xl font-black tracking-tight md:text-5xl">
          How I build
        </h2>
        <p className="text-muted-foreground">
          Radical Application Development mindset.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {steps.map(({ title, description, Icon }, i) => (
          <motion.div
            key={title}
            initial={reduceMotion ? {} : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="group rounded-2xl border border-border bg-card p-8 transition-colors duration-300 hover:border-primary/50"
          >
            <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
              <Icon size={22} aria-hidden="true" />
            </div>
            <p className="mb-1 text-xs font-bold text-muted-foreground">
              0{i + 1}
            </p>
            <h3 className="mb-3 font-heading text-xl font-bold">{title}</h3>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
