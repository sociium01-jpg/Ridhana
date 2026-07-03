"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import MaskedTextReveal from "@/components/ui/MaskedTextReveal";
import MagneticButton from "@/components/ui/MagneticButton";

export default function WhoWeAreClient() {
  return (
    <article className="bg-bone min-h-screen">
      {/* Hero */}
      <div className="relative min-h-[60vh] flex items-end overflow-hidden bg-espresso">
        <div className="absolute inset-0" aria-hidden="true">
          <Image
            src="/images/hero-bg.png"
            alt=""
            fill
            className="object-cover opacity-30"
            style={{ filter: "saturate(0.6)" }}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to top, rgba(43,33,24,1) 0%, rgba(43,33,24,0.4) 100%)",
            }}
          />
        </div>

        <div className="container-px max-w-[1440px] mx-auto relative z-10 pt-40 pb-20">
          <MaskedTextReveal
            as="p"
            className="font-sans text-label tracking-widest uppercase text-gold mb-6"
          >
            Our Story
          </MaskedTextReveal>
          <MaskedTextReveal
            as="h1"
            className="font-serif text-display-xl text-bone leading-none"
            delay={0.1}
          >
            Ridhāna (रिधाना)
          </MaskedTextReveal>
          <MaskedTextReveal
            as="p"
            className="font-serif text-display-md text-gold italic mt-2"
            delay={0.2}
          >
            A Return to Honest Grain
          </MaskedTextReveal>
        </div>

        <div className="grain-overlay opacity-[0.04]" aria-hidden="true" />
      </div>

      {/* Editorial long-read */}
      <div className="container-px max-w-[1440px] mx-auto section-py">
        <div className="max-w-3xl mx-auto">
          {/* Founder image */}
          <motion.div
            className="relative w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden mx-auto mb-16 shadow-warm-lg"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <Image
              src="/images/founder.png"
              alt="Rohit, founder of Ridhana"
              fill
              className="object-cover object-top"
              style={{ filter: "saturate(0.85) contrast(1.05)" }}
            />
          </motion.div>

          {[
            `Wheat isn't the enemy. It's how we've treated it. At forty, I felt my body slowing down — a quiet fatigue beneath the surface, despite a life that seemed healthy from the outside. It wasn't age; it was imbalance. An Ayurvedic retreat helped me see what modern living had done — how fast food, quick commerce, and instant everything had pulled me away from nature's rhythm. I began to understand the wisdom of slowing down — of food that's whole, unprocessed, and rooted in tradition.`,
            `As Indians, grains are our staple—carbs make up nearly 50% of a balanced meal. Yet the flour we consume today is industrially milled, stripped of nutrients, and left to sit on shelves for months. It's built for convenience, not nourishment. I wanted to return to what our grandparents knew — flour that's stone-milled at a gentle pace, rich in fiber, and made fresh.`,
            `Every step of this journey brought me back to my son, Rudra. If I felt this depleted at 40, what would his future look like? I didn't want him growing up on shortcuts and shelf-stable flour. I wanted him—and every child like him— to know food that heals, not harms. Food that's slow, nourishing, and wise — like the earth it comes from.`,
          ].map((para, i) => (
            <motion.p
              key={i}
              className="font-sans text-body-lg text-charcoal leading-relaxed mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-5%" }}
              transition={{ duration: 0.6, delay: 0.1 * i }}
            >
              {para}
            </motion.p>
          ))}

          {/* Pull-quote */}
          <motion.div
            className="my-20 py-16 border-y border-gold/20 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="pull-quote max-w-2xl mx-auto">
              &ldquo;A quiet rebellion against fast living.&rdquo;
            </p>
          </motion.div>

          {[
            `Ridhana is my answer.`,
            `A quiet rebellion against fast living. A return to slow milling, whole grains, and flour that respects the body.`,
            `It's not just a product—it's a philosophy.`,
          ].map((para, i) => (
            <motion.p
              key={i}
              className={`font-sans text-body-lg text-charcoal leading-relaxed mb-8 ${i === 0 ? "font-semibold text-espresso text-xl" : ""}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 * i }}
            >
              {para}
            </motion.p>
          ))}

          {/* Sign-off */}
          <motion.div
            className="mt-10 flex items-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="section-divider" />
            <p className="font-serif text-2xl text-espresso italic">
              — Rohit
            </p>
          </motion.div>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-cream section-py">
        <div className="container-px max-w-[1440px] mx-auto text-center">
          <MaskedTextReveal
            as="h2"
            className="font-serif text-display-md text-espresso mb-6"
          >
            Grains Chosen with Care. Flour Crafted with Integrity.
          </MaskedTextReveal>
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <MagneticButton href="/products" variant="primary" id="about-shop-btn">
              Shop Our Attas
            </MagneticButton>
            <MagneticButton href="/contact" variant="outline" id="about-contact-btn">
              Visit the Mill
            </MagneticButton>
          </div>
        </div>
      </div>
    </article>
  );
}
