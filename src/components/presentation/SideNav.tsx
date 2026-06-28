"use client";

import { SLIDES } from "@/lib/slides";

interface SideNavProps {
  activeIndex: number;
  onNavigate: (index: number) => void;
}

export default function SideNav({ activeIndex, onNavigate }: SideNavProps) {
  return (
    <nav
      className="no-print fixed right-7 top-1/2 z-50 hidden -translate-y-1/2 grid-cols-1 gap-3 md:grid"
      aria-label="Navigation de présentation"
    >
      {SLIDES.map((slide, index) => (
        <button
          key={slide.id}
          type="button"
          aria-label={slide.title}
          aria-current={activeIndex === index ? "true" : undefined}
          onClick={() => onNavigate(index)}
          className={`group relative h-3 w-3 rounded-full transition ${
            activeIndex === index
              ? "scale-[1.45] bg-[var(--accent)] shadow-[0_0_24px_rgba(142,216,255,0.75)]"
              : "bg-white/22 hover:bg-white/40"
          }`}
        >
          <span className="pointer-events-none absolute right-[22px] top-1/2 -translate-y-1/2 translate-x-2 whitespace-nowrap rounded-full border border-white/12 bg-black/45 px-2.5 py-1.5 text-xs text-white/84 opacity-0 transition group-hover:translate-x-0 group-hover:opacity-100">
            {slide.title}
          </span>
        </button>
      ))}
    </nav>
  );
}
