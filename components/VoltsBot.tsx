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

    // Knowledge Base Simulation
    const generateResponse = (input: string) => {
        const lower = input.toLowerCase();
        const disclaimer = "\n\n(Note: This is an automated architectural response. For precise project details, please contact Hazem via the form above.)";

        // --- PHYSICS & TECHNICAL ---
        if (lower.includes("cri") || lower.includes("rendering")) return "CRI (Color Rendering Index) is non-negotiable. We strictly use CRI 95+ (R9 > 90) fixtures. Standard LEDs (CRI 80) make wood look red and skin look grey. Good lighting renders reality as it was meant to be seen." + disclaimer;
        if (lower.includes("kelvin") || lower.includes("temperature") || lower.includes("warm") || lower.includes("cool")) return "For residential, 2700K is the gold standard for intimate warmth. Kitchens/Bathrooms can handle 3000K for clarity. We avoid 4000K+ unless it's a clinical environment. A home should feel like a sanctuary, not a pharmacy." + disclaimer;
        if (lower.includes("lux") || lower.includes("lumen") || lower.includes("bright")) return "brightness is relative. We design for 'Perceived Brightness' (vertical illumination) rather than just Lux on the floor. 150 Lux is plenty for a living room if the walls are washed effectively." + disclaimer;
        if (lower.includes("beam") || lower.includes("angle") || lower.includes("spread")) return "Beam angle is our paintbrush. 10°-15° for pinpointing art. 24°-36° for task surfaces. 60°+ for general floods. Mixing beam angles creates hierarchy and drama in a space." + disclaimer;
        if (lower.includes("glare") || lower.includes("ugr")) return "Glare is the enemy of luxury. All our specified fixtures use deep-baffle technology or honeycomb louvers to ensure you see the light, not the source. This is what separates 'lights' from 'lighting design'." + disclaimer;

        // --- DESIGN TECHNIQUES ---
        if (lower.includes("layer") || lower.includes("ambient") || lower.includes("task")) return "We use the 'Three-Layer' principle: 1. Ambient (Soft fill), 2. Task (Functional), 3. Accent (Emotional). Most failures in design come from relying on just one layer (usually a grid of downlights)." + disclaimer;
        if (lower.includes("cove") || lower.includes("indirect") || lower.includes("ceiling")) return "Indirect cove lighting is the best way to raise perceived ceiling height and create a soft, shadow-free environment. It must be dimmable to transition from 'Day Mode' to 'Evening Mode'." + disclaimer;
        if (lower.includes("wall wash") || lower.includes("graze") || lower.includes("texture")) return "Wall Washing flattens a wall's texture (good for art), while Wall Grazing (light close to the wall) exaggerates texture (good for stone/brick). Choosing the wrong one can ruin a feature wall." + disclaimer;
        if (lower.includes("art") || lower.includes("painting")) return "Lighting art is math. We use the '30-degree rule' to prevent glare reflecting off the glass into your eyes, while using high-CRI framing projectors to cut the light exactly to the canvas shape." + disclaimer;

        // --- RESIDENTIAL AREAS ---
        if (lower.includes("kitchen") || lower.includes("island")) return "For islands, we recommend a high-CRI linear pendant or localized spots for prep work (500 Lux), paired with under-cabinet lighting. Dimmers are mandatory to turn the kitchen from a 'workspace' to a 'hosting space' at night." + disclaimer;
        if (lower.includes("bedroom") || lower.includes("sleep")) return "Bedrooms need low-level lighting. We prefer floor-level guide lights and joinery-integrated lighting over overhead downlights. The goal is to prepare the circadian system for sleep." + disclaimer;
        if (lower.includes("bathroom") || lower.includes("vanity") || lower.includes("mirror")) return "Never put a downlight directly over your head in a bathroom; it causes 'panda eyes'. Light should come from face level (sconces) or mirror-integrated linear sides for flawless grooming." + disclaimer;
        if (lower.includes("living") || lower.includes("lounge")) return "The Living Room is for conversation. Eliminate glare. Use table lamps, floor lamps, and joinery lighting to create 'pools of light' that draw people together." + disclaimer;

        // --- COMMERCIAL ---
        if (lower.includes("hotel") || lower.includes("f&b") || lower.includes("restaurant")) return "In hospitality, darkness is as important as light. We use high contrast ratios (10:1) to create intimacy. Each table should feel private." + disclaimer;
        if (lower.includes("office") || lower.includes("work")) return "Modern offices need to balance screen-glare control with biological support. We recommend Tunable White systems that mimic the sun's pattern (Cool AM, Warm PM) to boost productivity and sleep quality." + disclaimer;

        // --- CONTROL ---
        if (lower.includes("dali") || lower.includes("dim") || lower.includes("control")) return "We specify DALI-2 for robust, addressable control. It allows us to group lights via software, not just wiring. This means you can change your 'Evening Scene' without calling an electrician." + disclaimer;
        if (lower.includes("lutron") || lower.includes("knx")) return "We are certified partners with ecosystems like Lutron and KNX. A single keypad replacing a bank of 6 switches is the ultimate sign of a luxury finish." + disclaimer;

        // --- GENERAL ---
        if (lower.includes("cost") || lower.includes("price") || lower.includes("budget")) return "Architectural lighting is an investment. A typical luxury residence package ranges from RM30k to RM150k depending on fixture grade (Italy/Germany vs. Local) and control complexity." + disclaimer;
        if (lower.includes("hazem") || lower.includes("who are you")) return "I am Volts Intelligence, a neural model trained on Hazem's design principles. Hazem himself is the principal lighting architect, obsessed with photon behavior." + disclaimer;
        if (lower.includes("hello") || lower.includes("hi")) return "Greetings. I am ready to calculate beam angles and contrast ratios. How can I assist with your space?";

        return "That is a specific query. While I have extensive data on CRI, Beam Angles, and DALI systems, this might require Hazem's personal review. I recommend submitting the contact form for a detailed consultation." + disclaimer;
    };

    const handleSendMessage = async () => {
        if (!inputValue.trim()) return;

        const userMsg = inputValue;
        setMessages(prev => [...prev, { role: "user", content: userMsg }]);
        setInputValue("");
        setIsThinking(true);

        // Simulate AI Latency
        setTimeout(() => {
            const reply = generateResponse(userMsg);
            setMessages(prev => [...prev, { role: "assistant", content: reply }]);
            setIsThinking(false);
        }, 1500);
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setMessages(prev => [...prev, { role: "user", content: `[Uploaded Image: ${file.name}]` }]);
            setIsThinking(true);

            // Simulate Vision Analysis
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
