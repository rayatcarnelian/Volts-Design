"use client";

import { useState } from "react";
import { useSound } from "../SoundManager";

export default function KelvinSlider() {
    const [kelvin, setKelvin] = useState(2700);
    const { playClick } = useSound();

    // Map Kelvin to a CSS filter hue-rotate/sepia estimation for visual simulation
    const getFilter = (k: number) => {
        // Base image should be roughly 4000K (Neutral)
        if (k < 4000) {
            // Warmer: Add Sepia + Orange Tint
            const intensity = (4000 - k) / 2000; // 0 to 1
            return `sepia(${intensity * 0.6}) hue-rotate(-${intensity * 30}deg) saturate(${1 + intensity * 0.5})`;
        } else {
            // Cooler: Add Blue Tint
            const intensity = (k - 4000) / 2000; // 0 to 1
            return `hue-rotate(${intensity * 10}deg) saturate(${1 - intensity * 0.2}) brightness(${1 + intensity * 0.1})`;
        }
    };

    return (
        <div className="w-full relative h-[600px] overflow-hidden rounded-lg border border-white/10 group">
            {/* Background Room Image - Neutral Base */}
            <div
                className="absolute inset-0 bg-cover bg-center transition-all duration-100 ease-linear"
                style={{
                    backgroundImage: "url('https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=2000&auto=format&fit=crop')",
                    filter: getFilter(kelvin)
                }}
            />

            {/* Overlay Info */}
            <div className="absolute top-8 left-8 p-6 bg-black/60 backdrop-blur-md border border-white/10 text-white rounded-sm">
                <h3 className="text-4xl font-mono text-[#D4AF37] mb-2">{kelvin}K</h3>
                <p className="font-sans text-sm text-gray-300">
                    {kelvin < 2500 ? "CANDLELIGHT / FIRE" :
                        kelvin < 3000 ? "RESIDENTIAL WARM (INTIMATE)" :
                            kelvin < 4000 ? "KITCHEN / TASK (CRISP)" :
                                "DAYLIGHT / CLINICAL (ALERT)"}
                </p>
            </div>

            {/* Slider Control */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-3/4 max-w-lg bg-black/80 backdrop-blur-lg p-6 rounded-full border border-white/10 flex items-center gap-4">
                <span className="text-xs font-mono text-[#D4AF37]">2000K</span>
                <input
                    type="range"
                    min="2000"
                    max="6000"
                    step="100"
                    value={kelvin}
                    onInput={() => playClick()} // Play sound on drag
                    onChange={(e) => setKelvin(parseInt(e.target.value))}
                    className="w-full h-1 bg-gradient-to-r from-orange-500 via-yellow-200 to-blue-200 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:shadow-[0_0_10px_rgba(255,255,255,0.8)]"
                />
                <span className="text-xs font-mono text-blue-300">6000K</span>
            </div>
        </div>
    );
}
