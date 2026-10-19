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
  },
  {
    id: 'food-trucks',
    name: 'Food Trucks',
    slug: 'food-trucks',
    description: 'Commercial vehicle body fabrications on Tata Ace and light commercial chassis with complete mobile kitchen setups.',
    image_url: '/images/categories/cat-food-trucks.jpg',
    examples: ['Food Trucks on Tata Ace', 'Food Cart Trolleys', 'Customized Commercial Food Vehicles', 'Shawarma & Pizza Trucks'],
    featured: true,
    order_index: 2,
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
  },
];
