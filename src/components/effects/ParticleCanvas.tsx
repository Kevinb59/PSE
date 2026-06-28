"use client";

import { useEffect, useRef } from "react";
import type { BackgroundSettings } from "@/lib/backgroundSettings";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  hue: number;
  /** Angle de dérive propre à la particule — mouvement fluide et continu */
  driftAngle: number;
  /** Phase pour oscillation lente de la direction */
  phase: number;
}

interface ParticleCanvasProps {
  settings: BackgroundSettings;
}

/**
 * Canvas de particules — dérive fluide, sans à-coups (paramètres BackgroundSettings).
 */
export default function ParticleCanvas({ settings }: ParticleCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointerRef = useRef({ x: -9999, y: -9999 });
  const particlesRef = useRef<Particle[]>([]);
  const frameRef = useRef<number>(0);
  const settingsRef = useRef(settings);

  settingsRef.current = settings;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      const cfg = settingsRef.current;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const base = Math.floor((width * height) / 15000);
      const count = Math.min(180, Math.max(40, Math.floor(base * cfg.particleCountMul)));
      particlesRef.current = Array.from({ length: count }, () => {
        const driftAngle = Math.random() * Math.PI * 2;
        const speed = (0.45 + Math.random() * 0.55) * cfg.particleSpeed;

        return {
          x: Math.random() * width,
          y: Math.random() * height,
          vx: Math.cos(driftAngle) * speed,
          vy: Math.sin(driftAngle) * speed,
          r: Math.random() * cfg.particleSize + 0.5,
          hue: Math.random() > 0.45 ? cfg.particleHueA : cfg.particleHueB,
          driftAngle,
          phase: Math.random() * Math.PI * 2,
        };
      });
    };

    const draw = () => {
      const cfg = settingsRef.current;
      ctx.clearRect(0, 0, width, height);

      if (!cfg.particlesEnabled) {
        frameRef.current = requestAnimationFrame(draw);
        return;
      }

      const pointer = pointerRef.current;
      const particles = particlesRef.current;

      for (const p of particles) {
        const dx = p.x - pointer.x;
        const dy = p.y - pointer.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const force = Math.max(0, 140 - dist) / 140;

        // ── Dérive lente — direction qui oscille en douceur (pas de snap aléatoire) ──
        p.phase += 0.006;
        const wander = Math.sin(p.phase) * 0.22;
        const targetSpeed = cfg.particleSpeed * (0.62 + Math.sin(p.phase * 0.5) * 0.12);
        const targetVx = Math.cos(p.driftAngle + wander) * targetSpeed;
        const targetVy = Math.sin(p.driftAngle + wander) * targetSpeed;

        p.vx += (targetVx - p.vx) * 0.022;
        p.vy += (targetVy - p.vy) * 0.022;

        // ── Interaction curseur — légère, sans secousse ──
        if (force > 0) {
          p.vx += (dx / (dist || 1)) * force * cfg.particleCursorForce;
          p.vy += (dy / (dist || 1)) * force * cfg.particleCursorForce;
        }

        p.x += p.vx;
        p.y += p.vy;

        if (p.x < -20) p.x = width + 20;
        if (p.x > width + 20) p.x = -20;
        if (p.y < -20) p.y = height + 20;
        if (p.y > height + 20) p.y = -20;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, 90%, 76%, 0.58)`;
        ctx.fill();
      }

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i];
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < cfg.particleConnectionDist) {
            const alpha = (1 - dist / cfg.particleConnectionDist) * cfg.particleConnectionOpacity;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(142, 216, 255, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      frameRef.current = requestAnimationFrame(draw);
    };

    const onPointerMove = (e: PointerEvent) => {
      pointerRef.current = { x: e.clientX, y: e.clientY };
      document.documentElement.style.setProperty("--spot-x", `${e.clientX}px`);
      document.documentElement.style.setProperty("--spot-y", `${e.clientY}px`);
    };

    const onPointerLeave = () => {
      pointerRef.current = { x: -9999, y: -9999 };
      document.documentElement.style.setProperty("--spot-x", "50vw");
      document.documentElement.style.setProperty("--spot-y", "50vh");
    };

    resize();
    draw();

    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerleave", onPointerLeave);

    return () => {
      cancelAnimationFrame(frameRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerleave", onPointerLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-[-2] h-full w-full"
      style={{ opacity: "var(--particles-layer-opacity, 0.9)" }}
      aria-hidden
    />
  );
}
