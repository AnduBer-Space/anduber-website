# UX/UI Redesign — Change Log

A running log of each commit in the redesign. Newest first.

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
