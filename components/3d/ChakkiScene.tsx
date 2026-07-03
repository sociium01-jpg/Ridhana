"use client";

import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useTexture, Environment, Float } from "@react-three/drei";
import * as THREE from "three";

// ─── Procedural Stone Material ─────────────────────────────────────────────
function createStoneTexture(size: number = 256): THREE.DataTexture {
  const data = new Uint8Array(size * size * 4);
  for (let i = 0; i < size * size; i++) {
    const x = i % size;
    const y = Math.floor(i / size);
    // Layered noise for stone appearance
    const n1 = Math.sin(x * 0.1 + y * 0.05) * 0.5 + 0.5;
    const n2 = Math.cos(x * 0.05 - y * 0.1) * 0.5 + 0.5;
    const n3 = Math.sin((x + y) * 0.08) * 0.5 + 0.5;
    const base = 0.45 + (n1 * 0.2 + n2 * 0.1 + n3 * 0.05);
    const noiseR = Math.floor((base + Math.random() * 0.08) * 255);
    const noiseG = Math.floor((base * 0.9 + Math.random() * 0.06) * 255);
    const noiseB = Math.floor((base * 0.78 + Math.random() * 0.04) * 255);
    data[i * 4]     = Math.min(noiseR, 255);
    data[i * 4 + 1] = Math.min(noiseG, 255);
    data[i * 4 + 2] = Math.min(noiseB, 255);
    data[i * 4 + 3] = 255;
  }
  const tex = new THREE.DataTexture(data, size, size, THREE.RGBAFormat);
  tex.needsUpdate = true;
  return tex;
}

// ─── Flour Particle System ─────────────────────────────────────────────────
function FlourParticles({ count = 300 }: { count?: number }) {
  const mesh = useRef<THREE.Points>(null!);

  const [positions, velocities] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const vel = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      // Start from between the two stones
      pos[i * 3]     = (Math.random() - 0.5) * 1.2;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 0.2;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 1.2;
      vel[i * 3]     = (Math.random() - 0.5) * 0.004;
      vel[i * 3 + 1] = -Math.random() * 0.006 - 0.002;
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.004;
    }
    return [pos, vel];
  }, [count]);

  useFrame(() => {
    if (!mesh.current) return;
    const pos = mesh.current.geometry.attributes.position.array as Float32Array;
    for (let i = 0; i < count; i++) {
      pos[i * 3]     += velocities[i * 3];
      pos[i * 3 + 1] += velocities[i * 3 + 1];
      pos[i * 3 + 2] += velocities[i * 3 + 2];
      // Reset if fallen below threshold
      if (pos[i * 3 + 1] < -1.5) {
        pos[i * 3]     = (Math.random() - 0.5) * 1.2;
        pos[i * 3 + 1] = 0.1;
        pos[i * 3 + 2] = (Math.random() - 0.5) * 1.2;
      }
    }
    mesh.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.012}
        color="#F7F3EC"
        transparent
        opacity={0.7}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

// ─── The two grinding stones (chakki) ─────────────────────────────────────
function ChakkiStones() {
  const topStoneRef  = useRef<THREE.Mesh>(null!);
  const baseStoneRef = useRef<THREE.Mesh>(null!);
  const stoneTex = useMemo(() => createStoneTexture(256), []);

  useFrame((_, delta) => {
    if (topStoneRef.current)  topStoneRef.current.rotation.y  += delta * 0.25;
    if (baseStoneRef.current) baseStoneRef.current.rotation.y -= delta * 0.08;
  });

  const stoneMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        map: stoneTex,
        roughness: 0.92,
        metalness: 0.02,
        color: new THREE.Color("#8B7355"),
      }),
    [stoneTex]
  );

  // Groove geometry on top stone
  const grooveGeometry = useMemo(() => {
    const geo = new THREE.TorusGeometry(0.4, 0.012, 8, 48);
    return geo;
  }, []);

  return (
    <group position={[0, 0, 0]}>
      {/* Base stone */}
      <mesh ref={baseStoneRef} material={stoneMaterial} receiveShadow position={[0, -0.1, 0]}>
        <cylinderGeometry args={[0.7, 0.72, 0.22, 64]} />
      </mesh>

      {/* Decorative rim on base */}
      <mesh material={stoneMaterial} position={[0, -0.02, 0]}>
        <torusGeometry args={[0.69, 0.015, 8, 64]} />
      </mesh>

      {/* Top grinding stone */}
      <Float speed={0.4} rotationIntensity={0.04} floatIntensity={0.06}>
        <mesh ref={topStoneRef} material={stoneMaterial} castShadow position={[0, 0.16, 0]}>
          <cylinderGeometry args={[0.65, 0.67, 0.2, 64]} />
        </mesh>
        {/* Grooves on top stone */}
        <mesh material={stoneMaterial} position={[0, 0.26, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <primitive object={grooveGeometry} />
        </mesh>
        <mesh material={stoneMaterial} position={[0, 0.26, 0]} rotation={[Math.PI / 2, 0, Math.PI / 3]}>
          <torusGeometry args={[0.28, 0.01, 8, 48]} />
        </mesh>
        {/* Center hole */}
        <mesh position={[0, 0.27, 0]}>
          <cylinderGeometry args={[0.06, 0.06, 0.1, 24]} />
          <meshStandardMaterial color="#1a1008" roughness={1} />
        </mesh>
      </Float>

      {/* Flour particles falling off the stones */}
      <FlourParticles count={250} />
    </group>
  );
}

// ─── Mouse Parallax Camera Rig ─────────────────────────────────────────────
function CameraRig() {
  const { camera } = useThree();
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth)  * 2 - 1;
      mouse.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  useFrame(() => {
    camera.position.x += (mouse.current.x * 0.6 - camera.position.x) * 0.04;
    camera.position.y += (-mouse.current.y * 0.4 - camera.position.y + 1.2) * 0.04;
    camera.lookAt(0, 0, 0);
  });

  return null;
}

// ─── Ambient Environment Particles ────────────────────────────────────────
function AmbientDust() {
  const mesh = useRef<THREE.Points>(null!);
  const count = 80;

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3]     = (Math.random() - 0.5) * 5;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 4;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 3;
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (!mesh.current) return;
    mesh.current.rotation.y = state.clock.elapsedTime * 0.02;
    mesh.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.01) * 0.05;
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.025}
        color="#DDB96A"
        transparent
        opacity={0.3}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

// ─── Main ChakkiScene (exported) ──────────────────────────────────────────
export default function ChakkiScene() {
  return (
    <Canvas
      camera={{ position: [0, 1.2, 2.8], fov: 45 }}
      dpr={[1, 1.5]}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      }}
      shadows
      className="r3f-canvas"
      aria-label="3D stone chakki (grinding mill) scene"
      role="img"
    >
      {/* Lighting */}
      <ambientLight intensity={0.6} color="#F7F3EC" />
      <directionalLight
        position={[3, 5, 3]}
        intensity={1.8}
        color="#DDB96A"
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      <directionalLight position={[-3, 2, -2]} intensity={0.4} color="#C4714A" />
      <pointLight position={[0, 2, 0]} intensity={0.6} color="#F7F3EC" distance={5} />

      {/* Ground shadow receiver */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.22, 0]} receiveShadow>
        <planeGeometry args={[8, 8]} />
        <shadowMaterial transparent opacity={0.2} />
      </mesh>

      <ChakkiStones />
      <AmbientDust />
      <CameraRig />

      <fog attach="fog" args={["#F7F3EC", 8, 20]} />
    </Canvas>
  );
}
