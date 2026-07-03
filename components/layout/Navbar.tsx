"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const navLinks = [
  { label: "Home",        href: "/" },
  { label: "Who We Are",  href: "/who-we-are" },
  { label: "Products",    href: "/products" },
  { label: "Blog",        href: "/blog" },
  { label: "Contact",     href: "/contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled]   = useState(false);
  const [menuOpen, setMenuOpen]   = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Prevent body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      <header
        role="banner"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? "nav-blur" : "bg-transparent"
        }`}
        style={{ height: "var(--nav-height)" }}
      >
        <nav
          className="container-px h-full flex items-center justify-between max-w-[1440px] mx-auto"
          aria-label="Main navigation"
        >
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group" aria-label="Ridhana Home">
            <div className="relative w-10 h-10 flex-shrink-0">
              <Image
                src="/images/logo.png"
                alt="Ridhana Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
            <div>
              <span className="block font-serif text-espresso text-lg leading-none tracking-tight">
                Ridhana
              </span>
              <span className="block devanagari text-stone text-xs leading-none mt-0.5">
                रिधाना
              </span>
            </div>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8" role="menubar">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                role="menuitem"
                className="font-sans text-label font-medium tracking-widest uppercase text-charcoal hover:text-gold transition-colors duration-300 relative group"
              >
                {link.label}
                <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-gold transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-4">
            {/* Instagram */}
            <a
              href="https://www.instagram.com/ridhanahealth"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Ridhana on Instagram"
              className="text-charcoal hover:text-gold transition-colors duration-300 p-2"
              id="nav-instagram"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
              </svg>
            </a>

            {/* WhatsApp CTA */}
            <a
              href="https://wa.me/919800199797"
              target="_blank"
              rel="noopener noreferrer"
              id="nav-whatsapp-cta"
              aria-label="Order via WhatsApp"
              className="flex items-center gap-2 bg-gold text-espresso font-sans font-semibold text-label tracking-widest uppercase px-5 py-2.5 rounded-pill hover:bg-gold-light transition-all duration-300 shadow-gold"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.553 4.116 1.522 5.849L.057 23.997l6.349-1.46A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.79 9.79 0 01-4.964-1.347l-.356-.212-3.688.848.874-3.589-.232-.368A9.763 9.763 0 012.182 12C2.182 6.584 6.584 2.182 12 2.182S21.818 6.584 21.818 12 17.416 21.818 12 21.818z"/>
              </svg>
              Order
            </a>
          </div>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-2 text-espresso"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            id="mobile-menu-toggle"
          >
            <span className={`block w-6 h-px bg-current transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2.5" : ""}`} />
            <span className={`block w-6 h-px bg-current transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`block w-6 h-px bg-current transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2.5" : ""}`} />
          </button>
        </nav>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-espresso flex flex-col justify-center items-center"
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            role="dialog"
            aria-label="Mobile navigation"
          >
            {/* Grain overlay inside menu */}
            <div className="grain-overlay opacity-20" aria-hidden="true" />

            <nav className="flex flex-col items-center gap-8 z-10">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 30 }}
                  transition={{ delay: i * 0.06 + 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="font-serif text-bone text-4xl font-light italic hover:text-gold transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="flex items-center gap-6 mt-4"
              >
                <a
                  href="https://www.instagram.com/ridhanahealth"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="text-wheat/60 hover:text-gold transition-colors"
                >
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <circle cx="12" cy="12" r="4" />
                    <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
                  </svg>
                </a>
                <a
                  href="https://wa.me/919800199797"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp"
                  className="text-wheat/60 hover:text-gold transition-colors"
                >
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.553 4.116 1.522 5.849L.057 23.997l6.349-1.46A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.79 9.79 0 01-4.964-1.347l-.356-.212-3.688.848.874-3.589-.232-.368A9.763 9.763 0 012.182 12C2.182 6.584 6.584 2.182 12 2.182S21.818 6.584 21.818 12 17.416 21.818 12 21.818z"/>
                  </svg>
                </a>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
