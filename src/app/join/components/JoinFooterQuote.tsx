"use client";

import { motion } from "framer-motion";
import Container from "@/components/ui/Container";
import { Quote } from "lucide-react";

export default function JoinFooterQuote() {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-plum-800 to-plum-900" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full glow-gold opacity-10 blur-3xl" />

      <Container className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center"
        >
          <Quote className="w-12 h-12 text-gold-400/50 mx-auto mb-8" />

          <blockquote className="text-xl md:text-2xl lg:text-3xl font-serif text-cream-200 leading-relaxed mb-8">
            We believe the next world-changing idea is just as likely to come from a teenager in Kibera as a professor in a lab. Wherever you are, whatever you have to offer—
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-400 to-teal-400">
              there&apos;s a place for you here.
            </span>
          </blockquote>

          <div className="flex items-center justify-center gap-4">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-gold-400/50" />
            <span className="text-cream-300 text-sm uppercase tracking-wider">AnduBer</span>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-gold-400/50" />
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
