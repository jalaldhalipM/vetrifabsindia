import { Product } from '@/types';

/**
 * Sample product catalogue using actual Vetri Fabs India manufactured units.
 * Note: Prices are omitted per B2B quotation requirements ("Request a Quote").
 * Designed to mirror future Supabase `products` table schema.
 */
export const SAMPLE_PRODUCTS: Product[] = [
  {
    id: 'tata-ace-food-truck',
    title: 'Tata Ace Commercial Food Truck',
    slug: 'tata-ace-commercial-food-truck',
    category_id: 'food-trucks',
    category_name: 'Food Trucks',
    short_description: 'Customized commercial kitchen fabrication on Tata Ace HT chassis with high-roof body, aluminum checkered flooring, and hydraulic awnings.',
    full_description: 'Engineered specifically for mobile restaurateurs, this commercial food truck conversion is built directly onto the sturdy Tata Ace HT platform. Features a custom high-roof insulated cargo box, aluminum checkered plate non-slip flooring, full food-grade stainless steel working counters, hydraulic side-opening service hatch with fold-out shelf, and integrated 230V commercial wiring.',
    image_url: '/images/products/tata-ace-food-truck.jpg',
    gallery_urls: [
      '/images/products/tata-ace-food-truck.jpg',
      '/images/engineering/tata-ace-features-collage.jpg',
      '/images/engineering/truck-kitchen-interior.jpg',
      '/images/gallery/gallery-foodclup-red-truck.jpg'
    ],
    specifications: [
      { label: 'Chassis Compatibility', value: 'Tata Ace HT / Mega / Similar LCV' },
      { label: 'Body Construction', value: 'MS Tubular Skeleton with GI / ACP Sheeting' },
      { label: 'Flooring', value: 'Heavy-Duty Aluminium Checkered Non-Slip Plate' },
      { label: 'Countertops', value: 'Food-Grade Stainless Steel' },
      { label: 'Canopy Support', value: 'Heavy-Duty Gas Springs / Hydraulic Struts' },
      { label: 'Electrical', value: 'Recessed Ceiling LED Panels & Distribution Box' }
    ],
    features: [
      'Ergonomic walk-in standing headroom for 2-3 chefs',
      'Hydraulic fold-up service flap with customer ordering ledge',
      'Rear double-door entry with aluminum step',
      'Provisions for exhaust hood, fresh water, and waste water tank'
    ],
    is_featured: true,
    is_published: true,
    created_at: '2026-10-18T00:00:00Z',
  },
  {
    id: 'illuminated-kiosk-cart',
    title: 'Illuminated Kiosk Food Cart (Crush Series)',
    slug: 'illuminated-kiosk-food-cart-crush',
    category_id: 'food-carts',
    category_name: 'Food Carts',
    short_description: 'Modern mobile food kiosk cart with front 3D illuminated branding, perimeter warm-white LED contours, and hydraulic awnings.',
    full_description: 'A signature Vetri Fabs manufacturing design featuring rich wooden-finish textured panels accented by warm-white ambient LED perimeter strips. Built with a heavy MS pipe framework, upper illuminated marquee sign, 3-sided hydraulic folding canopies for all-weather protection, and smooth-glide industrial caster wheels for effortless repositioning.',
    image_url: '/images/products/illuminated-kiosk-cart.jpg',
    gallery_urls: [
      '/images/products/illuminated-kiosk-cart.jpg',
      '/images/hero/hero-food-cart-kiosk.jpg',
      '/images/gallery/gallery-loop-neon-cart.jpg'
    ],
    specifications: [
      { label: 'Frame Material', value: 'MS Heavy-Gauge Square Pipe' },
      { label: 'Exterior Panel', value: 'Wood-Textured ACP / Acrylic with LED' },
      { label: 'Lighting', value: 'Warm White LED Contour + Backlit 3D Logo' },
      { label: 'Awnings', value: 'Triple Gas Spring Assisted Flaps' },
      { label: 'Wheels', value: 'Industrial Heavy-Duty Casters with Locks' }
    ],
    features: [
      'High-impact illuminated signage for evening and night sales',
      'Dual preparation shelves and under-counter lockable storage',
      'Weather-resistant GI metal roof with water runoff slope',
      'Concealed internal wiring with master switch control'
    ],
    is_featured: true,
    is_published: true,
    created_at: '2026-10-18T00:00:00Z',
  },
  {
    id: 'green-mobile-cart',
    title: 'Green Mobile Street Food Cart (Hen’s Crave)',
    slug: 'green-mobile-street-food-cart',
    category_id: 'food-carts',
    category_name: 'Food Carts',
    short_description: 'Durable corrugated industrial body food cart finished in brand green, complete with exhaust fan, shelves, and hydraulic flaps.',
    full_description: 'Finished in durable industrial powder-coated green to match bold branding. This cart features corrugated container-style lower paneling, integrated heavy-duty exhaust ventilation fan, internal tiered spice and prep racks, ceiling downlights, and rugged transport wheels designed for both indoor mall and outdoor street environments.',
    image_url: '/images/products/green-mobile-cart.jpg',
    gallery_urls: [
      '/images/products/green-mobile-cart.jpg',
      '/images/categories/cat-food-carts.jpg'
    ],
    specifications: [
      { label: 'Body Type', value: 'Corrugated Steel Container Panel (Green Finish)' },
      { label: 'Ventilation', value: 'Integrated High-Velocity Exhaust Fan' },
      { label: 'Lighting', value: 'Downlight Spotlights + Halo Rim LED' },
      { label: 'Canopy', value: 'Heavy Hydraulic Gas Struts on Three Sides' },
      { label: 'Base', value: 'Reinforced Chassis with Solid Rubber Wheels' }
    ],
    features: [
      'Optimal ventilation prevents heat buildup during frying/grilling',
      'Built-in modular shelves for food packaging and ingredients',
      'Wide front preparation counter with hygienic wipe-clean finish',
      'Sturdy push/pull towing handles'
    ],
    is_featured: true,
    is_published: true,
    created_at: '2026-10-18T00:00:00Z',
  },
  {
    id: 'ss-coffee-cart',
    title: 'Commercial SS Coffee & Prep Cart (AD 800)',
    slug: 'commercial-stainless-steel-coffee-cart',
    category_id: 'stainless-steel',
    category_name: 'Stainless Steel & Specialty Carts',
    short_description: 'Food-grade stainless steel working counter cart with lockable double cabinets, water sink tap, roller blinds, and canopy.',
    full_description: 'Built for high-volume coffee, beverage, and specialty food operations. Features an expansive food-grade stainless steel preparation surface with protective wrap, twin polished upright tubular supports, protective roller blinds for lock-and-leave convenience, lower storage doors with safety hasps, and integrated water sink plumbing.',
    image_url: '/images/products/ss-coffee-cart.jpg',
    gallery_urls: [
      '/images/products/ss-coffee-cart.jpg',
      '/images/categories/cat-stainless-steel.jpg'
    ],
    specifications: [
      { label: 'Counter Material', value: 'Food-Grade Stainless Steel (Mirror/Matt)' },
      { label: 'Pillars', value: 'Heavy Stainless Steel Tubular Uprights' },
      { label: 'Security', value: 'Roller Blinds + Lockable Under-Cabinet Doors' },
      { label: 'Plumbing', value: 'Stainless Sink with Goose-Neck Tap Provision' },
      { label: 'Wheels', value: 'Heavy-Duty Industrial Tires with Mudguards' }
    ],
    features: [
      'Hygienic, corrosion-resistant stainless steel work surfaces',
      'Upper canopy signage fascia with custom brand lettering',
      'Under-counter storage for water containers, supplies, and dairy',
      'Sturdy fender mudguards over all four wheels'
    ],
    is_featured: true,
    is_published: true,
    created_at: '2026-10-18T00:00:00Z',
  },
  {
    id: 'mobile-food-van-10x6',
    title: 'Custom 10x6 Mobile Food Van / Kiosk (Shaw Teay)',
    slug: 'custom-mobile-food-van-10x6',
    category_id: 'food-vans',
    category_name: 'Food Vans',
    short_description: 'High-capacity 10x6 mobile food van featuring dual service windows, scalloped canopy trim, interior workstation, and perimeter LED contouring.',
    full_description: 'An expansive 10 ft by 6 ft enclosed mobile food van built for high-throughput beverage, tea, and fast-food businesses. Boasts dual service windows with sliding shutters, scalloped decorative roof molding, 360-degree yellow LED perimeter contouring, and a full walk-in interior with granite/stainless counters and overhead storage.',
    image_url: '/images/products/mobile-food-van-10x6.jpg',
    gallery_urls: [
      '/images/products/mobile-food-van-10x6.jpg',
      '/images/gallery/gallery-highroof-interior.jpg',
      '/images/engineering/craftsmen-fabrication.jpg'
    ],
    specifications: [
      { label: 'Dimensions', value: '10 Feet Length x 6 Feet Width x 8.5 Feet Height' },
      { label: 'Structure', value: 'Insulated Metal Sandwich Panel Body' },
      { label: 'Windows', value: 'Dual Service Shutters with Counter Ledges' },
      { label: 'Lighting', value: 'Rooftop 3D Neon Signage Provision + LED Contours' },
      { label: 'Running Gear', value: 'Heavy Solid Axle with Off-Road Capable Tires' }
    ],
    features: [
      'Accommodates 2 to 4 staff members working simultaneously',
      'Dual-window setup allows separate Ordering and Pickup points',
      'Insulated walls maintain comfortable internal working temperatures',
      'Full electrical wiring harness for blenders, fryers, and tea boilers'
    ],
    is_featured: true,
    is_published: true,
    created_at: '2026-10-18T00:00:00Z',
  },
  {
    id: 'pizza-grill-food-truck',
    title: 'Woodfired Pizza & Grill Food Truck (Mizter Pizza)',
    slug: 'woodfired-pizza-grill-food-truck',
    category_id: 'food-trucks',
    category_name: 'Food Trucks',
    short_description: 'Custom commercial food truck with retractable rooftop billboard display, woodfired oven setup, striped awnings, and complete brand vinyl graphics.',
    full_description: 'Purpose-built for gourmet pizza and live street grilling. Engineered with a retractable rooftop 3D illuminated billboard for maximum street visibility, heat-insulated cooking section capable of holding pizza ovens or tandoor stoves, classic striped awnings with hydraulic support, and durable commercial vinyl graphics.',
    image_url: '/images/products/pizza-grill-food-truck.jpg',
    gallery_urls: [
      '/images/products/pizza-grill-food-truck.jpg',
      '/images/gallery/gallery-peacepoint-night.jpg',
      '/images/engineering/truck-kitchen-interior.jpg'
    ],
    specifications: [
      { label: 'Vehicle Platform', value: 'Commercial Mini-Truck Chassis (Tata Ace / Piaggio)' },
      { label: 'Rooftop Sign', value: 'Foldable Hydraulic Marquee Billboard' },
      { label: 'Cooking Zone', value: 'Reinforced Heat-Insulated Stainless Steel Deck' },
      { label: 'Canopy', value: 'Waterproof Striped Fabric over Hydraulic Frame' },
      { label: 'Exhaust', value: 'Custom Roof Vent Flue Provision' }
    ],
    features: [
      'High-impact elevated rooftop signage visible over crowds',
      'Stainless steel condiment trays and prep station included',
      'External fold-down counter for customer service',
      'Dedicated safety compartment for dual commercial gas cylinders'
    ],
    is_featured: true,
    is_published: true,
    created_at: '2026-10-18T00:00:00Z',
  },
];

/**
 * Helper query functions pre-wired for future Supabase client integration
 */
export function getAllProducts(): Product[] {
  return SAMPLE_PRODUCTS.filter((p) => p.is_published);
}

export function getFeaturedProducts(): Product[] {
  return SAMPLE_PRODUCTS.filter((p) => p.is_published && p.is_featured);
}

export function getProductsByCategory(categoryId: string): Product[] {
  return SAMPLE_PRODUCTS.filter(
    (p) => p.is_published && p.category_id === categoryId
  );
}

export function getProductBySlug(slug: string): Product | undefined {
  return SAMPLE_PRODUCTS.find((p) => p.slug === slug);
}
