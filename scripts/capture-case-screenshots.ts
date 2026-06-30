/**
 * Captures real desktop screenshots of live case-study sites.
 * Run: npx tsx scripts/capture-case-screenshots.ts
 */
import { mkdirSync } from "node:fs";
import { join } from "node:path";
import { chromium } from "playwright";

const OUT = join(process.cwd(), "public", "fiverr-screenshots");
const VIEWPORT = { width: 1280, height: 800 };

const SITES = [
  { id: "aura-hair", url: "https://aura.neostudio.space/", colorScheme: "dark" as const },
  { id: "aura-hair-light", url: "https://aura.neostudio.space/?lang=en&theme=light", colorScheme: "light" as const },
  { id: "stretch-and-chill", url: "https://pilates.neostudio.space/", colorScheme: "light" as const },
  { id: "petcare-ai", url: "https://petcare.neostudio.space/", colorScheme: "dark" as const },
  { id: "jewelry-store", url: "https://jelly.neostudio.space/", colorScheme: "dark" as const },
  { id: "blessed-angel", url: "https://blessedangel.store", colorScheme: "dark" as const },
];

function buildUrl(base: string): string {
  if (base.includes("lang=")) return base;
  return `${base}${base.includes("?") ? "&" : "?"}lang=en`;
}
async function capture() {
  mkdirSync(OUT, { recursive: true });

  const browser = await chromium.launch();

  for (const site of SITES) {
    const context = await browser.newContext({
      viewport: VIEWPORT,
      deviceScaleFactor: 2,
      colorScheme: site.colorScheme,
    });
    const page = await context.newPage();
    const url = buildUrl(site.url);

    console.log(`Capturing ${site.id} → ${url} (${site.colorScheme})`);

    try {
      await page.goto(url, { waitUntil: "domcontentloaded", timeout: 90_000 });
      await page.waitForTimeout(3500);

      await page.screenshot({
        path: join(OUT, `${site.id}.png`),
        type: "png",
      });

      console.log(`  ✓ ${site.id}.png`);
    } catch (err) {
      console.error(`  ✗ ${site.id}:`, err);
    } finally {
      await context.close();
    }
  }

  await browser.close();
  console.log(`\nSaved to ${OUT}`);
}

capture();
