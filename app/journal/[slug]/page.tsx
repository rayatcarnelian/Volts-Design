"use client";

import Navbar from "@/components/Navbar";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRef, use } from "react";

// Mock Data (In reality, this would come from a CMS/MDX)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ARTICLES: Record<string, any> = {
    "invisible-architecture": {
        title: "The Invisible Architecture",
        subtitle: "How we lit a 400-year-old stone villa without drilling a single hole.",
        date: "OCTOBER 24, 2025",
        author: "HAZEM, PRINCIPAL ARCHITECT",
        heroImage: "https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2000&auto=format&fit=crop",
        content: [
            { type: "text", value: "The challenge was silence. The villa, a heritage site in the rolling hills, demanded respect. The stone walls were 400 years old, thick, cool, and impenetrable. The client wanted 'modern luxury', but the building whispered 'history'." },
            { type: "quote", value: "Light should be felt, not seen. If you see the fixture, we have failed." },
            { type: "text", value: "We couldn't cut channels. We couldn't mount tracks. We had to become invisible. The solution lay in the floor. We engineered custom up-lighting systems that sat within the grout lines of the new stone flooring, grazing the ancient walls with a warm 2700K wash." },
            { type: "image", value: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=2000&auto=format&fit=crop" },
            { type: "text", value: "The result is a space that glows from within. At night, the heavy stone feels weightless. The architecture is not just preserved; it is celebrated. This is the paradox of our work: to add something new that feels like it has always been there." }
        ]
    }
};

export default function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = use(params);
    // In strict Next.js, use(params) or await params is needed for async, but for static/client simplify:
    const article = ARTICLES[slug] || ARTICLES["invisible-architecture"]; // Use slug or fallback

    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({ target: containerRef });
    const y = useTransform(scrollYProgress, [0, 1], [0, 200]); // Parallax

    if (!article) return <div className="text-white pt-40 px-12">Article Not Found</div>;

    return (
        <main className="bg-[#050505] min-h-screen text-[#E5E5E5] selection:bg-[#D4AF37] selection:text-black" ref={containerRef}>
            <Navbar />

            {/* Sticky Back Button */}
            <div className="fixed top-32 left-6 z-40 hidden lg:block mix-blend-difference">
                <Link href="/journal" className="flex items-center gap-2 text-white hover:text-[#D4AF37] transition-colors group">
                    <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                    <span className="font-mono text-xs tracking-widest">BACK TO JOURNAL</span>
                </Link>
            </div>

            {/* Article Hero */}
            <div className="relative h-[80vh] w-full overflow-hidden">
                <motion.div style={{ y }} className="absolute inset-0 w-full h-full">
                    <Image
                        src={article.heroImage}
                        alt={article.title}
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-black/40" />
                </motion.div>

                <div className="absolute bottom-0 left-0 w-full p-6 md:p-24 flex flex-col items-start bg-gradient-to-t from-black/90 to-transparent">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                    >
                        <div className="flex gap-6 text-xs font-mono tracking-[0.2em] text-[#D4AF37] mb-6">
                            <span>{article.date}</span>
                            <span>{article.author}</span>
                        </div>
                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif leading-[1.1] max-w-5xl">
                            {article.title}
                        </h1>
                    </motion.div>
                </div>
            </div>

            {/* Content Body */}
            <article className="max-w-3xl mx-auto px-6 py-24 md:py-32">
                <div className="prose prose-invert prose-lg md:prose-xl prose-p:font-light prose-p:text-gray-300 prose-headings:font-serif prose-headings:font-normal">
                    <h3 className="font-serif text-3xl md:text-4xl italic text-white/60 mb-16 leading-relaxed">
                        {article.subtitle}
                    </h3>

                    {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                    {article.content.map((block: any, i: number) => {
                        if (block.type === "text") {
                            return <p key={i} className="mb-12 leading-loose">{block.value}</p>;
                        }
                        if (block.type === "quote") {
                            return (
                                <blockquote key={i} className="border-l-2 border-[#D4AF37] pl-8 my-16">
                                    <p className="font-serif text-3xl md:text-5xl italic text-white leading-tight">
                                        &quot;{block.value}&quot;
                                    </p>
                                </blockquote>
                            );
                        }
                        if (block.type === "image") {
                            return (
                                <div key={i} className="relative w-full h-[60vh] my-16 rounded-sm overflow-hidden">
                                    <Image
                                        src={block.value}
                                        alt="Detail shot"
                                        fill
                                        className="object-cover hover:scale-105 transition-transform duration-700"
                                    />
                                </div>
                            );
                        }
                        return null;
                    })}
                </div>

                {/* Author Signoff */}
                <div className="mt-32 pt-16 border-t border-white/10 flex items-center gap-6">
                    <div className="w-16 h-16 bg-[#D4AF37] rounded-full flex items-center justify-center font-serif text-black text-2xl font-bold">H</div>
                    <div>
                        <p className="text-white font-serif text-lg">Hazem</p>
                        <p className="text-gray-500 font-mono text-xs tracking-widest">PRINCIPAL ARCHITECT</p>
                    </div>
                </div>
            </article>

        </main>
    );
}
