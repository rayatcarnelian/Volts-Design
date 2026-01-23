"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, Hammer, Lightbulb } from "lucide-react";

interface QuantumSliderProps {
    images?: {
        raw: string;
        standard: string;
        luxury: string;
    }
}

export default function QuantumSlider({
    images = {
        raw: "/quantum-slider/raw.png",
        standard: "/quantum-slider/standard.png",
        luxury: "/quantum-slider/luxury.png"
    }
}: QuantumSliderProps) {
    const [sliderValue, setSliderValue] = useState(0); // 0 to 100

    let activePhase = 0;
    if (sliderValue < 33) activePhase = 0;
    else if (sliderValue < 66) activePhase = 1;
    else activePhase = 2;

    // Opacity Calculations
    // Phase 0 (Raw) is always visible at bottom.
    // Phase 1 (Standard) opacity: 0 -> 1 as slider goes 0 -> 50
    // Phase 2 (Luxury) opacity: 0 -> 1 as slider goes 50 -> 100

    // Actually, to make it smoother for 3 steps:
    // 0 -> 50: Crossfade Raw to Standard
    // 50 -> 100: Crossfade Standard to Luxury

    const getStandardOpacity = () => {
        if (sliderValue <= 0) return 0;
        if (sliderValue >= 50) return 1; // Stays fully visible under Luxury? No, logic depends on stacking.
        // If standard is ON TOP of Raw, then 0-50 fades it in.
        return (sliderValue / 50);
    };

    const getLuxuryOpacity = () => {
        if (sliderValue <= 50) return 0;
        if (sliderValue >= 100) return 1;
        // Luxury ON TOP of Standard.
        return ((sliderValue - 50) / 50);
    };

    const phases = [
        {
            id: 0,
            title: "THE SHELL",
            subtitle: "RAW POTENTIAL",
            icon: <Hammer className="w-4 h-4" />,
            desc: "Concrete bones. The canvas before the art."
        },
        {
            id: 1,
            title: "THE STANDARD",
            subtitle: "BUILDER GRADE",
            icon: <Lightbulb className="w-4 h-4" />,
            desc: "Flat lighting. Generic finishes. The baseline."
        },
        {
            id: 2,
            title: "THE VOLTS STUDIO",
            subtitle: "QUANTUM LEAP",
            icon: <Zap className="w-4 h-4" />,
            desc: "Atmosphere engineered. Physics + Emotion."
        }
    ];

    return (
        <div className="relative w-full h-[60vh] md:h-[90vh] bg-[#050505] overflow-hidden group select-none flex flex-col items-center justify-center">

            {/* ------------------- IMAGE LAYERS ------------------- */}
            <div className="absolute inset-0 w-full h-full">
                {/* Layer 1: RAW (Base) */}
                <div className="absolute inset-0">
                    <Image
                        src={images.raw}
                        alt="Raw Construction"
                        fill
                        className="object-cover"
                        priority
                    />
                </div>

                {/* Layer 2: STANDARD (Middle) */}
                <div
                    className="absolute inset-0 will-change-opacity"
                    style={{ opacity: getStandardOpacity() }}
                >
                    <Image
                        src={images.standard}
                        alt="Standard Lighting"
                        fill
                        className="object-cover"
                        priority
                    />
                </div>

                {/* Layer 3: LUXURY (Top) */}
                <div
                    className="absolute inset-0 will-change-opacity"
                    style={{ opacity: getLuxuryOpacity() }}
                >
                    <Image
                        src={images.luxury}
                        alt="Volts Luxury Design"
                        fill
                        className="object-cover"
                        priority
                    />
                </div>
            </div>

            {/* ------------------- OVERLAYS & HUD ------------------- */}

            {/* Vignette & Grain for Cinema Feel */}
            <div className="absolute inset-0 pointer-events-none bg-radial-gradient-to-c from-transparent to-black/60 mix-blend-multiply" />

            {/* Dynamic Label - Floats near top left */}
            <div className="absolute top-12 left-6 md:left-12 z-20">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activePhase}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.4, ease: "circOut" }}
                        className="backdrop-blur-md bg-black/40 border-l-2 border-[#D4AF37] pl-6 py-2"
                    >
                        <div className="flex items-center gap-2 text-[#D4AF37] mb-1">
                            {phases[activePhase].icon}
                            <span className="font-mono text-xs tracking-[0.2em] font-bold">{phases[activePhase].subtitle}</span>
                        </div>
                        <h2 className="text-4xl md:text-6xl font-serif text-white uppercase tracking-tighter shadow-black drop-shadow-lg">
                            {phases[activePhase].title}
                        </h2>
                        <p className="text-gray-300 font-sans text-sm mt-2 max-w-xs leading-relaxed drop-shadow-md">
                            {phases[activePhase].desc}
                        </p>
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* ------------------- CONTROLS ------------------- */}

            <div className="absolute bottom-12 w-full max-w-3xl px-6 z-30 flex flex-col items-center gap-6 left-0 right-0 mx-auto">

                {/* Phase Indicators */}
                <div className="flex justify-between w-full text-[10px] font-mono tracking-widest text-gray-400 uppercase px-2 mb-1">
                    <span className={`transition-colors duration-300 ${activePhase === 0 ? "text-white scale-110 font-bold" : ""}`}>I. Raw</span>
                    <span className={`transition-colors duration-300 ${activePhase === 1 ? "text-white scale-110 font-bold" : ""}`}>II. Standard</span>
                    <span className={`transition-colors duration-300 ${activePhase === 2 ? "text-[#D4AF37] scale-110 font-bold" : ""}`}>III. Volts</span>
                </div>

                {/* The Quantum Slider Input */}
                <div className="relative w-full h-12 flex items-center group/slider">

                    {/* Track Background */}
                    <div className="absolute w-full h-1 bg-white/20 rounded-full overflow-hidden backdrop-blur-sm">
                        {/* Progress Fill */}
                        <div
                            className="h-full bg-gradient-to-r from-gray-500 via-white to-[#D4AF37]"
                            style={{ width: `${sliderValue}%` }}
                        />
                    </div>

                    {/* Slider Thumb (Invisible HTML input, styled via div) */}
                    <input
                        type="range"
                        min="0"
                        max="100"
                        value={sliderValue}
                        onChange={(e) => setSliderValue(Number(e.target.value))}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-50"
                    />

                    {/* Custom Thumb Visual */}
                    <div
                        className="absolute h-12 w-12 -ml-6 top-1/2 -translate-y-1/2 pointer-events-none transition-all duration-75 flex items-center justify-center z-40"
                        style={{ left: `${sliderValue}%` }}
                    >
                        {/* The Glowing Grip */}
                        <div className="w-12 h-12 border border-[#D4AF37]/50 rounded-full flex items-center justify-center bg-black/50 backdrop-blur-md shadow-[0_0_20px_rgba(212,175,55,0.4)]">
                            <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                        </div>
                    </div>
                </div>

                <div className="text-center">
                    <p className="text-xs text-white/40 font-mono tracking-[0.3em] group-hover/slider:text-white transition-colors">DRAG TO TRANSFORM</p>
                </div>

            </div>

        </div>
    );
}
