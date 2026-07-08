"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { Project } from "@/lib/github";
import ClassicSite from "@/components/ClassicSite";
import Splash from "@/components/experience/Splash";

const Experience = dynamic(() => import("@/components/experience/Experience"), {
  ssr: false,
  loading: () => <Splash />,
});

function canRunWorld(): boolean {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return false;
  }
  try {
    const canvas = document.createElement("canvas");
    return !!(canvas.getContext("webgl2") || canvas.getContext("webgl"));
  } catch {
    return false;
  }
}

export default function WorldGate({ projects }: { projects: Project[] }) {
  const [decided, setDecided] = useState(false);
  const [capable, setCapable] = useState(false);
  const [mode, setMode] = useState<"world" | "classic">("world");

  useEffect(() => {
    setCapable(canRunWorld());
    setDecided(true);
  }, []);

  if (decided && capable && mode === "world") {
    return <Experience projects={projects} onExit={() => setMode("classic")} />;
  }

  return (
    <>
      <ClassicSite
        projects={projects}
        onEnterWorld={decided && capable ? () => setMode("world") : undefined}
      />
      {!decided && <Splash />}
    </>
  );
}
