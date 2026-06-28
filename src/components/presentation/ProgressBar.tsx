"use client";

import { useEffect, useState } from "react";

export default function ProgressBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? (window.scrollY / max) * 100 : 0);
    };

    window.addEventListener("scroll", update, { passive: true });
    update();
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <div className="no-print fixed left-0 top-0 z-[60] h-[3px] w-full bg-white/4" aria-hidden>
      <div
        className="h-full bg-gradient-to-r from-[var(--accent)] via-[var(--accent-2)] to-[var(--accent-3)] shadow-[0_0_24px_rgba(142,216,255,0.55)] transition-[width] duration-150"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
