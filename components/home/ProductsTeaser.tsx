"use client";

import { motion } from "framer-motion";
import ProductCard3D from "@/components/3d/ProductCard3D";
import MagneticButton from "@/components/ui/MagneticButton";
import MaskedTextReveal from "@/components/ui/MaskedTextReveal";

const featuredProducts = [
  {
    name: "MP Sharbati Wheat Atta",
    price: "₹ 120",
    pricePerKg: "Kg",
    image: "/images/product-mp-sharbati.jpg",
    description: "Premium Madhya Pradesh Sharbati wheat, stone-milled slowly to preserve its natural sweetness and nutrition.",
  },
  {
    name: "MH Khapli Wheat Atta",
    price: "₹ 250",
    pricePerKg: "Kg",
    image: "/images/product-mh-khapli.jpg",
    description: "Ancient Emmer wheat from Maharashtra — lower gluten, richer nutrition, perfect for sensitive digestion.",
    badge: "Heritage Grain",
  },
  {
    name: "Bajra (Pearl Millet) Atta",
    price: "₹ 200",
    pricePerKg: "Kg",
    image: "/images/product-bajra.jpg",
    description: "Iron-rich pearl millet, stone-ground fresh. Ideal for rotis with a distinctive earthy, nutty flavour.",
  },
];

export default function ProductsTeaser() {
  return (
    <section
      className="section-py bg-bone"
      aria-labelledby="products-teaser-heading"
      id="featured-products"
    >
      <div className="container-px max-w-[1440px] mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <MaskedTextReveal
              as="p"
              className="font-sans text-label tracking-widest uppercase text-gold mb-4"
            >
              Our Products
            </MaskedTextReveal>
            <MaskedTextReveal
              as="h2"
              id="products-teaser-heading"
              className="font-serif text-display-md text-espresso"
              delay={0.1}
            >
              Stone-Milled Attas
            </MaskedTextReveal>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <MagneticButton href="/products" variant="outline" id="home-view-all-products">
              View All Products
            </MagneticButton>
          </motion.div>
        </div>

        {/* Products grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {featuredProducts.map((product, i) => (
            <ProductCard3D key={product.name} product={product} index={i} />
          ))}
        </div>

        {/* WhatsApp order banner */}
        <motion.div
          className="mt-12 p-6 md:p-8 rounded-card bg-gold/10 border border-gold/20 flex flex-col md:flex-row items-center justify-between gap-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <div>
            <p className="font-serif text-heading text-espresso mb-2">
              Order Fresh, Direct to Your Door
            </p>
            <p className="font-sans text-body text-charcoal/70">
              Message us on WhatsApp and we&#39;ll mill your order fresh.
            </p>
          </div>
          <MagneticButton
            href="https://wa.me/919800199797"
            variant="primary"
            external
            id="products-whatsapp-banner"
            aria-label="Order via WhatsApp"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
              <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.553 4.116 1.522 5.849L.057 23.997l6.349-1.46A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.79 9.79 0 01-4.964-1.347l-.356-.212-3.688.848.874-3.589-.232-.368A9.763 9.763 0 012.182 12C2.182 6.584 6.584 2.182 12 2.182S21.818 6.584 21.818 12 17.416 21.818 12 21.818z"/>
            </svg>
            Order via WhatsApp
          </MagneticButton>
        </motion.div>
      </div>
    </section>
  );
}
