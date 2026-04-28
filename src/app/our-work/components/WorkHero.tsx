"use client";

import { motion } from "framer-motion";
import Container from "@/components/ui/Container";

export default function WorkHero() {
  return (
    <section className="relative pt-36 pb-12 md:pt-44 md:pb-20 overflow-hidden bg-cream-50 dark:bg-plum-900">
      <div className="absolute inset-0 gradient-section-bg" />

      <div
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-30 pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(15, 118, 110, 0.18) 0%, transparent 70%)" }}
      />
      <div
        className="absolute bottom-1/4 right-1/4 w-[28rem] h-[28rem] rounded-full opacity-25 pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(184, 134, 11, 0.18) 0%, transparent 70%)" }}
      />

      <Container className="relative z-10">
        <div className="max-w-4xl">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-xs uppercase tracking-[0.22em] font-semibold text-token-gold mb-5"
          >
            Our Work
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-serif font-bold text-4xl md:text-5xl lg:text-6xl text-token-primary leading-[1.05] mb-5"
          >
            What this looks like in practice
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="font-accent italic text-lg md:text-xl text-token-secondary leading-snug max-w-[60ch]"
          >
            Two projects, both built by The Good Labs. Different shapes — same
            methodology. Real numbers, written by the people who wrote the
            project plan.
          </motion.p>
        </div>
      </Container>
    </section>
  );
}
