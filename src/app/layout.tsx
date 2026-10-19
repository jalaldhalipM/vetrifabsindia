import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://vetrifabsindia.com"),
  title: {
    default: "Food Truck Manufacturing in Chennai | Custom Food Carts & Vans | Vetri Fabs India",
    template: "%s | Vetri Fabs India",
  },
  description:
    "Leading food truck manufacturing company in Chennai, Tamil Nadu. Custom Tata Ace food trucks, commercial kitchen vans, mobile food carts, and stainless steel fabrication. Direct manufacturer quotation.",
  keywords: [
    "food truck manufacturing in chennai",
    "food truck manufacturer Chennai",
    "food truck fabrication Chennai",
    "custom food truck Chennai",
    "Tata Ace food truck Chennai",
    "mobile food vans Chennai",
    "food cart manufacturer Chennai",
    "commercial food vehicle bodies Chennai",
    "stainless steel food cart fabrication",
    "kiosk manufacturer Chennai",
    "Vetri Fabs India",
    "food truck builders Tamil Nadu",
  ],
  authors: [{ name: "Vetri Fabs India" }],
  creator: "Vetri Fabs India",
  publisher: "Vetri Fabs India",
  alternates: {
    canonical: "https://vetrifabsindia.com",
  },
  openGraph: {
    title: "Food Truck Manufacturing in Chennai | Vetri Fabs India",
    description:
      "Premier commercial food truck manufacturer and vehicle body fabricator in Chennai, Tamil Nadu. High-roof Tata Ace conversions, mobile vans, and SS carts.",
    url: "https://vetrifabsindia.com",
    siteName: "Vetri Fabs India",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/images/hero/hero-tata-ace-mellow.jpg",
        width: 1200,
        height: 630,
        alt: "Custom Food Truck Manufacturing by Vetri Fabs India Chennai",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Food Truck Manufacturing in Chennai | Vetri Fabs India",
    description:
      "Leading food truck manufacturer in Chennai, Tamil Nadu. High-roof Tata Ace food trucks, mobile food vans, and custom carts.",
    images: ["/images/hero/hero-tata-ace-mellow.jpg"],
  },
  other: {
    "geo.region": "IN-TN",
    "geo.placename": "Chennai",
    "geo.position": "13.1557;80.2458",
    ICBM: "13.1557, 80.2458",
  },
};

export const viewport: Viewport = {
  themeColor: "#16803C",
  width: "device-width",
  initialScale: 1,
};

// LocalBusiness / Manufacturer Structured Data for Google Local Search
const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "Manufacturer"],
  name: "Vetri Fabs India",
  image: "https://vetrifabsindia.com/images/hero/hero-tata-ace-mellow.jpg",
  description:
    "Premier commercial food truck, mobile food van, and stainless steel commercial kitchen fabricator in Chennai, Tamil Nadu.",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Periya Mathur",
    addressLocality: "Chennai",
    addressRegion: "Tamil Nadu",
    postalCode: "600068",
    addressCountry: "IN",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 13.1557,
    longitude: 80.2458,
  },
  url: "https://vetrifabsindia.com",
  telephone: "+91-9876543210",
  priceRange: "₹₹₹",
  currenciesAccepted: "INR",
  paymentAccepted: "Cash, Credit Card, Bank Transfer, UPI",
  areaServed: [
    {
      "@type": "City",
      name: "Chennai",
    },
    {
      "@type": "State",
      name: "Tamil Nadu",
    },
    {
      "@type": "Country",
      name: "India",
    },
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Commercial Food Trucks & Mobile Kitchen Fabrication Services",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Food Truck Manufacturing in Chennai",
          description: "Custom commercial food truck body conversions on Tata Ace HT, Mega, and light commercial vehicles.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Mobile Food Van & Kiosk Fabrication",
          description: "Walk-in mobile food vans (10x6) and high-roof kitchen units fabricated in Chennai.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Stainless Steel Food Cart & Live Counter Manufacturing",
          description: "Food-grade SS 304 commercial kitchen carts, tandoor counters, and live banquet stations.",
        },
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} scroll-smooth`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
      </head>
      <body className="min-h-screen bg-[#F7F9F7] text-[#202923] antialiased selection:bg-[#16803C] selection:text-white">
        {children}
      </body>
    </html>
  );
}
