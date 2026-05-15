"use client";

import Spline from '@splinetool/react-spline/next';
import React, { useState, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SplineBackground = () => {
    const [isReady, setIsReady] = useState(false);

    return (
        <div className="fixed inset-0 z-0 overflow-hidden bg-background pointer-events-none">
            {/* Background Gradient Fallback */}
            <AnimatePresence>
                {!isReady && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-background flex items-center justify-center"
                    >
                        <div className="w-24 h-24 border-2 border-accent/20 border-t-accent rounded-full animate-spin" />
                        <div className="absolute text-[10px] uppercase tracking-widest text-accent font-bold mt-32">Initializing Engine...</div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className={`w-full h-full transition-opacity duration-1000 ${isReady ? 'opacity-100' : 'opacity-0'}`}>
                <Suspense fallback={null}>
                    <Spline
                        scene="https://prod.spline.design/uh1MoJamqv3m3Tpb/scene.splinecode"
                        onLoad={() => setIsReady(true)}
                    />
                </Suspense>
            </div>

            {/* Subtle Overlay to ensure visual comfort and focus */}
            <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background dark:opacity-40 opacity-20 pointer-events-none" />
        </div>
    );
};

export default SplineBackground;
