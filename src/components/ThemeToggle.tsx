"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";

export function ThemeToggle() {
    const { resolvedTheme, setTheme } = useTheme();
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return <div className="w-10 h-10" />;

    return (
        <button
            onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
            className="p-3 glass-card rounded-full interactive hover:text-accent transition-all duration-300 active:scale-95"
            aria-label="Toggle Theme"
        >
            <motion.div
                initial={false}
                animate={{
                    rotate: resolvedTheme === "dark" ? 0 : 180,
                    scale: [1, 1.2, 1],
                }}
                transition={{ duration: 0.5, ease: "backOut" }}
            >
                {resolvedTheme === "dark" ? <Moon size={18} /> : <Sun size={18} />}
            </motion.div>
        </button>
    );
}
