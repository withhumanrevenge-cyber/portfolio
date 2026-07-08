"use client";

import React, { useMemo, useRef } from "react";
import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber";
import { Float, Html, Stars, Sparkles } from "@react-three/drei";
import { Project } from "@/lib/github";
import { Journey, CAMERA_START } from "./journey";

const damp = THREE.MathUtils.damp;

function Rig({
  progress,
  journey,
}: {
  progress: React.RefObject<number>;
  journey: Journey;
}) {
  useFrame((state, delta) => {
    const t = progress.current ?? 0;
    const z = CAMERA_START - t * journey.travel;
    const swayX = Math.sin(t * Math.PI * 5) * 0.3;
    const swayY = Math.sin(t * Math.PI * 3.4) * 0.22;
    const cam = state.camera;
    cam.position.x = damp(cam.position.x, swayX + state.pointer.x * 0.7, 3, delta);
    cam.position.y = damp(cam.position.y, swayY + state.pointer.y * 0.45, 3, delta);
    cam.position.z = damp(cam.position.z, z, 4, delta);
    cam.lookAt(cam.position.x, cam.position.y, cam.position.z - 12);
  });
  return null;
}

function StarField() {
  const ref = useRef<THREE.Group>(null);
  useFrame(({ camera }) => {
    if (ref.current) ref.current.position.z = camera.position.z;
  });
  return (
    <group ref={ref}>
      <Stars radius={70} depth={60} count={3500} factor={4} saturation={0} fade speed={0.5} />
    </group>
  );
}

function Asteroids({ journey }: { journey: Journey }) {
  const rocks = useMemo(() => {
    const rand = (min: number, max: number) => min + Math.random() * (max - min);
    return Array.from({ length: 48 }, () => ({
      position: [
        (Math.random() > 0.5 ? 1 : -1) * rand(4.5, 15),
        rand(-7, 7),
        rand(journey.cameraEnd - 20, CAMERA_START + 6),
      ] as [number, number, number],
      scale: rand(0.15, 0.75),
      rotation: [rand(0, Math.PI), rand(0, Math.PI), 0] as [number, number, number],
    }));
  }, [journey.cameraEnd]);

  return (
    <>
      {rocks.map((rock, i) => (
        <Float key={i} speed={1.1} rotationIntensity={0.7} floatIntensity={0.7}>
          <mesh position={rock.position} scale={rock.scale} rotation={rock.rotation}>
            <icosahedronGeometry args={[1, 0]} />
            <meshStandardMaterial color="#2b3245" roughness={0.85} flatShading />
          </mesh>
        </Float>
      ))}
    </>
  );
}

function Portal({ z, color = "#60a5fa" }: { z: number; color?: string }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.z += delta * 0.2;
  });
  return (
    <group position={[0, 0, z]}>
      <mesh ref={ref}>
        <torusGeometry args={[3.4, 0.03, 12, 96]} />
        <meshBasicMaterial color={color} transparent opacity={0.6} />
      </mesh>
      <Sparkles count={34} scale={[7, 7, 2]} size={2.2} speed={0.35} color={color} />
    </group>
  );
}

function FadingHtml({
  position,
  rotation,
  distanceFactor = 5,
  width,
  align = "center",
  children,
}: {
  position: [number, number, number];
  rotation?: [number, number, number];
  distanceFactor?: number;
  width: number;
  align?: "center" | "left";
  children: React.ReactNode;
}) {
  const divRef = useRef<HTMLDivElement>(null);
  const groupRef = useRef<THREE.Group>(null);
  const world = useMemo(() => new THREE.Vector3(), []);
  const viewportWidth = useThree((state) => state.size.width);
  const scaled =
    distanceFactor * THREE.MathUtils.clamp(viewportWidth / 1240, 0.5, 1);

  useFrame(({ camera }) => {
    if (!divRef.current || !groupRef.current) return;
    groupRef.current.getWorldPosition(world);
    const dist = camera.position.z - world.z;
    const opacity =
      dist >= 0
        ? THREE.MathUtils.clamp((30 - dist) / 16, 0, 1)
        : THREE.MathUtils.clamp(1 + dist / 5, 0, 1);
    divRef.current.style.opacity = opacity.toFixed(2);
    divRef.current.style.visibility = opacity <= 0.02 ? "hidden" : "visible";
  });

  return (
    <group ref={groupRef} position={position} rotation={rotation}>
      <Html
        transform
        center
        distanceFactor={scaled}
        style={{ pointerEvents: "none" }}
        zIndexRange={[20, 0]}
      >
        <div
          ref={divRef}
          style={{ width, opacity: 0 }}
          className={`select-none ${align === "center" ? "text-center" : "text-left"}`}
        >
          {children}
        </div>
      </Html>
    </group>
  );
}

function StoryPanel({
  position,
  width = 560,
  children,
}: {
  position: [number, number, number];
  width?: number;
  children: React.ReactNode;
}) {
  return (
    <FadingHtml position={position} width={width}>
      {children}
    </FadingHtml>
  );
}

function ProjectStation({
  project,
  position,
  side,
  onOpen,
}: {
  project: Project;
  position: [number, number, number];
  side: "left" | "right";
  onOpen: (project: Project) => void;
}) {
  const ringRef = useRef<THREE.Mesh>(null);
  useFrame((_, delta) => {
    if (ringRef.current) ringRef.current.rotation.z -= delta * 0.25;
  });

  return (
    <group position={position} rotation={[0, side === "left" ? 0.32 : -0.32, 0]}>
      <mesh ref={ringRef} position={[0, 0, -0.6]}>
        <torusGeometry args={[2.9, 0.02, 12, 80]} />
        <meshBasicMaterial color="#60a5fa" transparent opacity={0.35} />
      </mesh>
      <Sparkles count={22} scale={[6, 5, 2]} size={1.8} speed={0.3} color="#93c5fd" />
      <FadingHtml position={[0, 0, 0]} distanceFactor={4.4} width={360} align="left">
        <article className="overflow-hidden rounded-2xl border border-border bg-card/90 text-left shadow-2xl shadow-black/50 backdrop-blur-sm">
          <div className="relative h-44 overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={project.image}
              alt={`Screenshot of ${project.title}`}
              className="h-full w-full object-cover"
              loading="lazy"
            />
            <div
              className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"
              aria-hidden="true"
            />
          </div>
          <div className="p-5">
            <p className="mb-1.5 text-[10px] font-bold uppercase tracking-widest text-primary">
              {project.category}
            </p>
            <h3 className="mb-2 font-heading text-xl font-black tracking-tight">
              {project.title}
            </h3>
            <p className="mb-4 line-clamp-2 text-xs leading-relaxed text-muted-foreground">
              {project.description}
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => onOpen(project)}
                className="pointer-events-auto inline-flex cursor-pointer items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-xs font-bold text-primary-foreground transition-opacity duration-200 hover:opacity-90"
              >
                Explore station
              </button>
              <a
                href={project.href}
                target="_blank"
                rel="noopener noreferrer"
                className="pointer-events-auto inline-flex items-center rounded-full border border-border bg-secondary px-4 py-2 text-xs font-bold transition-colors duration-200 hover:text-primary"
              >
                Live ↗
              </a>
            </div>
          </div>
        </article>
      </FadingHtml>
    </group>
  );
}

function Beacon({ z }: { z: number }) {
  const coreRef = useRef<THREE.Mesh>(null);
  const haloRef = useRef<THREE.Mesh>(null);
  useFrame((state, delta) => {
    const pulse = 1 + Math.sin(state.clock.elapsedTime * 1.6) * 0.08;
    if (coreRef.current) coreRef.current.scale.setScalar(pulse);
    if (haloRef.current) haloRef.current.rotation.y += delta * 0.3;
  });
  return (
    <group position={[0, 2.6, z - 9]}>
      <mesh ref={coreRef}>
        <sphereGeometry args={[1.1, 32, 32]} />
        <meshStandardMaterial
          color="#3b82f6"
          emissive="#3b82f6"
          emissiveIntensity={1.6}
          roughness={0.3}
        />
      </mesh>
      <mesh ref={haloRef} rotation={[Math.PI / 2.6, 0, 0]}>
        <torusGeometry args={[2, 0.02, 12, 90]} />
        <meshBasicMaterial color="#93c5fd" transparent opacity={0.55} />
      </mesh>
      <pointLight color="#60a5fa" intensity={20} distance={18} />
      <Sparkles count={60} scale={[9, 7, 6]} size={2.4} speed={0.4} color="#bfdbfe" />
    </group>
  );
}

const forgeSteps = [
  { step: "01", title: "Strategy", text: "Schema, auth flow and architecture decided before a single line of code." },
  { step: "02", title: "Forge", text: "Boilerplate moves fast in parallel. I spend the time on every decision that matters." },
  { step: "03", title: "Scale", text: "Instant deployment, CI/CD sync, Core Web Vitals in the green." },
];

export default function Scene({
  progress,
  journey,
  projects,
  onOpenProject,
}: {
  progress: React.RefObject<number>;
  journey: Journey;
  projects: Project[];
  onOpenProject: (project: Project) => void;
}) {
  return (
    <>
      <color attach="background" args={["#050509"]} />
      <fog attach="fog" args={["#050509", 10, 52]} />
      <ambientLight intensity={0.55} />
      <directionalLight position={[5, 8, 4]} intensity={0.9} />

      <Rig progress={progress} journey={journey} />
      <StarField />
      <Asteroids journey={journey} />

      <StoryPanel position={[0, 0.2, journey.heroZ]} width={620}>
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.4em] text-primary">
          Full-Stack Engineer
        </p>
        <h1 className="mb-4 font-heading text-8xl font-black tracking-tight text-foreground">
          MONU
        </h1>
        <p className="text-base text-muted-foreground">
          Welcome to my universe. Every light out here is something I built.
        </p>
      </StoryPanel>

      <Portal z={journey.sparkZ + 8} />
      <StoryPanel position={[0, 0, journey.sparkZ]}>
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.4em] text-primary">
          Chapter 01 — The Spark
        </p>
        <h2 className="mb-4 font-heading text-4xl font-black tracking-tight text-foreground">
          Every product begins as an idea drifting in the void.
        </h2>
        <p className="text-sm leading-relaxed text-muted-foreground">
          I catch them and give them gravity. I&apos;m Monu — I turn ideas into
          real, working products. Not in weeks. In hours.
        </p>
      </StoryPanel>

      <Portal z={journey.forgeZ + 8} color="#a78bfa" />
      <StoryPanel position={[0, 1.6, journey.forgeZ]} width={640}>
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.4em] text-primary">
          Chapter 02 — The Forge
        </p>
        <h2 className="font-heading text-4xl font-black tracking-tight text-foreground">
          Where raw ideas are hammered into products.
        </h2>
      </StoryPanel>
      {forgeSteps.map((item, i) => (
        <FadingHtml
          key={item.step}
          position={[(i - 1) * 3.4, -1.4, journey.forgeZ - 2 - i * 1.5]}
          rotation={[0, (1 - i) * 0.18, 0]}
          distanceFactor={4.4}
          width={240}
          align="left"
        >
          <div className="rounded-2xl border border-border bg-card/90 p-5 text-left backdrop-blur-sm">
            <p className="mb-1 text-[10px] font-bold text-primary">{item.step}</p>
            <h3 className="mb-2 font-heading text-lg font-bold">{item.title}</h3>
            <p className="text-xs leading-relaxed text-muted-foreground">{item.text}</p>
          </div>
        </FadingHtml>
      ))}

      <Portal z={journey.workIntroZ + 8} color="#34d399" />
      <StoryPanel position={[0, 0, journey.workIntroZ]}>
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.4em] text-primary">
          Chapter 03 — The Constellation
        </p>
        <h2 className="mb-4 font-heading text-4xl font-black tracking-tight text-foreground">
          Stations I&apos;ve launched into orbit.
        </h2>
        <p className="text-sm text-muted-foreground">
          Drift past each one. Dock at any station to read its full log.
        </p>
      </StoryPanel>
      {projects.map((project, i) => (
        <ProjectStation
          key={project.id}
          project={project}
          position={[journey.projectX(i), 0, journey.projectZ(i)]}
          side={i % 2 === 0 ? "left" : "right"}
          onOpen={onOpenProject}
        />
      ))}

      <Portal z={journey.philosophyZ + 8} color="#f472b6" />
      <StoryPanel position={[0, 0, journey.philosophyZ]} width={600}>
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.4em] text-primary">
          Chapter 04 — The Philosophy
        </p>
        <h2 className="mb-4 font-heading text-3xl font-black leading-snug tracking-tight text-foreground">
          &ldquo;I focus on architecture, decisions and outcomes. Ship in
          hours, not weeks — without cutting the corners that matter.&rdquo;
        </h2>
        <p className="text-sm text-muted-foreground">
          React · Next.js · TypeScript — experiences that feel good to use.
        </p>
      </StoryPanel>

      <Beacon z={journey.beaconZ} />
      <StoryPanel position={[0, -0.4, journey.beaconZ]} width={560}>
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.4em] text-primary">
          Final Chapter — The Beacon
        </p>
        <h2 className="mb-4 font-heading text-4xl font-black tracking-tight text-foreground">
          Every journey ends with a new beginning.
        </h2>
        <p className="mb-6 text-sm text-muted-foreground">
          Let&apos;s build something meaningful together.
        </p>
        <div className="flex items-center justify-center gap-3">
          <a
            href="mailto:monuraj88703@gmail.com"
            className="pointer-events-auto inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-bold text-primary-foreground transition-opacity duration-200 hover:opacity-90"
          >
            monuraj88703@gmail.com
          </a>
          <a
            href="https://github.com/withhumanrevenge-cyber"
            target="_blank"
            rel="noopener noreferrer"
            className="pointer-events-auto inline-flex items-center rounded-full border border-border bg-secondary px-5 py-3 text-sm font-bold transition-colors duration-200 hover:text-primary"
          >
            GitHub ↗
          </a>
        </div>
      </StoryPanel>
    </>
  );
}
