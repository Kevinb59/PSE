/**
 * Capture les aperçus viewport des sites clients (slide Preuves).
 * Usage : node scripts/capture-preuves.mjs
 */
import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";
import path from "node:path";

const OUTPUT_DIR = path.join(process.cwd(), "public", "media", "preuves");

const SITES = [
  { slug: "navisphere", href: "https://navi-sphere.vercel.app/" },
  { slug: "damien-verhee", href: "https://www.damienverhee.fr/" },
  { slug: "smart-z", href: "https://www.smart-z.fr/" },
  { slug: "renmob", href: "https://www.renmob.fr/" },
  { slug: "sophied", href: "https://sophied-nailartist.fr/" },
  { slug: "jinja-music", href: "https://www.jinja-music-center.com/" },
  { slug: "calypso-bay", href: "https://www.calypso-bay.com/" },
  { slug: "pbdr", href: "https://kevinb59.github.io/PBDR-carroserie/#accueil" },
  { slug: "maoya-makeup", href: "https://formation.maoyamakeup.fr/" },
];

await mkdir(OUTPUT_DIR, { recursive: true });

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  deviceScaleFactor: 1,
});
const page = await context.newPage();

for (const site of SITES) {
  const outPath = path.join(OUTPUT_DIR, `${site.slug}.jpg`);
  process.stdout.write(`Capture ${site.slug}… `);

  try {
    await page.goto(site.href, { waitUntil: "domcontentloaded", timeout: 45_000 });
    await page.waitForTimeout(2500);
    await page.screenshot({ path: outPath, type: "jpeg", quality: 82, fullPage: false });
    console.log("ok");
  } catch (error) {
    console.log("échec");
    console.error(`  ${site.slug}:`, error instanceof Error ? error.message : error);
  }
}

await browser.close();
console.log("Terminé.");
