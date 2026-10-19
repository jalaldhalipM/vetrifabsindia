-- ==============================================================================
-- VETRI FABS INDIA — SUPABASE PRODUCTION DATABASE SCHEMA & RLS POLICIES
-- ==============================================================================
-- This script sets up tables, constraints, indexes, Row Level Security (RLS),
-- storage buckets, and seed data for the Vetri Fabs India Product Catalogue.
-- ==============================================================================

-- 1. Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. CATEGORIES TABLE
CREATE TABLE IF NOT EXISTS public.categories (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    description TEXT NOT NULL,
    image_url TEXT NOT NULL,
    examples JSONB DEFAULT '[]'::jsonb,
    featured BOOLEAN DEFAULT true,
    order_index INTEGER DEFAULT 0,
    seo_title TEXT,
    seo_description TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. PRODUCTS TABLE
CREATE TABLE IF NOT EXISTS public.products (
    id TEXT PRIMARY KEY DEFAULT uuid_generate_v4()::text,
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    category_id TEXT NOT NULL REFERENCES public.categories(id) ON DELETE RESTRICT,
    category_name TEXT NOT NULL,
    category_slug TEXT NOT NULL,
    short_description TEXT NOT NULL,
    full_description TEXT NOT NULL,
    primary_image TEXT NOT NULL,
    pricing_type TEXT NOT NULL CHECK (pricing_type IN ('fixed', 'starting', 'quotation')),
    price NUMERIC(12, 2) CHECK (price IS NULL OR price > 0),
    starting_price NUMERIC(12, 2) CHECK (starting_price IS NULL OR starting_price > 0),
    unit TEXT,
    sku TEXT NOT NULL UNIQUE,
    specifications JSONB DEFAULT '[]'::jsonb NOT NULL,
    features JSONB DEFAULT '[]'::jsonb NOT NULL,
    featured BOOLEAN DEFAULT false NOT NULL,
    publication_status TEXT NOT NULL DEFAULT 'published' CHECK (publication_status IN ('published', 'draft', 'archived')),
    availability_status TEXT NOT NULL DEFAULT 'custom_fabrication' CHECK (availability_status IN ('custom_fabrication', 'made_to_order', 'in_stock')),
    seo_title TEXT,
    seo_description TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. PRODUCT IMAGES TABLE (For ordering multiple gallery photos)
CREATE TABLE IF NOT EXISTS public.product_images (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    product_id TEXT NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
    url TEXT NOT NULL,
    display_order INTEGER DEFAULT 0,
    alt_text TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. CUSTOMER ENQUIRIES & QUOTE REQUESTS TABLE
CREATE TABLE IF NOT EXISTS public.enquiries (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    full_name TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT,
    product_interested TEXT NOT NULL,
    product_slug TEXT,
    message TEXT NOT NULL,
    city TEXT,
    status TEXT DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'quoted', 'closed')),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. INDEXES FOR PERFORMANCE & SEARCH
CREATE INDEX IF NOT EXISTS idx_products_category_slug ON public.products(category_slug);
CREATE INDEX IF NOT EXISTS idx_products_publication_status ON public.products(publication_status);
CREATE INDEX IF NOT EXISTS idx_products_featured ON public.products(featured);
CREATE INDEX IF NOT EXISTS idx_products_pricing_type ON public.products(pricing_type);
CREATE INDEX IF NOT EXISTS idx_product_images_product_id ON public.product_images(product_id, display_order);

-- 7. ROW LEVEL SECURITY (RLS)
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.enquiries ENABLE ROW LEVEL SECURITY;

-- Categories RLS:
-- Public can read all categories
CREATE POLICY "Public can view categories" 
    ON public.categories FOR SELECT 
    USING (true);

-- Admin users can insert, update, delete categories
CREATE POLICY "Admins can manage categories" 
    ON public.categories FOR ALL 
    TO authenticated 
    USING (auth.jwt() ->> 'role' = 'authenticated');

-- Products RLS:
-- Public visitors can only view published products
CREATE POLICY "Public can view published products" 
    ON public.products FOR SELECT 
    USING (publication_status = 'published');

-- Admins can view all products (including drafts and archived) and modify them
CREATE POLICY "Admins can manage all products" 
    ON public.products FOR ALL 
    TO authenticated 
    USING (auth.jwt() ->> 'role' = 'authenticated');

-- Product Images RLS:
-- Public visitors can view images for published products
CREATE POLICY "Public can view published product images" 
    ON public.product_images FOR SELECT 
    USING (
        EXISTS (
            SELECT 1 FROM public.products p 
            WHERE p.id = product_images.product_id 
            AND p.publication_status = 'published'
        )
    );

-- Admins can manage product images
CREATE POLICY "Admins can manage product images" 
    ON public.product_images FOR ALL 
    TO authenticated 
    USING (auth.jwt() ->> 'role' = 'authenticated');

-- Enquiries RLS:
-- Anyone can submit a quote enquiry
CREATE POLICY "Public can submit enquiries" 
    ON public.enquiries FOR INSERT 
    WITH CHECK (true);

-- Only authenticated admins can read and update enquiries
CREATE POLICY "Admins can view and manage enquiries" 
    ON public.enquiries FOR ALL 
    TO authenticated 
    USING (auth.jwt() ->> 'role' = 'authenticated');

-- 8. STORAGE BUCKET CONFIGURATION FOR PRODUCT IMAGES
-- Run in Supabase SQL editor:
INSERT INTO storage.buckets (id, name, public)
VALUES ('product-images', 'product-images', true)
ON CONFLICT (id) DO NOTHING;

-- Public can view files in product-images bucket
CREATE POLICY "Public Access to Product Images" 
    ON storage.objects FOR SELECT 
    USING (bucket_id = 'product-images');

-- Only authenticated administrators can upload product images
CREATE POLICY "Admin Upload to Product Images" 
    ON storage.objects FOR INSERT 
    TO authenticated 
    WITH CHECK (bucket_id = 'product-images');

CREATE POLICY "Admin Update Product Images" 
    ON storage.objects FOR UPDATE 
    TO authenticated 
    USING (bucket_id = 'product-images');

CREATE POLICY "Admin Delete Product Images" 
    ON storage.objects FOR DELETE 
    TO authenticated 
    USING (bucket_id = 'product-images');
