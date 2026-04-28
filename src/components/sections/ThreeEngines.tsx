"use client";

import { motion } from "framer-motion";
import Container from "@/components/ui/Container";
import HybridSection from "@/components/ui/HybridSection";
import OrbitalEngines from "@/components/sections/engines/OrbitalEngines";

/**
 * "Three engines, one ecosystem". Dark in hybrid, follows preference in
 * forced modes. Internal text uses theme tokens so the section reads
 * cleanly in light mode too.
 */
export default function ThreeEngines() {
  return (
    <HybridSection variant="dark" id="three-engines" padding="xl">
      <Container className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mb-12 lg:mb-16"
        >
          <p className="text-xs uppercase tracking-[0.22em] font-semibold text-token-gold mb-4">
            How we work
          </p>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-token-primary leading-[1.1] mb-5">
            Three engines, one{" "}
            <span className="text-gradient-gold">ecosystem</span>
          </h2>
          <p className="font-accent italic text-lg md:text-xl text-token-secondary leading-snug max-w-[60ch]">
            How AnduBer turns ideas into lasting impact.
          </p>
        </motion.div>

        <OrbitalEngines />
      </Container>
    </HybridSection>
  );
}
