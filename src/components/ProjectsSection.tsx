"use client";

import React, { useCallback, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Project, isGeneratedImage } from "@/lib/github";
import ProjectModal from "@/components/ProjectModal";

function ProjectCard({
  project,
  index,
  onOpen,
}: {
  project: Project;
  index: number;
  onOpen: (project: Project) => void;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.article
      initial={reduceMotion ? {} : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, delay: (index % 2) * 0.1 }}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-colors duration-300 hover:border-primary/50"
    >
      <div className={`relative h-56 overflow-hidden bg-gradient-to-br ${project.color}`}>
        <Image
          src={project.image}
          alt={`Screenshot of ${project.title}`}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          priority={index < 2}
          unoptimized={isGeneratedImage(project.image)}
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          aria-hidden="true"
        />
      </div>

      <div className="flex flex-1 flex-col p-6">
        <p className="mb-2 text-xs font-bold uppercase tracking-widest text-primary">
          {project.category}
        </p>
        <h3 className="mb-3 font-heading text-2xl font-bold tracking-tight">
          <button
            onClick={() => onOpen(project)}
            className="cursor-pointer text-left after:absolute after:inset-0 after:content-['']"
          >
            {project.title}
          </button>
        </h3>
        <p className="mb-5 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
          {project.description}
        </p>

        <div className="mt-auto flex items-center justify-between gap-4">
          <ul className="flex flex-wrap gap-1.5" aria-label="Technologies used">
            {project.tech.slice(0, 3).map((tech) => (
              <li
                key={tech}
                className="rounded-full bg-secondary px-2.5 py-0.5 text-[11px] font-semibold text-secondary-foreground"
              >
                {tech}
              </li>
            ))}
          </ul>
          <span className="inline-flex shrink-0 items-center gap-1 text-xs font-bold text-primary">
            Case study
            <ArrowUpRight
              size={14}
              className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              aria-hidden="true"
            />
          </span>
        </div>
      </div>
    </motion.article>
  );
}

export default function ProjectsSection({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState<Project | null>(null);
  const close = useCallback(() => setActive(null), []);

  return (
    <section id="work" className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
      <div className="mb-12 flex items-end justify-between">
        <div>
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.25em] text-primary">
            Featured Work
          </p>
          <h2 className="font-heading text-4xl font-black tracking-tight md:text-5xl">
            Selected projects
          </h2>
        </div>
        <p className="hidden text-sm text-muted-foreground sm:block">
          {projects.length} projects
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {projects.map((project, i) => (
          <ProjectCard
            key={project.id}
            project={project}
            index={i}
            onOpen={setActive}
          />
        ))}
      </div>

      <AnimatePresence>
        {active && <ProjectModal project={active} onClose={close} />}
      </AnimatePresence>
    </section>
  );
}
