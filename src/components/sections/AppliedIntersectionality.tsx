"use client";

import { motion } from "framer-motion";
import Container from "@/components/ui/Container";
import HybridSection from "@/components/ui/HybridSection";
import IntersectionalityDiagram from "@/components/sections/intersectionality/IntersectionalityDiagram";

/**
 * Homepage methodology section. Light cream background creates visual
 * contrast with the dark hero + Silo Trap that come before. The interactive
 * diagram demonstrates the methodology; the surrounding copy explains it
 * plainly so visitors who don't engage with the diagram still leave with the
 * concept.
 */
export default function AppliedIntersectionality() {
  return (
    <HybridSection variant="light" id="applied-intersectionality" padding="xl">
      <Container className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mb-14 lg:mb-20"
        >
          <p className="text-xs uppercase tracking-[0.22em] font-semibold text-token-gold mb-4">
            Our Methodology
          </p>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-token-primary leading-[1.05] mb-5">
            Applied{" "}
            <span className="text-gradient-gold">Intersectionality</span>
          </h2>
          <p className="font-accent italic text-lg md:text-xl text-token-secondary max-w-[60ch] leading-snug">
            Our original methodology for solving entangled problems.
          </p>
        </motion.div>

        <IntersectionalityDiagram />
      </Container>
    </HybridSection>
  );
}
