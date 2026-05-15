"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Github, Linkedin, MessageCircle, Rocket, Cpu, Zap } from "lucide-react";
import PageTransition from "@/components/PageTransition";
import Footer from "@/components/Footer";
import DocumentationModal from "@/components/DocumentationModal";
import { BentoGrid, BentoItem } from "@/components/BentoGrid";
import { Button } from "@/components/ui/button";
import ThreeDPhotoCarousel from "@/components/ui/ThreeDPhotoCarousel";

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
  const [projects, setProjects] = React.useState<Project[]>(staticProjects);
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
      <main className="min-h-screen px-4 md:px-20 pt-24 pb-20 relative overflow-hidden">
        {/* Floating Text Background */}
        <div className="fixed top-1/2 left-0 w-full -translate-y-1/2 pointer-events-none select-none z-[-1] overflow-hidden opacity-20">
          <motion.h2
            initial={{ x: "100%" }}
            animate={{ x: "-100%" }}
            transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
            className="text-[20vw] lg:text-[30vw] font-outfit font-black text-white/[0.03] whitespace-nowrap leading-none"
          >
            BUILDING WITH AI + MODERN TOOLS
          </motion.h2>
        </div>

        {/* Navigation */}
        <nav className="fixed top-0 left-0 w-full p-6 md:p-8 flex justify-between items-center z-50 pointer-events-none">
          <div className="flex items-center gap-4 pointer-events-auto">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-xl md:text-2xl font-outfit font-black tracking-tighter glass-card px-6 py-2 border-border/50 bg-card/40 backdrop-blur-md shadow-2xl relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              MY <span className="text-primary italic">PORTFOLIO</span>
            </motion.div>

            <motion.button
              onClick={() => setIsDocsOpen(true)}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="hidden sm:block px-4 py-2 rounded-full border border-border/50 bg-card/40 backdrop-blur-md text-[10px] font-bold uppercase tracking-widest hover:bg-primary hover:text-primary-foreground transition-all"
            >
              Docs
            </motion.button>
          </div>
          
          <div className="flex items-center gap-6 pointer-events-auto">
            <div className="hidden lg:flex items-center gap-4 mr-4 border-r border-white/10 pr-6 h-6">
              {[
                { Icon: Github, href: "https://github.com/withhumanrevenge-cyber" },
                { Icon: Linkedin, href: "https://www.linkedin.com/in/monu-b92047282" },
                { Icon: MessageCircle, href: "https://wa.me/918870335035" }
              ].map(({ Icon, href }, idx) => (
                <a key={idx} href={href} target="_blank" rel="noopener noreferrer" className="text-foreground/40 hover:text-primary transition-all hover:scale-110">
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>
        </nav>

        {/* Bento Grid Hero */}
        <BentoGrid className="mb-20">
          <BentoItem
            className="md:col-span-4 md:row-span-2 min-h-[400px] flex flex-col justify-center"
            title={
              <div className="space-y-2">
                <span className="text-primary font-outfit text-sm tracking-widest uppercase font-semibold">
                  Full-Stack AI Engineer
                </span>
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-outfit font-black leading-tight tracking-tighter">
                  MONU <span className="text-primary italic"></span>
                </h1>
              </div>
            }
            description="Specializing in high-performance web architectures and AI-augmented development. Shipping production-ready software at radical velocity."
          >
            <div className="flex gap-4 p-6 pt-0">
              <Button asChild className="rounded-full font-bold px-8 py-6 text-lg hover:scale-105 transition-transform">
                <a href="#work">See Work <ArrowRight className="ml-2" /></a>
              </Button>
            </div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/2" />
          </BentoItem>

          <BentoItem
            className="md:col-span-2"
            title="Tech Stack"
            description="Core technologies I use to build scalable applications."
            icon={<Cpu size={24} />}
          >
            <div className="flex flex-wrap gap-2 p-6 pt-0">
              {["Next.js", "TypeScript", "Tailwind", "Supabase", "Clerk", "Framer Motion", "GSAP"].map((tag) => (
                <span key={tag} className="px-3 py-1 rounded-full bg-secondary/50 border border-border/50 text-[10px] font-bold uppercase tracking-wider">
                  {tag}
                </span>
              ))}
            </div>
          </BentoItem>

          <BentoItem
            className="md:col-span-2"
            title="Performance First"
            description="Sub-second delivery and optimized Core Web Vitals."
            icon={<Zap size={24} />}
          />

          <BentoItem
            className="md:col-span-2 md:row-span-2"
            title="About Me"
            description={
              <div className="space-y-4 text-sm leading-relaxed">
                <p>I take ideas and turn them into functional applications — with authentication, databases, and third-party APIs.</p>
                <p>My workflow focuses on radical efficiency using AI and modern primitives to bridge High-RPS architectures with beautiful UI.</p>
              </div>
            }
          />

          <BentoItem
            className="md:col-span-2"
            title="GitHub Activity"
            description="PulseBoard automatically tracks and verifies my technical mastery."
            icon={<Github size={24} />}
          >
            <div className="px-6 pb-6">
               <a href="https://github.com/withhumanrevenge-cyber" target="_blank" className="text-xs text-primary font-bold hover:underline">View Repositories →</a>
            </div>
          </BentoItem>

          <BentoItem
            className="md:col-span-2"
            title="Contact"
            description="Available for new opportunities and collaborations."
            icon={<MessageCircle size={24} />}
          >
             <div className="flex gap-4 px-6 pb-6">
                <a href="mailto:monuraj88703@gmail.com" className="hover:text-primary transition-colors"><Github size={18}/></a>
                <a href="https://www.linkedin.com/in/monu-b92047282" className="hover:text-primary transition-colors"><Linkedin size={18}/></a>
             </div>
          </BentoItem>
        </BentoGrid>

        {/* Workflow Section */}
        <section className="max-w-7xl mx-auto mb-40">
           <div className="mb-12">
              <h2 className="text-4xl md:text-6xl font-outfit font-black tracking-tighter uppercase mb-2">How I <span className="text-primary italic">Build</span>.</h2>
              <p className="text-muted-foreground italic">Radical Application Development mindset.</p>
           </div>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { title: "Strategy", desc: "Defining schema and auth flow before code.", icon: Cpu },
                { title: "AI-Forge", desc: "Parallel generation of high-fidelity logic.", icon: Zap },
                { title: "Scale", desc: "Instant deployment with CI/CD sync.", icon: Rocket }
              ].map((item, i) => (
                <div key={i} className="glass-card p-8 border-border/50 hover:border-primary/30 transition-all group">
                   <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                      <item.icon size={20} />
                   </div>
                   <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                   <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              ))}
           </div>
        </section>

        {/* Projects Section */}
        <section id="work" className="w-full overflow-hidden">
          <ThreeDPhotoCarousel projects={projects} />
        </section>

        <section id="contact" className="max-w-7xl mx-auto py-10">
           <div className="glass-card p-12 md:p-24 border-border/50 text-center relative overflow-hidden group">
              <h2 className="text-5xl md:text-8xl font-outfit font-black mb-12 tracking-tighter uppercase">
                Let's build something <span className="text-primary italic">meaningful</span>.
              </h2>
              <a href="mailto:monuraj88703@gmail.com" className="text-2xl md:text-4xl font-outfit font-bold hover:text-primary transition-colors underline underline-offset-[12px] decoration-primary/20">
                Gmail
              </a>
           </div>
        </section>
      </main>

      <Footer />
      <DocumentationModal 
        isOpen={isDocsOpen}
        onClose={() => setIsDocsOpen(false)}
      />
    </PageTransition>
  );
}
