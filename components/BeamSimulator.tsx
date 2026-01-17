"use client";

import { useState, useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, TorusKnot, Plane, SpotLight, Text, AdaptiveDpr } from "@react-three/drei";
import * as THREE from "three";

function Scene({ beamAngle, softness, showWireframe }: { beamAngle: number, softness: number, showWireframe: boolean }) {
    const lightRef = useRef<THREE.SpotLight>(null);
    const meshRef = useRef<THREE.Mesh>(null);

    // Rotate the sculpture slowly
    useFrame((state, delta) => {
        if (meshRef.current) {
            meshRef.current.rotation.y += delta * 0.1;
        }
    });

    return (
        <>
            {/* Ambient light for base visibility (very subtle) */}
            <ambientLight intensity={0.1} />

            {/* The Beam Source */}
            <SpotLight
                ref={lightRef}
                position={[0, 6, 0]}
                angle={beamAngle}
                penumbra={softness}
                intensity={200}
                distance={20}
                castShadow
                color="#ffffff"
            />

            {/* Wireframe Visualizer using a Cone */}
            {showWireframe && (
                <mesh position={[0, 6, 0]} rotation={[Math.PI, 0, 0]}>
                    {/* Height 6 to reach ground, Radius calculated simply based on angle */}
                    <coneGeometry args={[Math.tan(beamAngle) * 6, 6, 32, 1, true]} />
                    <meshBasicMaterial color="#D4AF37" wireframe opacity={0.15} transparent />
                </mesh>
            )}

            {/* The Subject: Metallic Torus Knot */}
            <TorusKnot ref={meshRef} position={[0, 1.5, 0]} args={[0.8, 0.2, 128, 32]} castShadow receiveShadow>
                <meshStandardMaterial color="#333333" roughness={0.2} metalness={0.8} />
            </TorusKnot>

            {/* The Floor */}
            <Plane args={[100, 100]} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
                <meshStandardMaterial color="#050505" roughness={0.8} metalness={0.2} />
            </Plane>
        </>
    );
}

export default function BeamSimulator() {
    const [beamAngle, setBeamAngle] = useState(0.5); // Radians approx
    const [softness, setSoftness] = useState(0.2); // 0-1
    const [showWireframe, setShowWireframe] = useState(true);

    // Convert to degrees for display
    const degrees = Math.round(beamAngle * (180 / Math.PI) * 2); // Approximation for cone angle

    return (
        <div className="relative w-full h-[80vh] bg-black border-y border-white/5">
            <Canvas shadows camera={{ position: [0, 5, 10], fov: 45 }} dpr={[1, 2]}>
                <color attach="background" args={["#000000"]} />
                <Suspense fallback={null}>
                    <Scene beamAngle={beamAngle} softness={softness} showWireframe={showWireframe} />
                </Suspense>
                <OrbitControls enableZoom={false} maxPolarAngle={Math.PI / 2} />
                <AdaptiveDpr pixelated />
            </Canvas>

            {/* Control Dashboard */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-[90%] max-w-lg bg-black/80 backdrop-blur-md border border-white/10 p-6 rounded-sm flex flex-col gap-6 text-white">
                <div className="flex items-center justify-between">
                    <h3 className="font-serif text-[#D4AF37] tracking-widest text-sm">ARCHITECTURAL BEAM CONTROL</h3>
                    <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono text-gray-500">PHYSICS:</span>
                        <button
                            onClick={() => setShowWireframe(!showWireframe)}
                            className={`w-3 h-3 rounded-full border border-[#D4AF37] ${showWireframe ? 'bg-[#D4AF37]' : 'bg-transparent'}`}
                        />
                    </div>
                </div>

                {/* Beam Angle Slider */}
                <div className="space-y-2">
                    <div className="flex justify-between text-xs font-mono">
                        <span className="text-gray-400">BEAM ANGLE</span>
                        <span className="text-white">{degrees}°</span>
                    </div>
                    <input
                        type="range"
                        min="0.2"
                        max="1.2"
                        step="0.01"
                        value={beamAngle}
                        onChange={(e) => setBeamAngle(parseFloat(e.target.value))}
                        className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#D4AF37]"
                    />
                </div>

                {/* Softness Slider */}
                <div className="space-y-2">
                    <div className="flex justify-between text-xs font-mono">
                        <span className="text-gray-400">SOFTNESS</span>
                        <span className="text-white">{(softness * 100).toFixed(0)}%</span>
                    </div>
                    <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.05"
                        value={softness}
                        onChange={(e) => setSoftness(parseFloat(e.target.value))}
                        className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#D4AF37]"
                    />
                </div>
            </div>
        </div>
    );
}
