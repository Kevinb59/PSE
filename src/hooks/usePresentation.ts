"use client";

import { useCallback, useEffect, useState } from "react";

/**
 * Gestion du mode présentation : plein écran + navigation clavier entre slides.
 */
export function usePresentation(
  sectionRefs: React.RefObject<(HTMLElement | null)[]>,
  sectionCount: number
) {
  const [isPresentationMode, setIsPresentationMode] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const scrollToSection = useCallback(
    (index: number) => {
      const sections = sectionRefs.current;
      if (!sections?.[index]) return;
      sections[index]?.scrollIntoView({ behavior: "smooth", block: "start" });
      setActiveIndex(index);
    },
    [sectionRefs]
  );

  const toggleFullscreen = useCallback(async () => {
    if (!document.fullscreenElement) {
      try {
        await document.documentElement.requestFullscreen();
        setIsPresentationMode(true);
      } catch {
        setIsPresentationMode((v) => !v);
      }
    } else {
      await document.exitFullscreen();
      setIsPresentationMode(false);
    }
  }, []);

  useEffect(() => {
    const onFullscreenChange = () => {
      if (!document.fullscreenElement) {
        setIsPresentationMode(false);
      }
    };
    document.addEventListener("fullscreenchange", onFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", onFullscreenChange);
  }, []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (["ArrowDown", "PageDown", " "].includes(e.key)) {
        e.preventDefault();
        scrollToSection(Math.min(activeIndex + 1, sectionCount - 1));
      }
      if (["ArrowUp", "PageUp"].includes(e.key)) {
        e.preventDefault();
        scrollToSection(Math.max(activeIndex - 1, 0));
      }
      if (e.key === "Home") {
        e.preventDefault();
        scrollToSection(0);
      }
      if (e.key === "End") {
        e.preventDefault();
        scrollToSection(sectionCount - 1);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activeIndex, sectionCount, scrollToSection]);

  return {
    isPresentationMode,
    activeIndex,
    setActiveIndex,
    scrollToSection,
    toggleFullscreen,
  };
}
