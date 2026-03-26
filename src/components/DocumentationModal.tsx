"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Rocket, Server, Zap, Cpu } from "lucide-react";

interface DocumentationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const DocumentationModal = ({ isOpen, onClose }: DocumentationModalProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] pointer-events-none">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/5 backdrop-blur-[5px] cursor-pointer pointer-events-auto"
            onClick={onClose}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="absolute top-24 left-6 md:left-24 w-full max-w-xl bg-white border border-black/5 rounded-[40px] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] overflow-hidden flex flex-col pointer-events-auto"
          >
            <div className="p-8 border-b border-black/5 flex justify-between items-center bg-white sticky top-0 z-50">
               <div className="flex flex-col">
                  <span className="text-[10px] uppercase tracking-[0.4em] text-accent font-black mb-1">Architecture</span>
                  <h2 className="text-xl font-outfit font-black tracking-tighter uppercase">Protocol</h2>
               </div>
               <button 
                  onClick={onClose}
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-black/5 hover:bg-black/10 transition-colors group"
               >
                  <X size={18} className="group-hover:rotate-90 transition-transform duration-300" />
               </button>
            </div>

            <div className="flex-1 overflow-y-auto px-8 py-10 custom-scrollbar">
                <div className="space-y-16">
                  <section>
                    <div className="flex items-center gap-3 mb-6">
                      <Rocket size={18} className="text-accent" />
                      <h4 className="text-[10px] uppercase tracking-[0.3em] font-black text-black/30">Objective</h4>
                    </div>
                    <p className="text-zinc-500 font-light leading-relaxed text-base italic border-l-2 border-accent/20 pl-6">
                      Engineered for high-density interaction with a focus on performant rendering and modern primitives.
                    </p>
                  </section>

                  <section>
                    <div className="flex items-center gap-3 mb-8">
                      <Server size={18} className="text-accent" />
                      <h4 className="text-[10px] uppercase tracking-[0.3em] font-black text-black/30">Synchronicity</h4>
                    </div>
                    <div className="p-8 border border-black/5 bg-zinc-50/50 rounded-[30px] space-y-4">
                      <h5 className="text-xs font-bold uppercase tracking-widest text-black/60">Pipeline</h5>
                      <p className="text-zinc-500 font-light leading-relaxed text-sm">
                        Asynchronous synchronization with GitHub REST API, featuring production-grade failovers and schema validation.
                      </p>
                    </div>
                  </section>

                  <section>
                    <div className="flex items-center gap-3 mb-8">
                      <Zap size={18} className="text-accent" />
                      <h4 className="text-[10px] uppercase tracking-[0.3em] font-black text-black/30">Dynamics</h4>
                    </div>
                    <div className="p-6 border border-black/5 rounded-[24px] bg-zinc-50/10">
                      <h6 className="font-bold text-[10px] mb-2 uppercase tracking-widest">Rendering</h6>
                      <p className="text-xs text-zinc-400 leading-relaxed">Hardware-accelerated CSS filters and Framer Motion orchestrations.</p>
                    </div>
                  </section>

                  <section className="pb-8">
                    <div className="flex items-center gap-3 mb-8">
                      <Cpu size={18} className="text-accent" />
                      <h4 className="text-[10px] uppercase tracking-[0.3em] font-black text-black/30">Manifest</h4>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {["Next.js 15", "TypeScript", "TailwindCSS", "GSAP", "Framer Motion"].map((tech, i) => (
                        <span key={i} className="px-5 py-2.5 border border-black/5 bg-black text-white rounded-full text-[9px] font-bold tracking-[0.1em] uppercase">
                          {tech}
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

export default DocumentationModal;
