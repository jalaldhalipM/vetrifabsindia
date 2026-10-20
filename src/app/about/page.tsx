import React from 'react';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import {
  ShieldCheck,
  Wrench,
  Flame,
  Award,
  Users,
  Building2,
  CheckCircle2,
  ArrowRight,
  MapPin,
  Clock,
  Sparkles,
} from 'lucide-react';
import { COMPANY_CONFIG } from '@/data/company';

export const metadata: Metadata = {
  title: 'About Us | Premier Food Truck Manufacturer in Chennai | Vetri Fabs India',
  description:
    'Learn about Vetri Fabs India, Chennai’s premier commercial food truck and mobile food cart manufacturer. Discover our manufacturing workshop, engineering standards, and custom fabrication capabilities.',
  openGraph: {
    title: 'About Vetri Fabs India | Food Truck & Kitchen Fabricators',
    description:
      'Discover Vetri Fabs India - manufacturing custom food trucks, high-roof mobile food vans, and food-grade stainless steel kitchen carts in Chennai.',
    images: ['/images/engineering/craftsmen-fabrication.jpg'],
    type: 'website',
  },
};

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#F7F9F7]">
      <Header />

      <main className="flex-1 pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumbs */}
          <Breadcrumbs items={[{ label: 'About Us' }]} />

          {/* Hero Section */}
          <div className="mt-4 mb-16 bg-white rounded-3xl border border-gray-200 overflow-hidden shadow-sm">
            <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
              <div className="p-8 sm:p-12 lg:col-span-7">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EAF5EC] text-[#0B3D24] text-xs font-bold uppercase tracking-wider mb-4">
                  <Sparkles className="w-3.5 h-3.5 text-[#16803C]" />
                  <span>Manufacturing Workshop • Chennai, India</span>
                </div>

                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0B3D24] tracking-tight leading-tight">
                  Crafting Commercial Food Vehicles with Engineering Precision
                </h1>

                <p className="mt-5 text-sm sm:text-base text-[#66716A] leading-relaxed">
                  Founded with a vision to empower restaurateurs and street-food entrepreneurs, <strong>Vetri Fabs India</strong> is a dedicated manufacturer of custom food trucks, enclosed mobile food vans, and food-grade stainless-steel commercial kitchens.
                </p>

                <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 gap-4 pt-6 border-t border-gray-100">
                  <div>
                    <span className="text-2xl sm:text-3xl font-extrabold text-[#0B3D24] block">100%</span>
                    <span className="text-xs text-[#66716A]">Custom Fabrication</span>
                  </div>
                  <div>
                    <span className="text-2xl sm:text-3xl font-extrabold text-[#16803C] block">SS 304</span>
                    <span className="text-xs text-[#66716A]">Food-Grade Steel</span>
                  </div>
                  <div>
                    <span className="text-2xl sm:text-3xl font-extrabold text-[#0B3D24] block">Chennai</span>
                    <span className="text-xs text-[#66716A]">Factory Workshop</span>
                  </div>
                </div>
              </div>

              <div className="relative aspect-[4/3] lg:aspect-auto lg:h-full lg:col-span-5 bg-gray-900 overflow-hidden">
                <Image
                  src="/images/engineering/craftsmen-fabrication.jpg"
                  alt="Vetri Fabs India craftsmen at work in Chennai factory"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  className="object-cover object-center"
                />
              </div>
            </div>
          </div>

          {/* Company Story & Mission */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <div className="bg-white rounded-3xl p-8 sm:p-10 border border-gray-200 shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#EAF5EC] text-[#16803C] flex items-center justify-center mb-5">
                  <Building2 className="w-6 h-6" />
                </div>
                <h2 className="text-2xl font-extrabold text-[#0B3D24] mb-4">
                  Our Manufacturing Workshop
                </h2>
                <p className="text-sm text-[#66716A] leading-relaxed mb-4">
                  Located in Periya Mathur, Chennai, our workshop is equipped with precision metal shears, hydraulic press brakes, argon TIG welding plants, and paint booths. Every commercial vehicle conversion undergoes structural stress analysis, weather seal testing, and kitchen ergonomics optimization.
                </p>
                <p className="text-sm text-[#66716A] leading-relaxed">
                  We don’t sell pre-packaged compromises. Every layout is drafted to match the specific culinary equipment, staff capacity, and power demands of our clients.
                </p>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-100 flex items-center gap-2 text-xs text-[#0B3D24] font-semibold">
                <MapPin className="w-4 h-4 text-[#16803C] shrink-0" />
                <span>{COMPANY_CONFIG.address.area}, {COMPANY_CONFIG.address.city}, Tamil Nadu</span>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-8 sm:p-10 border border-gray-200 shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#EAF5EC] text-[#16803C] flex items-center justify-center mb-5">
                  <Award className="w-6 h-6" />
                </div>
                <h2 className="text-2xl font-extrabold text-[#0B3D24] mb-4">
                  Our Mission & Values
                </h2>
                <ul className="space-y-3.5 text-sm text-[#202923]">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-5 h-5 text-[#16803C] shrink-0 mt-0.5" />
                    <span><strong>Transparent B2B Pricing:</strong> Clear breakdowns without hidden vendor commissions or inflated middleman fees.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-5 h-5 text-[#16803C] shrink-0 mt-0.5" />
                    <span><strong>Safety First:</strong> LPG gas line leak protection, fire-retardant wall insulation, and commercial circuit breakers.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-5 h-5 text-[#16803C] shrink-0 mt-0.5" />
                    <span><strong>Durability Guarantee:</strong> Heavy-gauge MS framework that resists highway vibration, rust, and tropical weather.</span>
                  </li>
                </ul>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-100 flex items-center gap-2 text-xs text-[#0B3D24] font-semibold">
                <Clock className="w-4 h-4 text-[#16803C] shrink-0" />
                <span>Monday – Saturday: 9:00 AM – 7:30 PM</span>
              </div>
            </div>
          </div>

          {/* 4 Pillars of Engineering Standards */}
          <div className="mb-16">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-xs font-bold text-[#16803C] uppercase tracking-wider block mb-2">
                Engineering Excellence
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B3D24]">
                How We Build Your Mobile Business
              </h2>
              <p className="mt-2 text-sm text-[#66716A]">
                Every food truck and cart leaves our shop tested for durability, safety, and operational speed.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-xs hover:border-[#16803C]/50 hover:shadow-md transition-all">
                <div className="w-10 h-10 rounded-xl bg-[#EAF5EC] text-[#16803C] flex items-center justify-center mb-4">
                  <Wrench className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-[#0B3D24] mb-2">
                  Structural MS Chassis
                </h3>
                <p className="text-xs text-[#66716A] leading-relaxed">
                  Heavy-gauge square tube skeleton with anti-rust primer and industrial enamel coating that withstands highway speeds and rough terrain.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-xs hover:border-[#16803C]/50 hover:shadow-md transition-all">
                <div className="w-10 h-10 rounded-xl bg-[#EAF5EC] text-[#16803C] flex items-center justify-center mb-4">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-[#0B3D24] mb-2">
                  Food-Grade SS 304
                </h3>
                <p className="text-xs text-[#66716A] leading-relaxed">
                  Preparation surfaces and countertops fabricated from authentic SS 304 stainless steel for hygiene, heat resistance, and easy sterilization.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-xs hover:border-[#16803C]/50 hover:shadow-md transition-all">
                <div className="w-10 h-10 rounded-xl bg-[#EAF5EC] text-[#16803C] flex items-center justify-center mb-4">
                  <Flame className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-[#0B3D24] mb-2">
                  Fire & Gas Safety
                </h3>
                <p className="text-xs text-[#66716A] leading-relaxed">
                  Isolated, ventilated LPG cylinder cages, fire-retardant ceramic wool thermal barriers, and heavy-gauge exhaust hoods with blower vents.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-xs hover:border-[#16803C]/50 hover:shadow-md transition-all">
                <div className="w-10 h-10 rounded-xl bg-[#EAF5EC] text-[#16803C] flex items-center justify-center mb-4">
                  <Users className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-[#0B3D24] mb-2">
                  Chef Ergonomics
                </h3>
                <p className="text-xs text-[#66716A] leading-relaxed">
                  Walk-in standing clearance up to 6&apos;5&quot;, anti-slip checkered aluminum flooring, and dual ordering & collection counter layout.
                </p>
              </div>
            </div>
          </div>

          {/* Workshop Showcase Banner */}
          <div className="relative rounded-3xl overflow-hidden bg-gray-900 border border-gray-200 mb-16 shadow-lg">
            <div className="relative aspect-[21/9] min-h-[300px]">
              <Image
                src="/images/engineering/truck-kitchen-interior.jpg"
                alt="Vetri Fabs India food truck kitchen interior build"
                fill
                sizes="100vw"
                className="object-cover opacity-40"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent flex items-center p-8 sm:p-14">
                <div className="max-w-xl text-white">
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 block mb-2">
                    Commercial Vehicle Body Conversions
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-4">
                    Ready to Build Your Mobile Food Venture?
                  </h2>
                  <p className="text-xs sm:text-sm text-gray-200 leading-relaxed mb-6">
                    Whether you have your own Tata Ace chassis or need a complete push cart manufactured from scratch, our team in Chennai is ready to consult on your layout.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <Link
                      href="/products"
                      className="px-6 py-3 bg-[#16803C] hover:bg-[#0B3D24] text-white font-bold text-xs sm:text-sm rounded-xl transition-all shadow-md flex items-center gap-2"
                    >
                      <span>Explore Product Catalogue</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                    <Link
                      href="/contact"
                      className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm rounded-xl transition-all border border-white/20"
                    >
                      Visit Our Factory
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
