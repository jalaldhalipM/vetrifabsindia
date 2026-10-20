import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, ShieldCheck, Wrench, Building2, MapPin } from 'lucide-react';
import { COMPANY_CONFIG } from '@/data/company';

export default function AboutSection() {
  return (
    <section id="about" className="py-16 md:py-24 bg-white border-b border-gray-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left: Authentic Workshop Photo & Badges */}
          <div className="lg:col-span-5 relative">
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-gray-900 border border-gray-200 shadow-xl">
              <Image
                src="/images/engineering/craftsmen-fabrication.jpg"
                alt="Vetri Fabs India Chennai workshop fabrication"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-white/95 backdrop-blur-md border border-white/20 text-[#0B3D24] shadow-md flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#16803C] block">
                    Manufacturing Workshop
                  </span>
                  <span className="text-sm font-extrabold text-[#0B3D24]">
                    {COMPANY_CONFIG.address.area}, {COMPANY_CONFIG.address.city}
                  </span>
                </div>
                <div className="w-10 h-10 rounded-xl bg-[#EAF5EC] text-[#16803C] flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
              </div>
            </div>

            {/* Floating Experience Badge */}
            <div className="hidden sm:flex absolute -top-5 -left-5 bg-[#0B3D24] text-white p-4 rounded-2xl shadow-xl border border-emerald-800 items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#16803C] text-white flex items-center justify-center font-extrabold text-lg">
                VF
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-300 block">
                  Commercial Grade
                </span>
                <span className="text-sm font-extrabold text-white">
                  Heavy-Duty Fabrication
                </span>
              </div>
            </div>
          </div>

          {/* Right: Company Overview & Key Highlights */}
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EAF5EC] text-[#0B3D24] text-xs font-bold uppercase tracking-wider mb-4">
              <Building2 className="w-3.5 h-3.5 text-[#16803C]" />
              <span>About Vetri Fabs India</span>
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0B3D24] tracking-tight leading-tight mb-5">
              Chennai’s Trusted Food Truck & Mobile Kitchen Manufacturer
            </h2>

            <p className="text-sm sm:text-base text-[#66716A] leading-relaxed mb-6">
              Vetri Fabs India designs and fabricates commercial-grade food trucks, enclosed mobile food vans, and food carts built to withstand heavy daily use. We work with restaurant chains, street-food entrepreneurs, and catering companies across Tamil Nadu to transform raw vehicle chassis into high-revenue mobile kitchens.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-8 text-xs sm:text-sm text-[#202923]">
              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-[#F7F9F7] border border-gray-200">
                <ShieldCheck className="w-4 h-4 text-[#16803C] shrink-0" />
                <span className="font-semibold">Food-Grade SS 304 Countertops</span>
              </div>
              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-[#F7F9F7] border border-gray-200">
                <Wrench className="w-4 h-4 text-[#16803C] shrink-0" />
                <span className="font-semibold">Tata Ace & LCV Custom Conversions</span>
              </div>
              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-[#F7F9F7] border border-gray-200">
                <CheckCircle2 className="w-4 h-4 text-[#16803C] shrink-0" />
                <span className="font-semibold">Hydraulic Canopies & 230V Wiring</span>
              </div>
              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-[#F7F9F7] border border-gray-200">
                <CheckCircle2 className="w-4 h-4 text-[#16803C] shrink-0" />
                <span className="font-semibold">LPG Gas Line & Fire-Retardant Safety</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#16803C] hover:bg-[#0B3D24] text-white font-bold text-xs sm:text-sm rounded-xl transition-all shadow-sm hover:shadow active:scale-95"
              >
                <span>Read Full Company Story</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#F7F9F7] hover:bg-[#EAF5EC] text-[#0B3D24] font-bold text-xs sm:text-sm rounded-xl border border-gray-300 transition-colors"
              >
                <span>Visit Factory</span>
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
