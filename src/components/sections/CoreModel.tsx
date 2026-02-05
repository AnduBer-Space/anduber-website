"use client";

import { motion } from "framer-motion";
import { ArrowRight, Users, Lightbulb, Shield } from "lucide-react";
import Container from "@/components/ui/Container";
import { coreHypothesis } from "@/data/site";

export default function CoreModel() {
  const hypothesisSteps = [
    { key: "premise", icon: Users, text: coreHypothesis.premise, color: "teal" as const },
    { key: "method", icon: Lightbulb, text: coreHypothesis.method, color: "gold" as const },
    { key: "result", icon: Shield, text: coreHypothesis.result, color: "teal" as const },
    { key: "outcome", icon: ArrowRight, text: coreHypothesis.outcome, color: "gold" as const },
  ];

  return (
    <section className="relative py-24 lg:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-plum-900 via-plum-800 to-plum-900" />

      {/* Decorative elements - static */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-1/4 -left-20 w-80 h-80 rounded-full opacity-40"
          style={{ background: "radial-gradient(circle, rgba(26, 123, 122, 0.1) 0%, transparent 70%)" }}
        />
        <div
          className="absolute bottom-1/4 -right-20 w-96 h-96 rounded-full opacity-30"
          style={{ background: "radial-gradient(circle, rgba(212, 170, 106, 0.1) 0%, transparent 70%)" }}
        />
      </div>

      <Container className="relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-gold-400/10 border border-gold-400/30 text-gold-400 text-sm font-medium mb-6">
            Our Core Model
          </span>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-cream-200 mb-6">
            Applied <span className="text-gradient-gold">Intersectionality</span>
          </h2>
          <p className="text-lg text-cream-300 max-w-3xl mx-auto">
            This is the engine that powers everything we do. A hypothesis that guides our work
            and drives our impact.
          </p>
        </motion.div>

        {/* The Hypothesis Flow */}
        <div className="relative max-w-5xl mx-auto">
          {/* Flow diagram */}
          <div className="space-y-6">
            {hypothesisSteps.map((step, index) => (
              <motion.div
                key={step.key}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="relative"
              >
                <div className={`
                  flex items-start gap-6 p-6 rounded-2xl
                  border backdrop-blur-sm
                  ${step.color === "teal"
                    ? "border-teal-500/30 bg-teal-500/5"
                    : "border-gold-400/30 bg-gold-400/5"
                  }
                  ${index % 2 === 0 ? "lg:mr-24" : "lg:ml-24"}
                `}>
                  <div className={`
                    flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center
                    ${step.color === "teal" ? "bg-teal-500/20 text-teal-400" : "bg-gold-400/20 text-gold-400"}
                  `}>
                    <step.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-lg text-cream-200 leading-relaxed">{step.text}</p>
                  </div>
                </div>

                {/* Connector */}
                {index < hypothesisSteps.length - 1 && (
                  <motion.div
                    initial={{ scaleY: 0 }}
                    whileInView={{ scaleY: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.2 + 0.3 }}
                    className={`
                      absolute left-12 w-0.5 h-6 origin-top
                      ${step.color === "teal" ? "bg-teal-500/50" : "bg-gold-400/50"}
                    `}
                    style={{ top: "100%" }}
                  />
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Central Outcome */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 1 }}
          className="mt-16 text-center"
        >
          <div className="inline-block p-8 rounded-3xl glass-card border border-teal-500/30">
            <p className="font-serif text-2xl md:text-3xl text-cream-200 italic">
              &ldquo;A world where challenges are met with systemic innovation that leaves no one behind.&rdquo;
            </p>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
