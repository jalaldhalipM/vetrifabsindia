'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ArrowRight, FileText, CheckCircle2, Shield, MapPin } from 'lucide-react';

const HERO_IMAGES = [
  {
    url: '/images/hero/hero-food-truck-night.jpg',
    title: 'Commercial Food Truck in Night Operation',
    caption: 'Tata Ace commercial build with 3D illuminated neon marquee & kitchen setup',
  },
  {
    url: '/images/hero/hero-food-cart-kiosk.jpg',
    title: 'Custom Illuminated Mobile Kiosk Cart',
    caption: 'Wood-finish ACP panels, LED halo contouring & 3-side hydraulic flaps',
  },
  {
    url: '/images/hero/hero-tata-ace-mellow.jpg',
    title: 'Tata Ace High-Roof Food Truck',
    caption: 'Factory-manufactured commercial body built at Vetri Fabs Chennai workshop',
  },
];

export default function HeroSection() {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const scrollToSection = (id: string) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      className="relative pt-28 pb-16 md:pt-36 md:pb-24 lg:pt-40 lg:pb-28 overflow-hidden bg-gradient-to-b from-[#EAF5EC]/70 via-[#F7F9F7] to-[#F7F9F7]"
    >
      {/* Subtle industrial background pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#16803C_1px,transparent_1px)] [background-size:24px_24px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* Left Column: Text & CTAs */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            
            {/* Manufacturing badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EAF5EC] border border-[#16803C]/30 text-[#0B3D24] text-xs sm:text-sm font-semibold mb-5 w-fit shadow-xs">
              <span className="w-2 h-2 rounded-full bg-[#16803C] animate-pulse" />
              <span>Commercial Vehicle & Mobile Kiosk Fabricators</span>
              <span className="text-[#66716A] hidden sm:inline">•</span>
              <span className="text-[#66716A] text-xs hidden sm:inline flex items-center gap-1">
                <MapPin className="w-3 h-3 text-[#16803C]" /> Chennai, India
              </span>
            </div>

            {/* Single H1 Title */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-extrabold text-[#0B3D24] tracking-tight leading-[1.15] mb-5">
              Food Truck Manufacturing & Custom Mobile Carts in Chennai
            </h1>

            {/* Supporting Description */}
            <p className="text-base sm:text-lg text-[#66716A] leading-relaxed mb-8 max-w-2xl font-normal">
              Vetri Fabs India is Chennai’s premier commercial food truck manufacturer and vehicle body fabricator. We specialize in high-roof Tata Ace food trucks, enclosed 10x6 mobile food vans, and food-grade stainless steel kitchen carts tailored to your business needs.
            </p>


            {/* Action CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 mb-10">
              <button
                type="button"
                id="hero-explore-products-btn"
                onClick={() => scrollToSection('#products')}
                className="bg-[#16803C] hover:bg-[#0B3D24] text-white font-semibold text-base px-7 py-3.5 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2 group cursor-pointer"
              >
                <span>Explore Our Products</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              <button
                type="button"
                id="hero-request-quote-btn"
                onClick={() => scrollToSection('#contact')}
                className="bg-white hover:bg-[#EAF5EC] text-[#0B3D24] border-2 border-[#16803C]/40 hover:border-[#16803C] font-semibold text-base px-6 py-3.5 rounded-xl shadow-xs transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
              >
                <FileText className="w-4 h-4 text-[#16803C]" />
                <span>Request a Quote</span>
              </button>
            </div>

            {/* Value Highlights */}
            <div className="pt-6 border-t border-gray-200/80 grid grid-cols-3 gap-3 sm:gap-6">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#16803C] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-[#202923]">Bespoke Builds</h4>
                  <p className="text-[11px] text-[#66716A] hidden sm:block">Tailored dimensions & layouts</p>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#16803C] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-[#202923]">Commercial SS</h4>
                  <p className="text-[11px] text-[#66716A] hidden sm:block">Food-grade prep counters</p>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#16803C] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-[#202923]">Vehicle Chassis</h4>
                  <p className="text-[11px] text-[#66716A] hidden sm:block">Tata Ace, Piaggio, vans & carts</p>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Hero Real Product Photograph */}
          <div className="lg:col-span-5">
            <div className="relative">
              {/* Outer decorative card frame */}
              <div className="bg-white rounded-2xl p-2.5 sm:p-3 shadow-xl border border-gray-200/90 relative overflow-hidden group">
                
                {/* Main Image container with 4:3 / 16:11 aspect ratio */}
                <div className="relative aspect-[4/3] w-full rounded-xl overflow-hidden bg-gray-900">
                  <Image
                    src={HERO_IMAGES[activeImageIndex].url}
                    alt={HERO_IMAGES[activeImageIndex].title}
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 45vw"
                    className="object-cover object-center transition-all duration-500 group-hover:scale-105"
                  />

                  {/* Gradient overlay for readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

                  {/* Image Badge / Status */}
                  <div className="absolute top-3 left-3 bg-[#0B3D24]/90 backdrop-blur-xs text-white text-[11px] font-semibold px-2.5 py-1 rounded-md border border-white/20 flex items-center gap-1.5 shadow-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#16803C]" />
                    <span>Real Client Build</span>
                  </div>

                  {/* Bottom caption overlay */}
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <h3 className="font-bold text-sm sm:text-base leading-snug drop-shadow-sm">
                      {HERO_IMAGES[activeImageIndex].title}
                    </h3>
                    <p className="text-xs text-gray-200/90 line-clamp-1 drop-shadow-xs mt-0.5">
                      {HERO_IMAGES[activeImageIndex].caption}
                    </p>
                  </div>
                </div>

                {/* Thumbnail Switcher */}
                <div className="mt-3 grid grid-cols-3 gap-2">
                  {HERO_IMAGES.map((img, idx) => (
                    <button
                      key={img.url}
                      type="button"
                      onClick={() => setActiveImageIndex(idx)}
                      className={`relative aspect-[16/10] rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${
                        activeImageIndex === idx
                          ? 'border-[#16803C] ring-2 ring-[#16803C]/30 shadow-xs'
                          : 'border-transparent opacity-70 hover:opacity-100 hover:border-gray-300'
                      }`}
                      aria-label={`View ${img.title}`}
                    >
                      <Image
                        src={img.url}
                        alt={img.title}
                        fill
                        sizes="120px"
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>

                {/* Verified factory footnote */}
                <div className="mt-2.5 pt-2 border-t border-gray-100 flex items-center justify-between text-[11px] text-[#66716A]">
                  <span className="flex items-center gap-1 font-medium">
                    <Shield className="w-3.5 h-3.5 text-[#16803C]" />
                    Authentic Vetri Fabs Fabrication
                  </span>
                  <button
                    type="button"
                    onClick={() => scrollToSection('#gallery')}
                    className="text-[#16803C] hover:underline font-semibold"
                  >
                    View All Photos &rarr;
                  </button>
                </div>

              </div>

              {/* Decorative accent blob */}
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-[#16803C]/10 rounded-full blur-2xl -z-10 pointer-events-none" />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
