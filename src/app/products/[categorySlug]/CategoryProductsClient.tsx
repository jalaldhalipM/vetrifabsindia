'use client';

import React, { useState, useMemo } from 'react';
import ProductCard from '@/components/ProductCard';
import QuoteModal from '@/components/QuoteModal';
import { Product, Category } from '@/types';
import { Search, SlidersHorizontal, RotateCcw, AlertCircle } from 'lucide-react';

interface CategoryProductsClientProps {
  initialProducts: Product[];
  category: Category;
}

export default function CategoryProductsClient({
  initialProducts,
  category,
}: CategoryProductsClientProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPricingType, setSelectedPricingType] = useState('all');
  const [sortBy, setSortBy] = useState<'featured' | 'name-asc' | 'name-desc' | 'price-asc' | 'price-desc'>('featured');

  // Quote modal
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [selectedProductForQuote, setSelectedProductForQuote] = useState(category.name);

  const filteredProducts = useMemo(() => {
    let list = [...initialProducts];

    if (selectedPricingType !== 'all') {
      list = list.filter((p) => p.pricing_type === selectedPricingType);
    }

    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.short_description.toLowerCase().includes(q) ||
          p.sku.toLowerCase().includes(q) ||
          p.specifications.some((s) => s.value.toLowerCase().includes(q))
      );
    }

    if (sortBy === 'name-asc') {
      list.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === 'name-desc') {
      list.sort((a, b) => b.name.localeCompare(a.name));
    } else if (sortBy === 'price-asc') {
      list.sort(
        (a, b) => (a.price || a.starting_price || 9999999) - (b.price || b.starting_price || 9999999)
      );
    } else if (sortBy === 'price-desc') {
      list.sort(
        (a, b) => (b.price || b.starting_price || 0) - (a.price || a.starting_price || 0)
      );
    } else {
      list.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }

    return list;
  }, [initialProducts, selectedPricingType, searchQuery, sortBy]);

  const handleOpenQuote = (productName: string) => {
    setSelectedProductForQuote(productName);
    setQuoteModalOpen(true);
  };

  return (
    <div>
      {/* Search and Filters Bar */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-gray-200 shadow-xs mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder={`Search ${category.name}...`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm rounded-xl border border-gray-200 bg-[#F7F9F7] focus:outline-none focus:ring-2 focus:ring-[#16803C]"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-bold text-gray-400 hover:text-gray-700"
            >
              Clear
            </button>
          )}
        </div>

        {/* Pricing Filter and Sort */}
        <div className="flex flex-wrap items-center justify-between md:justify-end gap-3 w-full md:w-auto text-xs">
          <div className="flex items-center gap-1.5 font-bold text-[#0B3D24]">
            <SlidersHorizontal className="w-3.5 h-3.5 text-[#16803C]" />
            <span>Pricing:</span>
          </div>

          <select
            value={selectedPricingType}
            onChange={(e) => setSelectedPricingType(e.target.value)}
            className="px-3 py-1.5 bg-[#F7F9F7] border border-gray-200 rounded-lg font-medium text-[#202923] focus:outline-none focus:ring-1 focus:ring-[#16803C]"
          >
            <option value="all">All Models</option>
            <option value="fixed">Fixed Price</option>
            <option value="starting">Starting Price</option>
            <option value="quotation">Quote Only</option>
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as 'featured' | 'name-asc' | 'name-desc' | 'price-asc' | 'price-desc')}
            className="px-3 py-1.5 bg-[#F7F9F7] border border-gray-200 rounded-lg font-semibold text-[#0B3D24] focus:outline-none focus:ring-1 focus:ring-[#16803C]"
          >
            <option value="featured">Featured First</option>
            <option value="name-asc">Model Name (A &rarr; Z)</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>

          {(selectedPricingType !== 'all' || searchQuery.trim() !== '') && (
            <button
              type="button"
              onClick={() => {
                setSelectedPricingType('all');
                setSearchQuery('');
              }}
              className="flex items-center gap-1 text-[#16803C] hover:text-[#0B3D24] font-semibold underline cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          )}
        </div>
      </div>

      {/* Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onRequestQuote={handleOpenQuote}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl p-10 text-center border border-gray-200 max-w-md mx-auto shadow-sm">
          <div className="w-14 h-14 rounded-full bg-[#EAF5EC] text-[#16803C] flex items-center justify-center mx-auto mb-3">
            <AlertCircle className="w-7 h-7" />
          </div>
          <h3 className="text-base font-bold text-[#0B3D24] mb-1">
            No {category.name} match your criteria
          </h3>
          <p className="text-xs text-[#66716A] mb-4">
            Try adjusting your search terms or view all {category.name} models.
          </p>
          <button
            type="button"
            onClick={() => {
              setSelectedPricingType('all');
              setSearchQuery('');
            }}
            className="px-4 py-2 bg-[#16803C] text-white text-xs font-bold rounded-lg"
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* Interactive Quotation Modal */}
      <QuoteModal
        isOpen={quoteModalOpen}
        onClose={() => setQuoteModalOpen(false)}
        productName={selectedProductForQuote}
        productCategory={category.name}
      />
    </div>
  );
}
