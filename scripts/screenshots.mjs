#!/usr/bin/env node
/**
 * Capture every page of the site in all three theme modes (hybrid / dark /
 * light) for review.
 *
 * Run locally with a built-and-served site (or `npm run dev`) on the URL
 * the BASE_URL env var points to:
 *
 *   # one-time setup (Playwright is intentionally not a project dep — it
 *   # weighs ~250MB once browsers are installed):
 *   npm install --save-dev playwright
 *   npx playwright install chromium
 *
 *   # in another terminal: serve the site
 *   npm run build && npm run start    # or `npm run dev`
 *
 *   # in this terminal:
 *   npm run screenshots
 *
 * Outputs go to ./screenshots/<theme>/<route>.png. Captures full-page
 * screenshots at desktop (1440×900) and mobile (390×844) viewports.
 *
 * Set BASE_URL=https://anduber.org to capture the live site instead.
 * The /screenshots/ directory is gitignored; ship the PNGs separately if
 * you want a record.
 */

import { mkdir, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const OUT_DIR = resolve(ROOT, "screenshots");

const BASE_URL = process.env.BASE_URL ?? "http://localhost:3000";

const ROUTES = [
  { name: "home", path: "/" },
  { name: "what-we-do", path: "/what-we-do" },
  { name: "our-approach", path: "/our-approach" },
  { name: "our-work", path: "/our-work" },
  { name: "our-work-comethru", path: "/our-work/comethru" },
  { name: "our-work-maji-maisha", path: "/our-work/maji-maisha" },
  { name: "about", path: "/about" },
  { name: "blog", path: "/blog" },
  { name: "contact", path: "/contact" },
  { name: "join", path: "/join" },
  { name: "governance", path: "/governance" },
];

const THEMES = ["hybrid", "dark", "light"];
const VIEWPORTS = [
  { name: "desktop", width: 1440, height: 900 },
  { name: "mobile", width: 390, height: 844 },
];

let chromium;
try {
  ({ chromium } = await import("playwright"));
} catch {
  console.error(
    "❌ Playwright not installed.\n" +
      "   Run:\n" +
      "     npm install --save-dev playwright\n" +
      "     npx playwright install chromium\n"
  );
  process.exit(1);
}

async function ensureDir(path) {
  if (!existsSync(path)) {
    await mkdir(path, { recursive: true });
  }
}

/** Wait for fonts + key images so screenshots aren't flickery. */
async function settle(page) {
  await page.waitForLoadState("networkidle", { timeout: 15000 }).catch(() => {});
  await page.evaluate(() => document.fonts?.ready ?? Promise.resolve());
  // Give animation-on-mount components a beat.
  await page.waitForTimeout(600);
}

async function captureRoute(browser, route, theme, viewport) {
  const context = await browser.newContext({
    viewport: { width: viewport.width, height: viewport.height },
    deviceScaleFactor: 1,
    reducedMotion: "reduce", // stable screenshots
  });

  // Pre-seed the theme preference so the inline bootstrap script applies it
  // before React hydrates — exactly as a returning visitor would experience.
  await context.addInitScript((t) => {
    try {
      localStorage.setItem("anduber-theme", t);
    } catch {}
  }, theme);

  const page = await context.newPage();
  const url = `${BASE_URL}${route.path}`;

  try {
    await page.goto(url, { waitUntil: "domcontentloaded", timeout: 30000 });
    await settle(page);

    const file = resolve(
      OUT_DIR,
      theme,
      `${route.name}-${viewport.name}.png`
    );
    await ensureDir(dirname(file));
    await page.screenshot({ path: file, fullPage: true });
    console.log(`✓ ${theme}/${route.name}-${viewport.name}.png`);
  } catch (err) {
    console.error(`✗ ${url} (${theme}/${viewport.name}): ${err.message}`);
  } finally {
    await context.close();
  }
}

async function main() {
  await ensureDir(OUT_DIR);

  const browser = await chromium.launch();
  console.log(`Capturing ${ROUTES.length} routes × ${THEMES.length} themes × ${VIEWPORTS.length} viewports = ${ROUTES.length * THEMES.length * VIEWPORTS.length} screenshots`);
  console.log(`Source: ${BASE_URL}\nOutput: ${OUT_DIR}\n`);

  for (const theme of THEMES) {
    for (const route of ROUTES) {
      for (const viewport of VIEWPORTS) {
        await captureRoute(browser, route, theme, viewport);
      }
    }
  }

  await browser.close();

  // Tiny manifest for easy reference.
  await writeFile(
    resolve(OUT_DIR, "MANIFEST.md"),
    [
      "# Screenshots",
      "",
      `Source: ${BASE_URL}`,
      `Captured: ${new Date().toISOString()}`,
      "",
      "## Layout",
      "",
      "Each theme directory contains both desktop (1440×900) and mobile (390×844) full-page captures of every route.",
      "",
      "## Routes",
      "",
      ROUTES.map((r) => `- ${r.name} → \`${r.path}\``).join("\n"),
    ].join("\n")
  );

  console.log("\nDone.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
