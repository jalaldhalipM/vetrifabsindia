'use client';

import React from 'react';
import { Wrench, LayoutGrid, Truck, MessageSquareText, CheckCircle } from 'lucide-react';
import { BENEFITS } from '@/data/benefits';

export default function BenefitsSection() {
  const getIcon = (name: string) => {
    switch (name) {
      case 'Wrench':
        return <Wrench className="w-6 h-6 text-[#16803C]" />;
      case 'LayoutGrid':
        return <LayoutGrid className="w-6 h-6 text-[#16803C]" />;
      case 'Truck':
        return <Truck className="w-6 h-6 text-[#16803C]" />;
      case 'MessageSquareText':
        return <MessageSquareText className="w-6 h-6 text-[#16803C]" />;
      default:
        return <CheckCircle className="w-6 h-6 text-[#16803C]" />;
    }
  };

  return (
    <section id="about-us" className="py-16 md:py-24 bg-[#F7F9F7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EAF5EC] text-[#0B3D24] text-xs font-bold uppercase tracking-wider mb-3">
            <span>Our Approach</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0B3D24] tracking-tight">
            Built Around Your Business Needs
          </h2>
          <p className="mt-3 text-base sm:text-lg text-[#66716A]">
            Practical manufacturing focused on durability, functional food prep layouts, and direct consultation for food entrepreneurs.
          </p>
        </div>

        {/* 4-Column Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {BENEFITS.map((benefit, index) => (
            <div
              key={benefit.id}
              className="bg-white rounded-2xl p-6 sm:p-7 border border-gray-200/90 shadow-sm hover:shadow-md hover:border-[#16803C]/40 transition-all duration-200 flex flex-col"
            >
              <div className="w-12 h-12 rounded-xl bg-[#EAF5EC] flex items-center justify-center mb-5 shrink-0">
                {getIcon(benefit.iconName)}
              </div>
              
              <div className="text-xs font-bold text-[#16803C] uppercase tracking-wider mb-1">
                Value Pillar 0{index + 1}
              </div>

              <h3 className="text-lg font-bold text-[#0B3D24] mb-2 leading-snug">
                {benefit.title}
              </h3>

              <p className="text-sm text-[#66716A] leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>

        {/* Responsible Industrial Manufacturing Note */}
        <div className="mt-12 p-4 sm:p-5 rounded-xl bg-white border border-gray-200 text-xs sm:text-sm text-[#66716A] flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <span>
            <strong className="text-[#0B3D24]">Manufacturing Note:</strong> All carts and vehicle bodies are fabricated to order. Specific dimensions, metal gauges, and electrical systems are planned based on your kitchen appliances and cooking method.
          </span>
          <a
            href="#contact"
            className="text-[#16803C] hover:text-[#0B3D24] font-semibold whitespace-nowrap underline"
          >
            Schedule Consultation &rarr;
          </a>
        </div>

      </div>
    </section>
  );
}
