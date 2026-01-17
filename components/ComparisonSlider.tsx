"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import { MoveHorizontal } from "lucide-react";

export default function ComparisonSlider() {
    const [sliderPosition, setSliderPosition] = useState(50);
    const [isResizing, setIsResizing] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const startResize = useCallback(() => setIsResizing(true), []);
    const stopResize = useCallback(() => setIsResizing(false), []);

    const resize = useCallback((clientX: number) => {
        if (containerRef.current) {
            const rect = containerRef.current.getBoundingClientRect();
            const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
            const percent = (x / rect.width) * 100;
            setSliderPosition(percent);
        }
    }, []);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!isResizing) return;
            resize(e.clientX);
        };

        const handleTouchMove = (e: TouchEvent) => {
            if (!isResizing) return;
            resize(e.touches[0].clientX);
        };

        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseup", stopResize);
        window.addEventListener("touchmove", handleTouchMove);
        window.addEventListener("touchend", stopResize);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseup", stopResize);
            window.removeEventListener("touchmove", handleTouchMove);
            window.removeEventListener("touchend", stopResize);
        };
    }, [isResizing, resize, stopResize]);

    return (
        <div
            ref={containerRef}
            className="relative w-full h-[50vh] md:h-[80vh] overflow-hidden select-none group cursor-col-resize rounded-sm"
            onMouseDown={startResize}
            onTouchStart={startResize}
        >

            {/* Visual Hint */}
            <div className={`absolute inset-0 z-30 pointer-events-none transition-opacity duration-300 flex items-center justify-center bg-black/20 ${isResizing ? 'opacity-0' : 'opacity-100'}`}>
                {/* Optional hint overlay if needed, currently kept clean */}
            </div>

            {/* After Image (Right Side - High CRI) */}
            <div className="absolute inset-0">
                {/* Using one of the uploaded project images for high quality */}
                <Image
                    src="/projects/project-1.png"
                    alt="Volts Design High CRI"
                    fill
                    className="object-cover filter contrast-[1.1] saturate-[1.2] brightness-105"
                    priority
                />
                <div className="absolute top-8 right-8 bg-[#050505]/80 backdrop-blur-md px-4 py-2 border border-[#D4AF37]/30 z-20">
                    <span className="text-[#D4AF37] font-serif text-sm tracking-widest">VOLTS (CRI 98)</span>
                </div>
            </div>

            {/* Before Image (Left Side - Low CRI) */}
            <div
                className="absolute inset-0 z-10 will-change-[clip-path]"
                style={{
                    clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)`
                }}
            >
                <Image
                    src="/projects/project-1.png"
                    alt="Standard Lighting Low CRI"
                    fill
                    className="object-cover filter sepia-[0.3] saturate-[0.6] hue-rotate-[15deg] brightness-[0.9]"
                    priority
                />
                <div className="absolute top-8 left-8 bg-[#050505]/80 backdrop-blur-md px-4 py-2 border border-white/10">
                    <span className="text-gray-400 font-sans text-sm tracking-widest">STANDARD (CRI 80)</span>
                </div>
            </div>

            {/* Handle Line */}
            <div
                className="absolute top-0 bottom-0 w-0.5 bg-[#D4AF37] z-20"
                style={{ left: `${sliderPosition}%` }}
            >
                {/* Handle Button */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-[#050505] border border-[#D4AF37] rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(212,175,55,0.4)]">
                    <MoveHorizontal className="text-[#D4AF37] w-5 h-5" />
                </div>
            </div>

        </div>
    );
}
