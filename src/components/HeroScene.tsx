"use client";

import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, EnvironmentProps } from "@react-three/drei";
import * as THREE from "three";

function AbstractMachine() {
  const meshRef = useRef<THREE.Mesh>(null!);
  
  useFrame((state, delta) => {
    meshRef.current.rotation.y += delta * 0.5;
    meshRef.current.rotation.x += delta * 0.2;
  });

  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[3, 3, 3]} />
      <meshStandardMaterial 
        color="#e0e5ec"
        roughness={0.9}
        metalness={0.1}
      />
      {/* Indentations and physical details can be added through normal maps or additional geometry */}
    </mesh>
  );
}

export function HeroScene() {
  return (
    <div className="w-full h-full min-h-[400px]">
      <Canvas shadows dpr={[1, 2]} camera={{ position: [5, 5, 5], fov: 50 }}>
        <ambientLight intensity={0.5} />
        {/* Top-left lighting logic according to Industrial design rules */}
        <directionalLight 
          position={[-5, 5, 2]} 
          intensity={1.5} 
          castShadow 
          shadow-mapSize={1024} 
        />
        <AbstractMachine />
      </Canvas>
    </div>
  );
}
