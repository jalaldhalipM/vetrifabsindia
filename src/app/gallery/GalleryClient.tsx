'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Eye, MessageSquare, Maximize2, X, Tag } from 'lucide-react';
import { GALLERY_ITEMS } from '@/data/gallery';
import { GalleryItem } from '@/types';
import { getWhatsAppEnquiryUrl } from '@/data/company';
import { getAdminGallery, initGalleryIfEmpty } from '@/lib/adminStore';

const CATEGORIES = ['All', 'Food Trucks', 'Food Carts', 'Food Vans', 'Stainless Steel'] as const;

export default function GalleryClient() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [lightboxItem, setLightboxItem] = useState<GalleryItem | null>(null);
  const [items, setItems] = useState<GalleryItem[]>(GALLERY_ITEMS);

  useEffect(() => {
    initGalleryIfEmpty();
    const stored = getAdminGallery();
    if (stored.length > 0) setItems(stored);
  }, []);

  const filteredItems = selectedCategory === 'All'
    ? items
    : items.filter((item) => item.category === selectedCategory);

  return (
    <div>
      {/* Category Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
              selectedCategory === cat
                ? 'bg-[#16803C] text-white shadow-sm'
                : 'bg-white text-[#202923] hover:bg-[#EAF5EC] border border-gray-200'
            }`}
          >
            {cat} {cat === 'All' ? `(${items.length})` : `(${items.filter((i) => i.category === cat).length})`}
          </button>
        ))}
      </div>

      {/* Grid of Authentic Photographs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="group bg-white rounded-2xl overflow-hidden border border-gray-200/90 hover:border-[#16803C]/50 hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              {/* Photo Frame */}
              <div
                onClick={() => setLightboxItem(item)}
                className="relative aspect-[4/3] w-full bg-gray-950 overflow-hidden cursor-pointer"
              >
                <Image
                  src={item.image_url}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="bg-white/95 text-[#0B3D24] font-semibold text-xs px-3.5 py-1.5 rounded-lg shadow-md flex items-center gap-1.5 backdrop-blur-xs">
                    <Maximize2 className="w-3.5 h-3.5 text-[#16803C]" />
                    <span>Zoom Photo</span>
                  </span>
                </div>

                {/* Category Pill */}
                <span className="absolute top-3 left-3 bg-[#0B3D24]/90 text-white text-[11px] font-semibold px-2.5 py-1 rounded-md backdrop-blur-xs shadow-xs">
                  {item.category}
                </span>

                {/* Vehicle Tag */}
                <span className="absolute top-3 right-3 bg-white/90 text-[#0B3D24] text-[10px] font-bold px-2 py-0.5 rounded shadow-xs backdrop-blur-xs flex items-center gap-1">
                  <Tag className="w-2.5 h-2.5 text-[#16803C]" />
                  <span>{item.tag}</span>
                </span>
              </div>

              {/* Caption & Description */}
              <div className="p-5">
                <h3
                  onClick={() => setLightboxItem(item)}
                  className="text-base font-bold text-[#0B3D24] mb-2 leading-snug hover:text-[#16803C] transition-colors cursor-pointer"
                >
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#66716A] leading-relaxed line-clamp-3">
                  {item.description}
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="px-5 pb-5 pt-1 flex items-center gap-2">
              <button
                type="button"
                onClick={() => setLightboxItem(item)}
                className="flex-1 py-2 px-3 bg-[#F7F9F7] hover:bg-[#EAF5EC] text-[#0B3D24] rounded-xl text-xs font-semibold transition-colors border border-gray-200 hover:border-[#16803C]/40 flex items-center justify-center gap-1 cursor-pointer"
              >
                <Eye className="w-3.5 h-3.5 text-[#16803C]" />
                <span>View Full Size</span>
              </button>

              <a
                href={getWhatsAppEnquiryUrl(`Project Photo: ${item.title}`)}
                target="_blank"
                rel="noopener noreferrer"
                className="py-2 px-3 bg-[#16803C] hover:bg-[#0B3D24] text-white rounded-xl text-xs font-semibold transition-colors shadow-2xs hover:shadow flex items-center justify-center gap-1.5 cursor-pointer active:scale-95"
                title="Enquire about this model"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Enquire</span>
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {lightboxItem && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/95 flex flex-col justify-between p-4 sm:p-8 animate-in fade-in duration-200"
          onClick={() => setLightboxItem(null)}
        >
          {/* Top Bar */}
          <div className="flex items-center justify-between text-white z-10">
            <div>
              <span className="text-xs text-emerald-400 font-semibold uppercase tracking-wider block">
                {lightboxItem.category} • {lightboxItem.tag}
              </span>
              <h4 className="text-base sm:text-lg font-bold">
                {lightboxItem.title}
              </h4>
            </div>

            <button
              type="button"
              onClick={() => setLightboxItem(null)}
              aria-label="Close"
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Full Image */}
          <div
            className="relative flex-1 w-full max-w-5xl mx-auto flex items-center justify-center my-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full h-[65vh] sm:h-[75vh]">
              <Image
                src={lightboxItem.image_url}
                alt={lightboxItem.title}
                fill
                sizes="100vw"
                className="object-contain"
                priority
              />
            </div>
          </div>

          {/* Bottom Bar */}
          <div
            className="text-white max-w-3xl mx-auto text-center z-10 pb-2"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="text-xs sm:text-sm text-gray-300 mb-3">
              {lightboxItem.description}
            </p>
            <a
              href={getWhatsAppEnquiryUrl(`Project Photo: ${lightboxItem.title}`)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#16803C] hover:bg-[#0B3D24] text-white text-xs font-bold rounded-xl transition-all shadow-md"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Enquire About Fabricating This Model</span>
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
