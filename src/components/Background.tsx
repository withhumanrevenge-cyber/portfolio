"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";

const Background = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        gsap.to(containerRef.current, {
            opacity: 0.6,
            duration: 5,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
        });

        gsap.to(".mesh-circle", {
            rotation: 360,
            duration: 200,
            repeat: -1,
            ease: "none",
        });
    }, []);

    return (
        <div ref={containerRef} className="mesh-gradient pointer-events-none fixed inset-0 z-[-1] opacity-40">
            <div className="mesh-circle absolute -top-1/4 -left-1/4 w-[150vw] h-[150vw] mesh-gradient animate-pulse" />
        </div>
    );
};

export default Background;
