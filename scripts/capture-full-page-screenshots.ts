/**

 * Full-page (top-to-bottom) screenshots of live portfolio case-study sites.

 * Run: npm run capture-full-screenshots

 * Mobile: npm run capture-mobile-full-screenshots

 */

import { mkdirSync } from "node:fs";

import { join } from "node:path";

import { chromium, devices, type BrowserContextOptions, type Page } from "playwright";



const isMobile = process.argv.includes("--mobile");

const OUT = join(process.cwd(), "screenshots", isMobile ? "full-page-mobile" : "full-page");

const DESKTOP_VIEWPORT = { width: 1440, height: 900 };

const MOBILE_DEVICE = devices["iPhone 14 Pro"];



const SITES = [

  { id: "stretch-and-chill-home", url: "https://pilates.neostudio.space/" },

  { id: "stretch-and-chill-schedule", url: "https://pilates.neostudio.space/schedule" },

  { id: "aura-hair", url: "https://aura.neostudio.space/" },

  { id: "jewelry-store", url: "https://jelly.neostudio.space/" },

  { id: "petcare-ai", url: "https://petcare.neostudio.space/" },

  { id: "blessed-angel", url: "https://blessedangel.store/" },

];



function withLang(url: string): string {

  const parsed = new URL(url);

  if (!parsed.searchParams.has("lang")) {

    parsed.searchParams.set("lang", "en");

  }

  return parsed.toString();

}



function getViewportHeight(): number {

  if (isMobile) {

    return MOBILE_DEVICE.viewport?.height ?? 844;

  }

  return DESKTOP_VIEWPORT.height;

}



function getContextOptions(): BrowserContextOptions {

  if (isMobile) {

    return { ...MOBILE_DEVICE, locale: "en-US" };

  }



  return {

    viewport: DESKTOP_VIEWPORT,

    deviceScaleFactor: 2,

  };

}



/** Scroll the page and wait for lazy-loaded / in-view images before fullPage capture. */

async function preparePageForCapture(page: Page) {

  const viewportHeight = getViewportHeight();



  await page.evaluate(() => {

    document.querySelectorAll('img[loading="lazy"]').forEach((img) => {

      img.loading = "eager";

    });

  });



  const scrollHeight = await page.evaluate(() =>

    Math.max(document.body.scrollHeight, document.documentElement.scrollHeight),

  );

  const step = Math.floor(viewportHeight * 0.75);



  for (let y = 0; y <= scrollHeight; y += step) {

    await page.evaluate((scrollY) => window.scrollTo(0, scrollY), y);

    await page.waitForTimeout(350);

  }



  await page.evaluate((max) => window.scrollTo(0, max), scrollHeight);

  await page.waitForTimeout(800);

  await page.evaluate(() => window.scrollTo(0, 0));

  await page.waitForTimeout(400);



  await page.evaluate(async () => {

    await Promise.all(

      Array.from(document.images).map((img) =>

        img.complete

          ? Promise.resolve()

          : new Promise((resolve) => {

              img.addEventListener("load", () => resolve(undefined), { once: true });

              img.addEventListener("error", () => resolve(undefined), { once: true });

            }),

      ),

    );

  });



  await page.waitForLoadState("networkidle", { timeout: 30_000 }).catch(() => {});

  await page.waitForTimeout(2000);

}



async function capture() {

  mkdirSync(OUT, { recursive: true });



  const browser = await chromium.launch({ channel: "chrome" });

  const mode = isMobile ? "mobile" : "desktop";



  for (const site of SITES) {

    const context = await browser.newContext(getContextOptions());

    const page = await context.newPage();

    const url = withLang(site.url);



    console.log(`Capturing [${mode}] ${site.id} → ${url}`);



    try {

      await page.goto(url, { waitUntil: "load", timeout: 120_000 });

      await preparePageForCapture(page);



      const path = join(OUT, `${site.id}.png`);

      await page.screenshot({

        path,

        type: "png",

        fullPage: true,

      });



      console.log(`  ✓ ${path}`);

    } catch (err) {

      console.error(`  ✗ ${site.id}:`, err);

    } finally {

      await context.close();

    }

  }



  await browser.close();

  console.log(`\nDone. Saved to ${OUT}`);

}



capture();


