"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform, MotionValue } from "framer-motion";

export default function SpotlightCursor() {
    const [isTouchDevice, setIsTouchDevice] = useState(false);
    const mouseX = useMotionValue(-100); // Start off-screen
    const mouseY = useMotionValue(-100);

    // Smooth physics for the light movement
    const springConfig = { damping: 30, stiffness: 200, mass: 0.5 };
    const springX = useSpring(mouseX, springConfig);
    const springY = useSpring(mouseY, springConfig);

    useEffect(() => {
        // Detect mobile/touch
        if (window.matchMedia("(pointer: coarse)").matches) {
            setIsTouchDevice(true);
            return;
        }

        const handleMouseMove = (e: MouseEvent) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [mouseX, mouseY]);

    // Move the hook call BEFORE the conditional return
    const background = useMotionValueTemplate`radial-gradient(600px circle at ${springX}px ${springY}px, transparent 10%, rgba(5,5,5,0.85) 80%)`;

    if (isTouchDevice) return null;

    return (
        <motion.div
            className="fixed inset-0 z-[100] pointer-events-none hidden md:block"
            style={{
                background
            }}
        />
    );
}

// Helper for motion template
function useMotionValueTemplate(strings: TemplateStringsArray, ...values: MotionValue[]) {
    return useTransform(values, (latestValues) => {
        return strings.reduce((acc, str, i) => {
            return acc + str + (latestValues[i] ?? "");
        }, "");
    });
}
