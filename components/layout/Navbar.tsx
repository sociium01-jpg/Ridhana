"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";

const navLinks = [
  { label: "Home",        href: "/" },
  { label: "Who We Are",  href: "/who-we-are" },
  { label: "Products",    href: "/products" },
  { label: "Nutrition",   href: "/calculator" },
  { label: "Blog",        href: "/blog" },
  { label: "Contact",     href: "/contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Inline SVG icons for the mobile bottom tab bar
  const getIcon = (href: string, isActive: boolean) => {
    const activeColor = "#C9A24B"; // Gold
    const inactiveColor = "#F7F3EC"; // Bone
    const stroke = isActive ? activeColor : inactiveColor;
    const opacity = isActive ? "1" : "0.6";

    if (href === "/") {
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ opacity }}>
          <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
      );
    }
    if (href === "/who-we-are") {
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ opacity }}>
          <path d="M2 22s1-4 10-4 10 4 10 4" />
          <circle cx="12" cy="10" r="3" />
          <path d="M12 2v2" />
        </svg>
      );
    }
    if (href === "/products") {
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ opacity }}>
          <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
          <path d="M3 6h18" />
          <path d="M16 10a4 4 0 0 1-8 0" />
        </svg>
      );
    }
    if (href === "/calculator") {
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ opacity }}>
          <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
        </svg>
      );
    }
    if (href === "/blog") {
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ opacity }}>
          <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z" />
          <path d="M6 6h10" />
          <path d="M6 10h10" />
        </svg>
      );
    }
    return (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ opacity }}>
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
      </svg>
    );
  };

  return (
    <>
      {/* Top Header App Bar */}
      <header
        role="banner"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-espresso shadow-warm-md" : "bg-transparent"
        }`}
        style={{ height: "var(--nav-height)" }}
      >
        <nav
          className="container-px h-full flex items-center justify-between max-w-[1440px] mx-auto"
          aria-label="Main navigation"
        >
          {/* Logo Branding */}
          <Link href="/" className="flex items-center gap-2.5 group" aria-label="Ridhana Home">
            <div className="relative w-8 h-8 flex-shrink-0">
              <Image
                src="/images/logo.png"
                alt="Ridhana Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
            <div>
              <span className={`block font-serif text-base leading-none tracking-tight transition-colors duration-300 ${scrolled ? "text-bone" : "text-espresso"}`}>
                Ridhana
              </span>
              <span className={`block devanagari text-[10px] leading-none mt-0.5 transition-colors duration-300 ${scrolled ? "text-wheat/50" : "text-stone/60"}`}>
                रिधाना
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-8" role="menubar">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  role="menuitem"
                  className={`font-sans text-label font-medium tracking-widest uppercase text-xs transition-colors duration-300 relative group ${
                    isActive
                      ? "text-gold font-bold"
                      : scrolled
                      ? "text-bone/80 hover:text-gold"
                      : "text-charcoal hover:text-gold"
                  }`}
                >
                  {link.label}
                  <span className={`absolute -bottom-0.5 left-0 h-px bg-gold transition-all duration-300 ${isActive ? "w-full" : "w-0 group-hover:w-full"}`} />
                </Link>
              );
            })}
          </div>

          {/* Top Bar Quick Action (Order Button) */}
          <div className="flex items-center gap-3">
            <a
              href="https://wa.me/919800199797"
              target="_blank"
              rel="noopener noreferrer"
              id="nav-whatsapp-cta"
              aria-label="Order via WhatsApp"
              className="flex items-center gap-1.5 bg-gold text-espresso font-sans font-semibold text-[10px] tracking-widest uppercase px-4 py-2 rounded-full hover:bg-gold-light transition-all duration-300 shadow-gold"
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.553 4.116 1.522 5.849L.057 23.997l6.349-1.46A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.79 9.79 0 01-4.964-1.347l-.356-.212-3.688.848.874-3.589-.232-.368A9.763 9.763 0 012.182 12C2.182 6.584 6.584 2.182 12 2.182S21.818 6.584 21.818 12 17.416 21.818 12 21.818z"/>
              </svg>
              Order
            </a>
          </div>
        </nav>
      </header>

      {/* Mobile & Tablet App Bottom Tab Bar Navigation */}
      <nav
        className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-espresso/95 backdrop-blur-md border-t border-bone/10 py-2 pb-safe px-4 flex items-center justify-around"
        aria-label="Mobile bottom navigation"
      >
        {navLinks.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className="flex flex-col items-center justify-center flex-1 py-1 gap-1 relative"
            >
              {/* Highlight background for active tab */}
              {isActive && (
                <motion.div
                  layoutId="activeTabIndicator"
                  className="absolute inset-0 bg-gold/10 rounded-xl"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}

              {/* Tab Icon */}
              <div className="relative z-10">{getIcon(link.href, isActive)}</div>

              {/* Tab Label */}
              <span
                className={`font-sans text-[9px] tracking-wider uppercase font-semibold relative z-10 transition-colors ${
                  isActive ? "text-gold" : "text-bone/60"
                }`}
              >
                {link.label === "Who We Are" ? "About" : link.label}
              </span>
            </Link>
          );
        })}
      </nav>
    </>
  );
}
