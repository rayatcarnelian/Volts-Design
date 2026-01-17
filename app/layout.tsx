import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import SpotlightCursor from "@/components/SpotlightCursor";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Volts Design | Architectural Lighting Architect - Hazem",
  description: "Expert Lighting Design, Consultation & Implementation by Hazem. Specializing in sculpting atmosphere for Residential & Commercial spaces in Malaysia.",
  keywords: "Lighting Design KL, Volts Design, Hazem, Light Architect, Luxury Lighting",
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
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
