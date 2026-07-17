"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";
import { Clock, BarChart, Users, ChevronDown, ChevronUp, ShoppingBag } from "lucide-react";

interface Meal {
  mealType: "Breakfast" | "Lunch" | "Snack" | "Dinner";
  recipeName: string;
  flourUsed: string;
  prepTime: string;
  difficulty: "Easy" | "Medium" | "Expert";
  servings: number;
  ingredients: string[];
  instructions: string[];
}

const weeklyPlan: Record<string, Meal[]> = {
  Monday: [
    {
      mealType: "Breakfast",
      recipeName: "Khapli Wheat Savoury Upma",
      flourUsed: "MH Khapli Wheat Atta",
      prepTime: "15 mins",
      difficulty: "Easy",
      servings: 2,
      ingredients: ["1 cup Khapli Wheat semolina/flour", "1 onion, chopped", "1 carrot, diced", "Mustard seeds", "Curry leaves"],
      instructions: ["Roast the Khapli flour gently in ghee until aromatic.", "Sauté mustard seeds, curry leaves, onions, and carrots in oil.", "Add 2 cups of boiling water, stir in roasted flour slowly, and cook covered for 5 minutes."],
    },
    {
      mealType: "Lunch",
      recipeName: "Sajje (Bajra) Rotla with Baingan Bharta",
      flourUsed: "Bajra (Pearl Millet) Atta",
      prepTime: "30 mins",
      difficulty: "Medium",
      servings: 3,
      ingredients: ["2 cups Bajra Atta", "Warm water", "Salt", "Roasted brinjal", "Onions, garlic & green chillies"],
      instructions: ["Knead Bajra flour with warm water into a soft dough.", "Pat the dough flat on a damp cloth or between palms to form a rotla.", "Cook on a hot iron tawa, applying water on the top surface, until brown spots appear."],
    },
    {
      mealType: "Dinner",
      recipeName: "Light Sharbati Wheat Chapatis",
      flourUsed: "MP Sharbati Wheat Atta",
      prepTime: "20 mins",
      difficulty: "Easy",
      servings: 4,
      ingredients: ["2 cups MP Sharbati Atta", "1/2 cup water", "1 tsp oil", "Pinch of salt"],
      instructions: ["Knead Sharbati wheat flour, salt, and water to form a soft, pliable dough. Rest for 15 minutes.", "Divide into small balls, roll thin, and puff on direct flame or hot tawa.", "Apply a brush of ghee and serve warm with seasonal cooked vegetables."],
    },
  ],
  Tuesday: [
    {
      mealType: "Breakfast",
      recipeName: "Gluten-Free Jowar Porridge",
      flourUsed: "Jowar (Sorghum) Atta",
      prepTime: "10 mins",
      difficulty: "Easy",
      servings: 1,
      ingredients: ["3 tbsp Jowar Atta", "1 cup milk (or water)", "Jaggery to taste", "Pinch of cardamom powder"],
      instructions: ["Whisk Jowar flour in cold water or milk to dissolve lumps.", "Boil the mixture on low heat while stirring continuously until it thickens.", "Sweeten with jaggery, sprinkle cardamom, and garnish with crushed almonds."],
    },
    {
      mealType: "Lunch",
      recipeName: "Makki Di Roti with Sarson Ka Saag",
      flourUsed: "Makki (Maize) Atta",
      prepTime: "35 mins",
      difficulty: "Medium",
      servings: 3,
      ingredients: ["2 cups Makki Atta", "Hot water", "Ghee", "Cooked mustard greens/saag"],
      instructions: ["Knead maize flour with very hot water using a spoon, then flatten by hand when warm.", "Roll out gently on a butter paper or silicone mat.", "Cook on a flat pan with generous ghee until crisp and golden brown."],
    },
    {
      mealType: "Dinner",
      recipeName: "Khapli Sourdough Flatbread",
      flourUsed: "MH Khapli Wheat Atta",
      prepTime: "40 mins",
      difficulty: "Expert",
      servings: 2,
      ingredients: ["1.5 cups Khapli Atta", "1/4 cup active sourdough starter", "Water", "Sea salt", "Rosemary & olive oil"],
      instructions: ["Mix Khapli flour, water, and starter. Autolyse for 30 minutes, then knead with salt.", "Proof for 4 hours, stretch and fold twice.", "Dimple the surface with olive oil, top with rosemary, and bake at 220°C for 20 minutes."],
    },
  ],
};

export default function MealPlanner() {
  const [selectedDay, setSelectedDay] = useState<"Monday" | "Tuesday">("Monday");
  const [expandedMeal, setExpandedMeal] = useState<number | null>(null);

  const meals = weeklyPlan[selectedDay] || [];

  // Toggle recipe steps expand/collapse
  const toggleMealExpand = (index: number) => {
    setExpandedMeal(expandedMeal === index ? null : index);
  };

  return (
    <div className="flex flex-col gap-8 bg-cream/35 border border-stone/10 rounded-card p-6 md:p-8 shadow-warm-sm">
      <div className="flex flex-col gap-2">
        <h3 className="font-serif text-lg md:text-xl text-espresso font-semibold">Weekly Meal Planner</h3>
        <p className="font-sans text-xs text-stone leading-relaxed">
          Unlock optimal health results with a curated 7-day culinary calendar utilizing Ridhāna flours.
        </p>
      </div>

      {/* Day Selector Tabs */}
      <div className="flex border-b border-stone/10 gap-1 overflow-x-auto">
        {(["Monday", "Tuesday"] as const).map((day) => (
          <button
            key={day}
            onClick={() => {
              setSelectedDay(day);
              setExpandedMeal(null);
            }}
            className={clsx(
              "px-4 py-2 font-sans text-xs font-semibold tracking-wider uppercase border-b-2 transition-all whitespace-nowrap",
              selectedDay === day
                ? "border-gold text-espresso font-bold"
                : "border-transparent text-stone/50 hover:text-stone"
            )}
          >
            {day}
          </button>
        ))}
        {["Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((day) => (
          <span
            key={day}
            className="px-4 py-2 font-sans text-xs text-stone/20 tracking-wider uppercase whitespace-nowrap cursor-not-allowed select-none"
            title="Premium Plan Feature"
          >
            {day}
          </span>
        ))}
      </div>

      {/* Meal Timeline */}
      <div className="flex flex-col gap-6 relative">
        {/* Timeline connector line */}
        <div className="absolute left-[18px] top-6 bottom-6 w-0.5 bg-stone/10 pointer-events-none" />

        {meals.map((meal, idx) => {
          const isExpanded = expandedMeal === idx;

          return (
            <div key={meal.recipeName} className="flex gap-4 relative">
              {/* Timeline dot */}
              <div className="relative z-10 w-9 h-9 rounded-full bg-espresso text-bone flex items-center justify-center text-xs font-semibold shrink-0 shadow-warm-md">
                {idx + 1}
              </div>

              {/* Meal card wrapper */}
              <div className="flex-1 bg-bone border border-stone/10 rounded-card p-5 shadow-warm-sm">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span className="font-sans text-[9px] font-bold text-gold uppercase tracking-widest block mb-1">
                      {meal.mealType}
                    </span>
                    <h4 className="font-serif text-base text-espresso font-semibold mb-1">
                      {meal.recipeName}
                    </h4>
                    <span className="inline-flex items-center gap-1 text-[10px] text-stone bg-stone/5 px-2 py-0.5 rounded border border-stone/10">
                      <ShoppingBag size={10} className="text-gold" />
                      {meal.flourUsed}
                    </span>
                  </div>

                  <button
                    onClick={() => toggleMealExpand(idx)}
                    className="p-1.5 hover:bg-stone/5 rounded-full text-stone transition-colors"
                  >
                    {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </button>
                </div>

                {/* Recipe specs */}
                <div className="flex items-center gap-4 mt-4 text-[10px] font-sans font-medium text-stone/75 border-t border-stone/5 pt-3">
                  <div className="flex items-center gap-1">
                    <Clock size={12} className="text-gold" />
                    <span>{meal.prepTime}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <BarChart size={12} className="text-gold" />
                    <span>{meal.difficulty}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users size={12} className="text-gold" />
                    <span>{meal.servings} Servings</span>
                  </div>
                </div>

                {/* Expandable Recipe Details */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden mt-4 pt-4 border-t border-stone/10 flex flex-col gap-4"
                    >
                      {/* Ingredients */}
                      <div>
                        <h5 className="font-sans text-[10px] font-bold text-espresso uppercase tracking-wider mb-2">Ingredients</h5>
                        <ul className="list-disc pl-4 text-xs text-stone flex flex-col gap-1">
                          {meal.ingredients.map((ing, i) => (
                            <li key={i}>{ing}</li>
                          ))}
                        </ul>
                      </div>

                      {/* Instructions */}
                      <div>
                        <h5 className="font-sans text-[10px] font-bold text-espresso uppercase tracking-wider mb-2">Preparation steps</h5>
                        <ol className="list-decimal pl-4 text-xs text-stone flex flex-col gap-2">
                          {meal.instructions.map((step, i) => (
                            <li key={i} className="leading-relaxed">{step}</li>
                          ))}
                        </ol>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
