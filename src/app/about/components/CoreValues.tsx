"use client";

import { motion } from "framer-motion";
import {
  Zap,
  Lightbulb,
  Shield,
  Users,
  Network,
  Heart,
} from "lucide-react";
import Container from "@/components/ui/Container";

/**
 * Core values for the About page. The first three values are the brand IP
 * (Radical Collision / Applied Imagination / Systemic Resilience). The
 * remaining three describe how we work with whoever we work with.
 */

type Value = {
  Icon: typeof Zap;
  title: string;
  plain: string;
  description: string;
  tone: "teal" | "gold" | "copper";
};

const VALUES: Value[] = [
  {
    Icon: Zap,
    title: "Radical Collision",
    plain: "Bring the unlikely room together.",
    description:
      "We collide unusual suspects — poets with policymakers, elders with engineers — because the angles a single discipline misses are the ones that matter.",
    tone: "teal",
  },
  {
    Icon: Lightbulb,
    title: "Applied Imagination",
    plain: "Move from ‘what if’ to ‘how to’.",
    description:
      "We equip those rooms with systems-mapping, causal-loop and design-justice tools. Insight without structure is a feeling. Structure without insight is a spreadsheet.",
    tone: "gold",
  },
  {
    Icon: Shield,
    title: "Systemic Resilience",
    plain: "Ship things that hold up after we leave.",
    description:
      "Solutions that address the whole web, not one strand. Community-owned and self-sustaining are non-negotiables.",
    tone: "copper",
  },
  {
    Icon: Users,
    title: "Community Ownership",
    plain: "Work with, not for.",
    description:
      "Local ownership, local governance, local maintenance — by design, on a stated timeline, with a stated handover.",
    tone: "teal",
  },
  {
    Icon: Network,
    title: "Connective Tissue",
    plain: "Be the bridge no one else is bridging.",
    description:
      "We treat the gap between disciplines as the actual job. Translating, convening, and brokering trust across boundaries is the work — not the overhead.",
    tone: "gold",
  },
  {
    Icon: Heart,
    title: "Human-Centric",
    plain: "Dignity, equity, and inclusion are floors, not ceilings.",
    description:
      "Every solution starts and ends with the people it touches. If a metric is satisfied while a person is diminished, we threw away the metric.",
    tone: "copper",
  },
];

const TONES = {
  teal: { text: "text-token-teal", bg: "bg-teal-500/10", iconBg: "bg-teal-500/15" },
  gold: { text: "text-token-gold", bg: "bg-gold-400/10", iconBg: "bg-gold-400/15" },
  copper: { text: "text-gold-800 dark:text-gold-400", bg: "bg-gold-600/10", iconBg: "bg-gold-600/15" },
};

export default function CoreValues() {
  return (
    <section className="relative py-20 md:py-28 overflow-hidden bg-cream-50 dark:bg-plum-900">
      <Container className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          className="max-w-3xl mb-12"
        >
          <p className="text-xs uppercase tracking-[0.22em] font-semibold text-token-gold mb-4">
            Our foundation
          </p>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-token-primary leading-[1.1] mb-5">
            Core <span className="text-gradient-gold">values</span>
          </h2>
          <p className="font-accent italic text-lg md:text-xl text-token-secondary leading-snug max-w-[60ch]">
            Six commitments that decide what we say yes to.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {VALUES.map((v, idx) => {
            const tone = TONES[v.tone];
            return (
              <motion.article
                key={v.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: idx * 0.06 }}
                className="p-5 lg:p-6 rounded-2xl border border-plum-200 dark:border-plum-700 bg-white/50 dark:bg-plum-800/40 backdrop-blur-sm hover:-translate-y-0.5 transition-transform duration-300"
              >
                <div className={`inline-flex w-10 h-10 rounded-xl items-center justify-center mb-4 ${tone.iconBg}`}>
                  <v.Icon className={`w-5 h-5 ${tone.text}`} aria-hidden="true" />
                </div>
                <h3 className="font-serif text-lg md:text-xl font-bold text-token-primary leading-tight mb-1">
                  {v.title}
                </h3>
                <p className={`font-accent italic text-sm md:text-base leading-snug mb-3 ${tone.text}`}>
                  {v.plain}
                </p>
                <p className="text-sm text-token-secondary leading-relaxed">
                  {v.description}
                </p>
              </motion.article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
