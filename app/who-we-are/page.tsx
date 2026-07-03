import type { Metadata } from "next";
import WhoWeAreClient from "@/components/who-we-are/WhoWeAreClient";

export const metadata: Metadata = {
  title: "Who We Are — A Return to Honest Grain",
  description:
    "The Story of Ridhana: A Return to Honest Grains. Born from a personal journey toward healing and Ayurvedic wisdom, Ridhana is a 'quiet rebellion' against industrial milling. Discover how we are bringing back slow-ground, nutrient-rich flour.",
  alternates: {
    canonical: "https://www.ridhana.com/who-we-are",
  },
};

export default function WhoWeArePage() {
  return <WhoWeAreClient />;
}
