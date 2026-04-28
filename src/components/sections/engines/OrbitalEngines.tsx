"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Three engines orbiting a shared center, with light particles travelling
 * between them along the orbital arcs to convey "resource exchange". Each
 * engine is interactive — hovering or focusing one expands its info panel.
 */

type Engine = {
  id: "partners" | "labs" | "gathering";
  /** Brand name. */
  title: string;
  /** "Strategic Engine" / "Invention Engine" / "Ecosystem Engine". */
  badge: string;
  /** Plain-language one-liner. */
  plain: string;
  description: string;
  revenue: string;
  outcomes: string[];
  /** Orbital position in degrees (0 = top, going clockwise). */
  angle: number;
  /** Hex pair: outer ring + inner core. */
  hue: { ring: string; core: string };
};

const ENGINES: Engine[] = [
  {
    id: "partners",
    title: "AnduBer Partners",
    badge: "Strategic Engine",
    plain: "We advise foundations, NGOs and governments.",
    description:
      "Embedded consultancy. We don't write reports and leave; we sit with teams and co-design intersectional strategies they can actually execute.",
    revenue: "Earned revenue — funds core operations.",
    outcomes: [
      "County-level intersectional strategy",
      "Multi-stakeholder facilitation & systems mapping",
    ],
    angle: 0,
    hue: { ring: "#2DD4BF", core: "#0F766E" },
  },
  {
    id: "labs",
    title: "The Good Labs",
    badge: "Invention Engine",
    plain: "We build solutions ourselves — like ComeThru and Maji Maisha.",
    description:
      "AnduBer's own R&D arm. We prototype the methods we sell, build the products we want to exist, and open-source what others can use.",
    revenue: "IP licensing, research grants.",
    outcomes: [
      "ComeThru — WhatsApp-native mental wellness companion",
      "Maji Maisha — community-owned solar water systems",
    ],
    angle: 120,
    hue: { ring: "#D4AA6A", core: "#B8860B" },
  },
  {
    id: "gathering",
    title: "The Gathering",
    badge: "Ecosystem Engine",
    plain: "We back grassroots innovators with capital and networks.",
    description:
      "Catalytic capital, advisory, and a network of unlikely collaborators — directed at the African innovators traditional VC misses.",
    revenue: "Venture capital — returns recycled into the next cohort.",
    outcomes: [
      "Climate-resilience and community-health ventures",
      "Founder networks across East Africa",
    ],
    angle: 240,
    hue: { ring: "#C9956C", core: "#a87545" },
  },
];

function polar(angle: number, r: number) {
  const rad = ((angle - 90) * Math.PI) / 180; // 0deg = up
  return { x: 50 + Math.cos(rad) * r, y: 50 + Math.sin(rad) * r };
}

export default function OrbitalEngines() {
  const [active, setActive] = useState<Engine["id"] | null>(null);
  const activeEngine = ENGINES.find((e) => e.id === active) ?? null;

  return (
    <div className="grid lg:grid-cols-[1fr,1.05fr] gap-12 lg:gap-16 items-center">
      {/* Orbital visualization */}
      <div className="relative w-full max-w-[520px] mx-auto aspect-square">
        <svg
          viewBox="0 0 100 100"
          className="absolute inset-0 w-full h-full"
          aria-hidden="true"
        >
          <defs>
            <radialGradient id="enginesCenter">
              <stop offset="0%" stopColor="#D4AA6A" stopOpacity="0.5" />
              <stop offset="60%" stopColor="#D4AA6A" stopOpacity="0.05" />
              <stop offset="100%" stopColor="#D4AA6A" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Outer dashed orbit */}
          <circle
            cx="50"
            cy="50"
            r="38"
            fill="none"
            stroke="#D4AA6A"
            strokeOpacity="0.2"
            strokeWidth="0.2"
            strokeDasharray="0.8 0.8"
          />
          {/* Inner orbit */}
          <circle
            cx="50"
            cy="50"
            r="20"
            fill="none"
            stroke="#2DD4BF"
            strokeOpacity="0.15"
            strokeWidth="0.15"
            strokeDasharray="0.6 0.6"
          />

          {/* Center wash */}
          <circle cx="50" cy="50" r="22" fill="url(#enginesCenter)" />

          {/* Resource exchange particles — three travel along the outer orbit at staggered phases */}
          {ENGINES.map((e, i) => (
            <circle
              key={`particle-${e.id}`}
              r="0.7"
              fill={e.hue.ring}
              style={{
                offsetPath: "path('M 88 50 A 38 38 0 1 1 12 50 A 38 38 0 1 1 88 50')",
                offsetDistance: "0%",
                animation: `enginesOrbit 18s linear infinite`,
                animationDelay: `${i * 6}s`,
              }}
            />
          ))}

          {/* Engine cores */}
          {ENGINES.map((e) => {
            const pos = polar(e.angle, 38);
            const isActive = active === e.id;
            return (
              <g key={`core-${e.id}`}>
                <circle
                  cx={pos.x}
                  cy={pos.y}
                  r={isActive ? 7.5 : 5.5}
                  fill={e.hue.ring}
                  fillOpacity={isActive ? 0.25 : 0.14}
                  className="transition-all duration-300"
                />
                <circle
                  cx={pos.x}
                  cy={pos.y}
                  r={isActive ? 3.4 : 2.8}
                  fill={e.hue.core}
                  className="transition-all duration-300"
                />
              </g>
            );
          })}
        </svg>

        {/* Center label */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="text-center">
            <p className="font-serif text-base md:text-lg font-bold text-token-primary">
              One Ecosystem
            </p>
            <p className="font-accent italic text-xs md:text-sm text-token-secondary">
              Three engines, one flywheel
            </p>
          </div>
        </div>

        {/* Engine labels — interactive buttons */}
        {ENGINES.map((e) => {
          const labelPos = polar(e.angle, 56);
          const isActive = active === e.id;
          return (
            <button
              key={`label-${e.id}`}
              type="button"
              onMouseEnter={() => setActive(e.id)}
              onMouseLeave={() => setActive(null)}
              onFocus={() => setActive(e.id)}
              onBlur={() => setActive(null)}
              onClick={() =>
                setActive((prev) => (prev === e.id ? null : e.id))
              }
              className={cn(
                "absolute -translate-x-1/2 -translate-y-1/2 px-4 py-2 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap",
                "transition-all duration-300 shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-500",
                isActive
                  ? "bg-gold-400 text-plum-900 scale-110"
                  : "bg-cream-50 dark:bg-plum-800 text-plum-800 dark:text-cream-200 border border-plum-200 dark:border-plum-700 hover:scale-105"
              )}
              style={{
                left: `${labelPos.x}%`,
                top: `${labelPos.y}%`,
              }}
              aria-pressed={isActive}
            >
              {e.title}
            </button>
          );
        })}

        {/* Inline keyframes for the orbiting particles */}
        <style jsx>{`
          @keyframes enginesOrbit {
            0% { offset-distance: 0%; opacity: 0; }
            10% { opacity: 0.95; }
            90% { opacity: 0.95; }
            100% { offset-distance: 100%; opacity: 0; }
          }
          @media (prefers-reduced-motion: reduce) {
            circle[style*="enginesOrbit"] {
              animation: none !important;
              display: none;
            }
          }
        `}</style>
      </div>

      {/* Information panel */}
      <div className="min-h-[300px]">
        {!activeEngine ? (
          <div className="space-y-5">
            <p className="font-accent italic text-lg md:text-xl text-token-secondary leading-snug">
              Three engines, one ecosystem. Each funds, feeds and learns from the others.
            </p>
            <ul className="space-y-3">
              {ENGINES.map((e) => (
                <li key={e.id} className="flex items-start gap-3">
                  <span
                    className="mt-1.5 w-2.5 h-2.5 rounded-full shrink-0"
                    style={{ background: e.hue.core }}
                    aria-hidden="true"
                  />
                  <div>
                    <p className="font-serif text-base md:text-lg font-bold text-token-primary">
                      {e.title}{" "}
                      <span className="font-sans not-italic text-xs uppercase tracking-wider text-token-muted">
                        {e.badge}
                      </span>
                    </p>
                    <p className="font-accent italic text-sm md:text-base text-token-secondary leading-snug">
                      {e.plain}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
            <p className="text-xs uppercase tracking-wider text-token-gold font-semibold pt-2">
              Tap an engine to dig in.
            </p>
          </div>
        ) : (
          <div className="space-y-5" key={activeEngine.id}>
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-token-gold font-semibold mb-2">
                {activeEngine.badge}
              </p>
              <h3 className="font-serif text-2xl md:text-3xl font-bold text-token-primary leading-tight mb-2">
                {activeEngine.title}
              </h3>
              <p className="font-accent italic text-base md:text-lg text-token-secondary leading-snug mb-4">
                {activeEngine.plain}
              </p>
              <p className="text-sm md:text-base text-token-primary leading-relaxed">
                {activeEngine.description}
              </p>
            </div>

            <div className="border-t border-token-glass pt-4">
              <p className="text-[10px] uppercase tracking-[0.18em] text-token-muted font-semibold mb-1">
                Revenue model
              </p>
              <p className="text-sm text-token-primary">{activeEngine.revenue}</p>
            </div>

            <div className="border-t border-token-glass pt-4">
              <p className="text-[10px] uppercase tracking-[0.18em] text-token-muted font-semibold mb-2">
                Recent outcomes
              </p>
              <ul className="space-y-1.5">
                {activeEngine.outcomes.map((o) => (
                  <li
                    key={o}
                    className="text-sm text-token-secondary leading-snug flex gap-2"
                  >
                    <span aria-hidden="true" className="text-token-gold">→</span>
                    <span>{o}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
