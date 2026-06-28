"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

interface HeroTitleProps {
  text: string;
  /** Déclenche le fondu — dès le début de la transition overlay */
  startAnimation?: boolean;
  /** Retard avant le fondu (synchronisé avec le zoom overlay) */
  animationDelay?: number;
}

/** Durée du fondu titre page — calée sur la fin de la transition intro */
const HERO_FADE_DURATION = 0.85;

/**
 * Titre hero — fondu entrant pendant la transition overlay (crossfade avec le zoom).
 */
export default function HeroTitle({
  text,
  startAnimation = false,
  animationDelay = 0,
}: HeroTitleProps) {
  const ref = useRef<HTMLHeadingElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!startAnimation || hasAnimated.current) return;

    const el = ref.current;
    if (!el) return;

    hasAnimated.current = true;

    gsap.to(el, {
      opacity: 1,
      duration: HERO_FADE_DURATION,
      delay: animationDelay,
      ease: "power2.out",
    });
  }, [text, startAnimation, animationDelay]);

  return (
    <div className="overflow-visible pb-1">
      <h1
        ref={ref}
        className="font-engagement hero-brand-title title-no-break gradient-text max-w-[1120px] text-[clamp(80px,16vw,220px)] tracking-normal"
        style={{ opacity: 0 }}
      >
        {text}
      </h1>
    </div>
  );
}
