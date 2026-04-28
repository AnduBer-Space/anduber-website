"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";
import Container from "@/components/ui/Container";
import HybridSection from "@/components/ui/HybridSection";
import { siteConfig } from "@/data/site";

/**
 * Newsletter teaser. Drives readers to the LinkedIn newsletter "Common Sense
 * is Not Common" or the on-site /blog index.
 */
export default function InsightsTeaser() {
  return (
    <HybridSection variant="dark" id="insights" padding="xl">
      <Container className="relative z-10">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-xs uppercase tracking-[0.22em] font-semibold text-gold-400 mb-4">
              Insights
            </p>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-cream-200 leading-[1.1] mb-5">
              Common Sense is{" "}
              <span className="text-gradient-gold">Not Common</span>
            </h2>
            <p className="font-accent italic text-lg md:text-xl text-cream-300/90 leading-snug mb-6 max-w-[60ch]">
              Honest takes on what works and what doesn&rsquo;t in development.
            </p>
            <p className="text-base md:text-lg text-cream-300/80 leading-relaxed mb-8 max-w-[60ch]">
              A LinkedIn newsletter from the AnduBer collective. Field notes, hot takes,
              and the occasional tantrum about why obvious things aren&rsquo;t obvious in
              the rooms where decisions get made.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href={siteConfig.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full
                           bg-gold-400 text-plum-900 font-medium
                           transition-all duration-300 hover:bg-gold-300 hover:shadow-glow-gold
                           active:scale-95"
              >
                Read on LinkedIn
                <ExternalLink className="w-4 h-4" />
              </a>
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full
                           border-2 border-cream-200/40 text-cream-200
                           transition-all duration-300 hover:border-gold-400 hover:text-gold-300"
              >
                Browse essays
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative"
          >
            <div className="rounded-3xl border border-plum-700 bg-plum-800/40 backdrop-blur-sm p-8 md:p-10 shadow-2xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-2 h-2 rounded-full bg-gold-400" />
                <span className="text-xs uppercase tracking-[0.18em] text-gold-300 font-semibold">
                  Latest Edition
                </span>
              </div>
              <h3 className="font-serif text-xl md:text-2xl text-cream-200 leading-snug mb-4">
                &ldquo;If we&rsquo;re still measuring boreholes drilled, we&rsquo;ve already lost.&rdquo;
              </h3>
              <p className="text-sm text-cream-300/80 leading-relaxed mb-6">
                A short note on outputs vs. outcomes, and why donor reports keep
                rewarding the wrong thing.
              </p>
              <div className="flex items-center justify-between text-xs text-cream-300/60">
                <span>3 min read</span>
                <span aria-hidden="true">•</span>
                <span>Field notes</span>
              </div>
            </div>
            {/* Decorative accent */}
            <div
              aria-hidden="true"
              className="absolute -top-6 -right-6 w-24 h-24 rounded-full opacity-50 pointer-events-none"
              style={{
                background:
                  "radial-gradient(circle, rgba(212, 170, 106, 0.4) 0%, transparent 70%)",
              }}
            />
          </motion.div>
        </div>
      </Container>
    </HybridSection>
  );
}
