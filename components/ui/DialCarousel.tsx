"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";
import clsx from "clsx";
import { products } from "@/data/products";

export default function DialCarousel() {
  const [activeIndex, setActiveIndex] = useState(1); // Set MH Khapli as default active
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragX = useMotionValue(0);

  // Responsive check
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % products.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + products.length) % products.length);
  };

  const handleDragEnd = () => {
    const dragDistance = dragX.get();
    const swipeThreshold = 50;

    if (dragDistance < -swipeThreshold) {
      handleNext();
    } else if (dragDistance > swipeThreshold) {
      handlePrev();
    }
    dragX.set(0); // Reset drag motion value
  };

  return (
    <div className="relative w-full overflow-hidden select-none py-12 bg-bone">
      {/* Curved Perspective Container */}
      <div 
        ref={containerRef}
        className="relative flex items-center justify-center h-[520px] md:h-[580px] w-full"
        style={{
          perspective: "1200px",
          transformStyle: "preserve-3d",
        }}
      >
        {/* Swipe helper on mobile */}
        <div className="absolute top-2 font-sans text-[10px] tracking-widest text-stone/40 uppercase font-semibold pointer-events-none md:hidden animate-pulse">
          ← Swipe to explore Attas →
        </div>

        {/* Draggable Area Wrapper */}
        <motion.div
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.4}
          style={{ x: dragX, transformStyle: "preserve-3d" }}
          onDragEnd={handleDragEnd}
          className="absolute inset-0 flex items-center justify-center cursor-grab active:cursor-grabbing"
        >
          {products.map((product, i) => {
            // Calculate absolute and relative offsets for 3D layout position
            const offset = i - activeIndex;
            const absOffset = Math.abs(offset);
            const isActive = i === activeIndex;

            // Compute dynamic positions for the cylindrical/dial layout
            let xTranslation = 0;
            let zTranslation = 0;
            let rotationY = 0;
            let opacity = 0;

            // Desktop layout (Spread out 3D Dial)
            if (!isMobile) {
              xTranslation = offset * 280 - Math.sign(offset) * (absOffset * 10);
              zTranslation = absOffset * -120;
              rotationY = offset * -12;
              opacity = absOffset === 0 ? 1 : absOffset === 1 ? 0.8 : absOffset === 2 ? 0.45 : 0;
            } else {
              // Mobile layout (Narrower overlapping stack for app-like thumb swiping)
              xTranslation = offset * 180 - Math.sign(offset) * (absOffset * 15);
              zTranslation = absOffset * -160;
              rotationY = offset * -22;
              opacity = absOffset === 0 ? 1 : absOffset === 1 ? 0.75 : absOffset === 2 ? 0.2 : 0;
            }

            // Outer items are hidden
            const isVisible = absOffset <= 2;

            const cardContent = (
              <div className="relative h-full flex flex-col justify-between cursor-pointer">
                {/* Image & Badge Header */}
                <div className="relative h-48 md:h-56 overflow-hidden bg-bone">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 290px, 340px"
                  />

                  {/* Freshness Badge */}
                  <div className="absolute bottom-3 left-3 freshness-badge z-20">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 6 12 12 16 14" />
                    </svg>
                    Freshly Milled
                  </div>

                  {product.badge && (
                    <div className="absolute top-3 right-3 bg-terracotta text-bone text-label font-semibold tracking-widest uppercase px-3 py-1 rounded-full text-[0.6rem]">
                      {product.badge}
                    </div>
                  )}
                </div>

                {/* Body details */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-serif text-lg md:text-xl text-espresso mb-1 font-semibold leading-tight">
                      {product.name}
                    </h3>
                    <p className="font-sans text-xs text-stone mb-3 line-clamp-2 leading-relaxed">
                      {product.description}
                    </p>
                  </div>

                  {/* Price and Action */}
                  <div className="flex items-center justify-between mt-auto">
                    <div>
                      <p className="font-sans text-[9px] text-stone/50 tracking-widest uppercase mb-0.5">Price</p>
                      <p className="font-serif text-xl md:text-2xl text-espresso font-semibold">
                        {product.price}
                        <span className="font-sans text-xs text-stone ml-1">/{product.pricePerKg}</span>
                      </p>
                    </div>

                    <a
                      href="https://wa.me/919800199797"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Order ${product.name} via WhatsApp`}
                      id={`product-order-${product.name.toLowerCase().replace(/\s+/g, "-")}`}
                      onClick={(e) => e.stopPropagation()}
                      className="flex items-center gap-1.5 bg-espresso text-bone hover:bg-gold hover:text-espresso font-sans text-[10px] font-semibold tracking-widest uppercase px-4 py-2.5 rounded-full transition-all duration-300 shadow-md"
                    >
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                        <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.553 4.116 1.522 5.849L.057 23.997l6.349-1.46A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.79 9.79 0 01-4.964-1.347l-.356-.212-3.688.848.874-3.589-.232-.368A9.763 9.763 0 012.182 12C2.182 6.584 6.584 2.182 12 2.182S21.818 6.584 21.818 12 17.416 21.818 12 21.818z"/>
                      </svg>
                      Order
                    </a>
                  </div>
                </div>

                {/* Trust Signals */}
                <div className="px-5 pb-4 flex justify-between border-t border-stone/5 pt-3 bg-stone/5">
                  {["No Bleach", "No Bromate", "No Folic Acid"].map((claim) => (
                    <span key={claim} className="font-sans text-[8px] font-bold tracking-wider uppercase text-stone/55 flex items-center gap-0.5">
                      <span className="text-gold">✓</span> {claim}
                    </span>
                  ))}
                </div>
              </div>
            );

            return (
              <motion.div
                key={product.name}
                className="absolute w-[290px] md:w-[340px] h-[400px] md:h-[460px] origin-center transition-shadow duration-500 rounded-card overflow-hidden bg-cream border border-stone/10"
                style={{
                  pointerEvents: isActive ? "auto" : "none", // Prevent clicks on background cards
                  boxShadow: isActive 
                    ? "0 25px 50px -12px rgba(43,33,24,0.22), 0 0 0 1px rgba(201,162,75,0.15)"
                    : "0 8px 16px -4px rgba(43,33,24,0.08)",
                }}
                animate={{
                  x: xTranslation,
                  z: zTranslation,
                  rotateY: rotationY,
                  scale: isActive ? 1.0 : isMobile ? 0.8 : 0.88,
                  opacity: isVisible ? opacity : 0,
                }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 28,
                }}
                onClick={() => {
                  if (!isActive) {
                    setActiveIndex(i);
                  }
                }}
              >
                {isActive ? (
                  <Link href={`/products/${product.slug}`} className="block h-full">
                    {cardContent}
                  </Link>
                ) : (
                  cardContent
                )}
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* Manual Navigation Controls & Dots */}
      <div className="flex flex-col items-center gap-6 mt-4">
        {/* Navigation Buttons (Desktop only) */}
        <div className="hidden md:flex items-center gap-4">
          <button
            onClick={handlePrev}
            className="w-10 h-10 rounded-full border border-gold/40 flex items-center justify-center text-espresso hover:bg-gold hover:text-espresso transition-all duration-300 active:scale-95"
            aria-label="Previous product"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          
          <span className="font-sans text-xs font-semibold tracking-widest text-stone uppercase">
            {activeIndex + 1} / {products.length}
          </span>

          <button
            onClick={handleNext}
            className="w-10 h-10 rounded-full border border-gold/40 flex items-center justify-center text-espresso hover:bg-gold hover:text-espresso transition-all duration-300 active:scale-95"
            aria-label="Next product"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>

        {/* Indicators Dots (Mobile & Desktop) */}
        <div className="flex gap-2.5">
          {products.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={clsx(
                "h-2 rounded-full transition-all duration-500",
                i === activeIndex ? "w-8 bg-gold" : "w-2 bg-stone/20"
              )}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
