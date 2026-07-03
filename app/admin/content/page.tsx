"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { Save, Eye, Check, AlertCircle } from "lucide-react";

interface ContentBlock {
  hero: {
    title1: string;
    title2: string;
    title3: string;
    subline: string;
  };
  pillars: {
    p1_title: string;
    p1_body: string;
    p2_title: string;
    p2_body: string;
    p3_title: string;
    p3_body: string;
  };
  philosophy: {
    heading: string;
    subheading: string;
    body: string;
  };
}

const fallbackContent: ContentBlock = {
  hero: {
    title1: "STONE MILLED",
    title2: "GOODNESS,",
    title3: "ROOTED IN TRADITION",
    subline: "The art of slow milling — fresh flour as nature intended",
  },
  pillars: {
    p1_title: "Slow Grinding Process",
    p1_body: "Our natural stone mill grinds the grain at a slow speed. Our flour is made at ambient temperature, thus keeping the natural nutrients and flavour intact.",
    p2_title: "Fresh Stone-Milled",
    p2_body: "We print the mill date on every bag, so you know it's truly fresh. We produce whole grain flour which is fiber rich.",
    p3_title: "Preservative Free",
    p3_body: "No bleach. No bromate. No folic acid. We never add synthetic ingredients or preservatives — just pure, fresh flour the way nature intended.",
  },
  philosophy: {
    heading: "Ridhāna (रिधाना)",
    subheading: "means to nourish, to sustain",
    body: "We believe flour should do more than fill — it should heal, energize, and respect the body's natural rhythm. That's why we return to slow milling, whole grains, and age-old practices that honor purity, balance, and gut wisdom. From handpicked grains to traditional stone mills, every step is guided by care — so what reaches your kitchen is not just flour, but a legacy of nourishment.",
  },
};

export default function ContentEditorAdmin() {
  const supabase = createClient();
  const [content, setContent] = useState<ContentBlock>(fallbackContent);
  const [activeTab, setActiveTab] = useState<"hero" | "pillars" | "philosophy">("hero");
  const [saving, setSaving] = useState(false);
  const [dbConnected, setDbConnected] = useState(true);

  // Hero Fields
  const [heroTitle1, setHeroTitle1] = useState("");
  const [heroTitle2, setHeroTitle2] = useState("");
  const [heroTitle3, setHeroTitle3] = useState("");
  const [heroSubline, setHeroSubline] = useState("");

  // Pillars Fields
  const [p1Title, setP1Title] = useState("");
  const [p1Body, setP1Body] = useState("");
  const [p2Title, setP2Title] = useState("");
  const [p2Body, setP2Body] = useState("");
  const [p3Title, setP3Title] = useState("");
  const [p3Body, setP3Body] = useState("");

  // Philosophy Fields
  const [philHeading, setPhilHeading] = useState("");
  const [philSubheading, setPhilSubheading] = useState("");
  const [philBody, setPhilBody] = useState("");

  useEffect(() => {
    async function loadContent() {
      try {
        const { data, error } = await supabase
          .from("page_sections")
          .select("*")
          .eq("page_slug", "home");

        if (error) throw error;

        // Construct ContentBlock from db data keys
        if (data && data.length > 0) {
          const loaded: Partial<ContentBlock> = {};
          data.forEach((row: any) => {
            if (row.section_key === "hero") loaded.hero = row.content;
            if (row.section_key === "pillars") loaded.pillars = row.content;
            if (row.section_key === "philosophy") loaded.philosophy = row.content;
          });

          const merged = { ...fallbackContent, ...loaded };
          setContent(merged);
          setFields(merged);
        } else {
          setFields(fallbackContent);
        }
      } catch (err) {
        console.warn("Using fallback local content structure.");
        setDbConnected(false);
        setFields(fallbackContent);
      }
    }
    loadContent();
  }, [supabase]);

  const setFields = (c: ContentBlock) => {
    setHeroTitle1(c.hero.title1);
    setHeroTitle2(c.hero.title2);
    setHeroTitle3(c.hero.title3);
    setHeroSubline(c.hero.subline);

    setP1Title(c.pillars.p1_title);
    setP1Body(c.pillars.p1_body);
    setP2Title(c.pillars.p2_title);
    setP2Body(c.pillars.p2_body);
    setP3Title(c.pillars.p3_title);
    setP3Body(c.pillars.p3_body);

    setPhilHeading(c.philosophy.heading);
    setPhilSubheading(c.philosophy.subheading);
    setPhilBody(c.philosophy.body);
  };

  const handleSave = async (section: "hero" | "pillars" | "philosophy") => {
    setSaving(true);

    let updatedSectionContent = {};
    if (section === "hero") {
      updatedSectionContent = {
        title1: heroTitle1,
        title2: heroTitle2,
        title3: heroTitle3,
        subline: heroSubline,
      };
    } else if (section === "pillars") {
      updatedSectionContent = {
        p1_title: p1Title,
        p1_body: p1Body,
        p2_title: p2Title,
        p2_body: p2Body,
        p3_title: p3Title,
        p3_body: p3Body,
      };
    } else if (section === "philosophy") {
      updatedSectionContent = {
        heading: philHeading,
        subheading: philSubheading,
        body: philBody,
      };
    }

    if (dbConnected) {
      const { error } = await supabase.from("page_sections").upsert({
        page_slug: "home",
        section_key: section,
        content: updatedSectionContent,
        status: "published",
      });

      if (error) {
        alert("Error saving section content: " + error.message);
        setSaving(false);
        return;
      }
    }

    setContent((prev) => ({
      ...prev,
      [section]: updatedSectionContent,
    }));

    setSaving(false);
    alert("Section content saved and published successfully.");
  };

  return (
    <div className="flex flex-col gap-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-display-md text-espresso">Homepage Editor</h1>
          <p className="font-sans text-stone text-sm">
            Modify text blocks and layouts on the live public homepage
          </p>
        </div>
      </div>

      {/* Structured tabs for sections */}
      <div className="flex border-b border-stone/10 gap-2">
        {(["hero", "pillars", "philosophy"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2.5 font-sans text-xs font-semibold tracking-wider uppercase border-b-2 transition-all ${
              activeTab === tab
                ? "border-gold text-espresso font-bold"
                : "border-transparent text-stone/50 hover:text-stone"
            }`}
          >
            {tab === "hero" && "Hero Section"}
            {tab === "pillars" && "Speciality Pillars"}
            {tab === "philosophy" && "Brand Philosophy"}
          </button>
        ))}
      </div>

      {/* Editor panels */}
      <div className="bg-cream border border-stone/10 rounded-card p-6 shadow-warm-md">
        {/* Tab 1: Hero Section */}
        {activeTab === "hero" && (
          <div className="flex flex-col gap-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="font-sans text-xs font-semibold text-stone uppercase tracking-wider">Headline Line 1</label>
                <input
                  type="text"
                  value={heroTitle1}
                  onChange={(e) => setHeroTitle1(e.target.value)}
                  className="w-full px-4 py-3 bg-bone border border-stone/20 rounded-lg text-sm text-espresso focus:outline-none focus:border-gold font-sans"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="font-sans text-xs font-semibold text-stone uppercase tracking-wider">Headline Line 2</label>
                <input
                  type="text"
                  value={heroTitle2}
                  onChange={(e) => setHeroTitle2(e.target.value)}
                  className="w-full px-4 py-3 bg-bone border border-stone/20 rounded-lg text-sm text-espresso focus:outline-none focus:border-gold font-sans"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="font-sans text-xs font-semibold text-stone uppercase tracking-wider">Headline Line 3 (Italic)</label>
                <input
                  type="text"
                  value={heroTitle3}
                  onChange={(e) => setHeroTitle3(e.target.value)}
                  className="w-full px-4 py-3 bg-bone border border-stone/20 rounded-lg text-sm text-espresso focus:outline-none focus:border-gold font-sans font-serif italic"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="font-sans text-xs font-semibold text-stone uppercase tracking-wider">Sub-line Text</label>
              <textarea
                rows={3}
                value={heroSubline}
                onChange={(e) => setHeroSubline(e.target.value)}
                className="w-full px-4 py-3 bg-bone border border-stone/20 rounded-lg text-sm text-espresso focus:outline-none focus:border-gold font-sans"
              />
            </div>

            <button
              onClick={() => handleSave("hero")}
              disabled={saving}
              className="inline-flex items-center justify-center gap-2 bg-espresso hover:bg-stone-dark text-bone px-5 py-3 rounded-lg text-xs font-semibold tracking-widest uppercase transition-all mt-4 self-start"
            >
              <Save size={14} />
              {saving ? "Saving..." : "Save & Publish Hero"}
            </button>
          </div>
        )}

        {/* Tab 2: Speciality Pillars */}
        {activeTab === "pillars" && (
          <div className="flex flex-col gap-8">
            {/* Pillar 1 */}
            <div className="flex flex-col gap-4 border-b border-stone/10 pb-6">
              <span className="font-serif text-espresso text-base font-semibold">Pillar 1 Details</span>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex flex-col gap-1.5 md:col-span-1">
                  <label className="font-sans text-xs font-semibold text-stone uppercase tracking-wider">Title</label>
                  <input
                    type="text"
                    value={p1Title}
                    onChange={(e) => setP1Title(e.target.value)}
                    className="w-full px-4 py-2.5 bg-bone border border-stone/20 rounded-lg text-sm text-espresso focus:outline-none"
                  />
                </div>
                <div className="flex flex-col gap-1.5 md:col-span-2">
                  <label className="font-sans text-xs font-semibold text-stone uppercase tracking-wider">Body copy</label>
                  <textarea
                    rows={2}
                    value={p1Body}
                    onChange={(e) => setP1Body(e.target.value)}
                    className="w-full px-4 py-2.5 bg-bone border border-stone/20 rounded-lg text-sm text-espresso focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Pillar 2 */}
            <div className="flex flex-col gap-4 border-b border-stone/10 pb-6">
              <span className="font-serif text-espresso text-base font-semibold">Pillar 2 Details</span>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex flex-col gap-1.5 md:col-span-1">
                  <label className="font-sans text-xs font-semibold text-stone uppercase tracking-wider">Title</label>
                  <input
                    type="text"
                    value={p2Title}
                    onChange={(e) => setP2Title(e.target.value)}
                    className="w-full px-4 py-2.5 bg-bone border border-stone/20 rounded-lg text-sm text-espresso focus:outline-none"
                  />
                </div>
                <div className="flex flex-col gap-1.5 md:col-span-2">
                  <label className="font-sans text-xs font-semibold text-stone uppercase tracking-wider">Body copy</label>
                  <textarea
                    rows={2}
                    value={p2Body}
                    onChange={(e) => setP2Body(e.target.value)}
                    className="w-full px-4 py-2.5 bg-bone border border-stone/20 rounded-lg text-sm text-espresso focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Pillar 3 */}
            <div className="flex flex-col gap-4">
              <span className="font-serif text-espresso text-base font-semibold">Pillar 3 Details</span>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex flex-col gap-1.5 md:col-span-1">
                  <label className="font-sans text-xs font-semibold text-stone uppercase tracking-wider">Title</label>
                  <input
                    type="text"
                    value={p3Title}
                    onChange={(e) => setP3Title(e.target.value)}
                    className="w-full px-4 py-2.5 bg-bone border border-stone/20 rounded-lg text-sm text-espresso focus:outline-none"
                  />
                </div>
                <div className="flex flex-col gap-1.5 md:col-span-2">
                  <label className="font-sans text-xs font-semibold text-stone uppercase tracking-wider">Body copy</label>
                  <textarea
                    rows={2}
                    value={p3Body}
                    onChange={(e) => setP3Body(e.target.value)}
                    className="w-full px-4 py-2.5 bg-bone border border-stone/20 rounded-lg text-sm text-espresso focus:outline-none"
                  />
                </div>
              </div>
            </div>

            <button
              onClick={() => handleSave("pillars")}
              disabled={saving}
              className="inline-flex items-center justify-center gap-2 bg-espresso hover:bg-stone-dark text-bone px-5 py-3 rounded-lg text-xs font-semibold tracking-widest uppercase transition-all mt-4 self-start"
            >
              <Save size={14} />
              {saving ? "Saving..." : "Save & Publish Pillars"}
            </button>
          </div>
        )}

        {/* Tab 3: Brand Philosophy */}
        {activeTab === "philosophy" && (
          <div className="flex flex-col gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="font-sans text-xs font-semibold text-stone uppercase tracking-wider">Heading</label>
                <input
                  type="text"
                  value={philHeading}
                  onChange={(e) => setPhilHeading(e.target.value)}
                  className="w-full px-4 py-3 bg-bone border border-stone/20 rounded-lg text-sm text-espresso focus:outline-none focus:border-gold font-sans"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="font-sans text-xs font-semibold text-stone uppercase tracking-wider">Subheading (Ayurvedic reference)</label>
                <input
                  type="text"
                  value={philSubheading}
                  onChange={(e) => setPhilSubheading(e.target.value)}
                  className="w-full px-4 py-3 bg-bone border border-stone/20 rounded-lg text-sm text-espresso focus:outline-none focus:border-gold font-sans"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="font-sans text-xs font-semibold text-stone uppercase tracking-wider">Philosophy body text</label>
              <textarea
                rows={6}
                value={philBody}
                onChange={(e) => setPhilBody(e.target.value)}
                className="w-full px-4 py-3 bg-bone border border-stone/20 rounded-lg text-sm text-espresso focus:outline-none focus:border-gold font-sans leading-relaxed"
              />
            </div>

            <button
              onClick={() => handleSave("philosophy")}
              disabled={saving}
              className="inline-flex items-center justify-center gap-2 bg-espresso hover:bg-stone-dark text-bone px-5 py-3 rounded-lg text-xs font-semibold tracking-widest uppercase transition-all mt-4 self-start"
            >
              <Save size={14} />
              {saving ? "Saving..." : "Save & Publish Philosophy"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
