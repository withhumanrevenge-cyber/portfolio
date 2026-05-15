"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";

const FloatingParticles = () => {
    const particlesRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!particlesRef.current) return;

        const container = particlesRef.current;
        const particleCount = 40;

        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement("div");
            particle.className = "absolute rounded-full bg-accent opacity-20 pointer-events-none";

            const size = Math.random() * 4 + 1;
            const x = Math.random() * 100;
            const y = Math.random() * 100;
            const z = Math.random() * 500 - 250; // Z-depth

            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.left = `${x}%`;
            particle.style.top = `${y}%`;
            particle.style.transform = `translateZ(${z}px)`;

            container.appendChild(particle);

            // Animate floating
            gsap.to(particle, {
                x: `random(-50, 50)`,
                y: `random(-50, 50)`,
                z: `random(-200, 200)`,
                duration: `random(5, 10)`,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
            });
        }

        const handleMouseMove = (e: MouseEvent) => {
            const { clientX, clientY } = e;
            const xMove = (clientX / window.innerWidth - 0.5) * 60;
            const yMove = (clientY / window.innerHeight - 0.5) * 60;

            gsap.to(container, {
                x: -xMove,
                y: -yMove,
                duration: 1,
                ease: "power2.out",
            });
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            while (container.firstChild) container.removeChild(container.firstChild);
        };
    }, []);

    return (
        <div
            ref={particlesRef}
            className="fixed inset-0 pointer-events-none z-[1]"
            style={{ perspective: "1000px", transformStyle: "preserve-3d" }}
        />
    );
};

export default FloatingParticles;
