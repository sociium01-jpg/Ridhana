export interface Product {
  name: string;
  slug: string;
  price: string;
  pricePerKg: string;
  image: string;
  description: string;
  badge?: string;
  nutritionalFacts: {
    protein: number;
    carbs: number;
    fat: number;
    fibre: number;
    energy: number; // kcal per 100g
  };
  glutenLevel: "Medium" | "Low (Weak)" | "Gluten-Free";
  suitability: string;
  healthBenefits: string[];
  shelfLife: string;
  recipes: string[];
  offers: {
    price: string;
    priceCurrency: string;
  };
}

export const products: Product[] = [
  {
    name: "MP Sharbati Wheat Atta",
    slug: "mp-sharbati-wheat-atta",
    price: "₹ 120",
    pricePerKg: "Kg",
    image: "/images/product-mp-sharbati.jpg",
    description:
      "Premium Madhya Pradesh Sharbati wheat, stone-milled slowly at ambient temperature to preserve its natural sweetness, nutrients, and fibre. Hand-selected grains milled fresh to order.",
    badge: "Bestseller",
    nutritionalFacts: {
      protein: 12.1,
      carbs: 71.5,
      fat: 2.0,
      fibre: 11.2,
      energy: 352,
    },
    glutenLevel: "Medium",
    suitability: "Daily phulkas, chapattis, soft flatbreads, and parathas.",
    healthBenefits: [
      "Rich in complex carbohydrates for sustained energy release.",
      "High natural fibre content aids digestive health.",
      "Essential wheat germ oils preserved during slow milling.",
    ],
    shelfLife: "Consume within 30-45 days. Store in a cool, dry, airtight container.",
    recipes: ["Soft Phulka", "Tandoori Roti", "Savoury Paratha"],
    offers: { price: "120", priceCurrency: "INR" },
  },
  {
    name: "MH Khapli Wheat Atta",
    slug: "mh-khapli-wheat-atta",
    price: "₹ 250",
    pricePerKg: "Kg",
    image: "/images/product-mh-khapli.jpg",
    description:
      "Ancient Emmer wheat sourced from Maharashtra. Milled slowly on traditional stone grinders to keep the weak, ancient gluten structure and rich dietary fibre completely intact.",
    badge: "Heritage Grain",
    nutritionalFacts: {
      protein: 13.5,
      carbs: 68.2,
      fat: 1.8,
      fibre: 14.8,
      energy: 340,
    },
    glutenLevel: "Low (Weak)",
    suitability: "Highly suitable for diabetic diets, gut wellness, and sourdough baking.",
    healthBenefits: [
      "Weak gluten structure is extremely light and easy on the stomach.",
      "Low glycemic index prevents sudden insulin spikes.",
      "Ancient bran fiber provides high prebiotic properties for gut flora.",
    ],
    shelfLife: "Consume within 30-45 days. Store in a cool, dry, airtight container.",
    recipes: ["Khapli Whole Wheat Bread", "Ancient Grain Tortilla", "Khapli Paratha"],
    offers: { price: "250", priceCurrency: "INR" },
  },
  {
    name: "Bajra (Pearl Millet) Atta",
    slug: "bajra-pearl-millet-atta",
    price: "₹ 200",
    pricePerKg: "Kg",
    image: "/images/product-bajra.jpg",
    description:
      "Iron-rich pearl millet, stone-ground fresh to order. Highly nutritious and naturally gluten-free, providing an authentic earthy, nutty taste to traditional flatbreads.",
    badge: "Gluten-Free",
    nutritionalFacts: {
      protein: 11.6,
      carbs: 67.5,
      fat: 4.8,
      fibre: 12.4,
      energy: 361,
    },
    glutenLevel: "Gluten-Free",
    suitability: "Gluten-free flatbreads, porridge, and winter-seasonal diets.",
    healthBenefits: [
      "High iron content helps combat fatigue and support red blood cells.",
      "Rich in magnesium and potassium to regulate heart and blood pressure.",
      "Alkaline nature prevents acidity and supports gut wellness.",
    ],
    shelfLife: "Consume within 30 days. Mill fresh to order due to natural oils.",
    recipes: ["Bajra Rotla / Bhakri", "Bajra Khichu", "Millet Crackers"],
    offers: { price: "200", priceCurrency: "INR" },
  },
  {
    name: "Jowar (Sorghum) Atta",
    slug: "jowar-sorghum-atta",
    price: "₹ 160",
    pricePerKg: "Kg",
    image: "/images/product-jowar.jpg",
    description:
      "Naturally gluten-free Sorghum, stone-milled to retain its high protein, iron, and dietary fibre. Provides a soft, digestible texture that is gentle on the digestive tract.",
    badge: "Alkaline",
    nutritionalFacts: {
      protein: 10.4,
      carbs: 72.6,
      fat: 3.1,
      fibre: 10.2,
      energy: 349,
    },
    glutenLevel: "Gluten-Free",
    suitability: "Weight management, gluten intolerance, and light summer flatbreads.",
    healthBenefits: [
      "High dietary fibre supports optimal weight management.",
      "Highly alkaline grain prevents bloating and supports digestive comfort.",
      "Rich in antioxidants that protect cellular health.",
    ],
    shelfLife: "Consume within 30-45 days. Store in a dry airtight container.",
    recipes: ["Jowar Bhakri", "Sorghum Crepes / Dosa", "Jowar Porridge"],
    offers: { price: "160", priceCurrency: "INR" },
  },
  {
    name: "Makki (Maize) Atta",
    slug: "makki-maize-atta",
    price: "₹ 140",
    pricePerKg: "Kg",
    image: "/images/product-makki.jpg",
    description:
      "Traditional yellow maize flour stone-milled for the authentic taste of winter flatbreads. Rich in complex carbohydrates, beta-carotene, and natural fiber.",
    badge: "Traditional",
    nutritionalFacts: {
      protein: 9.2,
      carbs: 74.3,
      fat: 3.8,
      fibre: 8.5,
      energy: 365,
    },
    glutenLevel: "Gluten-Free",
    suitability: "Authentic Makki di Roti, maize flatbreads, and winter seasonal food.",
    healthBenefits: [
      "Rich in Vitamin A (beta-carotene) for eye health and immunity.",
      "Provides rapid complex energy release for active physical routines.",
      "Naturally gluten-free and highly digestible.",
    ],
    shelfLife: "Consume within 30-45 days. Keep in a dry airtight canister.",
    recipes: ["Makki Di Roti", "Cornmeal Muffins", "Maize Pancakes"],
    offers: { price: "140", priceCurrency: "INR" },
  },
];
