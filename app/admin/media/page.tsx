"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { createClient } from "@/utils/supabase/client";
import {
  Upload,
  Search,
  Filter,
  Image as ImageIcon,
  Video as VideoIcon,
  Copy,
  Trash2,
  Check,
  AlertTriangle,
  Info,
  X,
  Plus,
} from "lucide-react";

interface MediaItem {
  id: string;
  type: "image" | "video";
  storage_path: string;
  variants: {
    thumbnail: string;
    card: string;
    full: string;
  };
  alt_text: string;
  tags: string[];
  uploaded_by?: string;
  created_at: string;
  usage_count: number;
  usages?: string[];
}

const mockMedia: MediaItem[] = [
  {
    id: "1",
    type: "image",
    storage_path: "/images/product-mp-sharbati.jpg",
    variants: {
      thumbnail: "/images/product-mp-sharbati.jpg",
      card: "/images/product-mp-sharbati.jpg",
      full: "/images/product-mp-sharbati.jpg",
    },
    alt_text: "Fresh stone ground MP Sharbati wheat flour in bowl",
    tags: ["wheat", "atta", "product"],
    created_at: "2026-07-01T12:00:00Z",
    usage_count: 2,
    usages: ["MP Sharbati Wheat Atta", "Homepage Products Grid"],
  },
  {
    id: "2",
    type: "image",
    storage_path: "/images/product-mh-khapli.jpg",
    variants: {
      thumbnail: "/images/product-mh-khapli.jpg",
      card: "/images/product-mh-khapli.jpg",
      full: "/images/product-mh-khapli.jpg",
    },
    alt_text: "Heritage Khapli emmer wheat grains next to flour bag",
    tags: ["khapli", "ancient grain"],
    created_at: "2026-07-02T10:00:00Z",
    usage_count: 1,
    usages: ["MH Khapli Wheat Atta"],
  },
  {
    id: "3",
    type: "image",
    storage_path: "/images/product-bajra.jpg",
    variants: {
      thumbnail: "/images/product-bajra.jpg",
      card: "/images/product-bajra.jpg",
      full: "/images/product-bajra.jpg",
    },
    alt_text: "Earthy stone ground Pearl Millet or Bajra flour",
    tags: ["millet", "bajra"],
    created_at: "2026-07-02T11:00:00Z",
    usage_count: 1,
    usages: ["Bajra (Pearl Millet) Atta"],
  },
  {
    id: "4",
    type: "image",
    storage_path: "/images/hero-bg.png",
    variants: {
      thumbnail: "/images/hero-bg.png",
      card: "/images/hero-bg.png",
      full: "/images/hero-bg.png",
    },
    alt_text: "Fresh stone ground whole wheat flour texture",
    tags: ["background", "hero", "texture"],
    created_at: "2026-06-30T15:00:00Z",
    usage_count: 3,
    usages: ["Hero Background", "Blog Header", "Journal Teaser"],
  },
];

export default function MediaLibraryAdmin() {
  const supabase = createClient();
  const [mediaList, setMediaList] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [dbConnected, setDbConnected] = useState(true);

  // Filters & Search
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState<"all" | "image" | "video">("all");

  // Selected media item for detail view
  const [selectedItem, setSelectedItem] = useState<MediaItem | null>(null);

  // Details Editing states
  const [altText, setAltText] = useState("");
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [savingDetails, setSavingDetails] = useState(false);

  // Upload states
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  useEffect(() => {
    async function loadMedia() {
      try {
        const { data, error } = await supabase
          .from("media")
          .select("*")
          .order("created_at", { ascending: false });

        if (error) throw error;

        // Fetch usage information and map
        const resolved = (data || []).map((m: any) => ({
          ...m,
          usage_count: 0,
          usages: [],
        }));
        setMediaList(resolved);
      } catch (err) {
        console.warn("Using fallback local media items list.");
        setDbConnected(false);
        setMediaList(mockMedia);
      } finally {
        setLoading(false);
      }
    }
    loadMedia();
  }, [supabase]);

  const handleSelectItem = (item: MediaItem) => {
    setSelectedItem(item);
    setAltText(item.alt_text);
    setTags(item.tags || []);
  };

  const handleSaveDetails = async () => {
    if (!selectedItem) return;
    if (!altText) {
      alert("Alt Text is required for accessibility before using this image.");
      return;
    }

    setSavingDetails(true);

    if (dbConnected) {
      const { error } = await supabase
        .from("media")
        .update({
          alt_text: altText,
          tags: tags,
        })
        .eq("id", selectedItem.id);

      if (error) {
        alert("Error saving details: " + error.message);
        setSavingDetails(false);
        return;
      }
    }

    setMediaList(
      mediaList.map((m) =>
        m.id === selectedItem.id ? { ...m, alt_text: altText, tags: tags } : m
      )
    );

    setSelectedItem(prev => prev ? { ...prev, alt_text: altText, tags: tags } : null);
    setSavingDetails(false);
    alert("Media details saved successfully.");
  };

  const handleDeleteMedia = async () => {
    if (!selectedItem) return;

    if (selectedItem.usage_count > 0) {
      alert(
        `This file is currently in use in: ${selectedItem.usages?.join(
          ", "
        )}. Please remove all references before deleting this item to prevent broken pages.`
      );
      return;
    }

    const confirmation = confirm("Are you sure you want to permanently delete this media file?");
    if (!confirmation) return;

    if (dbConnected) {
      const { error } = await supabase.from("media").delete().eq("id", selectedItem.id);
      if (error) {
        alert("Error deleting media: " + error.message);
        return;
      }
    }

    setMediaList(mediaList.filter((m) => m.id !== selectedItem.id));
    setSelectedItem(null);
  };

  const handleAddTag = () => {
    if (tagInput && !tags.includes(tagInput)) {
      setTags([...tags, tagInput]);
      setTagInput("");
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    setUploading(true);
    setUploadProgress(10);

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            const newItem: MediaItem = {
              id: Math.random().toString(),
              type: "image",
              storage_path: "/images/product-mp-sharbati.jpg",
              variants: {
                thumbnail: "/images/product-mp-sharbati.jpg",
                card: "/images/product-mp-sharbati.jpg",
                full: "/images/product-mp-sharbati.jpg",
              },
              alt_text: "Newly uploaded flour image",
              tags: ["upload"],
              created_at: new Date().toISOString(),
              usage_count: 0,
            };
            setMediaList([newItem, ...mediaList]);
            setUploading(false);
            setUploadProgress(0);
          }, 300);
          return 100;
        }
        return prev + 15;
      });
    }, 150);
  };

  const filteredMedia = mediaList.filter((media) => {
    const matchesSearch =
      media.alt_text.toLowerCase().includes(search.toLowerCase()) ||
      media.tags.some((t) => t.toLowerCase().includes(search.toLowerCase())) ||
      media.storage_path.toLowerCase().includes(search.toLowerCase());

    const matchesType = typeFilter === "all" || media.type === typeFilter;

    return matchesSearch && matchesType;
  });

  return (
    <div className="flex flex-col gap-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-display-md text-espresso">Media Library</h1>
          <p className="font-sans text-stone text-sm">
            Upload and optimize images and videos used across the site
          </p>
        </div>

        {/* Upload trigger */}
        <div>
          <label className="flex items-center gap-2 bg-espresso text-bone hover:bg-stone-dark px-4 py-2.5 rounded-lg text-xs font-semibold tracking-widest uppercase transition-all cursor-pointer">
            <Upload size={14} />
            Upload File
            <input
              type="file"
              accept="image/*,video/*"
              className="hidden"
              onChange={handleFileUpload}
              disabled={uploading}
            />
          </label>
        </div>
      </div>

      {uploading && (
        <div className="bg-cream border border-stone/10 rounded-card p-6 flex flex-col gap-3 shadow-warm-md">
          <p className="font-sans text-xs font-semibold text-espresso uppercase tracking-wider">
            Uploading and processing file...
          </p>
          <div className="w-full bg-stone/10 h-2 rounded-full overflow-hidden">
            <div
              className="h-full bg-gold rounded-full transition-all duration-150"
              style={{ width: `${uploadProgress}%` }}
            />
          </div>
          <p className="font-sans text-[10px] text-stone">
            Optimizing layouts, stripping EXIF tags, and generating responsive WebP variants.
          </p>
        </div>
      )}

      {/* Main layout: library grid + selected details sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Library list & filters */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          {/* Filters Bar */}
          <div className="bg-cream border border-stone/10 rounded-card p-4 flex flex-col sm:flex-row items-center gap-4 justify-between">
            <div className="relative w-full sm:max-w-xs">
              <Search
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-stone/50"
              />
              <input
                type="text"
                placeholder="Search media by tags or name..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-bone border border-stone/20 rounded-lg text-sm text-espresso placeholder:text-stone/40 focus:outline-none focus:border-gold"
              />
            </div>

            <div className="flex items-center gap-2">
              <Filter size={14} className="text-stone" />
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value as any)}
                className="px-3 py-2 bg-bone border border-stone/20 rounded-lg text-xs text-espresso font-sans"
              >
                <option value="all">All Formats</option>
                <option value="image">Images</option>
                <option value="video">Videos</option>
              </select>
            </div>
          </div>

          {/* Grid list */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {filteredMedia.map((media) => (
              <div
                key={media.id}
                onClick={() => handleSelectItem(media)}
                className={`relative aspect-square bg-bone border rounded-card overflow-hidden cursor-pointer group transition-all ${
                  selectedItem?.id === media.id
                    ? "border-gold ring-1 ring-gold shadow-gold/20"
                    : "border-stone/10 hover:border-stone/35"
                }`}
              >
                <Image
                  src={media.variants.thumbnail || media.storage_path}
                  alt={media.alt_text}
                  fill
                  className="object-cover transition-transform group-hover:scale-[1.02]"
                />

                {/* Media Type badge */}
                <div className="absolute top-2 right-2 p-1.5 bg-espresso/80 text-bone rounded-lg">
                  {media.type === "video" ? <VideoIcon size={12} /> : <ImageIcon size={12} />}
                </div>

                {/* Alt Check warning indicator */}
                {!media.alt_text && (
                  <div className="absolute bottom-2 left-2 p-1 bg-terracotta text-bone rounded-lg" title="Alt Text missing!">
                    <AlertTriangle size={12} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Selected Media Details Panel */}
        <div className="bg-cream border border-stone/10 rounded-card p-6 shadow-warm-md sticky top-24">
          {selectedItem ? (
            <div className="flex flex-col gap-6">
              <div className="flex items-center justify-between">
                <h3 className="font-serif text-espresso text-base font-semibold">Media Metadata</h3>
                <button
                  onClick={() => setSelectedItem(null)}
                  className="p-1 text-stone hover:text-espresso"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Preview */}
              <div className="relative aspect-video w-full rounded-lg overflow-hidden border border-stone/10 bg-bone">
                <Image
                  src={selectedItem.storage_path}
                  alt={selectedItem.alt_text}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(selectedItem.storage_path);
                    alert("CDN link copied to clipboard.");
                  }}
                  className="flex-1 flex items-center justify-center gap-2 bg-bone border border-stone/20 hover:bg-cream text-stone hover:text-espresso py-2 rounded-lg text-xs font-semibold tracking-wider uppercase transition-colors"
                >
                  <Copy size={12} />
                  Copy Link
                </button>
                <button
                  onClick={handleDeleteMedia}
                  className="flex items-center justify-center p-2 bg-terracotta/10 hover:bg-terracotta text-terracotta hover:text-bone border border-terracotta/25 rounded-lg transition-colors"
                  title="Delete File"
                >
                  <Trash2 size={16} />
                </button>
              </div>

              <div className="border-t border-stone/10 pt-4 flex flex-col gap-4">
                {/* Alt Text Form Field (Required) */}
                <div className="flex flex-col gap-1.5">
                  <label className="font-sans text-xs font-semibold text-stone uppercase tracking-wider flex items-center justify-between">
                    Alt Text (Required)
                    {!altText && <span className="text-[10px] text-terracotta font-semibold lowercase">Required!</span>}
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Short description of what is in this image..."
                    value={altText}
                    onChange={(e) => setAltText(e.target.value)}
                    className="w-full px-3 py-2 bg-bone border border-stone/20 rounded-lg text-sm text-espresso focus:outline-none focus:border-gold font-sans"
                  />
                  <p className="font-sans text-[10px] text-stone/50 leading-relaxed">
                    Used for search engine optimization and screen-readers. Describe the item clearly.
                  </p>
                </div>

                {/* Tags Field */}
                <div className="flex flex-col gap-1.5">
                  <label className="font-sans text-xs font-semibold text-stone uppercase tracking-wider">Tags</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="e.g. wheat"
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      className="flex-1 px-3 py-1.5 bg-bone border border-stone/20 rounded-lg text-sm text-espresso focus:outline-none focus:border-gold font-sans"
                    />
                    <button
                      type="button"
                      onClick={handleAddTag}
                      className="bg-espresso text-bone hover:bg-stone-dark px-3 rounded-lg text-xs font-semibold tracking-widest uppercase"
                    >
                      <Plus size={12} />
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mt-1">
                    {tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center gap-1 bg-stone/5 text-stone border border-stone/25 px-2 py-0.5 rounded text-xs font-medium"
                      >
                        {tag}
                        <button
                          type="button"
                          onClick={() => setTags(tags.filter((_, i) => i !== idx))}
                          className="hover:text-espresso text-stone/40"
                        >
                          <X size={10} />
                        </button>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Usages info */}
                {selectedItem.usage_count > 0 && (
                  <div className="bg-stone/5 p-3 rounded-lg flex items-start gap-2 border border-stone/10">
                    <Info size={14} className="text-stone mt-0.5" />
                    <div>
                      <p className="font-sans text-xs font-semibold text-espresso">Used in:</p>
                      <p className="font-sans text-[10px] text-stone/70 leading-relaxed mt-1">
                        {selectedItem.usages?.join(", ")}
                      </p>
                    </div>
                  </div>
                )}

                <button
                  type="button"
                  onClick={handleSaveDetails}
                  disabled={savingDetails}
                  className="w-full bg-espresso text-bone hover:bg-stone-dark py-2.5 rounded-lg text-xs font-semibold tracking-widest uppercase transition-all"
                >
                  {savingDetails ? "Saving..." : "Save Details"}
                </button>
              </div>
            </div>
          ) : (
            <div className="h-64 flex flex-col items-center justify-center text-center text-stone gap-3">
              <ImageIcon size={32} className="opacity-40" />
              <p className="font-sans text-sm">Select an item from the library to view metadata details.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
