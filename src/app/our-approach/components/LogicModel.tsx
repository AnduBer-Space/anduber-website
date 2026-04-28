"use client";

import { motion } from "framer-motion";
import Container from "@/components/ui/Container";

/**
 * Standard logic-model diagram (INPUTS → ACTIVITIES → OUTPUTS → OUTCOMES →
 * IMPACT) presented as a flow that funders can quote in their board decks.
 * Designed organically so it reads as a living chain of cause, not a
 * five-cell spreadsheet.
 */

type Stage = {
  label: string;
  question: string;
  items: string[];
  /** Hue for the node ring. */
  hue: string;
};

const STAGES: Stage[] = [
  {
    label: "Inputs",
    question: "What we put in.",
    items: [
      "Multi-disciplinary collective",
      "Methodology toolkit",
      "Catalytic capital",
      "Community partnerships",
    ],
    hue: "#0F766E",
  },
  {
    label: "Activities",
    question: "What we do.",
    items: [
      "Convening unlikely rooms",
      "Systems-mapping sprints",
      "Co-design with communities",
      "Prototyping in-field",
    ],
    hue: "#1A7B7A",
  },
  {
    label: "Outputs",
    question: "What we ship.",
    items: [
      "Operational systems",
      "Frameworks & playbooks",
      "Founder cohorts",
      "Strategy + governance plans",
    ],
    hue: "#B8860B",
  },
  {
    label: "Outcomes",
    question: "What changes within 3 years.",
    items: [
      "Local ownership transfers",
      "Operating costs down ≥ 50%",
      "Cross-system co-benefits",
      "Replication by peers",
    ],
    hue: "#D4AA6A",
  },
  {
    label: "Impact",
    question: "What we&rsquo;re betting toward.",
    items: [
      "Resilient communities",
      "Closed gender gaps in voice",
      "Climate-adaptive systems",
      "Intersectional public sector",
    ],
    hue: "#a87545",
  },
];

export default function LogicModel() {
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
            Logic model
          </p>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-token-primary leading-[1.1] mb-5">
            From inputs to impact
          </h2>
          <p className="font-accent italic text-lg md:text-xl text-token-secondary leading-snug max-w-[60ch]">
            The chain we ask funders to evaluate us on.
          </p>
        </motion.div>

        {/* Mobile + tablet: vertical flow. Desktop: horizontal flow with linking line. */}
        <div className="relative">
          {/* Linking line for desktop, behind the cards */}
          <svg
            aria-hidden="true"
            className="hidden lg:block absolute inset-x-0 top-[64px] w-full h-12 pointer-events-none"
            viewBox="0 0 100 6"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="logicFlow" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#0F766E" />
                <stop offset="50%" stopColor="#B8860B" />
                <stop offset="100%" stopColor="#a87545" />
              </linearGradient>
            </defs>
            <motion.path
              d="M 4 3 Q 25 0 50 3 T 96 3"
              stroke="url(#logicFlow)"
              strokeWidth="0.4"
              fill="none"
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 0.55 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 1.6, ease: "easeOut" }}
            />
          </svg>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            {STAGES.map((s, idx) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                className="relative"
              >
                {/* Node */}
                <div className="flex items-center gap-3 mb-4">
                  <span
                    className="relative z-10 w-12 h-12 rounded-full ring-2 flex items-center justify-center font-serif font-bold text-base"
                    style={{
                      borderColor: s.hue,
                      backgroundColor: "var(--bg-primary)",
                      color: s.hue,
                      boxShadow: `0 0 0 4px var(--bg-primary)`,
                    }}
                    aria-hidden="true"
                  >
                    {idx + 1}
                  </span>
                  <p
                    className="text-[11px] uppercase tracking-[0.22em] font-semibold"
                    style={{ color: s.hue }}
                  >
                    {s.label}
                  </p>
                </div>

                <p
                  className="font-accent italic text-sm md:text-base text-token-secondary leading-snug mb-4"
                  dangerouslySetInnerHTML={{ __html: s.question }}
                />

                <ul className="space-y-2">
                  {s.items.map((it) => (
                    <li
                      key={it}
                      className="text-sm text-token-primary leading-snug flex gap-2"
                    >
                      <span
                        aria-hidden="true"
                        className="mt-1 w-1.5 h-1.5 rounded-full shrink-0"
                        style={{ background: s.hue }}
                      />
                      <span>{it}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          className="font-accent italic text-base md:text-lg text-token-secondary mt-12 max-w-[60ch] leading-snug"
        >
          We negotiate every engagement against this chain. If a funder wants
          us to optimise for an output we don&rsquo;t believe ladders up to a
          real outcome, we say so before the contract is signed.
        </motion.p>
      </Container>
    </section>
  );
}
