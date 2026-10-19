'use client';

import React from 'react';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { CATEGORIES } from '@/data/categories';

interface ProductCategoriesProps {
  onSelectCategory?: (categoryId: string) => void;
}

export default function ProductCategories({ onSelectCategory }: ProductCategoriesProps) {
  const handleCategoryClick = (categoryId: string) => {
    if (onSelectCategory) {
      onSelectCategory(categoryId);
    }
    const productsSection = document.querySelector('#products');
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="categories" className="py-16 md:py-24 bg-white border-y border-gray-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EAF5EC] text-[#0B3D24] text-xs font-bold uppercase tracking-wider mb-3">
            <span>Product Portfolio</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0B3D24] tracking-tight">
            Explore Our Products
          </h2>
          <p className="mt-3 text-base sm:text-lg text-[#66716A]">
            Customized mobile food solutions for different business needs.
          </p>
        </div>

        {/* 4-Category Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-6">
          {CATEGORIES.map((cat) => (
            <div
              key={cat.id}
              className="group bg-[#F7F9F7] rounded-2xl overflow-hidden border border-gray-200 hover:border-[#16803C]/50 hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Product Photograph Container */}
                <div className="relative aspect-[4/3] w-full bg-gray-100 overflow-hidden">
                  <Image
                    src={cat.image_url}
                    alt={`${cat.name} by Vetri Fabs India`}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                  
                  {/* Category Badge */}
                  <span className="absolute top-3 left-3 bg-[#0B3D24]/90 text-white text-[11px] font-semibold px-2.5 py-1 rounded-md backdrop-blur-xs shadow-xs">
                    {cat.name}
                  </span>
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="text-lg font-bold text-[#0B3D24] mb-2 group-hover:text-[#16803C] transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#66716A] line-clamp-2 leading-relaxed mb-4">
                    {cat.description}
                  </p>

                  {/* Example Pills */}
                  <div className="flex flex-wrap gap-1.5 mb-2">
                    {cat.examples.slice(0, 3).map((ex) => (
                      <span
                        key={ex}
                        className="inline-flex items-center text-[11px] bg-white text-[#202923] px-2 py-0.5 rounded-md border border-gray-200/80 font-medium"
                      >
                        {ex}
                      </span>
                    ))}
                    {cat.examples.length > 3 && (
                      <span className="inline-flex items-center text-[11px] bg-[#EAF5EC] text-[#0B3D24] px-1.5 py-0.5 rounded-md font-medium">
                        +{cat.examples.length - 3} more
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Action Link */}
              <div className="px-5 pb-5 pt-2">
                <button
                  type="button"
                  onClick={() => handleCategoryClick(cat.id)}
                  className="w-full py-2.5 px-4 bg-white group-hover:bg-[#16803C] text-[#0B3D24] group-hover:text-white border border-gray-200 group-hover:border-[#16803C] rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 flex items-center justify-between cursor-pointer shadow-2xs"
                >
                  <span>Explore Products</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
