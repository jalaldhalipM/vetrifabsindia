export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image_url: string;
  examples: string[];
  featured: boolean;
  order_index: number;
}

export interface ProductSpecification {
  label: string;
  value: string;
}

export interface Product {
  id: string;
  title: string;
  slug: string;
  category_id: string;
  category_name: string;
  short_description: string;
  full_description?: string;
  image_url: string;
  gallery_urls?: string[];
  specifications: ProductSpecification[];
  features: string[];
  is_featured: boolean;
  is_published: boolean; // Pre-configured for Supabase publication status
  created_at?: string;
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
}
