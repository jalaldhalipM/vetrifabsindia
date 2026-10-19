import { Category, Product, ProductFilterOptions, ProductSpecification, PricingType, AvailabilityStatus, PublicationStatus } from '@/types';
import { getAllCategories, getCategoryBySlug } from '@/data/categories';
import {
  getAllProducts,
  getProductBySlug,
  getRelatedProducts,
} from '@/data/products';
import { supabase, isSupabaseConfigured } from './supabase';

interface SupabaseProductRow {
  id: string;
  name: string;
  slug: string;
  category_id: string;
  category_name: string;
  category_slug: string;
  short_description: string;
  full_description: string;
  primary_image: string;
  pricing_type: PricingType;
  price?: number | null;
  starting_price?: number | null;
  unit?: string | null;
  sku: string;
  specifications: ProductSpecification[];
  features: string[];
  featured: boolean;
  publication_status: PublicationStatus;
  availability_status: AvailabilityStatus;
  seo_title?: string;
  seo_description?: string;
  created_at: string;
  updated_at: string;
  product_images?: Array<{ url: string; display_order?: number }>;
}

/**
 * Clean Data-Access Layer for Vetri Fabs India Product Catalogue
 * Integrates with Supabase when configured, or serves typed data source.
 */

export async function fetchCategories(): Promise<Category[]> {
  if (isSupabaseConfigured() && supabase) {
    try {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('order_index', { ascending: true });

      if (!error && data && data.length > 0) {
        return data as Category[];
      }
    } catch {
      // Fall through to typed data source
    }
  }
  return getAllCategories();
}

export async function fetchCategoryBySlug(slug: string): Promise<Category | null> {
  if (isSupabaseConfigured() && supabase) {
    try {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .eq('slug', slug)
        .maybeSingle();

      if (!error && data) {
        return data as Category;
      }
    } catch {
      // Fall through to typed data source
    }
  }
  return getCategoryBySlug(slug) || null;
}

export async function fetchProducts(options?: ProductFilterOptions): Promise<Product[]> {
  if (isSupabaseConfigured() && supabase) {
    try {
      let query = supabase
        .from('products')
        .select('*, product_images(url, display_order)')
        .eq('publication_status', 'published');

      if (options?.categorySlug && options.categorySlug !== 'all') {
        query = query.eq('category_slug', options.categorySlug);
      }

      if (options?.pricingType && options.pricingType !== 'all') {
        query = query.eq('pricing_type', options.pricingType);
      }

      const { data, error } = await query;
      if (!error && data && data.length > 0) {
        const rows = data as unknown as SupabaseProductRow[];
        const mapped: Product[] = rows.map((item) => ({
          ...item,
          title: item.name,
          image_url: item.primary_image,
          gallery_images: item.product_images?.map((img) => img.url) || [item.primary_image],
          gallery_urls: item.product_images?.map((img) => img.url) || [item.primary_image],
          is_featured: item.featured,
          is_published: item.publication_status === 'published',
        }));

        if (options?.searchQuery) {
          const q = options.searchQuery.toLowerCase();
          return mapped.filter(
            (p) =>
              p.name.toLowerCase().includes(q) ||
              p.short_description.toLowerCase().includes(q) ||
              p.sku.toLowerCase().includes(q)
          );
        }
        return mapped;
      }
    } catch {
      // Fall through to typed data source
    }
  }

  return getAllProducts(options);
}

export async function fetchProductBySlug(slug: string): Promise<Product | null> {
  if (isSupabaseConfigured() && supabase) {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*, product_images(url, display_order)')
        .eq('slug', slug)
        .eq('publication_status', 'published')
        .maybeSingle();

      if (!error && data) {
        const item = data as unknown as SupabaseProductRow;
        return {
          ...item,
          title: item.name,
          image_url: item.primary_image,
          gallery_images: item.product_images?.map((img) => img.url) || [item.primary_image],
          gallery_urls: item.product_images?.map((img) => img.url) || [item.primary_image],
          is_featured: item.featured,
          is_published: item.publication_status === 'published',
        } as Product;
      }
    } catch {
      // Fall through to typed data source
    }
  }

  return getProductBySlug(slug) || null;
}

export async function fetchRelatedProducts(
  currentProductId: string,
  categoryId: string,
  limit = 3
): Promise<Product[]> {
  return getRelatedProducts(currentProductId, categoryId, limit);
}
