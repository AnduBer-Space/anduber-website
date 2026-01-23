"use client";

import { motion } from "framer-motion";
import Container from "@/components/ui/Container";

export default function JoinHero() {
  return (
    <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden pt-24 pb-16">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-plum-900 via-plum-800 to-plum-900" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full glow-teal opacity-30 blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full glow-gold opacity-20 blur-3xl" />

      <Container className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto"
        >
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-block text-teal-400 text-sm uppercase tracking-[0.2em] mb-4"
          >
            Build With Us
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-4xl md:text-5xl lg:text-6xl font-serif text-cream-200 mb-6"
          >
            Join the{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-400 to-teal-400">
              Movement
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-xl md:text-2xl text-cream-300 max-w-3xl mx-auto leading-relaxed"
          >
            The challenges of our time need all of us. Here&apos;s how you can contribute.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-8 flex flex-wrap justify-center gap-4 text-sm text-cream-300/70"
          >
            <span className="px-3 py-1 rounded-full border border-teal-500/30 bg-teal-500/10">
              8 Ways to Contribute
            </span>
            <span className="px-3 py-1 rounded-full border border-gold-400/30 bg-gold-400/10">
              All Skill Levels Welcome
            </span>
            <span className="px-3 py-1 rounded-full border border-teal-500/30 bg-teal-500/10">
              Remote Friendly
            </span>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
