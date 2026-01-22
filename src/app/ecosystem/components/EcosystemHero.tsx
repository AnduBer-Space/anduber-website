"use client";

import { motion } from "framer-motion";
import { Cog } from "lucide-react";
import Container from "@/components/ui/Container";

export default function EcosystemHero() {
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
        className="absolute top-1/3 left-1/4 w-96 h-96 rounded-full"
        style={{ background: "radial-gradient(circle, rgba(26, 123, 122, 0.15) 0%, transparent 70%)" }}
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div
        className="absolute top-1/2 right-1/4 w-80 h-80 rounded-full"
        style={{ background: "radial-gradient(circle, rgba(212, 170, 106, 0.15) 0%, transparent 70%)" }}
        animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 10, repeat: Infinity, delay: 2 }}
      />
      <motion.div
        className="absolute bottom-1/4 left-1/3 w-72 h-72 rounded-full"
        style={{ background: "radial-gradient(circle, rgba(201, 149, 108, 0.15) 0%, transparent 70%)" }}
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 9, repeat: Infinity, delay: 4 }}
      />

      <Container className="relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-400 text-sm font-medium mb-6"
          >
            <Cog className="w-4 h-4" />
            <span>How We Work</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-cream-200 mb-6"
          >
            The AnduBer <span className="text-gradient-gold">Ecosystem</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-cream-300 max-w-3xl mx-auto"
          >
            Three symbiotic engines working together in a continuous cycle of sustainability
            and social impact. Each arm powers the others, creating a self-reinforcing flywheel
            of innovation and change.
          </motion.p>
        </div>
      </Container>
    </section>
  );
}
