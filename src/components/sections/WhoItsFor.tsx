"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Coins, Building2, Lightbulb } from "lucide-react";
import Container from "@/components/ui/Container";
import HybridSection from "@/components/ui/HybridSection";

/**
 * Three pathways for visitors to identify themselves and pick a next step.
 * Mirrors the Start Here floating picker that lands in Phase 5 — but lives
 * inline so it works for visitors who don't engage with the floating widget.
 */

const PATHWAYS = [
  {
    title: "Funders & Philanthropists",
    plain: "You want your capital to bend systems, not bandage symptoms.",
    href: "/contact?intent=fund",
    Icon: Coins,
    accent: "gold" as const,
  },
  {
    title: "Organisations & Governments",
    plain: "Your team is stuck inside a complex problem and needs to see the whole web.",
    href: "/contact?intent=advise",
    Icon: Building2,
    accent: "teal" as const,
  },
  {
    title: "Innovators with Ideas",
    plain: "You're building something the standard pipeline overlooks. You need backing and a network.",
    href: "/contact?intent=back",
    Icon: Lightbulb,
    accent: "copper" as const,
  },
];

const ACCENTS = {
  gold: "text-gold-700 dark:text-gold-400 bg-gold-400/10",
  teal: "text-teal-700 dark:text-teal-400 bg-teal-500/10",
  copper: "text-gold-800 dark:text-gold-400 bg-gold-600/10",
};

export default function WhoItsFor() {
  return (
    <HybridSection variant="light" id="who-its-for" padding="xl">
      <Container className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mb-12 lg:mb-14"
        >
          <p className="text-xs uppercase tracking-[0.22em] font-semibold text-token-gold mb-4">
            Who it&rsquo;s for
          </p>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-token-primary leading-[1.1] mb-5">
            Who we work with
          </h2>
          <p className="font-accent italic text-lg md:text-xl text-token-secondary leading-snug max-w-[60ch]">
            Three doors in. Pick the one that fits and we&rsquo;ll meet you there.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {PATHWAYS.map((p, idx) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
            >
              <Link
                href={p.href}
                className="group flex flex-col h-full p-6 lg:p-8 rounded-2xl
                           border border-plum-200 dark:border-plum-700
                           bg-white/60 dark:bg-plum-800/40 backdrop-blur-sm
                           transition-all duration-300
                           hover:-translate-y-1 hover:shadow-md hover:border-gold-400/40
                           focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500"
              >
                <span className={`inline-flex w-12 h-12 rounded-xl items-center justify-center mb-5 ${ACCENTS[p.accent]}`}>
                  <p.Icon className="w-6 h-6" aria-hidden="true" />
                </span>
                <h3 className="font-serif text-xl md:text-2xl font-bold text-token-primary leading-tight mb-2">
                  {p.title}
                </h3>
                <p className="font-accent italic text-sm md:text-base text-token-secondary leading-snug mb-6">
                  {p.plain}
                </p>
                <span className="mt-auto inline-flex items-center gap-2 text-sm font-semibold text-token-gold group-hover:gap-3 transition-all duration-300">
                  Start here
                  <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </Container>
    </HybridSection>
  );
}
