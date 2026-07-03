import type { Metadata } from "next";
import { Fraunces, Inter, Noto_Serif_Devanagari } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FloatingWhatsApp from "@/components/layout/FloatingWhatsApp";
import GrainOverlay from "@/components/ui/GrainOverlay";
import SmoothScroll from "@/components/ui/SmoothScroll";
import CustomCursor from "@/components/ui/CustomCursor";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  axes: ["opsz"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const notoDevanagari = Noto_Serif_Devanagari({
  subsets: ["devanagari"],
  variable: "--font-noto-devanagari",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Ridhana — Stone Milled Flour | Fresh, Preservative-Free Atta",
    template: "%s | Ridhana",
  },
  description:
    "Experience the art of slow milling with our fresh, preservative-free flours. From Khapli Wheat to Jowar and Bajra, we bring pure, nutrient-rich nourishment from the stone mill to your kitchen.",
  keywords: [
    "stone milled flour",
    "chakki atta",
    "khapli wheat",
    "bajra atta",
    "jowar atta",
    "preservative free flour",
    "whole grain flour",
    "Mumbai atta",
    "Ridhana",
  ],
  openGraph: {
    title: "Ridhana — Stone Milled Goodness, Rooted in Tradition",
    description:
      "Experience the art of slow milling with fresh, preservative-free flours from Vikhroli, Mumbai.",
    url: "https://www.ridhana.com",
    siteName: "Ridhana",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ridhana — Stone Milled Flour",
    description: "Fresh, preservative-free stone-milled atta from Vikhroli, Mumbai.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://www.ridhana.com",
  },
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Ridhana",
  description:
    "Artisanal slow stone-milled flour brand based in Vikhroli, Mumbai. Fresh, preservative-free whole grain flours.",
  url: "https://www.ridhana.com",
  telephone: "+919800199797",
  address: {
    "@type": "PostalAddress",
    streetAddress: "#32, Vijaya House, Station Road",
    addressLocality: "Vikhroli West",
    addressRegion: "Maharashtra",
    postalCode: "400083",
    addressCountry: "IN",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: "19.1003",
    longitude: "72.9261",
  },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    opens: "09:00",
    closes: "18:00",
  },
  sameAs: ["https://www.instagram.com/ridhanahealth"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${inter.variable} ${notoDevanagari.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
      </head>
      <body>
        <GrainOverlay />
        <CustomCursor />
        <SmoothScroll>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </SmoothScroll>
        <FloatingWhatsApp />
      </body>
    </html>
  );
}
