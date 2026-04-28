"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Container from "@/components/ui/Container";

/**
 * Closer for /our-work. Frames future case studies as a slot waiting for
 * the next project — without making it feel like a placeholder.
 */
export default function FutureProjects() {
  return (
    <section className="relative py-20 md:py-28 overflow-hidden bg-cream-50 dark:bg-plum-900">
      <Container className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          className="max-w-3xl"
        >
          <p className="text-xs uppercase tracking-[0.22em] font-semibold text-token-gold mb-4">
            What&rsquo;s next
          </p>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-token-primary leading-[1.1] mb-5">
            More to come
          </h2>
          <p className="font-accent italic text-base md:text-lg text-token-secondary leading-snug mb-3 max-w-[60ch]">
            We&rsquo;re working on projects across mental health, climate adaptation,
            community-owned infrastructure and informal-economy livelihoods.
          </p>
          <p className="text-base md:text-lg text-token-primary leading-relaxed max-w-[60ch] mb-8">
            Case studies land here when the work is mature enough to write
            about honestly — including the parts that didn&rsquo;t work the
            first time.
          </p>
          <Link
            href="/contact?intent=back"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full
                       bg-gold-400 text-plum-900 font-medium
                       transition-all duration-300 hover:bg-gold-300 hover:shadow-glow-gold
                       active:scale-95"
          >
            Bring us a project
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </Container>
    </section>
  );
}
