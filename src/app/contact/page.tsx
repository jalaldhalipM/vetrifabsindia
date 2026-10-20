import React from 'react';
import { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import ContactForm from '@/components/ContactForm';
import { MapPin, Phone, Mail, MessageSquare, Sparkles } from 'lucide-react';

import { COMPANY_CONFIG, getWhatsAppEnquiryUrl } from '@/data/company';

export const metadata: Metadata = {
  title: 'Contact Us | Food Truck Manufacturer in Chennai | Vetri Fabs India',
  description:
    'Contact Vetri Fabs India in Chennai for custom food truck manufacturing, mobile food vans, and stainless steel kitchen carts. Direct factory consultation and WhatsApp enquiry.',
  openGraph: {
    title: 'Contact Vetri Fabs India | Chennai Workshop & Inquiries',
    description:
      'Get in touch with our fabrication engineers in Chennai. Discuss your mobile food truck layout, Tata Ace conversion, or custom cart project.',
    type: 'website',
  },
};

export default function ContactPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#F7F9F7]">
      <Header />

      <main className="flex-1 pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumbs */}
          <Breadcrumbs items={[{ label: 'Contact Us' }]} />

          {/* Page Title & Intro */}
          <div className="mt-4 mb-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EAF5EC] text-[#0B3D24] text-xs font-bold uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5 text-[#16803C]" />
              <span>Direct Manufacturer Consultation</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0B3D24] tracking-tight">
              Get in Touch with Our Workshop
            </h1>
            <p className="mt-3 text-sm sm:text-base text-[#66716A] max-w-2xl leading-relaxed">
              Have questions about vehicle chassis compatibility, kitchen ergonomics, or delivery timelines? Reach out directly to our engineering team in Chennai.
            </p>
          </div>

          {/* Quick Contact Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
            {/* Phone */}
            <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-xs flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-[#EAF5EC] text-[#16803C] flex items-center justify-center mb-3">
                  <Phone className="w-5 h-5" />
                </div>
                <span className="text-xs font-bold text-[#16803C] uppercase tracking-wider block mb-1">
                  Call Workshop
                </span>
                <p className="text-sm font-bold text-[#0B3D24]">
                  {COMPANY_CONFIG.displayPhone}
                </p>
              </div>
              <span className="text-[11px] text-[#66716A] mt-2 block">
                Direct engineer support
              </span>
            </div>

            {/* WhatsApp */}
            <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-xs flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-[#EAF5EC] text-[#16803C] flex items-center justify-center mb-3">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <span className="text-xs font-bold text-[#16803C] uppercase tracking-wider block mb-1">
                  Instant WhatsApp
                </span>
                <p className="text-sm font-bold text-[#0B3D24]">
                  +{COMPANY_CONFIG.whatsappNumber}
                </p>
              </div>
              <a
                href={getWhatsAppEnquiryUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] font-bold text-[#16803C] hover:underline mt-2 inline-block"
              >
                Chat on WhatsApp &rarr;
              </a>
            </div>

            {/* Email */}
            <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-xs flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-[#EAF5EC] text-[#16803C] flex items-center justify-center mb-3">
                  <Mail className="w-5 h-5" />
                </div>
                <span className="text-xs font-bold text-[#16803C] uppercase tracking-wider block mb-1">
                  Email Quotations
                </span>
                <p className="text-xs font-bold text-[#0B3D24] truncate">
                  {COMPANY_CONFIG.email}
                </p>
              </div>
              <span className="text-[11px] text-[#66716A] mt-2 block">
                Fast turnaround response
              </span>
            </div>

            {/* Factory Location */}
            <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-xs flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-[#EAF5EC] text-[#16803C] flex items-center justify-center mb-3">
                  <MapPin className="w-5 h-5" />
                </div>
                <span className="text-xs font-bold text-[#16803C] uppercase tracking-wider block mb-1">
                  Factory Location
                </span>
                <p className="text-xs font-bold text-[#0B3D24]">
                  {COMPANY_CONFIG.address.area}, {COMPANY_CONFIG.address.city}
                </p>
              </div>
              <span className="text-[11px] text-[#66716A] mt-2 block">
                Tamil Nadu, India
              </span>
            </div>
          </div>

          {/* Full Interactive Contact Form Section */}
          <div className="bg-white rounded-3xl border border-gray-200 overflow-hidden shadow-sm">
            <ContactForm />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
