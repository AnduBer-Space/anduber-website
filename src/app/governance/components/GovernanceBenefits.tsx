"use client";

import { motion } from "framer-motion";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import { TrendingUp, Heart, Shield, Leaf } from "lucide-react";

const benefits = [
  {
    icon: TrendingUp,
    title: "Higher Success Rates",
    stat: "89%",
    description:
      "Community-led projects have significantly higher completion and success rates compared to top-down approaches.",
  },
  {
    icon: Heart,
    title: "Greater Satisfaction",
    stat: "94%",
    description:
      "Community members report higher satisfaction when they're involved in decision-making from the start.",
  },
  {
    icon: Shield,
    title: "Better Maintenance",
    stat: "3x",
    description:
      "Projects with community ownership are three times more likely to be properly maintained over time.",
  },
  {
    icon: Leaf,
    title: "Long-term Sustainability",
    stat: "85%",
    description:
      "The majority of our projects continue operating successfully five years after AnduBer's direct involvement ends.",
  },
];

export default function GovernanceBenefits() {
  return (
    <Section variant="light">
      <Container>
        <SectionHeading
          subtitle="Why It Works"
          title="The Impact of Community Leadership"
          description="Research and our own experience show that community-led development produces better outcomes across every measure."
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center p-6 rounded-2xl bg-white dark:bg-plum-800 shadow-soft"
            >
              <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-gold-400 to-gold-500 flex items-center justify-center mb-4">
                <benefit.icon className="w-8 h-8 text-plum-900" />
              </div>
              <div className="text-4xl font-bold text-teal-500 mb-2">
                {benefit.stat}
              </div>
              <h3 className="font-serif text-lg font-bold text-plum-900 dark:text-cream-50 mb-2">
                {benefit.title}
              </h3>
              <p className="text-sm text-plum-600 dark:text-plum-200">
                {benefit.description}
              </p>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
