'use client';

import React, { useState } from 'react';
import ProductCard from './ProductCard';
import ProductModal from './ProductModal';
import { SAMPLE_PRODUCTS } from '@/data/products';
import { Product } from '@/types';
import { Sparkles } from 'lucide-react';

interface FeaturedProductsProps {
  onRequestQuote: (productName: string) => void;
  selectedCategoryFilter?: string;
  onFilterChange?: (categoryId: string) => void;
}

const CATEGORY_TABS = [
  { id: 'all', label: 'All Products' },
  { id: 'food-trucks', label: 'Food Trucks' },
  { id: 'food-carts', label: 'Food Carts' },
  { id: 'food-vans', label: 'Food Vans' },
  { id: 'stainless-steel', label: 'Stainless Steel' },
];

export default function FeaturedProducts({
  onRequestQuote,
  selectedCategoryFilter = 'all',
  onFilterChange,
}: FeaturedProductsProps) {
  const [activeTab, setActiveTab] = useState(selectedCategoryFilter);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    if (onFilterChange) onFilterChange(tabId);
  };

  const filteredProducts = activeTab === 'all'
    ? SAMPLE_PRODUCTS
    : SAMPLE_PRODUCTS.filter((p) => p.category_id === activeTab);

  const handleViewDetails = (product: Product) => {
    setSelectedProduct(product);
    setModalOpen(true);
  };

  return (
    <section id="products" className="py-16 md:py-24 bg-[#F7F9F7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EAF5EC] text-[#0B3D24] text-xs font-bold uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5 text-[#16803C]" />
              <span>Popular Custom Fabrications</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0B3D24] tracking-tight">
              Explore Our Popular Designs
            </h2>
            <p className="mt-2 text-base text-[#66716A] max-w-xl">
              Representative models fabricated for street food vendors, restaurant chains, and commercial caterers.
            </p>
          </div>

          <div className="mt-4 md:mt-0">
            <span className="text-xs text-[#66716A]">
              Showing <strong className="text-[#0B3D24]">{filteredProducts.length}</strong> fabricated designs
            </span>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {CATEGORY_TABS.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => handleTabChange(tab.id)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-[#16803C] text-white shadow-sm'
                  : 'bg-white text-[#202923] hover:bg-[#EAF5EC] hover:text-[#0B3D24] border border-gray-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onViewDetails={handleViewDetails}
              onRequestQuote={onRequestQuote}
            />
          ))}
        </div>

        {/* Custom inquiry teaser */}
        <div className="mt-12 text-center bg-white p-6 rounded-2xl border border-gray-200 shadow-2xs">
          <p className="text-sm text-[#202923] font-medium">
            Have a specific vehicle chassis (e.g. Mahindra Bolero Maxi Truck, Eicher, or custom trailer) or custom layout in mind?
          </p>
          <button
            type="button"
            onClick={() => onRequestQuote('Custom Fabrication Inquiry')}
            className="mt-3 text-xs sm:text-sm font-bold text-[#16803C] hover:text-[#0B3D24] underline cursor-pointer"
          >
            Request a Custom Design Consultation &rarr;
          </button>
        </div>

      </div>

      {/* Product Detail Modal */}
      <ProductModal
        product={selectedProduct}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onRequestQuote={onRequestQuote}
      />
    </section>
  );
}
