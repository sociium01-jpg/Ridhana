"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";
import {
  ShoppingBag,
  Image as ImageIcon,
  BookOpen,
  History,
  ArrowRight,
  TrendingUp,
  Plus,
  Upload,
  PenSquare,
  AlertTriangle,
} from "lucide-react";

export default function AdminDashboard() {
  const supabase = createClient();
  const [stats, setStats] = useState({
    products: 0,
    media: 0,
    posts: 0,
    storageMB: 12.4, // placeholder storage count
  });
  const [activities, setActivities] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [hasConnection, setHasConnection] = useState(true);

  useEffect(() => {
    async function fetchDashboardData() {
      try {
        const { count: productsCount, error: pErr } = await supabase
          .from("products")
          .select("*", { count: "exact", head: true });

        const { count: mediaCount, error: mErr } = await supabase
          .from("media")
          .select("*", { count: "exact", head: true });

        const { count: postsCount, error: bErr } = await supabase
          .from("blog_posts")
          .select("*", { count: "exact", head: true });

        const { data: logs, error: lErr } = await supabase
          .from("audit_log")
          .select("*")
          .order("created_at", { ascending: false })
          .limit(5);

        if (pErr || mErr || bErr || lErr) {
          throw new Error("Supabase connection issue");
        }

        setStats({
          products: productsCount || 0,
          media: mediaCount || 0,
          posts: postsCount || 0,
          storageMB: (mediaCount || 0) * 1.8 + 8.2, // Estimate storage size: 1.8MB per item + base
        });

        if (logs) {
          setActivities(logs);
        }
      } catch (err) {
        console.warn("Using mock dashboard stats. Supabase might not be fully configured yet.");
        setHasConnection(false);
        // Load mock/stub stats for development preview
        setStats({
          products: 5,
          media: 12,
          posts: 1,
          storageMB: 28.5,
        });
        setActivities([
          {
            id: "1",
            action: "update",
            entity_type: "product",
            metadata: { name: "MH Khapli Wheat Atta" },
            created_at: new Date(Date.now() - 1000 * 60 * 120).toISOString(), // 2 hours ago
          },
          {
            id: "2",
            action: "create",
            entity_type: "media",
            metadata: { filename: "product-mp-sharbati.jpg" },
            created_at: new Date(Date.now() - 1000 * 60 * 600).toISOString(), // 10 hours ago
          },
          {
            id: "3",
            action: "publish",
            entity_type: "blog_post",
            metadata: { title: "Why Stone Ground Whole Wheat Flour Is Better" },
            created_at: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
          },
        ]);
      } finally {
        setLoading(false);
      }
    }

    fetchDashboardData();
  }, [supabase]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="w-8 h-8 rounded-full border-2 border-gold border-t-transparent animate-spin" />
      </div>
    );
  }

  const storagePercentage = Math.min((stats.storageMB / 1024) * 100, 100);

  return (
    <div className="flex flex-col gap-8">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-display-md text-espresso">Dashboard</h1>
          <p className="font-sans text-stone text-sm">
            Overview of Ridhana public site content and activity
          </p>
        </div>

        {/* Quick action buttons */}
        <div className="flex gap-3">
          <Link
            href="/admin/products?action=add"
            className="flex items-center gap-2 bg-espresso text-bone hover:bg-stone-dark px-4 py-2.5 rounded-lg text-xs font-semibold tracking-widest uppercase transition-all"
          >
            <Plus size={14} />
            Add Product
          </Link>
          <Link
            href="/admin/media?action=upload"
            className="flex items-center gap-2 bg-bone border border-stone/20 hover:bg-cream px-4 py-2.5 rounded-lg text-xs font-semibold tracking-widest uppercase transition-all"
          >
            <Upload size={14} />
            Upload Media
          </Link>
        </div>
      </div>

      {!hasConnection && (
        <div className="p-4 bg-gold/10 border border-gold/20 rounded-lg flex items-start gap-3 text-espresso text-sm">
          <AlertTriangle size={18} className="flex-shrink-0 mt-0.5 text-gold" />
          <div>
            <p className="font-sans font-semibold">Local Preview Mode</p>
            <p className="font-sans text-stone text-xs mt-1">
              Supabase credentials are not connected or database is not reachable. Showing stub data for console layout demonstration.
            </p>
          </div>
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Products */}
        <div className="bg-cream border border-stone/10 rounded-card p-6 flex items-start justify-between">
          <div className="flex flex-col gap-1">
            <span className="font-sans text-xs text-stone tracking-widest uppercase">
              Products
            </span>
            <span className="font-serif text-3xl font-bold text-espresso">
              {stats.products}
            </span>
          </div>
          <div className="p-3 bg-gold/10 rounded-lg text-gold">
            <ShoppingBag size={20} />
          </div>
        </div>

        {/* Total Media */}
        <div className="bg-cream border border-stone/10 rounded-card p-6 flex items-start justify-between">
          <div className="flex flex-col gap-1">
            <span className="font-sans text-xs text-stone tracking-widest uppercase">
              Media Items
            </span>
            <span className="font-serif text-3xl font-bold text-espresso">
              {stats.media}
            </span>
          </div>
          <div className="p-3 bg-gold/10 rounded-lg text-gold">
            <ImageIcon size={20} />
          </div>
        </div>

        {/* Total Blog Posts */}
        <div className="bg-cream border border-stone/10 rounded-card p-6 flex items-start justify-between">
          <div className="flex flex-col gap-1">
            <span className="font-sans text-xs text-stone tracking-widest uppercase">
              Blog Posts
            </span>
            <span className="font-serif text-3xl font-bold text-espresso">
              {stats.posts}
            </span>
          </div>
          <div className="p-3 bg-gold/10 rounded-lg text-gold">
            <BookOpen size={20} />
          </div>
        </div>

        {/* Storage Bar */}
        <div className="bg-cream border border-stone/10 rounded-card p-6 flex flex-col gap-3">
          <div className="flex items-start justify-between">
            <div className="flex flex-col gap-1">
              <span className="font-sans text-xs text-stone tracking-widest uppercase">
                Storage Used
              </span>
              <span className="font-serif text-2xl font-bold text-espresso">
                {stats.storageMB.toFixed(1)} MB
              </span>
            </div>
            <span className="text-[10px] bg-stone/10 text-stone px-2 py-0.5 rounded font-mono">
              / 1 GB
            </span>
          </div>
          <div className="w-full bg-stone/10 h-2 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all ${
                storagePercentage > 85 ? "bg-terracotta" : "bg-gold"
              }`}
              style={{ width: `${storagePercentage}%` }}
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <div className="bg-cream border border-stone/10 rounded-card p-6 lg:col-span-2">
          <div className="flex items-center gap-2 mb-6">
            <History size={18} className="text-stone" />
            <h2 className="font-serif text-lg text-espresso font-semibold">
              Recent Activity
            </h2>
          </div>

          <div className="flex flex-col gap-4">
            {activities.map((activity, idx) => (
              <div
                key={activity.id || idx}
                className="flex items-start gap-4 pb-4 border-b border-stone/5 last:border-b-0 last:pb-0"
              >
                <div className="w-8 h-8 rounded-full bg-stone/5 flex items-center justify-center text-stone mt-0.5 text-xs font-mono">
                  {idx + 1}
                </div>
                <div className="flex-1">
                  <p className="font-sans text-sm text-espresso leading-relaxed">
                    <span className="font-semibold text-gold tracking-widest uppercase text-[10px] mr-2">
                      {activity.action}
                    </span>
                    {activity.entity_type === "product" &&
                      `Updated product price for ${
                        activity.metadata?.name || "item"
                      }`}
                    {activity.entity_type === "media" &&
                      `Uploaded media file ${activity.metadata?.filename}`}
                    {activity.entity_type === "blog_post" &&
                      `Published article "${activity.metadata?.title}"`}
                  </p>
                  <span className="font-sans text-[10px] text-stone/50 block mt-1">
                    {new Date(activity.created_at).toLocaleString("en-IN")}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Analytics Snapshot Stub */}
        <div className="bg-cream border border-stone/10 rounded-card p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp size={18} className="text-stone" />
              <h2 className="font-serif text-lg text-espresso font-semibold">
                Web Analytics
              </h2>
            </div>
            <p className="font-sans text-stone text-sm leading-relaxed mb-6">
              Track visitors, page views, and click metrics on the public Ridhana site.
            </p>
          </div>

          <div className="p-5 border border-dashed border-stone/20 rounded-lg text-center bg-bone/45">
            <p className="font-sans text-xs text-stone font-semibold mb-3">
              Analytics Not Connected
            </p>
            <button
              onClick={() => alert("Connecting to Vercel Analytics...")}
              className="inline-flex items-center gap-2 text-gold hover:text-gold-light text-xs font-semibold tracking-widest uppercase transition-colors"
            >
              Connect Vercel Analytics
              <ArrowRight size={12} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
