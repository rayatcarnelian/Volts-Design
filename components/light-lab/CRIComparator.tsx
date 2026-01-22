"use client";

import { useState } from "react";
import { GripVertical } from "lucide-react";
import { useSound } from "../SoundManager";

export default function CRIComparator() {
    const [position, setPosition] = useState(50);
    const { playClick } = useSound();

    return (
        <div className="relative w-full h-[600px] overflow-hidden rounded-lg border border-white/10 cursor-col-resize group select-none"
            onMouseDown={() => playClick()} // Sound on initial grab
            onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
                setPosition((x / rect.width) * 100);
            }}
            onTouchMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const x = Math.max(0, Math.min(e.touches[0].clientX - rect.left, rect.width));
                setPosition((x / rect.width) * 100);
            }}
        >
            {/* Base Image (CRI 90+ High Fidelity) - This is the "Real" colors */}
            <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: "url('https://images.unsplash.com/photo-1551524164-687a55dd1126?q=80&w=2000&auto=format&fit=crop')" }}
            >
                <div className="absolute top-8 right-8 bg-[#D4AF37] text-black px-4 py-1 font-mono text-xs font-bold">
                    VOLTS CRI 98+
                </div>
            </div>

            {/* Overlay Image (CRI 80 Low Fidelity) - Clipped */}
            <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                    backgroundImage: "url('https://images.unsplash.com/photo-1551524164-687a55dd1126?q=80&w=2000&auto=format&fit=crop')",
                    filter: "grayscale(30%) contrast(0.9) brightness(0.9)", // Simulate dull "CRI 80" look
                    clipPath: `polygon(0 0, ${position}% 0, ${position}% 100%, 0 100%)`
                }}
            >
                <div className="absolute top-8 left-8 bg-[#333] text-gray-400 px-4 py-1 font-mono text-xs font-bold border border-white/10">
                    STANDARD CRI 80
                </div>
            </div>

            {/* Slider Handle */}
            <div
                className="absolute top-0 bottom-0 w-1 bg-white cursor-col-resize z-10 shadow-[0_0_20px_rgba(0,0,0,0.5)] flex items-center justify-center transform hover:scale-110 transition-transform"
                style={{ left: `${position}%` }}
            >
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg text-black">
                    <GripVertical size={16} />
                </div>
            </div>

            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-black/50 backdrop-blur px-6 py-2 rounded-full border border-white/10 text-xs font-mono text-white/70 pointer-events-none">
                DRAG TO COMPARE FIDELITY
            </div>
        </div>
    );
}
