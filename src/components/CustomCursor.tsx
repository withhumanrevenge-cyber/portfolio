"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";

const CustomCursor = () => {
    const cursorRef = useRef<HTMLDivElement>(null);
    const followerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const cursor = cursorRef.current;
        const follower = followerRef.current;
        if (!cursor || !follower) return;

        const moveCursor = (e: MouseEvent) => {
            gsap.to(cursor, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.1,
                ease: "power2.out",
            });

            gsap.to(follower, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.4,
                ease: "power3.out",
            });
        };

        window.addEventListener("mousemove", moveCursor);

        const handleLinkHover = () => {
            gsap.to(follower, {
                scale: 3,
                duration: 0.3,
                backgroundColor: "rgba(255, 77, 0, 0.4)",
                borderColor: "transparent",
            });
        };

        const handleLinkLeave = () => {
            gsap.to(follower, {
                scale: 1,
                duration: 0.3,
                backgroundColor: "transparent",
                borderColor: "rgba(255, 77, 0, 0.5)",
            });
        };

        const elements = document.querySelectorAll("a, button, .interactive");
        elements.forEach((el) => {
            el.addEventListener("mouseenter", handleLinkHover);
            el.addEventListener("mouseleave", handleLinkLeave);
        });

        return () => {
            window.removeEventListener("mousemove", moveCursor);
            elements.forEach((el) => {
                el.removeEventListener("mouseenter", handleLinkHover);
                el.removeEventListener("mouseleave", handleLinkLeave);
            });
        };
    }, []);

    return (
        <>
            <div
                ref={cursorRef}
                className="fixed top-0 left-0 w-2 h-2 bg-accent rounded-full pointer-events-none z-[100] transform -translate-x-1/2 -translate-y-1/2"
            />
            <div
                ref={followerRef}
                className="fixed top-0 left-0 w-8 h-8 border border-accent/40 bg-accent/5 rounded-full pointer-events-none z-[999] transform -translate-x-1/2 -translate-y-1/2"
            />
        </>
    );
};

export default CustomCursor;
