'use client';

import React from 'react';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import FeaturedProducts from '@/components/FeaturedProducts';
import BenefitsSection from '@/components/BenefitsSection';
import GalleryPreview from '@/components/GalleryPreview';
import CustomizationCTA from '@/components/CustomizationCTA';
import Footer from '@/components/Footer';

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Sticky Header & Navigation */}
      <Header />

      {/* Main Page Content */}
      <main className="flex-1">
        {/* Hero Section */}
        <HeroSection />

        {/* About Us Overview Section */}
        <AboutSection />

        {/* Featured Popular Models Teaser */}
        <FeaturedProducts onRequestQuote={() => {}} />

        {/* Why Choose Vetri Fabs India */}
        <BenefitsSection />

        {/* Workshop & Field Photography Gallery Preview */}
        <GalleryPreview />

        {/* Customization Call-to-Action linking to /contact */}
        <CustomizationCTA />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
