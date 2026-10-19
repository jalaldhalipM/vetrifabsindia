'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Eye, FileText, ArrowRight, Tag } from 'lucide-react';
import { Product } from '@/types';
import { formatINR } from '@/data/company';

interface ProductCardProps {
  product: Product;
  onViewDetails?: (product: Product) => void;
  onRequestQuote?: (productName: string) => void;
}

export default function ProductCard({
  product,
  onViewDetails,
  onRequestQuote,
}: ProductCardProps) {
  const detailUrl = `/products/${product.category_slug || product.category_id}/${product.slug}`;

  const renderPrice = () => {
    if (product.pricing_type === 'fixed' && product.price && product.price > 0) {
      return (
        <div>
          <span className="text-base font-extrabold text-[#0B3D24]">
            {formatINR(product.price)}
          </span>
          {product.unit && (
            <span className="text-[11px] text-[#66716A] ml-1">/ {product.unit}</span>
          )}
        </div>
      );
    }

    if (product.pricing_type === 'starting' && product.starting_price && product.starting_price > 0) {
      return (
        <div>
          <span className="text-[11px] font-semibold text-[#16803C] block uppercase tracking-wider">
            Starting from
          </span>
          <span className="text-base font-extrabold text-[#0B3D24]">
            {formatINR(product.starting_price)}
          </span>
          {product.unit && (
            <span className="text-[11px] text-[#66716A] ml-1">/ {product.unit}</span>
          )}
        </div>
      );
    }

    return (
      <span className="inline-flex items-center gap-1 text-xs font-bold text-[#16803C] bg-[#EAF5EC] px-2.5 py-1 rounded-md">
        <Tag className="w-3 h-3" />
        <span>Request a Quote</span>
      </span>
    );
  };

  const handleDetailsClick = (e: React.MouseEvent) => {
    if (onViewDetails) {
      e.preventDefault();
      onViewDetails(product);
    }
  };

  return (
    <div className="group bg-white rounded-2xl overflow-hidden border border-gray-200/90 hover:border-[#16803C]/50 hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
      <div>
        {/* Product Image */}
        <Link
          href={detailUrl}
          onClick={handleDetailsClick}
          className="relative aspect-[4/3] w-full bg-gray-900 block overflow-hidden cursor-pointer"
        >
          <Image
            src={product.primary_image || product.image_url}
            alt={product.name || product.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
          />

          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <span className="bg-white/95 text-[#0B3D24] font-semibold text-xs px-3.5 py-1.5 rounded-lg shadow-md flex items-center gap-1.5 backdrop-blur-xs">
              <Eye className="w-3.5 h-3.5 text-[#16803C]" />
              <span>View Product</span>
            </span>
          </div>

          {/* Category Pill */}
          <span className="absolute top-3 left-3 bg-[#0B3D24]/90 text-white text-[11px] font-semibold px-2.5 py-1 rounded-md backdrop-blur-xs shadow-xs">
            {product.category_name}
          </span>

          {/* SKU Pill */}
          {product.sku && (
            <span className="absolute top-3 right-3 bg-white/90 text-[#0B3D24] text-[10px] font-mono font-bold px-2 py-0.5 rounded shadow-xs backdrop-blur-xs border border-gray-200">
              {product.sku}
            </span>
          )}
        </Link>

        {/* Content */}
        <div className="p-5">
          <div className="flex items-center justify-between gap-2 mb-1.5">
            <span className="text-[11px] font-bold text-[#16803C] uppercase tracking-wider">
              {product.availability_status === 'in_stock'
                ? 'Ready Stock'
                : product.availability_status === 'made_to_order'
                ? 'Made to Order'
                : 'Custom Fabrication'}
            </span>
          </div>

          <h3 className="text-base sm:text-lg font-bold text-[#0B3D24] mb-2 leading-snug">
            <Link
              href={detailUrl}
              onClick={handleDetailsClick}
              className="hover:text-[#16803C] transition-colors"
            >
              {product.name || product.title}
            </Link>
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

          {/* Pricing Info */}
          <div className="mt-3 pt-3 border-t border-gray-100 flex items-center justify-between">
            {renderPrice()}
          </div>
        </div>
      </div>

      {/* Card Actions */}
      <div className="px-5 pb-5 pt-1 flex items-center gap-2">
        <Link
          href={detailUrl}
          onClick={handleDetailsClick}
          className="flex-1 py-2.5 px-3 bg-[#F7F9F7] hover:bg-[#EAF5EC] text-[#0B3D24] rounded-xl text-xs font-semibold transition-colors border border-gray-200 hover:border-[#16803C]/40 flex items-center justify-center gap-1 cursor-pointer text-center"
        >
          <span>View Details</span>
          <ArrowRight className="w-3.5 h-3.5 text-[#16803C]" />
        </Link>

        {onRequestQuote ? (
          <button
            type="button"
            onClick={() => onRequestQuote(product.name || product.title)}
            className="flex-1 py-2.5 px-3 bg-[#16803C] hover:bg-[#0B3D24] text-white rounded-xl text-xs font-semibold transition-colors shadow-2xs hover:shadow flex items-center justify-center gap-1 cursor-pointer active:scale-95"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Request Quote</span>
          </button>
        ) : (
          <Link
            href={`/products/${product.category_slug || product.category_id}/${product.slug}#quote`}
            className="flex-1 py-2.5 px-3 bg-[#16803C] hover:bg-[#0B3D24] text-white rounded-xl text-xs font-semibold transition-colors shadow-2xs hover:shadow flex items-center justify-center gap-1 cursor-pointer active:scale-95 text-center"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Request Quote</span>
          </Link>
        )}
      </div>
    </div>
  );
}
