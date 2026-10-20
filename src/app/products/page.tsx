'use client';

import React, { useState, useMemo, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import Breadcrumbs from '@/components/Breadcrumbs';
import QuoteModal from '@/components/QuoteModal';
import { CATEGORIES } from '@/data/categories';
import { getAllProducts } from '@/data/products';
import { getAdminProducts, initProductsIfEmpty } from '@/lib/adminStore';
import { Product } from '@/types';
import { Search, SlidersHorizontal, RotateCcw, AlertCircle, Sparkles } from 'lucide-react';


export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedPricingType, setSelectedPricingType] = useState<string>('all');
  const [selectedAvailability, setSelectedAvailability] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'featured' | 'name-asc' | 'name-desc' | 'price-asc' | 'price-desc'>('featured');
  const [visibleCount, setVisibleCount] = useState<number>(9);

  // Quote modal state
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [selectedProductForQuote, setSelectedProductForQuote] = useState<string>('General Catalogue Enquiry');

  const [allProducts, setAllProducts] = useState<Product[]>(() => getAllProducts());

  useEffect(() => {
    initProductsIfEmpty();
    const stored = getAdminProducts();
    const published = stored.filter((p) => p.publication_status === 'published' || p.is_published);
    if (published.length > 0) setAllProducts(published);
  }, []);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let list = [...allProducts];

    // Category filter
    if (selectedCategory !== 'all') {
      list = list.filter(
        (p) => p.category_slug === selectedCategory || p.category_id === selectedCategory
      );
    }

    // Pricing filter
    if (selectedPricingType !== 'all') {
      list = list.filter((p) => p.pricing_type === selectedPricingType);
    }

    // Availability filter
    if (selectedAvailability !== 'all') {
      list = list.filter((p) => p.availability_status === selectedAvailability);
    }

    // Search query
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.title.toLowerCase().includes(q) ||
          p.short_description.toLowerCase().includes(q) ||
          p.sku.toLowerCase().includes(q) ||
          p.category_name.toLowerCase().includes(q) ||
          p.specifications.some((s) => s.value.toLowerCase().includes(q))
      );
    }

    // Sorting
    if (sortBy === 'name-asc') {
      list.sort((a, b) => (a.name || a.title).localeCompare(b.name || b.title));
    } else if (sortBy === 'name-desc') {
      list.sort((a, b) => (b.name || b.title).localeCompare(a.name || a.title));
    } else if (sortBy === 'price-asc') {
      list.sort(
        (a, b) => (a.price || a.starting_price || 9999999) - (b.price || b.starting_price || 9999999)
      );
    } else if (sortBy === 'price-desc') {
      list.sort(
        (a, b) => (b.price || b.starting_price || 0) - (a.price || a.starting_price || 0)
      );
    } else {
      // Featured
      list.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }

    return list;
  }, [allProducts, selectedCategory, selectedPricingType, selectedAvailability, searchQuery, sortBy]);

  const displayedProducts = filteredProducts.slice(0, visibleCount);
  const hasMore = visibleCount < filteredProducts.length;

  const handleResetFilters = () => {
    setSelectedCategory('all');
    setSelectedPricingType('all');
    setSelectedAvailability('all');
    setSearchQuery('');
    setSortBy('featured');
    setVisibleCount(9);
  };

  const handleOpenQuote = (productName: string) => {
    setSelectedProductForQuote(productName);
    setQuoteModalOpen(true);
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#F7F9F7]">
      <Header />


      <main className="flex-1 pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb Navigation */}
          <Breadcrumbs items={[{ label: 'Product Catalogue' }]} />

          {/* Page Title & Introduction */}
          <div className="mt-4 mb-8 sm:mb-12">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EAF5EC] text-[#0B3D24] text-xs font-bold uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5 text-[#16803C]" />
              <span>Direct Manufacturer Catalogue</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0B3D24] tracking-tight">
              Commercial Food Carts & Truck Models
            </h1>
            <p className="mt-3 text-sm sm:text-base text-[#66716A] max-w-3xl leading-relaxed">
              Explore our range of heavy-duty food trucks on Tata Ace chassis, custom mobile push carts, walk-in food vans, and food-grade stainless-steel commercial kitchens fabricated in Tamil Nadu.
            </p>
          </div>

          {/* Search & Category Filter Section */}
          <div className="bg-white rounded-2xl p-5 sm:p-6 border border-gray-200 shadow-sm mb-8 space-y-5">
            {/* Search Input Bar */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search models by name, chassis type, SKU (e.g. VF-FT-001), or equipment..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#16803C] text-sm text-[#202923] bg-[#F7F9F7]"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-gray-400 hover:text-gray-700 bg-gray-200 hover:bg-gray-300 rounded-md px-2 py-1"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
              <button
                type="button"
                onClick={() => setSelectedCategory('all')}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === 'all'
                    ? 'bg-[#16803C] text-white shadow-sm'
                    : 'bg-[#F7F9F7] text-[#202923] hover:bg-[#EAF5EC] border border-gray-200'
                }`}
              >
                All Categories ({allProducts.length})
              </button>

              {CATEGORIES.map((cat) => {
                const count = allProducts.filter(
                  (p) => p.category_slug === cat.slug || p.category_id === cat.id
                ).length;

                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setSelectedCategory(cat.slug)}
                    className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
                      selectedCategory === cat.slug
                        ? 'bg-[#16803C] text-white shadow-sm'
                        : 'bg-[#F7F9F7] text-[#202923] hover:bg-[#EAF5EC] border border-gray-200'
                    }`}
                  >
                    {cat.name} ({count})
                  </button>
                );
              })}
            </div>

            {/* Secondary Filter Dropdowns & Sorting */}
            <div className="pt-4 border-t border-gray-100 flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-1.5 font-bold text-[#0B3D24]">
                  <SlidersHorizontal className="w-4 h-4 text-[#16803C]" />
                  <span>Filters:</span>
                </div>

                {/* Pricing Type Filter */}
                <select
                  value={selectedPricingType}
                  onChange={(e) => setSelectedPricingType(e.target.value)}
                  className="px-3 py-1.5 bg-[#F7F9F7] border border-gray-200 rounded-lg font-medium text-[#202923] focus:outline-none focus:ring-1 focus:ring-[#16803C]"
                >
                  <option value="all">All Pricing Types</option>
                  <option value="fixed">Fixed Price Models</option>
                  <option value="starting">Starting Price Available</option>
                  <option value="quotation">Custom Quotation Only</option>
                </select>

                {/* Availability Filter */}
                <select
                  value={selectedAvailability}
                  onChange={(e) => setSelectedAvailability(e.target.value)}
                  className="px-3 py-1.5 bg-[#F7F9F7] border border-gray-200 rounded-lg font-medium text-[#202923] focus:outline-none focus:ring-1 focus:ring-[#16803C]"
                >
                  <option value="all">All Production Statuses</option>
                  <option value="in_stock">Ready Stock</option>
                  <option value="made_to_order">Made to Order</option>
                  <option value="custom_fabrication">Custom Fabrication</option>
                </select>

                {(selectedCategory !== 'all' ||
                  selectedPricingType !== 'all' ||
                  selectedAvailability !== 'all' ||
                  searchQuery.trim() !== '') && (
                  <button
                    type="button"
                    onClick={handleResetFilters}
                    className="flex items-center gap-1 text-[#16803C] hover:text-[#0B3D24] font-semibold underline cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Reset</span>
                  </button>
                )}
              </div>

              {/* Sort By Dropdown */}
              <div className="flex items-center gap-2 ml-auto">
                <span className="text-[#66716A] font-medium">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as 'featured' | 'name-asc' | 'name-desc' | 'price-asc' | 'price-desc')}
                  className="px-3 py-1.5 bg-[#F7F9F7] border border-gray-200 rounded-lg font-semibold text-[#0B3D24] focus:outline-none focus:ring-1 focus:ring-[#16803C]"
                >
                  <option value="featured">Featured First</option>
                  <option value="name-asc">Model Name (A &rarr; Z)</option>
                  <option value="name-desc">Model Name (Z &rarr; A)</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                </select>
              </div>
            </div>
          </div>

          {/* Results Count */}
          <div className="flex items-center justify-between mb-6">
            <span className="text-xs sm:text-sm font-semibold text-[#66716A]">
              Showing <strong className="text-[#0B3D24]">{displayedProducts.length}</strong> of{' '}
              <strong className="text-[#0B3D24]">{filteredProducts.length}</strong> models
            </span>
          </div>

          {/* Product Grid or Empty State */}
          {displayedProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {displayedProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onRequestQuote={handleOpenQuote}
                />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-2xl p-12 text-center border border-gray-200 max-w-lg mx-auto shadow-sm">
              <div className="w-16 h-16 rounded-full bg-[#EAF5EC] text-[#16803C] flex items-center justify-center mx-auto mb-4">
                <AlertCircle className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-extrabold text-[#0B3D24] mb-2">
                No matching models found
              </h3>
              <p className="text-xs sm:text-sm text-[#66716A] mb-6 leading-relaxed">
                We couldn&apos;t find any products matching your specific filter criteria. You can reset filters or request a completely bespoke build.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="px-5 py-2.5 bg-[#16803C] hover:bg-[#0B3D24] text-white text-xs font-bold rounded-xl transition-colors"
                >
                  Reset All Filters
                </button>
                <button
                  type="button"
                  onClick={() => handleOpenQuote('Custom Unlisted Fabrication')}
                  className="px-5 py-2.5 bg-[#F7F9F7] hover:bg-[#EAF5EC] text-[#0B3D24] border border-gray-200 text-xs font-bold rounded-xl transition-colors"
                >
                  Request Bespoke Model
                </button>
              </div>
            </div>
          )}

          {/* Load More Button */}
          {hasMore && (
            <div className="mt-12 text-center">
              <button
                type="button"
                onClick={() => setVisibleCount((prev) => prev + 6)}
                className="px-8 py-3.5 bg-white hover:bg-[#EAF5EC] text-[#0B3D24] font-bold text-sm rounded-xl border border-gray-300 hover:border-[#16803C] shadow-sm transition-all cursor-pointer"
              >
                Load More Models ({filteredProducts.length - visibleCount} remaining)
              </button>
            </div>
          )}

          {/* Custom Fabrication Banner */}
          <div className="mt-16 p-8 bg-gradient-to-r from-[#0B3D24] to-[#16803C] text-white rounded-3xl shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="max-w-xl text-center md:text-left">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-300 block mb-1">
                Have a unique commercial chassis or blueprint?
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                We Fabricate Exactly to Your Specifications
              </h2>
              <p className="mt-2 text-xs sm:text-sm text-emerald-100/90 leading-relaxed">
                Bring your Tata Ace, Mahindra Bolero, Ashok Leyland Dost, or custom trailer chassis to our workshop. We handle complete interior ergonomics, gas-safety fitments, and RTO-compliant body fabrication.
              </p>
            </div>

            <button
              type="button"
              onClick={() => handleOpenQuote('Custom Vehicle Blueprint Consultation')}
              className="px-6 py-3.5 bg-white hover:bg-emerald-50 text-[#0B3D24] font-extrabold text-sm rounded-xl shadow-md transition-all shrink-0 cursor-pointer"
            >
              Consult Fabrication Engineers
            </button>
          </div>
        </div>
      </main>

      <Footer />

      {/* Interactive Quotation Modal */}
      <QuoteModal
        isOpen={quoteModalOpen}
        onClose={() => setQuoteModalOpen(false)}
        productName={selectedProductForQuote}
      />
    </div>
  );
}
