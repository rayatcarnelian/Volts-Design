"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, Cpu, Image as ImageIcon, Loader2 } from "lucide-react";

export default function VoltsBot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<{ role: "assistant" | "user"; content: string; type?: "text" | "analysis" }[]>([
        { role: "assistant", content: "Systems Online. I am Volts Intelligence. I am engineered with Hazem's lighting philosophy. Ask me about CRI, beam angles, residential layering, or upload a photo for analysis.", type: "text" }
    ]);
    const [inputValue, setInputValue] = useState("");
    const [isThinking, setIsThinking] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isThinking]);

    const handleSendMessage = async () => {
        if (!inputValue.trim()) return;

        const userMsg = inputValue;
        const newHistory = [...messages, { role: "user" as const, content: userMsg }];

        setMessages(newHistory);
        setInputValue("");
        setIsThinking(true);

        try {
            const response = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ messages: newHistory.filter(m => m.type !== "analysis") }), // Send only text history
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Failed to connect to Volts Mainframe.");
            }

            setMessages(prev => [...prev, { role: "assistant", content: data.reply }]);
        } catch (error) {
            console.error("Chat Error", error);
            setMessages(prev => [...prev, { role: "assistant", content: "Connection Interrupted. Please try again." }]);
        } finally {
            setIsThinking(false);
        }
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setMessages(prev => [...prev, { role: "user", content: `[Uploaded Image: ${file.name}]`, type: "text" }]);
            setIsThinking(true);

            // Simulate Vision Analysis (Vision API is separate, keeping simulation or connecting to vision endpoint later)
            // For now, let's keep the simulation for image upload as it's separate from text chat context usually
            setTimeout(() => {
                setMessages(prev => [...prev, {
                    role: "assistant",
                    content: "ANALYZING VISUAL DATA...\n• Contrast Ratio: Low (Flat lighting)\n• Glare Source Warning: Central fixture detected\n• Color Quality: Estimated CRI <80 (Green spike detected)\n\nRECOMMENDATION: Remove central glare bomb. Introduce perimeter grazing to highlight wall textures. Add low-level warm accent lighting (2700K) to create visual hierarchy.",
                    type: "analysis"
                }]);
                setIsThinking(false);
            }, 3000);
        }
    };

    return (
        <>
            <AnimatePresence>
                {!isOpen && (
                    <motion.button
                        initial={{ scale: 0, rotate: -20 }}
                        animate={{ scale: 1, rotate: 0 }}
                        exit={{ scale: 0, rotate: 20 }}
                        whileHover={{ scale: 1.1 }}
                        className="fixed bottom-6 right-6 z-50 bg-[#D4AF37] text-black w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:shadow-[#D4AF37]/50 transition-shadow"
                        onClick={() => setIsOpen(true)}
                    >
                        <MessageSquare className="w-6 h-6" />
                    </motion.button>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.9 }}
                        className="fixed bottom-6 right-6 z-50 w-[90vw] md:w-[400px] h-[600px] bg-[#0A0A0A] border border-[#333] rounded-lg shadow-2xl flex flex-col overflow-hidden backdrop-blur-md"
                    >
                        {/* Header */}
                        <div className="p-4 border-b border-[#333] flex items-center justify-between bg-[#121212]">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-[#D4AF37]/20 flex items-center justify-center text-[#D4AF37]">
                                    <Cpu className="w-4 h-4" />
                                </div>
                                <div>
                                    <h3 className="text-white text-sm font-bold font-mono tracking-wide">VOLTS INTELLIGENCE</h3>
                                    <div className="flex items-center gap-1">
                                        <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                                        <span className="text-[10px] text-gray-400 font-mono">SYSTEM ONLINE</span>
                                    </div>
                                </div>
                            </div>
                            <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-gray-800">
                            {messages.map((msg, idx) => (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    key={idx}
                                    className={`flex ${msg.role === "assistant" ? "justify-start" : "justify-end"}`}
                                >
                                    <div
                                        className={`max-w-[85%] p-3 rounded-lg text-sm leading-relaxed whitespace-pre-line ${msg.role === "assistant"
                                            ? "bg-[#1A1A1A] text-gray-200 border border-white/5 font-mono"
                                            : "bg-[#D4AF37] text-black font-sans font-medium"
                                            }`}
                                    >
                                        {msg.content}
                                    </div>
                                </motion.div>
                            ))}

                            {isThinking && (
                                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                                    <div className="bg-[#1A1A1A] p-3 rounded-lg flex items-center gap-2 border border-white/5">
                                        <Loader2 className="w-4 h-4 text-[#D4AF37] animate-spin" />
                                        <span className="text-xs text-gray-500 font-mono">PROCESSING...</span>
                                    </div>
                                </motion.div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input */}
                        <div className="p-4 border-t border-[#333] bg-[#0A0A0A]">
                            <div className="flex items-center gap-2">
                                <label className="cursor-pointer p-2 text-gray-400 hover:text-[#D4AF37] transition-colors">
                                    <ImageIcon className="w-5 h-5" />
                                    <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
                                </label>
                                <input
                                    type="text"
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                                    placeholder="Ask about lighting..."
                                    className="flex-1 bg-[#1A1A1A] border border-[#333] rounded-md px-3 py-2 text-sm text-white focus:outline-none focus:border-[#D4AF37] font-mono"
                                />
                                <button
                                    onClick={handleSendMessage}
                                    className="p-2 bg-[#D4AF37] rounded-md text-black hover:bg-white transition-colors"
                                >
                                    <Send className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
