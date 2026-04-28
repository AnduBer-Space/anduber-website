"use client";

import { motion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import Link from "next/link";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import HybridSection from "@/components/ui/HybridSection";
import ConstellationBackground from "@/components/sections/hero/ConstellationBackground";
import GrainOverlay from "@/components/ui/motion/GrainOverlay";
import MagneticButton from "@/components/ui/motion/MagneticButton";

/**
 * Homepage hero. The constellation in the background is the methodology made
 * visual. Wrapped in HybridSection variant="dark" so the visitor's theme
 * preference is respected — in force-light mode the hero flips to a cream
 * palette while keeping the same composition.
 */
export default function Hero() {
  return (
    <HybridSection
      variant="dark"
      padding="none"
      className="relative min-h-[100svh] flex items-center justify-center overflow-hidden"
    >
      <ConstellationBackground />
      {/* Subtle grain — adds tactile depth on the dark backdrop */}
      <GrainOverlay opacity={0.05} />

      <Container className="relative z-10 pt-32 pb-24 md:pt-36 md:pb-28">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full
                       border border-token-glass bg-token-secondary backdrop-blur-sm
                       text-token-gold text-xs uppercase tracking-[0.18em] mb-8"
          >
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: "var(--accent-gold)" }}
              aria-hidden="true"
            />
            <span>People + Good</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.05 }}
            className="font-serif font-bold leading-[1.05] tracking-tight
                       text-4xl sm:text-5xl md:text-6xl lg:text-7xl
                       text-token-primary"
          >
            An Engine for{" "}
            <span className="text-gradient-gold">Applied Imagination</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="font-accent italic text-lg sm:text-xl md:text-2xl
                       text-token-secondary mt-7 mx-auto max-w-[52ch] leading-snug"
          >
            We solve complex problems by uniting people who don&rsquo;t normally
            work together, and turning their ideas into systems that last.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
          >
            <MagneticButton strength={10}>
              <Link href="#how-we-work" scroll={true}>
                <Button variant="primary" size="lg">
                  See how we work
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </MagneticButton>
            <MagneticButton strength={10}>
              <Link href="/contact">
                <Button variant="outline" size="lg">
                  Partner with us
                </Button>
              </Link>
            </MagneticButton>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-12 text-token-muted italic text-sm md:text-base"
          >
            &ldquo;From friction to flow.&rdquo;
          </motion.p>
        </div>
      </Container>

      <motion.a
        href="#the-silo-trap"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10
                   flex flex-col items-center gap-2 text-token-secondary
                   hover:text-token-gold transition-colors duration-300
                   focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-2 rounded"
        aria-label="Scroll to learn how we work"
      >
        <span className="font-accent italic text-sm">How does it work?</span>
        <ChevronDown
          className="w-5 h-5 animate-bounce"
          style={{ animationDuration: "2.4s" }}
          aria-hidden="true"
        />
      </motion.a>
    </HybridSection>
  );
}
