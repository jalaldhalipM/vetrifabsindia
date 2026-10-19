import React from 'react';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import CategoryProductsClient from './CategoryProductsClient';
import { fetchCategoryBySlug, fetchCategories, fetchProducts } from '@/lib/products';
import { Sparkles } from 'lucide-react';


interface CategoryPageProps {
  params: Promise<{ categorySlug: string }>;
}

export async function generateStaticParams() {
  const categories = await fetchCategories();
  return categories.map((cat) => ({
    categorySlug: cat.slug,
  }));
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { categorySlug } = await params;
  const category = await fetchCategoryBySlug(categorySlug);

  if (!category) {
    return {
      title: 'Category Not Found | Vetri Fabs India',
    };
  }

  const title = category.seo_title || `${category.name} Fabrication & Models | Vetri Fabs India`;
  const description =
    category.seo_description ||
    `Custom ${category.name} manufactured by Vetri Fabs India. Explore specifications, high-roof options, and custom mobile kitchen fitouts.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [category.image_url],
      type: 'website',
    },
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { categorySlug } = await params;
  const category = await fetchCategoryBySlug(categorySlug);

  if (!category) {
    notFound();
  }

  const allCategories = await fetchCategories();
  const products = await fetchProducts({ categorySlug });
  const otherCategories = allCategories.filter((c) => c.slug !== categorySlug);

  return (
    <div className="flex flex-col min-h-screen bg-[#F7F9F7]">
      <Header />

      <main className="flex-1 pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumbs */}
          <Breadcrumbs
            items={[
              { label: 'Catalogue', href: '/products' },
              { label: category.name },
            ]}
          />

          {/* Category Hero Banner */}
          <div className="mt-4 mb-10 bg-white rounded-3xl border border-gray-200 overflow-hidden shadow-sm">
            <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
              {/* Left Content */}
              <div className="p-6 sm:p-10 lg:col-span-7">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EAF5EC] text-[#0B3D24] text-xs font-bold uppercase tracking-wider mb-3">
                  <Sparkles className="w-3.5 h-3.5 text-[#16803C]" />
                  <span>Manufacturing Division</span>
                </div>

                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0B3D24] tracking-tight">
                  {category.name}
                </h1>

                <p className="mt-4 text-sm sm:text-base text-[#66716A] leading-relaxed">
                  {category.description}
                </p>

                {/* Example Subtypes */}
                <div className="mt-6">
                  <span className="text-xs font-bold text-[#0B3D24] uppercase tracking-wider block mb-2">
                    Available Layouts & Configurations:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {category.examples.map((example) => (
                      <span
                        key={example}
                        className="text-xs bg-[#F7F9F7] text-[#202923] border border-gray-200 px-3 py-1 rounded-lg font-medium"
                      >
                        {example}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Authentic Category Photograph */}
              <div className="relative aspect-[16/10] lg:aspect-auto lg:h-full lg:col-span-5 bg-gray-900 overflow-hidden">
                <Image
                  src={category.image_url}
                  alt={`${category.name} manufacturing workshop Vetri Fabs India`}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent lg:hidden" />
              </div>
            </div>
          </div>

          {/* Interactive Products Grid with Search & Filters */}
          <CategoryProductsClient
            initialProducts={products}
            category={category}
          />

          {/* Explore Other Categories */}
          {otherCategories.length > 0 && (
            <div className="mt-20 pt-10 border-t border-gray-200">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-[#0B3D24]">
                    Explore Other Categories
                  </h2>
                  <p className="text-xs sm:text-sm text-[#66716A]">
                    Browse additional specialized mobile food vehicle and cart divisions
                  </p>
                </div>
                <Link
                  href="/products"
                  className="hidden sm:inline-flex items-center gap-1.5 text-xs font-bold text-[#16803C] hover:text-[#0B3D24]"
                >
                  <span>View All Categories &rarr;</span>
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {otherCategories.slice(0, 3).map((other) => (
                  <Link
                    key={other.id}
                    href={`/products/${other.slug}`}
                    className="group bg-white rounded-2xl p-4 border border-gray-200 hover:border-[#16803C]/50 hover:shadow-md transition-all flex items-center gap-4"
                  >
                    <div className="relative w-20 h-16 rounded-xl overflow-hidden bg-gray-100 shrink-0">
                      <Image
                        src={other.image_url}
                        alt={other.name}
                        fill
                        sizes="80px"
                        className="object-cover group-hover:scale-105 transition-transform"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-bold text-[#0B3D24] group-hover:text-[#16803C] transition-colors truncate">
                        {other.name}
                      </h4>
                      <p className="text-xs text-[#66716A] line-clamp-1 mt-0.5">
                        {other.description}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
