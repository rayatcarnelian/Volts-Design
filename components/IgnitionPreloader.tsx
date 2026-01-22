"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function IgnitionPreloader() {
    const [isLoading, setIsLoading] = useState(true);
    const [showSkip, setShowSkip] = useState(false);

    useEffect(() => {
        // Normal "Warming Up" time (2.5 seconds)
        const timer = setTimeout(() => {
            setIsLoading(false);
            window.scrollTo(0, 0);
        }, 2500);

        // Safety valve: Show skip button if stuck for > 4s
        const safetyLow = setTimeout(() => {
            setShowSkip(true);
        }, 4000);

        return () => {
            clearTimeout(timer);
            clearTimeout(safetyLow);
        };
    }, []);

    const handleSkip = () => {
        setIsLoading(false);
        window.scrollTo(0, 0);
    };

    return (
        <AnimatePresence mode="wait">
            {isLoading && (
                <motion.div
                    className="fixed inset-0 z-[9999] bg-black flex items-center justify-center overflow-hidden"
                    exit={{
                        opacity: 0,
                        transition: { duration: 0.8, ease: "easeInOut" }
                    }}
                >
                    {/* The Filament (Center Glow) */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, filter: "brightness(0)" }}
                        animate={{
                            opacity: [0, 0.2, 0, 0.6, 0.1, 1], // Flicker seq
                            scale: [0.9, 0.95, 0.9, 1.1, 0.95, 1.5],
                            filter: ["brightness(0)", "brightness(2)", "brightness(0)", "brightness(5)", "brightness(1)", "brightness(1)"]
                        }}
                        transition={{
                            duration: 2,
                            times: [0, 0.1, 0.2, 0.4, 0.6, 1],
                            ease: "easeInOut"
                        }}
                        className="w-2 h-24 bg-[#D4AF37] rounded-full shadow-[0_0_100px_rgba(212,175,55,0.8)]"
                    />

                    {/* Ambient Room Flash (Global Flicker) */}
                    <motion.div
                        animate={{
                            backgroundColor: ["#000000", "#1a1a1a", "#000000", "#333333", "#000000"],
                        }}
                        transition={{
                            duration: 1.5,
                            times: [0, 0.15, 0.3, 0.45, 0.8],
                            repeat: 0
                        }}
                        className="absolute inset-0 z-[-1]"
                    />

                    {/* Text Indicator */}
                    <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1.5 }}
                            className="flex items-center gap-2"
                        >
                            <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                            <span className="text-[10px] text-gray-500 font-mono tracking-[0.3em]">
                                SYSTEM STARTUP
                            </span>
                        </motion.div>
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: 100 }}
                            transition={{ duration: 2, ease: "linear" }}
                            className="h-[1px] bg-[#D4AF37]/50"
                        />
                        {/* Safety Skip Button */}
                        {showSkip && (
                            <motion.button
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                onClick={handleSkip}
                                className="mt-4 text-[10px] text-red-500 font-mono tracking-widest hover:text-red-400 underline cursor-pointer"
                            >
                                FORCE SKIP
                            </motion.button>
                        )}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
