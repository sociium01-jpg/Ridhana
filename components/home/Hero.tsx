"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { motion } from "framer-motion";
import PerformanceGuard from "@/components/3d/PerformanceGuard";
import MagneticButton from "@/components/ui/MagneticButton";

const ChakkiScene = dynamic(() => import("@/components/3d/ChakkiScene"), {
  ssr: false,
  loading: () => <HeroFallback />,
});

function HeroFallback() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="relative w-72 h-72 md:w-96 md:h-96">
        <Image
          src="/images/hero-bg.png"
          alt="Stone chakki grinding mill"
          fill
          className="object-contain opacity-80"
          priority
        />
        {/* Spinning decorative ring */}
        <div
          className="absolute inset-0 rounded-full border border-gold/20"
          style={{ animation: "spin-slow 20s linear infinite" }}
          aria-hidden="true"
        />
      </div>
    </div>
  );
}

export default function Hero() {
  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden bg-bone"
      aria-labelledby="hero-heading"
    >
      {/* 3D Scene or fallback — fills right portion */}
      <div className="absolute inset-0 md:left-[40%]" aria-hidden="true">
        <PerformanceGuard fallback={<HeroFallback />}>
          <ChakkiScene />
        </PerformanceGuard>
        {/* Gradient fade on left for text legibility */}
        <div
          className="absolute inset-y-0 left-0 w-2/3 pointer-events-none"
          style={{
            background:
              "linear-gradient(to right, #F7F3EC 40%, #F7F3EC88 70%, transparent 100%)",
          }}
        />
      </div>

      {/* Hero content */}
      <div className="container-px max-w-[1440px] mx-auto relative z-10 pt-32 pb-24 md:pt-40 md:pb-32">
        <div className="max-w-2xl">
          {/* Eyebrow */}
          <motion.p
            className="font-sans text-label tracking-widest uppercase text-gold mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            Stone Milled · Vikhroli, Mumbai
          </motion.p>

          {/* Headline */}
          <div className="overflow-hidden mb-2">
            <motion.h1
              id="hero-heading"
              className="font-serif text-display-xl text-espresso"
              initial={{ y: "110%", opacity: 0 }}
              animate={{ y: "0%", opacity: 1 }}
              transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              STONE MILLED
            </motion.h1>
          </div>
          <div className="overflow-hidden mb-2">
            <motion.h1
              className="font-serif text-display-xl text-espresso"
              initial={{ y: "110%", opacity: 0 }}
              animate={{ y: "0%", opacity: 1 }}
              transition={{ duration: 0.9, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              GOODNESS,
            </motion.h1>
          </div>
          <div className="overflow-hidden mb-8">
            <motion.h1
              className="font-serif text-display-xl text-gold italic"
              initial={{ y: "110%", opacity: 0 }}
              animate={{ y: "0%", opacity: 1 }}
              transition={{ duration: 0.9, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              ROOTED IN<br />TRADITION
            </motion.h1>
          </div>

          {/* Divider */}
          <motion.div
            className="section-divider mb-8"
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
            style={{ transformOrigin: "left" }}
          />

          {/* Sub-line */}
          <motion.p
            className="font-sans text-body-lg text-charcoal mb-10 max-w-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            The art of slow milling — fresh flour as nature intended
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="flex flex-wrap items-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <MagneticButton
              href="https://wa.me/919800199797"
              variant="primary"
              external
              id="hero-order-whatsapp"
              aria-label="Order via WhatsApp"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.553 4.116 1.522 5.849L.057 23.997l6.349-1.46A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.79 9.79 0 01-4.964-1.347l-.356-.212-3.688.848.874-3.589-.232-.368A9.763 9.763 0 012.182 12C2.182 6.584 6.584 2.182 12 2.182S21.818 6.584 21.818 12 17.416 21.818 12 21.818z"/>
              </svg>
              Order via WhatsApp
            </MagneticButton>
            <MagneticButton href="/products" variant="outline" id="hero-view-products">
              Our Products
            </MagneticButton>
          </motion.div>

          {/* Trust signals */}
          <motion.div
            className="mt-12 flex flex-wrap gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.1 }}
          >
            {[
              "No Bleach",
              "No Bromate",
              "No Folic Acid",
            ].map((claim) => (
              <div key={claim} className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-gold/20 flex items-center justify-center">
                  <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="#C9A24B" strokeWidth="3" aria-hidden="true">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <span className="font-sans text-label tracking-wider text-stone font-medium">
                  {claim}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10">
        <motion.div
          className="scroll-indicator"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          aria-hidden="true"
        >
          <p className="font-sans text-label tracking-widest text-stone/50">SCROLL</p>
          <div className="scroll-indicator-line" />
        </motion.div>
      </div>

      {/* Devanagari watermark */}
      <div
        className="absolute bottom-8 right-8 md:right-16 z-10 text-right pointer-events-none"
        aria-hidden="true"
      >
        <p className="devanagari text-6xl md:text-8xl text-espresso/5 leading-none font-bold select-none">
          रिधाना
        </p>
      </div>
    </section>
  );
}
