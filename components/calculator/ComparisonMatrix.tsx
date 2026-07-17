"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import clsx from "clsx";

interface ProductData {
  name: string;
  price: string;
  protein: number; // in grams per 100g
  carbs: number;   // in grams per 100g
  fat: number;     // in grams per 100g
  fibre: number;   // in grams per 100g
  gluten: string;  // "Medium", "Low", "Gluten-Free"
  pros: string[];
  useCases: string;
  recipes: string[];
}

const comparisonProducts: ProductData[] = [
  {
    name: "MP Sharbati Wheat Atta",
    price: "₹ 120/Kg",
    protein: 12.1,
    carbs: 71.5,
    fat: 2.0,
    fibre: 11.2,
    gluten: "Medium",
    pros: ["Makes softest rotis", "Naturally sweet aroma", "Easy to knead"],
    useCases: "Daily rotis, phulkas, chapattis",
    recipes: ["Tandoori Roti", "Stuffed Parathas"],
  },
  {
    name: "MH Khapli Wheat Atta",
    price: "₹ 250/Kg",
    protein: 13.5,
    carbs: 68.2,
    fat: 1.8,
    fibre: 14.8,
    gluten: "Low (Weak)",
    pros: ["Diabetic friendly", "Easy on digestion", "High ancient fibre"],
    useCases: "Sensitive gut, sugar regulation, sourdoughs",
    recipes: ["Khapli Roti", "Whole Wheat Bread"],
  },
  {
    name: "Bajra (Pearl Millet) Atta",
    price: "₹ 200/Kg",
    protein: 11.6,
    carbs: 67.5,
    fat: 4.8,
    fibre: 12.4,
    gluten: "Gluten-Free",
    pros: ["High iron content", "Warm energy source", "Rich in minerals"],
    useCases: "Winter diet, gluten intolerance, iron replenishment",
    recipes: ["Bajra Rotla", "Bajra Khichu"],
  },
  {
    name: "Jowar (Sorghum) Atta",
    price: "₹ 160/Kg",
    protein: 10.4,
    carbs: 72.6,
    fat: 3.1,
    fibre: 10.2,
    gluten: "Gluten-Free",
    pros: ["Highly alkaline", "Weight management", "Lighter on stomach"],
    useCases: "Gluten-free baking, high blood pressure regulation",
    recipes: ["Jowar Bhakri", "Gluten-Free Porridge"],
  },
  {
    name: "Makki (Maize) Atta",
    price: "₹ 140/Kg",
    protein: 9.2,
    carbs: 74.3,
    fat: 3.8,
    fibre: 8.5,
    gluten: "Gluten-Free",
    pros: ["Beta-carotene rich", "Complex energy carbs", "Traditional winter taste"],
    useCases: "Seasonal cooking, energy replenishment",
    recipes: ["Makki Di Roti", "Corn Flatbreads"],
  },
];

export default function ComparisonMatrix() {
  const [prod1Index, setProd1Index] = useState(0); // Default MP Sharbati
  const [prod2Index, setProd2Index] = useState(1); // Default MH Khapli

  const p1 = comparisonProducts[prod1Index];
  const p2 = comparisonProducts[prod2Index];

  // Helper to draw comparative progress bars
  const renderBar = (label: string, val1: number, val2: number, max: number, unit: string = "g") => {
    const pct1 = Math.min((val1 / max) * 100, 100);
    const pct2 = Math.min((val2 / max) * 100, 100);

    return (
      <div className="flex flex-col gap-2 py-4 border-b border-stone/5">
        <div className="flex justify-between text-xs font-sans font-semibold text-stone uppercase tracking-wider">
          <span>{label}</span>
          <div className="flex gap-4">
            <span className="text-espresso">{val1}{unit}</span>
            <span className="text-gold">{val2}{unit}</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {/* Bar 1 */}
          <div className="h-2 bg-stone/10 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${pct1}%` }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="h-full bg-espresso rounded-full"
            />
          </div>
          {/* Bar 2 */}
          <div className="h-2 bg-stone/10 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${pct2}%` }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="h-full bg-gold rounded-full"
            />
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col gap-8 bg-cream/35 border border-stone/10 rounded-card p-6 md:p-8 shadow-warm-sm">
      <div className="flex flex-col gap-2">
        <h3 className="font-serif text-lg md:text-xl text-espresso font-semibold">Compare Flours</h3>
        <p className="font-sans text-xs text-stone leading-relaxed">
          Select any two stone-milled flours to inspect and compare their nutritional blueprints.
        </p>
      </div>

      {/* Selectors */}
      <div className="grid grid-cols-2 gap-4">
        {/* Selector 1 */}
        <div className="flex flex-col gap-1.5">
          <label className="font-sans text-[10px] font-bold text-stone uppercase tracking-widest">Compare Item A</label>
          <select
            value={prod1Index}
            onChange={(e) => setProd1Index(Number(e.target.value))}
            className="w-full px-3 py-2.5 bg-bone border border-stone/20 rounded-lg text-xs md:text-sm text-espresso font-sans focus:outline-none focus:border-espresso"
          >
            {comparisonProducts.map((p, idx) => (
              <option key={p.name} value={idx} disabled={idx === prod2Index}>
                {p.name} ({p.price})
              </option>
            ))}
          </select>
        </div>

        {/* Selector 2 */}
        <div className="flex flex-col gap-1.5">
          <label className="font-sans text-[10px] font-bold text-stone uppercase tracking-widest">Compare Item B</label>
          <select
            value={prod2Index}
            onChange={(e) => setProd2Index(Number(e.target.value))}
            className="w-full px-3 py-2.5 bg-bone border border-stone/20 rounded-lg text-xs md:text-sm text-espresso font-sans focus:outline-none focus:border-gold"
          >
            {comparisonProducts.map((p, idx) => (
              <option key={p.name} value={idx} disabled={idx === prod1Index}>
                {p.name} ({p.price})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Comparison Grid */}
      <div className="flex flex-col gap-4">
        {/* 1. Nutritional values progress bars */}
        <div className="flex flex-col">
          {renderBar("Protein Density", p1.protein, p2.protein, 18)}
          {renderBar("Dietary Fibre", p1.fibre, p2.fibre, 18)}
          {renderBar("Carbohydrates", p1.carbs, p2.carbs, 85)}
          {renderBar("Healthy Fat", p1.fat, p2.fat, 8)}
        </div>

        {/* 2. Metadata Comparison Table */}
        <div className="grid grid-cols-2 gap-6 mt-4 pt-4 border-t border-stone/10">
          {/* Col 1 */}
          <div className="flex flex-col gap-4">
            <h4 className="font-serif text-sm font-semibold text-espresso">{p1.name} Summary</h4>
            
            <div>
              <p className="font-sans text-[9px] font-bold text-stone uppercase tracking-wider mb-1">Gluten Level</p>
              <span className="text-xs bg-stone/5 px-2 py-0.5 rounded font-medium text-espresso">{p1.gluten}</span>
            </div>

            <div>
              <p className="font-sans text-[9px] font-bold text-stone uppercase tracking-wider mb-1">Best suited for</p>
              <p className="text-xs text-charcoal/80 leading-relaxed">{p1.useCases}</p>
            </div>

            <div>
              <p className="font-sans text-[9px] font-bold text-stone uppercase tracking-wider mb-1">Key Advantages</p>
              <ul className="list-disc pl-4 text-xs text-stone flex flex-col gap-1 mt-1">
                {p1.pros.map((pro, idx) => (
                  <li key={idx}>{pro}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Col 2 */}
          <div className="flex flex-col gap-4">
            <h4 className="font-serif text-sm font-semibold text-gold">{p2.name} Summary</h4>

            <div>
              <p className="font-sans text-[9px] font-bold text-stone uppercase tracking-wider mb-1">Gluten Level</p>
              <span className="text-xs bg-gold/10 px-2 py-0.5 rounded font-medium text-gold">{p2.gluten}</span>
            </div>

            <div>
              <p className="font-sans text-[9px] font-bold text-stone uppercase tracking-wider mb-1">Best suited for</p>
              <p className="text-xs text-charcoal/80 leading-relaxed">{p2.useCases}</p>
            </div>

            <div>
              <p className="font-sans text-[9px] font-bold text-stone uppercase tracking-wider mb-1">Key Advantages</p>
              <ul className="list-disc pl-4 text-xs text-stone flex flex-col gap-1 mt-1">
                {p2.pros.map((pro, idx) => (
                  <li key={idx}>{pro}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
