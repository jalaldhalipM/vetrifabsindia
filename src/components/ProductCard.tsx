'use client';

import React from 'react';
import Image from 'next/image';
import { Eye, FileText } from 'lucide-react';
import { Product } from '@/types';

interface ProductCardProps {
  product: Product;
  onViewDetails: (product: Product) => void;
  onRequestQuote: (productName: string) => void;
}

export default function ProductCard({
  product,
  onViewDetails,
  onRequestQuote,
}: ProductCardProps) {
  return (
    <div className="group bg-white rounded-2xl overflow-hidden border border-gray-200/90 hover:border-[#16803C]/50 hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
      
      <div>
        {/* Product Image */}
        <div
          onClick={() => onViewDetails(product)}
          className="relative aspect-[4/3] w-full bg-gray-900 cursor-pointer overflow-hidden"
        >
          <Image
            src={product.image_url}
            alt={product.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
          />

          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <span className="bg-white/95 text-[#0B3D24] font-semibold text-xs px-3.5 py-1.5 rounded-lg shadow-md flex items-center gap-1.5 backdrop-blur-xs">
              <Eye className="w-3.5 h-3.5 text-[#16803C]" />
              <span>Quick View</span>
            </span>
          </div>

          {/* Category Pill */}
          <span className="absolute top-3 left-3 bg-[#0B3D24]/90 text-white text-[11px] font-semibold px-2.5 py-1 rounded-md backdrop-blur-xs shadow-xs">
            {product.category_name}
          </span>
        </div>

        {/* Content */}
        <div className="p-5">
          <div className="text-[11px] font-bold text-[#16803C] uppercase tracking-wider mb-1">
            Custom Manufacturing
          </div>

          <h3
            onClick={() => onViewDetails(product)}
            className="text-base sm:text-lg font-bold text-[#0B3D24] mb-2 leading-snug cursor-pointer hover:text-[#16803C] transition-colors"
          >
            {product.title}
          </h3>

          <p className="text-xs sm:text-sm text-[#66716A] line-clamp-2 leading-relaxed mb-4">
            {product.short_description}
          </p>

          {/* Quick Specification Snippets */}
          <div className="space-y-1 py-2 border-t border-gray-100 text-[11px]">
            {product.specifications.slice(0, 2).map((spec) => (
              <div key={spec.label} className="flex justify-between text-[#66716A]">
                <span>{spec.label}:</span>
                <span className="font-semibold text-[#202923] truncate max-w-[150px]">{spec.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Card Actions */}
      <div className="px-5 pb-5 pt-2 flex items-center gap-2">
        <button
          type="button"
          onClick={() => onViewDetails(product)}
          className="flex-1 py-2.5 px-3 bg-[#F7F9F7] hover:bg-[#EAF5EC] text-[#0B3D24] rounded-xl text-xs font-semibold transition-colors border border-gray-200 hover:border-[#16803C]/40 flex items-center justify-center gap-1 cursor-pointer"
        >
          <Eye className="w-3.5 h-3.5 text-[#16803C]" />
          <span>View Details</span>
        </button>

        <button
          type="button"
          onClick={() => onRequestQuote(product.title)}
          className="flex-1 py-2.5 px-3 bg-[#16803C] hover:bg-[#0B3D24] text-white rounded-xl text-xs font-semibold transition-colors shadow-2xs hover:shadow flex items-center justify-center gap-1 cursor-pointer active:scale-95"
        >
          <FileText className="w-3.5 h-3.5" />
          <span>Request Quote</span>
        </button>
      </div>

    </div>
  );
}
