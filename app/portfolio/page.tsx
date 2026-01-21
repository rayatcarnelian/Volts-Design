"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";

// Expanded Data with Descriptions and Gallery Images
const allProjects = [
    // Commercial / Retail
    {
        id: 1,
        title: "Aetas Sales Gallery",
        category: "Commercial",
        src: "/projects/project-1.png",
        location: "Kuala Lumpur",
        description: "A symphony of light and shadow designed to elevate the property viewing experience. We utilized warm, concealed linear lighting to guide visitors through the space, creating an emotional journey from entrance to closing.",
        gallery: ["/projects/project-1.png", "/projects/project-3.jpg", "/projects/project-5.jpg"]
    },
    {
        id: 2,
        title: "Old Town Heritage",
        category: "Commercial",
        src: "/projects/project-3.jpg",
        location: "Ipoh",
        description: "Revitalizing a historic landmark with modern illumination techniques while preserving its colonial charm. The lighting design focuses on highlighting architectural textures—brick, wood, and plaster—without overpowering the original aesthetic.",
        gallery: ["/projects/project-3.jpg", "/projects/project-1.png", "/projects/retail/gold-hill-1.jpg"]
    },
    {
        id: 3,
        title: "Gold Hill Bistro",
        category: "F&B",
        src: "/projects/retail/gold-hill-1.jpg",
        location: "Genting Highlands",
        description: "An intimate dining atmosphere crafted through layered lighting. Low-kelvin pendants create pockets of privacy for diners, while architectural accent lights reveal the richness of the interior materials.",
        gallery: ["/projects/retail/gold-hill-1.jpg", "/projects/retail/gold-hill-2.jpg", "/projects/retail/golden-sun-1.jpg"]
    },
    // ... (Other projects would follow similar pattern, keeping it concise for now)
    { id: 4, title: "Gold Hill Lounge", category: "F&B", src: "/projects/retail/gold-hill-2.jpg", location: "Genting Highlands", description: "A luxurious lounge setting requiring dynamic lighting control. We implemented a DALI system to shift the mood from a bright afternoon tea setting to a moody, high-contrast evening cocktail vibe.", gallery: ["/projects/retail/gold-hill-2.jpg"] },
    { id: 11, title: "Golden Sun Club", category: "F&B", src: "/projects/retail/golden-sun-1.jpg", location: "Kuala Lumpur", description: "High-energy nightlife lighting design using programmed LED pixels and moving heads to synchronize with the music, creating an immersive sensory experience.", gallery: ["/projects/retail/golden-sun-1.jpg"] },
    { id: 12, title: "Upper Palace (TRX)", category: "F&B", src: "/projects/retail/upper-palace-1.jpg", location: "TRX Exchange", description: "The pinnacle of fine dining at TRX. Crystal chandeliers meet precision spot-lighting to make every dish look like a jewel.", gallery: ["/projects/retail/upper-palace-1.jpg"] },
    { id: 5, title: "Mitsui HQ", category: "Office", src: "/projects/project-5.jpg", location: "Mitsui Park", description: "Human-centric office lighting designed to improve productivity and well-being. Circadian rhythm programming adjusts color temperature throughout the day.", gallery: ["/projects/project-5.jpg"] },
    { id: 6, title: "Panel Plus Office", category: "Office", src: "/projects/office/panel-plus-1.jpg", location: "Kuala Lumpur", description: "A modern, minimalist workspace where light acts as the primary wayfinding tool. Linear profiles define circulation paths and meeting zones.", gallery: ["/projects/office/panel-plus-1.jpg"] },
    { id: 7, title: "Panel Plus Meeting", category: "Office", src: "/projects/office/panel-plus-2.jpg", location: "Kuala Lumpur", description: "A focused environment for high-stakes decision making. Glare-free illumination ensures comfort during long video conferences.", gallery: ["/projects/office/panel-plus-2.jpg"] },
    { id: 8, title: "The Oval Residence", category: "Residential", src: "/projects/residential/oval-1.jpg", location: "KLCC", description: "Ultra-luxury residential lighting. We integrated lighting into joinery and coves to eliminate visual clutter, letting the view of the Twin Towers take center stage.", gallery: ["/projects/residential/oval-1.jpg"] },
    { id: 9, title: "The Oval Interior", category: "Residential", src: "/projects/residential/oval-2.jpg", location: "KLCC", description: "Interior warmth and sophistication. Every fixture was chosen to complement the bespoke furniture and artwork collection of the client.", gallery: ["/projects/residential/oval-2.jpg"] },
    { id: 10, title: "Private Villa", category: "Residential", src: "/projects/project-1.png", location: "Damansara", description: "A sanctuary in the city. Landscape lighting integrates the indoor living spaces with the lush outdoor garden, blurring the boundaries of the home.", gallery: ["/projects/project-1.png"] },
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
