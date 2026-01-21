"use client";

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ProcessTimeline from "@/components/ProcessTimeline";
import ServicesList from "@/components/ServicesList";
import ComparisonSlider from "@/components/ComparisonSlider";
import VoltsBot from "@/components/VoltsBot";
import BeamSimulator from "@/components/BeamSimulator";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ProjectGallery from "@/components/ProjectGallery";

export default function Home() {
  return (
    <main className="bg-[#050505] min-h-screen text-white relative">
      <Navbar />

      <Hero />

      <div id="process">
        <ProcessTimeline />
      </div>

      {/* Sections Merged below */}

      {/* Work Section */}
      <section id="work">
        <ProjectGallery />
      </section>


      {/* Services List removed as per request (redundant categories) */}

      <div id="about"> {/* Optional ID for Comparison if needed, or keeping generic div */}
        <section className="py-24 bg-[#050505] relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('/volts-logo.png')] opacity-5 bg-center bg-no-repeat bg-contain blur-3xl" />

          <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 text-center">
            <h2 className="text-3xl md:text-5xl font-serif text-[#E5E5E5] mb-8">
              LIGHTING <span className="text-[#D4AF37]">TRANSFORMATION</span>
            </h2>
            <p className="text-gray-400 mb-12 max-w-2xl mx-auto">
              See how we turn standard spaces into cinematic experiences.
            </p>

            <div className="mb-24">
              <ComparisonSlider />
            </div>

            <div className="mb-16">
              <h2 className="text-3xl md:text-5xl font-serif text-[#E5E5E5] mb-4">
                PRECISION <span className="text-[#D4AF37]">ENGINEERING.</span>
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto mb-12">
                Lighting is physics. Adjust the beam angle to see how we sculpt objects.
              </p>
              <BeamSimulator />
            </div>

            <div className="p-8 border border-[#D4AF37]/30 bg-[#D4AF37]/5 backdrop-blur-sm rounded-sm inline-block">
              <h3 className="text-2xl font-serif text-white mb-4">Explore Full Portfolio</h3>
              <p className="text-gray-400 mb-6">Access our complete archive of Residential & Commercial projects.</p>
              <Link href="/portfolio" className="inline-flex items-center gap-2 bg-[#D4AF37] text-black px-8 py-3 font-bold font-mono rounded-sm hover:bg-[#D4AF37]/90 transition-all hover:scale-105">
                VIEW ALL PROJECTS <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </section>
      </div>

      <section id="contact">
        <VoltsBot />
      </section>
    </main>
  );
}
