import type { Metadata } from "next";
import ProductsClient from "@/components/products/ProductsClient";
import { products } from "@/data/products";

export const metadata: Metadata = {
  title: "Our Products — Stone-Milled Attas",
  description:
    "We provide stone-milled Atta. Our stone-milled process preserves essential fibers and nutrients, giving you flour that's lighter, tastier, and closer to its natural origin.",
  alternates: {
    canonical: "https://www.ridhana.com/products",
  },
};

// Product JSON-LD schema
const productSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Ridhana Stone-Milled Attas",
  itemListElement: products.map((p, i) => ({
    "@type": "ListItem",
    position: i + 1,
    item: {
      "@type": "Product",
      name: p.name,
      description: p.description,
      brand: { "@type": "Brand", name: "Ridhana" },
      offers: {
        "@type": "Offer",
        price: p.offers.price,
        priceCurrency: "INR",
        availability: "https://schema.org/InStock",
        seller: { "@type": "Organization", name: "Ridhana" },
      },
    },
  })),
};

export default function ProductsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <ProductsClient products={products} />
    </>
  );
}
