"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, Linkedin, ChevronDown, LayoutList, FileDown } from "lucide-react";
import { Journey } from "./journey";

export default function Overlay({
  journey,
  chapter,
  onNavigate,
  onExit,
}: {
  journey: Journey;
  chapter: number;
  onNavigate: (fraction: number) => void;
  onExit: () => void;
}) {
  const current = journey.chapters[chapter];

  return (
    <div className="pointer-events-none fixed inset-0 z-40">
      <div className="flex items-center justify-between p-5 sm:p-6">
        <p className="pointer-events-auto font-heading text-lg font-black tracking-tight text-foreground">
          MONU<span className="text-primary">.</span>
        </p>
        <div className="pointer-events-auto flex items-center gap-2">
          <a
            href="https://github.com/withhumanrevenge-cyber"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub profile"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card/60 text-muted-foreground backdrop-blur-sm transition-colors duration-200 hover:text-primary"
          >
            <Github size={17} />
          </a>
          <a
            href="https://www.linkedin.com/in/monu-b92047282"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn profile"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card/60 text-muted-foreground backdrop-blur-sm transition-colors duration-200 hover:text-primary"
          >
            <Linkedin size={17} />
          </a>
          <a
            href="/monu_resume_v2.pdf"
            download
            aria-label="Download resume"
            className="inline-flex h-10 cursor-pointer items-center gap-2 rounded-full border border-border bg-card/60 px-4 text-xs font-bold text-muted-foreground backdrop-blur-sm transition-colors duration-200 hover:text-primary"
          >
            <FileDown size={15} aria-hidden="true" />
            <span className="hidden sm:inline">Resume</span>
          </a>
          <button
            onClick={onExit}
            aria-label="Switch to classic 2D view"
            title="Classic view"
            className="inline-flex h-10 cursor-pointer items-center gap-2 rounded-full border border-border bg-card/60 px-4 text-xs font-bold text-muted-foreground backdrop-blur-sm transition-colors duration-200 hover:text-primary"
          >
            <LayoutList size={15} aria-hidden="true" />
            <span className="hidden sm:inline">Classic view</span>
          </button>
        </div>
      </div>

      <nav
        aria-label="Journey chapters"
        className="pointer-events-auto fixed right-4 top-1/2 -translate-y-1/2 sm:right-6"
      >
        <ul className="flex flex-col gap-4">
          {journey.chapters.map((ch, i) => (
            <li key={ch.id}>
              <button
                onClick={() => onNavigate(ch.fraction)}
                aria-label={`Go to ${ch.label}`}
                aria-current={i === chapter ? "step" : undefined}
                className="group flex cursor-pointer items-center justify-end gap-2"
              >
                <span className="hidden text-[10px] font-bold uppercase tracking-widest text-muted-foreground opacity-0 transition-opacity duration-200 group-hover:opacity-100 sm:inline">
                  {ch.label}
                </span>
                <span
                  className={`block rounded-full transition-all duration-300 ${
                    i === chapter
                      ? "h-2.5 w-2.5 bg-primary"
                      : "h-2 w-2 bg-muted-foreground/40 group-hover:bg-muted-foreground"
                  }`}
                />
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <div className="fixed bottom-6 left-5 sm:left-6" aria-live="polite">
        <AnimatePresence mode="wait">
          {chapter > 0 && (
            <motion.p
              key={current.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
              className="text-[11px] font-bold uppercase tracking-[0.3em] text-muted-foreground"
            >
              {current.title}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {chapter === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed bottom-6 left-1/2 flex -translate-x-1/2 flex-col items-center gap-1 text-muted-foreground"
          >
            <span className="text-[10px] font-bold uppercase tracking-[0.3em]">
              Scroll to explore
            </span>
            <ChevronDown
              size={16}
              className="animate-bounce motion-reduce:animate-none"
              aria-hidden="true"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
