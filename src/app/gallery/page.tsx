import React from 'react';
import { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import GalleryClient from './GalleryClient';
import { Camera } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Work Gallery & Field Photography | Food Trucks & Carts | Vetri Fabs India',
  description:
    'Browse authentic workshop and field photographs of custom food trucks, high-roof mobile food vans, and food carts manufactured by Vetri Fabs India in Chennai.',
  openGraph: {
    title: 'Work Gallery | Vetri Fabs India Food Trucks & Mobile Carts',
    description:
      'View real client projects manufactured by Vetri Fabs India, including Tata Ace conversions, illuminated kiosks, and SS banquet counters.',
    images: ['/images/gallery/gallery-peacepoint-night.jpg'],
    type: 'website',
  },
};

export default function GalleryPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#F7F9F7]">
      <Header />

      <main className="flex-1 pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumbs */}
          <Breadcrumbs items={[{ label: 'Project Gallery' }]} />

          {/* Page Title & Intro */}
          <div className="mt-4 mb-8">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EAF5EC] text-[#0B3D24] text-xs font-bold uppercase tracking-wider mb-3">
              <Camera className="w-3.5 h-3.5 text-[#16803C]" />
              <span>Workshop & Field Photography</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0B3D24] tracking-tight">
              Our Fabricated Units in Action
            </h1>
            <p className="mt-3 text-sm sm:text-base text-[#66716A] max-w-2xl leading-relaxed">
              Explore authentic photographs of custom food trucks, mobile push carts, walk-in kitchens, and stainless-steel setups built at our Chennai workshop.
            </p>
          </div>

          {/* Interactive Filterable Gallery Grid */}
          <GalleryClient />
        </div>
      </main>

      <Footer />
    </div>
  );
}
