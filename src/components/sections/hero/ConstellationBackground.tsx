"use client";

import { useEffect, useMemo, useState } from "react";

/**
 * The visual metaphor for Applied Intersectionality:
 * dots representing disciplines that periodically connect into new shapes
 * with thin gold lines. The shape that forms is never the same twice — that's
 * the point. Innovation happens when the unusual suspects collide.
 *
 * Performance: SVG is pre-rendered as static markup; only the line opacity
 * is mutated via React state on a 4-second interval. Respects reduced-motion
 * by falling back to a single static composition.
 */

type Node = {
  id: number;
  /** 0–100 viewBox coords */
  x: number;
  y: number;
  label: string;
  variant: "teal" | "gold";
};

const NODES: Node[] = [
  { id: 0, x: 12, y: 22, label: "Artists", variant: "gold" },
  { id: 1, x: 28, y: 8, label: "Scientists", variant: "teal" },
  { id: 2, x: 50, y: 18, label: "Elders", variant: "gold" },
  { id: 3, x: 72, y: 8, label: "Engineers", variant: "teal" },
  { id: 4, x: 88, y: 22, label: "Poets", variant: "gold" },
  { id: 5, x: 90, y: 58, label: "Policymakers", variant: "teal" },
  { id: 6, x: 72, y: 78, label: "Youth", variant: "gold" },
  { id: 7, x: 50, y: 86, label: "Farmers", variant: "teal" },
  { id: 8, x: 28, y: 78, label: "Healers", variant: "gold" },
  { id: 9, x: 10, y: 58, label: "Builders", variant: "teal" },
  { id: 10, x: 36, y: 42, label: "Designers", variant: "gold" },
  { id: 11, x: 64, y: 42, label: "Storytellers", variant: "teal" },
];

/** Pick a small random subset of nodes that, drawn pairwise, makes a coherent shape. */
function pickActiveSet(seed: number): number[] {
  // Deterministic PRNG so SSR + hydration agree on the initial set.
  const rnd = (n: number) => {
    const x = Math.sin(seed * 9301 + n * 49297) * 233280;
    return x - Math.floor(x);
  };
  const size = 3 + Math.floor(rnd(0) * 3); // 3–5 nodes
  const ids: number[] = [];
  let attempt = 0;
  while (ids.length < size && attempt < 50) {
    const candidate = Math.floor(rnd(attempt + 1) * NODES.length);
    if (!ids.includes(candidate)) ids.push(candidate);
    attempt += 1;
  }
  return ids.sort((a, b) => a - b);
}

interface Props {
  /** Cycle duration in ms. Defaults to 4000. */
  intervalMs?: number;
  /** Layer label visibility. Hidden on small screens to keep the hero clean. */
  showLabels?: boolean;
}

export default function ConstellationBackground({
  intervalMs = 4000,
  showLabels = true,
}: Props) {
  const [seed, setSeed] = useState(1);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReduceMotion(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (reduceMotion) return;
    const id = window.setInterval(() => {
      setSeed((s) => s + 1);
    }, intervalMs);
    return () => window.clearInterval(id);
  }, [intervalMs, reduceMotion]);

  const activeIds = useMemo(() => pickActiveSet(seed), [seed]);
  const activePairs = useMemo(() => {
    const pairs: Array<[number, number]> = [];
    for (let i = 0; i < activeIds.length; i += 1) {
      for (let j = i + 1; j < activeIds.length; j += 1) {
        pairs.push([activeIds[i], activeIds[j]]);
      }
    }
    return pairs;
  }, [activeIds]);

  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none"
      aria-hidden="true"
    >
      {/* Background radial wash so nodes glow against soft plum. */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 40%, rgba(45, 212, 191, 0.08) 0%, transparent 70%), radial-gradient(ellipse 50% 40% at 50% 70%, rgba(212, 170, 106, 0.06) 0%, transparent 70%)",
        }}
      />

      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="absolute inset-0 w-full h-full"
      >
        <defs>
          <linearGradient id="constellationLine" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#D4AA6A" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#F5E6C8" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#D4AA6A" stopOpacity="0.9" />
          </linearGradient>
          <radialGradient id="constellationNodeGlow">
            <stop offset="0%" stopColor="#D4AA6A" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#D4AA6A" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="constellationNodeGlowTeal">
            <stop offset="0%" stopColor="#2DD4BF" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#2DD4BF" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Active connection lines — opacity transitions when the seed changes */}
        {activePairs.map(([from, to], i) => {
          const a = NODES[from];
          const b = NODES[to];
          return (
            <line
              key={`${seed}-${from}-${to}`}
              x1={a.x}
              y1={a.y}
              x2={b.x}
              y2={b.y}
              stroke="url(#constellationLine)"
              strokeWidth="0.18"
              strokeLinecap="round"
              style={{
                opacity: 0,
                animation: reduceMotion
                  ? "none"
                  : `lineFade ${intervalMs}ms ease-in-out forwards`,
                animationDelay: `${i * 60}ms`,
              }}
            />
          );
        })}

        {/* Static nodes — gentle constant glow */}
        {NODES.map((n) => {
          const isActive = activeIds.includes(n.id);
          return (
            <g key={n.id}>
              <circle
                cx={n.x}
                cy={n.y}
                r={isActive ? 2.4 : 1.6}
                fill={
                  n.variant === "gold"
                    ? "url(#constellationNodeGlow)"
                    : "url(#constellationNodeGlowTeal)"
                }
                style={{
                  transition: "r 600ms ease, opacity 600ms ease",
                }}
              />
              <circle
                cx={n.x}
                cy={n.y}
                r="0.55"
                fill={n.variant === "gold" ? "#D4AA6A" : "#2DD4BF"}
                style={{
                  opacity: isActive ? 1 : 0.7,
                  transition: "opacity 600ms ease",
                }}
              />
            </g>
          );
        })}
      </svg>

      {/* Discipline labels — positioned absolutely as DOM elements over SVG */}
      {showLabels && (
        <div className="absolute inset-0 hidden md:block">
          {NODES.map((n) => (
            <span
              key={n.id}
              className="absolute -translate-x-1/2 text-[10px] tracking-wider uppercase font-medium select-none"
              style={{
                left: `${n.x}%`,
                top: `calc(${n.y}% + 14px)`,
                color:
                  n.variant === "gold"
                    ? "rgba(212, 170, 106, 0.7)"
                    : "rgba(45, 212, 191, 0.7)",
                textShadow: "0 1px 4px rgba(30, 10, 20, 0.6)",
              }}
            >
              {n.label}
            </span>
          ))}
        </div>
      )}

      {/* Inline styles for the line-fade keyframe so it lives next to the SVG */}
      <style jsx>{`
        @keyframes lineFade {
          0% {
            opacity: 0;
            stroke-dashoffset: 100;
          }
          25% {
            opacity: 0.55;
          }
          70% {
            opacity: 0.45;
          }
          100% {
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
