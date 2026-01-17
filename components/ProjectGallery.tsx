"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const projects = [
    {
        id: 1,
        title: "Aetas Sales Gallery",
        category: "Commercial",
        src: "/projects/project-1.png",
        gridClass: "md:col-span-2 md:row-span-2",
    },
    {
        id: 2,
        title: "Old Town Heritage",
        category: "Facade",
        src: "/projects/project-3.jpg",
        gridClass: "md:col-span-1 md:row-span-1",
    },
    {
        id: 3,
        title: "Mitsui Offices",
        category: "Office",
        src: "/projects/project-5.jpg",
        gridClass: "md:col-span-1 md:row-span-1",
    },
    {
        id: 4,
        title: "Aetas Interior",
        category: "Commercial",
        src: "/projects/project-2.png",
        gridClass: "md:col-span-1 md:row-span-1",
    },
    {
        id: 5,
        title: "Mitsui Lobby",
        category: "Office",
        src: "/projects/project-6.jpg",
        gridClass: "md:col-span-1 md:row-span-1",
    },
    {
        id: 6,
        title: "Old Town Detail",
        category: "Facade",
        src: "/projects/project-4.jpg",
        gridClass: "md:col-span-2 md:row-span-1",
    },
];

export default function ProjectGallery() {
    return (
        <section className="py-24 px-6 md:px-12 bg-[#050505]">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-3xl md:text-5xl font-serif text-[#E5E5E5] mb-4 text-center">
                    MY SELECTED <span className="text-[#D4AF37]">PROJECTS</span>
                </h2>
                <p className="text-gray-400 text-center mb-16 max-w-2xl mx-auto font-sans">
                    A curated collection of lighting architecture across Residential, Commercial, and Public spaces.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[300px]">
                    {projects.map((project, index) => (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className={`relative group overflow-hidden rounded-sm bg-[#121212] ${project.gridClass}`}
                        >
                            <Image
                                src={project.src}
                                alt={project.title}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                            />

                            {/* Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6">
                                <span className="text-[#D4AF37] font-mono text-xs tracking-widest uppercase mb-2">
                                    {project.category}
                                </span>
                                <h3 className="text-white font-serif text-xl md:text-2xl">
                                    {project.title}
                                </h3>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
