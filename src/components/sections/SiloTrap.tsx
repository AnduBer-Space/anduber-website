"use client";

import { motion } from "framer-motion";
import { AlertTriangle, Link2Off, Bandage, Coins } from "lucide-react";
import Container from "@/components/ui/Container";
import { siloProblems } from "@/data/site";

const problemIcons = [Coins, Link2Off, Bandage];

export default function SiloTrap() {
  return (
    <section className="relative py-24 lg:py-32 overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(180deg, #1E0A14 0%, #2A0E1A 50%, #1E0A14 100%)",
        }}
      />

      {/* Decorative broken grid pattern */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <pattern id="brokenGrid" width="10" height="10" patternUnits="userSpaceOnUse">
              <path
                d="M 0 0 L 0 10 M 10 0 L 10 10 M 0 0 L 10 0 M 0 10 L 10 10"
                stroke="#3D1525"
                strokeWidth="0.3"
                fill="none"
                strokeDasharray="2 2"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#brokenGrid)" />
        </svg>
      </div>

      <Container className="relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 text-sm font-medium mb-6"
          >
            <AlertTriangle className="w-4 h-4" />
            <span>The Challenge</span>
          </motion.div>

          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-cream-200 mb-6">
            The <span className="text-red-400">Silo Trap</span>
          </h2>

          <p className="text-lg text-cream-300 max-w-3xl mx-auto mb-8">
            The world&apos;s biggest challenges&mdash;pandemics, climate change, inequality&mdash;are
            entangled. Yet, the systems designed to solve them are fragmented.
          </p>

          <div className="max-w-2xl mx-auto p-6 rounded-2xl border border-plum-700 bg-plum-800/50">
            <p className="text-cream-300">
              Scientists don&apos;t talk to artists. Policymakers don&apos;t listen to communities.
              This <span className="text-red-400 font-semibold">linear thinking</span> leads to
              &quot;band-aid&quot; solutions.
            </p>
          </div>
        </motion.div>

        {/* Problems Grid */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 mb-16">
          {siloProblems.map((problem, index) => {
            const Icon = problemIcons[index];
            return (
              <motion.div
                key={problem.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className="group"
              >
                <div className="h-full p-6 lg:p-8 rounded-2xl border border-plum-700 bg-plum-800/30 backdrop-blur-sm transition-all duration-300 hover:border-red-500/30 hover:bg-red-500/5">
                  <div className="w-14 h-14 rounded-2xl bg-red-500/10 flex items-center justify-center mb-6 transition-all duration-300 group-hover:bg-red-500/20">
                    <Icon className="w-7 h-7 text-red-400" />
                  </div>

                  <h3 className="font-serif text-xl font-bold text-cream-200 mb-3">
                    {problem.title}
                  </h3>

                  <p className="text-cream-300 leading-relaxed">
                    {problem.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Solution Teaser */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="inline-block p-8 rounded-3xl border border-teal-500/30 bg-teal-500/5 backdrop-blur-sm">
            <p className="font-serif text-xl md:text-2xl text-cream-200 italic">
              &ldquo;AnduBer acts as the <span className="text-teal-400">connective tissue</span>,
              turning friction into flow.&rdquo;
            </p>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
