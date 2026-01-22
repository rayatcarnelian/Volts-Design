import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import IgnitionPreloader from "@/components/IgnitionPreloader";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Volts Design | Architectural Lighting Architect",
    template: "%s | Volts Design"
  },
  description: "Premier Architectural Lighting Design by Hazem. Sculpting atmosphere for luxury residential & commercial spaces in Malaysia. Precision engineering meets cinematic aesthetics.",
  keywords: [
    "Architectural Lighting Design",
    "Lighting Architect Malaysia",
    "Luxury Lighting Consultant",
    "Hazem Lighting Designer",
    "Volts Design",
    "Interior Lighting Specialist",
    "Commercial Lighting Design",
    "High-End Residential Lighting"
  ],
  authors: [{ name: "Hazem", url: "https://volts-design.vercel.app" }],
  creator: "Hazem",
  metadataBase: new URL("https://volts-design.vercel.app"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://volts-design.vercel.app",
    title: "Volts Design | Architectural Lighting Architect",
    description: "Sculpting atmosphere with light. Premier architectural lighting design for luxury spaces.",
    siteName: "Volts Design",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Volts Design - Architectural Lighting",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Volts Design | Light Sculpting",
    description: "Precision lighting design for the world's most exclusive spaces.",
    creator: "@voltsdesign_my",
    images: ["/og-image.jpg"],
  },
  verification: {
    google: "fqvAJ2_juF8dct8iJ2F_YDtyk48NViQnYokJLzGbDbU",
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${playfair.variable} ${inter.variable} antialiased bg-[#050505] text-[#E5E5E5]`}
      >
        <JsonLd />
        <SmoothScroll>
          <IgnitionPreloader />
          {children}
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
