import { Suspense, useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import type { MutableRefObject } from "react";

type Mouse = MutableRefObject<{ x: number; y: number }>;

function Sculpture({ mouse }: { mouse: Mouse }) {
  const group = useRef<THREE.Group>(null);
  const knot = useMemo(() => new THREE.TorusKnotGeometry(1.05, 0.26, 160, 24), []);
  const ring = useMemo(() => new THREE.TorusGeometry(1.55, 0.012, 12, 80), []);
  const ring2 = useMemo(() => new THREE.TorusGeometry(1.85, 0.008, 12, 80), []);

  const mat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#1c1b18",
        metalness: 0.88,
        roughness: 0.26,
        envMapIntensity: 0.8,
      }),
    [],
  );
  const wire = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: "#d4b483",
        wireframe: true,
        transparent: true,
        opacity: 0.12,
      }),
    [],
  );
  const gold = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: "#d4b483",
        transparent: true,
        opacity: 0.55,
      }),
    [],
  );

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const g = group.current;
    if (!g) return;
    g.rotation.y = t * 0.12 + mouse.current.x * 0.45;
    g.rotation.x = 0.35 + mouse.current.y * 0.22;
    g.rotation.z = t * 0.04;
    g.position.y = Math.sin(t * 0.6) * 0.08;
  });

  useEffect(() => {
    return () => {
      knot.dispose();
      ring.dispose();
      ring2.dispose();
      mat.dispose();
      wire.dispose();
      gold.dispose();
    };
  }, [gold, knot, mat, ring, ring2, wire]);

  return (
    <group ref={group}>
      <mesh geometry={knot} material={mat} />
      <mesh geometry={knot} material={wire} scale={1.015} />
      <mesh geometry={ring} material={gold} rotation={[Math.PI / 2.4, 0.4, 0.2]} />
      <mesh geometry={ring2} material={gold} rotation={[0.3, Math.PI / 3, 0.6]} />
    </group>
  );
}

function Lights() {
  return (
    <>
      <ambientLight intensity={0.22} color="#f1eee6" />
      <spotLight position={[4.2, 5.4, 3.2]} intensity={2.4} color="#f7f1e4" angle={0.5} penumbra={0.8} />
      <pointLight position={[-3.4, -1.2, 2.2]} intensity={1.4} color="#d4b483" />
      <pointLight position={[1.5, 1.8, -2.4]} intensity={0.5} color="#8f8a80" />
    </>
  );
}

export function HeroScene({ mouse, visible }: { mouse: Mouse; visible: boolean }) {
  if (!visible) return null;

  return (
    <Canvas
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      dpr={[1, 1.6]}
      camera={{ position: [0, 0, 5.2], fov: 32 }}
      frameloop="always"
      style={{ width: "100%", height: "100%", background: "transparent" }}
      onCreated={({ gl }) => {
        gl.setClearColor(0x000000, 0);
      }}
    >
      <Suspense fallback={null}>
        <Lights />
        <Sculpture mouse={mouse} />
      </Suspense>
    </Canvas>
  );
}
