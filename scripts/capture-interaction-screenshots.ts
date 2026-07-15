/**
 * Viewport screenshots of modals, toasts, and button interactions on live case-study sites.
 * Run: npm run capture-interaction-screenshots
 */
import { mkdirSync } from "node:fs";
import { join } from "node:path";
import { chromium, type Page } from "playwright";

const OUT = join(process.cwd(), "screenshots", "interactions");
const VIEWPORT = { width: 1440, height: 900 };
const ONLY = process.argv.find((arg) => arg.startsWith("--only="))?.slice(7)?.split(",") ?? null;

type Interaction = {
  file: string;
  site: "pilates" | "aura" | "jewelry" | "petcare" | "blessed";
  url: string;
  label: string;
  run: (page: Page) => Promise<void>;
};

function withLang(url: string): string {
  const parsed = new URL(url);
  if (!parsed.searchParams.has("lang")) {
    parsed.searchParams.set("lang", "en");
  }
  return parsed.toString();
}

async function waitForUi(page: Page, ms = 2000) {
  await page.waitForTimeout(ms);
}

/** Scroll the page to trigger lazy-loaded images, then restore scroll position. */
async function prepareLazyImages(page: Page) {
  const scrollY = await page.evaluate(() => window.scrollY);

  await page.evaluate(() => {
    document.querySelectorAll('img[loading="lazy"]').forEach((img) => {
      img.loading = "eager";
    });
  });

  const scrollHeight = await page.evaluate(() =>
    Math.max(document.body.scrollHeight, document.documentElement.scrollHeight),
  );
  const step = Math.floor(VIEWPORT.height * 0.75);

  for (let y = 0; y <= scrollHeight; y += step) {
    await page.evaluate((pos) => window.scrollTo(0, pos), y);
    await page.waitForTimeout(300);
  }

  await page.evaluate((max) => window.scrollTo(0, max), scrollHeight);
  await page.waitForTimeout(500);
  await page.evaluate((y) => window.scrollTo(0, y), scrollY);
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

  await page.waitForTimeout(800);
}

async function clickButton(page: Page, name: string | RegExp, options?: { first?: boolean; force?: boolean }) {
  const locator = options?.first
    ? page.getByRole("button", { name }).first()
    : page.getByRole("button", { name });
  await locator.click({ timeout: 15_000, force: options?.force });
}

async function waitForSchedulePlanner(page: Page) {
  await page.getByRole("heading", { name: /weekly schedule/i }).waitFor({ timeout: 20_000 });
  await page.getByText("This week").waitFor({ timeout: 20_000 });
  await page.locator("button").filter({ hasText: "+" }).first().waitFor({ timeout: 20_000 });
  await waitForUi(page, 1500);
}

async function scrollToSection(page: Page, id: string) {
  await page.evaluate((sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "instant", block: "start" });
  }, id);
  await waitForUi(page, 1200);
}

const INTERACTIONS: Interaction[] = [
  {
    file: "stretch-and-chill-home-book-a-class.png",
    site: "pilates",
    url: "https://pilates.neostudio.space/",
    label: "Book a Class → schedule hint",
    run: async (page) => {
      await clickButton(page, "Book a Class", { first: true });
      await page.waitForURL(/\/schedule/, { timeout: 20_000 });
      await waitForSchedulePlanner(page);
    },
  },
  {
    file: "stretch-and-chill-home-choose-drop-in.png",
    site: "pilates",
    url: "https://pilates.neostudio.space/",
    label: "Choose Drop-in → confirmation toast",
    run: async (page) => {
      await page.locator("#pricing").scrollIntoViewIfNeeded();
      await prepareLazyImages(page);
      await clickButton(page, /choose drop-in/i);
    },
  },
  {
    file: "stretch-and-chill-home-book-this-class.png",
    site: "pilates",
    url: "https://pilates.neostudio.space/",
    label: "Book This Class → class selected toast",
    run: async (page) => {
      await page.locator("#classes, [id*='classes']").first().scrollIntoViewIfNeeded().catch(() => {});
      await prepareLazyImages(page);
      await clickButton(page, "Book This Class", { first: true });
    },
  },
  {
    file: "stretch-and-chill-schedule-add-class.png",
    site: "pilates",
    url: "https://pilates.neostudio.space/schedule",
    label: "Schedule + add class to My Practice",
    run: async (page) => {
      await waitForSchedulePlanner(page);
      await page.locator("button").filter({ hasText: "+" }).first().click();
    },
  },
  {
    file: "aura-hair-modal-menu.png",
    site: "aura",
    url: "https://aura.neostudio.space/",
    label: "Services menu modal",
    run: async (page) => {
      await page.locator('a[href="#modal-menu"]').first().click();
    },
  },
  {
    file: "aura-hair-modal-team.png",
    site: "aura",
    url: "https://aura.neostudio.space/",
    label: "Team modal",
    run: async (page) => {
      await page.locator('a[href="#modal-team"]').first().click();
    },
  },
  {
    file: "aura-hair-modal-visit.png",
    site: "aura",
    url: "https://aura.neostudio.space/",
    label: "Visit modal",
    run: async (page) => {
      await page.locator('a[href="#modal-visit"]').first().click();
    },
  },
  {
    file: "aura-hair-modal-about.png",
    site: "aura",
    url: "https://aura.neostudio.space/",
    label: "About modal",
    run: async (page) => {
      await page.locator('a[href="#modal-about"]').first().click();
    },
  },
  {
    file: "aura-hair-book-stylist.png",
    site: "aura",
    url: "https://aura.neostudio.space/",
    label: "Book with stylist",
    run: async (page) => {
      await clickButton(page, "Book with Yuki Tanaka");
    },
  },
  {
    file: "aura-hair-hair-guide.png",
    site: "aura",
    url: "https://aura.neostudio.space/",
    label: "Hair care guide result",
    run: async (page) => {
      await page.locator("#guide, [id*='guide'], section").filter({ hasText: "Hair Care Guide" }).first().scrollIntoViewIfNeeded().catch(() => {});
      await clickButton(page, "Dry Ends");
    },
  },
  {
    file: "jewelry-store-quick-view.png",
    site: "jewelry",
    url: "https://jelly.neostudio.space/",
    label: "Product quick view",
    run: async (page) => {
      await clickButton(page, "Quick View", { first: true });
    },
  },
  {
    file: "jewelry-store-add-to-cart.png",
    site: "jewelry",
    url: "https://jelly.neostudio.space/",
    label: "Add to cart toast",
    run: async (page) => {
      await clickButton(page, "Add to Cart", { first: true });
    },
  },
  {
    file: "petcare-ai-vet-chat.png",
    site: "petcare",
    url: "https://petcare.neostudio.space/",
    label: "Vet-AI chat response",
    run: async (page) => {
      await scrollToSection(page, "health");
      await clickButton(page, "Pet is lethargic");
    },
  },
  {
    file: "petcare-ai-faq-open.png",
    site: "petcare",
    url: "https://petcare.neostudio.space/",
    label: "FAQ accordion open",
    run: async (page) => {
      await scrollToSection(page, "health");
      await clickButton(page, "Do I need an appointment for the first visit?");
    },
  },
  {
    file: "petcare-ai-booking-section.png",
    site: "petcare",
    url: "https://petcare.neostudio.space/",
    label: "Booking section",
    run: async (page) => {
      await scrollToSection(page, "booking");
      await page.getByRole("heading", { name: /^Booking$/i }).waitFor({ timeout: 15_000 });
      await page.locator("text=Online Booking").first().scrollIntoViewIfNeeded();
    },
  },
  {
    file: "blessed-angel-pay-crypto.png",
    site: "blessed",
    url: "https://blessedangel.store/",
    label: "Pay with Crypto modal",
    run: async (page) => {
      await clickButton(page, "Pay with Crypto");
    },
  },
];

async function capture() {
  mkdirSync(OUT, { recursive: true });

  const browser = await chromium.launch({ channel: "chrome" });
  const targets = ONLY
    ? INTERACTIONS.filter((item) => ONLY.includes(item.site))
    : INTERACTIONS;

  for (const interaction of targets) {
    const context = await browser.newContext({
      viewport: VIEWPORT,
      deviceScaleFactor: 2,
    });
    const page = await context.newPage();
    const url = withLang(interaction.url);
    const path = join(OUT, interaction.file);

    console.log(`Capturing ${interaction.file} → ${interaction.label}`);

    try {
      await page.goto(url, { waitUntil: "domcontentloaded", timeout: 120_000 });
      await waitForUi(page, 2000);
      await prepareLazyImages(page);
      await interaction.run(page);
      await waitForUi(page, 1500);
      await page.screenshot({ path, type: "png" });
      console.log(`  ✓ ${path}`);
    } catch (err) {
      console.error(`  ✗ ${interaction.file}:`, err);
    } finally {
      await context.close();
    }
  }

  await browser.close();
  console.log(`\nDone. Saved to ${OUT}`);
}

capture();
