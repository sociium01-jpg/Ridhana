"use client";

import { motion } from "framer-motion";

export default function FloatingWhatsApp() {
  return (
    <motion.a
      href="https://wa.me/919800199797"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Order via WhatsApp"
      id="floating-whatsapp-btn"
      className="floating-whatsapp flex items-center justify-center w-14 h-14 bg-gold rounded-full shadow-gold hover:bg-gold-light transition-colors duration-300"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 2, duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      <svg
        width="26"
        height="26"
        viewBox="0 0 24 24"
        fill="#2B2118"
        aria-hidden="true"
      >
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
        <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.553 4.116 1.522 5.849L.057 23.997l6.349-1.46A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.79 9.79 0 01-4.964-1.347l-.356-.212-3.688.848.874-3.589-.232-.368A9.763 9.763 0 012.182 12C2.182 6.584 6.584 2.182 12 2.182S21.818 6.584 21.818 12 17.416 21.818 12 21.818z" />
      </svg>
    </motion.a>
  );
}
