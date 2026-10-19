'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  FileText,
  MessageSquare,
  Phone,
  CheckCircle2,
  Clock,
  Layers,
  Wrench,
  HelpCircle,
  Share2,
  Check,
} from 'lucide-react';

import ProductGallery from '@/components/ProductGallery';
import QuoteModal from '@/components/QuoteModal';
import { Product } from '@/types';
import { COMPANY_CONFIG, formatINR, getWhatsAppEnquiryUrl } from '@/data/company';

interface ProductDetailClientProps {
  product: Product;
  currentUrl: string;
}

export default function ProductDetailClient({
  product,
  currentUrl,
}: ProductDetailClientProps) {
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const images = product.gallery_images && product.gallery_images.length > 0
    ? product.gallery_images
    : product.gallery_urls && product.gallery_urls.length > 0
    ? product.gallery_urls
    : [product.primary_image || product.image_url];

  const handleCopyLink = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  // Pricing rendering
  const renderPricing = () => {
    if (product.pricing_type === 'fixed' && product.price && product.price > 0) {
      return (
        <div className="p-5 rounded-2xl bg-[#F7F9F7] border border-gray-200">
          <span className="text-xs font-semibold text-[#66716A] uppercase tracking-wider block mb-1">
            Manufacturing Base Price
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-[#0B3D24]">
              {formatINR(product.price)}
            </span>
            {product.unit && (
              <span className="text-xs sm:text-sm text-[#66716A]">/ {product.unit}</span>
            )}
          </div>
          <p className="mt-2 text-xs text-[#66716A] leading-relaxed">
            * Inclusive of base body structure and primary counter fabrication. Excludes applicable taxes and vehicle chassis purchase.
          </p>
        </div>
      );
    }

    if (product.pricing_type === 'starting' && product.starting_price && product.starting_price > 0) {
      return (
        <div className="p-5 rounded-2xl bg-[#EAF5EC]/60 border border-[#16803C]/30">
          <span className="text-xs font-bold text-[#16803C] uppercase tracking-wider block mb-1">
            Starting Price
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-[#0B3D24]">
              {formatINR(product.starting_price)}
            </span>
            {product.unit && (
              <span className="text-xs sm:text-sm text-[#0B3D24]">/ {product.unit}</span>
            )}
          </div>
          <p className="mt-2 text-xs text-[#0B3D24] leading-relaxed">
            {COMPANY_CONFIG.pricingDisclaimer}
          </p>
        </div>
      );
    }

    return (
      <div className="p-5 rounded-2xl bg-[#F7F9F7] border border-gray-200">
        <span className="text-xs font-bold text-[#16803C] uppercase tracking-wider block mb-1">
          Pricing Type
        </span>
        <div className="text-2xl sm:text-3xl font-extrabold text-[#0B3D24]">
          Request a Custom Quote
        </div>
        <p className="mt-2 text-xs text-[#66716A] leading-relaxed">
          {COMPANY_CONFIG.pricingDisclaimer}
        </p>
      </div>
    );
  };

  const whatsappUrl = getWhatsAppEnquiryUrl(
    product.name || product.title,
    currentUrl
  );

  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left Column: Image Gallery */}
        <div className="lg:col-span-6 lg:sticky lg:top-28">
          <ProductGallery
            images={images}
            productName={product.name || product.title}
            categoryName={product.category_name}
          />
        </div>

        {/* Right Column: Product Info & Actions */}
        <div className="lg:col-span-6 flex flex-col gap-6">
          {/* Header & Badges */}
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2.5">
              <Link
                href={`/products/${product.category_slug}`}
                className="text-xs font-bold text-[#16803C] bg-[#EAF5EC] px-3 py-1 rounded-md hover:bg-[#d8edd9] transition-colors"
              >
                {product.category_name}
              </Link>

              {product.sku && (
                <span className="text-xs font-mono font-bold text-gray-500 bg-gray-100 border border-gray-200 px-2.5 py-1 rounded-md">
                  SKU: {product.sku}
                </span>
              )}

              <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-md flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-emerald-600" />
                <span>
                  {product.availability_status === 'in_stock'
                    ? 'Ready for Dispatch'
                    : product.availability_status === 'made_to_order'
                    ? 'Made to Order (7-12 Days)'
                    : 'Custom Fabrication (15-20 Days)'}
                </span>
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0B3D24] tracking-tight leading-tight mb-3">
              {product.name || product.title}
            </h1>

            <p className="text-sm sm:text-base text-[#66716A] leading-relaxed">
              {product.short_description}
            </p>
          </div>

          {/* Pricing Box */}
          {renderPricing()}

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              type="button"
              onClick={() => setQuoteModalOpen(true)}
              className="flex-1 bg-[#16803C] hover:bg-[#0B3D24] text-white font-bold text-sm py-4 px-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2 active:scale-98 cursor-pointer"
            >
              <FileText className="w-4 h-4" />
              <span>Request Official Quote</span>
            </button>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="py-4 px-5 bg-[#EAF5EC] hover:bg-[#d5ebd7] text-[#0B3D24] font-bold text-sm rounded-xl border border-[#16803C]/30 flex items-center justify-center gap-2 transition-colors active:scale-98"
              title="Enquire on WhatsApp"
            >
              <MessageSquare className="w-4 h-4 text-[#16803C]" />
              <span>WhatsApp</span>
            </a>

            <button
              type="button"
              onClick={handleCopyLink}
              aria-label="Share product"
              className="p-4 rounded-xl border border-gray-200 hover:bg-gray-50 text-gray-600 flex items-center justify-center transition-colors cursor-pointer"
              title="Copy Product Link"
            >
              {copiedLink ? (
                <Check className="w-5 h-5 text-[#16803C]" />
              ) : (
                <Share2 className="w-5 h-5" />
              )}
            </button>
          </div>

          {/* Phone Contact Snippet */}
          <div className="flex items-center justify-between text-xs text-[#66716A] p-3 rounded-xl bg-white border border-gray-200">
            <span className="flex items-center gap-1.5 font-medium">
              <Phone className="w-3.5 h-3.5 text-[#16803C]" />
              <span>Call Technical Workshop:</span>
            </span>
            <span className="font-bold text-[#0B3D24]">
              {COMPANY_CONFIG.displayPhone}
            </span>
          </div>

          {/* Key Built-in Features */}
          {product.features && product.features.length > 0 && (
            <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-2xs">
              <h3 className="text-xs font-bold text-[#0B3D24] uppercase tracking-wider mb-3 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#16803C]" />
                <span>Standard Fabrication Inclusions</span>
              </h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#202923]">
                {product.features.map((feat) => (
                  <li key={feat} className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#16803C] shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Dynamic Specifications Table */}
          {product.specifications && product.specifications.length > 0 && (
            <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-2xs">
              <h3 className="text-xs font-bold text-[#0B3D24] uppercase tracking-wider mb-3 flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-[#16803C]" />
                <span>Technical Specifications & Material Sizing</span>
              </h3>

              <div className="divide-y divide-gray-100 border border-gray-200 rounded-xl overflow-hidden bg-[#F7F9F7] text-xs">
                {product.specifications
                  .filter((spec) => spec.label && spec.value && spec.value.trim() !== '')
                  .map((spec) => (
                    <div
                      key={spec.label}
                      className="p-3 sm:px-4 sm:py-2.5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1"
                    >
                      <span className="font-medium text-[#66716A] sm:w-1/2">
                        {spec.label}
                      </span>
                      <span className="font-bold text-[#202923] sm:w-1/2 sm:text-right">
                        {spec.value}
                      </span>
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Long Description & Customization Guide */}
      <div className="mt-16 bg-white rounded-3xl p-6 sm:p-10 border border-gray-200 shadow-sm">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EAF5EC] text-[#0B3D24] text-xs font-bold uppercase tracking-wider mb-3">
            <Wrench className="w-3.5 h-3.5 text-[#16803C]" />
            <span>Manufacturing Engineering Details</span>
          </div>
          <h2 className="text-2xl font-extrabold text-[#0B3D24] mb-4">
            About This Fabrication Model
          </h2>
          <div className="prose text-sm text-[#66716A] leading-relaxed space-y-4">
            <p>{product.full_description || product.short_description}</p>
            <p>
              Every unit produced at Vetri Fabs India is designed with rigorous attention to kitchen workflow ergonomics, staff standing headroom, fire-safety clearances for cooking equipment, and reliable weather-proofing against monsoons.
            </p>
          </div>

          {/* Customization Note */}
          <div className="mt-8 p-5 rounded-2xl bg-[#F7F9F7] border border-gray-200">
            <h4 className="text-xs font-bold text-[#0B3D24] uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <HelpCircle className="w-4 h-4 text-[#16803C]" />
              <span>Available Custom Modifications</span>
            </h4>
            <p className="text-xs text-[#66716A] leading-relaxed">
              We fabricate to order. You can request changes in overall dimensions, choice of chassis (Tata Ace HT, Mega, Mahindra Bolero, or custom tow trailers), stainless steel gauge (SS 304 or SS 202), number of hydraulic service awnings, internal electrical appliance wiring, plumbing sinks, and vinyl exterior branding.
            </p>
          </div>
        </div>
      </div>

      {/* Interactive Quotation Modal */}
      <QuoteModal
        isOpen={quoteModalOpen}
        onClose={() => setQuoteModalOpen(false)}
        productName={product.name || product.title}
        productSlug={product.slug}
        productCategory={product.category_name}
      />
    </div>
  );
}
