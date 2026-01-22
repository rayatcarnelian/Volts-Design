"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";

// Expanded Data with Descriptions and Gallery Images
const allProjects = [
    {
        id: 1,
        title: "Aetas Sales Gallery",
        category: "Commercial",
        src: "/projects/aetas-sales/Screenshot_1.png",
        location: "Kuala Lumpur",
        description: "A symphony of light and shadow designed to elevate the property viewing experience. We utilized warm, concealed linear lighting to guide visitors through the space, creating an emotional journey from entrance to closing.",
        gallery: ["/projects/aetas-sales/Screenshot_1.png", "/projects/aetas-sales/Screenshot_2.png", "/projects/aetas-sales/Screenshot_3.png"]
    },
    {
        id: 11,
        title: "Golden Sun Club",
        category: "F&B",
        src: "/projects/golden-sun/487171515_1079218950898186_3249925751065150302_n.jpg",
        location: "Kuala Lumpur",
        description: "High-energy nightlife lighting design using programmed LED pixels and moving heads to synchronize with the music, creating an immersive sensory experience.",
        gallery: ["/projects/golden-sun/487103027_1079218937564854_2730222437339798446_n.jpg", "/projects/golden-sun/486802347_1079219144231500_1366745404938446586_n.jpg", "/projects/golden-sun/488023151_1079218960898185_1917273508085614533_n.jpg"]
    },
    {
        id: 3,
        title: "Empire of Gold",
        category: "F&B",
        src: "/projects/gold-hill/476235808_122221614434026826_2363352486470271201_n.jpg",
        location: "Genting Highlands",
        description: "An intimate dining atmosphere crafted through layered lighting. Low-kelvin pendants create pockets of privacy for diners, while architectural accent lights reveal the richness of the interior materials.",
        gallery: ["/projects/gold-hill/476235808_122221614434026826_2363352486470271201_n.jpg", "/projects/gold-hill/476351071_122221614230026826_2626066982721069945_n (1).jpg", "/projects/gold-hill/476449139_122221614644026826_242461573600559703_n (1).jpg"]
    },
    {
        id: 12,
        title: "Upper Palace (TRX)",
        category: "F&B",
        src: "/projects/upper-palace/530620448_3268468223300999_7778033962337080290_n.jpg",
        location: "TRX Exchange",
        description: "The pinnacle of fine dining at TRX. Crystal chandeliers meet precision spot-lighting to make every dish look like a jewel.",
        gallery: ["/projects/upper-palace/530620448_3268468223300999_7778033962337080290_n.jpg", "/projects/upper-palace/medium-0001c298fd1684c151ca17910938fc91.jpg"]
    },
    {
        id: 6,
        title: "Panel Plus HQ",
        category: "Office",
        src: "/projects/panel-plus/IMG-20251123-WA0064.jpg",
        location: "Industrial Park",
        description: "Industrial chic office lighting. Linear pendants and cool white tones foster focus and clarity in this modern workspace.",
        gallery: ["/projects/panel-plus/IMG-20251123-WA0066.jpg", "/projects/panel-plus/IMG-20251123-WA0068.jpg"]
    },
    {
        id: 5,
        title: "PJ Bungalow",
        category: "Residential",
        src: "/projects/pj-bungalow/IMG-20250528-WA0016.jpg",
        location: "Petaling Jaya",
        description: "A private residence illuminated with warmth and subtly. Landscape lighting extends the living space outdoors.",
        gallery: ["/projects/pj-bungalow/IMG-20250528-WA0017.jpg", "/projects/pj-bungalow/IMG-20250528-WA0018.jpg"]
    },
    {
        id: 13,
        title: "Aetas Show Unit",
        category: "Residential",
        src: "/projects/aetas/Screenshot_1.png",
        location: "Damansara",
        description: "Luxury show unit lighting design designed to highlight textures and finishes.",
        gallery: ["/projects/aetas/Screenshot_1.png", "/projects/aetas/Screenshot_2.png", "/projects/aetas/Screenshot_3.png"]
    }
];

const categories = ["All", "Residential", "Commercial", "Office", "F&B"];

import { Suspense } from "react";

// ... imports remain the same

function PortfolioContent() {
    const searchParams = useSearchParams();
    const initialCategory = searchParams.get("category");
    const [activeCategory, setActiveCategory] = useState(initialCategory && categories.includes(initialCategory) ? initialCategory : "All");
    const [selectedProject, setSelectedProject] = useState<typeof allProjects[0] | null>(null);

    // Lock body scroll when modal is open
    useEffect(() => {
        if (selectedProject) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [selectedProject]);

    const filteredProjects = activeCategory === "All"
        ? allProjects
        : allProjects.filter(p => p.category === activeCategory || (activeCategory === "Commercial" && p.category === "F&B"));

    return (
        <main className="bg-[#050505] min-h-screen text-white">
            <Navbar />

            {/* Header */}
            <section className="pt-40 pb-20 px-6 text-center">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-5xl md:text-7xl font-serif text-[#E5E5E5] mb-6"
                >
                    MY SELECTED <span className="text-[#D4AF37]">PROJECTS</span>
                </motion.h1>
                <p className="max-w-xl mx-auto text-gray-400 font-sans">
                    A definitive collection of light architecture.
                </p>
            </section>

            {/* Filter */}
            <section className="px-6 mb-16 flex flex-wrap justify-center gap-4">
                {categories.map((cat) => (
                    <button
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        className={`px-6 py-2 rounded-full text-sm font-mono tracking-widest transition-all duration-300 border ${activeCategory === cat
                            ? "bg-[#D4AF37] text-black border-[#D4AF37]"
                            : "bg-transparent text-gray-400 border-white/10 hover:border-[#D4AF37]"
                            }`}
                    >
                        {cat}
                    </button>
                ))}
            </section>

            {/* Grid */}
            <section className="px-6 md:px-12 pb-32 max-w-8xl mx-auto">
                <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <AnimatePresence mode="popLayout">
                        {filteredProjects.map((project) => (
                            <motion.div
                                layout
                                key={project.id}
                                layoutId={`project-${project.id}`}
                                onClick={() => setSelectedProject(project)}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.3 }}
                                className="group relative aspect-[4/5] bg-[#121212] overflow-hidden cursor-pointer"
                            >
                                <Image
                                    src={project.src}
                                    alt={project.title}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                                />

                                {/* Overlay */}
                                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center text-center p-6">
                                    <h3 className="text-2xl font-serif text-white mb-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                        {project.title}
                                    </h3>
                                    <span className="text-[#D4AF37] font-mono text-xs tracking-widest uppercase translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">
                                        {project.location}
                                    </span>
                                    <span className="mt-4 text-xs font-sans text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity delay-150">
                                        Click to explore
                                    </span>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>
            </section>

            {/* Project Modal */}
            <AnimatePresence>
                {selectedProject && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[60] bg-black/95 backdrop-blur-sm overflow-y-auto"
                        onClick={() => setSelectedProject(null)}
                        data-lenis-prevent
                    >
                        {/* Close Button */}
                        <button
                            className="fixed top-8 right-8 z-70 text-white mixer-blend-difference"
                            onClick={() => setSelectedProject(null)}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                        </button>

                        <div className="min-h-screen px-6 py-20 md:py-32 max-w-5xl mx-auto" onClick={(e) => e.stopPropagation()}>
                            <motion.div
                                layoutId={`project-${selectedProject.id}`}
                                className="relative aspect-video w-full mb-12 rounded-sm overflow-hidden"
                            >
                                <Image
                                    src={selectedProject.src}
                                    alt={selectedProject.title}
                                    fill
                                    className="object-cover"
                                    priority
                                />
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                            >
                                <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-12">
                                    <div>
                                        <h2 className="text-4xl md:text-6xl font-serif text-white mb-2">{selectedProject.title}</h2>
                                        <p className="text-[#D4AF37] font-mono tracking-widest text-sm">{selectedProject.location} — {selectedProject.category}</p>
                                    </div>
                                    <p className="max-w-md text-gray-300 font-sans leading-relaxed text-lg">
                                        {selectedProject.description}
                                    </p>
                                </div>

                                {/* Gallery Grid */}
                                {selectedProject.gallery && selectedProject.gallery.length > 0 && (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {selectedProject.gallery.map((img, i) => (
                                            <div key={i} className={`relative bg-[#121212] overflow-hidden ${i === 0 ? "aspect-video md:col-span-2" : "aspect-square"}`}>
                                                <Image
                                                    src={img}
                                                    alt={`${selectedProject.title} detail ${i + 1}`}
                                                    fill
                                                    className="object-cover hover:scale-105 transition-transform duration-700"
                                                />
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

        </main>
    );
}

export default function PortfolioPage() {
    return (
        <Suspense fallback={<div className="bg-[#050505] min-h-screen" />}>
            <PortfolioContent />
        </Suspense>
    );
}
