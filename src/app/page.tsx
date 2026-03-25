"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Play, LayoutGrid, Camera, Film, Github, Linkedin, MessageCircle } from "lucide-react";
import PageTransition from "@/components/PageTransition";
import TiltCard from "@/components/TiltCard";
import Footer from "@/components/Footer";
import ProjectModal from "@/components/ProjectModal";

import Image from "next/image";

const projects = [
  {
    id: 4,
    title: "PulseBoard",
    category: "Next.js / TypeScript / Framer Motion",
    image: "/pulseboard_highlight.png",
    color: "from-zinc-900/30 to-slate-500/30",
    href: "https://pulseboard-wheat.vercel.app/",
    github: "https://github.com/withhumanrevenge-cyber",
    description: "PulseBoard is a real-time developer reputation engine. I built it to solve the problem of manual work verification. It syncs with your code history in real-time, so your technical mastery is always up-to-date and cryptographically signed.",
    challenge: "My biggest hurdle was the sub-millisecond synchronization. I had to ensure the reputation engine could handle high-frequency commit data without any lag on the client side.",
    features: ["Live reputation scoring", "Verified identity protocol", "Searchable talent directory", "Edge-deployed Access Console"],
    tech: ["Next.js", "Edge Computing", "Clerk Auth", "Real-time WebSockets"]
  },
  {
    id: 1,
    title: "Interactive Playground",
    category: "TypeScript / Canvas / GSAP",
    image: "/playground_highlight.png",
    color: "from-blue-600/30 to-purple-600/30",
    href: "https://interactiveplayground0fmine.vercel.app/",
    description: "This project is my personal lab for high-fidelity UI engineering. It's a collection of micro-interactions that focus on how an interface should *feel* when you touch or click it. No shortcuts, just pure physics and motion logic.",
    challenge: "The hardest part was making the state transitions feel fluid. I spent a lot of time on the physics-based drag-resistance and the morphing logic between loading and success states.",
    features: ["Physics-based gesture handling", "Complex state morphing", "SVG-driven animation DNA", "Theme-synced motion primitives"],
    tech: ["Framer Motion", "GSAP", "Tailwind CSS", "React Engine"]
  },
  {
    id: 2,
    title: "Kasper Infotech Redesign",
    category: "React / HTML5 / CSS3",
    image: "/kasper_highlight.png",
    color: "from-orange-600/30 to-red-600/30",
    href: "https://redesignofkasperinfotech.vercel.app/",
    description: "A full architectural redesign for a high-end software agency. I wanted to move away from generic corporate templates and create something that reflected their focus on complex, distributed systems and infrastructure resilience.",
    challenge: "Balancing technical density with a minimalist aesthetic. I had to communicate the idea of 'high-concurrency software' using only clean typography and layout hierarchy.",
    features: ["Engineering-focused layout", "Distributed system visualizers", "Scaling metrics narrative", "Resilient component architecture"],
    tech: ["Next.js App Router", "Framer Motion", "Minimalist CSS Primitives", "Vercel"]
  },
  {
    id: 3,
    title: "My Skills",
    category: "Tech Stack / Core Expertise",
    image: "/myskills_highlight.png",
    color: "from-emerald-600/30 to-teal-600/30",
    href: "https://myskills-topaz.vercel.app/",
    description: "Fragments is an immersive scrollytelling experiment. It's a journey through my technical engine, where I use WebGL to render complex 3D objects as you scroll. It's a showcase of how 3D can coexist with a fast, modern web app.",
    challenge: "Isolating the heavy 3D logic. I had to ensure the Three.js fragments didn't block the main thread, keeping the scrolling experience buttery smooth while pushing millions of vertices.",
    features: ["Raw WebGL Scrollytelling", "Isolated 3D Fragments", "Physics-informed Motion DNA", "Performance-first Rendering"],
    tech: ["Three.js", "WebGL", "React Three Fiber", "Motion Engine"]
  }
];

export default function Home() {
  const [viewMode, setViewMode] = React.useState<"grid" | "list">("list");
  const [selectedProject, setSelectedProject] = React.useState<typeof projects[0] | null>(null);

  return (
    <PageTransition>
      <main className="min-h-screen px-6 md:px-20 pt-32 pb-20 relative overflow-hidden">
        <div className="fixed top-1/2 left-0 w-full -translate-y-1/2 pointer-events-none select-none z-[-1] overflow-hidden">
          <motion.h2
            initial={{ x: "100%" }}
            animate={{ x: "-100%" }}
            transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
            className="text-[20vw] lg:text-[30vw] font-outfit font-black text-foreground/[0.03] dark:text-white/[0.02] whitespace-nowrap leading-none transition-opacity duration-1000"
          >
            INTERACTIVE FRONTEND ENGINEERING
          </motion.h2>
        </div>
        <nav className="fixed top-0 left-0 w-full p-8 flex justify-between items-center z-50">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-2xl font-outfit font-black tracking-tighter glass-card px-8 py-3 border-white/10 dark:border-white/5 bg-white/5 backdrop-blur-md shadow-2xl relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            MY <span className="text-accent italic">PORTFOLIO</span>
          </motion.div>
          <div className="flex items-center gap-6">
            <div className="hidden lg:flex items-center gap-4 mr-4 border-r border-black/10 pr-6 h-6">
              {[
                { Icon: Github, href: "https://github.com/withhumanrevenge-cyber" },
                { Icon: Linkedin, href: "https://www.linkedin.com/in/monu-b92047282" },
                { Icon: MessageCircle, href: "https://wa.me/918870335035" }
              ].map(({ Icon, href }, idx) => (
                <a key={idx} href={href} target="_blank" rel="noopener noreferrer" className="text-foreground/40 hover:text-accent transition-all hover:scale-110">
                  <Icon size={18} />
                </a>
              ))}
            </div>
            <div className="hidden md:flex gap-8 items-center text-sm font-medium tracking-widest uppercase">
              {["Work", "About", "Contact"].map((item) => (
                <a key={item} href={`#${item.toLowerCase()}`} className="hover:text-accent transition-colors font-bold">
                  {item}
                </a>
              ))}
            </div>
          </div>
          <div className="md:hidden flex items-center gap-4">
            <a href="#work" className="text-[10px] font-black uppercase tracking-widest bg-accent text-white px-4 py-2 rounded-full">Work</a>
          </div>
        </nav>

        <section className="max-w-7xl mx-auto mb-40">
          <div className="flex flex-col gap-8">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              <h2 className="text-accent font-outfit text-xl mb-4 tracking-widest uppercase font-semibold">
                Interactive Frontend Developer
              </h2>
              <h1 className="text-6xl md:text-8xl lg:text-9xl font-outfit font-black leading-[0.9] tracking-tighter">
                <span className="text-muted/20 hover:text-foreground transition-all duration-700 cursor-default">MONU</span>
              </h1>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 mt-8"
            >
              <a href="#work" className="px-8 py-4 bg-accent text-white rounded-full font-bold flex items-center justify-center gap-2 hover:scale-105 transition-transform interactive text-sm sm:text-base">
                See My Work <ArrowRight size={18} />
              </a>
              <a href="mailto:monuraj88703@gmail.com" className="px-8 py-4 glass-card border-glass-border rounded-full font-bold flex items-center justify-center gap-2 hover:bg-white/10 transition-colors interactive text-sm sm:text-base">
                Get In Touch <ArrowRight size={18} />
              </a>
            </motion.div>
          </div>
        </section>

        <section id="about" className="max-w-7xl mx-auto mb-60">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h3 className="text-5xl font-outfit font-black mb-8 leading-tight">
                Architecting <span className="text-accent italic">Digital</span> Resiliency.
              </h3>
              <div className="space-y-6 text-lg text-muted font-light leading-relaxed">
                <p>
                  As an <span className="text-foreground font-semibold">Interactive Frontend Developer</span>, I don't just build websites; I engineer experiences that bridge the gap between high-end design and high-performance logic. My journey began with an obsession for how things move and feel on the web.
                </p>
                <p>
                  I specialize in the <span className="text-foreground font-semibold">React ecosystem</span>, leveraging <span className="text-foreground font-semibold">Next.js</span> for speed, <span className="text-foreground font-semibold">TypeScript</span> for safety, and <span className="text-foreground font-semibold">GSAP/Framer Motion</span> for fluid story-telling.
                </p>
                <p>
                  For me, every pixel is an opportunity for interaction, and every line of code is a commitment to performance and scalability. I am dedicated to pushing the boundaries of what is possible within a browser.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-8 mt-12">
                <div>
                  <h4 className="text-accent text-sm font-black uppercase tracking-widest mb-2">Location</h4>
                  <p className="text-foreground text-lg">India, Global Remote</p>
                </div>
                <div>
                  <h4 className="text-accent text-sm font-black uppercase tracking-widest mb-2">Education</h4>
                  <p className="text-foreground text-lg">Computer Science Graduate</p>
                </div>
              </div>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  title: "Performance First",
                  desc: "Sub-second load times and optimized Core Web Vitals are not optional; they are the foundation.",
                  icon: "Zap"
                },
                {
                  title: "Motion Strategy",
                  desc: "Intentional animations that guide user focus and enhance storytelling without distractions.",
                  icon: "Play"
                },
                {
                  title: "Clean Architecture",
                  desc: "Writing scalable, maintainable, and type-safe code that stands the test of time and scale.",
                  icon: "ShieldCheck"
                },
                {
                  title: "User Centric",
                  desc: "Deeply understanding user behavior to create intuitive, accessible, and delightful interfaces.",
                  icon: "LayoutGrid"
                }
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="glass-card p-8 border-glass-border hover:border-accent group transition-all duration-500"
                >
                  <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-accent group-hover:text-white transition-colors duration-500 text-accent">
                    {item.icon === "Zap" && <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-zap"><path d="M4 14.5a1.5 1.5 0 0 1-1.5-1.5 1.5 1.5 0 0 1 1.5-1.5h1.5l1.5-6.5a1.5 1.5 0 0 1 1.5-1.5 1.5 1.5 0 0 1 1.5 1.5L9 11.5h1.5a1.5 1.5 0 0 1 1.5 1.5 1.5 1.5 0 0 1-1.5 1.5h-1.5l-1.5 6.5a1.5 1.5 0 0 1-1.5 1.5 1.5 1.5 0 0 1-1.5-1.5L13 14.5z"/></svg>}
                    {item.icon === "Play" && <Play size={24} />}
                    {item.icon === "ShieldCheck" && <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-shield-check"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.5 3.8 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/></svg>}
                    {item.icon === "LayoutGrid" && <LayoutGrid size={24} />}
                  </div>
                  <h5 className="text-xl font-bold mb-3">{item.title}</h5>
                  <p className="text-muted text-sm leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section id="work" className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h3 className="text-4xl font-outfit font-bold mb-2">Projects / Works</h3>
              <p className="text-muted italic">A showcase of technical expertise across frontend engineering.</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setViewMode("list")}
                className={`w-12 h-12 glass-card flex items-center justify-center rounded-full interactive transition-all scale-110 bg-accent text-white shadow-xl shadow-accent/20`}
              >
                <Film size={20} />
              </button>
            </div>
          </div>

          <div className={`grid gap-8 relative z-[2] transition-all duration-700 ${viewMode === "grid" ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"}`}>
            {projects.map((project, index) => (
              <div 
                key={project.id} 
                className="block cursor-pointer"
                onClick={() => setSelectedProject(project)}
              >
                <TiltCard>
                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.8 }}
                    viewport={{ once: true }}
                    className={`group relative overflow-hidden rounded-[30px] glass-card transition-all duration-500 ${viewMode === "grid" ? "h-[500px]" : "min-h-[300px] flex flex-col md:flex-row-reverse gap-4 md:gap-0 items-stretch"}`}
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />

                    <div className={viewMode === "list" ? "w-full md:w-[45%] h-64 md:min-h-[300px] overflow-hidden relative" : "absolute inset-0 w-full h-full"}>
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        priority
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-110"
                      />
                    </div>

                    <div className={`${viewMode === "grid" ? "absolute inset-0 pointer-events-none" : "relative flex-1 p-8 md:p-12 flex flex-col justify-center"}`}>
                      {viewMode === "grid" && <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />}

                        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 md:gap-0">
                          <div>
                            <span className="text-[10px] md:text-xs uppercase tracking-widest text-accent font-bold mb-1 md:mb-2 block">{project.category}</span>
                            <h4 className={`${viewMode === "grid" ? "text-2xl md:text-3xl" : "text-3xl md:text-5xl"} font-outfit font-bold`}>{project.title}</h4>
                          </div>
                          <div className="w-10 h-10 md:w-14 md:h-14 bg-accent/10 md:bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-accent/20 md:border-white/20 md:-translate-y-4 md:opacity-40 md:group-hover:opacity-100 md:group-hover:translate-y-0 transition-all duration-500 interactive">
                            <ArrowRight className="-rotate-45" size={18} />
                          </div>
                        </div>
                    </div>
                  </motion.div>
                </TiltCard>
              </div>
            ))}
          </div>
        </section>

        <section id="contact" className="max-w-7xl mx-auto py-40">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="glass-card p-12 md:p-24 border-glass-border text-center relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
            
            <h3 className="text-accent text-sm font-black uppercase tracking-[0.3em] mb-6">Available for new opportunities</h3>
            <h2 className="text-5xl md:text-8xl font-outfit font-black mb-12 tracking-tighter uppercase">
              Let's build something <span className="text-accent italic">meaningful</span> together.
            </h2>
            
            <div className="flex flex-col items-center gap-8">
              <div className="flex flex-col md:flex-row gap-6 md:gap-12 items-center relative z-10">
                <a 
                  href="mailto:monuraj88703@gmail.com" 
                  className="text-2xl md:text-4xl font-outfit font-bold text-foreground hover:text-accent transition-colors duration-500 underline underline-offset-[12px] decoration-foreground/10 hover:decoration-accent"
                >
                  Gmail
                </a>
                <span className="hidden md:block text-foreground/20 text-4xl font-thin">|</span>
                <a 
                  href="https://www.linkedin.com/in/monu-b92047282" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-2xl md:text-4xl font-outfit font-bold text-foreground hover:text-accent transition-colors duration-500 underline underline-offset-[12px] decoration-foreground/10 hover:decoration-accent"
                >
                  LinkedIn
                </a>
              </div>
              
              <div className="flex gap-4 mt-8">
                <a href="#work" className="px-12 py-5 bg-accent text-white rounded-full font-black text-sm uppercase tracking-widest hover:scale-105 transition-transform active:scale-95 interactive">
                  View My Portfolio
                </a>
              </div>
            </div>

            <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
          </motion.div>
        </section>

        <div className="fixed top-32 right-6 md:right-20 flex flex-col gap-4 glass-card p-6 border-white/5 backdrop-blur-xl z-40 group hover:border-accent/40 transition-all duration-500">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 rounded-full bg-accent animate-[pulse_2s_infinite] shadow-[0_0_15px_rgba(var(--accent-rgb),0.5)]" />
            <div className="text-[10px] tracking-[0.3em] uppercase font-bold text-foreground/40">Capability Matrix</div>
          </div>
          {[
            { label: "REACT", width: 95 },
            { label: "NEXT.JS", width: 90 },
            { label: "TYPESCRIPT", width: 85 }
          ].map((skill, i) => (
            <div key={i} className="flex flex-col gap-1.5">
              <div className="flex justify-between items-center text-[9px] font-mono tracking-tighter">
                <span className="text-foreground/30">0{i + 1}_{skill.label}</span>
                <span className="text-accent/60">{skill.width}%</span>
              </div>
              <div className="w-32 md:w-48 h-[2px] bg-foreground/5 overflow-hidden rounded-full">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.width}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5, delay: 0.5 + (i * 0.2), ease: "circOut" }}
                  className="h-full bg-accent shadow-[0_0_10px_rgba(var(--accent-rgb),0.3)]"
                />
              </div>
            </div>
          ))}
          <div className="mt-2 pt-2 border-t border-foreground/5 flex justify-between items-center">
             <div className="text-[8px] font-mono text-foreground/20 uppercase tracking-widest">System Status</div>
             <div className="text-[8px] font-mono text-accent uppercase animate-pulse">Optimal</div>
          </div>
        </div>
      </main>
      <Footer />
      <ProjectModal 
        project={selectedProject} 
        onClose={() => setSelectedProject(null)} 
      />
    </PageTransition>
  );
}
