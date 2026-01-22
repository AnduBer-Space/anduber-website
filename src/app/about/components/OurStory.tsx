"use client";

import { motion } from "framer-motion";
import Container from "@/components/ui/Container";

export default function OurStory() {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-plum-900 via-plum-800 to-plum-900" />

      <Container className="relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-2 rounded-full bg-gold-400/10 border border-gold-400/30 text-gold-400 text-sm font-medium mb-6">
              Our Story
            </span>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-cream-200 mb-4">
              The Birth of <span className="text-gradient-gold">AnduBer</span>
            </h2>
          </motion.div>

          {/* Story content */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass-card p-8 rounded-2xl"
            >
              <p className="text-lg text-cream-300 leading-relaxed">
                AnduBer was born from a realization: the world&apos;s biggest challenges&mdash;pandemics,
                climate change, inequality&mdash;are entangled. Yet, the systems designed to solve
                them are fragmented.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="glass-card p-8 rounded-2xl border-l-4 border-teal-500"
            >
              <p className="text-lg text-cream-300 leading-relaxed">
                Scientists don&apos;t talk to artists. Policymakers don&apos;t listen to communities.
                This <span className="text-teal-400 font-semibold">linear thinking</span> leads
                to &ldquo;band-aid&rdquo; solutions that collapse when funding ends, leaving root causes unaddressed.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="glass-card p-8 rounded-2xl border-l-4 border-gold-400"
            >
              <p className="text-lg text-cream-300 leading-relaxed">
                We decided to try something different. What if we collided &ldquo;unusual suspects&rdquo;&mdash;poets
                with policymakers, elders with engineers, artists with scientists? What if we equipped
                them with <span className="text-gold-400 font-semibold">systems-thinking tools</span> and
                let them reimagine how the world works?
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-center py-8"
            >
              <p className="font-serif text-2xl md:text-3xl text-cream-200 italic">
                &ldquo;AnduBer acts as the connective tissue,
                <br />
                <span className="text-teal-400">turning friction</span> into{" "}
                <span className="text-gold-400">flow</span>.&rdquo;
              </p>
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  );
}
