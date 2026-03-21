"use client";

import React, { useEffect, useRef, useState, Suspense } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { motion, AnimatePresence } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

interface AnimaticScrubProps {
    frames: string[];
    title: string;
    description: string;
}

const AnimaticScrub: React.FC<AnimaticScrubProps> = ({ frames, title, description }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [currentFrame, setCurrentFrame] = useState(0);
    const [isLoaded, setIsLoaded] = useState(false);
    const [loadProgress, setLoadProgress] = useState(0);

    useGSAP(() => {
        if (!canvasRef.current || !containerRef.current) return;

        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");
        if (!context) return;

        // Set canvas dimensions
        const setCanvasSize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        setCanvasSize();

        // Preload images
        const images: HTMLImageElement[] = [];
        let loadedCount = 0;

        // Rendering loop with continuous drift
        let ticker: any;
        const drift = { x: 0, y: 0 };

        const render = (index: number, progress: number = 0) => {
            if (images[index] && images[index].complete) {
                context.clearRect(0, 0, canvas.width, canvas.height);

                const img = images[index];
                const canvasRatio = canvas.width / canvas.height;
                const imgRatio = img.width / img.height;

                let drawWidth, drawHeight, offsetX, offsetY;

                // Drift + Spatial Zoom for single frames
                const zoomFactor = frames.length === 1 ? 1.05 + (progress * 0.15) : 1;

                if (canvasRatio > imgRatio) {
                    drawWidth = canvas.width * zoomFactor;
                    drawHeight = (canvas.width / imgRatio) * zoomFactor;
                } else {
                    drawHeight = canvas.height * zoomFactor;
                    drawWidth = (canvas.height * imgRatio) * zoomFactor;
                }

                // Center + Drift
                offsetX = (canvas.width - drawWidth) / 2 + drift.x;
                offsetY = (canvas.height - drawHeight) / 2 + drift.y;

                context.globalAlpha = frames.length === 1 ? 0.8 - (progress * 0.4) : 0.8;
                context.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
                context.globalAlpha = 1;

                // Subtle film grain/noise overlay
                if (Math.random() > 0.9) {
                    context.fillStyle = "rgba(255, 255, 255, 0.02)";
                    context.fillRect(Math.random() * canvas.width, Math.random() * canvas.height, 2, 2);
                }
            }
        };

        frames.forEach((src, i) => {
            const img = new Image();
            img.src = src;
            img.onload = () => {
                loadedCount++;
                setLoadProgress(Math.floor((loadedCount / frames.length) * 100));

                if (loadedCount === frames.length) {
                    setIsLoaded(true);

                    // Start continuous drift animation
                    ticker = gsap.ticker.add((time) => {
                        drift.x = Math.sin(time * 0.5) * 20;
                        drift.y = Math.cos(time * 0.3) * 15;
                        render(currentFrame, st ? st.progress : 0);
                    });
                }
            };
            images[i] = img;
        });

        // GSAP ScrollTrigger
        const scrollObj = { frame: 0 };

        const st = ScrollTrigger.create({
            trigger: containerRef.current,
            start: "top top",
            end: "+=300%",
            scrub: 0.5,
            pin: true,
            onUpdate: (self) => {
                const index = Math.round(self.progress * (frames.length - 1));
                render(index, self.progress);
                setCurrentFrame(index);
            },
        });

        // Handle resize
        const handleResize = () => {
            setCanvasSize();
            render(currentFrame, st.progress);
        };

        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
            if (ticker) gsap.ticker.remove(ticker);
            st.kill();
        };
    }, { scope: containerRef, dependencies: [frames] });

    return (
        <div ref={containerRef} className="relative w-full h-screen overflow-hidden bg-background border-b border-glass-border">
            <AnimatePresence>
                {!isLoaded && (
                    <motion.div
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 z-50 bg-background flex flex-col items-center justify-center gap-6"
                    >
                        <div className="w-64 h-1 bg-secondary rounded-full overflow-hidden">
                            <motion.div
                                className="h-full bg-accent"
                                initial={{ width: 0 }}
                                animate={{ width: `${loadProgress}%` }}
                            />
                        </div>
                        <div className="text-[10px] uppercase tracking-widest font-black text-muted animate-pulse">
                            Syncing Playground Engine_{loadProgress}%
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <canvas
                ref={canvasRef}
                className={`block w-full h-screen object-cover transition-opacity duration-1000 ${isLoaded ? 'opacity-40' : 'opacity-0'}`}
            />

            {/* Overlay Content */}
            <div className={`absolute inset-0 flex flex-col justify-end p-12 md:p-24 pointer-events-none transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <div className="max-w-2xl">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="h-px w-12 bg-accent" />
                        <span className="text-accent font-bold tracking-widest text-sm uppercase">Scroll to Sequence</span>
                    </div>
                    <h2 className="text-5xl md:text-7xl font-outfit font-black mb-6 tracking-tighter text-foreground">
                        {title}
                    </h2>
                    <p className="text-xl text-muted font-light leading-relaxed">
                        {description}
                    </p>
                </div>
            </div>

            {/* Metadata HUD */}
            {isLoaded && (
                <>
                    <div className="absolute top-12 right-12 font-mono text-sm tracking-widest text-muted border-l border-accent/30 pl-4 py-2">
                        SEQUENCE_ID // 00{currentFrame + 1}<br />
                        FPS_LOCK // 60.00
                    </div>

                    <div className="absolute bottom-12 left-0 w-full px-12 md:px-24 pointer-events-none">
                        <div className="w-full h-1 bg-secondary relative overflow-hidden rounded-full">
                            <motion.div
                                className="absolute top-0 left-0 h-full bg-accent shadow-[0_0_10px_var(--accent)]"
                                style={{ width: `${((currentFrame + 1) / frames.length) * 100}%` }}
                            />
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default AnimaticScrub;
