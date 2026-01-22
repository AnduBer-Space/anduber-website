"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const faqs = [
  {
    question: "How does distributed governance work at AnduBer?",
    answer:
      "Our distributed governance model places community members at the heart of every decision. Local committees identify needs, propose solutions, and oversee project implementation, while AnduBer provides resources, expertise, and coordination support. Decision-making power rests with the community, not with external organizations.",
  },
  {
    question: "Who can participate in community decision-making?",
    answer:
      "All community members are welcome to participate in community assemblies and have their voices heard. Project committees are elected by community members and typically include diverse representation—women, youth, elders, and different community groups—to ensure all perspectives are considered.",
  },
  {
    question: "How are project committees selected?",
    answer:
      "Committee members are elected by their neighbors through a community-led process. We encourage communities to establish clear criteria and term limits. AnduBer provides guidance on inclusive election processes but does not select committee members.",
  },
  {
    question: "How does AnduBer ensure accountability?",
    answer:
      "Accountability comes through transparency. All project budgets are publicly shared, committees provide regular updates at community meetings, and any community member can ask questions about how resources are being used. AnduBer also conducts independent monitoring and evaluation.",
  },
  {
    question: "What happens if a project faces challenges?",
    answer:
      "When challenges arise, the community committee leads problem-solving efforts, often calling community meetings to discuss options. AnduBer provides technical support and can help facilitate difficult conversations, but decisions about how to address challenges remain with the community.",
  },
  {
    question: "How do you balance community leadership with technical expertise?",
    answer:
      "Communities have deep knowledge of their contexts, needs, and resources. AnduBer brings technical expertise in project management, engineering, and development. The best outcomes happen when these knowledge sources work together. We share our expertise as options and recommendations, but communities make final decisions.",
  },
];

function FAQItem({
  question,
  answer,
  isOpen,
  onClick,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
}) {
  return (
    <div className="border-b border-plum-200 dark:border-plum-700 last:border-b-0">
      <button
        onClick={onClick}
        className="w-full py-5 flex items-center justify-between text-left hover:text-teal-500 transition-colors"
      >
        <span className="font-medium text-plum-900 dark:text-cream-50 pr-4">
          {question}
        </span>
        <ChevronDown
          className={cn(
            "w-5 h-5 flex-shrink-0 text-plum-400 transition-transform duration-300",
            isOpen && "rotate-180"
          )}
        />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-plum-600 dark:text-plum-200">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function GovernanceFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <Section variant="light">
      <Container size="md">
        <SectionHeading
          subtitle="Questions"
          title="Frequently Asked Questions"
          description="Learn more about how our distributed governance model works in practice."
        />

        <div className="bg-white dark:bg-plum-800 rounded-2xl shadow-soft p-6 md:p-8">
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === index}
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
            />
          ))}
        </div>
      </Container>
    </Section>
  );
}
