"use client";

import { ArrowDown } from "lucide-react";

export default function Hero() {
    return (
        <section className="relative h-screen w-full overflow-hidden bg-[#050505] flex items-center justify-center">

            {/* Background Video/Effect */}
            <div className="absolute inset-0 z-0">
                {/* Simulating abstract light/shadow video with complex gradient animation */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(212,175,55,0.15),transparent_60%)] animate-pulse scale-150" />
                <div className="absolute top-0 right-0 w-[50vw] h-[50vh] bg-[#D4AF37]/5 blur-[100px] animate-blob" />
                <div className="absolute bottom-0 left-0 w-[60vw] h-[60vh] bg-blue-900/10 blur-[120px] animate-blob animation-delay-4000" />

                {/* Overlay for cinematic look */}
                <div className="absolute inset-0 bg-black/40" />
            </div>

            <div className="relative z-10 text-center px-4 max-w-4xl mx-auto mt-20">
                <h1 className="text-4xl md:text-7xl font-serif text-[#E5E5E5] mb-6 tracking-tight leading-tight">
                    ARCHITECTURAL <span className="text-[#D4AF37]">LIGHTING SPECIALISTS</span>
                </h1>

                <p className="text-lg md:text-xl text-gray-300 font-light tracking-wide max-w-2xl mx-auto mb-10">
                    Precision Design, Planning & Implementation for Residential & Commercial Spaces.
                </p>

                <div>
                    <div className="w-px h-20 bg-gradient-to-b from-[#D4AF37] to-transparent mx-auto mt-12" />
                    <ArrowDown className="w-5 h-5 text-[#D4AF37] mx-auto mt-4 animate-bounce" />
                </div>
            </div>
        </section >
    );
}
