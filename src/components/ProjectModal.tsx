"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Github, X, CheckCircle2 } from "lucide-react";
import { Project, isGeneratedImage } from "@/lib/github";

export default function ProjectModal({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    closeRef.current?.focus();
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = original;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm md:p-8"
      onClick={onClose}
    >
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-modal-title"
        initial={reduceMotion ? {} : { opacity: 0, y: 24, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 24, scale: 0.97 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="relative max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl border border-border bg-card shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          ref={closeRef}
          onClick={onClose}
          aria-label="Close project details"
          className="absolute right-4 top-4 z-10 inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-border bg-card/80 backdrop-blur-sm transition-colors duration-200 hover:text-primary"
        >
          <X size={18} />
        </button>

        <div className={`relative h-56 md:h-72 bg-gradient-to-br ${project.color}`}>
          <Image
            src={project.image}
            alt={`Screenshot of ${project.title}`}
            fill
            sizes="(max-width: 768px) 100vw, 768px"
            unoptimized={isGeneratedImage(project.image)}
            className="object-cover"
          />
        </div>

        <div className="p-6 md:p-10">
          <p className="mb-2 text-xs font-bold uppercase tracking-widest text-primary">
            {project.category}
          </p>
          <h3
            id="project-modal-title"
            className="mb-4 font-heading text-3xl font-black tracking-tight md:text-4xl"
          >
            {project.title}
          </h3>
          <p className="mb-8 leading-relaxed text-muted-foreground">
            {project.description}
          </p>

          <div className="mb-8 rounded-xl border border-border bg-secondary/40 p-5">
            <h4 className="mb-2 text-xs font-bold uppercase tracking-widest text-primary">
              The Challenge
            </h4>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {project.challenge}
            </p>
          </div>

          <div className="mb-8">
            <h4 className="mb-3 text-xs font-bold uppercase tracking-widest text-primary">
              Key Features
            </h4>
            <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {project.features.map((feature) => (
                <li key={feature} className="flex items-center gap-2 text-sm">
                  <CheckCircle2
                    size={15}
                    className="shrink-0 text-primary"
                    aria-hidden="true"
                  />
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          <ul className="mb-8 flex flex-wrap gap-2" aria-label="Technologies used">
            {project.tech.map((tech) => (
              <li
                key={tech}
                className="rounded-full border border-border bg-secondary px-3 py-1 text-xs font-semibold text-secondary-foreground"
              >
                {tech}
              </li>
            ))}
          </ul>

          <div className="flex flex-col gap-3 sm:flex-row">
            <a
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-bold text-primary-foreground transition-opacity duration-200 hover:opacity-90"
            >
              View live project
              <ArrowUpRight size={16} aria-hidden="true" />
            </a>
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-border bg-card px-6 py-3 text-sm font-bold transition-colors duration-200 hover:border-primary/50 hover:text-primary"
              >
                <Github size={16} aria-hidden="true" />
                Repository
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
