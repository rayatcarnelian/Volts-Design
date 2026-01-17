"use client";

import Navbar from "@/components/Navbar";
import { Mail, Instagram, MessageCircle } from "lucide-react";

export default function Contact() {
    return (
        <main className="bg-[#050505] min-h-screen text-white flex flex-col relative overflow-hidden">
            <Navbar />

            {/* Background Gradient */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(20,20,20,1),#050505)] z-0 pointer-events-none" />

            <div className="flex-1 flex flex-col md:flex-row max-w-7xl mx-auto w-full z-10 pt-32 pb-12 px-6 gap-12 lg:gap-24">

                {/* Left Side: Text & Direct Contact */}
                <div className="flex-1 flex flex-col justify-center">
                    <h1 className="text-5xl md:text-7xl font-serif text-[#E5E5E5] mb-8 leading-tight">
                        START A <br /> <span className="text-[#D4AF37] italic">DIALOGUE.</span>
                    </h1>
                    <p className="text-gray-400 font-sans text-lg mb-12 max-w-md leading-relaxed">
                        We are selective with our collaborations. Tell us about your vision, and let's see if we are the right architects for your light.
                    </p>

                    <div className="space-y-6 font-mono text-sm tracking-widest">
                        <div className="flex items-center gap-4 text-gray-300 hover:text-white transition-colors">
                            <Mail className="w-5 h-5 text-[#D4AF37]" />
                            <a href="mailto:hazem@voltsdesign.com">HAZEM@VOLTSDESIGN.COM</a>
                        </div>
                        <div className="flex items-center gap-4 text-gray-300 hover:text-white transition-colors">
                            <MessageCircle className="w-5 h-5 text-[#D4AF37]" />
                            <a href="https://wa.me/60182753483" target="_blank" rel="noopener noreferrer">+60 18-275 3483</a>
                        </div>
                        <div className="flex items-center gap-4 text-gray-300 hover:text-white transition-colors">
                            <Instagram className="w-5 h-5 text-[#D4AF37]" />
                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">@VOLTS.DESIGN</a>
                        </div>
                    </div>
                </div>

                {/* Right Side: Professional Form */}
                <div className="flex-1 flex flex-col justify-center">
                    <form className="bg-white/5 border border-white/10 p-8 md:p-12 rounded-sm backdrop-blur-sm space-y-8" onSubmit={(e) => e.preventDefault()}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-xs font-mono text-[#D4AF37] tracking-widest uppercase">Name</label>
                                <input type="text" className="w-full bg-transparent border-b border-white/20 py-2 text-white focus:border-white focus:outline-none transition-colors" placeholder="John Doe" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-mono text-[#D4AF37] tracking-widest uppercase">Contact</label>
                                <input type="text" className="w-full bg-transparent border-b border-white/20 py-2 text-white focus:border-white focus:outline-none transition-colors" placeholder="Email or Phone" />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-mono text-[#D4AF37] tracking-widest uppercase">Project Type</label>
                            <select className="w-full bg-transparent border-b border-white/20 py-2 text-white/50 focus:border-white focus:outline-none transition-colors">
                                <option className="bg-[#121212]">Residential (Villa/Penthouse)</option>
                                <option className="bg-[#121212]">Commercial (Hotel/Office)</option>
                                <option className="bg-[#121212]">Art Installation</option>
                                <option className="bg-[#121212]">Other</option>
                            </select>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-mono text-[#D4AF37] tracking-widest uppercase">Message</label>
                            <textarea rows={4} className="w-full bg-transparent border-b border-white/20 py-2 text-white focus:border-white focus:outline-none transition-colors" placeholder="Tell us about your space..."></textarea>
                        </div>

                        <button className="w-full bg-[#D4AF37] text-black font-bold font-mono tracking-widest py-4 hover:bg-white transition-colors uppercase text-sm mt-4">
                            Send Inquiry
                        </button>
                    </form>
                </div>

            </div>

            <footer className="py-8 border-t border-white/5 text-center z-10">
                <p className="text-xs font-mono text-gray-600 tracking-widest uppercase">
                    © 2026 Volts Design.
                </p>
            </footer>
        </main>
    );
}
