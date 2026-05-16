"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, User, Zap, Rocket, Star } from "lucide-react";

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
  anchorRect?: DOMRect | null;
}

const AboutModal = ({ isOpen, onClose, anchorRect }: AboutModalProps) => {
  const getPosition = () => {
    if (!anchorRect) return { top: "50%", left: "50%", transform: "translate(-50%, -50%)" };

    const modalWidth = 400;
    const padding = 20;
    
    let left = anchorRect.right + padding;
    let top = anchorRect.top;

    if (left + modalWidth > window.innerWidth - padding) {
      left = anchorRect.left - modalWidth - padding;
    }

    left = Math.max(padding, left);

    const estimatedHeight = 500;
    if (top + estimatedHeight > window.innerHeight - padding) {
      top = window.innerHeight - estimatedHeight - padding;
    }
    top = Math.max(padding, top);

    return { top: `${top}px`, left: `${left}px`, transform: "none" };
  };

  const pos = getPosition();

  const modalStyle: React.CSSProperties = {
    position: "fixed",
    ...pos,
    width: "400px",
    maxWidth: "calc(100vw - 40px)",
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100]"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            style={modalStyle}
            className="z-[101]"
          >
            <div className="glass-card border-primary/20 bg-card/95 shadow-2xl overflow-hidden relative">
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 rounded-full bg-secondary hover:bg-primary hover:text-primary-foreground transition-all z-10"
              >
                <X size={18} />
              </button>

              <div className="p-6 md:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                    <User size={20} />
                  </div>
                  <div>
                    <h2 className="text-2xl font-outfit font-black tracking-tighter uppercase">
                      About <span className="text-primary italic">Me</span>
                    </h2>
                  </div>
                </div>

                <div className="space-y-4 text-foreground/80 leading-relaxed text-sm">
                  <p className="text-base text-foreground font-semibold">Hey, I'm Monu.</p>

                  <p>I take ideas and turn them into real, working products. Not in weeks — <span className="text-primary font-bold">in hours</span>.</p>

                  <p>I specialize in <span className="text-primary">React, Next.js and TypeScript</span>. I build experiences that feel good to use — smooth animations, responsive layouts, clean code.</p>

                  <div className="bg-secondary/20 p-4 rounded-xl border border-border/50">
                    <h3 className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider mb-2 text-primary">
                      <Zap size={14} /> My Philosophy
                    </h3>
                    <p className="text-xs">
                      I focus on architecture, decisions, and product outcomes. AI handles the boilerplate.
                      This lets me ship <span className="font-bold text-foreground">10x faster</span>.
                    </p>
                  </div>

                  <div>
                    <h3 className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider mb-3 text-primary">
                      <Star size={14} /> What I've Built
                    </h3>
                    <ul className="space-y-2">
                      {[
                        { title: "PulseBoard", desc: "Full-stack SaaS in 6h (GitHub/Clerk/Supabase)" },
                        { title: "Portfolio", desc: "Auto-updates from GitHub activity" },
                        { title: "Enterprise Redesigns", desc: "GSAP + Three.js" }
                      ].map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-[11px] p-2 rounded-lg bg-white/5 border border-white/5">
                          <span className="mt-1 w-1 h-1 rounded-full bg-primary shrink-0" />
                          <div>
                            <span className="font-bold text-foreground">{item.title}</span> — {item.desc}
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <p className="pt-3 border-t border-border/50 flex items-center gap-2 italic text-[11px] text-muted-foreground">
                    <Rocket size={14} className="text-primary" />
                    Looking for roles in Frontend, Full-Stack Development and AI Engineering
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default AboutModal;
