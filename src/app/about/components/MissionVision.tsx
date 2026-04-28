"use client";

import { motion } from "framer-motion";
import { Target, Eye } from "lucide-react";
import Container from "@/components/ui/Container";
import { mission, vision } from "@/data/site";

/**
 * Mission + Vision panel. Two cards, plain-language one-liners up top so
 * the reader can decide whether to read the full sentence underneath.
 */

const ITEMS = [
  {
    Icon: Target,
    label: "Mission",
    plain: "What we do, day to day.",
    body: mission,
    tone: "teal" as const,
  },
  {
    Icon: Eye,
    label: "Vision",
    plain: "The world we&rsquo;re betting toward.",
    body: vision,
    tone: "gold" as const,
  },
];

const TONES = {
  teal: { text: "text-token-teal", bg: "bg-teal-500/10", border: "border-teal-500/30" },
  gold: { text: "text-token-gold", bg: "bg-gold-400/10", border: "border-gold-500/30" },
};

export default function MissionVision() {
  return (
    <section className="relative py-20 md:py-28 overflow-hidden bg-cream-100 dark:bg-plum-800">
      <Container className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          className="max-w-3xl mb-12"
        >
          <p className="text-xs uppercase tracking-[0.22em] font-semibold text-token-gold mb-4">
            What drives us
          </p>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-token-primary leading-[1.1]">
            Mission &amp; Vision
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {ITEMS.map((item, idx) => {
            const tone = TONES[item.tone];
            return (
              <motion.article
                key={item.label}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: idx * 0.1 }}
                className={`p-8 rounded-2xl border ${tone.border} ${tone.bg} backdrop-blur-sm`}
              >
                <div className="flex items-center gap-3 mb-5">
                  <span className={`w-10 h-10 rounded-xl flex items-center justify-center ${tone.bg}`}>
                    <item.Icon className={`w-5 h-5 ${tone.text}`} aria-hidden="true" />
                  </span>
                  <p className={`text-xs uppercase tracking-[0.18em] font-semibold ${tone.text}`}>
                    Our {item.label}
                  </p>
                </div>
                <p
                  className={`font-accent italic text-base md:text-lg leading-snug mb-4 ${tone.text}`}
                  dangerouslySetInnerHTML={{ __html: item.plain }}
                />
                <p className="text-base md:text-lg text-token-primary leading-relaxed">
                  {item.body}
                </p>
              </motion.article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
