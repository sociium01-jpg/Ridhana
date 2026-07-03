"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { createClient } from "@/utils/supabase/client";
import {
  Plus,
  Edit2,
  Trash2,
  Calendar,
  ChevronLeft,
  Save,
  Eye,
  Check,
  Globe,
  FileText,
} from "lucide-react";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  body: string;
  cover_media_id?: string;
  cover_image_url?: string;
  seo_title?: string;
  seo_description?: string;
  status: "draft" | "published";
  publish_at?: string; // Scheduled publish date
  created_at: string;
  updated_at: string;
}

const mockPosts: BlogPost[] = [
  {
    id: "1",
    title: "Why Stone Ground Whole Wheat Flour Is Better",
    slug: "why-stone-ground-whole-wheat-flour-is-better",
    excerpt: "When I first started baking at home, I quickly realized not all flours are the same. The texture, the aroma...",
    body: "Industrial roller milling separates the grain into its components — bran, germ, and endosperm — and then discards or sells the nutrient-dense portions separately. What you get in a typical supermarket atta is mostly starch, bleached and bromated to improve shelf life and appearance. Stone milling does none of this...",
    cover_image_url: "/images/hero-bg.png",
    seo_title: "Why Stone Ground Whole Wheat Flour Is Better | Ridhana",
    seo_description: "Discover why stone-ground whole wheat flour is superior to commercial milled flour — from nutrients and fibre to taste and digestion.",
    status: "published",
    created_at: "2026-07-02T12:00:00Z",
    updated_at: "2026-07-02T12:00:00Z",
  },
];

export default function BlogAdmin() {
  const supabase = createClient();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [view, setView] = useState<"list" | "add" | "edit">("list");
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [dbConnected, setDbConnected] = useState(true);

  // Form State
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [body, setBody] = useState("");
  const [coverUrl, setCoverUrl] = useState("/images/hero-bg.png");
  const [seoTitle, setSeoTitle] = useState("");
  const [seoDescription, setSeoDescription] = useState("");
  const [status, setStatus] = useState<"draft" | "published">("draft");
  const [publishAt, setPublishAt] = useState("");

  useEffect(() => {
    async function loadPosts() {
      try {
        const { data, error } = await supabase
          .from("blog_posts")
          .select("*")
          .order("created_at", { ascending: false });

        if (error) throw error;

        const resolved = (data || []).map((p: any) => ({
          ...p,
          cover_image_url: p.cover_image_url || "/images/hero-bg.png",
        }));
        setPosts(resolved);
      } catch (err) {
        console.warn("Using fallback local blog posts list.");
        setDbConnected(false);
        setPosts(mockPosts);
      } finally {
        setLoading(false);
      }
    }
    loadPosts();
  }, [supabase]);

  // Sync slug on title change
  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (view === "add") {
      setSlug(
        val
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, "")
      );
    }
  };

  const handleOpenAdd = () => {
    setTitle("");
    setSlug("");
    setExcerpt("");
    setBody("");
    setCoverUrl("/images/hero-bg.png");
    setSeoTitle("");
    setSeoDescription("");
    setStatus("draft");
    setPublishAt("");
    setView("add");
  };

  const handleOpenEdit = (post: BlogPost) => {
    setEditingPost(post);
    setTitle(post.title);
    setSlug(post.slug);
    setExcerpt(post.excerpt);
    setBody(post.body);
    setCoverUrl(post.cover_image_url || "/images/hero-bg.png");
    setSeoTitle(post.seo_title || "");
    setSeoDescription(post.seo_description || "");
    setStatus(post.status);
    setPublishAt(post.publish_at || "");
    setView("edit");
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !slug || !excerpt || !body) {
      alert("Please check all required fields.");
      return;
    }

    const payload = {
      title,
      slug,
      excerpt,
      body,
      seo_title: seoTitle || title,
      seo_description: seoDescription || excerpt,
      status,
      publish_at: publishAt || null,
    };

    if (view === "add") {
      if (dbConnected) {
        const { error } = await supabase.from("blog_posts").insert([payload]);
        if (error) {
          alert("Error adding blog post: " + error.message);
          return;
        }
      }
      const newPost: BlogPost = {
        id: Math.random().toString(),
        ...payload,
        publish_at: publishAt || undefined,
        cover_image_url: coverUrl,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      setPosts([newPost, ...posts]);
    } else if (view === "edit" && editingPost) {
      if (dbConnected) {
        const { error } = await supabase
          .from("blog_posts")
          .update(payload)
          .eq("id", editingPost.id);
        if (error) {
          alert("Error updating blog post: " + error.message);
          return;
        }
      }
      setPosts(
        posts.map((p) =>
          p.id === editingPost.id
            ? {
                ...p,
                ...payload,
                publish_at: publishAt || undefined,
                updated_at: new Date().toISOString(),
              }
            : p
        )
      );
    }

    setView("list");
  };

  const handleDelete = async (id: string) => {
    const confirmation = confirm("Are you sure you want to permanently delete this blog post?");
    if (!confirmation) return;

    if (dbConnected) {
      const { error } = await supabase.from("blog_posts").delete().eq("id", id);
      if (error) {
        alert("Error deleting blog post: " + error.message);
        return;
      }
    }

    setPosts(posts.filter((p) => p.id !== id));
  };

  return (
    <div className="flex flex-col gap-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-display-md text-espresso">Blog Management</h1>
          <p className="font-sans text-stone text-sm">
            Write, edit, and schedule editorial posts for the Journal section
          </p>
        </div>

        {view === "list" && (
          <button
            onClick={handleOpenAdd}
            className="flex items-center gap-2 bg-espresso text-bone hover:bg-stone-dark px-4 py-2.5 rounded-lg text-xs font-semibold tracking-widest uppercase transition-all"
          >
            <Plus size={14} />
            New Post
          </button>
        )}
      </div>

      {/* Listing View */}
      {view === "list" && (
        <div className="bg-cream border border-stone/10 rounded-card overflow-hidden shadow-warm-md">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse font-sans text-sm">
              <thead>
                <tr className="bg-espresso/5 border-b border-stone/10">
                  <th className="p-4 font-semibold text-espresso text-xs tracking-wider uppercase">Title</th>
                  <th className="p-4 font-semibold text-espresso text-xs tracking-wider uppercase">Publish Schedule</th>
                  <th className="p-4 font-semibold text-espresso text-xs tracking-wider uppercase">Status</th>
                  <th className="p-4 text-right font-semibold text-espresso text-xs tracking-wider uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone/5">
                {posts.map((post) => (
                  <tr key={post.id} className="hover:bg-espresso/[0.02] transition-colors">
                    <td className="p-4">
                      <div>
                        <p className="font-semibold text-espresso">{post.title}</p>
                        <p className="text-[10px] text-stone/50 font-mono tracking-wider">/post/{post.slug}</p>
                      </div>
                    </td>
                    <td className="p-4 text-stone flex items-center gap-1.5 mt-2">
                      <Calendar size={14} />
                      <span className="text-xs">
                        {post.publish_at
                          ? new Date(post.publish_at).toLocaleDateString("en-IN")
                          : "Immediate"}
                      </span>
                    </td>
                    <td className="p-4">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-semibold tracking-wider uppercase ${
                          post.status === "published"
                            ? "bg-gold/15 text-gold border border-gold/30"
                            : "bg-stone/10 text-stone"
                        }`}
                      >
                        {post.status === "published" ? "Published" : "Draft"}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <div className="inline-flex gap-2">
                        <button
                          onClick={() => handleOpenEdit(post)}
                          className="p-2 hover:bg-gold/10 hover:text-gold text-stone rounded-lg transition-colors"
                          title="Edit"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(post.id)}
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

      {/* Editor Panel View */}
      {(view === "add" || view === "edit") && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Main Form Fields */}
          <div className="lg:col-span-2 bg-cream border border-stone/10 rounded-card p-6 shadow-warm-md flex flex-col gap-6">
            <button
              onClick={() => setView("list")}
              className="inline-flex items-center gap-2 text-stone hover:text-espresso text-xs font-semibold tracking-widest uppercase transition-colors mb-2"
            >
              <ChevronLeft size={16} />
              Back to Articles
            </button>

            <h2 className="font-serif text-lg text-espresso font-semibold">
              {view === "add" ? "Write New Article" : "Edit Journal Post"}
            </h2>

            <form onSubmit={handleSave} className="flex flex-col gap-5">
              {/* Title */}
              <div className="flex flex-col gap-1.5">
                <label className="font-sans text-xs font-semibold text-stone uppercase tracking-wider">Post Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Why Stone Ground Whole Wheat Flour Is Better"
                  value={title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  className="w-full px-4 py-3 bg-bone border border-stone/20 rounded-lg text-sm text-espresso focus:outline-none focus:border-gold"
                />
              </div>

              {/* Slug (Editable) */}
              <div className="flex flex-col gap-1.5">
                <label className="font-sans text-xs font-semibold text-stone uppercase tracking-wider">URL Slug</label>
                <input
                  type="text"
                  required
                  placeholder="why-stone-ground-whole-wheat-flour-is-better"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  className="w-full px-4 py-2.5 bg-bone border border-stone/20 rounded-lg text-xs text-stone font-mono focus:outline-none focus:border-gold"
                />
              </div>

              {/* Excerpt */}
              <div className="flex flex-col gap-1.5">
                <label className="font-sans text-xs font-semibold text-stone uppercase tracking-wider">Short Excerpt (Teaser text)</label>
                <textarea
                  required
                  rows={2}
                  placeholder="1-2 sentences teasing the article in the blog grid..."
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  className="w-full px-4 py-3 bg-bone border border-stone/20 rounded-lg text-sm text-espresso focus:outline-none focus:border-gold font-sans"
                />
              </div>

              {/* Body Content */}
              <div className="flex flex-col gap-1.5">
                <label className="font-sans text-xs font-semibold text-stone uppercase tracking-wider">Body Content (Markdown/HTML supported)</label>
                <textarea
                  required
                  rows={12}
                  placeholder="Write the full post content here..."
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  className="w-full px-4 py-3 bg-bone border border-stone/20 rounded-lg text-sm text-espresso focus:outline-none focus:border-gold font-mono leading-relaxed"
                />
              </div>
            </form>
          </div>

          {/* Right Sidebar Details & SEO */}
          <div className="flex flex-col gap-6 sticky top-24">
            {/* Options Card */}
            <div className="bg-cream border border-stone/10 rounded-card p-6 shadow-warm-md flex flex-col gap-5">
              <h3 className="font-serif text-espresso text-base font-semibold">Post Configurations</h3>

              {/* Publish toggle */}
              <div className="flex items-center justify-between border-b border-stone/5 pb-4">
                <span className="font-sans text-xs font-semibold text-stone uppercase tracking-wider">Publish immediately?</span>
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

              {/* Scheduled date */}
              <div className="flex flex-col gap-1.5">
                <label className="font-sans text-xs font-semibold text-stone uppercase tracking-wider flex items-center gap-1">
                  <Calendar size={12} /> Schedule Publish Date
                </label>
                <input
                  type="datetime-local"
                  value={publishAt}
                  onChange={(e) => setPublishAt(e.target.value)}
                  className="w-full px-3 py-2 bg-bone border border-stone/20 rounded-lg text-xs text-espresso focus:outline-none focus:border-gold"
                />
                <p className="font-sans text-[10px] text-stone/50">
                  Leave blank to publish immediately upon checking the status toggle.
                </p>
              </div>
            </div>

            {/* SEO Settings Card */}
            <div className="bg-cream border border-stone/10 rounded-card p-6 shadow-warm-md flex flex-col gap-4">
              <h3 className="font-serif text-espresso text-base font-semibold flex items-center gap-1.5">
                <Globe size={16} /> SEO & Indexing
              </h3>

              {/* SEO Title */}
              <div className="flex flex-col gap-1.5">
                <label className="font-sans text-xs font-semibold text-stone uppercase tracking-wider">SEO Title</label>
                <input
                  type="text"
                  placeholder={title || "Article Title template..."}
                  value={seoTitle}
                  onChange={(e) => setSeoTitle(e.target.value)}
                  className="w-full px-3 py-2 bg-bone border border-stone/20 rounded-lg text-xs text-espresso focus:outline-none"
                />
              </div>

              {/* SEO Description */}
              <div className="flex flex-col gap-1.5">
                <label className="font-sans text-xs font-semibold text-stone uppercase tracking-wider">SEO Meta Description</label>
                <textarea
                  rows={3}
                  placeholder={excerpt || "Excerpt summary meta details..."}
                  value={seoDescription}
                  onChange={(e) => setSeoDescription(e.target.value)}
                  className="w-full px-3 py-2 bg-bone border border-stone/20 rounded-lg text-xs text-espresso focus:outline-none font-sans"
                />
              </div>

              <button
                type="button"
                onClick={handleSave}
                className="w-full bg-espresso text-bone hover:bg-stone-dark py-3 rounded-lg text-xs font-semibold tracking-widest uppercase transition-all flex items-center justify-center gap-2"
              >
                <Save size={14} />
                Save Article
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
