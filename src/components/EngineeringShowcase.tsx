'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Layers, Cog, ZoomIn, X } from 'lucide-react';

const ENGINEERING_COMPONENTS = [
  { id: '1', name: 'Roof / Top Cover', material: 'GI Sheet / Heavy Sheet Metal for weather protection' },
  { id: '2', name: 'LED Lighting Strip', material: 'Warm White 12V/24V high-lumen waterproof contouring' },
  { id: '3', name: 'Main Frame Structure', material: 'MS Square Pipe engineered for high rigidity & towing' },
  { id: '4', name: 'Canopy Hydraulic Supports', material: 'Automotive-grade gas springs for effortless opening' },
  { id: '5', name: 'Counter Worktop', material: 'Food-grade SS 304 or Heavy Plywood with Food-Safe Laminate' },
  { id: '6', name: 'Interior Wall Panels', material: 'Hygienic easy-clean Plywood / Aluminum Composite Panels (ACP)' },
  { id: '7', name: 'Front Branding Fascia', material: 'Custom CNC Acrylic / ACP with backlit 3D illuminated logo' },
  { id: '8', name: 'Base Frame & Running Gear', material: 'Reinforced sub-frame with heavy-duty swivel / pneumatic wheels' },
  { id: '9', name: 'Side Flap Panels', material: 'Metal sheet / ACP with perimeter LED channels' },
];

export default function EngineeringShowcase() {
  const [lightboxOpen, setLightboxOpen] = useState(false);

  return (
    <section id="engineering" className="py-16 md:py-24 bg-white border-y border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EAF5EC] text-[#0B3D24] text-xs font-bold uppercase tracking-wider mb-3">
              <Cog className="w-3.5 h-3.5 text-[#16803C]" />
              <span>Engineering & Build Standards</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0B3D24] tracking-tight">
              Anatomy of a Vetri Fabs Food Cart
            </h2>
            <p className="mt-2 text-base text-[#66716A] max-w-2xl">
              Authentic exploded view and structural engineering specifications used in our Chennai workshop.
            </p>
          </div>
          
          <div className="mt-4 md:mt-0">
            <span className="text-xs text-[#66716A] bg-[#F7F9F7] px-3.5 py-1.5 rounded-lg border border-gray-200 font-medium inline-block">
              Vetri Fabs Technical Specification #VF-ENG-2026
            </span>
          </div>
        </div>

        {/* 2-Column Split: Exploded View Image & Interactive Component Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left: Engineering Diagram Image */}
          <div className="lg:col-span-7">
            <div
              onClick={() => setLightboxOpen(true)}
              className="group relative aspect-[16/11] bg-gray-900 rounded-2xl overflow-hidden border border-gray-200 shadow-lg cursor-pointer"
            >
              <Image
                src="/images/engineering/exploded-view-diagram.jpg"
                alt="Vetri Fabs India Finished View and Exploded View Engineering Diagram"
                fill
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-contain p-2 group-hover:scale-102 transition-transform duration-300"
              />
              
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-black/75 text-white text-xs font-semibold px-4 py-2 rounded-lg flex items-center gap-1.5 backdrop-blur-xs">
                  <ZoomIn className="w-4 h-4 text-[#16803C]" />
                  <span>Click to Expand Diagram</span>
                </span>
              </div>

              {/* Verified Tag */}
              <div className="absolute bottom-3 left-3 bg-[#0B3D24]/90 backdrop-blur-xs text-white text-[11px] font-semibold px-3 py-1 rounded-md border border-white/20">
                Official Vetri Fabs Schematic
              </div>
            </div>
            
            <p className="text-[11px] text-[#66716A] text-center mt-2">
              Schematic shows typical modular construction: MS square pipe chassis, GI roof, hydraulic struts, and SS counter.
            </p>
          </div>

          {/* Right: Component Parts List */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <h3 className="text-base font-bold text-[#0B3D24] mb-3 flex items-center gap-2">
              <Layers className="w-4 h-4 text-[#16803C]" />
              <span>Standard Manufacturing Bill of Materials</span>
            </h3>

            <div className="space-y-2.5 max-h-[460px] overflow-y-auto pr-2">
              {ENGINEERING_COMPONENTS.map((item) => (
                <div
                  key={item.id}
                  className="p-2.5 rounded-xl bg-[#F7F9F7] border border-gray-200/90 hover:border-[#16803C]/40 hover:bg-[#EAF5EC]/40 transition-colors flex items-start gap-3"
                >
                  <span className="w-6 h-6 rounded-full bg-[#16803C] text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                    {item.id}
                  </span>
                  <div>
                    <h4 className="text-xs font-bold text-[#202923]">{item.name}</h4>
                    <p className="text-[11px] text-[#66716A] leading-relaxed">{item.material}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
              <span className="text-xs text-[#66716A]">Need custom chassis or thicker gauge?</span>
              <a
                href="#contact"
                className="text-xs font-bold text-[#16803C] hover:text-[#0B3D24] underline"
              >
                Discuss Custom Specs &rarr;
              </a>
            </div>
          </div>

        </div>

      </div>

      {/* Lightbox Modal for Diagram */}
      {lightboxOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setLightboxOpen(false)}
        >
          <div
            className="relative max-w-5xl w-full max-h-[90vh] bg-white rounded-2xl overflow-hidden p-2"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setLightboxOpen(false)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/70 text-white hover:bg-black transition-colors"
              aria-label="Close Diagram"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="relative aspect-[16/10] w-full bg-gray-900 rounded-xl overflow-hidden">
              <Image
                src="/images/engineering/exploded-view-diagram.jpg"
                alt="Vetri Fabs India Finished View and Exploded View Engineering Diagram"
                fill
                sizes="95vw"
                className="object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
