"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import MagneticButton from "@/components/ui/MagneticButton";
import MaskedTextReveal from "@/components/ui/MaskedTextReveal";

export default function MillVisit() {
  return (
    <section
      className="section-py bg-cream"
      aria-labelledby="mill-visit-heading"
      id="mill-visit"
    >
      <div className="container-px max-w-[1440px] mx-auto">
        <div className="rounded-[2rem] overflow-hidden relative min-h-[400px] flex items-center">
          {/* Background image */}
          <div className="absolute inset-0" aria-hidden="true">
            <Image
              src="/images/hero-bg-4.jpg"
              alt="Stone mill at Vikhroli, Mumbai"
              fill
              className="object-cover"
              style={{ filter: "saturate(0.8) brightness(0.5)" }}
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(135deg, rgba(43,33,24,0.85) 0%, rgba(43,33,24,0.6) 100%)",
              }}
            />
          </div>

          {/* Content */}
          <div className="relative z-10 container-px py-16 text-center w-full">
            <MaskedTextReveal
              as="p"
              className="font-sans text-label tracking-widest uppercase text-gold/80 mb-6"
            >
              Vikhroli, Mumbai
            </MaskedTextReveal>

            <MaskedTextReveal
              as="h2"
              id="mill-visit-heading"
              className="font-serif text-display-md text-bone mb-8"
              delay={0.1}
            >
              Visit our mill at Vikhroli, Mumbai
            </MaskedTextReveal>

            <motion.p
              className="font-sans text-body-lg text-bone/70 mb-10 max-w-lg mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              #32, Vijaya House, Station Road, Vikhroli West, Mumbai — 400083
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap justify-center gap-4"
            >
              <MagneticButton
                href="/contact"
                variant="primary"
                id="mill-visit-contact-btn"
              >
                Get in Touch
              </MagneticButton>
              <MagneticButton
                href="tel:+919800199797"
                variant="outline"
                id="mill-visit-phone-btn"
                aria-label="Call us"
              >
                +91 9800199797
              </MagneticButton>
            </motion.div>
          </div>

          {/* Grain overlay */}
          <div className="grain-overlay opacity-[0.04]" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}
