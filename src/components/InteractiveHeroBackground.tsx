"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";

import Image from "next/image";

const InteractiveHeroBackground = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const container = containerRef.current;
        const image = imageRef.current;
        if (!container || !image) return;

        const handleMouseMove = (e: MouseEvent) => {
            const { clientX, clientY } = e;
            const { innerWidth, innerHeight } = window;

            const xPos = (clientX / innerWidth) - 0.5;
            const yPos = (clientY / innerHeight) - 0.5;

            gsap.to(image, {
                x: xPos * 50,
                y: yPos * 50,
                rotateX: -yPos * 10,
                rotateY: xPos * 10,
                duration: 0.8,
                ease: "power2.out",
            });
        };

        window.addEventListener("mousemove", handleMouseMove);

        gsap.to(image, {
            y: "+=20",
            duration: 3,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
        });

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
        };
    }, []);

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 z-0 overflow-hidden pointer-events-none perspective-1000"
        >
            <div
                ref={imageRef}
                className="absolute inset-0 flex items-center justify-center opacity-40 sm:opacity-70 group"
                style={{ transformStyle: "preserve-3d" }}
            >
                <div className="relative w-full h-[50vh] sm:h-[80vh] flex items-center justify-center">
                    <div className="relative w-full h-full max-w-[90vw] sm:max-w-7xl mx-auto flex items-center justify-center">
                        <Image
                            src="/hero.png.png"
                            alt="Hero Character"
                            fill
                            priority
                            className="object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)] dark:drop-shadow-[0_20px_50px_rgba(255,255,255,0.1)]"
                        />
                    </div>
                </div>
            </div>

            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.03] pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/20 opacity-40 pointer-events-none" />
        </div>
    );
};

export default InteractiveHeroBackground;
