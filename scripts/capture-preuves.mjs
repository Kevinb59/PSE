/**
 * Capture haute qualité des sites clients (slide Réalisations).
 * Usage : node scripts/capture-preuves.mjs
 */
import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";
import path from "node:path";

const OUTPUT_DIR = path.join(process.cwd(), "public", "media", "preuves");

/** Viewport desktop large + scale 2 = captures nettes (~3840×2400 px) */
const VIEWPORT = { width: 1920, height: 1200 };
const DEVICE_SCALE = 2;

const SITES = [
  { slug: "navisphere", href: "https://navi-sphere.vercel.app/", settleMs: 3500 },
  { slug: "damien-verhee", href: "https://www.damienverhee.fr/", settleMs: 3500 },
  { slug: "smart-z", href: "https://www.smart-z.fr/", settleMs: 3000 },
  { slug: "renmob", href: "https://www.renmob.fr/", settleMs: 4000 },
  { slug: "sophied", href: "https://sophied-nailartist.fr/", settleMs: 4000 },
  { slug: "jinja-music", href: "https://www.jinja-music-center.com/", settleMs: 4500 },
  { slug: "calypso-bay", href: "https://www.calypso-bay.com/", settleMs: 4500 },
  { slug: "pbdr", href: "https://kevinb59.github.io/PBDR-carroserie/#accueil", settleMs: 3500 },
  { slug: "maoya-makeup", href: "https://formation.maoyamakeup.fr/", settleMs: 4000 },
];

await mkdir(OUTPUT_DIR, { recursive: true });

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({
  viewport: VIEWPORT,
  deviceScaleFactor: DEVICE_SCALE,
  locale: "fr-FR",
  colorScheme: "dark",
});
const page = await context.newPage();

// ── Attendre le rendu (fonts, images above-the-fold) avant capture ──
async function waitForRender(settleMs) {
  await page.waitForLoadState("domcontentloaded", { timeout: 45_000 }).catch(() => {});
  await page.waitForLoadState("networkidle", { timeout: 20_000 }).catch(() => {});
  await page.evaluate(async () => {
    if (document.fonts?.ready) await document.fonts.ready;
    window.scrollTo(0, 0);
  });
  await page.waitForTimeout(settleMs);
}

for (const site of SITES) {
  const outPath = path.join(OUTPUT_DIR, `${site.slug}.png`);
  process.stdout.write(`Capture ${site.slug}… `);

  try {
    await page.goto(site.href, { waitUntil: "domcontentloaded", timeout: 60_000 });
    await waitForRender(site.settleMs);
    await page.screenshot({
      path: outPath,
      type: "png",
      fullPage: false,
      animations: "disabled",
      caret: "hide",
    });
    console.log("ok");
  } catch (error) {
    console.log("échec");
    console.error(`  ${site.slug}:`, error instanceof Error ? error.message : error);
  }
}

await browser.close();
console.log("Terminé.");
