"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Play, LayoutGrid, Camera, Film, Github, Linkedin, MessageCircle, Rocket, Cpu } from "lucide-react";
import PageTransition from "@/components/PageTransition";
import TiltCard from "@/components/TiltCard";
import Footer from "@/components/Footer";
import ProjectModal from "@/components/ProjectModal";
import DocumentationModal from "@/components/DocumentationModal";

import Image from "next/image";

import { fetchGitHubProjects, Project } from "@/lib/github";

const staticProjects: Project[] = [
  {
    id: 4,
    title: "PulseBoard",
    category: "Next.js / TypeScript / WebSockets",
    image: "/pulseboard_highlight.png",
    color: "from-zinc-900/40 to-slate-500/40",
    href: "https://pulseboard-wheat.vercel.app/",
    github: "https://github.com/withhumanrevenge-cyber",
    description: "Real-time reputation engine for automated work verification. Implements deep integration with GitHub SCM to generate cryptographically signed technical mastery scores.",
    challenge: "Engineered sub-millisecond synchronization between commit streams and reputation scoring without blocking the main thread or introducing UI lag.",
    features: ["Real-time scoring engine", "Verified identity protocol", "Talent indexing system", "Edge-optimized console"],
    tech: ["Next.js 15", "Edge Runtime", "Clerk", "WebSockets"]
  },
  {
    id: 1,
    title: "Interactive Playground",
    category: "TypeScript / Canvas / GSAP",
    image: "/playground_highlight.png",
    color: "from-blue-600/40 to-purple-600/40",
    href: "https://interactiveplayground0fmine.vercel.app/",
    description: "High-fidelity UI engineering laboratory focused on physics-based motion primitives and complex gesture handling. Zero-abstraction approach to interaction design.",
    challenge: "Implementation of fluid state morphing logic combined with physics-informed drag resistance for organic interface feedback.",
    features: ["Physics-informed gestures", "Complex state morphing", "SVG animation engine", "Motion primitives"],
    tech: ["Framer Motion", "GSAP", "Tailwind CSS", "Canvas API"]
  },
  {
    id: 2,
    title: "Kasper Infotech Redesign",
    category: "React / Architecture / Performance",
    image: "/kasper_highlight.png",
    color: "from-orange-600/40 to-red-600/40",
    href: "https://redesignofkasperinfotech.vercel.app/",
    description: "Architectural overhaul for a software agency, shifting from legacy templates to a custom, performance-first system designed for infrastructure-heavy narratives.",
    challenge: "Optimizing layout hierarchy and typographic density while maintaining a minimalist aesthetic in a content-heavy environment.",
    features: ["Performance-first layout", "System visualizers", "Scaling narratives", "Resilient components"],
    tech: ["Next.js App Router", "Framer Motion", "Vercel SDK", "CSS Primitives"]
  },
  {
    id: 3,
    title: "My Skills",
    category: "WebGL / Three.js / React Fiber",
    image: "/myskills_highlight.png",
    color: "from-emerald-600/40 to-teal-600/40",
    href: "https://myskills-topaz.vercel.app/",
    description: "Immersive WebGL experiment leveraging 3D fragments for technical storytelling. Focuses on bridging High-RPS web architectures with heavy GPU-accelerated rendering.",
    challenge: "Isolation of expensive 3D logic to prevent main-thread blocking during high-velocity scrolling interactions.",
    features: ["Raw WebGL rendering", "Isolated 3D fragments", "Physics-informed motion", "GPU-first pipeline"],
    tech: ["Three.js", "React Three Fiber", "WebGL", "Motion Engine"]
  }
];

export default function Home() {
  const [viewMode, setViewMode] = React.useState<"grid" | "list">("list");
  const [projects, setProjects] = React.useState<Project[]>(staticProjects);
  const [ghProjects, setGhProjects] = React.useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = React.useState<Project | null>(null);
  const [isDocsOpen, setIsDocsOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    (async () => {
      try {
        const ghProjects = await fetchGitHubProjects();
        if (ghProjects.length > 0) {
          const uniqueGh = ghProjects.filter(gh => 
            !staticProjects.some(st => st.title.toLowerCase() === gh.title.toLowerCase())
          );
          setProjects([...staticProjects, ...uniqueGh]);
        }
      } catch (err) {
        console.error("Sync Error:", err);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

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
            BUILDING WITH AI + MODERN TOOLS
          </motion.h2>
        </div>
        <nav className="fixed top-0 left-0 w-full p-8 flex justify-between items-center z-50">
          <div className="flex items-center gap-4">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-2xl font-outfit font-black tracking-tighter glass-card px-8 py-3 border-white/10 dark:border-white/5 bg-white/5 backdrop-blur-md shadow-2xl relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              MY <span className="text-accent italic">PORTFOLIO</span>
            </motion.div>

            <motion.button
              onClick={() => setIsDocsOpen(true)}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="px-6 py-3 rounded-full border border-black/5 bg-white/40 backdrop-blur-md text-[10px] font-bold uppercase tracking-widest hover:bg-black hover:text-white transition-all interactive"
            >
              Documentation
            </motion.button>
          </div>
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
                Building Full-Stack Apps with AI + Modern Tools
              </h2>
              <h1 className="text-6xl md:text-8xl lg:text-9xl font-outfit font-black leading-[0.9] tracking-tighter">
                <span className="text-muted/20 hover:text-foreground transition-all duration-700 cursor-default">MONU</span>
              </h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-6 text-sm md:text-base text-muted/60 font-light max-w-xl leading-relaxed italic border-l-2 border-accent/20 pl-6"
              >
                Built with AI. Shipped fast
              </motion.p>
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
                I build things that <span className="text-accent italic">actually</span> work.
              </h3>
              <div className="space-y-6 text-lg text-muted font-light leading-relaxed">
                <p>
                  I take ideas and turn them into <span className="text-foreground font-semibold">real, functional applications</span> — with authentication, databases, and third-party APIs. I use modern tools (<span className="text-foreground font-semibold">Next.js, TypeScript, Supabase</span>) and AI to ship fast.
                </p>
                <p>
                  My portfolio <span className="text-accent font-semibold italic underline decoration-accent/30 underline-offset-4">automatically updates from GitHub</span>. Every project here is real, deployed, and working.
                </p>
                <div className="pt-4 border-l-4 border-accent/20 pl-6 py-2 bg-accent/5 rounded-r-lg">
                  <p className="text-sm font-medium text-foreground/80 uppercase tracking-widest mb-2">Recent Build</p>
                  <p className="text-base text-foreground/70 italic">
                    <span className="text-foreground font-semibold not-italic">PulseBoard</span> — a full-stack SaaS that connects to GitHub API, handles auth with Clerk, and stores data in Supabase. <span className="text-accent font-bold">Built in 6 hours.</span>
                  </p>
                </div>
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
                  title: "Performance",
                  desc: "Sub-second delivery and optimized Core Web Vitals. Performance is the core architectural foundation.",
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

        <section id="build" className="max-w-7xl mx-auto mb-60 px-4 sm:px-0">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-4">
            <div>
              <h3 className="text-accent text-sm font-black uppercase tracking-[0.3em] mb-4">Workflow</h3>
              <h2 className="text-5xl md:text-7xl font-outfit font-black tracking-tighter uppercase leading-[0.9]">
                How I <span className="text-accent italic">Build</span>.
              </h2>
            </div>
            <p className="text-muted max-w-sm text-lg font-light italic border-l-2 border-accent/20 pl-6 py-2">
              From zero to production in hours. Leveraging AI and the modern stack for radical efficiency.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Strategy / Architecture",
                desc: "Defined by utility. I outline the core database schema (Supabase), auth flow (Clerk), and API protocols before any code is generated.",
                icon: "Cpu"
              },
              {
                step: "02",
                title: "AI-Augmented Forge",
                desc: "Parallel generation of high-fidelity frontend and performant serverless logic. I guide the AI, focusing on the refined UX and edge-case resilience.",
                icon: "Zap"
              },
              {
                step: "03",
                title: "CI/CD Deployment",
                desc: "RAD (Rapid Application Development) mindset. Instant deployment to Vercel with automatic GitHub sync. Built for scale and ready to be used today.",
                icon: "Rocket"
              }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2, duration: 0.8 }}
                viewport={{ once: true }}
                className="group relative glass-card p-10 border-glass-border hover:border-accent transition-all duration-500"
              >
                <div className="absolute top-0 right-0 p-6 text-6xl font-outfit font-black text-foreground/[0.03] group-hover:text-accent/10 transition-colors pointer-events-none">
                  {item.step}
                </div>
                <div className="w-14 h-14 bg-accent/10 rounded-2xl flex items-center justify-center mb-8 text-accent group-hover:bg-accent group-hover:text-white transition-all duration-500 shadow-xl shadow-accent/5">
                  {item.icon === "Cpu" && <Cpu size={24} />}
                  {item.icon === "Zap" && <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-zap"><path d="M4 14.5a1.5 1.5 0 0 1-1.5-1.5 1.5 1.5 0 0 1 1.5-1.5h1.5l1.5-6.5a1.5 1.5 0 0 1 1.5-1.5 1.5 1.5 0 0 1 1.5 1.5L9 11.5h1.5a1.5 1.5 0 0 1 1.5 1.5 1.5 1.5 0 0 1-1.5 1.5h-1.5l-1.5 6.5a1.5 1.5 0 0 1-1.5 1.5 1.5 1.5 0 0 1-1.5-1.5L13 14.5z"/></svg>}
                  {item.icon === "Rocket" && <Rocket size={24} />}
                </div>
                <h4 className="text-2xl font-bold mb-4 tracking-tighter">{item.title}</h4>
                <p className="text-muted text-sm leading-relaxed font-light">{item.desc}</p>
              </motion.div>
            ))}
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
              <motion.div 
                layoutId={`card-${project.id}`}
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
                      <motion.div layoutId={`image-${project.id}`} className="absolute inset-0 w-full h-full">
                        <Image
                          src={project.image}
                          alt={project.title}
                          fill
                          priority
                          sizes="(max-width: 768px) 100vw, 50vw"
                          className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-110"
                        />
                      </motion.div>
                    </div>

                    <div className={`${viewMode === "grid" ? "absolute inset-0 pointer-events-none" : "relative flex-1 p-8 md:p-12 flex flex-col justify-center"}`}>
                      {viewMode === "grid" && <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />}

                        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 md:gap-0">
                          <div>
                            <span className="text-[10px] md:text-xs uppercase tracking-widest text-accent font-bold mb-1 md:mb-2 block">{project.category}</span>
                            <motion.h4 layoutId={`title-${project.id}`} className={`${viewMode === "grid" ? "text-2xl md:text-3xl" : "text-3xl md:text-5xl"} font-outfit font-bold`}>{project.title}</motion.h4>
                          </div>
                          <div className="w-10 h-10 md:w-14 md:h-14 bg-accent/10 md:bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-accent/20 md:border-white/20 md:-translate-y-4 md:opacity-40 md:group-hover:opacity-100 md:group-hover:translate-y-0 transition-all duration-500 interactive">
                            <ArrowRight className="-rotate-45" size={18} />
                          </div>
                        </div>
                    </div>
                  </motion.div>
                </TiltCard>
              </motion.div>
            ))}
            {isLoading && (
              <div className="col-span-full py-20 flex flex-col items-center justify-center gap-4 text-muted">
                <div className="w-12 h-12 border-4 border-accent/20 border-t-accent rounded-full animate-spin" />
                <p className="font-outfit text-sm tracking-widest uppercase">Fetching GitHub repositories...</p>
              </div>
            )}
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

      </main>
      <Footer />
      <ProjectModal 
        project={selectedProject} 
        onClose={() => setSelectedProject(null)} 
      />

      <DocumentationModal 
        isOpen={isDocsOpen}
        onClose={() => setIsDocsOpen(false)}
      />
    </PageTransition>
  );
}
