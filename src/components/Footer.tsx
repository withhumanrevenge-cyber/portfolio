"use client";

import React from "react";
import { ArrowUp } from "lucide-react";

const links = [
  { label: "Work", href: "#work" },
  { label: "Process", href: "#process" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-12 sm:px-6 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="mb-2 font-heading text-lg font-black tracking-tight">
            MONU<span className="text-primary">.</span>
          </p>
          <p className="text-sm text-muted-foreground">
            © 2026 Monu — Full-Stack Engineer
          </p>
        </div>

        <nav aria-label="Footer navigation">
          <ul className="flex flex-wrap gap-6">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-sm text-muted-foreground transition-colors duration-200 hover:text-foreground"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <button
          onClick={scrollToTop}
          aria-label="Back to top"
          className="inline-flex h-11 w-11 cursor-pointer items-center justify-center self-start rounded-full border border-border bg-card text-muted-foreground transition-colors duration-200 hover:text-primary md:self-auto"
        >
          <ArrowUp size={18} />
        </button>
      </div>
    </footer>
  );
}
