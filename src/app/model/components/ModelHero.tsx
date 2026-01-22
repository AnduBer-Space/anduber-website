"use client";

import { motion } from "framer-motion";
import { Network } from "lucide-react";
import Container from "@/components/ui/Container";

export default function ModelHero() {
  return (
    <section className="relative pt-32 pb-16 overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(135deg, #1E0A14 0%, #2A0E1A 50%, #1E0A14 100%)",
        }}
      />

      {/* Decorative glows */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full"
        style={{ background: "radial-gradient(circle, rgba(212, 170, 106, 0.15) 0%, transparent 70%)" }}
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full"
        style={{ background: "radial-gradient(circle, rgba(26, 123, 122, 0.15) 0%, transparent 70%)" }}
        animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 10, repeat: Infinity }}
      />

      {/* Network decoration */}
      <svg
        className="absolute inset-0 w-full h-full opacity-10 pointer-events-none"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="modelLineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1A7B7A" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#D4AA6A" stopOpacity="0.5" />
          </linearGradient>
        </defs>
        <path
          d="M 10 30 Q 30 10 50 30 T 90 30"
          stroke="url(#modelLineGrad)"
          strokeWidth="0.2"
          fill="none"
        />
        <path
          d="M 10 70 Q 30 50 50 70 T 90 70"
          stroke="url(#modelLineGrad)"
          strokeWidth="0.2"
          fill="none"
        />
      </svg>

      <Container className="relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold-400/10 border border-gold-400/30 text-gold-400 text-sm font-medium mb-6"
          >
            <Network className="w-4 h-4" />
            <span>Our Methodology</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-cream-200 mb-6"
          >
            The AnduBer <span className="text-gradient-gold">Model</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-cream-300 max-w-3xl mx-auto"
          >
            Applied Intersectionality is our core methodology&mdash;a systematic approach
            to dismantling silos and building resilient solutions through the collision
            of diverse perspectives.
          </motion.p>
        </div>
      </Container>
    </section>
  );
}
