import Link from "next/link";
import Image from "next/image";

const navLinks = [
  { label: "Home",       href: "/" },
  { label: "Who We Are", href: "/who-we-are" },
  { label: "Products",   href: "/products" },
  { label: "Blog",       href: "/blog" },
  { label: "Contact",    href: "/contact" },
];

export default function Footer() {
  return (
    <footer className="bg-espresso text-bone" role="contentinfo">
      <div className="container-px max-w-[1440px] mx-auto">
        {/* Top section */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-3 gap-12 border-b border-bone/10">
          {/* Brand */}
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 flex-shrink-0 brightness-[5]">
                <Image
                  src="/images/logo.png"
                  alt="Ridhana Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <div>
                <span className="block font-serif text-bone text-xl leading-none tracking-tight">
                  Ridhana
                </span>
                <span className="block devanagari text-wheat/60 text-sm leading-none mt-1">
                  रिधाना
                </span>
              </div>
            </div>
            <p className="font-sans text-wheat/60 text-sm leading-relaxed max-w-xs">
              Grains Chosen with Care. Flour Crafted with Integrity.
            </p>
            {/* Social links */}
            <div className="flex items-center gap-4">
              <a
                href="https://www.instagram.com/ridhanahealth"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Ridhana on Instagram"
                className="text-wheat/50 hover:text-gold transition-colors duration-300 p-1.5"
                id="footer-instagram"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
                </svg>
              </a>
              <a
                href="https://wa.me/919800199797"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Order via WhatsApp"
                className="text-wheat/50 hover:text-gold transition-colors duration-300 p-1.5"
                id="footer-whatsapp"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.553 4.116 1.522 5.849L.057 23.997l6.349-1.46A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.79 9.79 0 01-4.964-1.347l-.356-.212-3.688.848.874-3.589-.232-.368A9.763 9.763 0 012.182 12C2.182 6.584 6.584 2.182 12 2.182S21.818 6.584 21.818 12 17.416 21.818 12 21.818z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Navigation */}
          <nav aria-label="Footer navigation">
            <p className="font-sans text-label font-semibold tracking-widest uppercase text-wheat/40 mb-6">
              Navigate
            </p>
            <ul className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-sans text-wheat/70 hover:text-gold transition-colors duration-300 text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div>
            <p className="font-sans text-label font-semibold tracking-widest uppercase text-wheat/40 mb-6">
              Contact
            </p>
            <address className="not-italic flex flex-col gap-4">
              <p className="font-sans text-wheat/70 text-sm leading-relaxed">
                #32, Vijaya House<br />
                Station Road, Vikhroli West<br />
                Mumbai — 400083
              </p>
              <a
                href="tel:+919800199797"
                className="font-sans text-wheat/70 hover:text-gold transition-colors duration-300 text-sm"
                id="footer-phone"
              >
                +91 9800199797
              </a>
              <a
                href="https://wa.me/919800199797"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-gold text-label font-semibold tracking-widest uppercase text-sm hover:text-gold-light transition-colors duration-300"
                id="footer-whatsapp-order"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.553 4.116 1.522 5.849L.057 23.997l6.349-1.46A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.79 9.79 0 01-4.964-1.347l-.356-.212-3.688.848.874-3.589-.232-.368A9.763 9.763 0 012.182 12C2.182 6.584 6.584 2.182 12 2.182S21.818 6.584 21.818 12 17.416 21.818 12 21.818z"/>
                </svg>
                Order via WhatsApp
              </a>
            </address>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="py-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-sans text-wheat/40 text-xs tracking-wide">
            © 2026 by Ridhana. Grains Chosen with Care. Flour Crafted with Integrity. All rights reserved.
          </p>
          <p className="font-sans text-wheat/30 text-xs">
            Vikhroli, Mumbai
          </p>
        </div>
      </div>
    </footer>
  );
}
