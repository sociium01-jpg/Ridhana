"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface MaskedTextRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  id?: string;
  as?: "p" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "span" | "div";
}

export default function MaskedTextReveal({
  children,
  className = "",
  delay = 0,
  duration = 0.8,
  id,
  as: Tag = "div",
}: MaskedTextRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" });

  return (
    <div ref={ref} className="text-reveal-wrapper" aria-label={typeof children === "string" ? children : undefined}>
      <motion.div
        initial={{ y: "110%", opacity: 0 }}
        animate={isInView ? { y: "0%", opacity: 1 } : { y: "110%", opacity: 0 }}
        transition={{
          duration,
          delay,
          ease: [0.16, 1, 0.3, 1],
        }}
      >
        <Tag id={id} className={className}>{children}</Tag>
      </motion.div>
    </div>
  );
}
