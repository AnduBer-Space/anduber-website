"use client";

import { motion } from "framer-motion";
import Container from "@/components/ui/Container";

/**
 * Our Approach hero. The methodology page is where the technical depth
 * lives, so the hero leads with the term and immediately follows with the
 * plain-language line for visitors who haven't met it yet.
 */
export default function ApproachHero() {
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
        <div className="max-w-4xl mx-auto">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-xs uppercase tracking-[0.22em] font-semibold text-token-gold mb-5"
          >
            Our Approach
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-serif font-bold text-4xl md:text-5xl lg:text-7xl text-token-primary leading-[1.05] mb-6"
          >
            Applied{" "}
            <span className="text-gradient-gold">Intersectionality</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="font-accent italic text-lg md:text-2xl text-token-secondary leading-snug max-w-[60ch] mb-6"
          >
            Our original methodology for solving entangled problems.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-base md:text-lg text-token-primary leading-relaxed max-w-[60ch]"
          >
            This is the page for funders, partners and field practitioners who
            want to dig in. The short version: most development work fails because
            it treats interlocking systems as separable. We don&rsquo;t.
          </motion.p>
        </div>
      </Container>
    </section>
  );
}
