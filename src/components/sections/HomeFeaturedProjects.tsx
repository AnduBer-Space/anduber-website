"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, MessageSquare, Droplets } from "lucide-react";
import Container from "@/components/ui/Container";
import HybridSection from "@/components/ui/HybridSection";

/**
 * "What this looks like in practice". Two real projects as proof.
 *
 * Numbers are sourced from the redesign brief. A version of these projects
 * with full case-study depth lives at /our-work.
 */

type Project = {
  href: string;
  Icon: typeof MessageSquare;
  name: string;
  /** Friendly tagline. */
  plain: string;
  problem: string;
  approach: string;
  metrics: { label: string; value: string }[];
  accent: "teal" | "gold";
};

const PROJECTS: Project[] = [
  {
    href: "/our-work",
    Icon: MessageSquare,
    name: "ComeThru",
    plain:
      "A mental wellness companion that meets people where they already are — on WhatsApp.",
    problem:
      "Mental health support sits behind clinics, payment plans, and stigma. The people who need it most aren't there.",
    approach:
      "An AI companion delivered through the most-used app in Africa. Private, low-bandwidth, available at 2am — designed with therapists, peer counsellors and people with lived experience.",
    metrics: [
      { value: "WhatsApp-native", label: "no app to install" },
      { value: "24 / 7", label: "always-on access" },
    ],
    accent: "teal",
  },
  {
    href: "/our-work",
    Icon: Droplets,
    name: "Maji Maisha",
    plain:
      "Solar-powered water systems owned and run by the community.",
    problem:
      "In Mbeere North, Kenya, communities walked four hours to fetch water. Boreholes existed but ran on diesel — when fuel prices spiked, the pumps stopped.",
    approach:
      "Three solar-powered hubs, designed with the community, governed by a board where 50% of seats belong to women. Eighteen-month path to full community ownership; we step out by design.",
    metrics: [
      { value: "3,500+", label: "people served" },
      { value: "75%", label: "operating cost reduction" },
      { value: "0", label: "litres of diesel" },
      { value: "50%", label: "women in leadership" },
    ],
    accent: "gold",
  },
];

const ACCENTS = {
  teal: {
    chip: "bg-teal-500/10 border-teal-500/30 text-teal-700 dark:text-teal-400",
    icon: "text-teal-700 dark:text-teal-400 bg-teal-500/10",
    metric: "text-teal-700 dark:text-teal-400",
  },
  gold: {
    chip: "bg-gold-400/10 border-gold-500/30 text-gold-700 dark:text-gold-400",
    icon: "text-gold-700 dark:text-gold-400 bg-gold-400/10",
    metric: "text-gold-700 dark:text-gold-400",
  },
};

export default function HomeFeaturedProjects() {
  return (
    <HybridSection variant="light" id="our-work-preview" padding="xl">
      <Container className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mb-12 lg:mb-16"
        >
          <p className="text-xs uppercase tracking-[0.22em] font-semibold text-token-gold mb-4">
            Our Work
          </p>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-token-primary leading-[1.1] mb-5">
            What this looks like in practice
          </h2>
          <p className="font-accent italic text-lg md:text-xl text-token-secondary leading-snug max-w-[60ch]">
            Two projects, both built by The Good Labs. Two very different shapes — one methodology.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
          {PROJECTS.map((p, idx) => {
            const a = ACCENTS[p.accent];
            return (
              <motion.article
                key={p.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: idx * 0.12, duration: 0.6 }}
                className="group flex flex-col h-full p-6 lg:p-8 rounded-3xl
                           border border-plum-200 dark:border-plum-700
                           bg-white/60 dark:bg-plum-800/40 backdrop-blur-sm
                           transition-all duration-300
                           hover:-translate-y-1 hover:shadow-lg hover:border-gold-400/40"
              >
                <div className="flex items-center gap-4 mb-6">
                  <span className={`w-14 h-14 rounded-2xl flex items-center justify-center ${a.icon}`}>
                    <p.Icon className="w-7 h-7" aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="font-serif text-2xl md:text-3xl font-bold text-token-primary leading-tight">
                      {p.name}
                    </h3>
                    <span
                      className={`inline-block mt-1 text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded-full border ${a.chip}`}
                    >
                      The Good Labs
                    </span>
                  </div>
                </div>

                <p className="font-accent italic text-base md:text-lg text-token-secondary leading-snug mb-5">
                  {p.plain}
                </p>

                <dl className="space-y-3 mb-6">
                  <div>
                    <dt className="text-[10px] uppercase tracking-[0.18em] font-semibold text-token-muted mb-1">
                      The problem
                    </dt>
                    <dd className="text-sm md:text-base text-token-primary leading-relaxed">{p.problem}</dd>
                  </div>
                  <div>
                    <dt className="text-[10px] uppercase tracking-[0.18em] font-semibold text-token-muted mb-1">
                      What we did
                    </dt>
                    <dd className="text-sm md:text-base text-token-primary leading-relaxed">{p.approach}</dd>
                  </div>
                </dl>

                <div className="grid grid-cols-2 gap-3 mb-6 mt-auto">
                  {p.metrics.map((m) => (
                    <div
                      key={m.label}
                      className="rounded-xl border border-plum-200 dark:border-plum-700 bg-cream-50/50 dark:bg-plum-900/40 px-4 py-3"
                    >
                      <p className={`font-serif text-xl md:text-2xl font-bold leading-tight ${a.metric}`}>
                        {m.value}
                      </p>
                      <p className="text-xs text-token-muted mt-0.5 leading-snug">{m.label}</p>
                    </div>
                  ))}
                </div>

                <Link
                  href={p.href}
                  className="inline-flex items-center gap-2 font-medium text-token-gold group-hover:gap-3 transition-all duration-300"
                >
                  Read the case study
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.article>
            );
          })}
        </div>
      </Container>
    </HybridSection>
  );
}
