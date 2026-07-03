"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import MaskedTextReveal from "@/components/ui/MaskedTextReveal";

export default function BlogTeaser() {
  return (
    <section
      className="section-py container-px max-w-[1440px] mx-auto"
      aria-labelledby="blog-teaser-heading"
      id="blog-teaser"
    >
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <MaskedTextReveal
            as="p"
            className="font-sans text-label tracking-widest uppercase text-gold mb-4"
          >
            From the Mill
          </MaskedTextReveal>
          <MaskedTextReveal
            as="h2"
            id="blog-teaser-heading"
            className="font-serif text-display-md text-espresso"
            delay={0.1}
          >
            Latest Thoughts
          </MaskedTextReveal>
        </div>
        <Link
          href="/blog"
          className="font-sans text-label tracking-widest uppercase text-charcoal hover:text-gold transition-colors duration-300 flex items-center gap-2"
          id="blog-view-all"
        >
          All Articles
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </Link>
      </div>

      {/* Blog card */}
      <motion.article
        className="blog-card bg-cream"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        aria-labelledby="blog-post-1-title"
      >
        <Link
          href="/post/why-stone-ground-whole-wheat-flour-is-better"
          className="grid grid-cols-1 md:grid-cols-2"
          id="blog-post-1-link"
          aria-label="Read: Why Stone Ground Whole Wheat Flour Is Better"
        >
          {/* Image */}
          <div className="relative h-64 md:h-auto overflow-hidden">
            <Image
              src="/images/hero-bg.png"
              alt="Stone ground whole wheat flour"
              fill
              className="object-cover"
              style={{ filter: "saturate(0.85)" }}
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>

          {/* Content */}
          <div className="p-8 md:p-12 flex flex-col justify-center">
            <p className="font-sans text-label tracking-widest uppercase text-gold mb-4">
              Craft & Knowledge
            </p>
            <h3
              id="blog-post-1-title"
              className="font-serif text-display-md text-espresso mb-4 leading-tight"
            >
              Why Stone Ground Whole Wheat Flour Is Better
            </h3>
            <div className="section-divider mb-4" />
            <p className="font-sans text-body text-charcoal leading-relaxed mb-8">
              When I first started baking at home, I quickly realized not all flours
              are the same. The texture, the aroma, the way dough comes together —
              it all changes with what&#39;s in the bag.
            </p>
            <span className="font-sans text-label font-semibold tracking-widest uppercase text-espresso inline-flex items-center gap-2 hover:text-gold transition-colors duration-300">
              Read Article
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </span>
          </div>
        </Link>
      </motion.article>
    </section>
  );
}
