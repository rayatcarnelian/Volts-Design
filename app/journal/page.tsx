"use client";

import Navbar from "@/components/Navbar";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const JOURNAL_ENTRIES = [
    {
        id: 1,
        title: "The Invisible Architecture",
        subtitle: "How we lit a 400-year-old stone villa without drilling a single hole.",
        category: "CASE STUDY",
        date: "OCT 2025",
        image: "https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2000&auto=format&fit=crop",
        slug: "invisible-architecture"
    },
    {
        id: 2,
        title: "Shadow as a Material",
        subtitle: "Why we destroy light to create atmosphere in the Kuala Lumpur penthouse.",
        category: "PHILOSOPHY",
        date: "SEP 2025",
        image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=2000&auto=format&fit=crop",
        slug: "shadow-material"
    },
    {
        id: 3,
        title: "The 2700K Manifesto",
        subtitle: "The biological reason we refuse to install 4000K lights in bedrooms.",
        category: "SCIENCE",
        date: "AUG 2025",
        image: "https://images.unsplash.com/photo-1565538810643-b5bdb714032a?q=80&w=2000&auto=format&fit=crop",
        slug: "2700k-manifesto"
    }
];

export default function JournalPage() {
    return (
        <main className="bg-[#050505] min-h-screen text-[#E5E5E5] selection:bg-[#D4AF37] selection:text-black">
            <Navbar />

            {/* Editorial Hero */}
            <section className="pt-40 pb-20 px-6 md:px-12 max-w-[90rem] mx-auto min-h-[60vh] flex flex-col justify-end">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                >
                    <span className="font-mono text-xs tracking-[0.4em] text-[#D4AF37] mb-6 block">VOLTS EDITORIAL</span>
                    <h1 className="text-6xl md:text-9xl font-serif leading-[0.9] mb-8">
                        The <br />
                        <span className="italic text-white/50">Journal.</span>
                    </h1>
                    <p className="max-w-xl text-lg text-gray-400 leading-relaxed font-light">
                        A collection of thoughts on photonics, architecture, and the emotional weight of brightness.
                        We explore not just how to light a room, but why.
                    </p>
                </motion.div>
            </section>

            {/* Entry List */}
            <section className="px-6 md:px-12 pb-32 max-w-[90rem] mx-auto">
                <div className="grid grid-cols-1 gap-32">
                    {JOURNAL_ENTRIES.map((entry, index) => (
                        <motion.article
                            key={entry.id}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="group cursor-none"
                        >
                            <Link href={`/journal/${entry.slug}`} className="block">
                                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
                                    {/* Image Side */}
                                    <div className={`lg:col-span-7 relative h-[60vh] overflow-hidden ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                                        <Image
                                            src={entry.image}
                                            alt={entry.title}
                                            fill
                                            className="object-cover transition-transform duration-[1.5s] ease-[0.2,0,0,1] group-hover:scale-110 grayscale group-hover:grayscale-0"
                                        />
                                        <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-700" />
                                    </div>

                                    {/* Text Side */}
                                    <div className={`lg:col-span-5 flex flex-col justify-center h-full py-8 ${index % 2 === 1 ? 'lg:order-1 lg:text-right items-end' : ''}`}>
                                        <div className="border-t border-white/20 pt-6 w-full mb-6 flex justify-between items-center text-xs font-mono tracking-widest text-[#D4AF37]">
                                            <span>{entry.category}</span>
                                            <span>{entry.date}</span>
                                        </div>
                                        <h2 className="text-4xl md:text-6xl font-serif mb-6 leading-tight group-hover:text-white transition-colors duration-300">
                                            {entry.title}
                                        </h2>
                                        <p className="text-gray-400 text-lg leading-relaxed max-w-md mb-8">
                                            {entry.subtitle}
                                        </p>
                                        <div className="inline-block border border-white/20 px-8 py-3 rounded-full text-xs font-mono tracking-widest group-hover:bg-[#D4AF37] group-hover:text-black group-hover:border-[#D4AF37] transition-all duration-300">
                                            READ STORY
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </motion.article>
                    ))}
                </div>
            </section>
        </main>
    );
}
