"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Image from "next/image";

const steps = [
    {
        id: "01",
        title: "CONSULTATION",
        subtitle: "Defining the Mood",
        description: "We don't talk lumens; we talk feelings. We analyze your space, your habits, and your vision to define the atmospheric DNA.",
        image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=2670&auto=format&fit=crop"
    },
    {
        id: "02",
        title: "BLUEPRINT",
        subtitle: "CAD & 3D Visualization",
        description: "Precision planning. We map every fixture, calculate load, and simulate the result in photorealistic 3D before a single cable is laid.",
        image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2670&auto=format&fit=crop"
    },
    {
        id: "03",
        title: "IMPLEMENTATION",
        subtitle: "On-site Supervision",
        description: "Execution is everything. We collaborate with your contractors to ensure every beam hits exactly where it was designed to.",
        image: "https://images.unsplash.com/photo-1524253482453-3fed8d2fe12b?q=80&w=2670&auto=format&fit=crop"
    },
    {
        id: "04",
        title: "DELIVERY",
        subtitle: "Scene Commissioning",
        description: "The moment of truth. We program the scenes—Morning, Dinner, Party, Deep Night—handing you control of your environment.",
        image: "https://images.unsplash.com/photo-1518135714426-c18f5ffb6f4d?q=80&w=2670&auto=format&fit=crop"
    }
];

export default function ProcessTimeline() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const [activeStep, setActiveStep] = useState(0);

    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

    return (
        <section ref={containerRef} className="relative py-32 bg-[#050505] overflow-hidden min-h-[80vh]">
            {/* Dynamic Background - Added pointer-events-none to prevent blocking */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <AnimatePresence mode="popLayout">
                    <motion.div
                        key={steps[activeStep].id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.7 }}
                        className="absolute inset-0"
                    >
                        <Image
                            src={steps[activeStep].image}
                            alt={steps[activeStep].title}
                            fill
                            priority
                            className="object-cover opacity-60"
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-black/40 to-[#050505]" />
                        <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px]" />
                    </motion.div>
                </AnimatePresence>
            </div>

            <motion.div style={{ opacity }} className="max-w-4xl mx-auto px-6 relative z-10 pointer-events-auto">
                <div className="text-center mb-24">
                    <h2 className="text-sm font-mono text-[#D4AF37] tracking-[0.3em] mb-4">OUR METHODOLOGY</h2>
                    <h3 className="text-4xl md:text-5xl font-serif text-white">THE ARCHITECTURE OF LIGHT</h3>
                </div>

                <div className="relative border-l border-white/10 ml-6 md:ml-0 md:pl-0 pb-10">
                    {steps.map((step, index) => (
                        <motion.div
                            key={step.id}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="mb-24 relative pl-12 md:pl-0 group cursor-pointer z-30"
                            onPointerEnter={() => setActiveStep(index)}
                        >
                            {/* Marker */}
                            <div
                                className={`absolute left-[-1.25rem] md:left-1/2 md:-translate-x-1/2 w-10 h-10 rounded-full border border-white/20 bg-[#050505] flex items-center justify-center text-[#D4AF37] font-mono text-xs transition-all duration-300 ${activeStep === index ? "border-[#D4AF37] scale-125 shadow-[0_0_20px_rgba(212,175,55,0.4)]" : "group-hover:border-[#D4AF37]"
                                    }`}
                            >
                                {step.id}
                            </div>

                            {/* Content */}
                            <div className={`md:w-1/2 ${index % 2 === 0 ? "md:pr-24 md:text-right md:ml-0" : "md:pl-24 md:ml-auto"}`}>
                                <h4 className="text-xs font-mono text-[#D4AF37] mb-2 tracking-widest">{step.subtitle}</h4>
                                <h3 className={`text-3xl font-serif text-[#E5E5E5] mb-4 transition-colors duration-300 ${activeStep === index ? "text-white" : "group-hover:text-white"}`}>
                                    {step.title}
                                </h3>
                                <p className="text-gray-400 font-sans leading-relaxed text-sm">
                                    {step.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </section>
    );
}
