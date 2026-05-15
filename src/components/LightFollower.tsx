"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";

const LightFollower = () => {
    const lightRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const light = lightRef.current;
        if (!light) return;

        const moveLight = (e: MouseEvent) => {
            const { clientX, clientY } = e;
            gsap.to(light, {
                x: clientX,
                y: clientY,
                duration: 0.1,
                ease: "power2.out",
            });
        };

        window.addEventListener("mousemove", moveLight);
        return () => window.removeEventListener("mousemove", moveLight);
    }, []);

    return (
        <div
            ref={lightRef}
            className="fixed top-0 left-0 w-[600px] h-[600px] bg-accent/10 rounded-full blur-[120px] pointer-events-none z-[-1] transform -translate-x-1/2 -translate-y-1/2 dark:bg-accent/5 opacity-40 bg-radial-[var(--accent)]"
            style={{
                background: "radial-gradient(circle, var(--accent) 0%, transparent 70%)",
                mixBlendMode: "screen",
            }}
        />
    );
};

export default LightFollower;
