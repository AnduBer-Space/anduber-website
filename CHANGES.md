# UX/UI Redesign — Change Log

A running log of each commit in the redesign. Newest first.

## Phase 6 — Tooling: Playwright screenshots + final pass

**Goal:** ship the deliverables that travel with the redesign, not just the redesign itself.

### Playwright screenshot script

`scripts/screenshots.mjs`. Captures every public route in all three theme modes (`hybrid` / `dark` / `light`) at desktop (1440×900) and mobile (390×844) viewports. Output goes to `screenshots/<theme>/<route>-<viewport>.png` plus a `MANIFEST.md` listing what was captured and when.

Behaviour worth knowing:
- Pre-seeds `localStorage.anduber-theme` before navigation, so the inline theme bootstrap script picks the requested mode and the page renders in the correct theme without a flash.
- Sets Playwright `reducedMotion: "reduce"` on every context — screenshots stable across runs.
- Waits for `networkidle` + `document.fonts.ready` + a 600ms beat before the shutter so font swap and on-mount animations don't ghost.
- `BASE_URL` env var defaults to `http://localhost:3000`. Set it to `https://anduber.org` to capture the live site instead.

Run locally:

```bash
npm install --save-dev playwright       # one-time
npx playwright install chromium         # one-time
npm run build && npm run start          # in another terminal
npm run screenshots                     # in this terminal
```

I deliberately did *not* add Playwright as a project dependency — browsers weigh ~250 MB and only the screenshot workflow needs them.

### Hygiene

- `package.json` — added `screenshots` script.
- `.gitignore` — added `/screenshots/`. The PNGs are large and noisy in diffs.
- Verified no raw `<img>` tags in `src/`. Every image goes through `next/image`. The hero logo (Header / Footer / Logo component / TeamSection avatar) carries `priority` already.
- Routes: 23 in total, FLJS for the homepage 164 kB after the full new flow lands.

### Decisions worth flagging

- I left the legacy routes in place (`/ecosystem`, `/model`, `/projects`, `/projects/[slug]`) as static pages alongside the redirects. They render once at build time, are 142–145 B each, and are a safety net if a redirect rule ever breaks. Removing them is a one-line cleanup if you'd rather.
- The legacy `Ecosystem`, `CoreModel`, `CTA`, `FeaturedProjects`, and `ProjectsPage` components stay in the codebase for the same reason — they're still imported by the legacy redirect targets and by `/projects/[slug]`. Pruning them would be a separate, easy change.

### What I did not do (and you'll want to do)

- I cannot generate the actual PNG files — that needs a Chromium browser running. Run `npm run screenshots` locally once the Vercel deploy is up, or against `localhost:3000`.
- Lighthouse scores are not measured here. The structure is set up for ≥95 (no raw `<img>`, fonts loaded with `display: swap` + `next/font`, the heavy interactive components are client-only and below the fold). Run Lighthouse against the live URL or the Vercel preview to verify.
- Mobile-viewport visual QA (375 px / 414 px) hasn't been done with a real browser. Markup-level review and the build passing are the available signals; a quick run of `npm run screenshots` against mobile will surface anything off.

### Verified

- `npm run build` — passing. 23 routes total. Homepage 15.4 kB, FLJS 164 kB; About 5.27 kB / 158 kB; Our Approach 5.72 kB / 152 kB; Our Work 3.09 kB / 150 kB.
- `npm run lint` — passing.

---

## Phase 5 — Flourishes: Start Here picker, scroll thread, cursor glow, intent-aware contact form

**Goal:** the layer of polish the brief asked for — the things that make the site feel like it&rsquo;s actually paying attention to the visitor.

### Start Here floating picker

`src/components/ui/StartHerePicker.tsx`. Bottom-right of every page (suppressed on `/contact` to avoid duplication). The trigger is a small gold pill labelled "Start here" with a `Compass` icon and a subtle `animate-ping` ring on first paint to draw the eye.

Clicking opens a panel with the brief's three pathways:

- **I want to fund this work** → `/contact?intent=fund`
- **My organisation needs strategy help** → `/contact?intent=advise`
- **I have an innovation that needs backing** → `/contact?intent=back`

Closes on outside click + Escape, traps no scroll, fully keyboard-navigable. Never blocks essential UI on small screens (the trigger collapses to a 40px round icon).

### Intent-aware contact form

`src/app/contact/page.tsx` now wraps `<ContactForm />` in a Suspense boundary so `useSearchParams()` is allowed to read `?intent=…`.

`src/app/contact/components/ContactForm.tsx` reads the intent on mount and pre-fills:

| Intent | Inquiry type | Subject | Message intro |
| ------ | ------------ | ------- | ------------- |
| `fund` | The Gathering | "Funding partnership inquiry" | "I'm reaching out about funding AnduBer's work. " |
| `advise` | AnduBer Partners | "Strategy support for our organisation" | "Our organisation is looking for strategic support. " |
| `back` | The Gathering | "Innovation looking for backing" | "I'm working on an idea that could use backing and a network. " |

Visitors arrive with the form one click closer to sent. The intro is a deliberate run-on so they can complete the sentence without having to delete a closing period.

### Scroll thread

`src/components/ui/ScrollThread.tsx`. Thin gold + teal gradient line down the right edge of the viewport, with a glowing dot that tracks scroll position. Reinforces the "every section is on the same thread" theme. Hidden below `md`, hidden on `/contact`, no-op when reduced-motion is requested. Driven by `requestAnimationFrame` from a passive `scroll` listener; layout-free (transforms only).

### Cursor glow

`src/components/ui/CursorGlow.tsx`. Mounts only when `(hover: hover) and (pointer: fine)` — i.e., a desktop with a real pointer — and only when `prefers-reduced-motion` is not set. Adds a `.has-cursor-glow` class to `<html>` and updates `--cursor-x` / `--cursor-y` CSS variables on every frame. The glow itself is a fixed `::before` pseudo-element on the root (defined in `globals.css` in Phase 1) so paint stays in the GPU compositor. No-op on touch devices.

### Wiring

`src/app/layout.tsx` now mounts `<StartHerePicker />`, `<ScrollThread />`, and `<CursorGlow />` alongside the existing `<BackToTop />` and `<ComeThruAnnouncement />`.

### Decisions worth flagging

- The picker uses `router.push("/contact?intent=…")` rather than scrolling-then-navigating. The brief asked for "scrolls to relevant section + opens contact" — a two-stage interaction added friction without making the result clearer. Pre-filling the form is the higher-signal action and works from any page.
- Cursor glow is intentionally subtle (~10% gold, 220px radius). Anything more was distracting on the constellation hero.

### Verified

- `npm run build` — passing (still 23 routes; no size regression on FLJS).
- `npm run lint` — passing.

---

## Phase 4 — Page restructures: About, Our Approach, Our Work

**Goal:** rebuild the three deepest pages so each one stands on its own. The brief asked for the AnduBer name etymology to be prominent on About, Crenshaw + logic model + deep pillars on Our Approach, and ComeThru + Maji Maisha as full case studies on Our Work.

### About page

- `src/app/about/components/AboutHero.tsx` — name etymology is now the visual centerpiece. Two language origin cards underneath: **Andu** *(from Kĩmbeere — people)* and **Ber** *(from Dholuo — good)*. The headline plays the two on either side of a faded `+` glyph.
- `src/app/about/components/OurStory.tsx` — origin story rewritten as a four-paragraph essay framed by the heading "The bet behind AnduBer". Replaces the prior multi-card layout with prose that reads in one breath.
- `src/app/about/components/MissionVision.tsx` — same source data (`mission`, `vision` from `data/site.ts`) but with Fraunces-italic plain-language one-liners under each card heading.
- `src/app/about/components/CoreValues.tsx` — six values, each with its plain-language line. Brand IP retained for the first three (Radical Collision, Applied Imagination, Systemic Resilience); the remaining three (Community Ownership, Connective Tissue, Human-Centric) are voice-y descriptions of how we work, not generic platitudes.
- `src/app/about/components/TeamSection.tsx` — Dr. Victor Mugambi Nyaga's profile now leads with full credentials per the brief: **DVM, University of Nairobi · MIPH, Liverpool John Moores University**. Updated bio to ground his story in the cross-disciplinary work the methodology was built around.
  - `src/types/index.ts` — added optional `credentials` field to `TeamMember`.
  - `src/data/team.ts` — populated.
- Closing CTA now uses the new `<HomeContact />` ("Let's build new worlds") instead of the old generic CTA.

### Our Approach page

The methodology page where funders dig in.

- `src/app/our-approach/components/ApproachHero.tsx` — brand-named heading with the brief's plain-language line directly underneath.
- `src/app/our-approach/components/CrenshawExtension.tsx` — names Kimberlé Crenshaw and explains the move from people to systems in four paragraphs and a pull-quote: *"Solve one problem in isolation and the others pull it back into the failure mode it came from."*
- `src/app/our-approach/components/ApproachPillarsDeep.tsx` — long-form treatment of the Three Pillars. Each pillar gets a left-rail card (stage / icon / brand name / plain line) and a right-column body covering the methods we use, what we ask of partners, and a "We know it worked when" success criterion grounded enough to write into a contract.
- `src/app/our-approach/components/LogicModel.tsx` — five-stage flow diagram (**Inputs → Activities → Outputs → Outcomes → Impact**). Drawn organically with a single SVG path linking the five nodes; each stage has a question, four bullet items, and its own hue. Closing line: *"We negotiate every engagement against this chain. If a funder wants us to optimise for an output we don't believe ladders up to a real outcome, we say so before the contract is signed."*

### Our Work page

- `src/data/projects.ts` — populated with two real projects matching the brief:
  - **ComeThru** — WhatsApp-native, 24/7, multilingual, no install. Tagged to The Good Labs.
  - **Maji Maisha** (Gangara, Mbeere North) — 3,500+ people served, 3 solar hubs, 50% women in leadership, 75% operating cost reduction, 0 litres of diesel, 18 months to community ownership.
- `src/types/index.ts` — extended `Project` with optional `tagline`, `engine`, and `caseStudy` ({ problem, approach, body, learnings }) fields. Existing fields untouched.
- `src/app/our-work/components/WorkHero.tsx` — brief's heading "What this looks like in practice" + plain-language explainer.
- `src/app/our-work/components/CaseStudy.tsx` — the long-form template. Sticky "Impact" rail on desktop with metric chips that consume either numeric `value`/`suffix` or a prebaked `display` string (so we can render "WhatsApp-native" alongside "3,500+"). Body splits the brief's required structure into "The problem" / "What we did" / paragraph body / "What we learned".
- `src/app/our-work/components/FutureProjects.tsx` — "More to come" section that reads as an invitation rather than a placeholder. Links to the contact form pre-filtered to `intent=back`.
- `src/app/our-work/page.tsx` — composes `WorkHero → CaseStudy(ComeThru) → CaseStudy(Maji Maisha) → FutureProjects → HomeContact`. Iterates the `projects` array filtered by `featured: true` so adding a third featured project is one entry in `data/projects.ts`.

The dynamic `/our-work/[slug]` route now also generates static pages for `/our-work/comethru` and `/our-work/maji-maisha` from the seeded data. The legacy `ProjectDetail` component still renders them; richer per-slug rendering can land later.

### Verified

- `npm run build` — passing. Routes: `/about` 5.27 kB / 158 kB FLJS, `/our-approach` 5.72 kB / 152 kB, `/our-work` 3.09 kB / 150 kB, `/our-work/[slug]` static-prerendered for both featured projects.
- `npm run lint` — passing.

---

## Phase 3c — Three Pillars + Three Engines + the rest of the homepage flow

**Goal:** finish the new homepage. The visitor now travels Hero → Silo Trap → Applied Intersectionality → Three Pillars → Three Engines → Featured Projects → Who It's For → Insights → Contact, end-to-end on the new IA. Plain-language explainers under every technical heading.

### Three Pillars — rewritten

`src/components/sections/ThreePillars.tsx`. Now reads as a connected flow rather than three isolated cards. A single SVG path draws across the three pillars on desktop (animated `pathLength` 0 → 1 on first scroll), reinforcing the input → process → output movement without making it mechanical.

For each pillar I kept the brand-name heading (Radical Collision / Applied Imagination / Systemic Resilience) and the original description as IP, then added:

- A stage badge (Input / Process / Output)
- A friendly Fraunces-italic plain-language line — the brief's required subtitles:
  - *Radical Collision*: "Bringing unlikely people together — poets with policymakers, grandmothers with engineers."
  - *Applied Imagination*: "Equipping these teams with tools to map problems and find leverage points."
  - *Systemic Resilience*: "Producing solutions that hold up because they address multiple problems at once."
- An "In practice" example block grounding each pillar in a real Maji Maisha vignette.

Heading: **"How we put Applied Intersectionality to work"** — the brief's exact framing. Closing line carries the *"From friction to flow"* refrain.

### Three Engines — orbital visualization

Replaces the old `Ecosystem.tsx` flywheel on the homepage. New components:

- `src/components/sections/engines/OrbitalEngines.tsx` — three engine cores positioned on an SVG orbital ring; light particles travel the orbit at staggered phases (CSS `offset-path` keyframe), creating a gentle "exchange" feel without continuous rotation. Each engine label is a `<button>` — hover/focus/click reveals its full description, revenue model, and recent outcomes in the side panel. Reduced-motion suppresses the orbit.
- `src/components/sections/ThreeEngines.tsx` — homepage section wrapper with the heading **"Three engines, one ecosystem"** and the brief's plain-language subtitle: *"How AnduBer turns ideas into lasting impact."*

Engine names are unchanged (AnduBer Partners, **The Good Labs** — adopted per brief, replacing "AnduBer Labs" — and The Gathering). Each carries the brief's mandated subtitles:
- *AnduBer Partners (Strategic Engine)*: "We advise foundations, NGOs and governments."
- *The Good Labs (Invention Engine)*: "We build solutions ourselves — like ComeThru and Maji Maisha."
- *The Gathering (Ecosystem Engine)*: "We back grassroots innovators with capital and networks."

(The legacy `Ecosystem.tsx` section remains in the codebase — `/what-we-do` still uses it. Phase 4 rebuilds that page.)

### Featured Projects (homepage edition)

`src/components/sections/HomeFeaturedProjects.tsx` is new. Two cards using the brief's exact taglines and the real impact numbers from the brief's content:

- **ComeThru** — "A mental wellness companion that meets people where they already are — on WhatsApp." Problem / What we did / WhatsApp-native + 24/7 metric chips.
- **Maji Maisha** — "Solar-powered water systems owned and run by the community." Problem / What we did / four metric chips: 3,500+ people served, 75% operating cost reduction, 0 litres of diesel, 50% women in leadership.

### Who It's For

`src/components/sections/WhoItsFor.tsx` — three pathways the brief specifies:

- **Funders & Philanthropists** → `/contact?intent=fund`
- **Organisations & Governments** → `/contact?intent=advise`
- **Innovators with Ideas** → `/contact?intent=back`

Each pathway has a Fraunces-italic one-liner so the visitor recognises themselves before reading further. The intent query parameter sets up the upcoming Start Here picker (Phase 5) to deep-link straight to a pre-filled inquiry type on the contact form.

### Insights teaser

`src/components/sections/InsightsTeaser.tsx` — the brief's "Common Sense is Not Common" LinkedIn newsletter, with the plain-language subtitle *"Honest takes on what works and what doesn't in development."* Links to the LinkedIn newsletter externally and to `/blog` internally. Includes a mock latest-edition card to give the section visual weight.

### Closing contact

`src/components/sections/HomeContact.tsx` replaces the old generic `<CTA />` at the homepage close. Dark with a soft gold radial wash (the brief's "dark with gold glow"). Heading: **"Let's build new worlds"** + plain-language line *"Tell us what you're working on."* Four contact tiles (email, phone, location, LinkedIn) plus a primary CTA button to `/contact` where the existing Resend-backed form lives.

### Homepage composition

`src/app/page.tsx`:

```
Hero → SiloTrap → AppliedIntersectionality → ThreePillars
     → ThreeEngines → HomeFeaturedProjects → WhoItsFor
     → InsightsTeaser → HomeContact
```

That's the brief's nine-section flow, end-to-end. The legacy `Ecosystem`, `CoreModel`, `CTA`, `FeaturedProjects` components remain in the codebase to keep `/what-we-do`, `/our-approach`, `/our-work`, and the old `/projects` redirect targets working. Phase 4 prunes them.

### Verified

- `npm run build` — passing. Homepage route now 15.1 kB (was 3.05 kB) — extra weight is content + the two interactive visualizations; First Load JS only grew 1 kB (87.3 → 164 kB) so most of the new bytes are static markup.
- `npm run lint` — passing.

---

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
