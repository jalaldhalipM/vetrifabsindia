'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, MessageSquare } from 'lucide-react';
import { NAVIGATION_LINKS, getWhatsAppEnquiryUrl } from '@/data/company';

export default function Header() {


  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      id="main-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-md py-3 border-b border-gray-200'
          : 'bg-white py-4 border-b border-gray-100'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo / Brand Name */}
          <Link
            href="/"
            className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-[#16803C] rounded-lg p-1"
          >
            <div className="w-10 h-10 rounded-lg bg-[#0B3D24] text-white flex items-center justify-center font-bold text-xl shadow-inner group-hover:bg-[#16803C] transition-colors border-2 border-[#16803C]">
              VF
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-xl sm:text-2xl tracking-tight text-[#0B3D24] leading-none">
                VETRI FABS <span className="text-[#16803C]">INDIA</span>
              </span>
              <span className="text-[11px] font-medium tracking-wider text-[#66716A] uppercase mt-0.5">
                Food Carts & Commercial Trucks
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {NAVIGATION_LINKS.map((link) => {
              const isCurrent =
                link.href === '/'
                  ? pathname === '/'
                  : pathname.startsWith(link.href);

              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`px-3.5 py-2 text-sm font-semibold rounded-lg transition-colors ${
                    isCurrent
                      ? 'text-[#16803C] bg-[#EAF5EC]'
                      : 'text-[#202923] hover:text-[#16803C] hover:bg-[#EAF5EC]/60'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Right: WhatsApp Direct Chat */}
          <div className="hidden md:flex items-center space-x-3">
            <a
              href={getWhatsAppEnquiryUrl()}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Direct WhatsApp Enquiry"
              className="px-3.5 py-2 text-[#0B3D24] bg-[#EAF5EC] hover:bg-[#d8edd9] rounded-xl transition-all border border-[#16803C]/30 flex items-center gap-2 text-xs font-bold shadow-2xs hover:shadow-xs active:scale-95"
              title="Quick WhatsApp Chat"
            >
              <MessageSquare className="w-4 h-4 text-[#16803C]" />
              <span>WhatsApp Chat</span>
            </a>
          </div>

          {/* Mobile Hamburger & WhatsApp Button */}
          <div className="flex md:hidden items-center space-x-2">
            <a
              href={getWhatsAppEnquiryUrl()}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="p-2 text-[#16803C] bg-[#EAF5EC] rounded-lg border border-[#16803C]/20"
            >
              <MessageSquare className="w-5 h-5" />
            </a>
            <button
              type="button"
              id="mobile-menu-toggle"
              aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
              aria-expanded={mobileMenuOpen}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#202923] hover:text-[#16803C] hover:bg-[#EAF5EC] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#16803C]"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div
          id="mobile-menu-drawer"
          className="md:hidden bg-white border-b border-gray-200 px-4 pt-3 pb-6 shadow-xl animate-in slide-in-from-top-2 duration-200"
        >
          <div className="flex flex-col space-y-2">
            {NAVIGATION_LINKS.map((link) => {
              const isCurrent =
                link.href === '/'
                  ? pathname === '/'
                  : pathname.startsWith(link.href);

              return (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-3.5 py-2.5 rounded-xl text-base font-semibold transition-colors ${
                    isCurrent
                      ? 'text-[#16803C] bg-[#EAF5EC]'
                      : 'text-[#202923] hover:text-[#16803C] hover:bg-[#EAF5EC]'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}

            <div className="pt-4 border-t border-gray-100 flex flex-col gap-2.5">
              <a
                href={getWhatsAppEnquiryUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-[#16803C] hover:bg-[#0B3D24] text-white font-semibold text-center py-3 rounded-xl shadow-sm transition-colors flex items-center justify-center gap-2 text-sm"
              >
                <MessageSquare className="w-4 h-4 text-emerald-300" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
