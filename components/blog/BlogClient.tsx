"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import MaskedTextReveal from "@/components/ui/MaskedTextReveal";

interface Post {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  image: string;
  date: string;
}

interface BlogClientProps {
  posts: Post[];
}

export default function BlogClient({ posts }: BlogClientProps) {
  return (
    <div className="bg-bone min-h-screen">
      {/* Header */}
      <div className="bg-espresso pt-36 pb-20">
        <div className="container-px max-w-[1440px] mx-auto">
          <MaskedTextReveal
            as="p"
            className="font-sans text-label tracking-widest uppercase text-gold mb-4"
          >
            From the Mill
          </MaskedTextReveal>
          <MaskedTextReveal
            as="h1"
            className="font-serif text-display-xl text-bone"
            delay={0.1}
          >
            Journal
          </MaskedTextReveal>
        </div>
        <div className="grain-overlay opacity-[0.04]" aria-hidden="true" />
      </div>

      <div className="container-px max-w-[1440px] mx-auto section-py">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {posts.map((post, i) => (
            <motion.article
              key={post.slug}
              className="blog-card bg-cream"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              aria-labelledby={`post-${post.slug}-title`}
            >
              <Link href={`/post/${post.slug}`}>
                <div className="relative h-56 overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover"
                    style={{ filter: "saturate(0.85)" }}
                  />
                </div>
                <div className="p-8">
                  <p className="font-sans text-label tracking-widest uppercase text-gold mb-3">
                    {post.category}
                  </p>
                  <h2
                    id={`post-${post.slug}-title`}
                    className="font-serif text-heading text-espresso mb-4 leading-tight"
                  >
                    {post.title}
                  </h2>
                  <p className="font-sans text-body text-charcoal leading-relaxed mb-6">
                    {post.excerpt}
                  </p>
                  <span className="font-sans text-label font-semibold tracking-widest uppercase text-espresso inline-flex items-center gap-2 hover:text-gold transition-colors duration-300">
                    Read Article
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </span>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </div>
  );
}
