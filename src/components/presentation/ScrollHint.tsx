"use client";

interface ScrollHintProps {
  hidden: boolean;
}

export default function ScrollHint({ hidden }: ScrollHintProps) {
  return (
    <div
      className={`no-print fixed bottom-6 left-1/2 z-[60] flex -translate-x-1/2 items-center gap-2 text-xs uppercase tracking-widest text-white/52 transition-opacity max-md:hidden ${
        hidden ? "opacity-0" : "opacity-100"
      }`}
    >
      <span className="relative h-8 w-5 rounded-full border border-white/32">
        <span
          className="absolute left-1/2 top-[7px] h-[7px] w-[3px] -translate-x-1/2 rounded-full bg-white/48"
          style={{ animation: "wheel 1.5s ease-in-out infinite" }}
        />
      </span>
      <span>Scroll / flèches clavier</span>
    </div>
  );
}
