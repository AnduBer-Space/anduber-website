"use client";

import { useState, useMemo } from "react";
import { cn } from "@/lib/utils";

/**
 * Interactive node-and-line diagram for Applied Intersectionality.
 * Six domain nodes around a circle (Water, Health, Governance, Climate,
 * Gender, Livelihoods); every pair is wired together. Hovering / focusing a
 * node reveals how it connects to each of the others in plain language.
 *
 * This is the homepage's "wow" moment — visitors don't read a definition,
 * they feel the methodology by playing with it.
 */

type Domain = {
  id: string;
  label: string;
  /** angle in degrees on the diagram's circle, 0° = right, going clockwise */
  angle: number;
  /** plain-language one-liner */
  short: string;
};

const DOMAINS: Domain[] = [
  { id: "water", label: "Water", angle: -90, short: "Access to clean water — wells, rivers, rain capture." },
  { id: "health", label: "Health", angle: -30, short: "Bodies and minds — disease, nutrition, mental wellness." },
  { id: "governance", label: "Governance", angle: 30, short: "Who decides — councils, ministries, community boards." },
  { id: "climate", label: "Climate", angle: 90, short: "The land underneath — rainfall, soil, seasons." },
  { id: "gender", label: "Gender", angle: 150, short: "Power between people — voice, labour, agency." },
  { id: "livelihoods", label: "Livelihoods", angle: 210, short: "How people earn — farming, trade, work." },
];

/**
 * Plain-language story for each unordered pair. The key is the alphabetically
 * sorted concatenation: e.g. "climate-water" not "water-climate".
 */
const PAIRS: Record<string, string> = {
  "health-water":
    "Clean water cuts disease in half — and frees women from a 4-hour walk that prevents schooling and work.",
  "governance-water":
    "Who owns the well decides who drinks. Without local boards, donor pumps fail in two years.",
  "climate-water":
    "When rains shift, the well runs dry. Climate plans that ignore water plan for failure.",
  "gender-water":
    "Women carry the jerricans. Water plans that ignore gender pile burdens on the same shoulders.",
  "livelihoods-water":
    "No water means no irrigation, no livestock, no business. Water is the substrate of every income.",
  "governance-health":
    "Clinics need budgets. When local government can't allocate, the nurse leaves and the clinic closes.",
  "climate-health":
    "Drought breeds malnutrition; floods carry cholera. Health and climate share a single ledger.",
  "gender-health":
    "Maternal mortality, mental load, reproductive care — health systems blind to gender misdiagnose half the population.",
  "health-livelihoods":
    "A single illness empties a household's savings. Without livelihoods, recovery doesn't happen.",
  "climate-governance":
    "Adaptation needs decisions only governments can make. Without them, climate plans stall in PowerPoint.",
  "gender-governance":
    "If women can't sit on the council, the council can't see the village.",
  "governance-livelihoods":
    "Permits, land titles, market access — who you know decides whether the business survives.",
  "climate-gender":
    "When the rains fail, women are last to eat and first to walk further for water.",
  "climate-livelihoods":
    "Crops, fish, herds — every income tied to rainfall is tied to climate. Adapt or shrink.",
  "gender-livelihoods":
    "Closing the gender gap in farming alone would feed an extra 150 million people. The math is brutal.",
};

function pairKey(a: string, b: string) {
  return [a, b].sort().join("-");
}

function polar(angleDeg: number, radius: number) {
  const r = (angleDeg * Math.PI) / 180;
  return { x: 50 + Math.cos(r) * radius, y: 50 + Math.sin(r) * radius };
}

export default function IntersectionalityDiagram() {
  const [active, setActive] = useState<string | null>(null);

  const positions = useMemo(
    () => Object.fromEntries(DOMAINS.map((d) => [d.id, polar(d.angle, 36)])),
    []
  );

  const lines = useMemo(() => {
    const result: Array<{
      from: string;
      to: string;
      x1: number;
      y1: number;
      x2: number;
      y2: number;
    }> = [];
    for (let i = 0; i < DOMAINS.length; i += 1) {
      for (let j = i + 1; j < DOMAINS.length; j += 1) {
        const a = DOMAINS[i];
        const b = DOMAINS[j];
        result.push({
          from: a.id,
          to: b.id,
          x1: positions[a.id].x,
          y1: positions[a.id].y,
          x2: positions[b.id].x,
          y2: positions[b.id].y,
        });
      }
    }
    return result;
  }, [positions]);

  const activeDomain = DOMAINS.find((d) => d.id === active) ?? null;
  const activeConnections = activeDomain
    ? DOMAINS.filter((d) => d.id !== activeDomain.id).map((d) => ({
        partner: d,
        story: PAIRS[pairKey(activeDomain.id, d.id)] ?? "",
      }))
    : null;

  return (
    <div className="grid lg:grid-cols-[1.1fr,1fr] gap-12 lg:gap-16 items-center">
      {/* Diagram */}
      <div className="relative w-full max-w-[560px] mx-auto aspect-square">
        <svg
          viewBox="0 0 100 100"
          className="absolute inset-0 w-full h-full"
          role="img"
          aria-label="A diagram of six interconnected systems: water, health, governance, climate, gender, and livelihoods. Hover or focus any system to see how it connects to the others."
        >
          <defs>
            <radialGradient id="iaCenter">
              <stop offset="0%" stopColor="#D4AA6A" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#D4AA6A" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="iaActiveLine" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0F766E" />
              <stop offset="100%" stopColor="#B8860B" />
            </linearGradient>
            <linearGradient id="iaActiveLineDark" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#2DD4BF" />
              <stop offset="100%" stopColor="#D4AA6A" />
            </linearGradient>
          </defs>

          {/* Center wash */}
          <circle cx="50" cy="50" r="38" fill="url(#iaCenter)" />

          {/* All pairwise lines — dim by default, brighten when an endpoint is active */}
          {lines.map((line) => {
            const isActive = active === line.from || active === line.to;
            const isDimmed = active !== null && !isActive;
            return (
              <line
                key={`${line.from}-${line.to}`}
                x1={line.x1}
                y1={line.y1}
                x2={line.x2}
                y2={line.y2}
                stroke={isActive ? "url(#iaActiveLine)" : "currentColor"}
                strokeWidth={isActive ? 0.45 : 0.18}
                opacity={isActive ? 0.95 : isDimmed ? 0.08 : 0.22}
                className="text-plum-700 dark:text-cream-300 transition-all duration-300"
                strokeLinecap="round"
              />
            );
          })}

          {/* Nodes */}
          {DOMAINS.map((d) => {
            const pos = positions[d.id];
            const isActive = active === d.id;
            return (
              <g
                key={d.id}
                onMouseEnter={() => setActive(d.id)}
                onMouseLeave={() => setActive(null)}
                onFocus={() => setActive(d.id)}
                onBlur={() => setActive(null)}
                onClick={() => setActive((prev) => (prev === d.id ? null : d.id))}
                tabIndex={0}
                role="button"
                aria-pressed={isActive}
                aria-label={`${d.label}: ${d.short}`}
                className="cursor-pointer focus:outline-none"
                style={{ outline: "none" }}
              >
                {/* Glow halo */}
                <circle
                  cx={pos.x}
                  cy={pos.y}
                  r={isActive ? 5.5 : 3.8}
                  fill={isActive ? "rgba(212, 170, 106, 0.35)" : "rgba(212, 170, 106, 0.10)"}
                  className="transition-all duration-300"
                />
                {/* Inner dot */}
                <circle
                  cx={pos.x}
                  cy={pos.y}
                  r={isActive ? 2.6 : 2.0}
                  fill={isActive ? "#D4AA6A" : "#0F766E"}
                  className="transition-all duration-300 dark:fill-current"
                  style={{
                    color: isActive ? "#D4AA6A" : "#2DD4BF",
                  }}
                />
                {/* Focus ring */}
                {isActive && (
                  <circle
                    cx={pos.x}
                    cy={pos.y}
                    r="4.2"
                    fill="none"
                    stroke="#D4AA6A"
                    strokeWidth="0.3"
                    strokeDasharray="0.5 0.5"
                    opacity="0.7"
                  />
                )}
              </g>
            );
          })}
        </svg>

        {/* Labels — positioned in DOM around the SVG circle */}
        {DOMAINS.map((d) => {
          const labelPos = polar(d.angle, 47);
          const isActive = active === d.id;
          return (
            <button
              key={`label-${d.id}`}
              type="button"
              onMouseEnter={() => setActive(d.id)}
              onMouseLeave={() => setActive(null)}
              onFocus={() => setActive(d.id)}
              onBlur={() => setActive(null)}
              onClick={() => setActive((prev) => (prev === d.id ? null : d.id))}
              className={cn(
                "absolute -translate-x-1/2 -translate-y-1/2 px-3 py-1 rounded-full",
                "text-xs sm:text-sm font-semibold tracking-wide uppercase whitespace-nowrap",
                "transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-500",
                isActive
                  ? "bg-gold-400 text-plum-900 shadow-lg scale-110"
                  : "bg-cream-50 dark:bg-plum-800 text-plum-800 dark:text-cream-200 border border-plum-200 dark:border-plum-700 hover:scale-105"
              )}
              style={{ left: `${labelPos.x}%`, top: `${labelPos.y}%` }}
              aria-label={d.label}
            >
              {d.label}
            </button>
          );
        })}

        {/* Center hint */}
        {!active && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <p className="font-accent italic text-sm md:text-base text-token-muted text-center max-w-[14ch] leading-snug">
              Hover any system
            </p>
          </div>
        )}
      </div>

      {/* Information panel */}
      <div className="min-h-[280px]">
        {!activeDomain ? (
          <div className="space-y-4">
            <p className="font-accent italic text-lg md:text-xl text-token-secondary leading-snug">
              These six systems aren&rsquo;t separate problems. Pull on one and the
              others move with it.
            </p>
            <p className="text-base md:text-lg text-token-primary leading-relaxed max-w-prose">
              That&rsquo;s why we extend Kimberlé Crenshaw&rsquo;s intersectionality
              from <em>people</em> to <em>systems</em>. A water programme that
              ignores governance fails in two years. A climate plan that
              ignores gender misses half the village. Solutions stick when
              they account for the whole web.
            </p>
            <p className="text-sm uppercase tracking-wider text-token-gold font-semibold pt-2">
              Try it &mdash; tap a node.
            </p>
          </div>
        ) : (
          <div className="space-y-5" key={activeDomain.id}>
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-token-gold font-semibold mb-2">
                {activeDomain.label} connects to
              </p>
              <p className="font-accent italic text-base md:text-lg text-token-secondary">
                {activeDomain.short}
              </p>
            </div>

            <ul className="space-y-3">
              {activeConnections!.map(({ partner, story }) => (
                <li
                  key={partner.id}
                  className="border-l-2 border-gold-400/60 pl-4 py-1"
                >
                  <p className="text-xs uppercase tracking-wider font-semibold text-token-teal mb-1">
                    {activeDomain.label} &amp; {partner.label}
                  </p>
                  <p className="text-sm md:text-base leading-snug text-token-primary">
                    {story}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
