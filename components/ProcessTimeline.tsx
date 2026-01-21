"use client";

import { motion } from "framer-motion";

const steps = [
    {
        number: "01",
        title: "CONSULTATION",
        subtitle: "Defining the Mood",
        description: "We don't talk lumens; we talk feelings. We analyze your space, your habits, and your vision to define the atmospheric DNA."
    },
    {
        number: "02",
        title: "BLUEPRINT",
        subtitle: "CAD & 3D Visualization",
        description: "Precision planning. We map every fixture, calculate load, and simulate the result in photorealistic 3D before a single cable is laid."
    },
    {
        number: "03",
        title: "IMPLEMENTATION",
        subtitle: "On-site Supervision",
        description: "Design is nothing without execution. We oversee the installation, focus every beam, and program the scenes for perfection."
    },
    {
        number: "04",
        title: "DELIVERY & AFTER-SALES",
        subtitle: "Ensuring Perfection",
        description: "We make sure the client is happy with the light effect and adjust to fit the environment better, providing ongoing care for your investment."
    }
];

export default function ProcessTimeline() {
    return (
        <section className="py-24 px-6 md:px-12 bg-[#050505] overflow-hidden">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-3xl md:text-5xl font-serif text-[#E5E5E5] mb-20 text-center">
                    THE <span className="text-[#D4AF37]">PROCESS</span>
                </h2>

                <div className="relative">
                    {/* Central Line (Desktop) */}
                    <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[#D4AF37]/50 to-transparent -translate-x-1/2" />

                    <div className="space-y-24">
                        {steps.map((step, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.8, delay: index * 0.2 }}
                                className={`flex flex-col md:flex-row items-center gap-8 md:gap-16 ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}
                            >
                                {/* Text Content */}
                                <div className="flex-1 text-center md:text-right group">
                                    <div className={`md:text-${index % 2 === 1 ? 'left' : 'right'}`}>
                                        <span className="text-[#D4AF37] font-mono text-sm tracking-widest block mb-2">{step.subtitle}</span>
                                        <h3 className="text-3xl font-serif text-white mb-4 group-hover:text-[#D4AF37] transition-colors">{step.title}</h3>
                                        <p className="text-gray-400 font-sans leading-relaxed max-w-md ml-auto">{step.description}</p>
                                    </div>
                                </div>

                                {/* Number Circle */}
                                <div className="relative z-10 w-20 h-20 flex items-center justify-center bg-[#121212] border border-[#D4AF37] rounded-full shadow-[0_0_30px_rgba(212,175,55,0.2)]">
                                    <span className="text-2xl font-serif text-[#D4AF37]">{step.number}</span>
                                </div>

                                {/* Empty Spacer for grid balance */}
                                <div className="flex-1 hidden md:block" />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
