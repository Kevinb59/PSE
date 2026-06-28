"use client";

import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { appendSplitText } from "@/lib/splitTextAnimation";

gsap.registerPlugin(ScrollTrigger);

interface RevealOnScrollProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  splitText?: boolean;
  /** Mots à styliser (ex. rainbow-ia) lors du splitText */
  highlightWords?: string[];
  /** Anime dès le montage (slide hero) — évite un contenu partiel pendant la transition intro */
  playOnMount?: boolean;
}

/**
 * Révélation au scroll via GSAP ScrollTrigger.
 * Option splitText : anime chaque caractère individuellement pour un effet cinématique.
 */
export default function RevealOnScroll({
  children,
  className = "",
  delay = 0,
  y = 40,
  splitText = false,
  highlightWords = [],
  playOnMount = false,
}: RevealOnScrollProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const scrollTriggerConfig = playOnMount
      ? undefined
      : {
          trigger: el,
          start: "top 85%",
          toggleActions: "play none none reverse",
        };

    if (splitText) {
      const text =
        typeof children === "string"
          ? children
          : el.textContent?.trim() ?? "";

      appendSplitText(el, text, "split-char", highlightWords);

      gsap.to(el.querySelectorAll(".split-char"), {
        opacity: 1,
        y: 0,
        rotateX: 0,
        duration: 0.7,
        stagger: 0.025,
        ease: "power3.out",
        delay,
        scrollTrigger: playOnMount
          ? undefined
          : {
              trigger: el,
              start: "top 82%",
              toggleActions: "play none none reverse",
            },
      });
    } else {
      gsap.fromTo(
        el,
        { opacity: 0, y, scale: 0.98 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.9,
          delay,
          ease: "power3.out",
          scrollTrigger: scrollTriggerConfig,
        }
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger === el) t.kill();
      });
    };
  }, [children, delay, y, splitText, highlightWords, playOnMount]);

  return (
    <div ref={ref} className={className}>
      {splitText ? (typeof children === "string" ? children : children) : children}
    </div>
  );
}
