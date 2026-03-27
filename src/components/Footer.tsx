"use client";

import React from "react";
import { Github, Twitter, Instagram, Linkedin, ArrowUp } from "lucide-react";

const Footer = () => {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <footer className="max-w-7xl mx-auto px-6 md:px-20 py-20 border-t border-glass-border">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                <div className="col-span-2">
                    <div className="text-2xl font-outfit font-black tracking-tighter mb-4">
                        MY <span className="text-accent italic">PORTFOLIO</span>
                    </div>
                    <p className="text-foreground/70 max-w-sm mb-8 font-light leading-relaxed">
                        Focused on high-fidelity interfaces and performance-first logic.
                        Engineering the React ecosystem with a focus on motion and scalability.
                    </p>
                </div>

                <div>
                    <h5 className="font-bold mb-6">Explore</h5>
                    <ul className="flex flex-col gap-3 text-foreground/70">
                        {["Work", "About", "Contact"].map((item) => (
                            <li key={item}>
                                <a href={`#${item.toLowerCase()}`} className="hover:text-accent transition-colors">{item}</a>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="flex flex-col justify-between items-end">
                    <button
                        onClick={scrollToTop}
                        className="w-14 h-14 glass-card flex items-center justify-center rounded-full hover:border-accent interactive"
                    >
                        <ArrowUp size={24} />
                    </button>
                    <div className="text-right">
                        <span className="text-xs text-muted block">© 2026 MONU</span>
                        <span className="text-[10px] text-accent font-bold uppercase tracking-widest">Digital Experiences</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
