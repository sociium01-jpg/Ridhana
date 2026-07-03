"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import MaskedTextReveal from "@/components/ui/MaskedTextReveal";

export default function ProcessSection() {
  return (
    <section
      className="section-py relative overflow-hidden"
      aria-labelledby="process-heading"
      id="process"
    >
      {/* Background image with warm overlay */}
      <div className="absolute inset-0" aria-hidden="true">
        <Image
          src="/images/hero-bg-3.png"
          alt=""
          fill
          className="object-cover"
          style={{ filter: "saturate(0.7) brightness(0.4)" }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, rgba(43,33,24,0.88) 0%, rgba(43,33,24,0.7) 100%)",
          }}
        />
      </div>

      <div className="container-px max-w-[1440px] mx-auto relative z-10 text-center">
        <MaskedTextReveal
          as="p"
          className="font-sans text-label tracking-widest uppercase text-gold mb-6"
        >
          From Soil to Spoon
        </MaskedTextReveal>

        <MaskedTextReveal
          as="h2"
          id="process-heading"
          className="font-serif text-display-lg text-bone mb-8 max-w-4xl mx-auto"
          delay={0.1}
        >
          Pure Grains. Honest Milling. Nourishment in Every Spoon.
        </MaskedTextReveal>

        <motion.div
          className="section-divider mx-auto mb-8"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ transformOrigin: "center" }}
        />

        <motion.p
          className="font-sans text-body-lg text-bone/70 leading-relaxed max-w-2xl mx-auto mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Our stone-milled process preserves essential fibers and nutrients, giving you flour
          that&#39;s lighter, tastier, and closer to its natural origin. From soil to spoon,
          every step is guided by sustainability.
        </motion.p>

        {/* Stats row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {[
            { stat: "0°",   label: "Heat from milling", sub: "Ambient temperature preserved" },
            { stat: "100%", label: "Whole grain",        sub: "Nothing stripped away" },
            { stat: "0",    label: "Preservatives",      sub: "No bleach, no bromate, no folic acid" },
          ].map((item, i) => (
            <motion.div
              key={item.label}
              className="flex flex-col items-center gap-3"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 + 0.3 }}
            >
              <p className="font-serif text-6xl md:text-7xl font-light text-gold">
                {item.stat}
              </p>
              <p className="font-sans text-label font-semibold tracking-widest uppercase text-bone/80">
                {item.label}
              </p>
              <p className="font-sans text-body text-bone/40 text-sm">
                {item.sub}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Grain overlay on dark bg */}
      <div className="grain-overlay opacity-[0.04]" aria-hidden="true" />
    </section>
  );
}
