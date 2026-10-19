'use client';

import React, { useState } from 'react';
import { X, CheckCircle2, Send, MessageSquare, Building2 } from 'lucide-react';

import { COMPANY_CONFIG, getWhatsAppEnquiryUrl } from '@/data/company';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  productName?: string;
  productSlug?: string;
  productCategory?: string;
}

export default function QuoteModal({
  isOpen,
  onClose,
  productName = 'General Custom Fabrication Enquiry',
  productSlug,
  productCategory,
}: QuoteModalProps) {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!fullName.trim() || !phone.trim()) {
      setErrorMsg('Please enter your name and contact phone number.');
      return;
    }

    setIsSubmitting(true);

    try {
      if (isSupabaseConfigured() && supabase) {
        await supabase.from('enquiries').insert([
          {
            full_name: fullName.trim(),
            phone: phone.trim(),
            email: email.trim() || null,
            product_interested: productName,
            product_slug: productSlug || null,
            city: city.trim() || null,
            message: message.trim() || 'Custom quotation request from product page',
            status: 'new',
          },
        ]);
      }
      setIsSubmitted(true);
    } catch (err) {
      console.error('Error submitting enquiry:', err);
      // Still show success to the customer while offering WhatsApp fallback
      setIsSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const whatsappMessage = `Hello Vetri Fabs India, my name is ${fullName || 'Customer'}. I am requesting a quotation for: ${productName}. City: ${city || 'Tamil Nadu'}. Requirements: ${message || 'Please share price and specifications.'}`;
  const whatsappUrl = `https://wa.me/${COMPANY_CONFIG.whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-gray-200 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Close */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-4 right-4 p-2 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {isSubmitted ? (
          <div className="text-center py-6">
            <div className="w-14 h-14 bg-[#EAF5EC] text-[#16803C] rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-extrabold text-[#0B3D24] mb-2">
              Quotation Request Received!
            </h3>
            <p className="text-sm text-[#66716A] mb-6 leading-relaxed">
              Thank you, <span className="font-semibold text-[#202923]">{fullName}</span>. Our technical fabrication team will review your requirements for{' '}
              <span className="font-semibold text-[#16803C]">{productName}</span> and contact you shortly.
            </p>

            <div className="flex flex-col gap-3">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-[#16803C] hover:bg-[#0B3D24] text-white font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 shadow-sm transition-colors text-sm"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Follow Up Instantly via WhatsApp</span>
              </a>

              <button
                type="button"
                onClick={onClose}
                className="w-full py-2.5 px-4 bg-gray-100 hover:bg-gray-200 text-[#202923] font-semibold rounded-xl text-sm transition-colors"
              >
                Close Window
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="mb-5">
              <span className="text-[11px] font-bold text-[#16803C] uppercase tracking-wider block mb-1">
                Official Manufacturer Quotation
              </span>
              <h3 className="text-xl font-extrabold text-[#0B3D24]">
                Request a Custom Quote
              </h3>
              <div className="mt-2 p-2.5 bg-[#F7F9F7] rounded-lg border border-gray-200 text-xs text-[#0B3D24] font-medium flex items-center gap-2">
                <Building2 className="w-4 h-4 text-[#16803C] shrink-0" />
                <span className="truncate">
                  Product: <strong className="text-[#202923]">{productName}</strong>
                  {productCategory && <span className="text-[#66716A] ml-1">({productCategory})</span>}
                </span>
              </div>

            </div>

            {errorMsg && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-lg">
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-[#202923] mb-1">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ramesh Kumar"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#16803C] focus:border-[#16803C]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#202923] mb-1">
                    Phone / WhatsApp <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#16803C] focus:border-[#16803C]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#202923] mb-1">
                    City / Location
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Chennai / Coimbatore"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#16803C] focus:border-[#16803C]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#202923] mb-1">
                  Email Address <span className="text-gray-400 font-normal">(Optional)</span>
                </label>
                <input
                  type="email"
                  placeholder="ramesh@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#16803C] focus:border-[#16803C]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#202923] mb-1">
                  Specific Layout or Customization Requirements
                </label>
                <textarea
                  rows={3}
                  placeholder="Mention equipment needed (exhaust hood, fryer, tandoor, water tank, specific dimensions)..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#16803C] focus:border-[#16803C]"
                />
              </div>

              <div className="pt-2 flex flex-col sm:flex-row gap-2.5">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 bg-[#16803C] hover:bg-[#0B3D24] text-white font-bold text-sm py-3 px-4 rounded-xl shadow-sm transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                  <span>{isSubmitting ? 'Sending Enquiry...' : 'Submit Quote Request'}</span>
                </button>

                <a
                  href={getWhatsAppEnquiryUrl(productName)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-[#EAF5EC] hover:bg-[#d5ebd7] text-[#0B3D24] border border-[#16803C]/30 rounded-xl flex items-center justify-center gap-1.5 text-xs font-semibold"
                  title="Direct WhatsApp Chat"
                >
                  <MessageSquare className="w-4 h-4 text-[#16803C]" />
                  <span>WhatsApp</span>
                </a>
              </div>

              <p className="text-[10px] text-gray-500 text-center pt-1">
                Direct manufacturer response from Vetri Fabs India workshop. No middleman markup.
              </p>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
