'use client';

import React from 'react';
import { MessageSquare, Phone, Mail, ArrowUp } from 'lucide-react';
import { COMPANY_CONFIG, NAVIGATION_LINKS } from '@/data/company';
import { CATEGORIES } from '@/data/categories';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavClick = (href: string) => {
    if (href.startsWith('#')) {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-[#0B3D24] text-white border-t border-emerald-950">
      
      {/* Main Footer Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10">
          
          {/* Col 1: Brand & Bio (4 cols) */}
          <div className="lg:col-span-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-[#16803C] text-white flex items-center justify-center font-bold text-xl border border-emerald-400/30">
                VF
              </div>
              <div>
                <span className="font-extrabold text-xl tracking-tight text-white leading-none block">
                  VETRI FABS <span className="text-emerald-400">INDIA</span>
                </span>
                <span className="text-[11px] font-medium tracking-wider text-emerald-200/70 uppercase">
                  Custom Mobile Food Units
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-emerald-100/80 leading-relaxed mb-5">
              Manufacturer of customized food carts, mobile food trucks, high-roof food vans, and food-grade stainless-steel commercial setups based in Chennai, India.
            </p>

            <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-xs text-emerald-200/80">
              <span className="font-semibold text-white block mb-0.5">Custom Fabrication Workshop:</span>
              <span>{COMPANY_CONFIG.address.area}, {COMPANY_CONFIG.address.city}, Tamil Nadu</span>
              <span className="text-[10px] text-amber-300 block mt-1">
                * Official registered address subject to client verification
              </span>
            </div>
          </div>

          {/* Col 2: Quick Links (2 cols) */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-4">
              Quick Navigation
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              {NAVIGATION_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(link.href);
                    }}
                    className="text-emerald-100/80 hover:text-white hover:underline transition-colors block py-0.5"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Product Categories (3 cols) */}
          <div className="lg:col-span-3">
            <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-4">
              Product Categories
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              {CATEGORIES.map((cat) => (
                <li key={cat.id}>
                  <a
                    href="#products"
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick('#products');
                    }}
                    className="text-emerald-100/80 hover:text-white transition-colors block py-0.5"
                  >
                    {cat.name}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="#engineering"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick('#engineering');
                  }}
                  className="text-emerald-400 hover:text-white transition-colors block py-0.5 font-medium"
                >
                  Exploded View Specs &rarr;
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact & Direct Inquiries (3 cols) */}
          <div className="lg:col-span-3">
            <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-4">
              Connect With Us
            </h4>
            
            <div className="space-y-3 text-xs text-emerald-100/80">
              <a
                href={`https://wa.me/${COMPANY_CONFIG.whatsappNumber}?text=${encodeURIComponent(
                  'Hello Vetri Fabs India, I would like to enquire about your products.'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-[#16803C] hover:bg-[#136e34] text-white font-semibold flex items-center justify-center gap-2 transition-colors"
              >
                <MessageSquare className="w-4 h-4 text-emerald-300" />
                <span>WhatsApp Enquiry</span>
              </a>

              <div className="flex items-center gap-2 pt-1 text-[11px]">
                <Phone className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>{COMPANY_CONFIG.displayPhone}</span>
              </div>

              <div className="flex items-center gap-2 text-[11px]">
                <Mail className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span className="truncate">{COMPANY_CONFIG.email}</span>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-white/10 text-[10px] text-emerald-300/70">
              <span>* Configurable contact placeholders awaiting Vetri Fabs official sign-off.</span>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Disclaimer & Copyright */}
        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-emerald-200/70">
          <div className="text-center sm:text-left">
            <p>© 2026 Vetri Fabs India. All rights reserved.</p>
            <p className="text-[11px] text-emerald-300/60 mt-0.5">
              Custom Food Carts, Mobile Food Trucks & Commercial Vehicle Body Fabrications.
            </p>
          </div>

          <button
            type="button"
            onClick={scrollToTop}
            aria-label="Scroll back to top"
            className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors flex items-center gap-1.5 text-xs font-semibold cursor-pointer"
          >
            <span>Back to top</span>
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>

      </div>

    </footer>
  );
}
