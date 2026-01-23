"use client";

import { motion } from "framer-motion";
import { Target, Eye, Lightbulb } from "lucide-react";
import Container from "@/components/ui/Container";
import { mission, vision } from "@/data/site";

const items = [
  {
    icon: Target,
    title: "Our Mission",
    description: mission,
    color: "teal",
  },
  {
    icon: Eye,
    title: "Our Vision",
    description: vision,
    color: "gold",
  },
  {
    icon: Lightbulb,
    title: "Our Approach",
    description:
      "Applied Intersectionality: We unite diverse expertise across disciplines, cultures, and sectors, then equip teams with systems-thinking tools to reimagine how the world works. We turn 'what if' into 'how to'.",
    color: "copper",
  },
];

const colorStyles = {
  teal: {
    bg: "bg-teal-500/10",
    border: "border-teal-500/30",
    text: "text-teal-400",
  },
  gold: {
    bg: "bg-gold-400/10",
    border: "border-gold-400/30",
    text: "text-gold-400",
  },
  copper: {
    bg: "bg-gold-600/10",
    border: "border-gold-600/30",
    text: "text-gold-600",
  },
};

export default function MissionVision() {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(180deg, #1E0A14 0%, #2A0E1A 50%, #1E0A14 100%)",
        }}
      />

      {/* Decorative glows - static */}
      <div
        className="absolute top-1/4 -left-20 w-80 h-80 rounded-full opacity-40"
        style={{ background: "radial-gradient(circle, rgba(26, 123, 122, 0.1) 0%, transparent 70%)" }}
      />
      <div
        className="absolute bottom-1/4 -right-20 w-96 h-96 rounded-full opacity-30"
        style={{ background: "radial-gradient(circle, rgba(212, 170, 106, 0.1) 0%, transparent 70%)" }}
      />

      <Container className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-400 text-sm font-medium mb-6">
            What Drives Us
          </span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-cream-200 mb-4">
            Mission, Vision & <span className="text-gradient-gold">Approach</span>
          </h2>
          <div className="divider-teal" />
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {items.map((item, index) => {
            const styles = colorStyles[item.color as keyof typeof colorStyles];
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className="relative group"
              >
                <div
                  className={`
                    h-full p-8 rounded-2xl
                    ${styles.bg} border ${styles.border}
                    backdrop-blur-sm
                    transition-all duration-300
                    hover:border-opacity-60
                  `}
                >
                  {/* Icon */}
                  <div className={`inline-flex p-4 rounded-xl mb-6 ${styles.bg}`}>
                    <item.icon className={`w-8 h-8 ${styles.text}`} />
                  </div>

                  <h3 className={`font-serif text-2xl font-bold ${styles.text} mb-4`}>
                    {item.title}
                  </h3>

                  <p className="text-cream-300 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
