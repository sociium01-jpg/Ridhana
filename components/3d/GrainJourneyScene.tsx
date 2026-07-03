"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface Chapter {
  id: number;
  label: string;
  title: string;
  body: string;
  emoji: string;
}

const chapters: Chapter[] = [
  {
    id: 1,
    label: "01 / Harvest",
    title: "Slow Grinding Process",
    body: "Our natural stone mill grinds the grain at a slow speed. Our flour is made at ambient temperature, thus keeping the natural nutrients and flavour intact.",
    emoji: "🌾",
  },
  {
    id: 2,
    label: "02 / Mill",
    title: "Stone Meets Grain",
    body: "Ancient stone chakki meets carefully selected grain. The slow rotation generates no heat — nature's process, respected.",
    emoji: "⚙️",
  },
  {
    id: 3,
    label: "03 / Flour",
    title: "Fresh Stone-Milled",
    body: "We print the mill date on every bag, so you know it's truly fresh. We produce whole grain flour which is fiber rich.",
    emoji: "✨",
  },
  {
    id: 4,
    label: "04 / Nourish",
    title: "Preservative Free",
    body: "No bleach. No bromate. No folic acid. We never add synthetic ingredients or preservatives — just pure, fresh flour the way nature intended.",
    emoji: "🫙",
  },
];

function ChapterVisual({ chapter, progress }: { chapter: Chapter; progress: number }) {
  return (
    <div
      className="relative w-full h-full flex items-center justify-center"
      aria-hidden="true"
    >
      {/* Large decorative number */}
      <div
        className="absolute font-serif text-[20vw] font-bold text-espresso/5 select-none leading-none"
        style={{ transform: `translateY(${(1 - progress) * 30}px)` }}
      >
        0{chapter.id}
      </div>

      {/* Central icon/illustration */}
      <motion.div
        className="relative z-10 flex flex-col items-center gap-8"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: progress > 0.1 ? 1 : 0, scale: progress > 0.1 ? 1 : 0.8 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Circular illustration */}
        <div className="relative">
          <div
            className="w-48 h-48 md:w-64 md:h-64 rounded-full border border-gold/20 flex items-center justify-center"
            style={{
              background: `conic-gradient(from ${progress * 360}deg, #C9A24B22, #F7F3EC, #C9A24B22)`,
            }}
          >
            <div className="w-36 h-36 md:w-48 md:h-48 rounded-full bg-cream border border-stone/10 flex items-center justify-center">
              {/* Chapter-specific illustration */}
              {chapter.id === 1 && <GrainSVG progress={progress} />}
              {chapter.id === 2 && <ChakkiSVG progress={progress} />}
              {chapter.id === 3 && <FlourCascadeSVG progress={progress} />}
              {chapter.id === 4 && <BagSVG progress={progress} />}
            </div>
          </div>

          {/* Orbiting ring */}
          <div
            className="absolute inset-0 rounded-full border border-gold/30"
            style={{ transform: `rotate(${progress * 180}deg) scale(1.15)` }}
          />
        </div>

        {/* Freshness badge (chapter 3 & 4) */}
        {(chapter.id === 3 || chapter.id === 4) && (
          <motion.div
            className="freshness-badge"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: progress > 0.5 ? 1 : 0, y: progress > 0.5 ? 0 : 10 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            Stone Milled · {new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}

// Simple SVG illustrations for each chapter
function GrainSVG({ progress }: { progress: number }) {
  return (
    <svg viewBox="0 0 80 80" className="w-20 h-20 md:w-28 md:h-28" aria-hidden="true">
      {Array.from({ length: 9 }).map((_, i) => {
        const x = 15 + (i % 3) * 25;
        const y = 15 + Math.floor(i / 3) * 20 + (i % 2) * 5;
        const delay = i * 0.1;
        const yOffset = progress > delay ? Math.sin((progress - delay) * Math.PI * 2) * 3 : 8;
        return (
          <ellipse
            key={i}
            cx={x}
            cy={y + yOffset}
            rx="7"
            ry="4"
            fill="#C9A24B"
            opacity={Math.max(0, progress * 2 - delay) * 0.8}
            transform={`rotate(${(i % 3) * 15 - 15}, ${x}, ${y + yOffset})`}
          />
        );
      })}
    </svg>
  );
}

function ChakkiSVG({ progress }: { progress: number }) {
  return (
    <svg viewBox="0 0 80 80" className="w-20 h-20 md:w-28 md:h-28" aria-hidden="true">
      {/* Base stone */}
      <ellipse cx="40" cy="52" rx="28" ry="8" fill="#8B7355" opacity="0.6" />
      {/* Top stone (rotating) */}
      <g transform={`rotate(${progress * 360}, 40, 36)`}>
        <ellipse cx="40" cy="36" rx="26" ry="7" fill="#C9A24B" opacity="0.8" />
        <ellipse cx="40" cy="36" rx="4" ry="4" fill="#2B2118" opacity="0.5" />
        <line x1="40" y1="36" x2="58" y2="28" stroke="#2B2118" strokeWidth="1" opacity="0.3" />
        <line x1="40" y1="36" x2="22" y2="44" stroke="#2B2118" strokeWidth="1" opacity="0.3" />
      </g>
      {/* Handle */}
      <line x1="60" y1="20" x2="60" y2="36" stroke="#8B7355" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

function FlourCascadeSVG({ progress }: { progress: number }) {
  return (
    <svg viewBox="0 0 80 80" className="w-20 h-20 md:w-28 md:h-28" aria-hidden="true">
      {Array.from({ length: 20 }).map((_, i) => {
        const x = 25 + Math.sin(i * 1.5) * 15;
        const baseY = 20;
        const y = baseY + (i / 20) * 45 * progress + ((i * 7) % 15);
        const size = 1 + Math.random() * 2;
        return (
          <circle
            key={i}
            cx={x}
            cy={y}
            r={size}
            fill="#F7F3EC"
            opacity={0.6 * progress}
          />
        );
      })}
      {/* Cascade lines */}
      <path
        d={`M30,15 Q40,${20 + progress * 15} 35,${30 + progress * 30}`}
        fill="none"
        stroke="#E8D5A3"
        strokeWidth="2"
        opacity={progress * 0.6}
        strokeLinecap="round"
      />
      <path
        d={`M50,15 Q42,${22 + progress * 12} 48,${32 + progress * 28}`}
        fill="none"
        stroke="#E8D5A3"
        strokeWidth="2"
        opacity={progress * 0.5}
        strokeLinecap="round"
      />
    </svg>
  );
}

function BagSVG({ progress }: { progress: number }) {
  return (
    <svg viewBox="0 0 80 80" className="w-20 h-20 md:w-28 md:h-28" aria-hidden="true">
      {/* Bag body */}
      <rect x="18" y="25" width="44" height="45" rx="4" fill="#C9A24B" opacity={0.3 + progress * 0.5} />
      <rect x="22" y="29" width="36" height="37" rx="3" fill="#DDB96A" opacity={0.4 + progress * 0.4} />
      {/* Bag top fold */}
      <path d="M22,29 L28,18 L52,18 L58,29" fill="#8B7355" opacity={0.5 + progress * 0.3} />
      {/* Label */}
      <rect x="26" y="38" width="28" height="20" rx="2" fill="#F7F3EC" opacity={progress * 0.9} />
      {/* Text lines on label */}
      <rect x="29" y="42" width="22" height="2" rx="1" fill="#2B2118" opacity={progress * 0.6} />
      <rect x="29" y="47" width="16" height="1.5" rx="0.75" fill="#8B7355" opacity={progress * 0.5} />
      <rect x="29" y="51" width="20" height="1.5" rx="0.75" fill="#8B7355" opacity={progress * 0.4} />
      {/* Mill date stamp */}
      <rect x="26" y="60" width="28" height="6" rx="1" fill="#C9A24B" opacity={progress > 0.5 ? (progress - 0.5) * 2 : 0} />
    </svg>
  );
}

// ─── Main GrainJourneySection ──────────────────────────────────────────────
export default function GrainJourney() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeChapter, setActiveChapter] = useState(0);
  const [chapterProgress, setChapterProgress] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (val) => {
      const chapterCount = chapters.length;
      const chapterIndex = Math.min(
        Math.floor(val * chapterCount),
        chapterCount - 1
      );
      const localProgress = (val * chapterCount) % 1;
      setActiveChapter(chapterIndex);
      setChapterProgress(localProgress);
    });
    return unsubscribe;
  }, [scrollYProgress]);

  const chapter = chapters[activeChapter];

  return (
    <section
      ref={containerRef}
      className="relative"
      style={{ height: `${chapters.length * 100}vh` }}
      aria-label="Grain to flour journey"
      id="grain-journey"
    >
      {/* Sticky viewport */}
      <div className="sticky top-0 h-screen overflow-hidden bg-espresso flex">
        {/* Left: Visual */}
        <div className="flex-1 relative flex items-center justify-center">
          <ChapterVisual chapter={chapter} progress={chapterProgress} />
        </div>

        {/* Right: Text content */}
        <div className="w-full md:w-[45%] flex flex-col justify-center container-px py-16">
          {/* Chapter progress dots */}
          <div className="flex gap-2 mb-10" role="tablist" aria-label="Journey chapters">
            {chapters.map((c, i) => (
              <button
                key={c.id}
                role="tab"
                aria-selected={i === activeChapter}
                aria-label={c.label}
                className={`h-px transition-all duration-500 ${
                  i === activeChapter ? "w-10 bg-gold" : "w-4 bg-bone/30"
                }`}
              />
            ))}
          </div>

          {/* Chapter label */}
          <motion.p
            key={`label-${activeChapter}`}
            className="font-sans text-label tracking-widest text-gold/70 mb-4"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            {chapter.label}
          </motion.p>

          {/* Chapter title */}
          <motion.h2
            key={`title-${activeChapter}`}
            className="font-serif text-display-md text-bone mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            {chapter.title}
          </motion.h2>

          {/* Divider */}
          <div className="section-divider bg-gold/40 mb-6" />

          {/* Chapter body */}
          <motion.p
            key={`body-${activeChapter}`}
            className="font-sans text-body-lg text-bone/70 leading-relaxed max-w-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            {chapter.body}
          </motion.p>

          {/* Progress bar */}
          <div className="mt-12">
            <div className="w-full h-px bg-bone/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gold/60 rounded-full"
                style={{
                  width: `${((activeChapter + chapterProgress) / chapters.length) * 100}%`,
                }}
                transition={{ duration: 0.1 }}
              />
            </div>
            <p className="font-sans text-label text-bone/30 mt-2 tracking-widest">
              SCROLL TO EXPLORE
            </p>
          </div>
        </div>

        {/* Grain overlay on dark bg */}
        <div className="grain-overlay opacity-[0.04]" aria-hidden="true" />
      </div>
    </section>
  );
}
