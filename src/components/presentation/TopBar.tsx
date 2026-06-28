"use client";

import Image from "next/image";

const LOGO_SRC = "/media/Logo.webp";

interface TopBarProps {
  onPresentationToggle: () => void;
  isPresentationMode: boolean;
}

export default function TopBar({ onPresentationToggle, isPresentationMode }: TopBarProps) {
  return (
    <header className="no-print pointer-events-none fixed left-7 right-7 top-6 z-40 flex items-center justify-between gap-4 max-md:left-3.5 max-md:right-3.5 max-md:top-3.5">
      <div className="pointer-events-auto flex items-center gap-3 text-[13px] uppercase tracking-wide text-white/88">
        <div className="relative flex h-9 w-9 shrink-0 items-center justify-center">
          <Image
            src={LOGO_SRC}
            alt="Logo Moriarty"
            width={36}
            height={36}
            className="h-full w-full object-contain drop-shadow-[0_0_16px_rgba(142,216,255,0.25)]"
          />
        </div>
        <span className="max-md:hidden">Moriarty · Dossier de création d&apos;entreprise</span>
      </div>

      <div className="pointer-events-auto flex items-center gap-2.5">
        <button
          type="button"
          onClick={onPresentationToggle}
          className="h-[42px] rounded-full border border-white/14 bg-white/7 px-4 text-[13px] text-white/88 backdrop-blur-[18px] transition hover:-translate-y-0.5 hover:border-[rgba(142,216,255,0.45)] hover:bg-white/12"
        >
          {isPresentationMode ? "Quitter présentation" : "Mode présentation"}
        </button>
        <button
          type="button"
          onClick={() => window.print()}
          className="h-[42px] rounded-full border border-white/14 bg-white/7 px-4 text-[13px] text-white/88 backdrop-blur-[18px] transition hover:-translate-y-0.5 hover:border-[rgba(142,216,255,0.45)] hover:bg-white/12"
        >
          PDF
        </button>
      </div>
    </header>
  );
}
