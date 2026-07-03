import type { Metadata } from "next";
import Hero from "@/components/home/Hero";
import GrainJourney from "@/components/3d/GrainJourneyScene";
import PillarSection from "@/components/home/PillarSection";
import BrandSection from "@/components/home/BrandSection";
import ProcessSection from "@/components/home/ProcessSection";
import ProductsTeaser from "@/components/home/ProductsTeaser";
import MillVisit from "@/components/home/MillVisit";
import BlogTeaser from "@/components/home/BlogTeaser";

export const metadata: Metadata = {
  title: "Ridhana — Stone Milled Goodness, Rooted in Tradition",
  description:
    "Experience the art of slow milling with our fresh, preservative-free flours. From Khapli Wheat to Jowar and Bajra, we bring pure, nutrient-rich nourishment from the stone mill to your kitchen.",
  alternates: {
    canonical: "https://www.ridhana.com",
  },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <GrainJourney />
      <PillarSection />
      <BrandSection />
      <ProcessSection />
      <ProductsTeaser />
      <MillVisit />
      <BlogTeaser />
    </>
  );
}
