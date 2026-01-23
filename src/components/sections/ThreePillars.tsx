"use client";

import { motion } from "framer-motion";
import { Zap, Sparkles, Shield, ArrowRight } from "lucide-react";
import Container from "@/components/ui/Container";
import { pillars } from "@/data/site";

const pillarIcons = {
  collision: Zap,
  imagination: Sparkles,
  resilience: Shield,
};

const pillarGradients = {
  teal: {
    border: "border-teal-500/30 hover:border-teal-500/60",
    bg: "from-teal-500/10 to-transparent",
    icon: "bg-teal-500/20 text-teal-400",
    text: "text-teal-400",
    cardClass: "card-premium",
  },
  gold: {
    border: "border-gold-400/30 hover:border-gold-400/60",
    bg: "from-gold-400/10 to-transparent",
    icon: "bg-gold-400/20 text-gold-400",
    text: "text-gold-400",
    cardClass: "card-premium card-premium-gold",
  },
  copper: {
    border: "border-gold-600/30 hover:border-gold-600/60",
    bg: "from-gold-600/10 to-transparent",
    icon: "bg-gold-600/20 text-gold-600",
    text: "text-gold-600",
    cardClass: "card-premium card-premium-copper",
  },
};

export default function ThreePillars() {
  return (
    <section className="relative py-24 lg:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-plum-800 via-plum-900 to-plum-800" />

      {/* Network line decorations */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none opacity-20"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="pillarLineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1A7B7A" stopOpacity="0.5" />
            <stop offset="50%" stopColor="#D4AA6A" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#C9956C" stopOpacity="0.5" />
          </linearGradient>
        </defs>
        <path
          d="M 0 50 Q 25 30 50 50 T 100 50"
          stroke="url(#pillarLineGrad)"
          strokeWidth="0.2"
          fill="none"
        />
        <path
          d="M 0 60 Q 25 80 50 60 T 100 60"
          stroke="url(#pillarLineGrad)"
          strokeWidth="0.15"
          fill="none"
        />
      </svg>

      <Container className="relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-400 text-sm font-medium mb-6">
            Theory of Change
          </span>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-cream-200 mb-6">
            Three Pillars of <span className="text-gradient-gold">Transformation</span>
          </h2>
          <p className="text-lg text-cream-300 max-w-3xl mx-auto">
            Our methodology transforms how the world solves complex challenges through three
            interconnected phases.
          </p>
        </motion.div>

        {/* Pillars Grid */}
        <div className="grid md:grid-cols-3 gap-8 lg:gap-10">
          {pillars.map((pillar, index) => {
            const Icon = pillarIcons[pillar.icon as keyof typeof pillarIcons];
            const colors = pillarGradients[pillar.color as keyof typeof pillarGradients];

            return (
              <motion.div
                key={pillar.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                className="group relative"
              >
                {/* Card - Pure CSS hover effects for better performance */}
                <div
                  className={`
                    relative h-full p-8 lg:p-10
                    ${colors.cardClass}
                    border ${colors.border}
                    bg-gradient-to-br ${colors.bg}
                    backdrop-blur-sm
                  `}
                >
                  {/* Number badge */}
                  <div className="absolute -top-4 -right-4 w-12 h-12 rounded-full bg-plum-900 border border-plum-700 flex items-center justify-center">
                    <span className={`font-serif text-xl font-bold ${colors.text}`}>
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>

                  {/* Subtitle */}
                  <span className={`text-sm font-medium uppercase tracking-wider ${colors.text}`}>
                    {pillar.subtitle}
                  </span>

                  {/* Icon */}
                  <div className={`w-16 h-16 rounded-2xl ${colors.icon} flex items-center justify-center mt-4 mb-6 transition-transform duration-300 group-hover:scale-110`}>
                    <Icon className="w-8 h-8" />
                  </div>

                  {/* Title */}
                  <h3 className="font-serif text-2xl lg:text-3xl font-bold text-cream-200 mb-4">
                    {pillar.title}
                  </h3>

                  {/* Description */}
                  <p className="text-cream-300 leading-relaxed mb-6">
                    {pillar.description}
                  </p>

                  {/* Quote */}
                  <div className={`pt-6 border-t ${colors.border}`}>
                    <p className={`font-serif italic ${colors.text}`}>
                      &ldquo;{pillar.quote}&rdquo;
                    </p>
                  </div>
                </div>

                {/* Connector arrow (not on last item) */}
                {index < pillars.length - 1 && (
                  <div className="hidden md:flex absolute -right-5 top-1/2 -translate-y-1/2 z-10">
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.2 + 0.4 }}
                    >
                      <ArrowRight className="w-6 h-6 text-plum-500" />
                    </motion.div>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Key phrase */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
          className="mt-16 text-center"
        >
          <p className="text-2xl md:text-3xl font-serif text-cream-200">
            From <span className="text-teal-400">Friction</span> to{" "}
            <span className="text-gold-400">Flow</span>
          </p>
          <p className="text-lg text-cream-300 mt-2">
            We turn &apos;what if&apos; into &apos;how to&apos;
          </p>
        </motion.div>
      </Container>
    </section>
  );
}
