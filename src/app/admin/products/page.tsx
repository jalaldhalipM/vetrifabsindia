'use client';

import React, { useEffect, useState, useCallback, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import {
  Plus, Pencil, Trash2, Search, Star, X, Check, Loader2,
  Package, AlertTriangle, ChevronDown
} from 'lucide-react';
import {
  getAdminProducts, saveAdminProducts, initProductsIfEmpty,
  addAdminProduct, updateAdminProduct, deleteAdminProduct, getAdminCategories
} from '@/lib/adminStore';
import type { Product } from '@/types';

// ─── Helpers ──────────────────────────────────────────────────────────────────

function genId() {
  return 'prod-' + Date.now() + '-' + Math.random().toString(36).slice(2, 7);
}
function genSlug(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}
function genSku(name: string) {
  return 'VF-' + name.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 8) + '-' + Date.now().toString().slice(-4);
}
const now = () => new Date().toISOString();

const EMPTY_PRODUCT: Omit<Product, 'id' | 'created_at' | 'updated_at'> = {
  name: '',
  title: '',
  slug: '',
  category_id: '',
  category_name: '',
  category_slug: '',
  short_description: '',
  full_description: '',
  primary_image: '',
  image_url: '',
  gallery_images: [],
  gallery_urls: [],
  pricing_type: 'quotation',
  price: null,
  starting_price: null,
  unit: null,
  sku: '',
  specifications: [],
  features: [],
  featured: false,
  is_featured: false,
  publication_status: 'published',
  is_published: true,
  availability_status: 'made_to_order',
  seo_title: '',
  seo_description: '',
};

// ─── Product Form Modal ───────────────────────────────────────────────────────

interface FormModalProps {
  product: Product | null;
  onClose: () => void;
  onSave: (p: Product) => void;
}

function ProductFormModal({ product, onClose, onSave }: FormModalProps) {
  const categories = getAdminCategories();
  const isEdit = !!product;

  const [form, setForm] = useState<Omit<Product, 'id' | 'created_at' | 'updated_at'>>(() =>
    product ? { ...product } : { ...EMPTY_PRODUCT }
  );
  const [specInput, setSpecInput] = useState('');
  const [featInput, setFeatInput] = useState('');
  const [saving, setSaving] = useState(false);

  const set = (key: keyof typeof form, val: unknown) => setForm((prev) => ({ ...prev, [key]: val }));

  const handleCategoryChange = (catId: string) => {
    const cat = categories.find((c) => c.id === catId);
    if (cat) {
      set('category_id', cat.id);
      set('category_name', cat.name);
      set('category_slug', cat.slug);
    }
  };

  const addSpec = () => {
    const [label, ...rest] = specInput.split(':');
    if (label && rest.length) {
      set('specifications', [...form.specifications, { label: label.trim(), value: rest.join(':').trim() }]);
      setSpecInput('');
    }
  };

  const addFeature = () => {
    if (featInput.trim()) {
      set('features', [...form.features, featInput.trim()]);
      setFeatInput('');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    await new Promise((r) => setTimeout(r, 400));

    const slug = form.slug || genSlug(form.name);
    const sku = form.sku || genSku(form.name);
    const savedProduct: Product = {
      ...form,
      id: product?.id ?? genId(),
      title: form.name,
      image_url: form.primary_image,
      is_featured: form.featured,
      is_published: form.publication_status === 'published',
      slug,
      sku,
      created_at: product?.created_at ?? now(),
      updated_at: now(),
    };

    onSave(savedProduct);
    setSaving(false);
  };

  const inputStyle: React.CSSProperties = {
    background: 'rgba(255,255,255,0.06)',
    border: '1px solid rgba(22,128,60,0.3)',
    color: 'white',
    borderRadius: 10,
    padding: '10px 14px',
    fontSize: 13,
    width: '100%',
    outline: 'none',
  };
  const labelStyle: React.CSSProperties = {
    display: 'block',
    fontSize: 11,
    fontWeight: 600,
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    color: 'rgba(167,243,208,0.75)',
    marginBottom: 6,
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(8px)' }}
    >
      <div
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl"
        style={{
          background: 'linear-gradient(135deg, #0d2015 0%, #071009 100%)',
          border: '1px solid rgba(22,128,60,0.35)',
          boxShadow: '0 32px 80px rgba(0,0,0,0.7)',
        }}
      >
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 border-b" style={{ borderColor: 'rgba(22,128,60,0.2)', background: 'rgba(7,16,9,0.95)', backdropFilter: 'blur(12px)' }}>
          <h2 className="text-lg font-bold text-white">{isEdit ? 'Edit Product' : 'Add New Product'}</h2>
          <button onClick={onClose} className="w-8 h-8 rounded-lg flex items-center justify-center text-white/60 hover:text-white" style={{ background: 'rgba(255,255,255,0.06)' }}>
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Name */}
          <div>
            <label style={labelStyle}>Product Name *</label>
            <input style={inputStyle} value={form.name} onChange={(e) => set('name', e.target.value)} placeholder="e.g. Tata Ace Commercial Food Truck" required />
          </div>

          {/* Category */}
          <div>
            <label style={labelStyle}>Category *</label>
            <div className="relative">
              <select
                style={{ ...inputStyle, appearance: 'none', paddingRight: 36 }}
                value={form.category_id}
                onChange={(e) => handleCategoryChange(e.target.value)}
                required
              >
                <option value="">Select category...</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id} style={{ background: '#0d2015' }}>{c.name}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none" style={{ color: 'rgba(167,243,208,0.5)' }} />
            </div>
          </div>

          {/* Short Desc */}
          <div>
            <label style={labelStyle}>Short Description *</label>
            <textarea
              style={{ ...inputStyle, resize: 'vertical', minHeight: 70 }}
              value={form.short_description}
              onChange={(e) => set('short_description', e.target.value)}
              placeholder="Brief one-liner shown in product cards..."
              required
            />
          </div>

          {/* Full Desc */}
          <div>
            <label style={labelStyle}>Full Description</label>
            <textarea
              style={{ ...inputStyle, resize: 'vertical', minHeight: 100 }}
              value={form.full_description}
              onChange={(e) => set('full_description', e.target.value)}
              placeholder="Detailed product description..."
            />
          </div>

          {/* Primary Image URL */}
          <div>
            <label style={labelStyle}>Primary Image URL *</label>
            <input style={inputStyle} value={form.primary_image} onChange={(e) => { set('primary_image', e.target.value); set('image_url', e.target.value); }} placeholder="/images/products/... or https://..." required />
          </div>

          {/* Pricing */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label style={labelStyle}>Pricing Type</label>
              <div className="relative">
                <select style={{ ...inputStyle, appearance: 'none', paddingRight: 36 }} value={form.pricing_type} onChange={(e) => set('pricing_type', e.target.value as typeof form.pricing_type)}>
                  <option value="quotation" style={{ background: '#0d2015' }}>On Enquiry</option>
                  <option value="starting" style={{ background: '#0d2015' }}>Starting From</option>
                  <option value="fixed" style={{ background: '#0d2015' }}>Fixed Price</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none" style={{ color: 'rgba(167,243,208,0.5)' }} />
              </div>
            </div>
            {form.pricing_type !== 'quotation' && (
              <div>
                <label style={labelStyle}>Price (₹)</label>
                <input style={inputStyle} type="number" value={form.pricing_type === 'starting' ? (form.starting_price ?? '') : (form.price ?? '')} onChange={(e) => { const v = Number(e.target.value); if (form.pricing_type === 'starting') set('starting_price', v); else set('price', v); }} placeholder="e.g. 350000" />
              </div>
            )}
          </div>

          {/* Availability + Status + Featured */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label style={labelStyle}>Availability</label>
              <div className="relative">
                <select style={{ ...inputStyle, appearance: 'none', paddingRight: 36 }} value={form.availability_status} onChange={(e) => set('availability_status', e.target.value as typeof form.availability_status)}>
                  <option value="made_to_order" style={{ background: '#0d2015' }}>Made to Order</option>
                  <option value="in_stock" style={{ background: '#0d2015' }}>In Stock</option>
                  <option value="custom_fabrication" style={{ background: '#0d2015' }}>Custom Fabrication</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none" style={{ color: 'rgba(167,243,208,0.5)' }} />
              </div>
            </div>
            <div>
              <label style={labelStyle}>Status</label>
              <div className="relative">
                <select
                  style={{ ...inputStyle, appearance: 'none', paddingRight: 36 }}
                  value={form.publication_status}
                  onChange={(e) => {
                    const v = e.target.value as typeof form.publication_status;
                    set('publication_status', v);
                    set('is_published', v === 'published');
                  }}
                >
                  <option value="published" style={{ background: '#0d2015' }}>Published (Live)</option>
                  <option value="draft" style={{ background: '#0d2015' }}>Draft (Hidden)</option>
                  <option value="archived" style={{ background: '#0d2015' }}>Archived</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none" style={{ color: 'rgba(167,243,208,0.5)' }} />
              </div>
            </div>
          </div>

          {/* Featured Toggle */}
          <div>
            <label className="flex items-center gap-3 cursor-pointer">
              <div
                className="relative w-11 h-6 rounded-full transition-colors"
                style={{ background: form.featured ? '#16803C' : 'rgba(255,255,255,0.1)' }}
                onClick={() => { set('featured', !form.featured); set('is_featured', !form.is_featured); }}
              >
                <div className="absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform" style={{ transform: form.featured ? 'translateX(20px)' : 'translateX(0)' }} />
              </div>
              <span className="text-sm font-semibold text-white/80">Feature this product (shown on homepage)</span>
            </label>
          </div>

          {/* Specifications */}
          <div>
            <label style={labelStyle}>Specifications (label: value)</label>
            <div className="space-y-2 mb-2">
              {form.specifications.map((s, i) => (
                <div key={i} className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs" style={{ background: 'rgba(22,128,60,0.12)', border: '1px solid rgba(22,128,60,0.2)' }}>
                  <span className="font-semibold text-emerald-300">{s.label}:</span>
                  <span className="text-white/80">{s.value}</span>
                  <button type="button" onClick={() => set('specifications', form.specifications.filter((_, j) => j !== i))} className="ml-auto text-red-400 hover:text-red-300">
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <input style={{ ...inputStyle, flex: 1 }} value={specInput} onChange={(e) => setSpecInput(e.target.value)} placeholder="Chassis Type: Tata Ace HT" onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addSpec(); } }} />
              <button type="button" onClick={addSpec} className="px-3 rounded-xl text-xs font-bold" style={{ background: 'rgba(22,128,60,0.3)', color: '#4ade80', border: '1px solid rgba(22,128,60,0.4)' }}>Add</button>
            </div>
          </div>

          {/* Features */}
          <div>
            <label style={labelStyle}>Key Features</label>
            <div className="flex flex-wrap gap-2 mb-2">
              {form.features.map((f, i) => (
                <span key={i} className="flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold" style={{ background: 'rgba(22,128,60,0.2)', color: '#4ade80', border: '1px solid rgba(22,128,60,0.3)' }}>
                  {f}
                  <button type="button" onClick={() => set('features', form.features.filter((_, j) => j !== i))}><X className="w-3 h-3" /></button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <input style={{ ...inputStyle, flex: 1 }} value={featInput} onChange={(e) => setFeatInput(e.target.value)} placeholder="LED Lighting" onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addFeature(); } }} />
              <button type="button" onClick={addFeature} className="px-3 rounded-xl text-xs font-bold" style={{ background: 'rgba(22,128,60,0.3)', color: '#4ade80', border: '1px solid rgba(22,128,60,0.4)' }}>Add</button>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2 sticky bottom-0 border-t" style={{ borderColor: 'rgba(22,128,60,0.15)', paddingTop: 16, background: 'rgba(7,16,9,0.9)', backdropFilter: 'blur(8px)' }}>
            <button type="button" onClick={onClose} className="flex-1 py-3 rounded-xl text-sm font-bold transition-all" style={{ background: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.6)', border: '1px solid rgba(255,255,255,0.1)' }}>
              Cancel
            </button>
            <button type="submit" disabled={saving} className="flex-1 py-3 rounded-xl text-sm font-bold text-white flex items-center justify-center gap-2 transition-all" style={{ background: saving ? 'rgba(22,128,60,0.4)' : 'linear-gradient(135deg, #16803C, #0f5c2b)', boxShadow: saving ? 'none' : '0 6px 20px rgba(22,128,60,0.4)' }}>
              {saving ? <><Loader2 className="w-4 h-4 animate-spin" /> Saving...</> : <><Check className="w-4 h-4" /> {isEdit ? 'Save Changes' : 'Add Product'}</>}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ─── Delete Confirm ───────────────────────────────────────────────────────────

function DeleteConfirm({ name, onConfirm, onCancel }: { name: string; onConfirm: () => void; onCancel: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(8px)' }}>
      <div className="w-full max-w-sm rounded-2xl p-6 text-center" style={{ background: 'linear-gradient(135deg, #0d2015, #071009)', border: '1px solid rgba(239,68,68,0.3)', boxShadow: '0 32px 80px rgba(0,0,0,0.6)' }}>
        <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: 'rgba(239,68,68,0.15)' }}>
          <AlertTriangle className="w-7 h-7 text-red-400" />
        </div>
        <h3 className="text-lg font-bold text-white mb-2">Delete Product?</h3>
        <p className="text-sm mb-6" style={{ color: 'rgba(255,255,255,0.6)' }}>
          &ldquo;<strong className="text-white">{name}</strong>&rdquo; will be permanently removed from the catalogue.
        </p>
        <div className="flex gap-3">
          <button onClick={onCancel} className="flex-1 py-2.5 rounded-xl text-sm font-bold" style={{ background: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.7)', border: '1px solid rgba(255,255,255,0.1)' }}>
            Cancel
          </button>
          <button onClick={onConfirm} className="flex-1 py-2.5 rounded-xl text-sm font-bold text-white" style={{ background: 'linear-gradient(135deg, #ef4444, #b91c1c)' }}>
            Yes, Delete
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

function AdminProductsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState('');
  const [editingProduct, setEditingProduct] = useState<Product | null | undefined>(undefined); // undefined = closed
  const [deletingProduct, setDeletingProduct] = useState<Product | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    initProductsIfEmpty();
    setProducts(getAdminProducts());
    setMounted(true);
    if (searchParams.get('action') === 'new') {
      setEditingProduct(null);
      router.replace('/admin/products');
    }
  }, [searchParams, router]);

  const refresh = useCallback(() => setProducts(getAdminProducts()), []);

  const handleSave = (p: Product) => {
    if (editingProduct?.id) {
      updateAdminProduct(p);
    } else {
      addAdminProduct(p);
    }
    refresh();
    setEditingProduct(undefined);
  };

  const handleDelete = (p: Product) => {
    deleteAdminProduct(p.id);
    refresh();
    setDeletingProduct(null);
  };

  const filtered = products.filter((p) => {
    if (!search) return true;
    const q = search.toLowerCase();
    return p.name.toLowerCase().includes(q) || p.category_name.toLowerCase().includes(q) || p.sku.toLowerCase().includes(q);
  });

  if (!mounted) return null;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white">Products</h1>
          <p className="text-sm mt-0.5" style={{ color: 'rgba(167,243,208,0.55)' }}>{products.length} products in catalogue</p>
        </div>
        <button
          onClick={() => setEditingProduct(null)}
          id="add-product-btn"
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white transition-all"
          style={{ background: 'linear-gradient(135deg, #16803C, #0f5c2b)', boxShadow: '0 4px 16px rgba(22,128,60,0.4)' }}
        >
          <Plus className="w-4 h-4" /> Add Product
        </button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: 'rgba(167,243,208,0.4)' }} />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search products by name, category, or SKU..."
          className="w-full pl-11 pr-4 py-3 rounded-xl text-sm text-white placeholder-white/30 outline-none"
          style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(22,128,60,0.25)' }}
        />
      </div>

      {/* Products Grid */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <Package className="w-14 h-14 mb-4" style={{ color: 'rgba(22,128,60,0.4)' }} />
          <p className="text-lg font-bold text-white">No products found</p>
          <p className="text-sm mt-1" style={{ color: 'rgba(167,243,208,0.4)' }}>
            {search ? 'Try a different search term' : 'Add your first product to get started'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map((p) => (
            <div
              key={p.id}
              className="rounded-2xl overflow-hidden group"
              style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(22,128,60,0.15)', transition: 'all 0.2s' }}
              onMouseEnter={(e) => { e.currentTarget.style.border = '1px solid rgba(22,128,60,0.4)'; e.currentTarget.style.boxShadow = '0 8px 30px rgba(22,128,60,0.1)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.border = '1px solid rgba(22,128,60,0.15)'; e.currentTarget.style.boxShadow = 'none'; }}
            >
              {/* Image */}
              <div className="h-44 overflow-hidden relative" style={{ background: 'rgba(22,128,60,0.08)' }}>
                {(p.primary_image || p.image_url) ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={p.primary_image || p.image_url} alt={p.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center"><Package className="w-10 h-10" style={{ color: 'rgba(22,128,60,0.3)' }} /></div>
                )}
                <div className="absolute top-2 right-2 flex gap-1.5">
                  {(p.featured || p.is_featured) && (
                    <span className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold" style={{ background: 'rgba(245,158,11,0.85)', color: '#fff' }}>
                      <Star className="w-2.5 h-2.5 fill-white" /> Featured
                    </span>
                  )}
                  <span
                    className="px-2 py-0.5 rounded-full text-[10px] font-bold"
                    style={{
                      background: (p.publication_status === 'published' || p.is_published) ? 'rgba(22,128,60,0.85)' : 'rgba(239,68,68,0.8)',
                      color: '#fff',
                    }}
                  >
                    {(p.publication_status === 'published' || p.is_published) ? 'Live' : 'Draft'}
                  </span>
                </div>
              </div>

              {/* Info */}
              <div className="p-4">
                <p className="text-xs font-semibold mb-1" style={{ color: '#4ade80' }}>{p.category_name}</p>
                <h3 className="text-sm font-bold text-white leading-snug line-clamp-2">{p.name}</h3>
                <p className="text-xs mt-1.5 line-clamp-2 leading-relaxed" style={{ color: 'rgba(255,255,255,0.45)' }}>{p.short_description}</p>
                <p className="text-[10px] mt-2 font-mono" style={{ color: 'rgba(167,243,208,0.3)' }}>{p.sku}</p>

                {/* Actions */}
                <div className="flex gap-2 mt-4">
                  <button
                    onClick={() => setEditingProduct(p)}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-bold transition-all"
                    style={{ background: 'rgba(22,128,60,0.15)', color: '#4ade80', border: '1px solid rgba(22,128,60,0.3)' }}
                  >
                    <Pencil className="w-3.5 h-3.5" /> Edit
                  </button>
                  <button
                    onClick={() => setDeletingProduct(p)}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-bold transition-all"
                    style={{ background: 'rgba(239,68,68,0.1)', color: '#fca5a5', border: '1px solid rgba(239,68,68,0.2)' }}
                  >
                    <Trash2 className="w-3.5 h-3.5" /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modals */}
      {editingProduct !== undefined && (
        <ProductFormModal
          product={editingProduct}
          onClose={() => setEditingProduct(undefined)}
          onSave={handleSave}
        />
      )}
      {deletingProduct && (
        <DeleteConfirm
          name={deletingProduct.name}
          onConfirm={() => handleDelete(deletingProduct)}
          onCancel={() => setDeletingProduct(null)}
        />
      )}
    </div>
  );
}

export default function AdminProductsPage() {
  return (
    <Suspense>
      <AdminProductsContent />
    </Suspense>
  );
}
