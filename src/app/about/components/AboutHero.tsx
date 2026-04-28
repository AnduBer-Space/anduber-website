"use client";

import { motion } from "framer-motion";
import Container from "@/components/ui/Container";

/**
 * About hero. The name itself is the headline — Andu (people) + Ber (good),
 * a fusion of two African cultures — typeset as the visual centerpiece so
 * the etymology is the first thing visitors encounter.
 */
export default function AboutHero() {
  return (
    <section className="relative pt-36 pb-16 md:pt-44 md:pb-24 overflow-hidden bg-cream-50 dark:bg-plum-900">
      <div className="absolute inset-0 gradient-section-bg" />

      {/* Soft glows */}
      <div
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-30 pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(15, 118, 110, 0.18) 0%, transparent 70%)" }}
      />
      <div
        className="absolute bottom-1/4 right-1/4 w-[28rem] h-[28rem] rounded-full opacity-25 pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(184, 134, 11, 0.18) 0%, transparent 70%)" }}
      />

      <Container className="relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-xs uppercase tracking-[0.22em] font-semibold text-token-gold mb-5"
          >
            About AnduBer
          </motion.p>

          {/* The name as visual centerpiece */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-serif font-bold leading-none mb-8"
          >
            <h1 className="text-5xl md:text-7xl lg:text-8xl text-token-primary">
              <span className="text-token-gold">Andu</span>
              <span className="text-token-secondary opacity-40 mx-2">+</span>
              <span className="text-token-teal">Ber</span>
            </h1>
          </motion.div>

          {/* Etymology — the meaning, without naming the specific cultures */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="grid sm:grid-cols-2 gap-6 max-w-2xl mx-auto mb-10 text-left"
          >
            <div className="p-5 rounded-2xl border border-plum-200 dark:border-plum-700 bg-white/50 dark:bg-plum-800/40 backdrop-blur-sm">
              <p className="text-[10px] uppercase tracking-[0.2em] text-token-muted font-semibold mb-1">
                Andu
              </p>
              <p className="font-serif text-2xl text-token-gold mb-1">people</p>
              <p className="text-sm text-token-secondary italic font-accent leading-snug">
                The room we keep gathering — diverse, plural, unlikely.
              </p>
            </div>
            <div className="p-5 rounded-2xl border border-plum-200 dark:border-plum-700 bg-white/50 dark:bg-plum-800/40 backdrop-blur-sm">
              <p className="text-[10px] uppercase tracking-[0.2em] text-token-muted font-semibold mb-1">
                Ber
              </p>
              <p className="font-serif text-2xl text-token-teal mb-1">good</p>
              <p className="text-sm text-token-secondary italic font-accent leading-snug">
                The intention we won&rsquo;t compromise on.
              </p>
            </div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="font-accent italic text-lg md:text-xl text-token-secondary max-w-[60ch] mx-auto leading-snug"
          >
            A fusion of two African cultures — and our core belief: innovation
            happens at the intersection.
          </motion.p>
        </div>
      </Container>
    </section>
  );
}
