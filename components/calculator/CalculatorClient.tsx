"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";
import NutritionOrb from "@/components/ui/NutritionOrb";
import BodyVisualizer from "@/components/calculator/BodyVisualizer";
import ComparisonMatrix from "@/components/calculator/ComparisonMatrix";
import MealPlanner from "@/components/calculator/MealPlanner";
import AIAssistant from "@/components/calculator/AIAssistant";
import MagneticButton from "@/components/ui/MagneticButton";
import Image from "next/image";
import { Sparkles } from "lucide-react";

interface CalculatedResults {
  bmi: number;
  bmr: number;
  tdee: number;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fibre: number;
  water: number;
  healthScore: number;
}

export default function CalculatorClient() {
  const [step, setStep] = useState<"landing" | "form" | "reveal" | "dashboard">("landing");

  // Form Inputs
  const [gender, setGender] = useState<"male" | "female">("female");
  const [age, setAge] = useState<number>(30);
  const [height, setHeight] = useState<number>(165);
  const [weight, setWeight] = useState<number>(60);
  const [activity, setActivity] = useState<"sedentary" | "light" | "moderate" | "active">("moderate");
  const [goal, setGoal] = useState<"loss" | "maintain" | "gain" | "wellness">("wellness");

  // Output Calculations
  const [results, setResults] = useState<CalculatedResults | null>(null);
  const [activeNutrient, setActiveNutrient] = useState<"calories" | "protein" | "carbs" | "fat" | "fibre" | "water" | null>(null);

  const calculateBlueprint = () => {
    setStep("reveal");

    // 1. Basal Metabolic Rate (BMR) - Mifflin-St Jeor Equation
    let bmr = 10 * weight + 6.25 * height - 5 * age;
    if (gender === "male") {
      bmr += 5;
    } else {
      bmr -= 161;
    }

    // 2. Total Daily Energy Expenditure (TDEE)
    const activityMultipliers = {
      sedentary: 1.2,
      light: 1.375,
      moderate: 1.55,
      active: 1.725,
    };
    const tdee = bmr * activityMultipliers[activity];

    // 3. Target Calories based on health goal
    let targetCalories = tdee;
    if (goal === "loss") targetCalories -= 450;
    if (goal === "gain") targetCalories += 300;

    // 4. Macro targets
    // Protein: 1.8g per kg body weight (4 kcal/g)
    const proteinGrams = Math.round(weight * 1.8);
    // Fats: 25% of daily calories (9 kcal/g)
    const fatGrams = Math.round((targetCalories * 0.25) / 9);
    // Carbohydrates: remaining calories (4 kcal/g)
    const carbGrams = Math.round((targetCalories - (proteinGrams * 4 + fatGrams * 9)) / 4);

    // 5. Micros
    // Fibre: 14g per 1000 kcal
    const fibreGrams = Math.round((targetCalories / 1000) * 14);
    // Water: 35ml per kg body weight (litres)
    const waterLitres = Number(((weight * 35) / 1000).toFixed(1));

    // 6. Body Mass Index (BMI) & Health Score
    const heightM = height / 100;
    const bmi = Number((weight / (heightM * heightM)).toFixed(1));
    
    // Health score: 100 minus deviation from ideal BMI (21.7)
    const deviation = Math.abs(bmi - 21.7);
    const healthScore = Math.max(40, Math.min(100, Math.round(100 - deviation * 4)));

    setTimeout(() => {
      setResults({
        bmi,
        bmr: Math.round(bmr),
        tdee: Math.round(tdee),
        calories: Math.round(targetCalories),
        protein: proteinGrams,
        carbs: carbGrams,
        fat: fatGrams,
        fibre: fibreGrams,
        water: waterLitres,
        healthScore,
      });
      setStep("dashboard");
    }, 2800); // 2.8s cinematic orb expansion reveal delay
  };

  // Product Recommendation Engine
  const getRecommendation = () => {
    if (goal === "loss" || goal === "wellness") {
      return {
        name: "MH Khapli Wheat Atta",
        price: "₹ 250/Kg",
        image: "/images/product-mh-khapli.jpg",
        description: "An ancient grain offering slow-release carbohydrates, high fiber to sustain satiety, and weak gluten structure for effortless digestion.",
        benefit: "Supports sustained blood sugar levels, weight control, and optimal gut motility.",
        recipes: "Khapli phulkas, flatbreads, healthy crackers",
        confidence: 94,
      };
    }
    if (goal === "gain" || activity === "active") {
      return {
        name: "MP Sharbati Wheat Atta",
        price: "₹ 120/Kg",
        image: "/images/product-mp-sharbati.jpg",
        description: "Nutritious Madhya Pradesh wheat rich in high-quality complex carbs, perfect for active fuel replenishment and fluffy daily flatbreads.",
        benefit: "Rich energy levels, high water absorption, and muscle glycogen replenishment.",
        recipes: "Fluffy rotis, ghee-brushed parathas",
        confidence: 88,
      };
    }
    return {
      name: "Bajra (Pearl Millet) Atta",
      price: "₹ 200/Kg",
      image: "/images/product-bajra.jpg",
      description: "Gluten-free pearl millet packed with iron, potassium, and magnesium to replenish micro-nutrient stores and regulate internal heat.",
      benefit: "Iron boost, alkaline gut regulation, and gluten-free mineral support.",
      recipes: "Traditional Bajra Rotla, warm winter gruel",
      confidence: 90,
    };
  };

  const recommendedFlour = getRecommendation();

  return (
    <div className="min-h-screen bg-bone text-espresso relative py-20">
      {/* Background grain noise */}
      <div className="grain-overlay opacity-[0.035]" aria-hidden="true" />

      {/* Main Coordination Switch */}
      <div className="container-px max-w-[1440px] mx-auto z-10 relative">
        <AnimatePresence mode="wait">
          {/* Landing State */}
          {step === "landing" && (
            <motion.div
              key="landing"
              className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[70vh] pt-10"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Text side */}
              <div className="flex flex-col gap-6 max-w-xl">
                <span className="font-sans text-label tracking-widest uppercase text-gold">
                  Nutrition Blueprint
                </span>
                <h1 className="font-serif text-display-lg text-espresso leading-tight">
                  Know What Your Body Truly Needs
                </h1>
                <p className="font-sans text-body-lg text-stone leading-relaxed">
                  Discover your ideal daily nutrition requirements and find the perfect, freshly stone-milled Ridhāna flour tailored precisely to your metabolic rate and lifestyle.
                </p>
                <button
                  onClick={() => setStep("form")}
                  className="bg-espresso text-bone hover:bg-gold hover:text-espresso font-sans text-xs font-semibold tracking-widest uppercase px-8 py-4 rounded-full transition-all duration-300 w-fit shadow-md self-start"
                >
                  Start My Nutrition Journey
                </button>
              </div>

              {/* 3D Orb center side */}
              <div className="h-[350px] md:h-[450px]">
                <NutritionOrb />
              </div>
            </motion.div>
          )}

          {/* Form Entry State */}
          {step === "form" && (
            <motion.div
              key="form"
              className="max-w-2xl mx-auto bg-cream border border-stone/10 rounded-card p-6 md:p-10 shadow-warm-lg flex flex-col gap-8"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="text-center">
                <h2 className="font-serif text-display-md text-espresso mb-2">Configure Your Stats</h2>
                <p className="font-sans text-xs text-stone tracking-wider uppercase">Step 1 — Personal Information</p>
              </div>

              <div className="flex flex-col gap-6">
                {/* Gender */}
                <div className="flex flex-col gap-2">
                  <span className="font-sans text-xs font-bold text-stone uppercase tracking-wider">Gender</span>
                  <div className="grid grid-cols-2 gap-4">
                    {(["female", "male"] as const).map((g) => (
                      <button
                        key={g}
                        type="button"
                        onClick={() => setGender(g)}
                        className={clsx(
                          "py-3.5 rounded-lg border text-xs font-semibold tracking-widest uppercase transition-all font-sans",
                          gender === g
                            ? "bg-espresso text-bone border-espresso"
                            : "bg-bone text-stone border-stone/20 hover:border-stone/45"
                        )}
                      >
                        {g}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Age, Height, Weight */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  {/* Age */}
                  <div className="flex flex-col gap-2">
                    <span className="font-sans text-xs font-bold text-stone uppercase tracking-wider">Age (Years)</span>
                    <input
                      type="number"
                      min="1"
                      max="120"
                      value={age}
                      onChange={(e) => setAge(Number(e.target.value))}
                      className="w-full px-4 py-3 bg-bone border border-stone/20 rounded-lg text-sm text-espresso focus:outline-none focus:border-gold"
                    />
                  </div>

                  {/* Height */}
                  <div className="flex flex-col gap-2">
                    <span className="font-sans text-xs font-bold text-stone uppercase tracking-wider">Height (cm)</span>
                    <input
                      type="number"
                      min="50"
                      max="250"
                      value={height}
                      onChange={(e) => setHeight(Number(e.target.value))}
                      className="w-full px-4 py-3 bg-bone border border-stone/20 rounded-lg text-sm text-espresso focus:outline-none focus:border-gold"
                    />
                  </div>

                  {/* Weight */}
                  <div className="flex flex-col gap-2">
                    <span className="font-sans text-xs font-bold text-stone uppercase tracking-wider">Weight (Kg)</span>
                    <input
                      type="number"
                      min="10"
                      max="300"
                      value={weight}
                      onChange={(e) => setWeight(Number(e.target.value))}
                      className="w-full px-4 py-3 bg-bone border border-stone/20 rounded-lg text-sm text-espresso focus:outline-none focus:border-gold"
                    />
                  </div>
                </div>

                {/* Activity Level */}
                <div className="flex flex-col gap-2">
                  <span className="font-sans text-xs font-bold text-stone uppercase tracking-wider">Activity Level</span>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {(["sedentary", "light", "moderate", "active"] as const).map((act) => (
                      <button
                        key={act}
                        type="button"
                        onClick={() => setActivity(act)}
                        className={clsx(
                          "py-3 rounded-lg border text-[10px] font-semibold tracking-wider uppercase transition-all font-sans",
                          activity === act
                            ? "bg-espresso text-bone border-espresso"
                            : "bg-bone text-stone border-stone/20 hover:border-stone/40"
                        )}
                      >
                        {act}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Health Goal */}
                <div className="flex flex-col gap-2">
                  <span className="font-sans text-xs font-bold text-stone uppercase tracking-wider">Health Goal</span>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {(["loss", "maintain", "gain", "wellness"] as const).map((g) => (
                      <button
                        key={g}
                        type="button"
                        onClick={() => setGoal(g)}
                        className={clsx(
                          "py-3 rounded-lg border text-[10px] font-semibold tracking-wider uppercase transition-all font-sans",
                          goal === g
                            ? "bg-espresso text-bone border-espresso"
                            : "bg-bone text-stone border-stone/20 hover:border-stone/40"
                        )}
                      >
                        {g === "loss" ? "Weight Loss" : g === "gain" ? "Muscle Gain" : g === "maintain" ? "Maintain" : "Wellness"}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Calculate CTA */}
                <button
                  type="button"
                  onClick={calculateBlueprint}
                  className="w-full bg-espresso text-bone hover:bg-gold hover:text-espresso py-4 rounded-lg text-xs font-semibold tracking-widest uppercase transition-all mt-4 font-sans shadow-md"
                >
                  Reveal My Blueprint
                </button>
              </div>
            </motion.div>
          )}

          {/* Reveal Cinematic State */}
          {step === "reveal" && (
            <motion.div
              key="reveal"
              className="flex flex-col items-center justify-center min-h-[60vh] gap-6 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="w-[300px] h-[300px] relative animate-pulse">
                <NutritionOrb />
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="font-serif text-heading text-espresso">Calculating Metabolic DNA...</h3>
                <p className="font-sans text-xs text-stone tracking-widest uppercase">
                  Analyzing height, weight ratio and macro requirements
                </p>
              </div>
            </motion.div>
          )}

          {/* Dashboard Results State */}
          {step === "dashboard" && results && (
            <motion.div
              key="dashboard"
              className="flex flex-col gap-16"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              {/* Back to start button */}
              <button
                onClick={() => setStep("form")}
                className="inline-flex items-center gap-2 text-stone hover:text-espresso text-xs font-semibold tracking-widest uppercase transition-colors self-start border border-stone/20 px-4 py-2 rounded-full bg-cream/45"
              >
                ← Recalculate Stats
              </button>

              {/* Upper Section: Core KPI Dials & Human Body visualizer */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Left: KPIs list (Col-span 7) */}
                <div className="lg:col-span-7 flex flex-col gap-6">
                  <div>
                    <span className="font-sans text-label tracking-widest uppercase text-gold block mb-2">My Results</span>
                    <h2 className="font-serif text-display-md text-espresso leading-tight">Daily Nutritional Requirement</h2>
                  </div>

                  {/* Metabolic numbers Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {/* BMI */}
                    <div className="bg-cream border border-stone/10 rounded-card p-5 flex flex-col justify-between h-28">
                      <span className="font-sans text-[10px] text-stone tracking-wider uppercase">Body Mass Index</span>
                      <p className="font-serif text-3xl font-bold text-espresso">{results.bmi}</p>
                    </div>

                    {/* Calories */}
                    <div
                      onMouseEnter={() => setActiveNutrient("calories")}
                      onMouseLeave={() => setActiveNutrient(null)}
                      className="bg-cream border border-stone/10 rounded-card p-5 flex flex-col justify-between h-28 hover:border-gold transition-colors cursor-pointer"
                    >
                      <span className="font-sans text-[10px] text-stone tracking-wider uppercase">Target Calories</span>
                      <p className="font-serif text-3xl font-bold text-espresso">{results.calories} kcal</p>
                    </div>

                    {/* Water */}
                    <div
                      onMouseEnter={() => setActiveNutrient("water")}
                      onMouseLeave={() => setActiveNutrient(null)}
                      className="bg-cream border border-stone/10 rounded-card p-5 flex flex-col justify-between h-28 hover:border-gold transition-colors cursor-pointer"
                    >
                      <span className="font-sans text-[10px] text-stone tracking-wider uppercase">Daily Hydration</span>
                      <p className="font-serif text-3xl font-bold text-espresso">{results.water} L</p>
                    </div>

                    {/* Protein */}
                    <div
                      onMouseEnter={() => setActiveNutrient("protein")}
                      onMouseLeave={() => setActiveNutrient(null)}
                      className="bg-cream border border-stone/10 rounded-card p-5 flex flex-col justify-between h-28 hover:border-gold transition-colors cursor-pointer"
                    >
                      <span className="font-sans text-[10px] text-stone tracking-wider uppercase">Protein Requirement</span>
                      <p className="font-serif text-3xl font-bold text-espresso">{results.protein} g</p>
                    </div>

                    {/* Carbs */}
                    <div
                      onMouseEnter={() => setActiveNutrient("carbs")}
                      onMouseLeave={() => setActiveNutrient(null)}
                      className="bg-cream border border-stone/10 rounded-card p-5 flex flex-col justify-between h-28 hover:border-gold transition-colors cursor-pointer"
                    >
                      <span className="font-sans text-[10px] text-stone tracking-wider uppercase">Carbohydrates</span>
                      <p className="font-serif text-3xl font-bold text-espresso">{results.carbs} g</p>
                    </div>

                    {/* Fibre */}
                    <div
                      onMouseEnter={() => setActiveNutrient("fibre")}
                      onMouseLeave={() => setActiveNutrient(null)}
                      className="bg-cream border border-stone/10 rounded-card p-5 flex flex-col justify-between h-28 hover:border-gold transition-colors cursor-pointer"
                    >
                      <span className="font-sans text-[10px] text-stone tracking-wider uppercase">Dietary Fibre</span>
                      <p className="font-serif text-3xl font-bold text-espresso">{results.fibre} g</p>
                    </div>
                  </div>

                  {/* Health Score Circular Dial */}
                  <div className="bg-cream border border-stone/10 rounded-card p-6 flex items-center justify-between shadow-warm-sm">
                    <div className="flex flex-col gap-1.5 max-w-sm">
                      <span className="font-sans text-[10px] text-stone tracking-wider uppercase">Nutrition Health Score</span>
                      <h4 className="font-serif text-lg text-espresso font-semibold">
                        {results.healthScore >= 85 ? "Excellent Balance" : results.healthScore >= 70 ? "Good Balance" : "Needs Improvement"}
                      </h4>
                      <p className="font-sans text-xs text-stone/80 leading-relaxed">
                        Calculated from your age, current BMI variance, and activity level projections.
                      </p>
                    </div>

                    {/* Circular dial rendering */}
                    <div className="relative w-24 h-24 flex items-center justify-center shrink-0">
                      <svg width="100%" height="100%" viewBox="0 0 40 40" className="transform -rotate-90">
                        <circle cx="20" cy="20" r="16" fill="transparent" stroke="rgba(43,33,24,0.06)" strokeWidth="3" />
                        <motion.circle
                          cx="20"
                          cy="20"
                          r="16"
                          fill="transparent"
                          stroke="#C9A24B"
                          strokeWidth="3"
                          strokeDasharray={2 * Math.PI * 16}
                          initial={{ strokeDashoffset: 2 * Math.PI * 16 }}
                          animate={{ strokeDashoffset: 2 * Math.PI * 16 * (1 - results.healthScore / 100) }}
                          transition={{ duration: 1.2, ease: "easeOut" }}
                          strokeLinecap="round"
                        />
                      </svg>
                      <div className="absolute font-serif text-xl font-bold text-espresso">{results.healthScore}%</div>
                    </div>
                  </div>
                </div>

                {/* Right: Human Body Silhouette (Col-span 5) */}
                <div className="lg:col-span-5 flex flex-col gap-2 sticky top-24">
                  <p className="font-sans text-[10px] font-bold text-stone uppercase tracking-widest flex items-center gap-1.5">
                    <Sparkles size={12} className="text-gold" /> Hover parameters to illuminate pathways
                  </p>
                  <BodyVisualizer activeNutrient={activeNutrient} />
                </div>
              </div>

              {/* Middle Section: Smart Flour Recommendation */}
              <div className="border-t border-stone/10 pt-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                {/* Visual product card */}
                <motion.div
                  className="bg-cream border border-stone/10 rounded-card overflow-hidden shadow-warm-lg relative group"
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="relative h-64 md:h-80 bg-bone">
                    <Image
                      src={recommendedFlour.image}
                      alt={recommendedFlour.name}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-4 left-4 bg-espresso text-bone font-sans text-[10px] font-bold tracking-widest uppercase px-3.5 py-1.5 rounded-full">
                      Match Confidence: {recommendedFlour.confidence}%
                    </div>
                  </div>

                  <div className="p-6 md:p-8">
                    <h3 className="font-serif text-2xl text-espresso font-semibold mb-2">{recommendedFlour.name}</h3>
                    <p className="font-sans text-sm text-stone mb-6 leading-relaxed">{recommendedFlour.description}</p>
                    
                    <div className="flex items-center justify-between border-t border-stone/10 pt-5 mt-4">
                      <div>
                        <span className="font-sans text-[9px] text-stone/50 tracking-widest uppercase block mb-0.5">Price</span>
                        <p className="font-serif text-2xl text-espresso font-bold">{recommendedFlour.price}</p>
                      </div>
                      <MagneticButton
                        href="https://wa.me/919800199797"
                        variant="primary"
                        external
                        id="calculator-recommended-whatsapp"
                      >
                        Order Fresh Milled
                      </MagneticButton>
                    </div>
                  </div>
                </motion.div>

                {/* Reasons / Explanation */}
                <div className="flex flex-col gap-6">
                  <div>
                    <span className="font-sans text-label tracking-widest uppercase text-gold block mb-2">Tailored Matching</span>
                    <h2 className="font-serif text-display-md text-espresso leading-tight">Why We Recommend This Flour</h2>
                  </div>

                  <div className="flex flex-col gap-4">
                    {/* Benefit 1 */}
                    <div className="p-4 bg-bone border border-stone/10 rounded-card flex gap-3">
                      <div className="w-8 h-8 rounded-full bg-gold/15 flex items-center justify-center text-gold shrink-0">✓</div>
                      <div>
                        <h4 className="font-serif text-sm font-semibold text-espresso mb-1">Targeted Benefit</h4>
                        <p className="font-sans text-xs text-stone leading-relaxed">{recommendedFlour.benefit}</p>
                      </div>
                    </div>

                    {/* Benefit 2 */}
                    <div className="p-4 bg-bone border border-stone/10 rounded-card flex gap-3">
                      <div className="w-8 h-8 rounded-full bg-gold/15 flex items-center justify-center text-gold shrink-0">✓</div>
                      <div>
                        <h4 className="font-serif text-sm font-semibold text-espresso mb-1">Culinary Integration</h4>
                        <p className="font-sans text-xs text-stone leading-relaxed">Perfect for making: {recommendedFlour.recipes}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Lower Section: Comparative Matrix & Meal Timeline */}
              <div className="border-t border-stone/10 pt-16 grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                <ComparisonMatrix />
                <MealPlanner />
              </div>

              {/* AI Guide conversation Overlay */}
              <AIAssistant />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
