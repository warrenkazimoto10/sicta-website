import { useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

/* ── Champ de particules reliées (réseau abstrait) ── */
function ParticleField({ count = 130 }: { count?: number }) {
  const groupRef = useRef<THREE.Group>(null);

  const { positions, linePositions } = useMemo(() => {
    const pts: THREE.Vector3[] = [];
    const R = 9;
    for (let i = 0; i < count; i++) {
      // Distribution dans une sphère aplatie
      pts.push(new THREE.Vector3(
        (Math.random() - 0.5) * R * 2.2,
        (Math.random() - 0.5) * R * 1.3,
        (Math.random() - 0.5) * R * 1.4
      ));
    }
    const positions = new Float32Array(count * 3);
    pts.forEach((p, i) => { positions[i * 3] = p.x; positions[i * 3 + 1] = p.y; positions[i * 3 + 2] = p.z; });

    // Relie chaque point à ses voisins proches (une seule fois)
    const lines: number[] = [];
    const maxDist = 3.1;
    for (let i = 0; i < count; i++) {
      let links = 0;
      for (let j = i + 1; j < count && links < 3; j++) {
        if (pts[i].distanceTo(pts[j]) < maxDist) {
          lines.push(pts[i].x, pts[i].y, pts[i].z, pts[j].x, pts[j].y, pts[j].z);
          links++;
        }
      }
    }
    return { positions, linePositions: new Float32Array(lines) };
  }, [count]);

  useFrame((state, delta) => {
    const g = groupRef.current;
    if (!g) return;
    // Rotation continue + parallaxe douce vers le pointeur
    g.rotation.y += delta * 0.05;
    const targetX = state.pointer.y * 0.25;
    const targetY = g.rotation.y + state.pointer.x * 0.35;
    g.rotation.x += (targetX - g.rotation.x) * 0.04;
    g.position.x += (state.pointer.x * 0.6 - g.position.x) * 0.03;
    g.position.y += (state.pointer.y * 0.4 - g.position.y) * 0.03;
  });

  return (
    <group ref={groupRef}>
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[linePositions, 3]} />
        </bufferGeometry>
        <lineBasicMaterial color="#f9a870" transparent opacity={0.22} />
      </lineSegments>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        </bufferGeometry>
        <pointsMaterial color="#F97316" size={0.16} sizeAttenuation transparent opacity={0.9} depthWrite={false} />
      </points>
    </group>
  );
}

function Rig() {
  // Léger mouvement de caméra pour la profondeur
  useFrame((state) => {
    state.camera.position.z += (14 - state.camera.position.z) * 0.02;
  });
  return null;
}

const NetworkCanvas = () => {
  return (
    <Canvas
      dpr={[1, 1.75]}
      camera={{ position: [0, 0, 18], fov: 55 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      style={{ pointerEvents: "none" }}
    >
      <ambientLight intensity={0.6} />
      <ParticleField />
      <Rig />
    </Canvas>
  );
};

export default NetworkCanvas;
