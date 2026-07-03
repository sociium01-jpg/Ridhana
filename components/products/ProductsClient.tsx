"use client";

import { motion } from "framer-motion";
import ProductCard3D from "@/components/3d/ProductCard3D";
import MaskedTextReveal from "@/components/ui/MaskedTextReveal";

interface Product {
  name: string;
  price: string;
  pricePerKg: string;
  image: string;
  description: string;
  badge?: string;
}

interface ProductsClientProps {
  products: Product[];
}

export default function ProductsClient({ products }: ProductsClientProps) {
  return (
    <div className="bg-bone min-h-screen">
      {/* Page header */}
      <div className="bg-espresso pt-36 pb-20">
        <div className="container-px max-w-[1440px] mx-auto">
          <MaskedTextReveal
            as="p"
            className="font-sans text-label tracking-widest uppercase text-gold mb-4"
          >
            Stone-Milled, Fresh
          </MaskedTextReveal>
          <MaskedTextReveal
            as="h1"
            className="font-serif text-display-xl text-bone mb-6"
            delay={0.1}
          >
            OUR PRODUCTS
          </MaskedTextReveal>
          <motion.p
            className="font-sans text-body-lg text-bone/70 max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            We provide stone-milled Atta. Our stone-milled process preserves essential fibers
            and nutrients, giving you flour that&#39;s lighter, tastier, and closer to its natural
            origin. From soil to spoon, every step is guided by sustainability.
          </motion.p>
        </div>
        <div className="grain-overlay opacity-[0.04]" aria-hidden="true" />
      </div>

      {/* Sticky WhatsApp CTA */}
      <div className="sticky top-[var(--nav-height)] z-30 bg-gold py-3">
        <div className="container-px max-w-[1440px] mx-auto flex items-center justify-between">
          <p className="font-sans text-label tracking-widest uppercase text-espresso font-semibold">
            Order any product via WhatsApp — freshly milled for you
          </p>
          <a
            href="https://wa.me/919800199797"
            target="_blank"
            rel="noopener noreferrer"
            id="products-sticky-whatsapp"
            aria-label="Order via WhatsApp"
            className="flex items-center gap-2 bg-espresso text-bone font-sans text-label font-semibold tracking-widest uppercase px-5 py-2.5 rounded-pill hover:bg-stone-dark transition-all duration-300"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
              <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.553 4.116 1.522 5.849L.057 23.997l6.349-1.46A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.79 9.79 0 01-4.964-1.347l-.356-.212-3.688.848.874-3.589-.232-.368A9.763 9.763 0 012.182 12C2.182 6.584 6.584 2.182 12 2.182S21.818 6.584 21.818 12 17.416 21.818 12 21.818z"/>
            </svg>
            Order Now
          </a>
        </div>
      </div>

      {/* Products grid */}
      <section className="section-py" aria-label="Product listings">
        <div className="container-px max-w-[1440px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {products.map((product, i) => (
              <ProductCard3D key={product.name} product={product} index={i} />
            ))}
          </div>

          {/* Trust section */}
          <motion.div
            className="mt-16 p-8 md:p-12 rounded-card bg-espresso"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-serif text-heading text-bone text-center mb-8">
              Our Promise to You
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "Mill Date Printed",
                  body: "We print the mill date on every bag, so you know it's truly fresh.",
                },
                {
                  title: "No Bleach · No Bromate · No Folic Acid",
                  body: "We never add synthetic ingredients or preservatives — just pure, fresh flour the way nature intended.",
                },
                {
                  title: "Ambient Temperature Milled",
                  body: "Our slow stone-grinding process generates no heat — nutrients and flavour stay completely intact.",
                },
              ].map((item) => (
                <div key={item.title} className="text-center">
                  <div className="w-8 h-px bg-gold mx-auto mb-4" />
                  <h3 className="font-serif text-bone text-subheading mb-3">{item.title}</h3>
                  <p className="font-sans text-bone/60 text-body">{item.body}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
