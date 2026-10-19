import { Category } from '@/types';

/**
 * Initial product category groupings.
 * Designed to mirror future Supabase `categories` table.
 */
export const CATEGORIES: Category[] = [
  {
    id: 'food-carts',
    name: 'Food Carts',
    slug: 'food-carts',
    description: 'Customizable mobile push carts and compact kiosks engineered for high footfall locations and flexible street vending.',
    image_url: '/images/categories/cat-food-carts.jpg',
    examples: ['Fast Food Push Carts', 'Food Cart Kiosks', 'Tricycle Food Carts', 'Bunk-Type Food Carts'],
    featured: true,
    order_index: 1,
    seo_title: 'Custom Food Carts & Mobile Street Kiosks | Vetri Fabs India',
    seo_description: 'Explore custom heavy-duty mobile food carts, kiosks, push carts, and snack trolleys manufactured by Vetri Fabs India.',
  },
  {
    id: 'food-trucks',
    name: 'Food Trucks',
    slug: 'food-trucks',
    description: 'Commercial vehicle body fabrications on Tata Ace, Mahindra Bolero, and light commercial chassis with complete mobile kitchen setups.',
    image_url: '/images/categories/cat-food-trucks.jpg',
    examples: ['Food Trucks on Tata Ace', 'Food Cart Trolleys', 'Customized Commercial Food Vehicles', 'Shawarma & Pizza Trucks'],
    featured: true,
    order_index: 2,
    seo_title: 'Food Truck Manufacturing in Chennai | Commercial Food Truck Fabrication | Vetri Fabs India',
    seo_description: 'Premier food truck manufacturing company in Chennai, Tamil Nadu. Custom Tata Ace conversions, Mahindra Bolero food trucks, and commercial mobile kitchens.',

  },
  {
    id: 'food-vans',
    name: 'Food Vans',
    slug: 'food-vans',
    description: 'Enclosed mobile food vans and walk-in kitchen units with high-roof headroom, dual service shutters, and full ventilation.',
    image_url: '/images/categories/cat-food-vans.jpg',
    examples: ['Mobile Food Vans (10x6)', 'High-Roof Food Vans', 'Walk-in Kitchen Units', 'Customized Mobile Kiosks'],
    featured: true,
    order_index: 3,
    seo_title: 'Mobile Food Vans & Walk-In Kitchen Units | Vetri Fabs India',
    seo_description: 'Custom fabricated 10x6 mobile food vans, walk-in commercial kitchens, dual-service window food vans manufactured in Tamil Nadu.',
  },
  {
    id: 'stainless-steel',
    name: 'Stainless Steel & Specialty Carts',
    slug: 'stainless-steel',
    description: 'Food-grade stainless steel fabrication, hygienic preparation surfaces, live tandoor counters, and specialty beverage carts.',
    image_url: '/images/categories/cat-stainless-steel.jpg',
    examples: ['Stainless Steel Food Carts', 'Dosa & Breakfast Carts', 'Live Tandoor Counters', 'AD 800 Coffee Carts', 'Waffle Counters'],
    featured: true,
    order_index: 4,
    seo_title: 'Stainless Steel Kitchen Carts & Live Counters | Vetri Fabs India',
    seo_description: 'Heavy-duty SS 304 food-grade commercial kitchen carts, tandoor tables, shawarma counters, and coffee kiosks.',
  },
  {
    id: 'food-ice-cream-carts',
    name: 'Food and Ice Cream Carts',
    slug: 'food-ice-cream-carts',
    description: 'Specialized insulated gelato, softy, ice cream push carts, and live dessert counters with cooling provisions and bright aesthetic canopies.',
    image_url: '/images/gallery/gallery-loop-neon-cart.jpg',
    examples: ['Insulated Ice Cream Carts', 'Gelato Display Carts', 'Softy Ice Cream Push Carts', 'Dessert & Mocktail Carts'],
    featured: true,
    order_index: 5,
    seo_title: 'Custom Ice Cream Carts & Dessert Vending Units | Vetri Fabs India',
    seo_description: 'Manufacturer of custom insulated ice cream carts, gelato trolleys, and dessert kiosks with battery/refrigeration provisions.',
  },
];

export function getAllCategories(): Category[] {
  return [...CATEGORIES].sort((a, b) => a.order_index - b.order_index);
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return CATEGORIES.find((cat) => cat.slug === slug || cat.id === slug);
}

