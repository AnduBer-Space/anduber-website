"use client";

import { motion } from "framer-motion";
import Container from "@/components/ui/Container";

/**
 * The longer-form intellectual case. Names Kimberlé Crenshaw and explains
 * how AnduBer extends her framework from people to systems. This is the
 * content funders and academic partners read carefully.
 */
export default function CrenshawExtension() {
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
              The intellectual lineage
            </p>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-token-primary leading-[1.1] mb-5">
              From <span className="text-token-teal">people</span> to <span className="text-token-gold">systems</span>
            </h2>
            <p className="font-accent italic text-lg md:text-xl text-token-secondary leading-snug">
              We extend Kimberlé Crenshaw&rsquo;s intersectionality from
              identity to infrastructure.
            </p>
          </motion.div>

          <div className="space-y-7 text-base md:text-lg text-token-primary leading-relaxed prose-readable">
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
            >
              Intersectionality, as Crenshaw introduced it in 1989, is the insight
              that human experience cannot be neatly partitioned by category. A
              Black woman is not the sum of being Black and being a woman; the
              compound of those positions creates conditions invisible to either
              lens alone.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ delay: 0.1 }}
            >
              The same logic, we argue, holds for the systems people live inside.
              Water is not a hydrology problem; it is a hydrology problem
              compounded with governance, gender, climate, livelihoods and health.
              Pull on one strand and the others move.
            </motion.p>

            <motion.blockquote
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ delay: 0.2 }}
              className="border-l-4 border-gold-500/70 pl-5 md:pl-6 py-2 my-2"
            >
              <p className="font-serif italic text-xl md:text-2xl leading-snug">
                Solve one problem in isolation and the others pull it back into
                the failure mode it came from.
              </p>
            </motion.blockquote>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ delay: 0.3 }}
            >
              <strong>Applied Intersectionality</strong> is the operational form
              of that observation. It says: design the team to match the shape
              of the problem. Map the system before you touch the budget. Build
              for the whole web, not one strand. Hand it off when ownership can
              hold it. Measure outcomes, not outputs.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ delay: 0.4 }}
            >
              In practice the methodology resolves into three operational
              movements (input, process, output) we call the{" "}
              <em>Theory of Change</em> — and a logic model that lets us tell
              funders, with a straight face, what their money is being asked
              to do.
            </motion.p>
          </div>
        </div>
      </Container>
    </section>
  );
}
