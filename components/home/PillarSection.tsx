"use client";

import { motion } from "framer-motion";
import MaskedTextReveal from "@/components/ui/MaskedTextReveal";

const pillars = [
  {
    id: 1,
    icon: (
      <svg viewBox="0 0 48 48" className="w-10 h-10" fill="none" aria-hidden="true">
        <circle cx="24" cy="24" r="18" stroke="#C9A24B" strokeWidth="1.5" />
        <circle cx="24" cy="24" r="10" stroke="#C9A24B" strokeWidth="1" opacity="0.4" />
        <path d="M24 8 L24 40 M8 24 L40 24" stroke="#C9A24B" strokeWidth="1" opacity="0.3" />
        <circle cx="24" cy="24" r="3" fill="#C9A24B" />
      </svg>
    ),
    title: "Slow Grinding Process",
    body: "Our natural stone mill grinds the grain at a slow speed. Our flour is made at ambient temperature, thus keeping the natural nutrients and flavour intact.",
  },
  {
    id: 2,
    icon: (
      <svg viewBox="0 0 48 48" className="w-10 h-10" fill="none" aria-hidden="true">
        <rect x="8" y="20" width="32" height="20" rx="3" stroke="#C9A24B" strokeWidth="1.5" />
        <path d="M14 20 L14 14 C14 11.8 15.8 10 18 10 L30 10 C32.2 10 34 11.8 34 14 L34 20" stroke="#C9A24B" strokeWidth="1.5" />
        <path d="M20 30 L22 32 L28 26" stroke="#C9A24B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: "Fresh Stone-Milled",
    body: "We print the mill date on every bag, so you know it's truly fresh. We produce whole grain flour which is fiber rich.",
  },
  {
    id: 3,
    icon: (
      <svg viewBox="0 0 48 48" className="w-10 h-10" fill="none" aria-hidden="true">
        <path d="M24 6 L28 18 L40 18 L30 26 L34 38 L24 30 L14 38 L18 26 L8 18 L20 18 Z" stroke="#C9A24B" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
    ),
    title: "Preservative Free",
    body: "No bleach. No bromate. No folic acid. We never add synthetic ingredients or preservatives — just pure, fresh flour the way nature intended.",
  },
];

export default function PillarSection() {
  return (
    <section
      className="section-py container-px max-w-[1440px] mx-auto"
      aria-labelledby="pillars-heading"
      id="our-speciality"
    >
      {/* Section header */}
      <div className="text-center mb-16">
        <MaskedTextReveal
          as="p"
          className="font-sans text-label tracking-widest uppercase text-gold mb-4"
        >
          Our Speciality
        </MaskedTextReveal>
        <MaskedTextReveal
          as="h2"
          id="pillars-heading"
          className="font-serif text-display-md text-espresso"
          delay={0.1}
        >
          Why Ridhana is Different
        </MaskedTextReveal>
      </div>

      {/* Pillars grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
        {pillars.map((pillar, i) => (
          <motion.div
            key={pillar.id}
            className="pillar-card"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-5%" }}
            transition={{ duration: 0.6, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Icon */}
            <div className="mb-6">{pillar.icon}</div>

            {/* Number */}
            <p className="font-serif text-6xl font-bold text-espresso/5 leading-none mb-4 select-none" aria-hidden="true">
              0{pillar.id}
            </p>

            {/* Title */}
            <h3 className="font-serif text-heading text-espresso mb-3">
              {pillar.title}
            </h3>

            {/* Divider */}
            <div className="section-divider mb-4" />

            {/* Body */}
            <p className="font-sans text-body text-charcoal leading-relaxed">
              {pillar.body}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Trust bar */}
      <motion.div
        className="mt-16 py-8 px-8 rounded-card bg-espresso flex flex-wrap justify-center gap-8 md:gap-16"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        {[
          { label: "No Bleach",    icon: "✗" },
          { label: "No Bromate",   icon: "✗" },
          { label: "No Folic Acid", icon: "✗" },
          { label: "Stone Milled", icon: "✓" },
          { label: "Fiber Rich",   icon: "✓" },
        ].map((item) => (
          <div key={item.label} className="flex items-center gap-3 text-center">
            <span
              className={`font-serif text-xl font-bold ${item.icon === "✓" ? "text-gold" : "text-terracotta"}`}
              aria-hidden="true"
            >
              {item.icon}
            </span>
            <span className="font-sans text-label font-semibold tracking-widest uppercase text-bone/80">
              {item.label}
            </span>
          </div>
        ))}
      </motion.div>
    </section>
  );
}
