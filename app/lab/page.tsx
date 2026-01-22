"use client";

import Configurator from "@/components/Configurator";
import Navbar from "@/components/Navbar";
import VoltsBot from "@/components/VoltsBot";
import BeamSimulator from "@/components/BeamSimulator";
import KelvinSlider from "@/components/light-lab/KelvinSlider";
import CRIComparator from "@/components/light-lab/CRIComparator";
import { motion } from "framer-motion";

export default function LightLab() {
    return (
        <main className="bg-[#050505] min-h-screen text-white relative">
            <Navbar />

            {/* Hero Section */}
            <section className="pt-32 pb-16 px-6 md:px-12 max-w-7xl mx-auto text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                >
                    <h2 className="text-sm font-mono text-[#D4AF37] tracking-[0.5em] mb-4">INTERACTIVE PHYSICS</h2>
                    <h1 className="text-5xl md:text-7xl font-serif text-[#E5E5E5] mb-8">
                        THE LIGHT <span className="text-[#D4AF37]">LAB</span>
                    </h1>
                    <p className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed">
                        Lighting is not magic; it is physics. Explore the fundamental properties we manipulate to create emotion in architecture.
                    </p>
                </motion.div>
            </section>

            {/* 0. NEW: The Configurator (Integrated per request) */}
            <div id="configurator" className="border-t border-white/5">
                <Configurator />
            </div>

            {/* 1. Kelvin Module */}
            <section className="py-24 border-t border-white/5 bg-[#080808]">
                <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div>
                        <h2 className="text-3xl font-serif text-white mb-4">01. TEMPERATURE (KELVIN)</h2>
                        <p className="text-gray-400 mb-8 leading-relaxed">
                            Light temperature defines the &quot;Biological Time&quot;. <br /><br />
                            <span className="text-[#D4AF37]">2700K</span> triggers melatonin for sleep (Evening).<br />
                            <span className="text-blue-400">4000K+</span> suppression melatonin for focus (Morning).<br /><br />
                            We never mix these randomly. Each zones is calibrated to your circadian rhythm.
                        </p>
                    </div>
                    <div>
                        <KelvinSlider />
                    </div>
                </div>
            </section>

            {/* 2. Beam Module */}
            <section className="py-24 border-t border-white/5 bg-[#050505]">
                <div className="max-w-7xl mx-auto px-6 md:px-12">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-serif text-white mb-4">02. BEAM ANGLE</h2>
                        <p className="text-gray-400 max-w-2xl mx-auto">
                            A wide flood lighting flattens a room. A narrow spot creates hierarchy.
                            We paint with shadow as much as we paint with light.
                        </p>
                    </div>
                    <BeamSimulator />
                </div>
            </section>

            {/* 3. CRI Module */}
            <section className="py-24 border-t border-white/5 bg-[#080808]">
                <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div className="order-2 lg:order-1">
                        <CRIComparator />
                    </div>
                    <div className="order-1 lg:order-2">
                        <h2 className="text-3xl font-serif text-white mb-4">03. FIDELITY (CRI)</h2>
                        <p className="text-gray-400 mb-8 leading-relaxed">
                            This is why your furniture looks expensive in the showroom but cheap at home.<br /><br />
                            Standard LEDs (CRI 80) miss the &quot;Red&quot; spectrum (R9), making wood look muddy and skin look grey.
                            We strictly use <span className="text-[#D4AF37] font-bold">CRI 98+</span> engines to render reality
                            exactly as the sun would.
                        </p>
                    </div>
                </div>
            </section>

            <VoltsBot />
        </main>
    );
}
