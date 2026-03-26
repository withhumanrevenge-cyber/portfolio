"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, Github, Cpu, Lock, Zap, MousePointer2 } from "lucide-react";
import Image from "next/image";

interface ProjectModalProps {
  project: {
    id: number | string;
    title: string;
    category: string;
    image: string;
    color: string;
    href: string;
    github?: string;
    description: string;
    challenge: string;
    features: string[];
    tech: string[];
  } | null;
  onClose: () => void;
}

const ProjectModal = ({ project, onClose }: ProjectModalProps) => {
  if (!project) return null;

  return (
    <AnimatePresence>
      {project && (
        <div className="fixed inset-0 z-[100] pointer-events-none overflow-y-auto custom-scrollbar flex items-start justify-center pt-24 pb-24">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/5 backdrop-blur-[5px] cursor-pointer pointer-events-auto"
            onClick={onClose}
          />

          {/* The layoutId expansion will handle the "pop-up on the project" feel */}
          <motion.div
            layoutId={`card-${project.id}`}
            className="relative w-full max-w-2xl bg-white border border-black/5 rounded-[40px] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.1)] overflow-hidden flex flex-col pointer-events-auto z-[101] my-auto"
          >
            <div className="p-8 border-b border-black/5 flex justify-between items-center bg-white sticky top-0 z-[102]">
               <div className="flex flex-col text-left">
                  <span className="text-[10px] uppercase tracking-[0.3em] text-accent font-black mb-1">{project.category}</span>
                  <motion.h2 layoutId={`title-${project.id}`} className="text-xl font-outfit font-black tracking-tighter">{project.title}</motion.h2>
               </div>
               <button 
                  onClick={onClose}
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-black/5 hover:bg-black/10 transition-colors group"
               >
                  <X size={18} className="group-hover:rotate-90 transition-transform duration-300" />
               </button>
            </div>

            <div className="flex-1 p-8 text-left">
              <div className="rounded-[30px] overflow-hidden bg-zinc-50 border border-black/5 mb-10 relative aspect-[16/10]">
                <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-20`} />
                <motion.div layoutId={`image-${project.id}`} className="absolute inset-0">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    priority
                    className="object-cover md:object-contain p-6"
                  />
                </motion.div>
              </div>

              <div className="flex gap-4 items-center mb-12">
                <a 
                  href={project.href} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex-1 py-4 bg-black text-white rounded-[18px] text-[10px] uppercase tracking-widest font-bold flex items-center justify-center gap-2 hover:bg-accent transition-all active:scale-95"
                >
                  Protocol Link <ExternalLink size={14} />
                </a>
              </div>

              <div className="space-y-12">
                <section>
                  <div className="flex items-center gap-2 mb-4">
                    <Cpu size={16} className="text-accent" />
                    <h4 className="text-[10px] uppercase tracking-[0.2em] font-black text-black/30">Executive Summary</h4>
                  </div>
                  <p className="text-zinc-500 font-light leading-relaxed text-base">
                    {project.description}
                  </p>
                </section>

                <section>
                  <div className="flex items-center gap-2 mb-4">
                    <Zap size={16} className="text-accent" />
                    <h4 className="text-[10px] uppercase tracking-[0.2em] font-black text-black/30">Strategic Hurdles</h4>
                  </div>
                  <div className="p-8 bg-zinc-50/50 border border-black/5 rounded-[30px] border-l-accent border-l-2">
                    <p className="text-zinc-500 font-light leading-relaxed italic text-sm">
                      "{project.challenge}"
                    </p>
                  </div>
                </section>

                <section className="pb-8">
                  <div className="flex items-center gap-2 mb-4">
                     <Lock size={16} className="text-accent" />
                     <h4 className="text-[10px] uppercase tracking-[0.2em] font-black text-black/30">Tech Matrix</h4>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((t, i) => (
                      <span key={i} className="px-5 py-2.5 border border-black/5 bg-zinc-50/50 rounded-full text-[9px] font-black tracking-[0.1em] uppercase text-black/40">
                        {t}
                      </span>
                    ))}
                  </div>
                </section>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

const LayoutGrid = ({ size, className }: { size: number; className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <rect width="7" height="7" x="3" y="3" rx="1" />
    <rect width="7" height="7" x="14" y="3" rx="1" />
    <rect width="7" height="7" x="14" y="14" rx="1" />
    <rect width="7" height="7" x="3" y="14" rx="1" />
  </svg>
);

export default ProjectModal;
