"use client";

import { motion } from "framer-motion";
import { ArrowRight, Briefcase, Beaker, Heart } from "lucide-react";
import Link from "next/link";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";

const ctaCards = [
  {
    icon: Briefcase,
    title: "Partner With Us",
    subtitle: "AnduBer Partners",
    description: "Need help navigating complexity? We embed with teams to co-create intersectional strategies.",
    href: "/contact",
    color: "teal",
  },
  {
    icon: Beaker,
    title: "Collaborate on Research",
    subtitle: "AnduBer Labs",
    description: "Join our experimental playground where unconventional ideas meet rigorous methodology.",
    href: "/contact",
    color: "gold",
  },
  {
    icon: Heart,
    title: "Support Our Mission",
    subtitle: "The Gathering",
    description: "Back overlooked innovators across Africa through venture capital that funds visionary entrepreneurs.",
    href: "/contact",
    color: "copper",
  },
];

const colorStyles = {
  teal: {
    bg: "bg-teal-500/10",
    border: "border-teal-500/30",
    text: "text-teal-400",
    hover: "hover:border-teal-500/60",
  },
  gold: {
    bg: "bg-gold-400/10",
    border: "border-gold-400/30",
    text: "text-gold-400",
    hover: "hover:border-gold-400/60",
  },
  copper: {
    bg: "bg-gold-600/10",
    border: "border-gold-600/30",
    text: "text-gold-600",
    hover: "hover:border-gold-600/60",
  },
};

export default function CTA() {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(135deg, #1E0A14 0%, #2A0E1A 50%, #1E0A14 100%)",
        }}
      />

      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-40 -right-40 w-80 h-80 rounded-full"
          style={{ background: "radial-gradient(circle, rgba(212, 170, 106, 0.1) 0%, transparent 70%)" }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full"
          style={{ background: "radial-gradient(circle, rgba(26, 123, 122, 0.1) 0%, transparent 70%)" }}
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
      </div>

      <Container className="relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-2 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-400 text-sm font-medium mb-6"
          >
            Get Involved
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-cream-200 mb-4"
          >
            Join the <span className="text-gradient-gold">Movement</span>
          </motion.h2>
          <div className="divider-teal mb-6" />
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-cream-300"
          >
            Whether you&apos;re an organization seeking strategic guidance, a researcher
            looking for collaboration, or a supporter of our mission—there&apos;s a place for you.
          </motion.p>
        </div>

        {/* CTA Cards */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {ctaCards.map((card, index) => {
            const styles = colorStyles[card.color as keyof typeof colorStyles];
            return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Link href={card.href} className="block h-full">
                  <div className={`
                    group h-full p-8 rounded-2xl
                    ${styles.bg} border ${styles.border}
                    backdrop-blur-sm ${styles.hover}
                    transition-all duration-300
                    hover:bg-opacity-20
                  `}>
                    <div className={`inline-flex p-4 rounded-xl mb-4 ${styles.bg}`}>
                      <card.icon className={`w-8 h-8 ${styles.text}`} />
                    </div>

                    <p className={`text-sm font-medium ${styles.text} mb-2`}>
                      {card.subtitle}
                    </p>

                    <h3 className="font-serif text-2xl font-bold text-cream-200 mb-3 group-hover:text-gold-400 transition-colors">
                      {card.title}
                    </h3>

                    <p className="text-cream-300 mb-6">{card.description}</p>

                    <span className={`inline-flex items-center ${styles.text} font-medium group-hover:gap-3 gap-2 transition-all`}>
                      Learn More
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* Secondary CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center mt-16"
        >
          <p className="text-cream-300 mb-4 italic">
            &ldquo;AnduBer acts as the connective tissue, turning friction into flow.&rdquo;
          </p>
          <Link href="/about">
            <Button variant="outline">
              Learn Our Story
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </motion.div>
      </Container>
    </section>
  );
}
