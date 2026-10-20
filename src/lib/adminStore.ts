/**
 * Admin Store — localStorage-based persistence for CMS data.
 * Products and Gallery items edited in the admin dashboard are stored here
 * and read back by the public pages, so changes are immediately visible.
 */

import { Product, GalleryItem, Category } from '@/types';
import { GALLERY_ITEMS } from '@/data/gallery';
import { CATEGORIES } from '@/data/categories';
import { getAllProducts } from '@/data/products';

const KEYS = {
  PRODUCTS: 'vf_admin_products',
  GALLERY: 'vf_admin_gallery',
  CATEGORIES: 'vf_admin_categories',
  AUTH: 'vf_admin_auth',
} as const;

// ─── Auth ────────────────────────────────────────────────────────────────────

export const ADMIN_CREDENTIALS = {
  username: 'admin',
  password: 'vetrifabs@2024',
};

export function adminLogin(username: string, password: string): boolean {
  if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
    if (typeof window !== 'undefined') {
      localStorage.setItem(KEYS.AUTH, JSON.stringify({ loggedIn: true, at: Date.now() }));
    }
    return true;
  }
  return false;
}

export function adminLogout(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(KEYS.AUTH);
  }
}

export function isAdminLoggedIn(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    const raw = localStorage.getItem(KEYS.AUTH);
    if (!raw) return false;
    const { loggedIn } = JSON.parse(raw);
    return !!loggedIn;
  } catch {
    return false;
  }
}

// ─── Products ─────────────────────────────────────────────────────────────────

export function getAdminProducts(): Product[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(KEYS.PRODUCTS);
    if (raw) return JSON.parse(raw) as Product[];
  } catch {}
  return [];
}

export function initProductsIfEmpty(): void {
  if (typeof window === 'undefined') return;
  if (!localStorage.getItem(KEYS.PRODUCTS)) {
    const seed = getAllProducts();
    localStorage.setItem(KEYS.PRODUCTS, JSON.stringify(seed));
  }
}

export function saveAdminProducts(products: Product[]): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem(KEYS.PRODUCTS, JSON.stringify(products));
  }
}

export function addAdminProduct(product: Product): void {
  const products = getAdminProducts();
  products.unshift(product);
  saveAdminProducts(products);
}

export function updateAdminProduct(updated: Product): void {
  const products = getAdminProducts().map((p) => (p.id === updated.id ? updated : p));
  saveAdminProducts(products);
}

export function deleteAdminProduct(id: string): void {
  const products = getAdminProducts().filter((p) => p.id !== id);
  saveAdminProducts(products);
}

// ─── Gallery ──────────────────────────────────────────────────────────────────

export function getAdminGallery(): GalleryItem[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(KEYS.GALLERY);
    if (raw) return JSON.parse(raw) as GalleryItem[];
  } catch {}
  return [];
}

export function initGalleryIfEmpty(): void {
  if (typeof window === 'undefined') return;
  if (!localStorage.getItem(KEYS.GALLERY)) {
    localStorage.setItem(KEYS.GALLERY, JSON.stringify(GALLERY_ITEMS));
  }
}

export function saveAdminGallery(items: GalleryItem[]): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem(KEYS.GALLERY, JSON.stringify(items));
  }
}

export function addAdminGalleryItem(item: GalleryItem): void {
  const items = getAdminGallery();
  items.unshift(item);
  saveAdminGallery(items);
}

export function updateAdminGalleryItem(updated: GalleryItem): void {
  const items = getAdminGallery().map((g) => (g.id === updated.id ? updated : g));
  saveAdminGallery(items);
}

export function deleteAdminGalleryItem(id: string): void {
  const items = getAdminGallery().filter((g) => g.id !== id);
  saveAdminGallery(items);
}

// ─── Categories ───────────────────────────────────────────────────────────────

export function getAdminCategories(): Category[] {
  if (typeof window === 'undefined') return CATEGORIES;
  try {
    const raw = localStorage.getItem(KEYS.CATEGORIES);
    if (raw) return JSON.parse(raw) as Category[];
  } catch {}
  return CATEGORIES;
}

export function initCategoriesIfEmpty(): void {
  if (typeof window === 'undefined') return;
  if (!localStorage.getItem(KEYS.CATEGORIES)) {
    localStorage.setItem(KEYS.CATEGORIES, JSON.stringify(CATEGORIES));
  }
}
