-- Initial schema setup for Ridhana CMS + Admin Dashboard
-- Creation time: 2026-07-03

-- Enable UUID extension if not enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ─── 1. Admin Users Table ──────────────────────────────────────────────────
-- Links to auth.users (Supabase Auth)
CREATE TABLE IF NOT EXISTS public.admin_users (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL UNIQUE,
    role TEXT NOT NULL CHECK (role IN ('owner', 'editor')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Index for fast lookup on admin id
CREATE INDEX IF NOT EXISTS admin_users_id_idx ON public.admin_users(id);

-- Helper functions for RLS checks
CREATE OR REPLACE FUNCTION public.is_admin(user_id UUID)
RETURNS BOOLEAN SECURITY DEFINER AS $$
BEGIN
    RETURN EXISTS (SELECT 1 FROM public.admin_users WHERE id = user_id);
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION public.is_owner(user_id UUID)
RETURNS BOOLEAN SECURITY DEFINER AS $$
BEGIN
    RETURN EXISTS (SELECT 1 FROM public.admin_users WHERE id = user_id AND role = 'owner');
END;
$$ LANGUAGE plpgsql;

-- ─── 2. Media Table ────────────────────────────────────────────────────────
-- Storage info for uploaded photos and videos
CREATE TABLE IF NOT EXISTS public.media (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    type TEXT NOT NULL CHECK (type IN ('image', 'video')),
    storage_path TEXT NOT NULL UNIQUE,
    variants JSONB DEFAULT '{}'::jsonb, -- responsive sizes, formats, video poster info
    alt_text TEXT NOT NULL,
    tags TEXT[] DEFAULT '{}'::text[],
    uploaded_by UUID REFERENCES public.admin_users(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE INDEX IF NOT EXISTS media_type_idx ON public.media(type);

-- ─── 3. Products Table ─────────────────────────────────────────────────────
-- Flour products list
CREATE TABLE IF NOT EXISTS public.products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    price NUMERIC NOT NULL CHECK (price >= 0),
    unit TEXT DEFAULT 'Kg' NOT NULL,
    category TEXT NOT NULL CHECK (category IN ('Wheat', 'Millet', 'Other')),
    description TEXT NOT NULL,
    nutrition_highlights JSONB DEFAULT '[]'::jsonb NOT NULL, -- list of strings
    best_uses JSONB DEFAULT '[]'::jsonb NOT NULL,            -- list of strings
    display_order INT DEFAULT 0 NOT NULL,
    status TEXT DEFAULT 'draft' NOT NULL CHECK (status IN ('draft', 'published', 'archived')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE INDEX IF NOT EXISTS products_status_idx ON public.products(status);
CREATE INDEX IF NOT EXISTS products_display_order_idx ON public.products(display_order);

-- ─── 4. Product Media Table ────────────────────────────────────────────────
-- Maps media to products (supports multiple media items per product)
CREATE TABLE IF NOT EXISTS public.product_media (
    product_id UUID REFERENCES public.products(id) ON DELETE CASCADE,
    media_id UUID REFERENCES public.media(id) ON DELETE CASCADE,
    position INT DEFAULT 0 NOT NULL,
    PRIMARY KEY (product_id, media_id)
);

CREATE INDEX IF NOT EXISTS product_media_product_id_idx ON public.product_media(product_id);

-- ─── 5. Page Sections Table ────────────────────────────────────────────────
-- Stores structured blocks for public homepage/pages
CREATE TABLE IF NOT EXISTS public.page_sections (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    page_slug TEXT NOT NULL, -- 'home', 'who-we-are', 'contact'
    section_key TEXT NOT NULL, -- 'hero', 'pillars', 'philosophy', etc.
    content JSONB NOT NULL,
    status TEXT DEFAULT 'draft' NOT NULL CHECK (status IN ('draft', 'published')),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE (page_slug, section_key)
);

CREATE INDEX IF NOT EXISTS page_sections_slug_key_idx ON public.page_sections(page_slug, section_key);

-- ─── 6. Blog Posts Table ───────────────────────────────────────────────────
-- MDX / Rich-text articles
CREATE TABLE IF NOT EXISTS public.blog_posts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    excerpt TEXT NOT NULL,
    body TEXT NOT NULL,
    cover_media_id UUID REFERENCES public.media(id) ON DELETE SET NULL,
    seo_title TEXT,
    seo_description TEXT,
    status TEXT DEFAULT 'draft' NOT NULL CHECK (status IN ('draft', 'published')),
    publish_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE INDEX IF NOT EXISTS blog_posts_status_idx ON public.blog_posts(status);
CREATE INDEX IF NOT EXISTS blog_posts_publish_at_idx ON public.blog_posts(publish_at);

-- ─── 7. Orders Log Table ───────────────────────────────────────────────────
-- Manual orders log kept by admin for WhatsApp/phone orders
CREATE TABLE IF NOT EXISTS public.orders_log (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    customer_name TEXT NOT NULL,
    product_id UUID REFERENCES public.products(id) ON DELETE SET NULL,
    quantity NUMERIC NOT NULL CHECK (quantity > 0),
    channel TEXT NOT NULL CHECK (channel IN ('WhatsApp', 'Phone', 'Other')),
    status TEXT DEFAULT 'New' NOT NULL CHECK (status IN ('New', 'Confirmed', 'Fulfilled', 'Cancelled')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE INDEX IF NOT EXISTS orders_log_status_idx ON public.orders_log(status);

-- ─── 8. Contact Submissions Table ──────────────────────────────────────────
-- Stores submissions from contact page form
CREATE TABLE IF NOT EXISTS public.contact_submissions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ─── 9. Audit Log Table ────────────────────────────────────────────────────
-- Track actions for compliance and debugging
CREATE TABLE IF NOT EXISTS public.audit_log (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES public.admin_users(id) ON DELETE SET NULL,
    action TEXT NOT NULL, -- 'create', 'update', 'delete', 'publish'
    entity_type TEXT NOT NULL, -- 'product', 'media', 'blog_post', 'section', 'settings'
    entity_id TEXT, -- ID of target entity
    metadata JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE INDEX IF NOT EXISTS audit_log_created_at_idx ON public.audit_log(created_at DESC);

-- ─── 10. Site Settings Table ───────────────────────────────────────────────
-- Site-wide key-value settings
CREATE TABLE IF NOT EXISTS public.site_settings (
    key TEXT PRIMARY KEY,
    value JSONB NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Insert default site settings
INSERT INTO public.site_settings (key, value) VALUES
('contact', '{"phone": "+91 9800199797", "whatsapp": "https://wa.me/919800199797", "instagram": "https://www.instagram.com/ridhanahealth", "address": "#32, Vijaya House, Station Road, Vikhroli West, Mumbai - 83"}'::jsonb),
('seo', '{"title_template": "%s | Ridhana", "default_meta": "Experience the art of slow milling with our fresh, preservative-free flours. From Khapli Wheat to Jowar and Bajra, we bring pure, nutrient-rich nourishment from the stone mill to your kitchen."}'::jsonb)
ON CONFLICT (key) DO NOTHING;


-- ─── Triggers for updated_at fields ───────────────────────────────────────
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER tr_products_updated_at
BEFORE UPDATE ON public.products
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE OR REPLACE TRIGGER tr_page_sections_updated_at
BEFORE UPDATE ON public.page_sections
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE OR REPLACE TRIGGER tr_blog_posts_updated_at
BEFORE UPDATE ON public.blog_posts
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();


-- ─── 11. Row Level Security (RLS) Policies ────────────────────────────────
-- All tables enable RLS by default
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.media ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_media ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.page_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders_log ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_log ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

-- PUBLIC READ-ONLY POLICIES (Required for the public site)
CREATE POLICY "Allow public read of published products" ON public.products
    FOR SELECT USING (status = 'published');

CREATE POLICY "Allow public read of media" ON public.media
    FOR SELECT USING (true); -- Images/videos used in published products/pages must be public

CREATE POLICY "Allow public read of product-media mapping" ON public.product_media
    FOR SELECT USING (true);

CREATE POLICY "Allow public read of published page sections" ON public.page_sections
    FOR SELECT USING (status = 'published');

CREATE POLICY "Allow public read of published blog posts" ON public.blog_posts
    FOR SELECT USING (status = 'published');

CREATE POLICY "Allow public read of site settings" ON public.site_settings
    FOR SELECT USING (true);

-- Contact form submit policy
CREATE POLICY "Allow anonymous submission of contact inquiries" ON public.contact_submissions
    FOR INSERT WITH CHECK (true);

-- ADMIN AUTH POLICIES (Requires user to be in public.admin_users)
-- admin_users policies
CREATE POLICY "Admins can view all admin users" ON public.admin_users
    FOR SELECT USING (public.is_admin(auth.uid()));

CREATE POLICY "Owners can manage admin users" ON public.admin_users
    FOR ALL USING (public.is_owner(auth.uid()));

-- media policies
CREATE POLICY "Admins can view and manage all media" ON public.media
    FOR ALL USING (public.is_admin(auth.uid()));

-- products policies
CREATE POLICY "Admins can view and manage all products" ON public.products
    FOR ALL USING (public.is_admin(auth.uid()));

-- product_media policies
CREATE POLICY "Admins can view and manage all product-media mapping" ON public.product_media
    FOR ALL USING (public.is_admin(auth.uid()));

-- page_sections policies
CREATE POLICY "Admins can view and manage all page sections" ON public.page_sections
    FOR ALL USING (public.is_admin(auth.uid()));

-- blog_posts policies
CREATE POLICY "Admins can view and manage all blog posts" ON public.blog_posts
    FOR ALL USING (public.is_admin(auth.uid()));

-- orders_log policies
CREATE POLICY "Admins can view and manage orders log" ON public.orders_log
    FOR ALL USING (public.is_admin(auth.uid()));

-- contact_submissions policies
CREATE POLICY "Admins can view contact submissions" ON public.contact_submissions
    FOR SELECT USING (public.is_admin(auth.uid()));

CREATE POLICY "Owners can delete contact submissions" ON public.contact_submissions
    FOR DELETE USING (public.is_owner(auth.uid()));

-- audit_log policies
CREATE POLICY "Admins can view audit logs" ON public.audit_log
    FOR SELECT USING (public.is_admin(auth.uid()));

CREATE POLICY "Admins can insert audit logs" ON public.audit_log
    FOR INSERT WITH CHECK (public.is_admin(auth.uid()));

-- site_settings policies
CREATE POLICY "Admins can manage site settings" ON public.site_settings
    FOR ALL USING (public.is_admin(auth.uid()));
