export interface BackgroundSettings {
  blob1Opacity: number;
  blob1Size: number;
  blob1X: number;
  blob1Y: number;
  blob1R: number;
  blob1G: number;
  blob1B: number;

  blob2Opacity: number;
  blob2Size: number;
  blob2X: number;
  blob2Y: number;
  blob2R: number;
  blob2G: number;
  blob2B: number;

  blob3Opacity: number;
  blob3Size: number;
  blob3X: number;
  blob3Y: number;
  blob3R: number;
  blob3G: number;
  blob3B: number;

  bgTop: string;
  bgMid: string;
  bgBottom: string;

  spotEnabled: boolean;
  spotOpacity: number;
  spotRadius: number;
  spotMidOpacity: number;

  gridOpacity: number;
  gridSize: number;
  gridLineOpacity: number;
  gridVignetteInner: number;

  noiseOpacity: number;
  noiseFrequency: number;
  noiseTileSize: number;

  particlesEnabled: boolean;
  particlesOpacity: number;
  particleCountMul: number;
  particleSize: number;
  particleSpeed: number;
  particleConnectionDist: number;
  particleConnectionOpacity: number;
  particleCursorForce: number;
  particleHueA: number;
  particleHueB: number;
}

export const DEFAULT_BACKGROUND_SETTINGS: BackgroundSettings = {
  blob1Opacity: 0.26,
  blob1Size: 42,
  blob1X: 16,
  blob1Y: 20,
  blob1R: 69,
  blob1G: 155,
  blob1B: 255,

  blob2Opacity: 0.16,
  blob2Size: 38,
  blob2X: 80,
  blob2Y: 18,
  blob2R: 153,
  blob2G: 102,
  blob2B: 255,

  blob3Opacity: 0.13,
  blob3Size: 36,
  blob3X: 72,
  blob3Y: 88,
  blob3R: 65,
  blob3G: 232,
  blob3B: 187,

  bgTop: "#050713",
  bgMid: "#0b1022",
  bgBottom: "#03040a",

  spotEnabled: true,
  spotOpacity: 0.07,
  spotRadius: 200,
  spotMidOpacity: 0.035,

  gridOpacity: 0.25,
  gridSize: 48,
  gridLineOpacity: 0.045,
  gridVignetteInner: 55,

  noiseOpacity: 0.08,
  noiseFrequency: 2.2,
  noiseTileSize: 96,

  particlesEnabled: true,
  particlesOpacity: 0.9,
  particleCountMul: 1,
  particleSize: 1.8,
  particleSpeed: 0.55,
  particleConnectionDist: 135,
  particleConnectionOpacity: 0.18,
  particleCursorForce: 0.045,
  particleHueA: 198,
  particleHueB: 260,
};

/**
 * Applique les réglages du fond animé via variables CSS sur :root.
 */
export function applyBackgroundSettings(s: BackgroundSettings) {
  const root = document.documentElement;

  const blob = (n: 1 | 2 | 3) => {
    const p = n === 1 ? "1" : n === 2 ? "2" : "3";
    root.style.setProperty(`--mesh-b${p}-o`, String(s[`blob${p}Opacity` as keyof BackgroundSettings]));
    root.style.setProperty(`--mesh-b${p}-size`, `${s[`blob${p}Size` as keyof BackgroundSettings]}vmax`);
    root.style.setProperty(`--mesh-b${p}-x`, `${s[`blob${p}X` as keyof BackgroundSettings]}%`);
    root.style.setProperty(`--mesh-b${p}-y`, `${s[`blob${p}Y` as keyof BackgroundSettings]}%`);
    root.style.setProperty(
      `--mesh-b${p}-rgb`,
      `${s[`blob${p}R` as keyof BackgroundSettings]}, ${s[`blob${p}G` as keyof BackgroundSettings]}, ${s[`blob${p}B` as keyof BackgroundSettings]}`
    );
  };

  blob(1);
  blob(2);
  blob(3);

  root.style.setProperty("--mesh-bg-top", s.bgTop);
  root.style.setProperty("--mesh-bg-mid", s.bgMid);
  root.style.setProperty("--mesh-bg-bottom", s.bgBottom);

  root.style.setProperty("--spot-opacity", String(s.spotEnabled ? s.spotOpacity : 0));
  root.style.setProperty("--spot-radius", `${s.spotRadius}vmax`);
  root.style.setProperty("--spot-mid-opacity", String(s.spotMidOpacity));

  root.style.setProperty("--grid-opacity", String(s.gridOpacity));
  root.style.setProperty("--grid-size", `${s.gridSize}px`);
  root.style.setProperty("--grid-line-opacity", String(s.gridLineOpacity));
  root.style.setProperty("--grid-vignette-inner", `${s.gridVignetteInner}%`);

  root.style.setProperty("--noise-opacity", String(s.noiseOpacity));
  root.style.setProperty("--noise-frequency", String(s.noiseFrequency));
  root.style.setProperty("--noise-tile-size", `${s.noiseTileSize}px`);
  root.style.setProperty("--particles-layer-opacity", String(s.particlesEnabled ? s.particlesOpacity : 0));
}

/** Génère l'URL SVG du grain — baseFrequency plus élevée = grain plus fin */
export function buildNoiseBackgroundImage(frequency: number): string {
  const svg = `<svg viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg"><filter id="n"><feTurbulence type="fractalNoise" baseFrequency="${frequency}" numOctaves="4" stitchTiles="stitch"/></filter><rect width="100%" height="100%" filter="url(%23n)" opacity="0.9"/></svg>`;
  return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
}
