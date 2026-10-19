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
  disclaimer: 'Product specifications and designs shown are manufactured custom examples by Vetri Fabs India. Final specifications, vehicle chassis choice, and equipment layout are tailored to individual client business requirements.'
};

export const NAVIGATION_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'About Us', href: '#about-us' },
  { label: 'Products', href: '#products' },
  { label: 'Engineering', href: '#engineering' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Contact Us', href: '#contact' },
];
