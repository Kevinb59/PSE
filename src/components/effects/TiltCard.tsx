"use client";

import { useRef, type ReactNode, type MouseEvent } from "react";

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  intensity?: number;
}

/**
 * Carte avec effet tilt 3D et spot lumineux au survol.
 * Applique une rotation perspective basée sur la position du curseur.
 */
export default function TiltCard({
  children,
  className = "",
  intensity = 8,
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;

    el.style.setProperty("--mx", `${px * 100}%`);
    el.style.setProperty("--my", `${py * 100}%`);

    const rotateX = (py - 0.5) * -intensity;
    const rotateY = (px - 0.5) * intensity;
    el.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
  };

  const handleLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "";
    el.style.removeProperty("--mx");
    el.style.removeProperty("--my");
  };

  return (
    <div
      ref={ref}
      className={`card-glow transition-[border-color,background] duration-300 ${className}`}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ transformStyle: "preserve-3d" }}
    >
      {children}
    </div>
  );
}
