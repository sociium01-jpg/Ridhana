import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bone:       "#F7F3EC",
        espresso:   "#2B2118",
        gold:       "#C9A24B",
        "gold-light": "#DDB96A",
        terracotta: "#C4714A",
        charcoal:   "#3D3530",
        wheat:      "#E8D5A3",
        stone:      "#8B7355",
        cream:      "#F0EAE0",
        "stone-dark": "#5C4D3C",
        "bone-dark": "#EDE5D8",
      },
      fontFamily: {
        serif:      ["var(--font-fraunces)", "Georgia", "serif"],
        sans:       ["var(--font-inter)", "system-ui", "sans-serif"],
        devanagari: ["var(--font-noto-devanagari)", "serif"],
      },
      fontSize: {
        "display-xl": ["clamp(3rem, 8vw, 7rem)",  { lineHeight: "0.95", letterSpacing: "-0.03em" }],
        "display-lg": ["clamp(2.5rem, 6vw, 5rem)", { lineHeight: "1.0",  letterSpacing: "-0.025em" }],
        "display-md": ["clamp(1.8rem, 4vw, 3.5rem)", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
        "heading":    ["clamp(1.4rem, 3vw, 2.25rem)", { lineHeight: "1.2", letterSpacing: "-0.015em" }],
        "subheading": ["clamp(1rem, 1.5vw, 1.25rem)", { lineHeight: "1.4", letterSpacing: "0.02em" }],
        "body-lg":    ["clamp(1rem, 1.2vw, 1.125rem)", { lineHeight: "1.75", letterSpacing: "0.005em" }],
        "body":       ["clamp(0.9rem, 1vw, 1rem)",  { lineHeight: "1.7",  letterSpacing: "0.005em" }],
        "label":      ["0.75rem",  { lineHeight: "1.5",  letterSpacing: "0.1em" }],
      },
      spacing: {
        "section":  "7rem",
        "section-sm": "4rem",
        "container-px": "clamp(1.5rem, 5vw, 6rem)",
      },
      borderRadius: {
        "card":  "1.25rem",
        "pill":  "9999px",
      },
      boxShadow: {
        "warm-sm": "0 2px 8px rgba(43,33,24,0.08)",
        "warm-md": "0 8px 32px rgba(43,33,24,0.12)",
        "warm-lg": "0 24px 64px rgba(43,33,24,0.15)",
        "gold":    "0 4px 24px rgba(201,162,75,0.3)",
      },
      transitionTimingFunction: {
        "expo-out":   "cubic-bezier(0.16, 1, 0.3, 1)",
        "expo-in":    "cubic-bezier(0.7, 0, 0.84, 0)",
        "spring":     "cubic-bezier(0.34, 1.56, 0.64, 1)",
      },
      transitionDuration: {
        "400": "400ms",
        "600": "600ms",
        "800": "800ms",
        "1200": "1200ms",
      },
      keyframes: {
        "grain": {
          "0%, 100%": { transform: "translate(0, 0)" },
          "10%":      { transform: "translate(-2%, -3%)" },
          "20%":      { transform: "translate(3%, 1%)" },
          "30%":      { transform: "translate(-1%, 4%)" },
          "40%":      { transform: "translate(4%, -2%)" },
          "50%":      { transform: "translate(-3%, 2%)" },
          "60%":      { transform: "translate(2%, -4%)" },
          "70%":      { transform: "translate(-4%, 1%)" },
          "80%":      { transform: "translate(1%, 3%)" },
          "90%":      { transform: "translate(-2%, -1%)" },
        },
        "float-up": {
          "0%":   { opacity: "0", transform: "translateY(1rem)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%":   { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "spin-slow": {
          "from": { transform: "rotate(0deg)" },
          "to":   { transform: "rotate(360deg)" },
        },
        "pulse-gold": {
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(201,162,75,0.4)" },
          "50%":      { boxShadow: "0 0 0 12px rgba(201,162,75,0)" },
        },
      },
      animation: {
        "grain":      "grain 8s steps(1) infinite",
        "float-up":   "float-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "fade-in":    "fade-in 0.4s ease forwards",
        "spin-slow":  "spin-slow 20s linear infinite",
        "pulse-gold": "pulse-gold 2s ease-in-out infinite",
      },
      backgroundImage: {
        "gradient-warm": "linear-gradient(135deg, #F7F3EC 0%, #EDE5D8 100%)",
        "gradient-espresso": "linear-gradient(135deg, #2B2118 0%, #3D3530 100%)",
        "gradient-gold": "linear-gradient(135deg, #C9A24B 0%, #DDB96A 100%)",
      },
    },
  },
  plugins: [],
};

export default config;
