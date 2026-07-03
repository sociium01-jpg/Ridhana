import type { Metadata } from "next";
import ProductsClient from "@/components/products/ProductsClient";

export const metadata: Metadata = {
  title: "Our Products — Stone-Milled Attas",
  description:
    "We provide stone-milled Atta. Our stone-milled process preserves essential fibers and nutrients, giving you flour that's lighter, tastier, and closer to its natural origin.",
  alternates: {
    canonical: "https://www.ridhana.com/products",
  },
};

const products = [
  {
    name: "MP Sharbati Wheat Atta",
    price: "₹ 120",
    pricePerKg: "Kg",
    image: "/images/product-mp-sharbati.jpg",
    description:
      "Premium Madhya Pradesh Sharbati wheat, stone-milled slowly at ambient temperature to preserve its natural sweetness, nutrients, and fibre.",
    "@type": "Product",
    offers: { price: "120", priceCurrency: "INR" },
  },
  {
    name: "MH Khapli Wheat Atta",
    price: "₹ 250",
    pricePerKg: "Kg",
    image: "/images/product-mh-khapli.jpg",
    description:
      "Ancient Emmer wheat from Maharashtra — lower gluten, richer nutrition, perfect for sensitive digestion. A heritage grain revived.",
    badge: "Heritage Grain",
    "@type": "Product",
    offers: { price: "250", priceCurrency: "INR" },
  },
  {
    name: "Bajra (Pearl Millet) Atta",
    price: "₹ 200",
    pricePerKg: "Kg",
    image: "/images/product-bajra.jpg",
    description:
      "Iron-rich pearl millet, stone-ground fresh. Ideal for rotis with a distinctive earthy, nutty flavour and high mineral content.",
    "@type": "Product",
    offers: { price: "200", priceCurrency: "INR" },
  },
  {
    name: "Jowar (Sorghum) Atta",
    price: "₹ 160",
    pricePerKg: "Kg",
    image: "/images/product-jowar.jpg",
    description:
      "Gluten-free sorghum, stone-milled to retain its natural protein and dietary fibre. Light, digestible, and deeply nourishing.",
    "@type": "Product",
    offers: { price: "160", priceCurrency: "INR" },
  },
  {
    name: "Makki (Maize) Atta",
    price: "₹ 140",
    pricePerKg: "Kg",
    image: "/images/product-makki.jpg",
    description:
      "Traditional maize flour stone-milled for the authentic taste of makki di roti. Rich in complex carbohydrates and natural fibre.",
    "@type": "Product",
    offers: { price: "140", priceCurrency: "INR" },
  },
];

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
