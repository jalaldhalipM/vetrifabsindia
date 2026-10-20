'use client';

import React from 'react';
import Link from 'next/link';
import { MessageSquare, Phone, Mail, ArrowUp, Lock } from 'lucide-react';
import { COMPANY_CONFIG, NAVIGATION_LINKS, getWhatsAppEnquiryUrl } from '@/data/company';
import { CATEGORIES } from '@/data/categories';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0B3D24] text-white border-t border-emerald-950">
      {/* Main Footer Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10">
          
          {/* Col 1: Brand & Bio (4 cols) */}
          <div className="lg:col-span-4">
            <Link href="/" className="flex items-center gap-3 mb-4 inline-flex">
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
            </Link>

            <p className="text-xs sm:text-sm text-emerald-100/80 leading-relaxed mb-5">
              Premier manufacturer of customized food trucks, mobile push carts, walk-in high-roof food vans, and commercial stainless steel kitchen fabrication based in Chennai, India.
            </p>

            <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 text-xs text-emerald-200/80">
              <span className="font-semibold text-white block mb-0.5">Manufacturing Workshop & Factory:</span>
              <span>{COMPANY_CONFIG.address.area}, {COMPANY_CONFIG.address.city}, Tamil Nadu</span>
            </div>
          </div>

          {/* Col 2: Quick Links (2 cols) */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-4">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              {NAVIGATION_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-emerald-100/80 hover:text-white hover:underline transition-colors block py-0.5"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Product Categories (3 cols) */}
          <div className="lg:col-span-3">
            <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-4">
              Catalogue Categories
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              {CATEGORIES.map((cat) => (
                <li key={cat.id}>
                  <Link
                    href={`/products/${cat.slug}`}
                    className="text-emerald-100/80 hover:text-white transition-colors block py-0.5"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/about"
                  className="text-emerald-400 hover:text-white transition-colors block py-0.5 font-medium"
                >
                  Our Workshop & Standards &rarr;
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact & Direct Inquiries (3 cols) */}
          <div className="lg:col-span-3">
            <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-4">
              Direct Contact
            </h4>
            
            <div className="space-y-3 text-xs text-emerald-100/80">
              <a
                href={getWhatsAppEnquiryUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-xl bg-[#16803C] hover:bg-[#136e34] text-white font-bold flex items-center justify-center gap-2 transition-colors shadow-sm"
              >
                <MessageSquare className="w-4 h-4 text-emerald-300" />
                <span>Chat on WhatsApp</span>
              </a>

              <div className="flex items-center gap-2 pt-1 text-xs">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{COMPANY_CONFIG.displayPhone}</span>
              </div>

              <div className="flex items-center gap-2 text-xs">
                <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="truncate">{COMPANY_CONFIG.email}</span>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-white/10 text-[11px] text-emerald-300/80">
              <Link href="/contact" className="hover:underline flex items-center gap-1 text-emerald-300 font-semibold">
                <span>View Full Contact & Location &rarr;</span>
              </Link>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Disclaimer & Copyright */}
        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-emerald-200/70">
          <div className="text-center sm:text-left">
            <p>© 2026 Vetri Fabs India. All rights reserved.</p>
            <p className="text-[11px] text-emerald-300/60 mt-0.5">
              Custom Commercial Food Trucks, Food Vans & Stainless Steel Fabrications.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Admin Lock Icon */}
            <Link
              href="/admin/login"
              aria-label="Admin Panel"
              title="Admin Login"
              className="p-2.5 rounded-xl transition-all duration-200 group"
              style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)' }}
            >
              <Lock className="w-3.5 h-3.5 text-emerald-300/40 group-hover:text-emerald-400 transition-colors" />
            </Link>

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

      </div>
    </footer>
  );
}
