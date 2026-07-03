"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { createClient } from "@/utils/supabase/client";
import {
  Plus,
  Edit2,
  Trash2,
  Check,
  X,
  Eye,
  AlertTriangle,
  MoveUp,
  MoveDown,
  Sparkles,
  Utensils,
  ChevronLeft,
} from "lucide-react";

interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  unit: string;
  category: "Wheat" | "Millet" | "Other";
  description: string;
  nutrition_highlights: string[];
  best_uses: string[];
  display_order: number;
  status: "draft" | "published" | "archived";
  image_url?: string; // resolved media URL
}

const fallbackProducts: Product[] = [
  {
    id: "1",
    name: "MP Sharbati Wheat Atta",
    slug: "mp-sharbati-wheat-atta",
    price: 120,
    unit: "Kg",
    category: "Wheat",
    description: "Premium Madhya Pradesh Sharbati wheat, stone-milled slowly to preserve its natural sweetness and nutrition.",
    nutrition_highlights: ["Rich in Fiber", "Iron & Magnesium", "100% Whole Wheat"],
    best_uses: ["Soft Rotis", "Phulkas", "Parathas"],
    display_order: 0,
    status: "published",
    image_url: "/images/product-mp-sharbati.jpg",
  },
  {
    id: "2",
    name: "MH Khapli Wheat Atta",
    slug: "mh-khapli-wheat-atta",
    price: 250,
    unit: "Kg",
    category: "Wheat",
    description: "Ancient Emmer wheat from Maharashtra — lower gluten, richer nutrition, perfect for sensitive digestion.",
    nutrition_highlights: ["Low Gluten Index", "Easy to Digest", "High Protein"],
    best_uses: ["Diabetic Rotis", "Ancient Wheat Breads"],
    display_order: 1,
    status: "published",
    image_url: "/images/product-mh-khapli.jpg",
  },
  {
    id: "3",
    name: "Bajra (Pearl Millet) Atta",
    slug: "bajra-pearl-millet-atta",
    price: 200,
    unit: "Kg",
    category: "Millet",
    description: "Iron-rich pearl millet, stone-ground fresh. Ideal for rotis with a distinctive earthy, nutty flavour.",
    nutrition_highlights: ["Gluten Free", "High Iron", "Winter Energy"],
    best_uses: ["Bajra Rotla", "Earthy Flatbreads"],
    display_order: 2,
    status: "published",
    image_url: "/images/product-bajra.jpg",
  },
];

export default function ProductsAdmin() {
  const supabase = createClient();
  const [products, setProducts] = useState<Product[]>([]);
  const [view, setView] = useState<"list" | "add" | "edit">("list");
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [dbConnected, setDbConnected] = useState(true);

  // Form State
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState<"Wheat" | "Millet" | "Other">("Wheat");
  const [description, setDescription] = useState("");
  const [nutrition, setNutrition] = useState<string[]>([]);
  const [bestUses, setBestUses] = useState<string[]>([]);
  const [status, setStatus] = useState<"draft" | "published">("draft");
  const [imageUrl, setImageUrl] = useState("/images/product-mp-sharbati.jpg"); // default mock placeholder

  // Repeatable field inputs
  const [nutriInput, setNutriInput] = useState("");
  const [useInput, setUseInput] = useState("");

  useEffect(() => {
    async function loadProducts() {
      try {
        const { data, error } = await supabase
          .from("products")
          .select("*")
          .neq("status", "archived")
          .order("display_order", { ascending: true });

        if (error) throw error;

        // Populate products with image placeholders if missing in db
        const resolved = (data || []).map((p: any) => ({
          ...p,
          image_url: p.image_url || getMockImageBySlug(p.slug),
        }));
        setProducts(resolved);
      } catch (err) {
        console.warn("Using fallback local products list.");
        setDbConnected(false);
        setProducts(fallbackProducts);
      } finally {
        setLoading(false);
      }
    }
    loadProducts();
  }, [supabase]);

  const getMockImageBySlug = (slug: string) => {
    if (slug.includes("sharbati")) return "/images/product-mp-sharbati.jpg";
    if (slug.includes("khapli")) return "/images/product-mh-khapli.jpg";
    if (slug.includes("bajra")) return "/images/product-bajra.jpg";
    if (slug.includes("jowar")) return "/images/product-jowar.jpg";
    return "/images/product-makki.jpg";
  };

  const handleOpenAddForm = () => {
    setName("");
    setPrice(100);
    setCategory("Wheat");
    setDescription("");
    setNutrition([]);
    setBestUses([]);
    setStatus("draft");
    setImageUrl("/images/product-mp-sharbati.jpg");
    setView("add");
  };

  const handleOpenEditForm = (product: Product) => {
    setEditingProduct(product);
    setName(product.name);
    setPrice(product.price);
    setCategory(product.category);
    setDescription(product.description);
    setNutrition(product.nutrition_highlights || []);
    setBestUses(product.best_uses || []);
    setStatus(product.status === "published" ? "published" : "draft");
    setImageUrl(product.image_url || "/images/product-mp-sharbati.jpg");
    setView("edit");
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || price <= 0 || !description) {
      alert("Please check all required fields.");
      return;
    }

    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

    const productPayload = {
      name,
      slug,
      price: Number(price),
      unit: "Kg",
      category,
      description,
      nutrition_highlights: nutrition,
      best_uses: bestUses,
      status,
      display_order: products.length,
    };

    if (view === "add") {
      if (dbConnected) {
        const { error } = await supabase.from("products").insert([productPayload]);
        if (error) {
          alert("Error adding product to database: " + error.message);
          return;
        }
      }
      const newProduct: Product = {
        id: Math.random().toString(),
        ...productPayload,
        image_url: getMockImageBySlug(slug),
      };
      setProducts([...products, newProduct]);
    } else if (view === "edit" && editingProduct) {
      if (dbConnected) {
        const { error } = await supabase
          .from("products")
          .update(productPayload)
          .eq("id", editingProduct.id);
        if (error) {
          alert("Error updating product: " + error.message);
          return;
        }
      }
      setProducts(
        products.map((p) =>
          p.id === editingProduct.id
            ? { ...p, ...productPayload, image_url: getMockImageBySlug(slug) }
            : p
        )
      );
    }

    setView("list");
  };

  const handleSoftDelete = async (id: string) => {
    const confirmation = confirm("This will remove this product from the live site. This cannot be undone.");
    if (!confirmation) return;

    if (dbConnected) {
      const { error } = await supabase
        .from("products")
        .update({ status: "archived" })
        .eq("id", id);
      if (error) {
        alert("Error archiving product: " + error.message);
        return;
      }
    }

    setProducts(products.filter((p) => p.id !== id));
  };

  // List additions
  const addNutritionHighlight = () => {
    if (nutriInput && !nutrition.includes(nutriInput)) {
      setNutrition([...nutrition, nutriInput]);
      setNutriInput("");
    }
  };

  const addBestUse = () => {
    if (useInput && !bestUses.includes(useInput)) {
      setBestUses([...bestUses, useInput]);
      setUseInput("");
    }
  };

  return (
    <div className="flex flex-col gap-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-display-md text-espresso">Product Management</h1>
          <p className="font-sans text-stone text-sm">
            Manage your stone-milled flour catalog listing
          </p>
        </div>

        {view === "list" && (
          <button
            onClick={handleOpenAddForm}
            className="flex items-center gap-2 bg-espresso text-bone hover:bg-stone-dark px-4 py-2.5 rounded-lg text-xs font-semibold tracking-widest uppercase transition-all"
          >
            <Plus size={14} />
            Add Product
          </button>
        )}
      </div>

      {/* Table Listing View */}
      {view === "list" && (
        <div className="bg-cream border border-stone/10 rounded-card overflow-hidden shadow-warm-md">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse font-sans text-sm">
              <thead>
                <tr className="bg-espresso/5 border-b border-stone/10">
                  <th className="p-4 font-semibold text-espresso text-xs tracking-wider uppercase">Product</th>
                  <th className="p-4 font-semibold text-espresso text-xs tracking-wider uppercase">Category</th>
                  <th className="p-4 font-semibold text-espresso text-xs tracking-wider uppercase">Price (₹/Kg)</th>
                  <th className="p-4 font-semibold text-espresso text-xs tracking-wider uppercase">Status</th>
                  <th className="p-4 text-right font-semibold text-espresso text-xs tracking-wider uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone/5">
                {products.map((product) => (
                  <tr key={product.id} className="hover:bg-espresso/[0.02] transition-colors">
                    <td className="p-4 flex items-center gap-3">
                      <div className="relative w-12 h-12 rounded-lg overflow-hidden border border-stone/10 bg-bone flex-shrink-0">
                        <Image
                          src={product.image_url || "/images/product-mp-sharbati.jpg"}
                          alt={product.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-semibold text-espresso">{product.name}</p>
                        <p className="text-[10px] text-stone/50 font-mono tracking-wider">{product.slug}</p>
                      </div>
                    </td>
                    <td className="p-4 text-stone font-medium">{product.category}</td>
                    <td className="p-4 text-espresso font-semibold">₹ {product.price}</td>
                    <td className="p-4">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-semibold tracking-wider uppercase ${
                          product.status === "published"
                            ? "bg-gold/15 text-gold border border-gold/30"
                            : "bg-stone/10 text-stone"
                        }`}
                      >
                        {product.status === "published" ? "Published" : "Draft"}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <div className="inline-flex gap-2">
                        <button
                          onClick={() => handleOpenEditForm(product)}
                          className="p-2 hover:bg-gold/10 hover:text-gold text-stone rounded-lg transition-colors"
                          title="Edit"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button
                          onClick={() => handleSoftDelete(product.id)}
                          className="p-2 hover:bg-terracotta/10 hover:text-terracotta text-stone rounded-lg transition-colors"
                          title="Delete"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Add / Edit Form View with Side-by-Side Preview */}
      {(view === "add" || view === "edit") && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Form */}
          <div className="bg-cream border border-stone/10 rounded-card p-6 shadow-warm-md flex flex-col gap-6">
            <button
              onClick={() => setView("list")}
              className="inline-flex items-center gap-2 text-stone hover:text-espresso text-xs font-semibold tracking-widest uppercase transition-colors mb-2"
            >
              <ChevronLeft size={16} />
              Back to Catalog
            </button>

            <h2 className="font-serif text-lg text-espresso font-semibold">
              {view === "add" ? "Add New Flour Product" : "Edit Product Details"}
            </h2>

            <form onSubmit={handleSave} className="flex flex-col gap-5">
              {/* Product Name */}
              <div className="flex flex-col gap-1.5">
                <label className="font-sans text-xs font-semibold text-stone uppercase tracking-wider">Product Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. MH Khapli Wheat Atta"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 bg-bone border border-stone/20 rounded-lg text-sm text-espresso focus:outline-none focus:border-gold transition-colors"
                />
              </div>

              {/* Price & Category */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="font-sans text-xs font-semibold text-stone uppercase tracking-wider">Price (₹/Kg)</label>
                  <input
                    type="number"
                    required
                    min="1"
                    placeholder="120"
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                    className="w-full px-4 py-3 bg-bone border border-stone/20 rounded-lg text-sm text-espresso focus:outline-none focus:border-gold transition-colors"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="font-sans text-xs font-semibold text-stone uppercase tracking-wider">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="w-full px-4 py-3 bg-bone border border-stone/20 rounded-lg text-sm text-espresso focus:outline-none focus:border-gold transition-colors"
                  >
                    <option value="Wheat">Wheat</option>
                    <option value="Millet">Millet</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              {/* Description */}
              <div className="flex flex-col gap-1.5">
                <label className="font-sans text-xs font-semibold text-stone uppercase tracking-wider">Description</label>
                <textarea
                  required
                  rows={4}
                  placeholder="Short, sensory description of the flour texture, origins, and baking outcomes..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-4 py-3 bg-bone border border-stone/20 rounded-lg text-sm text-espresso focus:outline-none focus:border-gold transition-colors font-sans"
                />
              </div>

              {/* Nutrition Highlights (Repeatable List) */}
              <div className="flex flex-col gap-1.5">
                <label className="font-sans text-xs font-semibold text-stone uppercase tracking-wider">Nutrition Highlights</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="e.g. Rich in Fiber"
                    value={nutriInput}
                    onChange={(e) => setNutriInput(e.target.value)}
                    className="flex-1 px-4 py-2 bg-bone border border-stone/20 rounded-lg text-sm text-espresso focus:outline-none focus:border-gold"
                  />
                  <button
                    type="button"
                    onClick={addNutritionHighlight}
                    className="bg-espresso text-bone hover:bg-stone-dark px-4 rounded-lg text-xs font-semibold tracking-widest uppercase transition-all"
                  >
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {nutrition.map((item, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1 bg-gold/10 text-gold border border-gold/20 px-2.5 py-1 rounded-full text-xs font-medium"
                    >
                      {item}
                      <button
                        type="button"
                        onClick={() => setNutrition(nutrition.filter((_, i) => i !== idx))}
                        className="hover:text-espresso text-gold/60"
                      >
                        <X size={12} />
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              {/* Best Uses (Repeatable List) */}
              <div className="flex flex-col gap-1.5">
                <label className="font-sans text-xs font-semibold text-stone uppercase tracking-wider">Best Uses</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="e.g. Soft Rotis"
                    value={useInput}
                    onChange={(e) => setUseInput(e.target.value)}
                    className="flex-1 px-4 py-2 bg-bone border border-stone/20 rounded-lg text-sm text-espresso focus:outline-none focus:border-gold"
                  />
                  <button
                    type="button"
                    onClick={addBestUse}
                    className="bg-espresso text-bone hover:bg-stone-dark px-4 rounded-lg text-xs font-semibold tracking-widest uppercase transition-all"
                  >
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {bestUses.map((item, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1 bg-stone/5 text-stone border border-stone/20 px-2.5 py-1 rounded-full text-xs font-medium"
                    >
                      {item}
                      <button
                        type="button"
                        onClick={() => setBestUses(bestUses.filter((_, i) => i !== idx))}
                        className="hover:text-espresso text-stone/50"
                      >
                        <X size={12} />
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              {/* Publish Toggle */}
              <div className="flex items-center justify-between border-t border-stone/10 pt-4 mt-2">
                <span className="font-sans text-xs font-semibold text-stone uppercase tracking-wider">Publish Immediately?</span>
                <button
                  type="button"
                  onClick={() => setStatus(status === "published" ? "draft" : "published")}
                  className={`w-12 h-6 rounded-full p-1 transition-all ${
                    status === "published" ? "bg-gold" : "bg-stone/20"
                  }`}
                >
                  <div
                    className={`w-4 h-4 rounded-full bg-bone transition-all ${
                      status === "published" ? "translate-x-6" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>

              {/* Save Button */}
              <button
                type="submit"
                className="w-full bg-espresso text-bone hover:bg-stone-dark py-3.5 rounded-lg text-xs font-semibold tracking-widest uppercase mt-4 transition-all"
              >
                {view === "add" ? "Publish Product" : "Save Changes"}
              </button>
            </form>
          </div>

          {/* Live Preview Panel */}
          <div className="sticky top-24 flex flex-col gap-4">
            <p className="font-sans text-xs font-semibold text-stone uppercase tracking-wider flex items-center gap-1.5">
              <Eye size={14} /> Live Public Card Preview
            </p>

            {/* Simulated Public Card rendering using the design tokens */}
            <div className="bg-cream border border-stone/10 rounded-card overflow-hidden shadow-warm-md">
              {/* Product Image preview */}
              <div className="relative h-56 bg-bone flex items-center justify-center">
                <Image
                  src={imageUrl}
                  alt={name || "Product Preview"}
                  fill
                  className="object-cover"
                />
                <div className="absolute bottom-3 left-3 freshness-badge z-20">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                  Freshly Milled
                </div>
              </div>

              <div className="p-6">
                <h3 className="font-serif text-heading text-espresso mb-1 leading-tight">
                  {name || "MP Sharbati Wheat Atta"}
                </h3>
                <p className="font-sans text-body text-stone mb-4 line-clamp-2">
                  {description || " Sensory description text goes here..."}
                </p>

                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="font-sans text-label text-stone/60 tracking-widest uppercase mb-0.5">Price</p>
                    <p className="font-serif text-2xl text-espresso font-semibold">
                      ₹ {price || 120} <span className="font-sans text-label text-stone ml-1">/ Kg</span>
                    </p>
                  </div>
                  <div className="bg-espresso text-bone font-sans text-label font-semibold tracking-widest uppercase px-5 py-3 rounded-pill">
                    Order
                  </div>
                </div>

                {/* Repeatable elements previews */}
                {nutrition.length > 0 && (
                  <div className="border-t border-stone/10 pt-4 flex flex-col gap-2">
                    <p className="font-sans text-[10px] font-semibold text-stone/60 uppercase tracking-widest flex items-center gap-1">
                      <Sparkles size={10} /> Nutrition Highlights
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {nutrition.map((item, idx) => (
                        <span key={idx} className="bg-gold/10 text-gold text-[10px] px-2 py-0.5 rounded">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {bestUses.length > 0 && (
                  <div className="border-t border-stone/10 pt-4 mt-2 flex flex-col gap-2">
                    <p className="font-sans text-[10px] font-semibold text-stone/60 uppercase tracking-widest flex items-center gap-1">
                      <Utensils size={10} /> Best suited for
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {bestUses.map((item, idx) => (
                        <span key={idx} className="bg-stone/5 text-stone text-[10px] px-2 py-0.5 rounded">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
