"use client";

import React from "react";

export default function Splash() {
  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center"
      style={{ background: "#050509" }}
      role="status"
      aria-label="Entering the 3D experience"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-50"
        style={{
          backgroundImage:
            "radial-gradient(1.5px 1.5px at 18% 24%, #fff, transparent)," +
            "radial-gradient(1.5px 1.5px at 72% 18%, #cbd5e1, transparent)," +
            "radial-gradient(1px 1px at 42% 62%, #fff, transparent)," +
            "radial-gradient(1.5px 1.5px at 84% 70%, #93c5fd, transparent)," +
            "radial-gradient(1px 1px at 30% 82%, #fff, transparent)," +
            "radial-gradient(1px 1px at 60% 40%, #e2e8f0, transparent)," +
            "radial-gradient(1.5px 1.5px at 12% 68%, #93c5fd, transparent)",
        }}
      />

      <div className="relative flex flex-col items-center gap-7">
        <div className="relative h-16 w-16">
          <span className="absolute inset-0 rounded-full border border-white/10" />
          <span className="absolute inset-0 animate-spin rounded-full border-t-2 border-[#60a5fa] motion-reduce:animate-none" />
          <span className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#60a5fa] shadow-[0_0_12px_#60a5fa]" />
        </div>

        <div className="text-center">
          <p className="font-heading text-3xl font-black tracking-tight text-white">
            MONU<span className="text-[#60a5fa]">.</span>
          </p>
          <p className="mt-2 text-[11px] font-bold uppercase tracking-[0.35em] text-white/50">
            Entering the universe…
          </p>
        </div>
      </div>
    </div>
  );
}
