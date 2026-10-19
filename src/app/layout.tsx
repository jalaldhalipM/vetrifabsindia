import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Vetri Fabs India | Custom Food Carts, Trucks & Vans",
  description: "Explore customized food carts, food trucks, food vans, and stainless-steel food carts from Vetri Fabs India. Contact us to discuss your product requirements.",
  keywords: [
    "food carts India",
    "food truck manufacturer",
    "custom food trucks Chennai",
    "Tata Ace food truck fabrication",
    "mobile food vans",
    "stainless steel food carts",
    "Vetri Fabs India",
    "kiosk manufacturer Chennai",
    "commercial food vehicle bodies"
  ],
  authors: [{ name: "Vetri Fabs India" }],
  openGraph: {
    title: "Vetri Fabs India | Custom Food Carts, Trucks & Vans",
    description: "Explore customized food carts, food trucks, food vans, and stainless-steel food carts from Vetri Fabs India. Contact us to discuss your product requirements.",
    siteName: "Vetri Fabs India",
    locale: "en_IN",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#16803C",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} scroll-smooth`}>
      <body className="min-h-screen bg-[#F7F9F7] text-[#202923] antialiased selection:bg-[#16803C] selection:text-white">
        {children}
      </body>
    </html>
  );
}
