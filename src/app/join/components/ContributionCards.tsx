"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Container from "@/components/ui/Container";
import ContributionModal from "./ContributionModal";
import {
  Briefcase,
  Users,
  Star,
  GraduationCap,
  Lightbulb,
  Globe,
  Heart,
  Megaphone,
  LucideIcon,
} from "lucide-react";

export interface ContributionCategory {
  id: string;
  icon: LucideIcon;
  title: string;
  subtitle: string;
  description: string;
  note?: string;
  details: string[];
  detailsLabel: string;
  formFields: FormField[];
  accentColor: "teal" | "gold";
}

export interface FormField {
  name: string;
  label: string;
  type: "text" | "email" | "textarea" | "select" | "file" | "multiselect";
  placeholder?: string;
  required?: boolean;
  options?: string[];
}

const contributionCategories: ContributionCategory[] = [
  {
    id: "careers",
    icon: Briefcase,
    title: "Join Our Team",
    subtitle: "Careers",
    description:
      "Full-time and part-time roles for those ready to make AnduBer their mission.",
    note: "We're a young organization - early joiners help shape our culture and grow with us.",
    details: ["Operations", "Programs", "Communications", "Finance"],
    detailsLabel: "Role Types",
    accentColor: "teal",
    formFields: [
      { name: "name", label: "Full Name", type: "text", required: true },
      { name: "email", label: "Email Address", type: "email", required: true },
      {
        name: "roleInterest",
        label: "Role of Interest",
        type: "select",
        required: true,
        options: ["Operations", "Programs", "Communications", "Finance", "Other"],
      },
      {
        name: "cvLink",
        label: "CV/Resume Link (Google Drive, Dropbox, LinkedIn)",
        type: "text",
        placeholder: "https://...",
        required: true,
      },
      {
        name: "whyAnduber",
        label: "Why AnduBer?",
        type: "textarea",
        placeholder: "Tell us what draws you to our mission...",
        required: true,
      },
    ],
  },
  {
    id: "consultants",
    icon: Users,
    title: "Expert Consultants",
    subtitle: "Consultant Roster",
    description:
      "Join our roster of specialists we call on for specific projects. Flexible, project-based work.",
    details: [
      "Strategy",
      "M&E",
      "Communications",
      "Legal",
      "Finance",
      "Technology",
      "Research",
      "Policy",
    ],
    detailsLabel: "Expertise Areas",
    accentColor: "gold",
    formFields: [
      { name: "name", label: "Full Name", type: "text", required: true },
      { name: "email", label: "Email Address", type: "email", required: true },
      {
        name: "expertiseAreas",
        label: "Expertise Areas",
        type: "multiselect",
        required: true,
        options: [
          "Strategy",
          "M&E",
          "Communications",
          "Legal",
          "Finance",
          "Technology",
          "Research",
          "Policy",
        ],
      },
      {
        name: "dayRate",
        label: "Day Rate (USD) or 'Open to discussion'",
        type: "text",
        placeholder: "e.g., $500 or 'Open to discussion'",
        required: false,
      },
      {
        name: "portfolioLink",
        label: "Portfolio / LinkedIn",
        type: "text",
        placeholder: "https://...",
        required: true,
      },
      {
        name: "availability",
        label: "Availability",
        type: "select",
        required: true,
        options: [
          "Immediate",
          "Within 2 weeks",
          "Within a month",
          "Flexible",
        ],
      },
    ],
  },
  {
    id: "expert-volunteers",
    icon: Star,
    title: "Share Your Expertise",
    subtitle: "Expert Volunteers",
    description:
      "Seasoned professionals who want to donate their skills. Pro-bono advisory, mentorship, or short-term projects.",
    note: "Great for: Retired professionals, executives with extra capacity, specialists who believe in our mission",
    details: ["Pro-bono Advisory", "Mentorship", "Short-term Projects"],
    detailsLabel: "Contribution Types",
    accentColor: "teal",
    formFields: [
      { name: "name", label: "Full Name", type: "text", required: true },
      { name: "email", label: "Email Address", type: "email", required: true },
      {
        name: "expertiseArea",
        label: "Area of Expertise",
        type: "text",
        placeholder: "e.g., Finance, Strategy, Technology...",
        required: true,
      },
      {
        name: "hoursPerMonth",
        label: "Hours Available per Month",
        type: "select",
        required: true,
        options: ["1-5 hours", "5-10 hours", "10-20 hours", "20+ hours", "Flexible"],
      },
      {
        name: "contribution",
        label: "What You'd Like to Contribute",
        type: "textarea",
        placeholder: "Tell us how you'd like to help...",
        required: true,
      },
    ],
  },
  {
    id: "learning-volunteers",
    icon: GraduationCap,
    title: "Learn With Us",
    subtitle: "Interns & Fellows",
    description:
      "Students and early-career professionals who want hands-on experience in social innovation.",
    note: "We offer: Mentorship, real project experience, reference letters, potential future roles",
    details: ["Research", "Communications", "Design", "Data", "Programs"],
    detailsLabel: "Areas",
    accentColor: "gold",
    formFields: [
      { name: "name", label: "Full Name", type: "text", required: true },
      { name: "email", label: "Email Address", type: "email", required: true },
      {
        name: "background",
        label: "Current Studies / Background",
        type: "text",
        placeholder: "e.g., Final year Computer Science at University of Nairobi",
        required: true,
      },
      {
        name: "areaOfInterest",
        label: "Area of Interest",
        type: "select",
        required: true,
        options: ["Research", "Communications", "Design", "Data", "Programs", "Other"],
      },
      {
        name: "learningGoals",
        label: "What You Hope to Learn",
        type: "textarea",
        placeholder: "What skills do you want to develop?",
        required: true,
      },
      {
        name: "availability",
        label: "Availability",
        type: "select",
        required: true,
        options: [
          "Full-time (40+ hrs/week)",
          "Part-time (20-40 hrs/week)",
          "Limited (10-20 hrs/week)",
          "Flexible",
        ],
      },
    ],
  },
  {
    id: "ideas",
    icon: Lightbulb,
    title: "Bring Your Ideas",
    subtitle: "Ideas & Innovators",
    description:
      "Have a solution to a community problem? The Gathering is looking for bold ideas from unexpected places.",
    note: "We offer: Mentorship, potential seed funding, access to our network",
    details: ["Mentorship", "Seed Funding", "Network Access"],
    detailsLabel: "What We Offer",
    accentColor: "teal",
    formFields: [
      { name: "name", label: "Full Name", type: "text", required: true },
      { name: "email", label: "Email Address", type: "email", required: true },
      {
        name: "ideaDescription",
        label: "Your Idea (Brief Description)",
        type: "textarea",
        placeholder: "Describe your idea in a few sentences...",
        required: true,
      },
      {
        name: "problemSolved",
        label: "Problem It Solves",
        type: "textarea",
        placeholder: "What problem does this address and for whom?",
        required: true,
      },
      {
        name: "background",
        label: "Your Background",
        type: "text",
        placeholder: "Tell us a bit about yourself...",
        required: true,
      },
      {
        name: "supportNeeded",
        label: "What Support You Need",
        type: "textarea",
        placeholder: "Funding? Mentorship? Connections? Technical help?",
        required: true,
      },
    ],
  },
  {
    id: "connectors",
    icon: Globe,
    title: "Open Doors",
    subtitle: "Community Connectors",
    description:
      "Know funders, partners, media, or communities we should connect with? Help us build bridges.",
    note: "You might be: A well-connected professional, diaspora member, funder, journalist, community leader",
    details: ["Funders", "Partners", "Media", "Communities"],
    detailsLabel: "Connection Types",
    accentColor: "gold",
    formFields: [
      { name: "name", label: "Full Name", type: "text", required: true },
      { name: "email", label: "Email Address", type: "email", required: true },
      {
        name: "network",
        label: "Your Network / Connections",
        type: "textarea",
        placeholder: "What networks or communities are you connected to?",
        required: true,
      },
      {
        name: "howToHelp",
        label: "How You'd Like to Help",
        type: "textarea",
        placeholder: "How can you help us build bridges?",
        required: true,
      },
    ],
  },
  {
    id: "financial",
    icon: Heart,
    title: "Invest in Change",
    subtitle: "Financial Partners",
    description:
      "Fund the future. Support AnduBer through grants, donations, or impact investment.",
    note: "For: Individuals, Foundations, Corporates, Impact investors",
    details: ["One-time Donation", "Monthly Giving", "Grant Funding", "Impact Investment"],
    detailsLabel: "Support Options",
    accentColor: "teal",
    formFields: [
      { name: "name", label: "Full Name", type: "text", required: true },
      { name: "email", label: "Email Address", type: "email", required: true },
      {
        name: "organization",
        label: "Organization (if applicable)",
        type: "text",
        placeholder: "Company or foundation name",
        required: false,
      },
      {
        name: "supportType",
        label: "Type of Support Interested In",
        type: "select",
        required: true,
        options: [
          "One-time Donation",
          "Monthly Giving",
          "Grant Funding",
          "Impact Investment",
          "Other",
        ],
      },
      {
        name: "fundingRange",
        label: "Funding Range (Optional)",
        type: "select",
        required: false,
        options: [
          "Under $1,000",
          "$1,000 - $10,000",
          "$10,000 - $50,000",
          "$50,000 - $100,000",
          "$100,000+",
          "Prefer not to say",
        ],
      },
      {
        name: "impactAreas",
        label: "What Impact Areas Interest You",
        type: "textarea",
        placeholder: "Which of our programs or focus areas resonate with you?",
        required: true,
      },
    ],
  },
  {
    id: "ambassadors",
    icon: Megaphone,
    title: "Spread the Word",
    subtitle: "Ambassadors",
    description:
      "Believe in what we're doing? Help us reach more people. Share our story, host events, make introductions.",
    details: ["Share Our Story", "Host Events", "Make Introductions"],
    detailsLabel: "Ways to Help",
    accentColor: "gold",
    formFields: [
      { name: "name", label: "Full Name", type: "text", required: true },
      { name: "email", label: "Email Address", type: "email", required: true },
      {
        name: "location",
        label: "Location",
        type: "text",
        placeholder: "City, Country",
        required: true,
      },
      {
        name: "howToSpreadWord",
        label: "How You'd Like to Help Spread the Word",
        type: "textarea",
        placeholder: "Share content? Host events? Connect us with people?",
        required: true,
      },
      {
        name: "platform",
        label: "Your Platform / Reach",
        type: "textarea",
        placeholder: "Social media following, community networks, professional connections...",
        required: true,
      },
    ],
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
} as const;

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut" as const,
    },
  },
};

export default function ContributionCards() {
  const [selectedCategory, setSelectedCategory] =
    useState<ContributionCategory | null>(null);

  return (
    <section className="relative py-16 md:py-24">
      <div className="absolute inset-0 bg-plum-900" />

      <Container className="relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {contributionCategories.map((category) => (
            <motion.div
              key={category.id}
              variants={cardVariants}
              onClick={() => setSelectedCategory(category)}
              className="group cursor-pointer"
            >
              <div
                className={`relative h-full p-6 rounded-2xl border transition-all duration-300
                  bg-plum-800/50 backdrop-blur-sm
                  ${
                    category.accentColor === "teal"
                      ? "border-teal-500/20 hover:border-teal-400/50 hover:shadow-[0_0_30px_rgba(45,212,191,0.15)]"
                      : "border-gold-400/20 hover:border-gold-400/50 hover:shadow-[0_0_30px_rgba(212,170,106,0.15)]"
                  }
                  hover:transform hover:-translate-y-1`}
              >
                {/* Icon */}
                <div
                  className={`w-14 h-14 rounded-xl flex items-center justify-center mb-4 transition-colors duration-300
                    ${
                      category.accentColor === "teal"
                        ? "bg-teal-500/20 group-hover:bg-teal-500/30"
                        : "bg-gold-400/20 group-hover:bg-gold-400/30"
                    }`}
                >
                  <category.icon
                    className={`w-7 h-7 ${
                      category.accentColor === "teal"
                        ? "text-teal-400"
                        : "text-gold-400"
                    }`}
                  />
                </div>

                {/* Subtitle */}
                <span
                  className={`text-xs uppercase tracking-wider ${
                    category.accentColor === "teal"
                      ? "text-teal-400"
                      : "text-gold-400"
                  }`}
                >
                  {category.subtitle}
                </span>

                {/* Title */}
                <h3 className="text-xl font-serif text-cream-200 mt-1 mb-3">
                  {category.title}
                </h3>

                {/* Description */}
                <p className="text-cream-300/80 text-sm leading-relaxed mb-4">
                  {category.description}
                </p>

                {/* Note (if exists) */}
                {category.note && (
                  <p className="text-xs text-cream-300/60 italic mb-4">
                    {category.note}
                  </p>
                )}

                {/* Details Tags */}
                <div className="mt-auto">
                  <span className="text-xs text-cream-300/50 uppercase tracking-wider block mb-2">
                    {category.detailsLabel}
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {category.details.slice(0, 4).map((detail) => (
                      <span
                        key={detail}
                        className={`text-xs px-2 py-1 rounded-full
                          ${
                            category.accentColor === "teal"
                              ? "bg-teal-500/10 text-teal-400/80"
                              : "bg-gold-400/10 text-gold-400/80"
                          }`}
                      >
                        {detail}
                      </span>
                    ))}
                    {category.details.length > 4 && (
                      <span
                        className={`text-xs px-2 py-1 rounded-full
                          ${
                            category.accentColor === "teal"
                              ? "bg-teal-500/10 text-teal-400/80"
                              : "bg-gold-400/10 text-gold-400/80"
                          }`}
                      >
                        +{category.details.length - 4}
                      </span>
                    )}
                  </div>
                </div>

                {/* Apply Button */}
                <div
                  className={`mt-6 text-center py-2 rounded-lg transition-all duration-300
                    ${
                      category.accentColor === "teal"
                        ? "bg-teal-500/10 text-teal-400 group-hover:bg-teal-500/20"
                        : "bg-gold-400/10 text-gold-400 group-hover:bg-gold-400/20"
                    }`}
                >
                  <span className="text-sm font-medium">Apply Now</span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </Container>

      {/* Modal */}
      <ContributionModal
        category={selectedCategory}
        onClose={() => setSelectedCategory(null)}
      />
    </section>
  );
}
