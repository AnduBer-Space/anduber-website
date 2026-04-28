"use client";

import { motion } from "framer-motion";
import Container from "@/components/ui/Container";

/**
 * Origin story for the About page. Frames AnduBer as a bet someone made
 * after watching a pattern of failure — fragmented, single-discipline
 * solutions to deeply entangled problems.
 */
export default function OurStory() {
  return (
    <section className="relative py-20 md:py-28 overflow-hidden bg-cream-50 dark:bg-plum-900">
      <div className="absolute inset-0 gradient-section-vertical" />

      <Container className="relative z-10">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            className="mb-12"
          >
            <p className="text-xs uppercase tracking-[0.22em] font-semibold text-token-gold mb-4">
              Our Story
            </p>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-token-primary leading-[1.1] mb-5">
              The bet behind <span className="text-gradient-gold">AnduBer</span>
            </h2>
            <p className="font-accent italic text-lg md:text-xl text-token-secondary leading-snug max-w-[60ch]">
              Why a veterinarian started a social enterprise.
            </p>
          </motion.div>

          <div className="space-y-6 text-token-primary text-base md:text-lg leading-relaxed prose-readable">
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
            >
              The world&rsquo;s biggest problems &mdash; pandemics, climate change,
              inequality &mdash; are entangled. The systems built to solve them
              are not. Scientists don&rsquo;t talk to artists. Policymakers
              don&rsquo;t listen to communities. Donor reports reward outputs
              the field already knows are the wrong outputs.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ delay: 0.1 }}
              className="border-l-2 border-gold-500/60 pl-5"
            >
              We started AnduBer because we&rsquo;d watched this pattern enough
              times to be sure of two things: nobody was coming to fix it, and
              the people who could were already in the village &mdash; just not
              in the same room as the people writing the cheques.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ delay: 0.2 }}
            >
              So we built a methodology around bringing them together &mdash;
              <em> Applied Intersectionality</em> &mdash; and an organisation
              shaped to pay for itself: a consultancy that funds the
              experiments, an R&amp;D lab that ships the prototypes, a venture
              arm that backs the founders the standard pipeline overlooks.
              Three engines, one ecosystem.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ delay: 0.3 }}
              className="font-serif italic text-xl md:text-2xl text-token-primary pt-4"
            >
              &ldquo;We turn friction into flow &mdash; and &lsquo;what if&rsquo; into &lsquo;how to&rsquo;.&rdquo;
            </motion.p>
          </div>
        </div>
      </Container>
    </section>
  );
}
