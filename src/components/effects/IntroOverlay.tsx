"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const LOGO_SRC = "/media/Logo.webp";
const TRANSITION_DURATION = 3;
const CHROME_FADE_DURATION = 1;
const easeIntro = [0.22, 1, 0.36, 1] as const;
const easeZoom = [0.35, 0, 0.15, 1] as const;

interface IntroOverlayProps {
  /** Début du clic — révèle la page préchargée sous l'overlay */
  onRevealStart: () => void;
  /** Transition terminée (3 s) */
  onComplete: () => void;
}

/**
 * Écran d'intro — transition 3 s au clic :
 * - Autres éléments disparaissent en 1 s
 * - Fond noir + « Moriarty » s'estompent sur 3 s (zoom ×100)
 */
export default function IntroOverlay({ onRevealStart, onComplete }: IntroOverlayProps) {
  const [mounted, setMounted] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleStart = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    onRevealStart();
  };

  // Retire l'overlay après 3 s d'animation
  useEffect(() => {
    if (!isTransitioning) return;

    const timer = window.setTimeout(() => {
      setMounted(false);
    }, TRANSITION_DURATION * 1000);

    return () => window.clearTimeout(timer);
  }, [isTransitioning]);

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {mounted && (
        <div
          className={`fixed inset-0 z-[100] ${isTransitioning ? "pointer-events-none overflow-visible" : "overflow-hidden"}`}
        >
          {/* Fond noir — devient transparent sur 3 s */}
          <motion.div
            className="absolute inset-0 bg-[#03040a]"
            animate={isTransitioning ? { opacity: 0 } : { opacity: 1 }}
            transition={{ duration: TRANSITION_DURATION, ease: easeZoom }}
            aria-hidden
          />

          {/* Colonne centrée — logo, titre, sous-titre, bouton */}
          <div className="relative flex h-full flex-col items-center justify-center px-6 text-center">
            {/* Bloc haut — disparaît en 1 s avec le bouton */}
            <motion.div
              className="flex flex-col items-center"
              animate={isTransitioning ? { opacity: 0 } : { opacity: 1 }}
              transition={{ duration: CHROME_FADE_DURATION, ease: "easeOut" }}
            >
              <motion.div
                className="relative mb-7 flex h-28 w-28 items-center justify-center md:mb-8 md:h-32 md:w-32"
                initial={{ scale: 0.55, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.85, ease: easeIntro }}
              >
                <div
                  className="pointer-events-none absolute inset-[-20%] rounded-full bg-[radial-gradient(circle,rgba(142,216,255,0.35),transparent_70%)] blur-xl"
                  aria-hidden
                />
                <Image
                  src={LOGO_SRC}
                  alt="Logo Moriarty"
                  width={128}
                  height={128}
                  priority
                  className="relative h-full w-full object-contain drop-shadow-[0_0_40px_rgba(142,216,255,0.35)]"
                />
              </motion.div>
            </motion.div>

            {/* Moriarty — centré dans le flux entre logo et sous-titre, zoom ×100 sur 3 s */}
            <motion.h1
              className="font-engagement hero-brand-title intro-overlay-title gradient-text pointer-events-none relative z-[102] origin-center text-center text-6xl md:text-8xl"
              initial={{ opacity: 0, scale: 0.92 }}
              animate={
                isTransitioning
                  ? { scale: 100, opacity: 0 }
                  : { opacity: 1, scale: 1 }
              }
              transition={
                isTransitioning
                  ? { duration: TRANSITION_DURATION, ease: easeZoom }
                  : { delay: 0.3, duration: 0.8, ease: easeIntro }
              }
            >
              Moriarty
            </motion.h1>

            {/* Bloc bas — disparaît en 1 s */}
            <motion.div
              className="flex flex-col items-center"
              animate={isTransitioning ? { opacity: 0 } : { opacity: 1 }}
              transition={{ duration: CHROME_FADE_DURATION, ease: "easeOut" }}
            >
              <motion.p
                className="mt-7 font-mono text-xs uppercase tracking-[0.3em] text-white/50 md:mt-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.6 }}
              >
                Commission PSE · Présentation
              </motion.p>

              <motion.button
                type="button"
                onClick={handleStart}
                disabled={isTransitioning}
                className="mt-10 inline-flex min-h-[54px] items-center justify-center rounded-full bg-gradient-to-br from-[rgba(142,216,255,0.92)] to-[rgba(168,137,255,0.92)] px-8 font-extrabold text-[#050713] shadow-[0_18px_54px_rgba(142,216,255,0.22)] transition hover:-translate-y-0.5 disabled:pointer-events-none disabled:opacity-70"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.7, ease: easeIntro }}
              >
                Commencer la présentation
              </motion.button>
            </motion.div>
          </div>

          {/* Barre clignotante — disparaît en 1 s */}
          <motion.div
            className="absolute bottom-12 left-1/2 z-[101] h-[2px] w-56 -translate-x-1/2 rounded-full bg-gradient-to-r from-transparent via-[var(--accent)] to-transparent shadow-[0_0_20px_rgba(142,216,255,0.5)] md:bottom-14 md:h-[3px] md:w-72"
            style={{ animation: isTransitioning ? "none" : "intro-pulse 1.5s ease-in-out infinite" }}
            initial={{ scaleX: 0, opacity: 1 }}
            animate={
              isTransitioning
                ? { opacity: 0, scaleX: 0.5 }
                : { scaleX: 1, opacity: 1 }
            }
            transition={{
              delay: isTransitioning ? 0 : 1,
              duration: isTransitioning ? CHROME_FADE_DURATION : 0.8,
            }}
          />
        </div>
      )}
    </AnimatePresence>
  );
}
