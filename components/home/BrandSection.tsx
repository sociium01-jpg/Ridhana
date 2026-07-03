"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import MagneticButton from "@/components/ui/MagneticButton";
import MaskedTextReveal from "@/components/ui/MaskedTextReveal";

export default function BrandSection() {
  return (
    <section
      className="section-py bg-cream overflow-hidden"
      aria-labelledby="brand-heading"
      id="brand-story"
    >
      <div className="container-px max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image side */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="relative h-[400px] md:h-[520px] rounded-card overflow-hidden shadow-warm-lg">
              <Image
                src="/images/hero-bg-2.png"
                alt="Stone milling process at Ridhana"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                style={{ filter: "saturate(0.85) brightness(0.97)" }}
              />
              {/* Warm overlay */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(201,162,75,0.15) 0%, transparent 60%)",
                }}
                aria-hidden="true"
              />
            </div>

            {/* Floating stat card */}
            <motion.div
              className="absolute -bottom-6 -right-4 md:right-8 bg-espresso text-bone rounded-card px-6 py-5 shadow-warm-lg"
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
            >
              <p className="font-sans text-label text-wheat/50 tracking-widest uppercase mb-1">
                Our Promise
              </p>
              <p className="font-serif text-xl text-bone leading-tight">
                Mill Date
              </p>
              <p className="font-sans text-label text-gold tracking-wider">
                On Every Bag
              </p>
            </motion.div>
          </motion.div>

          {/* Text side */}
          <div>
            <MaskedTextReveal
              as="p"
              className="font-sans text-label tracking-widest uppercase text-gold mb-4"
            >
              The Name
            </MaskedTextReveal>

            <MaskedTextReveal
              as="h2"
              id="brand-heading"
              className="font-serif text-display-md text-espresso mb-2"
              delay={0.1}
            >
              Ridhāna (रिधाना)
            </MaskedTextReveal>

            <MaskedTextReveal
              as="p"
              className="font-serif text-heading text-gold italic mb-8"
              delay={0.2}
            >
              means to nourish, to sustain
            </MaskedTextReveal>

            <motion.div
              className="section-divider mb-8"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              style={{ transformOrigin: "left" }}
            />

            <motion.p
              className="font-sans text-body-lg text-charcoal leading-relaxed mb-10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              We believe flour should do more than fill — it should heal, energize,
              and respect the body&#39;s natural rhythm. That&#39;s why we return to slow milling,
              whole grains, and age-old practices that honor purity, balance, and gut wisdom.
              From handpicked grains to traditional stone mills, every step is guided by care
              — so what reaches your kitchen is not just flour, but a legacy of nourishment.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <MagneticButton href="/who-we-are" variant="outline" id="brand-read-more">
                Read More
              </MagneticButton>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
