"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { AnimatePresence, motion } from "framer-motion";
import { Project } from "@/lib/github";
import ProjectModal from "@/components/ProjectModal";
import Scene from "./Scene";
import Overlay from "./Overlay";
import { buildJourney, chapterAt } from "./journey";

export default function Experience({
  projects,
  onExit,
}: {
  projects: Project[];
  onExit: () => void;
}) {
  const journey = useMemo(() => buildJourney(projects.length), [projects.length]);
  const progress = useRef(0);
  const [chapter, setChapter] = useState(0);
  const [active, setActive] = useState<Project | null>(null);
  const closeModal = useCallback(() => setActive(null), []);

  const maxScroll = () =>
    document.documentElement.scrollHeight - window.innerHeight;

  useEffect(() => {
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
    window.scrollTo(0, 0);
    progress.current = 0;

    const onScroll = () => {
      const max = maxScroll();
      const p = max > 0 ? Math.min(1, window.scrollY / max) : 0;
      progress.current = p;
      setChapter((prev) => {
        const next = chapterAt(journey, p);
        return next === prev ? prev : next;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [journey]);

  const navigate = useCallback((fraction: number) => {
    window.scrollTo({ top: fraction * maxScroll(), behavior: "smooth" });
  }, []);

  return (
    <div className="dark bg-[#050509] text-foreground">
      <div style={{ height: `${journey.pages * 100}vh` }} aria-hidden="true" />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="fixed inset-0"
      >
        <Canvas
          camera={{ position: [0, 0, 6], fov: 58, near: 0.1, far: 120 }}
          dpr={[1, 1.75]}
          gl={{ antialias: true, powerPreference: "high-performance" }}
        >
          <Scene
            progress={progress}
            journey={journey}
            projects={projects}
            onOpenProject={setActive}
          />
        </Canvas>
      </motion.div>

      <Overlay
        journey={journey}
        chapter={chapter}
        onNavigate={navigate}
        onExit={onExit}
      />

      <AnimatePresence>
        {active && <ProjectModal project={active} onClose={closeModal} />}
      </AnimatePresence>
    </div>
  );
}
