import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { products } from "@/data/products";
import MagneticButton from "@/components/ui/MagneticButton";
import ProductCard3D from "@/components/3d/ProductCard3D";

interface ProductPageProps {
  params: {
    slug: string;
  };
}

// Generate metadata for each product dynamically for SEO
export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const product = products.find((p) => p.slug === params.slug);
  if (!product) return {};

  return {
    title: `${product.name} — Stone-Milled Atta`,
    description: product.description,
    alternates: {
      canonical: `https://www.ridhana.com/products/${product.slug}`,
    },
  };
}

// Pre-generate static paths at build time
export async function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug,
  }));
}

export default function ProductDetailPage({ params }: ProductPageProps) {
  const product = products.find((p) => p.slug === params.slug);

  if (!product) {
    notFound();
  }

  // Get other products for "You may also like" slider
  const otherProducts = products.filter((p) => p.slug !== params.slug).slice(0, 3);

  // JSON-LD dynamic product schema
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    image: `https://www.ridhana.com${product.image}`,
    description: product.description,
    brand: {
      "@type": "Brand",
      name: "Ridhana",
    },
    offers: {
      "@type": "Offer",
      price: product.offers.price,
      priceCurrency: "INR",
      availability: "https://schema.org/InStock",
      url: `https://www.ridhana.com/products/${product.slug}`,
    },
  };

  return (
    <div className="bg-bone min-h-screen pt-32 pb-20 text-espresso relative">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />

      <div className="grain-overlay opacity-[0.035]" aria-hidden="true" />

      <div className="container-px max-w-[1280px] mx-auto z-10 relative">
        {/* Back Link */}
        <Link
          href="/products"
          className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-stone hover:text-espresso transition-colors mb-8"
        >
          ← Back to All Flours
        </Link>

        {/* Product Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Side: Product Hero Image (Col-span 5) */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <div className="relative h-[300px] md:h-[450px] w-full rounded-card overflow-hidden bg-cream border border-stone/10 shadow-warm-lg">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 500px"
                priority
              />
              {product.badge && (
                <div className="absolute top-4 right-4 bg-terracotta text-bone text-label font-semibold tracking-widest uppercase px-3 py-1 rounded-full text-[0.65rem]">
                  {product.badge}
                </div>
              )}
            </div>

            {/* Freshness Callout Banner */}
            <div className="p-4 rounded-card bg-gold/10 border border-gold/20 flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center text-gold shrink-0">
                ✓
              </div>
              <p className="font-sans text-[11px] text-stone-dark leading-relaxed">
                <strong>Our Milled-to-Order Promise:</strong> We do not stock flour. Your grains are milled on slow stone grinders only after your order is confirmed.
              </p>
            </div>
          </div>

          {/* Right Side: Information Details (Col-span 7) */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div>
              <span className="font-sans text-label tracking-widest uppercase text-gold block mb-2">
                Stone-Milled Atta
              </span>
              <h1 className="font-serif text-display-md text-espresso leading-tight mb-2">
                {product.name}
              </h1>
              <p className="font-serif text-2xl text-espresso font-bold">
                {product.price}
                <span className="font-sans text-xs text-stone ml-1">/{product.pricePerKg}</span>
              </p>
            </div>

            <div className="w-full h-px bg-stone/10" />

            <div className="flex flex-col gap-4">
              <h3 className="font-serif text-sm font-semibold text-espresso uppercase tracking-wider">Product Story</h3>
              <p className="font-sans text-sm text-charcoal/80 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Suitability */}
            <div className="flex flex-col gap-1.5">
              <span className="font-sans text-[10px] font-bold text-stone uppercase tracking-widest">Ideal for</span>
              <p className="font-sans text-xs text-charcoal/90 leading-relaxed bg-cream/40 p-3 rounded-lg border border-stone/5">
                {product.suitability}
              </p>
            </div>

            {/* Health Benefits checklist */}
            <div className="flex flex-col gap-3">
              <h3 className="font-serif text-sm font-semibold text-espresso uppercase tracking-wider">Nutritional Highlights</h3>
              <ul className="flex flex-col gap-2.5">
                {product.healthBenefits.map((benefit, idx) => (
                  <li key={idx} className="flex gap-2.5 items-start">
                    <span className="text-gold text-xs mt-0.5">✓</span>
                    <span className="font-sans text-xs text-stone leading-relaxed">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Nutritional Facts Table */}
            <div className="flex flex-col gap-3.5 bg-cream/35 border border-stone/10 rounded-card p-5 mt-4">
              <h3 className="font-serif text-sm font-semibold text-espresso uppercase tracking-wider">Nutritional Facts (Per 100g)</h3>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 text-center mt-2">
                <div className="flex flex-col p-2 bg-bone rounded-lg">
                  <span className="font-sans text-[9px] text-stone uppercase tracking-wider">Protein</span>
                  <span className="font-serif text-base font-bold text-espresso mt-1">{product.nutritionalFacts.protein}g</span>
                </div>
                <div className="flex flex-col p-2 bg-bone rounded-lg">
                  <span className="font-sans text-[9px] text-stone uppercase tracking-wider">Carbs</span>
                  <span className="font-serif text-base font-bold text-espresso mt-1">{product.nutritionalFacts.carbs}g</span>
                </div>
                <div className="flex flex-col p-2 bg-bone rounded-lg">
                  <span className="font-sans text-[9px] text-stone uppercase tracking-wider">Fat</span>
                  <span className="font-serif text-base font-bold text-espresso mt-1">{product.nutritionalFacts.fat}g</span>
                </div>
                <div className="flex flex-col p-2 bg-bone rounded-lg">
                  <span className="font-sans text-[9px] text-stone uppercase tracking-wider">Dietary Fibre</span>
                  <span className="font-serif text-base font-bold text-espresso mt-1">{product.nutritionalFacts.fibre}g</span>
                </div>
                <div className="flex flex-col p-2 bg-bone rounded-lg col-span-2 sm:col-span-1">
                  <span className="font-sans text-[9px] text-stone uppercase tracking-wider">Energy</span>
                  <span className="font-serif text-base font-bold text-espresso mt-1">{product.nutritionalFacts.energy} kcal</span>
                </div>
              </div>
            </div>

            {/* Storage & Shelf life */}
            <div className="flex items-center justify-between text-xs font-sans text-stone py-2 border-y border-stone/10">
              <span><strong>Gluten level:</strong> {product.glutenLevel}</span>
              <span><strong>Shelf life:</strong> {product.shelfLife.split(".")[0]}</span>
            </div>

            {/* Action CTA */}
            <div className="flex flex-col sm:flex-row gap-4 items-center mt-4">
              <MagneticButton
                href={`https://wa.me/919800199797?text=Hi%20Ridhana!%20I'd%20like%20to%20order%20the%20${encodeURIComponent(product.name)}`}
                variant="primary"
                external
                id="product-detail-whatsapp-order"
              >
                Order fresh via WhatsApp
              </MagneticButton>
            </div>
          </div>
        </div>

        {/* You May Also Like Section */}
        <div className="border-t border-stone/10 pt-16 mt-20">
          <div className="flex flex-col gap-2 mb-10 text-center md:text-left">
            <span className="font-sans text-label tracking-widest uppercase text-gold">Explore More</span>
            <h2 className="font-serif text-display-md text-espresso">Other Stone-Milled Flours</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {otherProducts.map((p, i) => (
              <ProductCard3D key={p.name} product={p} index={i} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
