"use client";

import { motion } from "framer-motion";
import {
  Zap,
  Lightbulb,
  Shield,
  Users,
  Network,
  Heart,
} from "lucide-react";
import Container from "@/components/ui/Container";

const values = [
  {
    icon: Zap,
    title: "Radical Collision",
    description:
      "We bring together 'unusual suspects'—poets with policymakers, elders with engineers—because innovation happens at the intersection.",
    color: "teal",
  },
  {
    icon: Lightbulb,
    title: "Applied Imagination",
    description:
      "We don't just dream—we equip teams with systems-thinking tools to turn 'what if' into 'how to'.",
    color: "gold",
  },
  {
    icon: Shield,
    title: "Systemic Resilience",
    description:
      "We design solutions that address interconnected issues simultaneously, building community-owned and self-sustaining systems.",
    color: "copper",
  },
  {
    icon: Users,
    title: "Community Ownership",
    description:
      "We work with communities, not for them. Local ownership drives lasting impact and prevents dependency.",
    color: "teal",
  },
  {
    icon: Network,
    title: "Connective Tissue",
    description:
      "We act as the bridge between silos—turning friction into flow across disciplines, cultures, and sectors.",
    color: "gold",
  },
  {
    icon: Heart,
    title: "Human-Centric Design",
    description:
      "Every solution starts and ends with people. Dignity, equity, and inclusion are non-negotiable.",
    color: "copper",
  },
];

const colorStyles = {
  teal: {
    bg: "bg-teal-500/10",
    border: "border-teal-500/30",
    iconBg: "bg-teal-500/20",
    text: "text-teal-400",
  },
  gold: {
    bg: "bg-gold-400/10",
    border: "border-gold-400/30",
    iconBg: "bg-gold-400/20",
    text: "text-gold-400",
  },
  copper: {
    bg: "bg-gold-600/10",
    border: "border-gold-600/30",
    iconBg: "bg-gold-600/20",
    text: "text-gold-600",
  },
};

export default function CoreValues() {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-plum-800 via-plum-900 to-plum-800" />

      <Container className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-gold-400/10 border border-gold-400/30 text-gold-400 text-sm font-medium mb-6">
            Our Foundation
          </span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-cream-200 mb-4">
            Core <span className="text-gradient-gold">Values</span>
          </h2>
          <div className="divider-gold" />
          <p className="mt-6 text-lg text-cream-300 max-w-2xl mx-auto">
            These principles guide every decision we make and every solution we build.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {values.map((value, index) => {
            const styles = colorStyles[value.color as keyof typeof colorStyles];
            return (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group"
              >
                <div
                  className={`
                    h-full p-6 rounded-2xl
                    ${styles.bg} border ${styles.border}
                    backdrop-blur-sm
                    transition-all duration-300
                    hover:border-opacity-60 hover:translate-y-[-4px]
                  `}
                >
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-xl ${styles.iconBg} transition-colors`}>
                      <value.icon className={`w-6 h-6 ${styles.text}`} />
                    </div>
                    <div>
                      <h3 className={`font-serif text-xl font-bold ${styles.text} mb-2`}>
                        {value.title}
                      </h3>
                      <p className="text-cream-300 text-sm leading-relaxed">
                        {value.description}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
