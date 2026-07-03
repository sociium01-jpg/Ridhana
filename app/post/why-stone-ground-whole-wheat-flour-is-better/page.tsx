import type { Metadata } from "next";
import BlogPostClient from "@/components/blog/BlogPostClient";

export const metadata: Metadata = {
  title: "Why Stone Ground Whole Wheat Flour Is Better",
  description:
    "Discover why stone-ground whole wheat flour is superior to commercial milled flour — from nutrients and fibre to taste and digestion.",
  alternates: {
    canonical:
      "https://www.ridhana.com/post/why-stone-ground-whole-wheat-flour-is-better",
  },
};

export default function BlogPostPage() {
  return <BlogPostClient />;
}
