'use client';

import React, { useState } from 'react';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import ProductCategories from '@/components/ProductCategories';
import BenefitsSection from '@/components/BenefitsSection';
import EngineeringShowcase from '@/components/EngineeringShowcase';
import FeaturedProducts from '@/components/FeaturedProducts';
import CustomizationCTA from '@/components/CustomizationCTA';
import GalleryPreview from '@/components/GalleryPreview';
import ContactForm from '@/components/ContactForm';
import Footer from '@/components/Footer';

export default function HomePage() {
  const [selectedProductForQuote, setSelectedProductForQuote] = useState<string>('');
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string>('all');

  const handleRequestQuote = (productName: string) => {
    setSelectedProductForQuote(productName);
    const contactSection = document.querySelector('#contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectCategory = (categoryId: string) => {
    setActiveCategoryFilter(categoryId);
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Sticky Header & Navigation */}
      <Header onOpenQuoteModal={() => handleRequestQuote('General Quotation Request')} />

      {/* Main Page Content */}
      <main className="flex-1">
        {/* Section 2: Hero Section */}
        <HeroSection />

        {/* Section 3: Product Categories */}
        <ProductCategories onSelectCategory={handleSelectCategory} />

        {/* Section 4: Why Choose Vetri Fabs India (Benefits) */}
        <BenefitsSection />

        {/* Section 4.5: Engineering & Manufacturing Standards (Exploded View) */}
        <EngineeringShowcase />

        {/* Section 5: Featured Products */}
        <FeaturedProducts
          onRequestQuote={handleRequestQuote}
          selectedCategoryFilter={activeCategoryFilter}
          onFilterChange={setActiveCategoryFilter}
        />

        {/* Section 6: Customization Call-to-Action */}
        <CustomizationCTA />

        {/* Section 7: Gallery Preview */}
        <GalleryPreview />

        {/* Section 8: Contact and Enquiry Section */}
        <ContactForm key={selectedProductForQuote} initialProduct={selectedProductForQuote} />
      </main>

      {/* Section 9: Footer */}
      <Footer />
    </div>
  );
}
