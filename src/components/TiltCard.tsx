"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { motion } from "framer-motion";

interface TiltCardProps {
    children: React.ReactNode;
    className?: string;
}

const TiltCard: React.FC<TiltCardProps> = ({ children, className }) => {
    const cardRef = useRef<HTMLDivElement>(null);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;
        const { left, top, width, height } = cardRef.current.getBoundingClientRect();
        const x = (e.clientX - left) / width - 0.5;
        const y = (e.clientY - top) / height - 0.5;

        gsap.to(cardRef.current, {
            rotateY: x * 30,
            rotateX: -y * 30,
            transformPerspective: 1000,
            duration: 0.5,
            ease: "power2.out",
        });
    };

    const handleMouseLeave = () => {
        if (!cardRef.current) return;
        gsap.to(cardRef.current, {
            rotateY: 0,
            rotateX: 0,
            duration: 0.8,
            ease: "elastic.out(1, 0.3)",
        });
    };

    return (
        <div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className={`relative transform-gpu transition-all duration-300 ${className}`}
            style={{ transformStyle: "preserve-3d" }}
        >
            {children}
        </div>
    );
};

export default TiltCard;
