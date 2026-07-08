import React from "react";
import WorldGate from "@/components/WorldGate";
import { fetchGitHubProjects, normalizeRepo, Project } from "@/lib/github";

export const revalidate = 600;

const staticProjects: Project[] = [
  {
    id: 4,
    title: "PulseBoard",
    category: "Next.js / TypeScript / WebSockets",
    image: "/pulseboard_highlight.png",
    color: "from-zinc-900/40 to-slate-500/40",
    href: "https://pulse-board-woad.vercel.app/",
    github: "https://github.com/withhumanrevenge-cyber/PulseBoard",
    description:
      "Real-time reputation engine for automated work verification. Implements deep integration with GitHub SCM to generate cryptographically signed technical mastery scores.",
    challenge:
      "Engineered sub-millisecond synchronization between commit streams and reputation scoring without blocking the main thread or introducing UI lag.",
    features: [
      "Real-time scoring engine",
      "Verified identity protocol",
      "Talent indexing system",
      "Edge-optimized console",
    ],
    tech: ["Next.js 15", "Edge Runtime", "Clerk", "WebSockets"],
  },
  {
    id: 1,
    title: "Interactive Playground",
    category: "TypeScript / Canvas / GSAP",
    image: "/playground_highlight.png",
    color: "from-blue-600/40 to-purple-600/40",
    href: "https://interactiveplayground0fmine.vercel.app/",
    github: "https://github.com/withhumanrevenge-cyber/interactiveplayground0fmine",
    description:
      "High-fidelity UI engineering laboratory focused on physics-based motion primitives and complex gesture handling. Zero-abstraction approach to interaction design.",
    challenge:
      "Implementation of fluid state morphing logic combined with physics-informed drag resistance for organic interface feedback.",
    features: [
      "Physics-informed gestures",
      "Complex state morphing",
      "SVG animation engine",
      "Motion primitives",
    ],
    tech: ["Framer Motion", "GSAP", "Tailwind CSS", "Canvas API"],
  },
  {
    id: 2,
    title: "Kasper Infotech Redesign",
    category: "React / Architecture / Performance",
    image: "/kasper_highlight.png",
    color: "from-orange-600/40 to-red-600/40",
    href: "https://redesignofkasperinfotech.vercel.app/",
    github: "https://github.com/withhumanrevenge-cyber/redesignofkasperinfotech",
    description:
      "Architectural overhaul for a software agency, shifting from legacy templates to a custom, performance-first system designed for infrastructure-heavy narratives.",
    challenge:
      "Optimizing layout hierarchy and typographic density while maintaining a minimalist aesthetic in a content-heavy environment.",
    features: [
      "Performance-first layout",
      "System visualizers",
      "Scaling narratives",
      "Resilient components",
    ],
    tech: ["Next.js App Router", "Framer Motion", "Vercel SDK", "CSS Primitives"],
  },
  {
    id: 3,
    title: "My Skills",
    category: "WebGL / Three.js / React Fiber",
    image: "/myskills_highlight.png",
    color: "from-emerald-600/40 to-teal-600/40",
    href: "https://myskills-lemon.vercel.app/",
    github: "https://github.com/withhumanrevenge-cyber/myskills",
    description:
      "Immersive WebGL experiment leveraging 3D fragments for technical storytelling. Focuses on bridging High-RPS web architectures with heavy GPU-accelerated rendering.",
    challenge:
      "Isolation of expensive 3D logic to prevent main-thread blocking during high-velocity scrolling interactions.",
    features: [
      "Raw WebGL rendering",
      "Isolated 3D fragments",
      "Physics-informed motion",
      "GPU-first pipeline",
    ],
    tech: ["Three.js", "React Three Fiber", "WebGL", "Motion Engine"],
  },
];

export default async function Home() {
  const { projects: ghProjects, repoUrls } = await fetchGitHubProjects();

  const liveStatic = repoUrls
    ? staticProjects.filter(
        (p) => !p.github || repoUrls.has(normalizeRepo(p.github))
      )
    : staticProjects;

  const seenRepos = new Set(liveStatic.map((p) => normalizeRepo(p.github)));
  const seenTitles = new Set(liveStatic.map((p) => p.title.toLowerCase()));

  const uniqueGh = ghProjects.filter((gh) => {
    const repo = normalizeRepo(gh.github);
    if (repo && seenRepos.has(repo)) return false;
    if (seenTitles.has(gh.title.toLowerCase())) return false;
    return true;
  });

  const projects = [...liveStatic, ...uniqueGh];

  return <WorldGate projects={projects} />;
}
