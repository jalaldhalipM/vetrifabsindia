import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import ProductCard from '@/components/ProductCard';
import ProductDetailClient from './ProductDetailClient';
import { fetchProductBySlug, fetchRelatedProducts } from '@/lib/products';

import { getAllProducts } from '@/data/products';
import { COMPANY_CONFIG } from '@/data/company';
import { ArrowRight } from 'lucide-react';

interface ProductDetailPageProps {
  params: Promise<{
    categorySlug: string;
    productSlug: string;
  }>;
}

export async function generateStaticParams() {
  const products = getAllProducts();
  return products.map((product) => ({
    categorySlug: product.category_slug || product.category_id,
    productSlug: product.slug,
  }));
}

export async function generateMetadata({
  params,
}: ProductDetailPageProps): Promise<Metadata> {
  const { productSlug } = await params;
  const product = await fetchProductBySlug(productSlug);

  if (!product) {
    return {
      title: 'Product Not Found | Vetri Fabs India',
    };
  }

  const title =
    product.seo_title || `${product.name || product.title} | Vetri Fabs India`;
  const description =
    product.seo_description ||
    `${product.short_description} Custom commercial food truck & mobile cart fabrication in Tamil Nadu.`;

  const imageUrl = product.primary_image || product.image_url;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [imageUrl],
      type: 'article',
    },
  };
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { categorySlug, productSlug } = await params;
  const product = await fetchProductBySlug(productSlug);

  if (!product) {
    notFound();
  }

  // Cross-verify category slug consistency
  if (
    product.category_slug !== categorySlug &&
    product.category_id !== categorySlug
  ) {
    // If slug mismatched, redirect to 404
    notFound();
  }

  const relatedProducts = await fetchRelatedProducts(
    product.id,
    product.category_id,
    3
  );

  const currentUrl = `https://vetrifabsindia.com/products/${product.category_slug}/${product.slug}`;

  // Structured Data (JSON-LD) for Google Rich Snippets
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name || product.title,
    image: [product.primary_image || product.image_url],
    description: product.short_description,
    sku: product.sku,
    brand: {
      '@type': 'Brand',
      name: COMPANY_CONFIG.name,
    },
    offers: {
      '@type': 'Offer',
      priceCurrency: 'INR',
      price: product.price || product.starting_price || undefined,
      availability: 'https://schema.org/InStock',
      seller: {
        '@type': 'Organization',
        name: COMPANY_CONFIG.name,
      },
    },
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#F7F9F7]">
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Header />

      <main className="flex-1 pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb Navigation */}
          <Breadcrumbs
            items={[
              { label: 'Catalogue', href: '/products' },
              {
                label: product.category_name,
                href: `/products/${product.category_slug}`,
              },
              { label: product.name || product.title },
            ]}
          />

          {/* Product Detail Main Interactive Component */}
          <div className="mt-4">
            <ProductDetailClient product={product} currentUrl={currentUrl} />
          </div>

          {/* Related Models in this Category */}
          {relatedProducts.length > 0 && (
            <div className="mt-20 pt-12 border-t border-gray-200">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <span className="text-xs font-bold text-[#16803C] uppercase tracking-wider block mb-1">
                    Related Models
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B3D24]">
                    More in {product.category_name}
                  </h2>
                </div>

                <Link
                  href={`/products/${product.category_slug}`}
                  className="hidden sm:inline-flex items-center gap-1.5 text-xs font-bold text-[#16803C] hover:text-[#0B3D24]"
                >
                  <span>View All {product.category_name}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {relatedProducts.map((relProduct) => (
                  <ProductCard key={relProduct.id} product={relProduct} />
                ))}
              </div>
            </div>
          )}

          {/* Manufacturing Consultation Banner */}
          <div className="mt-16 p-8 rounded-3xl bg-white border border-gray-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#16803C] block mb-1">
                Custom Engineering Support
              </span>
              <h3 className="text-xl sm:text-2xl font-extrabold text-[#0B3D24]">
                Need custom measurements or specialized kitchen machinery?
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-[#66716A] max-w-xl">
                We can adapt this model with specialized tandoor ovens, softy ice cream machines, espresso counters, or heavy-duty grease exhaust hoods.
              </p>
            </div>

            <Link
              href="/#contact"
              className="px-6 py-3.5 bg-[#16803C] hover:bg-[#0B3D24] text-white font-bold text-sm rounded-xl transition-colors shadow-sm shrink-0"
            >
              Contact Workshop Team
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
