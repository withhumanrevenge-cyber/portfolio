import React from "react";
import AnimaticScrub from "@/components/AnimaticScrub";
import PageTransition from "@/components/PageTransition";
import { ArrowLeft, Share2, PlayCircle, Layers } from "lucide-react";
import Link from "next/link";
import Footer from "@/components/Footer";
import { ThemeToggle } from "@/components/ThemeToggle";

// Mock data for project sequences
const projectSequences: Record<string, { frames: string[]; title: string; category: string; description: string }> = {
    "1": {
        title: "The Playground Engine",
        category: "Build Context / Tech Stack",
        description: "Built with Next.js 15, GSAP, and Framer Motion. Engineered for low-latency visual storytelling and high-performance cinematic motion.",
        frames: [
            "/playground_hero.png",
        ]
    },
    "2": {
        title: "Neon Pulse",
        category: "Motion Graphics Showcase",
        description: "Exploring the rhythm of city life through fast-paced, neon-lit motion design and storyboard experimentation.",
        frames: [
            "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2000",
            "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=2000",
            "https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=2000",
            "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=2000",
            "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2000",
        ]
    },
    "3": {
        title: "Fluid Architect",
        category: "3D Motion Design",
        description: "A visual exploration of shifting geometry and architecture, blending physics-based motion with abstract design.",
        frames: [
            "https://images.unsplash.com/photo-1633167606207-d840b5030622?q=80&w=2000",
            "https://images.unsplash.com/photo-1614850523296-d8c1af93d400?q=80&w=2000",
            "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2000",
            "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2000",
            "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2000",
        ]
    }
};

export default async function ProjectPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const project = projectSequences[id];

    if (!project) return <div>Project not found</div>;

    return (
        <PageTransition>
            <main className="min-h-screen bg-background transition-colors duration-500">
                {/* Project Nav */}
                <nav className="fixed top-0 left-0 w-full p-8 flex justify-between items-center z-50">
                    <Link href="/" className="group flex items-center gap-3 interactive">
                        <div className="w-10 h-10 glass-card rounded-full flex items-center justify-center group-hover:scale-110 group-hover:bg-accent transition-all">
                            <ArrowLeft size={18} />
                        </div>
                        <span className="text-xs uppercase tracking-widest font-bold">Back to Studio</span>
                    </Link>
                    <div className="flex gap-4 items-center">
                        <button className="w-10 h-10 glass-card rounded-full flex items-center justify-center interactive hover:text-accent"><Share2 size={16} /></button>
                        <ThemeToggle />
                    </div>
                </nav>

                {/* The Animatic Experience */}
                <AnimaticScrub
                    frames={project.frames}
                    title={project.title}
                    description={project.description}
                />
            </main>
        </PageTransition>
    );
}
