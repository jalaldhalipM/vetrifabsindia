'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Menu, X, MessageSquare, ChevronRight } from 'lucide-react';
import { NAVIGATION_LINKS, getWhatsAppEnquiryUrl } from '@/data/company';


interface HeaderProps {
  onOpenQuoteModal?: (productName?: string) => void;
}

export default function Header({ onOpenQuoteModal }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href: string, e?: React.MouseEvent) => {
    setMobileMenuOpen(false);

    // If it's an anchor hash or root anchor
    if (href.startsWith('/#') || href.startsWith('#')) {
      const hash = href.replace('/#', '#');
      if (pathname === '/') {
        if (e) e.preventDefault();
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      } else {
        // Navigate back to homepage anchor
        router.push(href);
      }
    }
  };

  const handleQuoteClick = (e: React.MouseEvent) => {
    if (onOpenQuoteModal) {
      e.preventDefault();
      onOpenQuoteModal();
    } else if (pathname === '/') {
      e.preventDefault();
      handleNavClick('/#contact');
    } else {
      router.push('/#contact');
    }
  };

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
                link.href === '/products'
                  ? pathname.startsWith('/products')
                  : link.href === '/'
                  ? pathname === '/'
                  : false;

              if (link.href.startsWith('/#') || link.href.startsWith('#')) {
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={(e) => handleNavClick(link.href, e)}
                    className="px-3 py-2 text-sm font-semibold text-[#202923] hover:text-[#16803C] rounded-md transition-colors hover:bg-[#EAF5EC]/60"
                  >
                    {link.label}
                  </a>
                );
              }

              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`px-3 py-2 text-sm font-semibold rounded-md transition-colors ${
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

          {/* Desktop Right CTA */}
          <div className="hidden md:flex items-center space-x-3">
            <a
              href={getWhatsAppEnquiryUrl()}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Direct WhatsApp Enquiry"
              className="p-2 text-[#16803C] hover:bg-[#EAF5EC] rounded-lg transition-colors border border-[#16803C]/30 flex items-center gap-1.5 text-xs font-semibold"
              title="Quick WhatsApp Chat"
            >
              <MessageSquare className="w-4 h-4 text-[#16803C]" />
              <span className="hidden xl:inline">WhatsApp</span>
            </a>

            <button
              type="button"
              onClick={handleQuoteClick}
              className="bg-[#16803C] hover:bg-[#0B3D24] text-white font-semibold text-sm px-5 py-2.5 rounded-lg shadow-sm hover:shadow transition-all duration-200 flex items-center gap-1.5 active:scale-95 cursor-pointer"
            >
              <span>Get a Quote</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex md:hidden items-center space-x-2">
            <button
              type="button"
              onClick={handleQuoteClick}
              className="bg-[#16803C] text-white font-medium text-xs px-3 py-1.5 rounded-md"
            >
              Quote
            </button>
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
              if (link.href.startsWith('/#') || link.href.startsWith('#')) {
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={(e) => handleNavClick(link.href, e)}
                    className="px-3 py-2.5 rounded-md text-base font-semibold text-[#202923] hover:text-[#16803C] hover:bg-[#EAF5EC] transition-colors"
                  >
                    {link.label}
                  </a>
                );
              }
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2.5 rounded-md text-base font-semibold text-[#202923] hover:text-[#16803C] hover:bg-[#EAF5EC] transition-colors"
                >
                  {link.label}
                </Link>
              );
            })}

            <div className="pt-4 border-t border-gray-100 flex flex-col gap-2.5">
              <button
                type="button"
                onClick={handleQuoteClick}
                className="w-full bg-[#16803C] hover:bg-[#0B3D24] text-white font-semibold text-center py-3 rounded-lg shadow-sm transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Request a Quote</span>
                <ChevronRight className="w-4 h-4" />
              </button>

              <a
                href={getWhatsAppEnquiryUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-[#EAF5EC] hover:bg-[#d8edd9] text-[#0B3D24] font-semibold text-center py-2.5 rounded-lg border border-[#16803C]/30 transition-colors flex items-center justify-center gap-2 text-sm"
              >
                <MessageSquare className="w-4 h-4 text-[#16803C]" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
