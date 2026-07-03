"use client";

import { motion } from "framer-motion";
import MaskedTextReveal from "@/components/ui/MaskedTextReveal";
import MagneticButton from "@/components/ui/MagneticButton";

export default function ContactClient() {
  return (
    <div className="bg-bone min-h-screen">
      {/* Header */}
      <div className="bg-espresso pt-36 pb-20">
        <div className="container-px max-w-[1440px] mx-auto">
          <MaskedTextReveal
            as="p"
            className="font-sans text-label tracking-widest uppercase text-gold mb-4"
          >
            We&apos;d Love to Hear From You
          </MaskedTextReveal>
          <MaskedTextReveal
            as="h1"
            className="font-serif text-display-xl text-bone"
            delay={0.1}
          >
            GET IN TOUCH
          </MaskedTextReveal>
        </div>
        <div className="grain-overlay opacity-[0.04]" aria-hidden="true" />
      </div>

      <div className="container-px max-w-[1440px] mx-auto section-py">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Contact details */}
          <div className="flex flex-col gap-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p className="font-sans text-label tracking-widest uppercase text-gold mb-4">Address</p>
              <address className="not-italic">
                <p className="font-serif text-heading text-espresso leading-relaxed">
                  #32, Vijaya House<br />
                  Station Road<br />
                  Vikhroli West<br />
                  Mumbai — 400083
                </p>
              </address>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <p className="font-sans text-label tracking-widest uppercase text-gold mb-4">Phone</p>
              <a
                href="tel:+919800199797"
                id="contact-phone"
                className="font-serif text-heading text-espresso hover:text-gold transition-colors duration-300"
              >
                +91 — 9800199797
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
            >
              <p className="font-sans text-label tracking-widest uppercase text-gold mb-4">Social</p>
              <a
                href="https://www.instagram.com/ridhanahealth"
                target="_blank"
                rel="noopener noreferrer"
                id="contact-instagram"
                className="font-serif text-heading text-espresso hover:text-gold transition-colors duration-300 flex items-center gap-3"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
                </svg>
                @ridhanahealth
              </a>
            </motion.div>

            {/* WhatsApp CTA */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <p className="font-sans text-label tracking-widest uppercase text-gold mb-6">
                Order via WhatsApp
              </p>
              <MagneticButton
                href="https://wa.me/919800199797"
                variant="primary"
                external
                id="contact-whatsapp-btn"
                aria-label="Contact via WhatsApp"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.553 4.116 1.522 5.849L.057 23.997l6.349-1.46A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.79 9.79 0 01-4.964-1.347l-.356-.212-3.688.848.874-3.589-.232-.368A9.763 9.763 0 012.182 12C2.182 6.584 6.584 2.182 12 2.182S21.818 6.584 21.818 12 17.416 21.818 12 21.818z"/>
                </svg>
                Contact US
              </MagneticButton>
            </motion.div>
          </div>

          {/* Map */}
          <motion.div
            className="map-container rounded-card overflow-hidden shadow-warm-lg h-80 lg:h-auto"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <iframe
              src="https://www.openstreetmap.org/export/embed.html?bbox=72.9200%2C19.0960%2C72.9320%2C19.1050&layer=mapnik&marker=19.1003%2C72.9261"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: "320px" }}
              allowFullScreen
              loading="lazy"
              title="Ridhana mill location — Vikhroli West, Mumbai"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
