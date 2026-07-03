"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import MagneticButton from "@/components/ui/MagneticButton";

export default function BlogPostClient() {
  return (
    <article className="bg-bone min-h-screen">
      {/* Hero */}
      <div className="relative h-[50vh] md:h-[60vh] bg-espresso overflow-hidden">
        <Image
          src="/images/hero-bg.png"
          alt="Stone ground whole wheat flour"
          fill
          className="object-cover opacity-40"
          style={{ filter: "saturate(0.7)" }}
          priority
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to top, rgba(43,33,24,1) 0%, rgba(43,33,24,0.3) 100%)" }}
        />
        <div className="absolute bottom-0 left-0 right-0 container-px max-w-[1440px] mx-auto pb-14">
          <p className="font-sans text-label tracking-widest uppercase text-gold mb-4">
            Craft & Knowledge
          </p>
          <h1 className="font-serif text-display-lg text-bone leading-tight max-w-3xl">
            Why Stone Ground Whole Wheat Flour Is Better
          </h1>
        </div>
        <div className="grain-overlay opacity-[0.04]" aria-hidden="true" />
      </div>

      {/* Post body */}
      <div className="container-px max-w-[1440px] mx-auto section-py">
        <div className="max-w-2xl mx-auto">
          {/* Byline */}
          <div className="flex items-center gap-3 mb-12 pb-8 border-b border-stone/10">
            <div className="relative w-10 h-10 rounded-full overflow-hidden bg-cream">
              <Image src="/images/founder.png" alt="Rohit" fill className="object-cover" />
            </div>
            <div>
              <p className="font-sans font-semibold text-espresso text-sm">Rohit · Ridhana</p>
              <p className="font-sans text-stone text-xs">Vikhroli, Mumbai</p>
            </div>
          </div>

          {/* Article content */}
          <div className="prose prose-stone max-w-none">
            <motion.p
              className="font-sans text-body-lg text-charcoal leading-relaxed mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              When I first started baking at home, I quickly realized not all flours are the same. The texture, the aroma, the way dough comes together — it all changes with what&apos;s in the bag.
            </motion.p>

            {/* TODO: Paste the full article body here. 
                The Wix blog renders content via JavaScript, so the raw text 
                was not extractable automatically. Please copy the full article 
                from ridhana.com/post/why-stone-ground-whole-wheat-flour-is-better 
                and paste it below as paragraph elements. */}

            <motion.div
              className="my-10 pl-6 border-l-2 border-gold"
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <p className="font-serif text-xl text-espresso italic leading-relaxed">
                &ldquo;Stone-ground flour preserves the bran, germ, and endosperm in their natural proportions — delivering fibre, minerals, and vitamins that commercial milling strips away.&rdquo;
              </p>
            </motion.div>

            <motion.p
              className="font-sans text-body-lg text-charcoal leading-relaxed mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Industrial roller milling separates the grain into its components — bran, germ, and endosperm — and then discards or sells the nutrient-dense portions separately. What you get in a typical supermarket atta is mostly starch, bleached and bromated to improve shelf life and appearance. Stone milling does none of this. The whole grain — bran, germ, and endosperm — is ground together, slowly, at ambient temperature.
            </motion.p>

            <motion.p
              className="font-sans text-body-lg text-charcoal leading-relaxed mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.05 }}
            >
              The key difference is heat. High-speed industrial mills generate significant heat through friction — enough to denature proteins and destroy heat-sensitive B vitamins and antioxidants. Stone mills rotate slowly, producing no meaningful heat. The grain&apos;s natural oils, which give fresh flour its sweet, nutty aroma, remain intact.
            </motion.p>

            <motion.p
              className="font-sans text-body-lg text-charcoal leading-relaxed mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              At Ridhana, we mill fresh and stamp the date on every bag. Our flour isn&apos;t sitting in a warehouse — it&apos;s made to order. That freshness translates directly into better flavour, better nutrition, and a roti that tastes the way your grandmother&apos;s did.
            </motion.p>

            {/* Trust signals */}
            <motion.div
              className="my-10 p-8 rounded-card bg-cream border border-stone/10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="font-serif text-heading text-espresso mb-6">
                What Ridhana Never Adds
              </h2>
              {[
                { claim: "No Bleach", detail: "Commercial flours are bleached to appear whiter. We don't touch ours." },
                { claim: "No Bromate", detail: "Potassium bromate is a possible carcinogen banned in many countries. It has no place in our flour." },
                { claim: "No Folic Acid", detail: "We don't fortify with synthetic folic acid. Our whole-grain flour has natural folates." },
              ].map((item) => (
                <div key={item.claim} className="flex gap-4 mb-4 last:mb-0">
                  <span className="text-gold font-bold text-lg mt-0.5">✓</span>
                  <div>
                    <p className="font-sans font-semibold text-espresso">{item.claim}</p>
                    <p className="font-sans text-body text-charcoal/70">{item.detail}</p>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* CTA */}
          <div className="mt-16 pt-10 border-t border-stone/10 flex flex-col md:flex-row items-center gap-6">
            <p className="font-serif text-heading text-espresso">
              Try the difference yourself.
            </p>
            <MagneticButton
              href="https://wa.me/919800199797"
              variant="primary"
              external
              id="blog-post-order-btn"
            >
              Order Fresh Atta
            </MagneticButton>
          </div>

          {/* Back to blog */}
          <div className="mt-8">
            <Link
              href="/blog"
              className="font-sans text-label tracking-widest uppercase text-stone hover:text-gold transition-colors duration-300 flex items-center gap-2"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <line x1="19" y1="12" x2="5" y2="12" />
                <polyline points="12 19 5 12 12 5" />
              </svg>
              All Articles
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
