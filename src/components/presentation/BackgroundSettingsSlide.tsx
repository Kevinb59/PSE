"use client";

import type { BackgroundSettings } from "@/lib/backgroundSettings";
import { DEFAULT_BACKGROUND_SETTINGS } from "@/lib/backgroundSettings";

interface BackgroundSettingsSlideProps {
  settings: BackgroundSettings;
  onChange: (settings: BackgroundSettings) => void;
}

interface ControlProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  unit?: string;
  onChange: (v: number) => void;
}

/** Slider numérique réutilisable */
function Control({ label, value, min, max, step = 0.01, unit = "", onChange }: ControlProps) {
  return (
    <label className="block">
      <span className="mb-1.5 flex justify-between font-mono text-[11px] text-white/55">
        <span>{label}</span>
        <span>
          {Number.isInteger(step) ? value : value.toFixed(2)}
          {unit}
        </span>
      </span>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-white/12 accent-[var(--accent)]"
      />
    </label>
  );
}

interface ToggleProps {
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}

function Toggle({ label, checked, onChange }: ToggleProps) {
  return (
    <label className="flex cursor-pointer items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2.5">
      <span className="text-sm text-white/80">{label}</span>
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="h-4 w-4 accent-[var(--accent)]"
      />
    </label>
  );
}

interface ColorControlProps {
  label: string;
  value: string;
  onChange: (v: string) => void;
}

function ColorControl({ label, value, onChange }: ColorControlProps) {
  return (
    <label className="flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2.5">
      <span className="text-sm text-white/80">{label}</span>
      <input
        type="color"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-8 w-12 cursor-pointer rounded border-0 bg-transparent"
      />
    </label>
  );
}

interface RgbControlProps {
  label: string;
  r: number;
  g: number;
  b: number;
  onChange: (r: number, g: number, b: number) => void;
}

/** Contrôle couleur RGB pour les taches du mesh */
function RgbControl({ label, r, g, b, onChange }: RgbControlProps) {
  const hex = `#${[r, g, b].map((c) => c.toString(16).padStart(2, "0")).join("")}`;
  return (
    <label className="flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2.5">
      <span className="text-sm text-white/80">{label}</span>
      <input
        type="color"
        value={hex}
        onChange={(e) => {
          const v = e.target.value.replace("#", "");
          onChange(parseInt(v.slice(0, 2), 16), parseInt(v.slice(2, 4), 16), parseInt(v.slice(4, 6), 16));
        }}
        className="h-8 w-12 cursor-pointer rounded border-0 bg-transparent"
      />
    </label>
  );
}

/**
 * Panneau de réglages du fond animé — sliders organisés par catégorie.
 */
export default function BackgroundSettingsSlide({
  settings,
  onChange,
}: BackgroundSettingsSlideProps) {
  const patch = (partial: Partial<BackgroundSettings>) => onChange({ ...settings, ...partial });

  const blobControls = (n: 1 | 2 | 3, label: string) => {
    const p = n as 1 | 2 | 3;
    return (
      <div className="space-y-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
        <h3 className="font-mono text-xs uppercase tracking-widest text-[var(--accent)]">{label}</h3>
        <Control label="Opacité" value={settings[`blob${p}Opacity`]} min={0} max={0.8} step={0.01} onChange={(v) => patch({ [`blob${p}Opacity`]: v } as Partial<BackgroundSettings>)} />
        <Control label="Taille (vmax)" value={settings[`blob${p}Size`]} min={10} max={80} step={1} onChange={(v) => patch({ [`blob${p}Size`]: v } as Partial<BackgroundSettings>)} />
        <Control label="Position X (%)" value={settings[`blob${p}X`]} min={0} max={100} step={1} unit="%" onChange={(v) => patch({ [`blob${p}X`]: v } as Partial<BackgroundSettings>)} />
        <Control label="Position Y (%)" value={settings[`blob${p}Y`]} min={0} max={100} step={1} unit="%" onChange={(v) => patch({ [`blob${p}Y`]: v } as Partial<BackgroundSettings>)} />
        <RgbControl
          label="Couleur"
          r={settings[`blob${p}R`]}
          g={settings[`blob${p}G`]}
          b={settings[`blob${p}B`]}
          onChange={(r, g, b) => patch({ [`blob${p}R`]: r, [`blob${p}G`]: g, [`blob${p}B`]: b } as Partial<BackgroundSettings>)}
        />
      </div>
    );
  };

  return (
    <div data-lenis-prevent className="max-h-[min(68vh,720px)] overflow-y-auto pr-2">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-white/55">
          Ajustez le fond en direct — les changements s&apos;appliquent immédiatement à toute la présentation.
        </p>
        <button
          type="button"
          onClick={() => onChange({ ...DEFAULT_BACKGROUND_SETTINGS })}
          className="rounded-full border border-white/14 bg-white/7 px-4 py-2 text-xs text-white/80 transition hover:bg-white/12"
        >
          Réinitialiser
        </button>
      </div>

      <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
        {blobControls(1, "Tache cyan (haut gauche)")}
        {blobControls(2, "Tache violet (haut droite)")}
        {blobControls(3, "Tache vert (bas)")}

        <div className="space-y-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
          <h3 className="font-mono text-xs uppercase tracking-widest text-[var(--accent)]">Dégradé de base</h3>
          <ColorControl label="Couleur haute" value={settings.bgTop} onChange={(v) => patch({ bgTop: v })} />
          <ColorControl label="Couleur milieu" value={settings.bgMid} onChange={(v) => patch({ bgMid: v })} />
          <ColorControl label="Couleur basse" value={settings.bgBottom} onChange={(v) => patch({ bgBottom: v })} />
        </div>

        <div className="space-y-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
          <h3 className="font-mono text-xs uppercase tracking-widest text-[var(--accent)]">Halo souris</h3>
          <Toggle label="Activer le halo" checked={settings.spotEnabled} onChange={(v) => patch({ spotEnabled: v })} />
          <Control label="Opacité centre" value={settings.spotOpacity} min={0} max={0.3} step={0.005} onChange={(v) => patch({ spotOpacity: v })} />
          <Control label="Opacité milieu" value={settings.spotMidOpacity} min={0} max={0.15} step={0.005} onChange={(v) => patch({ spotMidOpacity: v })} />
          <Control label="Rayon (vmax)" value={settings.spotRadius} min={50} max={300} step={5} onChange={(v) => patch({ spotRadius: v })} />
        </div>

        <div className="space-y-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
          <h3 className="font-mono text-xs uppercase tracking-widest text-[var(--accent)]">Grille</h3>
          <Control label="Opacité globale" value={settings.gridOpacity} min={0} max={0.8} step={0.01} onChange={(v) => patch({ gridOpacity: v })} />
          <Control label="Taille cellules (px)" value={settings.gridSize} min={16} max={96} step={1} unit="px" onChange={(v) => patch({ gridSize: v })} />
          <Control label="Opacité lignes" value={settings.gridLineOpacity} min={0} max={0.2} step={0.005} onChange={(v) => patch({ gridLineOpacity: v })} />
          <Control label="Vignette intérieure (%)" value={settings.gridVignetteInner} min={20} max={90} step={1} unit="%" onChange={(v) => patch({ gridVignetteInner: v })} />
        </div>

        <div className="space-y-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
          <h3 className="font-mono text-xs uppercase tracking-widest text-[var(--accent)]">Grain / bruit</h3>
          <Control label="Opacité du grain" value={settings.noiseOpacity} min={0} max={0.3} step={0.005} onChange={(v) => patch({ noiseOpacity: v })} />
          <Control label="Finesse (fréquence)" value={settings.noiseFrequency} min={0.5} max={4} step={0.1} onChange={(v) => patch({ noiseFrequency: v })} />
          <Control label="Taille des points (px)" value={settings.noiseTileSize} min={48} max={256} step={4} unit="px" onChange={(v) => patch({ noiseTileSize: v })} />
        </div>

        <div className="space-y-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4 lg:col-span-2 xl:col-span-2">
          <h3 className="font-mono text-xs uppercase tracking-widest text-[var(--accent)]">Particules &amp; réseau</h3>
          <div className="grid gap-3 sm:grid-cols-2">
            <Toggle label="Activer les particules" checked={settings.particlesEnabled} onChange={(v) => patch({ particlesEnabled: v })} />
            <Control label="Opacité canvas" value={settings.particlesOpacity} min={0} max={1} step={0.05} onChange={(v) => patch({ particlesOpacity: v })} />
            <Control label="Quantité (×)" value={settings.particleCountMul} min={0.3} max={2} step={0.05} onChange={(v) => patch({ particleCountMul: v })} />
            <Control label="Taille max" value={settings.particleSize} min={0.5} max={4} step={0.1} onChange={(v) => patch({ particleSize: v })} />
            <Control label="Vitesse" value={settings.particleSpeed} min={0.05} max={1.5} step={0.05} onChange={(v) => patch({ particleSpeed: v })} />
            <Control label="Distance connexion" value={settings.particleConnectionDist} min={40} max={220} step={5} unit="px" onChange={(v) => patch({ particleConnectionDist: v })} />
            <Control label="Opacité connexions" value={settings.particleConnectionOpacity} min={0} max={0.5} step={0.01} onChange={(v) => patch({ particleConnectionOpacity: v })} />
            <Control label="Force curseur" value={settings.particleCursorForce} min={0} max={0.15} step={0.005} onChange={(v) => patch({ particleCursorForce: v })} />
            <Control label="Teinte A (cyan)" value={settings.particleHueA} min={0} max={360} step={1} onChange={(v) => patch({ particleHueA: v })} />
            <Control label="Teinte B (violet)" value={settings.particleHueB} min={0} max={360} step={1} onChange={(v) => patch({ particleHueB: v })} />
          </div>
        </div>
      </div>
    </div>
  );
}
