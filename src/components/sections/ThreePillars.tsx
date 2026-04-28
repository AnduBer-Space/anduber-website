"use client";

import { motion } from "framer-motion";
import { Zap, Sparkles, Shield } from "lucide-react";
import Container from "@/components/ui/Container";
import HybridSection from "@/components/ui/HybridSection";

/**
 * Theory of Change. Three pillars connected as a flow (input → process →
 * output) — visually presented as three sections that share a flowing line,
 * not isolated cards. Plain-language subtitles sit right beneath each
 * technical name.
 *
 * Brand IP retained: Radical Collision, Applied Imagination, Systemic
 * Resilience. The original descriptions are preserved; the friendly voice
 * sits on top, not as a replacement.
 */

type Pillar = {
  id: string;
  /** Brand name. */
  title: string;
  /** Friendly one-liner — the plain voice. */
  plain: string;
  /** Stage label — Input / Process / Output. */
  stage: string;
  description: string;
  example: string;
  Icon: typeof Zap;
  accent: "teal" | "gold" | "copper";
};

const PILLARS: Pillar[] = [
  {
    id: "collision",
    title: "Radical Collision",
    plain: "Bringing unlikely people together — poets with policymakers, grandmothers with engineers.",
    stage: "Input",
    description:
      "We collide the unusual suspects. Outside their disciplines and inside the same room, people see angles their training trained them to ignore.",
    example: "A Maji Maisha planning session put a hydrogeologist, a youth pastor, a women's-group treasurer, and a solar engineer at the same table. The pump survived because they did.",
    Icon: Zap,
    accent: "teal",
  },
  {
    id: "imagination",
    title: "Applied Imagination",
    plain: "Equipping these teams with tools to map problems and find leverage points.",
    stage: "Process",
    description:
      "Systems mapping. Causal-loop diagrams. Design-justice methods. We move groups from \"what if\" to \"how to\" — turning intuition into structures decisions can be made on.",
    example: "We map the system on the wall before we touch a budget. Half the time, the solution turns out to be a smaller, weirder, cheaper intervention than anyone in the room arrived expecting.",
    Icon: Sparkles,
    accent: "gold",
  },
  {
    id: "resilience",
    title: "Systemic Resilience",
    plain: "Producing solutions that hold up because they address multiple problems at once.",
    stage: "Output",
    description:
      "What we ship is not a project. It's a system — community-owned, self-sustaining, designed to keep working when the funding cycle ends and the consultant leaves.",
    example: "Maji Maisha graduated to community ownership in 18 months. Three years on, the pumps still run, costs are 75% lower, and zero litres of diesel are burned.",
    Icon: Shield,
    accent: "copper",
  },
];

const ACCENTS: Record<
  Pillar["accent"],
  { ring: string; text: string; iconBg: string; dot: string }
> = {
  teal: {
    ring: "ring-teal-500/40",
    text: "text-teal-700 dark:text-teal-400",
    iconBg: "bg-teal-500/10",
    dot: "bg-teal-500",
  },
  gold: {
    ring: "ring-gold-500/40",
    text: "text-gold-700 dark:text-gold-400",
    iconBg: "bg-gold-400/10",
    dot: "bg-gold-500",
  },
  copper: {
    ring: "ring-gold-600/40",
    text: "text-gold-800 dark:text-gold-400",
    iconBg: "bg-gold-600/10",
    dot: "bg-gold-600",
  },
};

export default function ThreePillars() {
  return (
    <HybridSection variant="light" id="how-we-work" padding="xl">
      <Container className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mb-12 lg:mb-16"
        >
          <p className="text-xs uppercase tracking-[0.22em] font-semibold text-token-gold mb-4">
            Theory of Change
          </p>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-token-primary leading-[1.1] mb-5">
            How we put Applied Intersectionality to work
          </h2>
          <p className="font-accent italic text-lg md:text-xl text-token-secondary leading-snug max-w-[60ch]">
            Three pillars, in order: bring the room together, give them tools, ship something that lasts.
          </p>
        </motion.div>

        {/* Connected flow: vertical on mobile, horizontal on desktop, with a single thread linking them. */}
        <div className="relative">
          {/* Flow thread (desktop) — drawn behind cards. Decorative; aria-hidden. */}
          <svg
            aria-hidden="true"
            className="hidden lg:block absolute inset-x-0 top-[64px] w-full h-12 pointer-events-none"
            viewBox="0 0 100 6"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="pillarFlow" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#0F766E" />
                <stop offset="50%" stopColor="#B8860B" />
                <stop offset="100%" stopColor="#a87545" />
              </linearGradient>
            </defs>
            <motion.path
              d="M 4 3 Q 25 0 50 3 T 96 3"
              stroke="url(#pillarFlow)"
              strokeWidth="0.4"
              fill="none"
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 0.6 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 1.4, ease: "easeOut" }}
            />
          </svg>

          <div className="grid lg:grid-cols-3 gap-8 lg:gap-6 relative">
            {PILLARS.map((p, index) => {
              const accent = ACCENTS[p.accent];
              return (
                <motion.article
                  key={p.id}
                  initial={{ opacity: 0, y: 32 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ delay: index * 0.15, duration: 0.6 }}
                  className="relative group"
                >
                  {/* Stage label + numeric bullet */}
                  <div className="flex items-center gap-3 mb-5">
                    <span
                      className={`inline-flex items-center justify-center w-12 h-12 rounded-full ring-2 ${accent.ring} ${accent.iconBg} relative z-10`}
                    >
                      <p.Icon className={`w-5 h-5 ${accent.text}`} aria-hidden="true" />
                    </span>
                    <div>
                      <p className={`text-[10px] uppercase tracking-[0.18em] font-semibold ${accent.text}`}>
                        {p.stage}
                      </p>
                      <p className="text-xs uppercase tracking-wider text-token-muted">
                        Pillar {String(index + 1).padStart(2, "0")}
                      </p>
                    </div>
                  </div>

                  {/* Title + plain-language line */}
                  <h3 className="font-serif text-2xl md:text-3xl font-bold text-token-primary leading-tight mb-2">
                    {p.title}
                  </h3>
                  <p className={`font-accent italic text-base md:text-lg leading-snug mb-4 ${accent.text}`}>
                    {p.plain}
                  </p>

                  {/* Original description — IP preserved */}
                  <p className="text-sm md:text-base text-token-secondary leading-relaxed mb-4">
                    {p.description}
                  </p>

                  {/* Concrete example */}
                  <div className="border-l-2 border-gold-500/40 pl-4 py-1">
                    <p className="text-xs uppercase tracking-wider font-semibold text-token-gold mb-1">
                      In practice
                    </p>
                    <p className="text-sm text-token-primary leading-snug">{p.example}</p>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
          className="mt-14 max-w-3xl"
        >
          <p className="font-serif italic text-xl md:text-2xl text-token-primary leading-relaxed">
            From <span className="not-italic font-semibold text-token-teal">friction</span> to{" "}
            <span className="not-italic font-semibold text-token-gold">flow</span>. We turn
            &ldquo;what if&rdquo; into &ldquo;how to&rdquo;.
          </p>
        </motion.div>
      </Container>
    </HybridSection>
  );
}
