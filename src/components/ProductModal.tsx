'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { X, CheckCircle2, ChevronRight, MessageSquare, Layers, ShieldCheck } from 'lucide-react';
import { Product } from '@/types';
import { COMPANY_CONFIG } from '@/data/company';

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onRequestQuote: (productName: string) => void;
}

export default function ProductModal({
  product,
  isOpen,
  onClose,
  onRequestQuote,
}: ProductModalProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  if (!isOpen || !product) return null;

  const currentDisplayImage = selectedImage || product.image_url;
  const gallery = product.gallery_urls && product.gallery_urls.length > 0
    ? product.gallery_urls
    : [product.image_url];

  const handleQuoteClick = () => {
    onClose();
    onRequestQuote(product.title);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-product-title"
      className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6"
      onClick={onClose}
    >
      <div
        className="relative bg-white rounded-2xl max-w-4xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-gray-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close Product Details"
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/90 text-[#202923] hover:bg-gray-100 shadow-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#16803C]"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 p-5 sm:p-8">
          
          {/* Left: Gallery View */}
          <div className="md:col-span-6 flex flex-col gap-3">
            <div className="relative aspect-[4/3] w-full rounded-xl overflow-hidden bg-gray-900 border border-gray-200">
              <Image
                src={currentDisplayImage}
                alt={product.title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-contain"
              />
              <span className="absolute top-3 left-3 bg-[#0B3D24]/90 text-white text-[11px] font-semibold px-2.5 py-1 rounded-md backdrop-blur-xs">
                {product.category_name}
              </span>
            </div>

            {/* Thumbnail switcher if multiple images exist */}
            {gallery.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {gallery.map((imgUrl, i) => (
                  <button
                    key={imgUrl + i}
                    type="button"
                    onClick={() => setSelectedImage(imgUrl)}
                    className={`relative aspect-[4/3] rounded-lg overflow-hidden border-2 cursor-pointer transition-all ${
                      currentDisplayImage === imgUrl
                        ? 'border-[#16803C] ring-2 ring-[#16803C]/30'
                        : 'border-gray-200 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <Image
                      src={imgUrl}
                      alt={`${product.title} view ${i + 1}`}
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}

            <div className="p-3 rounded-lg bg-[#EAF5EC] border border-[#16803C]/20 text-[11px] text-[#0B3D24] flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#16803C] shrink-0" />
              <span>Real product fabricated by Vetri Fabs India. Tailored layouts available.</span>
            </div>
          </div>

          {/* Right: Product Details & Specs */}
          <div className="md:col-span-6 flex flex-col justify-between">
            <div>
              <div className="text-xs font-bold text-[#16803C] uppercase tracking-wider mb-1">
                {product.category_name}
              </div>

              <h3
                id="modal-product-title"
                className="text-xl sm:text-2xl font-extrabold text-[#0B3D24] mb-3 leading-snug"
              >
                {product.title}
              </h3>

              <p className="text-xs sm:text-sm text-[#66716A] leading-relaxed mb-5">
                {product.full_description || product.short_description}
              </p>

              {/* Technical Specifications */}
              <div className="mb-5">
                <h4 className="text-xs font-bold text-[#0B3D24] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-[#16803C]" />
                  <span>Technical Specifications</span>
                </h4>
                <div className="divide-y divide-gray-100 border border-gray-200 rounded-xl overflow-hidden bg-[#F7F9F7] text-xs">
                  {product.specifications.map((spec) => (
                    <div key={spec.label} className="p-2 sm:px-3 sm:py-2 flex justify-between gap-2">
                      <span className="font-medium text-[#66716A]">{spec.label}</span>
                      <span className="font-bold text-[#202923] text-right">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Functional Features */}
              <div className="mb-6">
                <h4 className="text-xs font-bold text-[#0B3D24] uppercase tracking-wider mb-2">
                  Key Built-in Features
                </h4>
                <ul className="space-y-1.5">
                  {product.features.map((feat) => (
                    <li key={feat} className="flex items-start gap-2 text-xs text-[#202923]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#16803C] shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="pt-4 border-t border-gray-100 flex flex-col sm:flex-row gap-2.5">
              <button
                type="button"
                onClick={handleQuoteClick}
                className="flex-1 bg-[#16803C] hover:bg-[#0B3D24] text-white font-semibold text-sm py-3 px-4 rounded-xl shadow-sm transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Request a Quote for this Model</span>
                <ChevronRight className="w-4 h-4" />
              </button>

              <a
                href={`https://wa.me/${COMPANY_CONFIG.whatsappNumber}?text=${encodeURIComponent(
                  `Hello Vetri Fabs India, I would like to enquire about the ${product.title}.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-[#EAF5EC] hover:bg-[#d5ebd7] text-[#0B3D24] border border-[#16803C]/30 rounded-xl flex items-center justify-center gap-1.5 text-xs font-semibold"
                title="Chat on WhatsApp"
              >
                <MessageSquare className="w-4 h-4 text-[#16803C]" />
                <span>WhatsApp</span>
              </a>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
