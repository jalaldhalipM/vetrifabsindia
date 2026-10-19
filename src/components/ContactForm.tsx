'use client';

import React, { useState } from 'react';
import { Send, MessageSquare, Phone, Mail, MapPin, CheckCircle, AlertCircle, Sparkles, Building2 } from 'lucide-react';
import { COMPANY_CONFIG } from '@/data/company';
import { SAMPLE_PRODUCTS } from '@/data/products';
import { CATEGORIES } from '@/data/categories';

interface ContactFormProps {
  initialProduct?: string;
}

export default function ContactForm({ initialProduct = '' }: ContactFormProps) {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    productInterested: initialProduct,
    message: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedStatus, setSubmittedStatus] = useState<null | 'prototype_success'>(null);

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Please enter your full name.';
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName = 'Full name must be at least 2 characters.';
    }

    // Indian Phone format validation: 10 digits or with +91
    const cleanPhone = formData.phone.replace(/[\s\-()]/g, '');
    if (!formData.phone.trim()) {
      newErrors.phone = 'Please enter your contact phone number.';
    } else if (!/^(?:\+?91)?[6789]\d{9}$/.test(cleanPhone)) {
      newErrors.phone = 'Please enter a valid 10-digit Indian phone number.';
    }

    if (formData.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = 'Please provide a valid email address.';
    }

    if (!formData.productInterested) {
      newErrors.productInterested = 'Please select a product or category of interest.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    // Simulate validation and API dispatch delay
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmittedStatus('prototype_success');
    }, 800);
  };

  const handleWhatsAppDirect = () => {
    const text = `Hello Vetri Fabs India,
I am interested in custom fabrication:
• Name: ${formData.fullName || 'Prospective Client'}
• Product: ${formData.productInterested || 'General Enquiry'}
• Message: ${formData.message || 'I would like to discuss design options and pricing.'}`;

    window.open(
      `https://wa.me/${COMPANY_CONFIG.whatsappNumber}?text=${encodeURIComponent(text)}`,
      '_blank'
    );
  };

  return (
    <section id="contact" className="py-16 md:py-24 bg-[#F7F9F7] border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EAF5EC] text-[#0B3D24] text-xs font-bold uppercase tracking-wider mb-3">
            <span>Direct Commercial Quotations</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0B3D24] tracking-tight">
            Let’s Build Your Food Business Setup
          </h2>
          <p className="mt-3 text-base sm:text-lg text-[#66716A]">
            Discuss your food cart, food van, or truck fabrication with our technical team.
          </p>
        </div>

        {/* 2-Column Split: Form & Contact Info */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Left Column: Form */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-2xl border border-gray-200 shadow-sm">
            
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-gray-100">
              <div>
                <h3 className="text-lg font-bold text-[#0B3D24]">Send a Product Enquiry</h3>
                <p className="text-xs text-[#66716A]">Fill in your details for custom fabrication advice</p>
              </div>
              <span className="text-[11px] font-semibold text-[#16803C] bg-[#EAF5EC] px-2.5 py-1 rounded-md">
                No Obligation Quote
              </span>
            </div>

            {submittedStatus === 'prototype_success' ? (
              <div className="p-6 bg-[#EAF5EC] rounded-xl border border-[#16803C]/30 text-center animate-in fade-in duration-300">
                <div className="w-12 h-12 rounded-full bg-[#16803C] text-white flex items-center justify-center mx-auto mb-3">
                  <CheckCircle className="w-6 h-6" />
                </div>
                <h4 className="text-lg font-bold text-[#0B3D24] mb-1">
                  Enquiry Form Validated!
                </h4>
                <p className="text-xs sm:text-sm text-[#202923] mb-4 max-w-md mx-auto">
                  <strong>Frontend Prototype Notice:</strong> Your enquiry payload has been formatted and validated for the upcoming Supabase backend integration.
                </p>

                <div className="p-3 bg-white rounded-lg border border-gray-200 text-left text-xs space-y-1 mb-4 text-[#202923]">
                  <div><strong>Name:</strong> {formData.fullName}</div>
                  <div><strong>Phone:</strong> {formData.phone}</div>
                  <div><strong>Product:</strong> {formData.productInterested}</div>
                  {formData.message && <div><strong>Message:</strong> {formData.message}</div>}
                </div>

                <div className="flex flex-col sm:flex-row gap-2 justify-center">
                  <button
                    type="button"
                    onClick={handleWhatsAppDirect}
                    className="bg-[#16803C] hover:bg-[#0B3D24] text-white font-semibold text-xs px-4 py-2.5 rounded-lg flex items-center justify-center gap-1.5"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Send this on WhatsApp to Vetri Fabs</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setSubmittedStatus(null);
                      setFormData({ fullName: '', phone: '', email: '', productInterested: '', message: '' });
                    }}
                    className="bg-white text-[#202923] border border-gray-300 hover:bg-gray-50 text-xs font-semibold px-4 py-2.5 rounded-lg"
                  >
                    Submit Another Enquiry
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-4">
                
                {/* Full Name */}
                <div>
                  <label htmlFor="fullName" className="block text-xs font-bold text-[#202923] uppercase tracking-wider mb-1">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="Enter your name"
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-sm text-[#202923] bg-[#F7F9F7] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#16803C] transition-colors ${
                      errors.fullName ? 'border-red-400 bg-red-50/20' : 'border-gray-200'
                    }`}
                  />
                  {errors.fullName && (
                    <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" /> {errors.fullName}
                    </p>
                  )}
                </div>

                {/* Phone & Email Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="phone" className="block text-xs font-bold text-[#202923] uppercase tracking-wider mb-1">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="e.g. 9876543210"
                      className={`w-full px-3.5 py-2.5 rounded-xl border text-sm text-[#202923] bg-[#F7F9F7] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#16803C] transition-colors ${
                        errors.phone ? 'border-red-400 bg-red-50/20' : 'border-gray-200'
                      }`}
                    />
                    {errors.phone && (
                      <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" /> {errors.phone}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-xs font-bold text-[#202923] uppercase tracking-wider mb-1">
                      Email Address <span className="text-[#66716A] text-[11px] font-normal">(Optional)</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. business@example.com"
                      className={`w-full px-3.5 py-2.5 rounded-xl border text-sm text-[#202923] bg-[#F7F9F7] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#16803C] transition-colors ${
                        errors.email ? 'border-red-400 bg-red-50/20' : 'border-gray-200'
                      }`}
                    />
                    {errors.email && (
                      <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" /> {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                {/* Product Interested In */}
                <div>
                  <label htmlFor="productInterested" className="block text-xs font-bold text-[#202923] uppercase tracking-wider mb-1">
                    Product Interested In <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="productInterested"
                    value={formData.productInterested}
                    onChange={(e) => setFormData({ ...formData, productInterested: e.target.value })}
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-sm text-[#202923] bg-[#F7F9F7] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#16803C] transition-colors ${
                      errors.productInterested ? 'border-red-400 bg-red-50/20' : 'border-gray-200'
                    }`}
                  >
                    <option value="">-- Select Product or Category --</option>
                    <optgroup label="Specific Product Models">
                      {SAMPLE_PRODUCTS.map((p) => (
                        <option key={p.id} value={p.title}>
                          {p.title}
                        </option>
                      ))}
                    </optgroup>
                    <optgroup label="Broad Categories">
                      {CATEGORIES.map((c) => (
                        <option key={c.id} value={`Category: ${c.name}`}>
                          {c.name} (General Enquiry)
                        </option>
                      ))}
                      <option value="Custom Chassis / Bespoke Design">
                        Custom Chassis / Bespoke Vehicle Design
                      </option>
                    </optgroup>
                  </select>
                  {errors.productInterested && (
                    <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" /> {errors.productInterested}
                    </p>
                  )}
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block text-xs font-bold text-[#202923] uppercase tracking-wider mb-1">
                    Your Requirements / Cuisine / Dimensions <span className="text-[#66716A] text-[11px] font-normal">(Optional)</span>
                  </label>
                  <textarea
                    id="message"
                    rows={3}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us about your cuisine, kitchen appliances (e.g. tandoor, fryer, coffee machine), preferred dimensions, or vehicle chassis..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm text-[#202923] bg-[#F7F9F7] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#16803C] transition-colors resize-none"
                  />
                </div>

                {/* Action Buttons */}
                <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:flex-1 bg-[#16803C] hover:bg-[#0B3D24] text-white font-semibold text-sm py-3 px-6 rounded-xl shadow-sm hover:shadow transition-colors flex items-center justify-center gap-2 cursor-pointer active:scale-95 disabled:opacity-70"
                  >
                    <Send className="w-4 h-4" />
                    <span>{isSubmitting ? 'Validating...' : 'Submit Enquiry'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleWhatsAppDirect}
                    className="w-full sm:w-auto bg-[#EAF5EC] hover:bg-[#d8edd9] text-[#0B3D24] border border-[#16803C]/30 font-semibold text-sm py-3 px-5 rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <MessageSquare className="w-4 h-4 text-[#16803C]" />
                    <span>Enquire via WhatsApp</span>
                  </button>
                </div>

                <div className="text-[11px] text-[#66716A] text-center pt-2">
                  <span>Direct enquiry dispatched to Vetri Fabs manufacturing desk.</span>
                </div>

              </form>
            )}

          </div>

          {/* Right Column: Contact & Workshop Information */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            
            {/* Quick Contact Card */}
            <div className="bg-white p-6 sm:p-7 rounded-2xl border border-gray-200 shadow-sm">
              <h3 className="text-base font-bold text-[#0B3D24] mb-4 flex items-center gap-2">
                <Building2 className="w-4 h-4 text-[#16803C]" />
                <span>Manufacturing Desk</span>
              </h3>

              <div className="space-y-4 text-xs sm:text-sm text-[#202923]">
                {/* Location */}
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#EAF5EC] flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4 text-[#16803C]" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#0B3D24]">Workshop Location</h4>
                    <p className="text-[#66716A] text-xs leading-relaxed">
                      {COMPANY_CONFIG.address.area}, {COMPANY_CONFIG.address.city}, {COMPANY_CONFIG.address.state}, {COMPANY_CONFIG.address.country}
                    </p>
                    <span className="text-[10px] text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200 inline-block mt-0.5">
                      Client confirmation placeholder
                    </span>
                  </div>
                </div>

                {/* Direct WhatsApp */}
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#EAF5EC] flex items-center justify-center shrink-0">
                    <MessageSquare className="w-4 h-4 text-[#16803C]" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#0B3D24]">Instant WhatsApp Chat</h4>
                    <p className="text-[#66716A] text-xs">Direct messaging for quote consultations</p>
                    <a
                      href={`https://wa.me/${COMPANY_CONFIG.whatsappNumber}?text=${encodeURIComponent(
                        'Hello Vetri Fabs India, I would like to enquire about your custom food carts and trucks.'
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#16803C] hover:underline font-bold text-xs inline-block mt-0.5"
                    >
                      Open WhatsApp (+{COMPANY_CONFIG.whatsappNumber}) &rarr;
                    </a>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#EAF5EC] flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4 text-[#16803C]" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#0B3D24]">Phone Contact</h4>
                    <p className="text-[#66716A] text-xs">{COMPANY_CONFIG.displayPhone}</p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#EAF5EC] flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4 text-[#16803C]" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#0B3D24]">Email Enquiry</h4>
                    <p className="text-[#66716A] text-xs">{COMPANY_CONFIG.email}</p>
                  </div>
                </div>
              </div>

            </div>

            {/* What to expect card */}
            <div className="bg-[#0B3D24] text-white p-6 sm:p-7 rounded-2xl relative overflow-hidden">
              <div className="relative z-10">
                <h4 className="font-bold text-sm sm:text-base text-white mb-2 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-emerald-400" />
                  <span>Custom Fabrication Process</span>
                </h4>
                <ol className="space-y-2 text-xs text-emerald-100/90 list-decimal list-inside leading-relaxed">
                  <li>Share your menu, cooking equipment & power needs.</li>
                  <li>We recommend suitable chassis, body sizing & layout.</li>
                  <li>Review 3D/exploded fabrication schematics & bill of materials.</li>
                  <li>Workshop assembly, testing & delivery coordination.</li>
                </ol>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
