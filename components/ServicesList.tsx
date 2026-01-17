"use client";

import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

const services = [
    {
        id: "01",
        title: "RESIDENTIAL",
        description: "Bespoke lighting for luxury homes.",
        image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2000&auto=format&fit=crop",
        link: "/portfolio?category=Residential"
    },
    {
        id: "02",
        title: "COMMERCIAL",
        description: "Strategic illumination for hotels & offices.",
        image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=2000&auto=format&fit=crop",
        link: "/portfolio?category=Commercial"
    },
    {
        id: "03",
        title: "ART INSTALLATION",
        description: "Experimental light structures.",
        image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=2000&auto=format&fit=crop",
        link: "/portfolio?category=Commercial"
    }
];

export default function ServicesList() {
    return (
        <section className="py-32 bg-[#050505] px-6 md:px-12 max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {services.map((service) => (
                    <Link
                        href={service.link}
                        key={service.id}
                        className="group relative h-[500px] border border-white/10 overflow-hidden block"
                    >
                        {/* Background Image - Grayscale to Color */}
                        <div
                            className="absolute inset-0 bg-cover bg-center transition-all duration-700 ease-out grayscale group-hover:grayscale-0 group-hover:scale-110"
                            style={{ backgroundImage: `url(${service.image})` }}
                        />

                        {/* Dark Overlay for Text Readability */}
                        <div className="absolute inset-0 bg-black/60 group-hover:bg-black/30 transition-colors duration-500" />

                        {/* Content */}
                        <div className="absolute inset-0 flex flex-col justify-end p-8 z-10 text-white">
                            <div className="flex justify-between items-start mb-4 opacity-70 group-hover:opacity-100 transition-opacity">
                                <span className="font-mono text-sm tracking-widest text-[#D4AF37]">{service.id}</span>
                                <ArrowUpRight className="w-6 h-6 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform text-[#D4AF37]" />
                            </div>

                            <h3 className="font-serif text-3xl mb-2 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                                {service.title}
                            </h3>

                            <p className="font-sans text-gray-300 text-sm max-w-[200px] translate-y-4 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-100">
                                {service.description}
                            </p>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
}
