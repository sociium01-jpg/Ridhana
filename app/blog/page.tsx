import type { Metadata } from "next";
import BlogClient from "@/components/blog/BlogClient";

export const metadata: Metadata = {
  title: "Blog — From the Mill",
  description:
    "Thoughts, recipes, and grain wisdom from Ridhana — slow milling, whole grains, and the art of nourishing flour.",
  alternates: {
    canonical: "https://www.ridhana.com/blog",
  },
};

const posts = [
  {
    slug: "why-stone-ground-whole-wheat-flour-is-better",
    title: "Why Stone Ground Whole Wheat Flour Is Better",
    excerpt:
      "When I first started baking at home, I quickly realized not all flours are the same. The texture, the aroma, the way dough comes together — it all changes with what's in the bag.",
    category: "Craft & Knowledge",
    image: "/images/hero-bg.png",
    date: "2026",
  },
];

export default function BlogPage() {
  return <BlogClient posts={posts} />;
}
