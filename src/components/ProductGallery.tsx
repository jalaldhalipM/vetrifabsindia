'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import {
  ChevronLeft,
  ChevronRight,
  Maximize2,
  X,
  ShieldCheck,
} from 'lucide-react';

interface ProductGalleryProps {
  images: string[];
  productName: string;
  categoryName: string;
}

export default function ProductGallery({
  images,
  productName,
  categoryName,
}: ProductGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const galleryList = images && images.length > 0 ? images : ['/images/products/tata-ace-food-truck.jpg'];
  const currentImage = galleryList[selectedIndex] || galleryList[0];

  const handleNext = useCallback(() => {
    setSelectedIndex((prev) => (prev + 1) % galleryList.length);
  }, [galleryList.length]);

  const handlePrev = useCallback(() => {
    setSelectedIndex((prev) => (prev - 1 + galleryList.length) % galleryList.length);
  }, [galleryList.length]);

  // Keyboard navigation for Lightbox
  useEffect(() => {
    if (!lightboxOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxOpen(false);
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxOpen, handleNext, handlePrev]);

  return (
    <div className="flex flex-col gap-3.5">
      {/* Main Image Frame */}
      <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden bg-gray-950 border border-gray-200 shadow-md group">
        <Image
          src={currentImage}
          alt={`${productName} view ${selectedIndex + 1}`}
          fill
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 45vw"
          className="object-cover object-center transition-all duration-300 group-hover:scale-102"
        />

        {/* Category Badge */}
        <span className="absolute top-4 left-4 bg-[#0B3D24]/90 text-white text-xs font-semibold px-3 py-1 rounded-lg backdrop-blur-xs shadow-md">
          {categoryName}
        </span>

        {/* Zoom Lightbox Trigger */}
        <button
          type="button"
          onClick={() => setLightboxOpen(true)}
          aria-label="Open Fullscreen Lightbox"
          className="absolute top-4 right-4 p-2.5 rounded-xl bg-black/60 hover:bg-black/80 text-white shadow-md backdrop-blur-xs transition-all active:scale-95 cursor-pointer"
          title="Click to Zoom"
        >
          <Maximize2 className="w-4 h-4" />
        </button>

        {/* Arrow Overlays if multiple images */}
        {galleryList.length > 1 && (
          <>
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous image"
              className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 hover:bg-black/75 text-white backdrop-blur-xs transition-all opacity-80 hover:opacity-100 cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              aria-label="Next image"
              className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 hover:bg-black/75 text-white backdrop-blur-xs transition-all opacity-80 hover:opacity-100 cursor-pointer"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}

        {/* Counter Pill */}
        <span className="absolute bottom-3 right-3 bg-black/60 text-white text-[11px] font-mono font-medium px-2.5 py-1 rounded-md backdrop-blur-xs">
          {selectedIndex + 1} / {galleryList.length}
        </span>
      </div>

      {/* Thumbnail Bar */}
      {galleryList.length > 1 && (
        <div className="grid grid-cols-4 sm:grid-cols-5 gap-2.5">
          {galleryList.map((imgUrl, idx) => (
            <button
              key={imgUrl + idx}
              type="button"
              onClick={() => setSelectedIndex(idx)}
              aria-label={`Select photo ${idx + 1}`}
              className={`relative aspect-[4/3] rounded-xl overflow-hidden border-2 cursor-pointer transition-all duration-200 ${
                selectedIndex === idx
                  ? 'border-[#16803C] ring-2 ring-[#16803C]/30 scale-102 shadow-xs'
                  : 'border-gray-200 opacity-70 hover:opacity-100 hover:border-gray-400'
              }`}
            >
              <Image
                src={imgUrl}
                alt={`${productName} thumbnail ${idx + 1}`}
                fill
                sizes="120px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}

      {/* Authenticity Guarantee Note */}
      <div className="p-3 rounded-xl bg-[#EAF5EC] border border-[#16803C]/20 text-xs text-[#0B3D24] flex items-center gap-2">
        <ShieldCheck className="w-4 h-4 text-[#16803C] shrink-0" />
        <span>Authentic fabrication photograph from Vetri Fabs India workshop.</span>
      </div>

      {/* Lightbox Modal */}
      {lightboxOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/95 flex flex-col justify-between p-4 sm:p-8 animate-in fade-in duration-200"
          onClick={() => setLightboxOpen(false)}
        >
          {/* Top Lightbox Bar */}
          <div className="flex items-center justify-between text-white z-10">
            <div>
              <span className="text-xs text-emerald-400 font-semibold uppercase tracking-wider block">
                {categoryName}
              </span>
              <h4 className="text-sm sm:text-base font-bold truncate max-w-md">
                {productName}
              </h4>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-xs text-gray-400 font-mono">
                {selectedIndex + 1} of {galleryList.length}
              </span>
              <button
                type="button"
                onClick={() => setLightboxOpen(false)}
                aria-label="Close Lightbox"
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Center Large Image View */}
          <div
            className="relative flex-1 w-full max-w-5xl mx-auto flex items-center justify-center my-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full h-[65vh] sm:h-[75vh]">
              <Image
                src={currentImage}
                alt={`${productName} full screen view`}
                fill
                sizes="100vw"
                className="object-contain"
                priority
              />
            </div>

            {/* Prev/Next buttons in Lightbox */}
            {galleryList.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={handlePrev}
                  aria-label="Previous image"
                  className="absolute left-2 sm:-left-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/30 text-white transition-colors cursor-pointer"
                >
                  <ChevronLeft className="w-7 h-7" />
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  aria-label="Next image"
                  className="absolute right-2 sm:-right-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/30 text-white transition-colors cursor-pointer"
                >
                  <ChevronRight className="w-7 h-7" />
                </button>
              </>
            )}
          </div>

          {/* Bottom Thumbnail Strip */}
          {galleryList.length > 1 && (
            <div
              className="flex items-center justify-center gap-2 overflow-x-auto py-2 z-10"
              onClick={(e) => e.stopPropagation()}
            >
              {galleryList.map((imgUrl, idx) => (
                <button
                  key={imgUrl + idx}
                  type="button"
                  onClick={() => setSelectedIndex(idx)}
                  className={`relative w-16 h-12 rounded-lg overflow-hidden border-2 cursor-pointer transition-all ${
                    selectedIndex === idx
                      ? 'border-[#16803C] scale-105'
                      : 'border-transparent opacity-60 hover:opacity-100'
                  }`}
                >
                  <Image
                    src={imgUrl}
                    alt=""
                    fill
                    sizes="64px"
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
