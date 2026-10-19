import React from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { AlertCircle, Home, Package } from 'lucide-react';


export default function NotFound() {
  return (
    <div className="flex flex-col min-h-screen bg-[#F7F9F7]">
      <Header />

      <main className="flex-1 flex items-center justify-center pt-28 pb-20 px-4">
        <div className="max-w-md w-full bg-white rounded-3xl p-8 sm:p-10 border border-gray-200 shadow-sm text-center">
          <div className="w-16 h-16 rounded-full bg-[#EAF5EC] text-[#16803C] flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-8 h-8" />
          </div>

          <span className="text-xs font-bold text-[#16803C] uppercase tracking-wider block mb-1">
            404 Error
          </span>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0B3D24] mb-3">
            Product Not Found
          </h1>

          <p className="text-xs sm:text-sm text-[#66716A] leading-relaxed mb-8">
            The model, category, or page you requested does not exist or may have been updated in our manufacturing catalogue.
          </p>

          <div className="flex flex-col gap-3">
            <Link
              href="/products"
              className="w-full py-3 px-4 bg-[#16803C] hover:bg-[#0B3D24] text-white font-bold text-sm rounded-xl shadow-sm transition-colors flex items-center justify-center gap-2"
            >
              <Package className="w-4 h-4" />
              <span>Browse Product Catalogue</span>
            </Link>

            <Link
              href="/"
              className="w-full py-2.5 px-4 bg-[#F7F9F7] hover:bg-[#EAF5EC] text-[#0B3D24] font-semibold text-sm rounded-xl border border-gray-200 transition-colors flex items-center justify-center gap-2"
            >
              <Home className="w-4 h-4" />
              <span>Return to Homepage</span>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
