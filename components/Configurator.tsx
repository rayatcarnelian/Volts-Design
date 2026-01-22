"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { Sun, Moon, Zap } from "lucide-react";

// Dynamically import 3D Room to avoid SSR crashes (window is undefined on server)
const ThreeDRoom = dynamic(() => import("./ThreeDRoom"), {
    ssr: false,
    loading: () => <div className="w-full h-full flex items-center justify-center bg-black text-[#D4AF37] font-mono animate-pulse">Initializing 3D Engine...</div>
});

export default function Configurator() {
    const [config, setConfig] = useState({
        ambient: 0.5,
        spots: 0.8,
        strip: 0.0,
        warmth: 2700, // 2700K
    });

    // Notify backend on significant interaction (Debounced) - REMOVED
    // useEffect(() => { ... }, [config]);

    const handleChange = (key: string, value: number) => {
        setConfig((prev) => ({ ...prev, [key]: value }));
    };

    return (
        <section className="relative w-full h-screen bg-[#050505] flex flex-col md:flex-row overflow-hidden border-y border-white/5">
            {/* 3D Canvas Area */}
            <div className="flex-1 h-[60vh] md:h-full relative cursor-grab active:cursor-grabbing">
                <ThreeDRoom lights={config} />

                {/* Branding Overlay */}
                <div className="absolute top-6 left-6 pointer-events-none select-none">
                    <h3 className="text-[#D4AF37] font-serif text-2xl tracking-widest">VOLTS STUDIO &trade;</h3>
                    <p className="text-xs font-mono text-gray-500 mt-1">REAL-TIME COMMISSIONING ENGINE</p>
                </div>
            </div>

            {/* Controls Panel (Tesla Style) */}
            <div className="w-full md:w-[400px] bg-[#0A0A0A] border-t md:border-t-0 md:border-l border-white/10 p-8 flex flex-col justify-center z-10 shadow-2xl">
                <div className="mb-8">
                    <h2 className="text-3xl font-serif text-white mb-2">Configure Atmosphere</h2>
                    <p className="text-gray-400 text-sm">Fine-tune the lighting layers to sculpt the space. Observe how shadows define the architecture.</p>
                </div>

                <div className="space-y-8">
                    {/* Control Group: Warmth */}
                    <div className="space-y-3">
                        <div className="flex justify-between text-xs font-mono tracking-widest text-gray-400">
                            <span>MOOD (KELVIN)</span>
                            <span className="text-[#D4AF37]">{config.warmth}K</span>
                        </div>
                        <input
                            type="range"
                            min="2000"
                            max="6000"
                            step="100"
                            value={config.warmth}
                            onChange={(e) => handleChange("warmth", parseInt(e.target.value))}
                            className="w-full h-1 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-[#D4AF37]"
                        />
                        <div className="flex justify-between text-[10px] text-gray-600">
                            <span>COZY (2000K)</span>
                            <span>CLINICAL (6000K)</span>
                        </div>
                    </div>

                    <div className="w-full h-px bg-white/5" />

                    {/* Control Group: Layers */}
                    <div className="space-y-6">
                        <div className="space-y-3">
                            <label className="flex items-center gap-2 text-sm text-white font-bold">
                                <Sun size={16} className="text-[#D4AF37]" /> ART FOCUS (DRAMA)
                            </label>
                            <input
                                type="range"
                                min="0"
                                max="1"
                                step="0.1"
                                value={config.spots}
                                onChange={(e) => handleChange("spots", parseFloat(e.target.value))}
                                className="w-full h-1 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-[#D4AF37]"
                            />
                        </div>

                        <div className="space-y-3">
                            <label className="flex items-center gap-2 text-sm text-white font-bold">
                                <Zap size={16} className="text-[#D4AF37]" /> WALL TEXTURE (GRAZING)
                            </label>
                            <input
                                type="range"
                                min="0"
                                max="1"
                                step="0.1"
                                value={config.strip}
                                onChange={(e) => handleChange("strip", parseFloat(e.target.value))}
                                className="w-full h-1 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-[#D4AF37]"
                            />
                        </div>

                        <div className="space-y-3">
                            <label className="flex items-center gap-2 text-sm text-white font-bold">
                                <Moon size={16} className="text-[#D4AF37]" /> ROOM VISIBILITY (FILL)
                            </label>
                            <input
                                type="range"
                                min="0"
                                max="1"
                                step="0.1"
                                value={config.ambient}
                                onChange={(e) => handleChange("ambient", parseFloat(e.target.value))}
                                className="w-full h-1 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-[#D4AF37]"
                            />
                        </div>
                    </div>
                </div>

                <div className="mt-8 pt-8 border-t border-white/10">
                    <h3 className="text-[#D4AF37] font-mono text-xs tracking-widest mb-4">HOW TO READ THIS ROOM</h3>
                    <ul className="space-y-3 text-xs text-gray-400 font-sans leading-relaxed">
                        <li>
                            <strong className="text-white">The Painting:</strong> Use &quot;Art Focus&quot; to make it pop. Notice how it grabs your eye immediately. This is <em className="text-gray-500">Hierarchy</em>.
                        </li>
                        <li>
                            <strong className="text-white">The Walls:</strong> Use &quot;Wall Texture&quot; to reveal the surface details. Flat light hides this; grazing light reveals it.
                        </li>
                        <li>
                            <strong className="text-white">Mood:</strong> Slide &quot;Kelvin&quot; to 2000K (Orange). Feel how the room becomes a lounge. Slide to 6000K (Blue). Now it&apos;s a hospital.
                        </li>
                    </ul>
                </div>
            </div>
        </section>
    );
}
