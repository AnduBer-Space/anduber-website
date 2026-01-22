"use client";

import { motion } from "framer-motion";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import { Users, Vote, Eye, Handshake } from "lucide-react";

const principles = [
  {
    icon: Users,
    title: "Community Assemblies",
    description:
      "Regular community assemblies bring together village members to discuss needs, priorities, and proposed solutions. Everyone has a voice, and decisions are made through consensus.",
  },
  {
    icon: Vote,
    title: "Local Committees",
    description:
      "Each project has a dedicated committee of community members who oversee implementation, manage finances, and ensure accountability. Committee members are elected by their neighbors.",
  },
  {
    icon: Eye,
    title: "Transparent Budgets",
    description:
      "All project budgets are publicly shared with community members. Anyone can ask questions about how funds are being used, and committees regularly report back to the community.",
  },
  {
    icon: Handshake,
    title: "Facilitation, Not Direction",
    description:
      "AnduBer provides technical expertise, training, funding coordination, and administrative support—but we don't make decisions for communities. We're facilitators, not directors.",
  },
];

export default function GovernanceModel() {
  return (
    <Section variant="light">
      <Container>
        <SectionHeading
          subtitle="How It Works"
          title="Our Governance Model"
          description="Unlike traditional top-down approaches where NGOs or governments decide what communities need, distributed governance places decision-making power directly in community hands."
        />

        <div className="grid md:grid-cols-2 gap-8 mt-12">
          {principles.map((principle, index) => (
            <motion.div
              key={principle.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex gap-5 p-6 rounded-2xl bg-white dark:bg-plum-800 shadow-soft hover:shadow-lg transition-shadow"
            >
              <div className="flex-shrink-0">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-teal-500 to-teal-600 flex items-center justify-center">
                  <principle.icon className="w-7 h-7 text-white" />
                </div>
              </div>
              <div>
                <h3 className="font-serif text-xl font-bold text-plum-900 dark:text-cream-50 mb-2">
                  {principle.title}
                </h3>
                <p className="text-plum-600 dark:text-plum-200">
                  {principle.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
