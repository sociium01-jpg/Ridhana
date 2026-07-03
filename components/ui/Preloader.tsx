"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Preloader() {
  const [isVisible, setIsVisible] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      setIsVisible(false);
      return;
    }

    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 80);

    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 1500);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }}
        >
          {/* Flour dust particles */}
          <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
            {Array.from({ length: 20 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full bg-wheat/30"
                style={{
                  width: Math.random() * 4 + 2,
                  height: Math.random() * 4 + 2,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -40, 0],
                  opacity: [0, 0.6, 0],
                  scale: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: Math.random() * 2 + 1,
                  repeat: Infinity,
                  delay: Math.random() * 1.5,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>

          {/* Logo mark */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center gap-6 z-10"
          >
            {/* Chakki icon */}
            <div className="relative w-16 h-16">
              <motion.div
                className="w-16 h-16 rounded-full border-2 border-wheat/40"
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              />
              <motion.div
                className="absolute inset-2 rounded-full border border-gold/30"
                animate={{ rotate: -360 }}
                transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-gold" />
              </div>
            </div>

            <div className="text-center">
              <p className="font-serif text-bone text-2xl tracking-wide">रिधाना</p>
              <p className="font-sans text-wheat/60 text-label tracking-widest mt-1">
                RIDHANA
              </p>
            </div>

            {/* Progress bar */}
            <div className="w-32 h-px bg-wheat/20 overflow-hidden">
              <motion.div
                className="h-full bg-gold"
                style={{ width: `${Math.min(progress, 100)}%` }}
                transition={{ duration: 0.1 }}
              />
            </div>
          </motion.div>

          {/* Skip */}
          <button
            onClick={() => setIsVisible(false)}
            className="absolute bottom-8 text-wheat/40 text-label tracking-widest font-sans hover:text-wheat/70 transition-colors duration-300"
            aria-label="Skip preloader"
          >
            SKIP
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
