import type { Metadata } from "next";
import CalculatorClient from "@/components/calculator/CalculatorClient";

export const metadata: Metadata = {
  title: "Immersive Nutrition Journey — Know Your Blueprint",
  description:
    "Input your health metrics, calculate your daily energy expenditure (TDEE), and discover custom stone-milled Ridhāna flours matching your dietary needs.",
  alternates: {
    canonical: "https://www.ridhana.com/calculator",
  },
};

export default function CalculatorPage() {
  return (
    <>
      <CalculatorClient />
    </>
  );
}
