"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Mail, Github, Linkedin, MessageCircle } from "lucide-react";

const socials = [
  {
    label: "Email me",
    href: "mailto:monu.dev01work@gmail.com",
    Icon: Mail,
    external: false,
  },
  {
    label: "GitHub profile",
    href: "https://github.com/withhumanrevenge-cyber",
    Icon: Github,
    external: true,
  },
  {
    label: "LinkedIn profile",
    href: "https://www.linkedin.com/in/monu-b92047282",
    Icon: Linkedin,
    external: true,
  },
  {
    label: "WhatsApp chat",
    href: "https://wa.me/+917783043238",
    Icon: MessageCircle,
    external: true,
  },
];

export default function ContactSection() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="contact" className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
      <motion.div
        initial={reduceMotion ? {} : { opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5 }}
        className="relative overflow-hidden rounded-2xl border border-border bg-card p-10 text-center md:p-20"
      >
        <div
          className="absolute left-1/2 top-0 h-64 w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/15 blur-[100px]"
          aria-hidden="true"
        />
        <p className="relative mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-primary">
          Contact
        </p>
        <h2 className="relative mx-auto mb-8 max-w-3xl font-heading text-4xl font-black tracking-tight md:text-6xl">
          Let&apos;s build something{" "}
          <span className="text-primary">meaningful</span>.
        </h2>
        <p className="relative mx-auto mb-10 max-w-xl text-muted-foreground">
          Available for new opportunities and collaborations. Reach out and
          I&apos;ll get back to you within a day.
        </p>
        <div className="relative mb-10">
          <a
            href="mailto:monu.dev01work@gmail.com"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 text-sm font-bold text-primary-foreground transition-opacity duration-200 hover:opacity-90"
          >
            <Mail size={16} aria-hidden="true" />
            monu.dev01work@gmail.com
          </a>
        </div>
        <ul className="relative flex justify-center gap-3">
          {socials.map(({ label, href, Icon, external }) => (
            <li key={href}>
              <a
                href={href}
                aria-label={label}
                {...(external
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-secondary text-muted-foreground transition-colors duration-200 hover:text-primary"
              >
                <Icon size={18} />
              </a>
            </li>
          ))}
        </ul>
      </motion.div>
    </section>
  );
}
