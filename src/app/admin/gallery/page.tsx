'use client';

import React, { useEffect, useState, useCallback, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Plus, Pencil, Trash2, Search, X, Check, Loader2, Image as ImageIcon, AlertTriangle, ChevronDown } from 'lucide-react';
import {
  getAdminGallery, initGalleryIfEmpty, addAdminGalleryItem,
  updateAdminGalleryItem, deleteAdminGalleryItem
} from '@/lib/adminStore';
import type { GalleryItem } from '@/types';

// ─── Helpers ──────────────────────────────────────────────────────────────────

const GALLERY_CATEGORIES: GalleryItem['category'][] = ['Food Trucks', 'Food Carts', 'Food Vans', 'Stainless Steel'];

function genId() {
  return 'gal-' + Date.now() + '-' + Math.random().toString(36).slice(2, 6);
}

const EMPTY_ITEM: Omit<GalleryItem, 'id'> = {
  title: '',
  category: 'Food Trucks',
  image_url: '',
  description: '',
  tag: '',
};

// ─── Gallery Form Modal ───────────────────────────────────────────────────────

interface FormModalProps {
  item: GalleryItem | null;
  onClose: () => void;
  onSave: (g: GalleryItem) => void;
}

function GalleryFormModal({ item, onClose, onSave }: FormModalProps) {
  const isEdit = !!item;
  const [form, setForm] = useState<Omit<GalleryItem, 'id'>>(() => item ? { ...item } : { ...EMPTY_ITEM });
  const [saving, setSaving] = useState(false);
  const [preview, setPreview] = useState(item?.image_url ?? '');

  const set = (key: keyof typeof form, val: string) => setForm((prev) => ({ ...prev, [key]: val }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    await new Promise((r) => setTimeout(r, 350));
    const saved: GalleryItem = {
      id: item?.id ?? genId(),
      ...form,
    };
    onSave(saved);
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
    textTransform: 'uppercase' as const,
    color: 'rgba(167,243,208,0.75)',
    marginBottom: 6,
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(8px)' }}>
      <div className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl" style={{ background: 'linear-gradient(135deg, #0d2015 0%, #071009 100%)', border: '1px solid rgba(22,128,60,0.35)', boxShadow: '0 32px 80px rgba(0,0,0,0.7)' }}>
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 border-b" style={{ borderColor: 'rgba(22,128,60,0.2)', background: 'rgba(7,16,9,0.95)', backdropFilter: 'blur(12px)' }}>
          <h2 className="text-lg font-bold text-white">{isEdit ? 'Edit Gallery Item' : 'Add Gallery Image'}</h2>
          <button onClick={onClose} className="w-8 h-8 rounded-lg flex items-center justify-center text-white/60 hover:text-white" style={{ background: 'rgba(255,255,255,0.06)' }}>
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Image Preview */}
          <div className="aspect-video rounded-xl overflow-hidden relative" style={{ background: 'rgba(22,128,60,0.08)', border: '1px solid rgba(22,128,60,0.2)' }}>
            {preview ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={preview} alt="Preview" className="w-full h-full object-cover" onError={() => setPreview('')} />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center gap-2">
                <ImageIcon className="w-10 h-10" style={{ color: 'rgba(22,128,60,0.3)' }} />
                <p className="text-xs" style={{ color: 'rgba(167,243,208,0.3)' }}>Image preview</p>
              </div>
            )}
          </div>

          {/* Title */}
          <div>
            <label style={labelStyle}>Title *</label>
            <input style={inputStyle} value={form.title} onChange={(e) => set('title', e.target.value)} placeholder="e.g. Peace Point Food Truck Night Shot" required />
          </div>

          {/* Image URL */}
          <div>
            <label style={labelStyle}>Image URL *</label>
            <input
              style={inputStyle}
              value={form.image_url}
              onChange={(e) => { set('image_url', e.target.value); setPreview(e.target.value); }}
              placeholder="/images/gallery/... or https://..."
              required
            />
          </div>

          {/* Category */}
          <div>
            <label style={labelStyle}>Category *</label>
            <div className="relative">
              <select style={{ ...inputStyle, appearance: 'none', paddingRight: 36 }} value={form.category} onChange={(e) => set('category', e.target.value as GalleryItem['category'])}>
                {GALLERY_CATEGORIES.map((c) => (
                  <option key={c} value={c} style={{ background: '#0d2015' }}>{c}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none" style={{ color: 'rgba(167,243,208,0.5)' }} />
            </div>
          </div>

          {/* Tag */}
          <div>
            <label style={labelStyle}>Tag</label>
            <input style={inputStyle} value={form.tag} onChange={(e) => set('tag', e.target.value)} placeholder="e.g. Tata Ace, Neon Kiosk, SS Equipment" />
          </div>

          {/* Description */}
          <div>
            <label style={labelStyle}>Description</label>
            <textarea
              style={{ ...inputStyle, resize: 'vertical', minHeight: 80 }}
              value={form.description}
              onChange={(e) => set('description', e.target.value)}
              placeholder="Brief description of this image..."
            />
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose} className="flex-1 py-3 rounded-xl text-sm font-bold" style={{ background: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.6)', border: '1px solid rgba(255,255,255,0.1)' }}>
              Cancel
            </button>
            <button type="submit" disabled={saving} className="flex-1 py-3 rounded-xl text-sm font-bold text-white flex items-center justify-center gap-2" style={{ background: saving ? 'rgba(22,128,60,0.4)' : 'linear-gradient(135deg, #16803C, #0f5c2b)', boxShadow: saving ? 'none' : '0 6px 20px rgba(22,128,60,0.4)' }}>
              {saving ? <><Loader2 className="w-4 h-4 animate-spin" /> Saving...</> : <><Check className="w-4 h-4" /> {isEdit ? 'Save Changes' : 'Add Image'}</>}
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
        <h3 className="text-lg font-bold text-white mb-2">Delete Image?</h3>
        <p className="text-sm mb-6" style={{ color: 'rgba(255,255,255,0.6)' }}>
          &ldquo;<strong className="text-white">{name}</strong>&rdquo; will be removed from the gallery.
        </p>
        <div className="flex gap-3">
          <button onClick={onCancel} className="flex-1 py-2.5 rounded-xl text-sm font-bold" style={{ background: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.7)', border: '1px solid rgba(255,255,255,0.1)' }}>Cancel</button>
          <button onClick={onConfirm} className="flex-1 py-2.5 rounded-xl text-sm font-bold text-white" style={{ background: 'linear-gradient(135deg, #ef4444, #b91c1c)' }}>Yes, Delete</button>
        </div>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

function AdminGalleryContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [search, setSearch] = useState('');
  const [catFilter, setCatFilter] = useState<string>('All');
  const [editingItem, setEditingItem] = useState<GalleryItem | null | undefined>(undefined);
  const [deletingItem, setDeletingItem] = useState<GalleryItem | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    initGalleryIfEmpty();
    setGallery(getAdminGallery());
    setMounted(true);
    if (searchParams.get('action') === 'new') {
      setEditingItem(null);
      router.replace('/admin/gallery');
    }
  }, [searchParams, router]);

  const refresh = useCallback(() => setGallery(getAdminGallery()), []);

  const handleSave = (g: GalleryItem) => {
    if (editingItem?.id) {
      updateAdminGalleryItem(g);
    } else {
      addAdminGalleryItem(g);
    }
    refresh();
    setEditingItem(undefined);
  };

  const handleDelete = (g: GalleryItem) => {
    deleteAdminGalleryItem(g.id);
    refresh();
    setDeletingItem(null);
  };

  const allCats = ['All', ...GALLERY_CATEGORIES];

  const filtered = gallery.filter((g) => {
    const matchesSearch = !search || g.title.toLowerCase().includes(search.toLowerCase()) || g.tag.toLowerCase().includes(search.toLowerCase());
    const matchesCat = catFilter === 'All' || g.category === catFilter;
    return matchesSearch && matchesCat;
  });

  if (!mounted) return null;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white">Gallery</h1>
          <p className="text-sm mt-0.5" style={{ color: 'rgba(167,243,208,0.55)' }}>{gallery.length} images in gallery</p>
        </div>
        <button
          onClick={() => setEditingItem(null)}
          id="add-gallery-btn"
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white transition-all"
          style={{ background: 'linear-gradient(135deg, #16803C, #0f5c2b)', boxShadow: '0 4px 16px rgba(22,128,60,0.4)' }}
        >
          <Plus className="w-4 h-4" /> Add Image
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: 'rgba(167,243,208,0.4)' }} />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search gallery by title or tag..."
            className="w-full pl-11 pr-4 py-3 rounded-xl text-sm text-white placeholder-white/30 outline-none"
            style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(22,128,60,0.25)' }}
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {allCats.map((cat) => (
            <button
              key={cat}
              onClick={() => setCatFilter(cat)}
              className="px-4 py-2.5 rounded-xl text-xs font-bold transition-all"
              style={{
                background: catFilter === cat ? 'rgba(22,128,60,0.35)' : 'rgba(255,255,255,0.04)',
                color: catFilter === cat ? '#4ade80' : 'rgba(255,255,255,0.5)',
                border: catFilter === cat ? '1px solid rgba(22,128,60,0.5)' : '1px solid rgba(255,255,255,0.08)',
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Gallery Masonry Grid */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <ImageIcon className="w-14 h-14 mb-4" style={{ color: 'rgba(22,128,60,0.4)' }} />
          <p className="text-lg font-bold text-white">No gallery images found</p>
          <p className="text-sm mt-1" style={{ color: 'rgba(167,243,208,0.4)' }}>
            {search ? 'Try a different search term' : 'Add your first gallery image to get started'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-3">
          {filtered.map((g) => (
            <div
              key={g.id}
              className="rounded-xl overflow-hidden group relative"
              style={{ background: 'rgba(22,128,60,0.05)', border: '1px solid rgba(22,128,60,0.15)' }}
            >
              {/* Image */}
              <div className="aspect-square relative overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={g.image_url}
                  alt={g.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                {/* Overlay */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-between p-3" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.85), rgba(0,0,0,0.2) 60%, transparent)' }}>
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => setEditingItem(g)}
                      className="w-8 h-8 rounded-lg flex items-center justify-center transition-all"
                      style={{ background: 'rgba(22,128,60,0.85)', color: 'white' }}
                    >
                      <Pencil className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => setDeletingItem(g)}
                      className="w-8 h-8 rounded-lg flex items-center justify-center transition-all"
                      style={{ background: 'rgba(239,68,68,0.85)', color: 'white' }}
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <div>
                    <span className="inline-block px-2 py-0.5 rounded-full text-[9px] font-bold mb-1.5" style={{ background: 'rgba(22,128,60,0.8)', color: '#fff' }}>{g.tag || g.category}</span>
                    <p className="text-xs font-semibold text-white leading-tight line-clamp-2">{g.title}</p>
                  </div>
                </div>
              </div>

              {/* Info (below image) */}
              <div className="px-3 py-2.5">
                <p className="text-xs font-bold text-white leading-tight truncate">{g.title}</p>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-[10px] font-semibold" style={{ color: '#4ade80' }}>{g.category}</span>
                  {g.tag && <span className="text-[10px]" style={{ color: 'rgba(255,255,255,0.35)' }}>{g.tag}</span>}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modals */}
      {editingItem !== undefined && (
        <GalleryFormModal
          item={editingItem}
          onClose={() => setEditingItem(undefined)}
          onSave={handleSave}
        />
      )}
      {deletingItem && (
        <DeleteConfirm
          name={deletingItem.title}
          onConfirm={() => handleDelete(deletingItem)}
          onCancel={() => setDeletingItem(null)}
        />
      )}
    </div>
  );
}

export default function AdminGalleryPage() {
  return (
    <Suspense>
      <AdminGalleryContent />
    </Suspense>
  );
}
