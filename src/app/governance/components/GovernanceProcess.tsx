"use client";

import { motion } from "framer-motion";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";

const steps = [
  {
    number: "01",
    title: "Community Consultation",
    description:
      "We begin with extensive community consultations to understand local needs, existing resources, and community priorities. This process takes months, not days.",
  },
  {
    number: "02",
    title: "Committee Formation",
    description:
      "Community members elect a project committee to represent their interests. These committees include diverse voices—women, youth, elders, and different community groups.",
  },
  {
    number: "03",
    title: "Collaborative Planning",
    description:
      "The committee works with AnduBer staff to develop project plans, budgets, and timelines. Community knowledge shapes every aspect of the project design.",
  },
  {
    number: "04",
    title: "Implementation & Oversight",
    description:
      "The community committee oversees project implementation, makes key decisions, and ensures resources are used appropriately. AnduBer provides support and expertise.",
  },
  {
    number: "05",
    title: "Monitoring & Accountability",
    description:
      "Regular community meetings review progress, address challenges, and ensure transparency. Financial reports are shared publicly, and community members can ask questions.",
  },
  {
    number: "06",
    title: "Handover & Sustainability",
    description:
      "Projects are designed for community ownership from day one. By completion, communities have the skills, structures, and resources to maintain initiatives independently.",
  },
];

export default function GovernanceProcess() {
  return (
    <Section variant="dark">
      <Container>
        <SectionHeading
          subtitle="The Process"
          title="From Consultation to Community Ownership"
          description="Our governance process ensures that communities aren't just participants—they're leaders."
          light
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative p-6 rounded-2xl bg-plum-800/50 border border-plum-700 hover:border-gold-500/50 transition-colors group"
            >
              <span className="text-5xl font-bold text-gold-500/20 group-hover:text-gold-500/40 transition-colors">
                {step.number}
              </span>
              <h3 className="font-serif text-xl font-bold text-cream-50 mt-2 mb-3">
                {step.title}
              </h3>
              <p className="text-plum-200">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
