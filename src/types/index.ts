export type PricingType = 'fixed' | 'starting' | 'quotation';
export type PublicationStatus = 'published' | 'draft' | 'archived';
export type AvailabilityStatus = 'made_to_order' | 'in_stock' | 'custom_fabrication';

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image_url: string;
  examples: string[];
  featured: boolean;
  order_index: number;
  seo_title?: string;
  seo_description?: string;
}

export interface ProductSpecification {
  label: string;
  value: string;
}

export interface Product {
  id: string;
  name: string;
  title: string; // Alias for backward compatibility
  slug: string;
  category_id: string;
  category_name: string;
  category_slug: string;
  short_description: string;
  full_description: string;
  primary_image: string;
  image_url: string; // Alias for backward compatibility
  gallery_images: string[];
  gallery_urls?: string[]; // Alias for backward compatibility
  pricing_type: PricingType;
  price?: number | null;
  starting_price?: number | null;
  unit?: string | null;
  sku: string;
  specifications: ProductSpecification[];
  features: string[];
  featured: boolean;
  is_featured: boolean; // Alias for backward compatibility
  publication_status: PublicationStatus;
  is_published: boolean; // Alias for backward compatibility
  availability_status: AvailabilityStatus;
  seo_title?: string;
  seo_description?: string;
  created_at: string;
  updated_at: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'Food Trucks' | 'Food Carts' | 'Food Vans' | 'Stainless Steel' | 'All';
  image_url: string;
  description: string;
  tag: string;
}

export interface BenefitItem {
  id: string;
  title: string;
  description: string;
  iconName: string;
}

export interface EnquiryFormData {
  fullName: string;
  phone: string;
  email?: string;
  productInterested: string;
  message: string;
  city?: string;
  vehiclePlatform?: string;
}

export interface CompanyConfig {
  name: string;
  tagline: string;
  primaryColor: string;
  darkGreen: string;
  lightGreen: string;
  whatsappNumber: string;
  displayPhone: string;
  email: string;
  address: {
    area: string;
    city: string;
    state: string;
    country: string;
    isPlaceholder: boolean;
  };
  disclaimer: string;
  pricingDisclaimer: string;
}

export interface ProductFilterOptions {
  categorySlug?: string;
  pricingType?: string;
  searchQuery?: string;
  sortBy?: 'featured' | 'name-asc' | 'name-desc' | 'price-asc' | 'price-desc';
}

