"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, Github, Cpu, Lock, Zap, MousePointer2 } from "lucide-react";
import Image from "next/image";

interface ProjectModalProps {
  project: {
    id: number;
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
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10"
      >
        <div 
          className="absolute inset-0 bg-white/40 backdrop-blur-[20px] cursor-pointer"
          onClick={onClose}
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 30 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="relative w-full max-w-6xl h-[90vh] bg-white border border-black/5 rounded-[40px] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.1)] overflow-hidden flex flex-col md:flex-row"
        >
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 z-50 w-12 h-12 flex items-center justify-center rounded-full bg-black/5 hover:bg-black/10 transition-colors group"
          >
            <X size={20} className="group-hover:rotate-90 transition-transform duration-300" />
          </button>

          <div className="w-full md:w-1/2 h-1/3 md:h-full relative overflow-hidden bg-zinc-50 border-r border-black/5">
            <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-20`} />
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover md:object-contain p-4 md:p-12 scale-105"
            />
          </div>

          <div className="w-full md:w-1/2 h-2/3 md:h-full flex flex-col p-8 md:p-16 overflow-y-auto custom-scrollbar">
            <div className="mb-10">
              <span className="text-[10px] uppercase tracking-[0.3em] text-accent font-black mb-2 block">{project.category}</span>
              <h2 className="text-4xl md:text-6xl font-outfit font-black tracking-tighter mb-4">{project.title}</h2>
              <div className="flex gap-4 items-center">
                <a 
                  href={project.href} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="px-6 py-2.5 bg-black text-white rounded-full text-xs font-bold flex items-center gap-2 hover:bg-accent transition-colors"
                >
                  See it live <ExternalLink size={14} />
                </a>
                {project.github && (
                  <a 
                    href={project.github} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-2.5 border border-black/10 rounded-full hover:border-black transition-colors"
                  >
                    <Github size={18} />
                  </a>
                )}
              </div>
            </div>

            <div className="space-y-12">
              <section>
                <div className="flex items-center gap-2 mb-4">
                  <Cpu size={18} className="text-accent" />
                  <h4 className="text-xs uppercase tracking-widest font-black text-black/30">The Context</h4>
                </div>
                <p className="text-zinc-500 font-light leading-relaxed text-lg">
                  {project.description}
                </p>
              </section>

              <section>
                <div className="flex items-center gap-2 mb-4">
                  <Zap size={18} className="text-accent" />
                  <h4 className="text-xs uppercase tracking-widest font-black text-black/30">The Challenge</h4>
                </div>
                <p className="text-zinc-500 font-light leading-relaxed text-lg italic">
                  "{project.challenge}"
                </p>
              </section>

              <section>
                <div className="flex items-center gap-2 mb-6">
                   <LayoutGrid size={18} className="text-accent" />
                   <h4 className="text-xs uppercase tracking-widest font-black text-black/30">Selected Logic</h4>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {project.features.map((feature, i) => (
                    <div key={i} className="p-5 border border-black/5 rounded-2xl bg-zinc-50/50 hover:bg-white transition-colors group">
                       <p className="text-xs font-medium text-black/60 leading-snug">{feature}</p>
                    </div>
                  ))}
                </div>
              </section>

              <section className="pb-8">
                <div className="flex items-center gap-2 mb-6">
                   <Lock size={18} className="text-accent" />
                   <h4 className="text-xs uppercase tracking-widest font-black text-black/30">Protocol Stack</h4>
                </div>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((t, i) => (
                    <span key={i} className="px-5 py-2 glass-card border-black/5 text-[10px] font-bold tracking-widest uppercase text-black/40">
                      {t}
                    </span>
                  ))}
                </div>
              </section>
            </div>
          </div>
        </motion.div>
      </motion.div>
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
