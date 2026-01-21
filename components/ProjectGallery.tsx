"use client";

import { motion } from "framer-motion";
import Image from "next/image";

import Link from "next/link";
import { projects } from "@/data/projects";

// Filter only the first 6 or specific highlighted projects for the home page
const featuredProjects = projects.slice(0, 6);

export default function ProjectGallery() {
    return (
        <section className="py-24 px-6 md:px-12 bg-[#050505]">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-3xl md:text-5xl font-serif text-[#E5E5E5] mb-4 text-center">
                    SELECTED <span className="text-[#D4AF37]">PROJECTS</span>
                </h2>
                <p className="text-gray-400 text-center mb-16 max-w-2xl mx-auto font-sans">
                    A curated collection of lighting architecture across Residential, Commercial, and Public spaces.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[300px]">
                    {featuredProjects.map((project, index) => (
                        <Link
                            href={`/portfolio?category=${project.category}`}
                            key={project.id}
                            className={`relative group overflow-hidden rounded-sm bg-[#121212] block ${project.gridClass}`}
                        >
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="w-full h-full relative"
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
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
