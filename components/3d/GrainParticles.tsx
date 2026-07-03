"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

// Grain-shaped particle (slightly elliptical)
function GrainParticleField({ count = 60, scrollY }: { count?: number; scrollY?: number }) {
  const meshRef = useRef<THREE.Points>(null!);

  const [positions, randoms] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const rnd = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      pos[i * 3]     = (Math.random() - 0.5) * 12;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 8;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 4;
      rnd[i]         = Math.random();
    }
    return [pos, rnd];
  }, [count]);

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.elapsedTime;
    const pos = meshRef.current.geometry.attributes.position.array as Float32Array;
    for (let i = 0; i < count; i++) {
      // Gentle floating motion
      pos[i * 3 + 1] += Math.sin(time * 0.3 + randoms[i] * Math.PI * 2) * 0.001;
      pos[i * 3]     += Math.cos(time * 0.2 + randoms[i] * Math.PI) * 0.0005;
    }
    meshRef.current.geometry.attributes.position.needsUpdate = true;
    // Scroll parallax — drift slightly upward as user scrolls
    if (scrollY !== undefined) {
      meshRef.current.position.y = scrollY * -0.001;
    }
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        color="#C9A24B"
        transparent
        opacity={0.25}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

export default function GrainParticles() {
  return (
    <div
      className="fixed inset-0 pointer-events-none z-0"
      aria-hidden="true"
      role="presentation"
    >
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        dpr={[1, 1]}
        gl={{ alpha: true, antialias: false, powerPreference: "low-power" }}
      >
        <GrainParticleField count={60} />
      </Canvas>
    </div>
  );
}
