'use client';

import React from 'react';
import { MessageSquare, ArrowRight, CheckCircle2 } from 'lucide-react';
import { COMPANY_CONFIG } from '@/data/company';

export default function CustomizationCTA() {
  const scrollToContact = () => {
    const el = document.querySelector('#contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative py-16 md:py-20 bg-[#0B3D24] text-white overflow-hidden">
      {/* Background subtle geometry */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#16803C_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />
      
      {/* Ambient gradient highlight */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#16803C]/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-[#16803C]/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-emerald-300 text-xs font-semibold mb-4 border border-white/10">
            <span>Tailored Manufacturing</span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white mb-4 leading-tight">
            Looking for a Food Cart Designed for Your Business?
          </h2>

          <p className="text-base sm:text-lg text-emerald-100/90 leading-relaxed mb-8">
            Tell us what you need. Our team can help you explore suitable food cart, truck, and van options tailored to your menu, location, and equipment.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              type="button"
              onClick={scrollToContact}
              className="w-full sm:w-auto bg-[#16803C] hover:bg-[#126630] text-white font-semibold text-base px-8 py-3.5 rounded-xl shadow-lg transition-all duration-200 flex items-center justify-center gap-2 group cursor-pointer active:scale-95 border border-emerald-400/20"
            >
              <span>Discuss Your Requirements</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>

            <a
              href={`https://wa.me/${COMPANY_CONFIG.whatsappNumber}?text=${encodeURIComponent(
                'Hello Vetri Fabs India, I would like to discuss my custom food cart requirements.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white font-semibold text-base px-6 py-3.5 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 border border-white/20"
            >
              <MessageSquare className="w-4 h-4 text-emerald-400" />
              <span>Direct WhatsApp Chat</span>
            </a>
          </div>

          {/* Consultation checklist */}
          <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-xs text-emerald-200/80">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              Custom Dimensions & Colors
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              Equipment Layout Planning
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              Transparent B2B Pricing
            </span>
          </div>

        </div>
      </div>
    </section>
  );
}
