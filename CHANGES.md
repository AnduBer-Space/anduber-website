# UX/UI Redesign — Change Log

A running log of each commit in the redesign. Newest first.

## Phase 3b — Silo Trap rewrite + Applied Intersectionality interactive diagram

**Goal:** the second and third sections of the homepage. Visitors learn what's broken (Silo Trap) and how AnduBer thinks (Applied Intersectionality) — both with plain-language subtitles right under the technical headings, and a hands-on diagram that lets the methodology be *felt* instead of read.

### Silo Trap — rewritten

`src/components/sections/SiloTrap.tsx` now leads with:
- **"The Silo Trap"** as the heading (brand IP retained).
- A friendly Fraunces-italic explainer right beneath: *"Why most solutions to big problems fail."*
- Three cards (Fragmented Funding / Restricted Interventions / Band-Aid Solutions) each with a plain-language subtitle of their own:
  - *"Money chases symptoms, not systems."*
  - *"Solutions designed in capitals don't survive villages."*
  - *"When the funding ends, the problem comes back."*
- The closing one-liner *"AnduBer acts as the connective tissue, turning friction into flow."* — front-and-center as a serif italic statement, not boxed inside a card.
- Section is hard-set to dark plum (`data-section-mode="dark"` + `dark` class) so the Silo Trap reads as a "shadowed" problem space sitting between the (also-dark) hero and the (light) methodology.

### Applied Intersectionality — new interactive diagram

`src/components/sections/intersectionality/IntersectionalityDiagram.tsx` is the homepage's "wow" moment. Six domain nodes (Water, Health, Governance, Climate, Gender, Livelihoods) sit on a circle. All fifteen pairwise lines are drawn between them.

When a visitor hovers, focuses, or taps a node:
- The node enlarges and gold-glows.
- All five lines from that node brighten with a teal→gold gradient stroke; every other line fades to ~8% opacity so the visitor's eye follows the connections.
- A panel beside the diagram swaps in the node's plain-language definition plus a one-sentence story for each of the five connections it forms — fifteen pre-written stories total, each grounded in a real-world dynamic ("Clean water cuts disease in half — and frees women from a 4-hour walk that prevents schooling and work.").

Accessibility:
- Every node is a `<button>` (label) plus a focusable `<g>` (SVG) with `role="button"`, `aria-pressed`, and a descriptive `aria-label`.
- The diagram has `role="img"` and a long-form `aria-label` describing what it is.
- Click toggles activation on touch devices; hover handles desktop.

### Section wiring

`src/components/sections/AppliedIntersectionality.tsx` is the homepage section wrapper. It uses `<HybridSection variant="light">` so it renders cream-on-plum in hybrid + light modes, and forced-dark in dark mode. The introductory copy frames the methodology as an extension of Crenshaw's intersectionality from people to systems.

`src/app/page.tsx` now composes: Hero → SiloTrap → AppliedIntersectionality → ThreePillars → Ecosystem → CTA. (`CoreModel` is no longer rendered on the homepage; it remains in use on `/our-approach` until Phase 4 rebuilds that page.)

### Decisions worth flagging

- I kept the existing `<ThreePillars>` and `<Ecosystem>` sections in this commit even though they don't yet have plain-language explainers. Phase 3c will rewrite them. This commit is already large; splitting keeps reviews tight.
- The fifteen connection stories are written into the diagram component rather than pulled from `data/site.ts`. They're voice-y and specific to this visualization; they'd be misleading if reused on, say, `/our-approach` without their context.

### Verified

- `npm run build` — passing
- `npm run lint` — passing

---

## Phase 3a — New homepage hero: constellation as the methodology

**Goal:** the visitor should understand "what AnduBer does" within five seconds. The hero's job is one sentence + two next steps + a visual that *demonstrates* Applied Intersectionality without using the term.

### What's new

- `src/components/sections/hero/ConstellationBackground.tsx` — new SVG component. Twelve labeled nodes (Artists, Scientists, Elders, Engineers, Poets, Policymakers, Youth, Farmers, Healers, Builders, Designers, Storytellers) live in fixed positions across the viewport. Every 4 seconds a deterministic seed picks 3–5 of them and the system draws thin gold lines between every pair, forming a different "intersection" each cycle. Active nodes scale up; inactive nodes idle at low glow.
  - SSR-safe: the seed is deterministic so server and client agree on the first frame.
  - `prefers-reduced-motion`: the cycle is suppressed and a static composition is shown.
  - Pure CSS keyframe for the line fade (`<style jsx>`) keeps the JS work to one `setInterval`.
- `src/components/sections/Hero.tsx` — rewritten from scratch:
  - Headline: **"An Engine for Applied Imagination"** (gold gradient on "Applied Imagination").
  - Plain-language one-liner in the new Fraunces accent serif: *"We solve complex problems by uniting people who don't normally work together, and turning their ideas into systems that last."*
  - Two CTAs: **"See how we work"** (anchors to `#how-we-work`) and **"Partner with us"** (`/contact`).
  - Brand-pill at the top: "Andu (People) + Ber (Good)" with a gold dot — gives newcomers the etymology in one glance.
  - Tagline footer: *"From friction to flow."*
  - Scroll cue at the bottom: italic "How does it work?" + bouncing chevron, links to `#the-silo-trap`. Focusable, keyboard-accessible.
  - Section is hard-wired to the dark plum palette via `data-section-mode="dark"` + `dark` class so it reads consistently in all three theme modes (the brief mandates the hero stays dark).
  - Removed: the orbital "Artists / Scientists / …" label badges. Their job has been absorbed into the constellation labels, which is the point — the disciplines aren't decoration anymore, they're the methodology.

### Anchor IDs added

- `#the-silo-trap` on `<SiloTrap>` — target of the hero's scroll cue.
- `#how-we-work` on `<ThreePillars>` — target of the "See how we work" CTA.

### Decisions worth flagging

- I kept the existing homepage section ordering (Hero → SiloTrap → CoreModel → ThreePillars → Ecosystem → CTA) for this commit. Phase 3b/3c will replace those sections with the new flow described in the brief (Silo Trap with plain subtitles → Applied Intersectionality interactive diagram → Three Pillars connected → Three Engines orbital viz → Featured Projects → Who It's For → Insights teaser → Contact).
- The constellation deliberately does NOT respond to the cursor or pan with the viewport. It's a slow, ambient signal; making it interactive would compete with the headline for attention.

### Verified

- `npm run build` — passing, hero route at 3.05 kB
- `npm run lint` — passing

---

## Phase 2 — Navigation restructure

**Goal:** flatten the IA from 8 nav items down to 7 with cleaner, intent-led labels, and rename the underlying URLs to match. Old URLs continue to work via 308 redirects so existing inbound links don't break.

### Nav items

Before: `Home | About | Our Model | Ecosystem | Insights | Join Us | Governance | Contact` (8)

After: `Home | What We Do | Our Approach | Our Work | About | Insights | Contact` (7)

`Get Involved` (formerly `Join Us`) and `Governance` move to the footer + the upcoming Start Here picker. They remain reachable via `/join` and `/governance`.

### Route map

| Old URL                | New URL                | Status     |
| ---------------------- | ---------------------- | ---------- |
| `/ecosystem`           | `/what-we-do`          | 308 perm.  |
| `/model`               | `/our-approach`        | 308 perm.  |
| `/projects`            | `/our-work`            | 308 perm.  |
| `/projects/:slug`      | `/our-work/:slug`      | 308 perm.  |
| `/about`               | (unchanged)            | —          |
| `/blog`, `/contact`    | (unchanged)            | —          |
| `/join`, `/governance` | (unchanged, dropped from main nav) | — |

### Files

- `next.config.mjs` — added `redirects()` block with permanent 308s for the four moves above.
- `src/app/what-we-do/page.tsx`, `src/app/our-approach/page.tsx`, `src/app/our-work/page.tsx`, `src/app/our-work/[slug]/page.tsx` — new route handlers. Each composes the existing section components (Phase 4 will rebuild the actual page contents).
- `src/data/site.ts` — `navItems` updated with the new structure. Added `secondaryNavItems` for footer / picker.
- `src/app/sitemap.ts` — sitemap rewritten around the new URLs and now includes per-project entries from `data/projects.ts` (currently empty).
- `src/components/layout/Footer.tsx` — quick links updated to point at new URLs. Now wrapped in `<HybridSection variant="dark">` so it stays brand-dark in hybrid + dark modes and only flips to light when the user forces it. Adds a "Three Engines" sub-list deep-linking to `/what-we-do#partners` etc.
- `src/components/layout/Header.tsx` — fixed header now also conditionally carries the `dark` class so its glass background and text resolve correctly in hybrid mode.
- `src/components/sections/Hero.tsx`, `src/components/sections/FeaturedProjects.tsx`, `src/app/projects/[slug]/components/ProjectDetail.tsx` — updated in-page CTAs and breadcrumbs to use the new URLs (the redirect would have caught them but direct links avoid a wasted hop and keep crawlers happy).

### Decisions worth flagging

- I left the old `app/ecosystem/page.tsx`, `app/model/page.tsx`, etc. in place. They're rendered but immediately redirected — Phase 4 (which actually rebuilds those pages) will delete them as part of the cleanup so the diff there stays focused.
- The dynamic `/our-work/[slug]` route mirrors the existing `/projects/[slug]` route. Since `data/projects.ts` is currently an empty array, no slug pages are generated yet. Once Maji Maisha and ComeThru land in Phase 4 they'll appear at the new URLs automatically.

### Verified

- `npm run build` — passing (19 routes)
- `npm run lint` — passing

---

## Phase 1 — Foundation: 3-state theme, tokens, fonts, contrast

**Goal:** lay the design-system groundwork that every subsequent change builds on, without breaking any existing page.

### Theme system: hybrid / dark / light (3 states)

- `src/components/providers/ThemeProvider.tsx` — replaced 2-state toggle with a 3-state preference stored in `localStorage` under key `anduber-theme`.
  - `"hybrid"` (default): brand-driven mix — page chrome (Header / Footer) is dark plum, while specific homepage sections opt into a cream/light palette via `<HybridSection variant="light">`.
  - `"dark"`: forces all sections to dark.
  - `"light"`: forces all sections to light.
  - Exposes `useSectionMode(variant)` that resolves a section's effective mode based on the user's preference. Components use this to wire `<HybridSection>` correctly.
- `src/components/ui/HybridSection.tsx` — new component. Renders `<section data-section-mode="dark|light">` with the correct background, foreground and `.dark` class so legacy Tailwind `dark:` utilities continue to resolve inside.
- `src/app/layout.tsx` — replaced inline theme-bootstrap script with the 3-state version (sets `theme-hybrid`/`theme-dark`/`theme-light` on `<html>` and adds `dark` class only when forced). This eliminates flash-of-wrong-theme.
- `src/components/layout/Header.tsx` — dropped two-button sun/moon and replaced with a single segmented popover toggle. Three options visible (Hybrid / Dark / Light). Closes on outside click or Escape. Uses CSS-variable-driven colors so it adapts in all three modes.

### Plain-language explainer typography

- New Google Font: **Fraunces** (variable font, soft axis). Loaded via `next/font/google` in `layout.tsx` and exposed as `--font-fraunces` and the Tailwind family `font-accent`.
- `src/components/ui/Explainer.tsx` — the friendly one-liner that lives directly under technical headings ("Applied Intersectionality" → "Solving entangled problems by uniting people who don't normally work together"). Italic Fraunces, theme-aware muted color, capped at 60ch.
- `globals.css` — added matching `.explainer` class for ad-hoc usage.

### Light-mode WCAG-compliant accent colors

The brief mandated light-mode contrast: `#B8860B` for gold and `#0F766E` for teal so they pass AA on cream backgrounds.

- `tailwind.config.ts` — `gold-600 = #B8860B`, `teal-600 = #0F766E`. Existing `gold-400`/`teal-400` retained for dark mode.
- `globals.css` — `--accent-gold` and `--accent-teal` resolve to the dark or light variant based on the active mode, and all derived utilities (`.text-gradient-gold`, `.text-gradient-teal`, `.divider-*`, `.btn-outline`, `.link-hover`, etc.) consume them.

### Token-driven utilities

Added theme-aware utility classes so chrome (Header / Footer / etc.) doesn't have to hardcode `dark:` Tailwind variants — important because in hybrid mode `<html>` has no `.dark` class:

- `text-token-primary` / `text-token-secondary` / `text-token-muted`
- `text-token-gold` / `text-token-teal`
- `bg-token-primary` / `bg-token-secondary` / `bg-token-tertiary`
- `border-token-glass`

### Other tweaks

- Deleted stray `nul` file from project root (Windows redirect artifact).
- Added `breathe`, `constellation-pulse`, and `thread-draw` keyframes to `tailwind.config.ts` for upcoming animations.
- Added a global `prefers-reduced-motion` clamp in `globals.css` (already present at component level — now system-wide).
- Added the `.has-cursor-glow` opt-in styling for the desktop cursor glow that lands in Phase 5.

### Decisions worth flagging

- I kept the single `dark` class on `<html>` for force-dark mode rather than rolling a custom Tailwind `dark` selector — this preserves all existing `dark:` utilities in the ~40 components without a sweep. They continue to work in dark mode and inside `<HybridSection variant="dark">`.
- Hybrid mode is the new default for first-time visitors. Sticky preference once set.
- `body` no longer hardcodes `bg-cream-50 dark:bg-plum-900` — it reads `var(--bg-primary)` so it adapts cleanly across all three theme states.

### Verified

- `npm run build` — passing
- `npm run lint` — passing
