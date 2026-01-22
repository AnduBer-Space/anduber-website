"use client";

import { motion } from "framer-motion";
import Container from "@/components/ui/Container";

export default function BlogHero() {
  return (
    <section className="relative pt-32 pb-16 overflow-hidden bg-plum-900">
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gold-500/10 rounded-full blur-3xl" />
      </div>

      <Container className="relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block px-4 py-2 rounded-full bg-teal-500/20 text-teal-400 text-sm font-medium mb-6"
          >
            Stories & Insights
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-cream-50 mb-6"
          >
            Our <span className="text-gradient-gold">Blog</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-plum-200 max-w-3xl mx-auto"
          >
            Insights, updates, and stories from our work with communities across
            East Africa. Learn about our projects, governance approach, and the
            people making change happen.
          </motion.p>
        </div>
      </Container>
    </section>
  );
}
