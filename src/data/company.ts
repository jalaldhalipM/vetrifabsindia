import { CompanyConfig } from '@/types';

/**
 * Company Configuration & Placeholder Management
 * Note: Contact details and legal registration numbers are configured here as placeholders
 * to be verified and replaced by Vetri Fabs India before production deployment.
 */
export const COMPANY_CONFIG: CompanyConfig = {
  name: 'Vetri Fabs India',
  tagline: 'Custom Food Carts, Trucks & Vans Built for Your Business',
  primaryColor: '#16803C',
  darkGreen: '#0B3D24',
  lightGreen: '#EAF5EC',
  // Configurable WhatsApp and Phone contact placeholders
  // Replace with official Vetri Fabs verified numbers
  whatsappNumber: '919876543210', // Configurable WhatsApp direct number (E.164 without +)
  displayPhone: '+91 98765 43210 (Client Placeholder)',
  email: 'enquiry@vetrifabsindia.com (Placeholder)',
  address: {
    area: 'Periya Mathur', // Observed on factory signboard (subject to client confirmation)
    city: 'Chennai',
    state: 'Tamil Nadu',
    country: 'India',
    isPlaceholder: true
  },
  disclaimer: 'Product specifications and designs shown are manufactured custom examples by Vetri Fabs India. Final specifications, vehicle chassis choice, and equipment layout are tailored to individual client business requirements.',
  pricingDisclaimer: 'Prices shown are indicative base manufacturing estimates. Final quotation depends on chassis selection, equipment fitments, stainless steel gauge, internal electrical layout, and custom branding requirements.'
};

export const NAVIGATION_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about' },
  { label: 'Catalogue', href: '/products' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Contact Us', href: '/contact' },
];


/**
 * Format Indian currency correctly in INR (₹)
 * Examples: 150000 -> ₹1,50,000
 */
export function formatINR(amount?: number | null): string {
  if (amount === undefined || amount === null || isNaN(amount) || amount <= 0) {
    return 'Request a Quote';
  }
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Build dynamic WhatsApp enquiry URL
 */
export function getWhatsAppEnquiryUrl(productName?: string, productUrl?: string): string {
  if (!COMPANY_CONFIG.whatsappNumber) {
    return '#';
  }
  let message = 'Hello Vetri Fabs India, I would like to enquire about your custom food carts and trucks.';
  if (productName) {
    message = `Hello Vetri Fabs India, I would like to enquire about the ${productName}.`;
    if (productUrl) {
      message += ` Product reference: ${productUrl}`;
    }
  }
  return `https://wa.me/${COMPANY_CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

