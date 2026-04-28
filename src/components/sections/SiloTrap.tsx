"use client";

import { motion } from "framer-motion";
import { Coins, Link2Off, Bandage } from "lucide-react";
import Container from "@/components/ui/Container";
import HybridSection from "@/components/ui/HybridSection";

/**
 * The problem section. Brand-named "The Silo Trap" (intellectual property —
 * kept), with a plain-language subtitle right underneath. Wrapped in
 * HybridSection so it respects the user's theme preference.
 */

type Failure = {
  name: string;
  plain: string;
  description: string;
  icon: typeof Coins;
};

const FAILURES: Failure[] = [
  {
    name: "Fragmented Funding",
    plain: "Money chases symptoms, not systems.",
    description:
      "Grants target single problems in isolation. The water grant doesn't talk to the health grant. Communities apply for ten of them just to cover one need.",
    icon: Coins,
  },
  {
    name: "Restricted Interventions",
    plain: "Solutions designed in capitals don't survive villages.",
    description:
      "A pilot tests one variable. The real world has fifty. Programmes built without local complexity collapse the moment they meet it.",
    icon: Link2Off,
  },
  {
    name: "Band-Aid Solutions",
    plain: "When the funding ends, the problem comes back.",
    description:
      "Programmes that don't address root causes leave nothing behind. Two years later the same community is still waiting for the next intervention.",
    icon: Bandage,
  },
];

export default function SiloTrap() {
  return (
    <HybridSection variant="dark" id="the-silo-trap" padding="xl">
      {/* Subtle broken-grid pattern hints at the "fragmented" theme */}
      <div className="absolute inset-0 opacity-[0.07] pointer-events-none">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <pattern id="brokenGrid" width="10" height="10" patternUnits="userSpaceOnUse">
              <path
                d="M 0 0 L 0 10 M 10 0 L 10 10 M 0 0 L 10 0 M 0 10 L 10 10"
                stroke="currentColor"
                strokeWidth="0.3"
                fill="none"
                strokeDasharray="2 2"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#brokenGrid)" className="text-token-secondary" />
        </svg>
      </div>

      <Container className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mb-14"
        >
          <p className="text-xs uppercase tracking-[0.22em] font-semibold text-token-gold mb-4">
            The Problem
          </p>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-token-primary leading-[1.05] mb-5">
            The <span className="text-gradient-gold">Silo Trap</span>
          </h2>
          <p className="font-accent italic text-lg md:text-xl text-token-secondary max-w-[60ch] leading-snug">
            Why most solutions to big problems fail.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 mb-16">
          {FAILURES.map((f, index) => (
            <motion.article
              key={f.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="group h-full p-6 lg:p-8 rounded-2xl border bg-token-secondary backdrop-blur-sm
                         transition-all duration-300 hover:-translate-y-0.5
                         border-token-glass hover:border-gold-500/40 dark:hover:border-gold-400/50"
            >
              <div className="w-12 h-12 rounded-xl bg-gold-500/10 dark:bg-gold-400/10 flex items-center justify-center mb-6
                              transition-all duration-300 group-hover:bg-gold-500/20 dark:group-hover:bg-gold-400/20">
                <f.icon className="w-6 h-6 text-token-gold" aria-hidden="true" />
              </div>

              <h3 className="font-serif text-xl md:text-2xl font-bold text-token-primary mb-2 leading-tight">
                {f.name}
              </h3>
              <p className="font-accent italic text-base text-token-secondary mb-4 leading-snug">
                {f.plain}
              </p>
              <p className="text-token-secondary leading-relaxed text-sm md:text-base">
                {f.description}
              </p>
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <p className="font-serif text-xl md:text-2xl lg:text-3xl text-token-primary italic max-w-3xl mx-auto leading-relaxed">
            AnduBer acts as the{" "}
            <span className="text-token-teal not-italic font-semibold">connective tissue</span>,
            turning friction into flow.
          </p>
        </motion.div>
      </Container>
    </HybridSection>
  );
}
