"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, ContactShadows, Environment } from "@react-three/drei";
import { Suspense } from "react";

interface RoomProps {
    lights: {
        ambient: number;
        spots: number;
        strip: number;
        warmth: number;
    };
}

function Lights({ lights }: RoomProps) {
    const getColor = (k: number) => {
        // More exaggerated color shifts for educational clarity
        if (k <= 3000) return "#ffaa5e"; // Deep cozy orange
        if (k <= 4000) return "#ffffff"; // Neutral White
        return "#d4e4ff"; // Clinical Blue
    };

    const color = getColor(lights.warmth);

    return (
        <>
            {/* Ambient Fill (General Visibility) */}
            <ambientLight intensity={lights.ambient * 0.3} color={color} />

            {/* The "Drama" Spot (Focused on the Art) */}
            <spotLight
                position={[0, 4, 2]}
                target-position={[0, 1.5, -2.9]}
                angle={0.2}
                penumbra={0.2}
                intensity={lights.spots * 40}
                castShadow
                shadow-bias={-0.0001}
                color={color}
            />

            {/* The "Texture" Grazer (Wash down the wall) */}
            <spotLight
                position={[2, 4, -2.5]}
                target-position={[2, 0, -2.9]}
                angle={0.5}
                penumbra={0.5}
                intensity={lights.strip * 30}
                color={color}
                castShadow
            />
        </>
    );
}

function GalleryScene() {
    return (
        <group position={[0, -1, 0]}>
            {/* The Back Wall (Textured Canvas for Light) */}
            <mesh position={[0, 2.5, -3]} receiveShadow>
                <planeGeometry args={[10, 5]} />
                <meshStandardMaterial
                    color="#1a1a1a"
                    roughness={0.9}
                // Simulate plaster texture via noise in roughness/color if texture load fails
                />
            </mesh>

            {/* The Floor */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
                <planeGeometry args={[10, 10]} />
                <meshStandardMaterial color="#111" roughness={0.5} metalness={0.2} />
            </mesh>

            {/* The Art Frame (Focal Point) */}
            <group position={[0, 1.8, -2.95]}>
                {/* Frame */}
                <mesh castShadow receiveShadow>
                    <boxGeometry args={[1.5, 2, 0.1]} />
                    <meshStandardMaterial color="#000" roughness={0.2} />
                </mesh>
                {/* Canvas */}
                <mesh position={[0, 0, 0.06]}>
                    <planeGeometry args={[1.3, 1.8]} />
                    <meshStandardMaterial color="#fff" roughness={0.8} emissive="#333" emissiveIntensity={0.1} />
                </mesh>
                {/* "Painting" Content (Simple Geometric Abstract) */}
                <mesh position={[0, 0, 0.07]}>
                    <planeGeometry args={[1.0, 1.0]} />
                    <meshStandardMaterial color="#D4AF37" />
                </mesh>
            </group>

            {/* The Furniture (Pedestal + Vase) */}
            <group position={[-1.5, 0, -1]}>
                <mesh position={[0, 0.6, 0]} castShadow receiveShadow>
                    <boxGeometry args={[0.6, 1.2, 0.6]} />
                    <meshStandardMaterial color="#222" roughness={0.5} />
                </mesh>
                {/* The Vase */}
                <mesh position={[0, 1.4, 0]} castShadow receiveShadow>
                    <cylinderGeometry args={[0.2, 0.2, 0.8, 32]} />
                    <meshStandardMaterial color="#888" roughness={0.1} metalness={0.8} />
                </mesh>
            </group>

            {/* A Plant Pot (Right Side) */}
            <group position={[2, 0, -1.5]}>
                <mesh position={[0, 0.4, 0]} castShadow receiveShadow>
                    <cylinderGeometry args={[0.4, 0.3, 0.8, 32]} />
                    <meshStandardMaterial color="#3a2f2a" roughness={0.8} />
                </mesh>
                {/* Abstract Leaves */}
                <mesh position={[0, 1.0, 0]} castShadow receiveShadow>
                    <dodecahedronGeometry args={[0.5]} />
                    <meshStandardMaterial color="#4a5d4a" roughness={0.6} />
                </mesh>
            </group>
        </group>
    );
}

export default function ThreeDRoom({ lights }: RoomProps) {
    return (
        <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 2, 6], fov: 40 }}>
            <Suspense fallback={null}>
                <color attach="background" args={['#050505']} />

                <Lights lights={lights} />
                <GalleryScene />

                <ContactShadows position={[0, -1.01, 0]} opacity={0.5} scale={10} blur={2} far={4} color="#000" />
                <Environment preset="city" environmentIntensity={0.3} />

                <OrbitControls
                    makeDefault
                    minPolarAngle={Math.PI / 4}
                    maxPolarAngle={Math.PI / 2}
                    enableZoom={true}
                    enablePan={true}
                    target={[0, 1, -2]} // Focus on the art
                />
            </Suspense>
        </Canvas>
    );
}
