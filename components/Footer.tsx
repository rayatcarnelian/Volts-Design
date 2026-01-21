import Link from "next/link";
import { Instagram, Mail, MessageCircle } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-[#050505] border-t border-white/5 pt-20 pb-8 px-6 md:px-12">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 mb-20">

                    {/* Brand */}
                    <div className="col-span-1 md:col-span-2">
                        <Link href="/" className="text-3xl font-serif text-[#E5E5E5] tracking-widest block mb-6">
                            VOLTS DESIGN
                        </Link>
                        <p className="text-gray-400 max-w-sm font-sans leading-relaxed">
                            Architecting atmosphere through light. We define the mood, enhance the texture, and elevate the experience of every space.
                        </p>
                    </div>

                    {/* Directory */}
                    <div>
                        <h4 className="text-[#D4AF37] font-mono text-xs tracking-widest uppercase mb-6">Directory</h4>
                        <ul className="space-y-4 font-mono text-sm text-gray-300">
                            <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
                            <li><Link href="/portfolio" className="hover:text-white transition-colors">Portfolio</Link></li>
                            <li><Link href="/#services" className="hover:text-white transition-colors">Services</Link></li>
                            <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="text-[#D4AF37] font-mono text-xs tracking-widest uppercase mb-6">Contact</h4>
                        <ul className="space-y-4 font-mono text-sm text-gray-300">
                            <li className="flex items-center gap-3">
                                <Mail size={16} className="text-[#D4AF37]" />
                                <a href="mailto:management@voltsdesign.com" className="hover:text-white transition-colors">management@voltsdesign.com</a>
                            </li>
                            <li className="flex items-center gap-3">
                                <MessageCircle size={16} className="text-[#D4AF37]" />
                                <a href="https://wa.me/60182753483" target="_blank" className="hover:text-white transition-colors">+60 18-275 3483</a>
                            </li>
                            <li className="flex items-center gap-3">
                                <Instagram size={16} className="text-[#D4AF37]" />
                                <a href="https://instagram.com/volts.electra" target="_blank" className="hover:text-white transition-colors">@volts.electra</a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-white/5 pt-8 text-center md:text-left flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-xs font-mono text-gray-600 tracking-widest uppercase">
                        © 2026 Volts Design. All Rights Reserved.
                    </p>
                    <p className="text-xs font-mono text-gray-600 tracking-widest uppercase">
                        Kuala Lumpur • Malaysia
                    </p>
                </div>
            </div>
        </footer>
    );
}
