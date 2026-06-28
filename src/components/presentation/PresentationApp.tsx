"use client";

import { useEffect, useRef, useState } from "react";
import AnimatedBackground from "@/components/background/AnimatedBackground";
import IntroOverlay from "@/components/effects/IntroOverlay";
import TopBar from "@/components/presentation/TopBar";
import SideNav from "@/components/presentation/SideNav";
import ProgressBar from "@/components/presentation/ProgressBar";
import ScrollHint from "@/components/presentation/ScrollHint";
import SlideSections from "@/components/presentation/SlideSections";
import { useLenisScroll } from "@/hooks/useLenisScroll";
import { usePresentation } from "@/hooks/usePresentation";
import { SLIDES } from "@/lib/slides";
import {
  DEFAULT_BACKGROUND_SETTINGS,
  applyBackgroundSettings,
} from "@/lib/backgroundSettings";

/**
 * Shell principal — première section préchargée derrière l'overlay.
 */
export default function PresentationApp() {
  const [introRevealing, setIntroRevealing] = useState(false);
  const [introDone, setIntroDone] = useState(false);
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);
  sectionRefs.current = sectionRefs.current.slice(0, SLIDES.length);

  useLenisScroll();

  useEffect(() => {
    applyBackgroundSettings(DEFAULT_BACKGROUND_SETTINGS);
  }, []);

  const {
    isPresentationMode,
    activeIndex,
    setActiveIndex,
    scrollToSection,
    toggleFullscreen,
  } = usePresentation(sectionRefs, SLIDES.length);

  useEffect(() => {
    document.body.style.overflow = introRevealing || introDone ? "" : "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [introRevealing, introDone]);

  useEffect(() => {
    const sections = sectionRefs.current.filter(Boolean) as HTMLElement[];
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible) {
          const index = sections.indexOf(visible.target as HTMLElement);
          if (index >= 0) setActiveIndex(index);
        }
      },
      { threshold: [0.45, 0.6, 0.75] }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [setActiveIndex]);

  return (
    <>
      <AnimatedBackground settings={DEFAULT_BACKGROUND_SETTINGS} />

      <div className={isPresentationMode ? "presentation-mode" : ""}>
        <SlideSections
          sectionRefs={sectionRefs}
          introRevealing={introRevealing}
          introDone={introDone}
        />
      </div>

      {!introDone && (
        <IntroOverlay
          onRevealStart={() => setIntroRevealing(true)}
          onComplete={() => setIntroDone(true)}
        />
      )}

      {/* Chrome prémonté dès le chargement — fondu pendant la transition, pas à la fin */}
      <div
        className={`transition-opacity duration-[1200ms] ease-out ${
          introRevealing || introDone ? "opacity-100" : "pointer-events-none opacity-0"
        } ${introDone ? "" : "pointer-events-none"}`}
        style={
          introRevealing && !introDone ? { transitionDelay: "1.75s" } : undefined
        }
        aria-hidden={!introRevealing && !introDone}
      >
        <ProgressBar />
        <TopBar
          onPresentationToggle={toggleFullscreen}
          isPresentationMode={isPresentationMode}
        />
        <SideNav activeIndex={activeIndex} onNavigate={scrollToSection} />
        <ScrollHint hidden={activeIndex > 0} />
      </div>
    </>
  );
}
