"use client";

import { useCallback, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import type { PreuveSite } from "@/lib/preuveSites";
import {
  computePreviewLayout,
  type PreviewLayout,
} from "@/lib/bullHotspotLayout";

interface BullProofHotspotProps {
  site: PreuveSite;
}

/**
 * Point interactif sur le taureau — miniature positionnée intelligemment (portail fixe).
 */
export default function BullProofHotspot({ site }: BullProofHotspotProps) {
  const anchorRef = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  const [layout, setLayout] = useState<PreviewLayout | null>(null);
  const [mounted, setMounted] = useState(false);

  // ── Recalcule la position dès que le point ou le viewport change ──
  const updateLayout = useCallback(() => {
    const anchor = anchorRef.current;
    if (!anchor) return;
    setLayout(computePreviewLayout(anchor.getBoundingClientRect()));
  }, []);

  useLayoutEffect(() => {
    setMounted(true);
  }, []);

  useLayoutEffect(() => {
    if (!open) {
      setLayout(null);
      return;
    }

    updateLayout();

    window.addEventListener("resize", updateLayout);
    window.addEventListener("scroll", updateLayout, true);

    return () => {
      window.removeEventListener("resize", updateLayout);
      window.removeEventListener("scroll", updateLayout, true);
    };
  }, [open, updateLayout]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // ── Miniature rendue en portail fixe pour ne pas être coupée par overflow ──
  const previewPortal =
    mounted &&
    open &&
    layout &&
    createPortal(
      <>
        <svg
          className="pointer-events-none fixed inset-0 z-[290]"
          width="100%"
          height="100%"
          aria-hidden
        >
          <line
            x1={layout.lineStart.x}
            y1={layout.lineStart.y}
            x2={layout.lineEnd.x}
            y2={layout.lineEnd.y}
            stroke="rgba(255,255,255,0.65)"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>

        <div
          className="pointer-events-none fixed z-[300] transition-all duration-300"
          style={{
            left: layout.left,
            top: layout.top,
            width: layout.width,
          }}
          aria-hidden={!open}
        >
          <div className="overflow-hidden rounded-[22px] border border-white/25 bg-[linear-gradient(145deg,rgba(255,255,255,0.14),rgba(255,255,255,0.05)),rgba(8,12,24,0.96)] shadow-[0_24px_70px_rgba(0,0,0,0.65)] backdrop-blur-xl">
            <div className="relative aspect-[16/10] w-full overflow-hidden border-b border-white/10 bg-[#0a0f1c]">
              {site.imageSrc ? (
                <Image
                  src={site.imageSrc}
                  alt={`Aperçu ${site.name}`}
                  fill
                  className="object-cover object-top"
                  sizes="825px"
                />
              ) : (
                <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-[linear-gradient(135deg,rgba(142,216,255,0.12),rgba(168,137,255,0.08))] px-5 text-center">
                  <span className="text-sm uppercase tracking-[0.18em] text-white/45">
                    Aperçu à venir
                  </span>
                  <span className="text-2xl font-medium text-white/85">{site.name}</span>
                </div>
              )}
            </div>
            <a
              href={site.href}
              target="_blank"
              rel="noopener noreferrer"
              className="pointer-events-auto block truncate px-5 py-5 text-center text-base tracking-wide text-white/80 underline-offset-4 transition-colors hover:text-white hover:underline"
            >
              {site.url}
            </a>
          </div>
        </div>
      </>,
      document.body
    );

  return (
    <>
      <div
        className={`absolute -translate-x-1/2 -translate-y-1/2 transition-[z-index] duration-0 ${open ? "z-[200]" : "z-10"}`}
        style={{ left: `${site.x}%`, top: `${site.y}%` }}
      >
        <button
          ref={anchorRef}
          type="button"
          aria-label={`Voir ${site.name}`}
          aria-expanded={open}
          className="relative flex h-[clamp(22px,3.2vmin,34px)] w-[clamp(22px,3.2vmin,34px)] cursor-pointer items-center justify-center rounded-full border-2 border-white bg-transparent shadow-[0_0_18px_rgba(255,255,255,0.35)] transition-transform duration-300 hover:scale-110 focus-visible:scale-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          onMouseEnter={handleOpen}
          onMouseLeave={handleClose}
          onFocus={handleOpen}
          onBlur={handleClose}
        >
          <span className="h-[38%] w-[38%] rounded-full bg-white transition-transform duration-300" />
        </button>
      </div>

      {previewPortal}
    </>
  );
}
