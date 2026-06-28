"use client";

import Image from "next/image";
import BullProofHotspot from "@/components/effects/BullProofHotspot";
import { PREUVE_SITES } from "@/lib/preuveSites";

const BULL_LOGO_SRC = "/media/Moriarty-Bull.svg";

interface MoriartyBullLogoProps {
  className?: string;
  /** Largeur max en px — ignoré si variant="hero" */
  maxWidth?: number;
  /** Pleine taille — occupe l'espace disponible (slide Réalisations) */
  variant?: "default" | "hero";
  /** Affiche les 9 points interactifs (slide Réalisations) */
  showHotspots?: boolean;
}

/**
 * Logo Moriarty — taureau seul (sans texte), extrait de Transparent Logo.svg.
 */
export default function MoriartyBullLogo({
  className = "",
  maxWidth = 220,
  variant = "default",
  showHotspots = false,
}: MoriartyBullLogoProps) {
  const isHero = variant === "hero";

  // ── Mode hero : remplit l'espace flex parent (slide Réalisations), sans plafond maxWidth fixe
  return (
    <div
      className={`relative mx-auto ${isHero ? "flex h-full w-full max-w-[900px] items-center justify-center" : ""} ${className}`}
      style={isHero ? undefined : { width: "100%", maxWidth }}
    >
      <div className="relative w-full overflow-visible">
        <Image
          src={BULL_LOGO_SRC}
          alt="Logo Moriarty"
          width={371}
          height={196}
          className={
            isHero
              ? "h-auto max-h-full w-full max-w-full object-contain drop-shadow-[0_0_40px_rgba(142,216,255,0.35)]"
              : "h-auto w-full drop-shadow-[0_0_28px_rgba(142,216,255,0.28)]"
          }
        />

        {/* ── Hotspots : positions % calées sur le SVG du taureau ── */}
        {showHotspots && (
          <div className="pointer-events-none absolute inset-0 z-20 overflow-visible">
            {PREUVE_SITES.map((site) => (
              <div key={site.id} className="pointer-events-auto">
                <BullProofHotspot site={site} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
