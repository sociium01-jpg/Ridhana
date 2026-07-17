"use client";

import { motion, AnimatePresence } from "framer-motion";

interface BodyVisualizerProps {
  activeNutrient: "calories" | "protein" | "carbs" | "fat" | "fibre" | "water" | null;
}

export default function BodyVisualizer({ activeNutrient }: BodyVisualizerProps) {
  return (
    <div className="relative w-full h-[400px] flex items-center justify-center bg-cream/35 border border-stone/10 rounded-card p-6 shadow-warm-sm overflow-hidden select-none">
      {/* Background radial glow */}
      <div className="absolute inset-0 bg-radial-glow opacity-30 pointer-events-none" />

      {/* SVG Container */}
      <svg
        viewBox="0 0 200 400"
        className="w-full h-full max-w-[180px] drop-shadow-warm-lg"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Base Body Silhouette path */}
        <path
          d="M100 40 C108 40 114 34 114 26 C114 18 108 12 100 12 C92 12 86 18 86 26 C86 34 92 40 100 40 Z
             M100 46 C80 46 72 56 70 70 C68 84 62 140 60 170 C58 200 64 210 70 210 C76 210 78 185 80 160 C81 145 82 110 82 105
             C82 120 80 180 80 230 C80 270 78 320 74 380 C72 385 78 388 84 388 C90 388 94 330 97 290
             C98 280 99 260 100 260 C101 260 102 280 103 290 C106 330 110 388 116 388 C122 388 128 385 126 380
             C122 320 120 270 120 230 C120 180 118 120 118 105 C118 110 119 145 120 160 C122 185 124 210 130 210
             C136 210 142 200 140 170 C138 140 132 84 130 70 C128 56 120 46 100 46 Z"
          fill="#FAF6F0"
          stroke="#E6DEC9"
          strokeWidth="1.5"
        />

        {/* 1. PROTEIN - Glowing Muscle Overlay */}
        <g style={{ opacity: activeNutrient === "protein" ? 1 : 0.08 }} className="transition-opacity duration-300">
          {/* Shoulders & Chest */}
          <path d="M86 52 Q100 60 114 52" stroke="#C9A24B" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          <path d="M90 64 H110" stroke="#C9A24B" strokeWidth="2" fill="none" strokeLinecap="round" />
          {/* Arms */}
          <path d="M72 74 Q68 110 65 145" stroke="#C9A24B" strokeWidth="2" fill="none" strokeLinecap="round" />
          <path d="M128 74 Q132 110 135 145" stroke="#C9A24B" strokeWidth="2" fill="none" strokeLinecap="round" />
          {/* Thighs */}
          <path d="M85 240 L88 320" stroke="#C9A24B" strokeWidth="3" fill="none" strokeLinecap="round" />
          <path d="M115 240 L112 320" stroke="#C9A24B" strokeWidth="3" fill="none" strokeLinecap="round" />
          {/* Core/Abs details */}
          <path d="M96 90 H104" stroke="#C9A24B" strokeWidth="1.5" />
          <path d="M95 100 H105" stroke="#C9A24B" strokeWidth="1.5" />
          <path d="M96 110 H104" stroke="#C9A24B" strokeWidth="1.5" />
        </g>

        {/* 2. CARBOHYDRATES - Energy Grid Flow */}
        <g style={{ opacity: activeNutrient === "carbs" ? 1 : 0.08 }} className="transition-opacity duration-300">
          {/* Spine Energy Line */}
          <line x1="100" y1="46" x2="100" y2="240" stroke="#C4714A" strokeWidth="2.5" strokeDasharray="3 3" />
          {/* Radial flow paths */}
          <path d="M100 80 C80 90 70 120 62 160" stroke="#C4714A" strokeWidth="1.5" fill="none" />
          <path d="M100 80 C120 90 130 120 138 160" stroke="#C4714A" strokeWidth="1.5" fill="none" />
          <path d="M100 180 C80 210 75 250 78 350" stroke="#C4714A" strokeWidth="1.5" fill="none" />
          <path d="M100 180 C120 210 125 250 122 350" stroke="#C4714A" strokeWidth="1.5" fill="none" />
          {/* Head energy node */}
          <circle cx="100" cy="26" r="4" fill="#C4714A" />
        </g>

        {/* 3. FIBRE - Digestive tract highlighting */}
        <g style={{ opacity: activeNutrient === "fibre" ? 1 : 0.08 }} className="transition-opacity duration-300">
          {/* Stomach & Intestine looping path */}
          <path
            d="M94 115 
               C94 135, 108 120, 106 130 
               C104 140, 92 135, 94 145 
               C96 155, 108 150, 104 162
               C100 170, 96 160, 96 170"
            stroke="#8B7355"
            strokeWidth="3.5"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Digestive Center Glow */}
          <circle cx="100" cy="140" r="16" fill="rgba(139,115,85,0.15)" stroke="#8B7355" strokeWidth="1" strokeDasharray="4 2" />
        </g>

        {/* 4. WATER - Hydration waves filling body */}
        <g style={{ opacity: activeNutrient === "water" ? 1 : 0.08 }} className="transition-opacity duration-300">
          {/* Hydration cellular wave dots */}
          <path d="M96 56 C90 100 80 180 82 250" stroke="#DDB96A" strokeWidth="1.5" strokeDasharray="5 5" fill="none" />
          <path d="M104 56 C110 100 120 180 118 250" stroke="#DDB96A" strokeWidth="1.5" strokeDasharray="5 5" fill="none" />
          {/* Fluid levels overlay */}
          <rect x="74" y="60" width="52" height="180" fill="rgba(201,162,75,0.06)" rx="10" />
          <path d="M78 120 C85 117 95 123 102 120 C109 117 115 123 122 120" stroke="#C9A24B" strokeWidth="2" fill="none" />
          <path d="M78 160 C85 157 95 163 102 160 C109 157 115 163 122 160" stroke="#C9A24B" strokeWidth="2" fill="none" />
        </g>
      </svg>

      {/* Floating Insight text on active state overlay */}
      <AnimatePresence mode="wait">
        {activeNutrient && (
          <motion.div
            key={activeNutrient}
            className="absolute bottom-4 left-4 right-4 bg-espresso/90 text-bone p-3.5 rounded-lg border border-gold/20"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 15 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="font-sans text-[10px] font-bold uppercase tracking-widest text-gold mb-1">
              {activeNutrient === "protein" && "Protein / Muscle Support"}
              {activeNutrient === "carbs" && "Carbohydrates / Sustained Energy"}
              {activeNutrient === "fibre" && "Dietary Fibre / Digestive Health"}
              {activeNutrient === "water" && "Water Intake / Cell Hydration"}
              {activeNutrient === "calories" && "Energy Balance"}
              {activeNutrient === "fat" && "Healthy Lipids & Absorption"}
            </p>
            <p className="font-sans text-[11px] text-bone/80 leading-normal">
              {activeNutrient === "protein" && "Essential for muscle synthesis and cell restoration. Slow-ground wheat contains natural wheat germ protein."}
              {activeNutrient === "carbs" && "Slow-release complex carbs provide glycogen storage, keeping you energized without blood sugar spikes."}
              {activeNutrient === "fibre" && "Supports prebiotic gut flora, eases transit, and regulates insulin sensitivity. Preserved by stone milling."}
              {activeNutrient === "water" && "Crucial for nutrient transport, temperature regulation, and joint lubrication."}
              {activeNutrient === "calories" && "Represents your daily calorie intake requirement based on activity levels."}
              {activeNutrient === "fat" && "Vital for brain health, cell membranes, and absorption of fat-soluble vitamins (A, D, E, K)."}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
