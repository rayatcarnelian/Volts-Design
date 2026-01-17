"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { name: "PORTFOLIO", href: "/portfolio" },
        { name: "SERVICES", href: "/#services" },
        { name: "CONTACT", href: "/contact" },
    ];

    return (
        <>
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-[#050505]/80 backdrop-blur-md py-4 border-b border-white/5" : "bg-transparent py-6"
                    }`}
            >
                <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
                    {/* Logo - Inverted & Blended for Dark Mode */}
                    {/* Logo - Color Corrected for Dark Mode */}
                    {/* Logo - Text Based for Perfect Integration */}
                    <Link href="/" className="text-2xl font-serif text-[#E5E5E5] tracking-widest relative z-50 hover:text-white transition-colors">
                        VOLTS DESIGN
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center gap-12">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="text-xs font-mono tracking-[0.2em] text-[#E5E5E5] hover:text-[#D4AF37] transition-colors relative group"
                            >
                                {link.name}
                                <span className="absolute -bottom-2 left-0 w-0 h-px bg-[#D4AF37] transition-all group-hover:w-full" />
                            </Link>
                        ))}
                        <Link
                            href="https://wa.me/60182753483"
                            target="_blank"
                            className="bg-[#D4AF37] text-black px-6 py-2 text-xs font-bold font-mono tracking-wider hover:bg-white transition-colors"
                        >
                            LET'S TALK
                        </Link>
                    </div>

                    {/* Mobile Menu Toggle */}
                    <button
                        className="md:hidden text-white"
                        onClick={() => setMobileMenuOpen(true)}
                    >
                        <Menu className="w-6 h-6" />
                    </button>
                </div>
            </motion.nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: "100%" }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: "100%" }}
                        transition={{ type: "tween", duration: 0.4 }}
                        className="fixed inset-0 z-50 bg-[#050505] flex flex-col items-center justify-center space-y-8"
                    >
                        <button
                            className="absolute top-8 right-8 text-white"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            <X className="w-8 h-8" />
                        </button>

                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="text-2xl font-serif text-white hover:text-[#D4AF37] transition-colors"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
