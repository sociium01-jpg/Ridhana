"use client";

import { useRef, useCallback, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import clsx from "clsx";

interface Product {
  name: string;
  price: string;
  pricePerKg: string;
  image: string;
  description: string;
  badge?: string;
}

interface ProductCard3DProps {
  product: Product;
  index?: number;
  showOrder?: boolean;
}

export default function ProductCard3D({
  product,
  index = 0,
  showOrder = true,
}: ProductCard3DProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [showStamp, setShowStamp] = useState(false);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const card = cardRef.current;
      if (!card) return;
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2)  / (rect.width  / 2);
      const y = (e.clientY - rect.top  - rect.height / 2) / (rect.height / 2);
      setRotate({ x: -y * 8, y: x * 8 });
    },
    []
  );

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
    setTimeout(() => setShowStamp(true), 300);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    setShowStamp(false);
    setRotate({ x: 0, y: 0 });
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      style={{ perspective: "1000px" }}
    >
      <div
        ref={cardRef}
        className="relative rounded-card overflow-hidden bg-cream border border-stone/10 group"
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
          transition: isHovered
            ? "transform 0.15s ease"
            : "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s ease",
          boxShadow: isHovered
            ? "0 30px 80px rgba(43,33,24,0.18), 0 0 0 1px rgba(201,162,75,0.2)"
            : "0 8px 32px rgba(43,33,24,0.08)",
          transformStyle: "preserve-3d",
        }}
      >
        {/* Sheen overlay on hover */}
        <div
          className="absolute inset-0 z-10 pointer-events-none transition-opacity duration-300"
          style={{
            background: isHovered
              ? `linear-gradient(${135 + rotate.y * 3}deg, rgba(255,255,255,0.08) 0%, transparent 60%)`
              : "none",
            opacity: isHovered ? 1 : 0,
          }}
          aria-hidden="true"
        />

        {/* Product image */}
        <div className="relative h-56 md:h-64 overflow-hidden bg-bone">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-600 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />

          {/* Mill date stamp (appears on hover) */}
          <motion.div
            className="absolute bottom-3 left-3 freshness-badge z-20"
            initial={{ opacity: 0, scale: 0.8, y: 6 }}
            animate={showStamp ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.8, y: 6 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            aria-label="Freshly milled"
          >
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            Freshly Milled
          </motion.div>

          {product.badge && (
            <div className="absolute top-3 right-3 bg-terracotta text-bone text-label font-semibold tracking-widest uppercase px-3 py-1 rounded-full text-[0.6rem]">
              {product.badge}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6">
          <h3 className="font-serif text-heading text-espresso mb-1 leading-tight">
            {product.name}
          </h3>
          <p className="font-sans text-body text-stone mb-4 line-clamp-2">
            {product.description}
          </p>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-sans text-label text-stone/60 tracking-widest uppercase mb-0.5">
                Price
              </p>
              <p className="font-serif text-2xl text-espresso font-semibold">
                {product.price}
                <span className="font-sans text-label text-stone ml-1">/{product.pricePerKg}</span>
              </p>
            </div>

            {showOrder && (
              <a
                href="https://wa.me/919800199797"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Order ${product.name} via WhatsApp`}
                id={`product-order-${product.name.toLowerCase().replace(/\s+/g, "-")}`}
                className={clsx(
                  "flex items-center gap-2",
                  "bg-espresso text-bone font-sans text-label font-semibold tracking-widest uppercase",
                  "px-5 py-3 rounded-pill",
                  "hover:bg-gold hover:text-espresso transition-all duration-300"
                )}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.553 4.116 1.522 5.849L.057 23.997l6.349-1.46A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.79 9.79 0 01-4.964-1.347l-.356-.212-3.688.848.874-3.589-.232-.368A9.763 9.763 0 012.182 12C2.182 6.584 6.584 2.182 12 2.182S21.818 6.584 21.818 12 17.416 21.818 12 21.818z"/>
                </svg>
                Order
              </a>
            )}
          </div>
        </div>

        {/* Bottom trust signals */}
        <div className="px-6 pb-5 flex gap-4">
          {["No Bleach", "No Bromate", "No Folic Acid"].map((claim) => (
            <span key={claim} className="font-sans text-[0.6rem] font-semibold tracking-wider uppercase text-stone/50 flex items-center gap-1">
              <span className="text-gold">✓</span> {claim}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
