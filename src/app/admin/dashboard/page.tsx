'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Package, Image as GalleryIcon, Tag, TrendingUp, Eye, ArrowRight, Star } from 'lucide-react';
import { getAdminProducts, getAdminGallery, initProductsIfEmpty, initGalleryIfEmpty, initCategoriesIfEmpty, getAdminCategories } from '@/lib/adminStore';
import type { Product, GalleryItem } from '@/types';

interface StatCardProps {
  label: string;
  value: number | string;
  icon: React.ReactNode;
  color: string;
  href: string;
}

function StatCard({ label, value, icon, color, href }: StatCardProps) {
  return (
    <Link
      href={href}
      className="group relative rounded-2xl p-6 transition-all duration-300 overflow-hidden"
      style={{
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(22,128,60,0.2)',
        backdropFilter: 'blur(12px)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.border = `1px solid ${color}55`;
        e.currentTarget.style.boxShadow = `0 0 30px ${color}22`;
        e.currentTarget.style.transform = 'translateY(-3px)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.border = '1px solid rgba(22,128,60,0.2)';
        e.currentTarget.style.boxShadow = 'none';
        e.currentTarget.style.transform = 'none';
      }}
    >
      <div className="absolute top-3 right-3 w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${color}22`, color }}>
        {icon}
      </div>
      <p className="text-3xl font-extrabold text-white mt-2">{value}</p>
      <p className="text-sm font-medium mt-1" style={{ color: 'rgba(167,243,208,0.6)' }}>{label}</p>
      <div className="mt-3 flex items-center gap-1 text-xs font-semibold" style={{ color }}>
        Manage <ArrowRight className="w-3 h-3" />
      </div>
    </Link>
  );
}

export default function AdminDashboardPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    initProductsIfEmpty();
    initGalleryIfEmpty();
    initCategoriesIfEmpty();
    setProducts(getAdminProducts());
    setGallery(getAdminGallery());
    setMounted(true);
  }, []);

  const categories = getAdminCategories();
  const featured = products.filter((p) => p.featured || p.is_featured);
  const published = products.filter((p) => p.publication_status === 'published' || p.is_published);

  if (!mounted) return null;

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div
        className="rounded-2xl p-6 sm:p-8"
        style={{
          background: 'linear-gradient(135deg, rgba(22,128,60,0.2) 0%, rgba(11,61,36,0.3) 100%)',
          border: '1px solid rgba(22,128,60,0.3)',
          boxShadow: '0 0 40px rgba(22,128,60,0.1)',
        }}
      >
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
              Welcome back, Admin 👋
            </h1>
            <p className="mt-1 text-sm" style={{ color: 'rgba(167,243,208,0.7)' }}>
              Manage your Vetri Fabs India product catalogue and gallery from here.
            </p>
          </div>
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white transition-all"
            style={{ background: 'rgba(22,128,60,0.4)', border: '1px solid rgba(22,128,60,0.5)' }}
          >
            <Eye className="w-4 h-4" /> View Live Site
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Products" value={products.length} icon={<Package className="w-5 h-5" />} color="#4ade80" href="/admin/products" />
        <StatCard label="Published" value={published.length} icon={<TrendingUp className="w-5 h-5" />} color="#34d399" href="/admin/products" />
        <StatCard label="Gallery Images" value={gallery.length} icon={<GalleryIcon className="w-5 h-5" />} color="#6ee7b7" href="/admin/gallery" />
        <StatCard label="Categories" value={categories.length} icon={<Tag className="w-5 h-5" />} color="#a7f3d0" href="/admin/products" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Products */}
        <div
          className="rounded-2xl p-6"
          style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(22,128,60,0.15)' }}
        >
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-base font-bold text-white">Recent Products</h3>
            <Link href="/admin/products" className="text-xs font-semibold flex items-center gap-1" style={{ color: '#4ade80' }}>
              View all <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="space-y-3">
            {products.slice(0, 5).map((p) => (
              <div key={p.id} className="flex items-center gap-3 p-3 rounded-xl" style={{ background: 'rgba(255,255,255,0.04)' }}>
                <div className="w-10 h-10 rounded-lg overflow-hidden shrink-0" style={{ background: 'rgba(22,128,60,0.2)' }}>
                  {p.primary_image || p.image_url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={p.primary_image || p.image_url} alt={p.name} className="w-full h-full object-cover" />
                  ) : (
                    <Package className="w-5 h-5 m-2.5" style={{ color: '#4ade80' }} />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-white truncate">{p.name}</p>
                  <p className="text-xs" style={{ color: 'rgba(167,243,208,0.5)' }}>{p.category_name}</p>
                </div>
                <div className="flex items-center gap-2">
                  {(p.featured || p.is_featured) && <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />}
                  <span
                    className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                    style={{
                      background: (p.publication_status === 'published' || p.is_published) ? 'rgba(22,128,60,0.3)' : 'rgba(239,68,68,0.2)',
                      color: (p.publication_status === 'published' || p.is_published) ? '#4ade80' : '#fca5a5',
                    }}
                  >
                    {(p.publication_status === 'published' || p.is_published) ? 'Live' : 'Draft'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Gallery */}
        <div
          className="rounded-2xl p-6"
          style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(22,128,60,0.15)' }}
        >
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-base font-bold text-white">Gallery Overview</h3>
            <Link href="/admin/gallery" className="text-xs font-semibold flex items-center gap-1" style={{ color: '#4ade80' }}>
              Manage <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {gallery.slice(0, 6).map((g) => (
              <div key={g.id} className="aspect-square rounded-xl overflow-hidden relative group" style={{ background: 'rgba(22,128,60,0.1)' }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={g.image_url} alt={g.title} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-1.5" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.7), transparent)' }}>
                  <p className="text-[9px] font-semibold text-white leading-tight line-clamp-2">{g.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Link
          href="/admin/products?action=new"
          className="flex items-center gap-4 p-5 rounded-2xl transition-all duration-200"
          style={{ background: 'linear-gradient(135deg, rgba(22,128,60,0.15), rgba(22,128,60,0.05))', border: '1px solid rgba(22,128,60,0.25)' }}
          onMouseEnter={(e) => { e.currentTarget.style.boxShadow = '0 0 30px rgba(22,128,60,0.2)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.transform = 'none'; }}
        >
          <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: 'rgba(22,128,60,0.3)' }}>
            <Package className="w-6 h-6 text-emerald-400" />
          </div>
          <div>
            <p className="font-bold text-white text-sm">Add New Product</p>
            <p className="text-xs mt-0.5" style={{ color: 'rgba(167,243,208,0.5)' }}>Create a new product listing</p>
          </div>
          <ArrowRight className="w-4 h-4 ml-auto" style={{ color: '#4ade80' }} />
        </Link>

        <Link
          href="/admin/gallery?action=new"
          className="flex items-center gap-4 p-5 rounded-2xl transition-all duration-200"
          style={{ background: 'linear-gradient(135deg, rgba(22,128,60,0.15), rgba(22,128,60,0.05))', border: '1px solid rgba(22,128,60,0.25)' }}
          onMouseEnter={(e) => { e.currentTarget.style.boxShadow = '0 0 30px rgba(22,128,60,0.2)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.transform = 'none'; }}
        >
          <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: 'rgba(22,128,60,0.3)' }}>
            <GalleryIcon className="w-6 h-6 text-emerald-400" />
          </div>
          <div>
            <p className="font-bold text-white text-sm">Add Gallery Image</p>
            <p className="text-xs mt-0.5" style={{ color: 'rgba(167,243,208,0.5)' }}>Upload a new gallery photo</p>
          </div>
          <ArrowRight className="w-4 h-4 ml-auto" style={{ color: '#4ade80' }} />
        </Link>
      </div>
    </div>
  );
}
