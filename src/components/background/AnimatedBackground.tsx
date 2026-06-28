"use client";

import { useEffect, useMemo } from "react";
import ParticleCanvas from "@/components/effects/ParticleCanvas";
import type { BackgroundSettings } from "@/lib/backgroundSettings";
import { applyBackgroundSettings, buildNoiseBackgroundImage } from "@/lib/backgroundSettings";

interface AnimatedBackgroundProps {
  settings: BackgroundSettings;
}

/**
 * Couches du fond animé — mesh, grille, particules, bruit.
 * Les réglages sont appliqués en temps réel via variables CSS + props canvas.
 */
export default function AnimatedBackground({ settings }: AnimatedBackgroundProps) {
  useEffect(() => {
    applyBackgroundSettings(settings);
  }, [settings]);

  const noiseBackground = useMemo(
    () => buildNoiseBackgroundImage(settings.noiseFrequency),
    [settings.noiseFrequency]
  );

  return (
    <>
      <div className="bg-mesh" aria-hidden />
      <div className="bg-grid" aria-hidden />
      <ParticleCanvas settings={settings} />
      <div
        className="noise-overlay"
        style={{ backgroundImage: noiseBackground }}
        aria-hidden
      />
    </>
  );
}
