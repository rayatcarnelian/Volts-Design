import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, X, ArrowRight, Sparkles, Zap, Download, Share2, History as HistoryIcon, Trash2 } from "lucide-react";
import Image from "next/image";

// --- Types ---
type EngineState = "IDLE" | "UPLOAD" | "VIBE_SELECT" | "PROCESSING" | "RESULT" | "HISTORY";

interface HistoryItem {
    id: string;
    original: string;
    result: string;
    vibe: string;
    date: number;
}

const VIBES = [
    { id: "manhattan", label: "MANHATTAN", desc: "Dark Penthouse Luxury" },
    { id: "kyoto", label: "KYOTO", desc: "Organic Zen Sanctuary" },
    { id: "parisian", label: "PARISIAN", desc: "Haussmann Classic" },
    { id: "milan", label: "MILAN", desc: "Avant-Garde Atelier" },
];

export default function VisionEngine() {
    const [state, setState] = useState<EngineState>("IDLE");
    const [selectedVibe, setSelectedVibe] = useState<string | null>(null);
    const [uploadedImage, setUploadedImage] = useState<string | null>(null);
    const [resultImage, setResultImage] = useState<string | null>(null);
    const [progress, setProgress] = useState(0);
    const [history, setHistory] = useState<HistoryItem[]>([]);

    // Load history on mount
    useEffect(() => {
        const saved = localStorage.getItem("volts_vision_history");
        if (saved) {
            try {
                setHistory(JSON.parse(saved));
            } catch (e) {
                console.error("Failed to load history", e);
            }
        }
    }, []);

    // Save history on change
    useEffect(() => {
        if (history.length > 0) {
            localStorage.setItem("volts_vision_history", JSON.stringify(history));
        }
    }, [history]);

    // -- Utilities --

    const resizeImage = (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = (event) => {
                const img = document.createElement("img");
                img.src = event.target?.result as string;
                img.onload = () => {
                    const canvas = document.createElement("canvas");
                    const MAX_WIDTH = 1024;
                    const MAX_HEIGHT = 1024;
                    let width = img.width;
                    let height = img.height;

                    if (width > height) {
                        if (width > MAX_WIDTH) {
                            height *= MAX_WIDTH / width;
                            width = MAX_WIDTH;
                        }
                    } else {
                        if (height > MAX_HEIGHT) {
                            width *= MAX_HEIGHT / height;
                            height = MAX_HEIGHT;
                        }
                    }

                    canvas.width = width;
                    canvas.height = height;
                    const ctx = canvas.getContext("2d");
                    ctx?.drawImage(img, 0, 0, width, height);

                    // Compress to JPEG with 0.8 quality
                    const dataUrl = canvas.toDataURL("image/jpeg", 0.8);
                    resolve(dataUrl);
                };
                img.onerror = (err) => reject(err);
            };
            reader.onerror = (err) => reject(err);
        });
    };

    // -- Handlers --

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            try {
                // Resize image before setting state to avoid "Payload Too Large" errors
                const resizedImage = await resizeImage(file);
                setUploadedImage(resizedImage);
                setState("VIBE_SELECT");
            } catch (err) {
                console.error("Image processing failed", err);
                alert("Failed to process image. Please try another.");
            }
        }
    };

    const handleVibeSelect = (vibeId: string) => {
        setSelectedVibe(vibeId);
        startProcessing(vibeId);
    };

    const startProcessing = async (vibeId: string) => {
        setState("PROCESSING");
        setProgress(0);

        // Simulated progress bar while waiting for API
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 95) return 95; // Hold at 95 until verified
                return prev + 2;
            });
        }, 300);

        try {
            const response = await fetch("/api/vision", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ image: uploadedImage, vibe: vibeId }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.detail || data.error || "Generation failed");
            }

            // Replicate returns an array of outputs usually
            const outputUrl = Array.isArray(data) ? data[0] : data;

            clearInterval(interval);
            setProgress(100);
            setResultImage(outputUrl);

            // Add to history
            const newItem: HistoryItem = {
                id: Date.now().toString(),
                original: uploadedImage!,
                result: outputUrl,
                vibe: vibeId,
                date: Date.now()
            };
            setHistory(prev => [newItem, ...prev].slice(0, 20)); // Keep last 20

            setState("RESULT");

        } catch (error) {
            console.error(error);
            clearInterval(interval);
            const message = error instanceof Error ? error.message : "Unknown error";
            alert(`Error: ${message}`); // Show real error
            setState("UPLOAD"); // Reset
        }
    };

    const handleDownload = () => {
        if (!resultImage) return;
        const link = document.createElement("a");
        link.href = resultImage;
        link.download = `volts-vision-${Date.now()}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleShare = async () => {
        if (navigator.share && resultImage) {
            try {
                // For base64, we might need to convert to blob to share file, 
                // or just share the "experience" if we can't share image data directly easily on all browsers.
                // Best effort: Share the image as a file.
                const res = await fetch(resultImage);
                const blob = await res.blob();
                const file = new File([blob], "vision.png", { type: "image/png" });

                await navigator.share({
                    title: 'My Volts Vision',
                    text: 'Check out my AI interior redesign.',
                    files: [file]
                });
            } catch (err) {
                console.log("Share failed or cancelled", err);
                // Fallback or ignore
            }
        } else {
            alert("Sharing not supported on this device/browser. Please download the image.");
        }
    };

    const clearHistory = () => {
        if (confirm("Clear all history?")) {
            setHistory([]);
            localStorage.removeItem("volts_vision_history");
        }
    };

    // -- Render Helpers --

    return (
        <div className="fixed bottom-8 left-8 z-50 w-full max-w-sm md:max-w-md">
            <AnimatePresence mode="wait">
                {state === "IDLE" && (
                    <motion.div
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 20, opacity: 0 }}
                        className="bg-black/60 backdrop-blur-xl border border-[#D4AF37]/30 p-6 rounded-sm shadow-[0_0_40px_rgba(0,0,0,0.5)] cursor-pointer group"
                        onClick={() => setState("UPLOAD")}
                    >
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-[#D4AF37]/10 flex items-center justify-center border border-[#D4AF37] group-hover:scale-110 transition-transform duration-300">
                                <Sparkles className="text-[#D4AF37] w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="text-white font-serif text-lg leading-tight">THE DIGITAL MIRROR</h3>
                                <p className="text-[#D4AF37] text-xs font-mono tracking-widest mt-1">DON&apos;T IMAGINE. SEE.</p>
                            </div>
                            <ArrowRight className="text-gray-400 group-hover:text-white group-hover:translate-x-2 transition-all ml-auto" />
                        </div>
                    </motion.div>
                )}

                {state !== "IDLE" && (
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="bg-black/90 backdrop-blur-2xl border border-[#D4AF37]/50 rounded-sm shadow-[0_0_50px_rgba(212,175,55,0.15)] overflow-hidden flex flex-col max-h-[85vh]"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-4 border-b border-white/10 bg-white/5 shrink-0">
                            <h3 className="text-[#D4AF37] font-mono text-xs tracking-[0.2em] flex items-center gap-2">
                                <Zap size={12} /> VISION ENGINE v2.0
                            </h3>
                            <div className="flex items-center gap-2">
                                {state !== "HISTORY" && (
                                    <button onClick={() => setState("HISTORY")} className="text-gray-400 hover:text-[#D4AF37] transition-colors" title="History">
                                        <HistoryIcon size={16} />
                                    </button>
                                )}
                                <button onClick={() => setState("IDLE")} className="text-gray-400 hover:text-white transition-colors">
                                    <X size={16} />
                                </button>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="flex-1 overflow-y-auto min-h-[400px] relative">

                            {/* UPLOAD STATE */}
                            {state === "UPLOAD" && (
                                <div className="p-6 h-full flex flex-col">
                                    <h2 className="text-2xl font-serif text-white mb-2">UPLOAD YOUR SPACE</h2>
                                    <p className="text-gray-400 text-sm mb-6">Take a photo of your messy room. We will fix it.</p>

                                    <label className="flex flex-col items-center justify-center w-full flex-1 border-2 border-dashed border-[#D4AF37]/30 rounded-sm cursor-pointer hover:bg-[#D4AF37]/5 transition-colors group">
                                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                            <Upload className="w-10 h-10 text-gray-500 mb-3 group-hover:text-[#D4AF37] transition-colors" />
                                            <p className="mb-2 text-sm text-gray-400"><span className="font-semibold text-[#D4AF37]">Click to upload</span> or drag and drop</p>
                                        </div>
                                        <input type="file" className="hidden" accept="image/*" onChange={handleFileUpload} />
                                    </label>
                                </div>
                            )}

                            {/* VIBE SELECT STATE */}
                            {state === "VIBE_SELECT" && (
                                <div className="p-6">
                                    <div className="relative w-full h-48 mb-6 rounded-sm overflow-hidden border border-white/10">
                                        <Image src={uploadedImage!} alt="Original" fill className="object-cover opacity-50 grayscale" />
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <span className="bg-black/70 px-3 py-1 text-xs font-mono text-white text-[10px] tracking-widest border border-white/20">SOURCE ACQUIRED</span>
                                        </div>
                                    </div>
                                    <h2 className="text-xl font-serif text-white mb-4 tracking-wide">SELECT AESTHETIC</h2>
                                    <div className="grid grid-cols-1 gap-2 w-full">
                                        {VIBES.map((vibe) => (
                                            <button
                                                key={vibe.id}
                                                onClick={() => handleVibeSelect(vibe.id)}
                                                className="p-4 border border-white/5 bg-white/[0.02] hover:bg-[#D4AF37]/10 hover:border-[#D4AF37]/30 transition-all text-left group flex items-center justify-between"
                                            >
                                                <div>
                                                    <div className="text-white font-serif text-lg tracking-wider group-hover:text-[#D4AF37] transition-colors">{vibe.label}</div>
                                                    <div className="text-[10px] text-gray-500 uppercase tracking-widest mt-1">{vibe.desc}</div>
                                                </div>
                                                <ArrowRight size={14} className="text-gray-600 group-hover:text-[#D4AF37] opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* PROCESSING STATE */}
                            {state === "PROCESSING" && (
                                <div className="h-full flex flex-col items-center justify-center p-6 text-center">
                                    <div className="w-24 h-24 relative mb-6">
                                        <div className="absolute inset-0 border-4 border-[#D4AF37]/20 rounded-full animate-pulse" />
                                        <div className="absolute inset-0 border-t-4 border-[#D4AF37] rounded-full animate-spin" />
                                        <div className="absolute inset-0 flex items-center justify-center font-mono text-[#D4AF37] font-bold">
                                            {Math.round(progress)}%
                                        </div>
                                    </div>
                                    <h2 className="text-xl font-serif text-white mb-2 animate-pulse">RECONSTRUCTING REALITY</h2>
                                    <p className="text-gray-400 text-xs font-mono tracking-widest">Applying {selectedVibe?.toUpperCase()} DNA...</p>
                                </div>
                            )}

                            {/* RESULT STATE */}
                            {state === "RESULT" && (
                                <div className="relative w-full h-full min-h-[400px] group">
                                    <Image
                                        src={resultImage!}
                                        alt="Result"
                                        fill
                                        className="object-cover"
                                    />

                                    {/* Result Overlay Actions */}
                                    <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-black via-black/80 to-transparent flex flex-col gap-4">
                                        <div className="flex gap-2">
                                            <button
                                                onClick={handleDownload}
                                                className="flex-1 bg-[#D4AF37] text-black font-bold font-mono py-3 hover:bg-white transition-colors flex items-center justify-center gap-2 rounded-sm"
                                            >
                                                <Download size={16} /> SAVE IMAGE
                                            </button>
                                            <button
                                                onClick={handleShare}
                                                className="w-12 bg-white/10 backdrop-blur-md border border-white/20 text-white flex items-center justify-center hover:bg-white/20 transition-colors rounded-sm"
                                                title="Share"
                                            >
                                                <Share2 size={16} />
                                            </button>
                                        </div>
                                        <button
                                            onClick={() => setState("UPLOAD")}
                                            className="text-gray-400 text-xs font-mono hover:text-white text-center"
                                        >
                                            TRY ANOTHER ROOM
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* HISTORY STATE */}
                            {state === "HISTORY" && (
                                <div className="p-4 h-full">
                                    <div className="flex items-center justify-between mb-4">
                                        <h2 className="text-xl font-serif text-white">YOUR VISIONS</h2>
                                        {history.length > 0 && (
                                            <button onClick={clearHistory} className="text-red-500/50 hover:text-red-500 transition-colors">
                                                <Trash2 size={16} />
                                            </button>
                                        )}
                                    </div>

                                    {history.length === 0 ? (
                                        <div className="text-center text-gray-500 mt-10">
                                            <p className="mb-4">No visions saved yet.</p>
                                            <button onClick={() => setState("UPLOAD")} className="text-[#D4AF37] underline">Start Creating</button>
                                        </div>
                                    ) : (
                                        <div className="grid grid-cols-2 gap-3">
                                            {history.map(item => (
                                                <div
                                                    key={item.id}
                                                    className="relative aspect-square bg-white/5 rounded-sm overflow-hidden border border-white/10 group cursor-pointer"
                                                    onClick={() => {
                                                        setResultImage(item.result);
                                                        setUploadedImage(item.original);
                                                        setState("RESULT");
                                                    }}
                                                >
                                                    <Image src={item.result} alt="History" fill className="object-cover" />
                                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-2">
                                                        <span className="text-[10px] text-white font-mono bg-[#D4AF37]/80 px-1">{item.vibe.toUpperCase()}</span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            )}

                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
