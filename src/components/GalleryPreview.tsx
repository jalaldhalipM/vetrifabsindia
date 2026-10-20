'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { GALLERY_ITEMS } from '@/data/gallery';
import { Camera, ZoomIn, X, ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';


const FILTER_CATEGORIES = [
  'All',
  'Food Trucks',
  'Food Carts',
  'Food Vans',
  'Stainless Steel'
] as const;

export default function GalleryPreview() {
  const [selectedFilter, setSelectedFilter] = useState<string>('All');
  const [activeLightboxIndex, setActiveLightboxIndex] = useState<number | null>(null);

  const filteredItems = selectedFilter === 'All'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter((item) => item.category === selectedFilter);

  const openLightbox = (index: number) => {
    setActiveLightboxIndex(index);
  };

  const closeLightbox = () => {
    setActiveLightboxIndex(null);
  };

  const nextImage = () => {
    if (activeLightboxIndex !== null) {
      setActiveLightboxIndex((activeLightboxIndex + 1) % filteredItems.length);
    }
  };

  const prevImage = () => {
    if (activeLightboxIndex !== null) {
      setActiveLightboxIndex((activeLightboxIndex - 1 + filteredItems.length) % filteredItems.length);
    }
  };

  return (
    <section id="gallery" className="py-16 md:py-24 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EAF5EC] text-[#0B3D24] text-xs font-bold uppercase tracking-wider mb-3">
              <Camera className="w-3.5 h-3.5 text-[#16803C]" />
              <span>Workshop & Field Photography</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0B3D24] tracking-tight">
              Our Products in Focus
            </h2>
            <p className="mt-2 text-base text-[#66716A] max-w-xl">
              Authentic photographs of custom food carts, commercial trucks, mobile vans, and stainless-steel workstations fabricated at Vetri Fabs India.
            </p>
          </div>

          <div className="mt-4 md:mt-0 flex items-center gap-3">
            <span className="text-xs text-[#66716A]">
              Showing <strong className="text-[#0B3D24]">{filteredItems.length}</strong> photos
            </span>
            <Link
              href="/gallery"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#16803C] hover:text-[#0B3D24] bg-[#F7F9F7] hover:bg-[#EAF5EC] px-3.5 py-1.5 rounded-lg border border-gray-200 transition-colors shadow-2xs"
            >
              <span>View Full Gallery Page</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>


        {/* Gallery Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {FILTER_CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedFilter(cat)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer ${
                selectedFilter === cat
                  ? 'bg-[#16803C] text-white shadow-xs'
                  : 'bg-[#F7F9F7] text-[#202923] hover:bg-[#EAF5EC] border border-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Responsive Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {filteredItems.map((item, index) => (
            <div
              key={item.id}
              onClick={() => openLightbox(index)}
              className="group relative aspect-[4/3] rounded-xl overflow-hidden bg-gray-900 border border-gray-200 cursor-pointer shadow-xs hover:shadow-lg transition-all duration-300"
            >
              <Image
                src={item.image_url}
                alt={item.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover object-center group-hover:scale-108 transition-transform duration-500"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-70 group-hover:opacity-90 transition-opacity" />

              {/* Tag Badge */}
              <span className="absolute top-2.5 left-2.5 bg-black/60 backdrop-blur-xs text-white text-[10px] font-medium px-2 py-0.5 rounded border border-white/20">
                {item.tag}
              </span>

              {/* Zoom icon on hover */}
              <div className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full bg-black/60 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <ZoomIn className="w-4 h-4 text-emerald-400" />
              </div>

              {/* Caption */}
              <div className="absolute bottom-2.5 left-2.5 right-2.5 text-white">
                <h4 className="font-bold text-xs sm:text-sm leading-snug line-clamp-1 drop-shadow-sm">
                  {item.title}
                </h4>
                <p className="text-[11px] text-gray-300 line-clamp-1 mt-0.5 drop-shadow-xs">
                  {item.category}
                </p>
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* Lightbox Modal */}
      {activeLightboxIndex !== null && filteredItems[activeLightboxIndex] && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6"
          onClick={closeLightbox}
        >
          <div
            className="relative max-w-4xl w-full bg-gray-950 rounded-2xl overflow-hidden shadow-2xl border border-gray-800 flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Bar with Title and Close */}
            <div className="p-4 bg-gray-900/90 border-b border-gray-800 flex items-center justify-between text-white">
              <div>
                <h3 className="font-bold text-sm sm:text-base">
                  {filteredItems[activeLightboxIndex].title}
                </h3>
                <span className="text-xs text-emerald-400">
                  {filteredItems[activeLightboxIndex].category} • {filteredItems[activeLightboxIndex].tag}
                </span>
              </div>
              <button
                type="button"
                onClick={closeLightbox}
                className="p-1.5 rounded-lg bg-gray-800 text-gray-300 hover:text-white hover:bg-gray-700 transition-colors"
                aria-label="Close Lightbox"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Image Container */}
            <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full bg-black flex items-center justify-center">
              <Image
                src={filteredItems[activeLightboxIndex].image_url}
                alt={filteredItems[activeLightboxIndex].title}
                fill
                sizes="90vw"
                className="object-contain"
              />

              {/* Navigation arrows */}
              {filteredItems.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      prevImage();
                    }}
                    className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 text-white hover:bg-black/90 transition-colors"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      nextImage();
                    }}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 text-white hover:bg-black/90 transition-colors"
                    aria-label="Next image"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}
            </div>

            {/* Bottom Caption & Verification Note */}
            <div className="p-4 bg-gray-900/90 border-t border-gray-800 text-xs text-gray-300 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
              <p className="leading-relaxed">
                {filteredItems[activeLightboxIndex].description}
              </p>
              <span className="text-[11px] text-gray-400 shrink-0">
                Photo {activeLightboxIndex + 1} of {filteredItems.length}
              </span>
            </div>

          </div>
        </div>
      )}
    </section>
  );
}
