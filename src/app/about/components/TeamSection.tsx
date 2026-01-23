"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Linkedin, Mail } from "lucide-react";
import Container from "@/components/ui/Container";
import { teamMembers } from "@/data/team";

export default function TeamSection() {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(180deg, #1E0A14 0%, #2A0E1A 50%, #1E0A14 100%)",
        }}
      />

      <Container className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-400 text-sm font-medium mb-6">
            The Team
          </span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-cream-200 mb-4">
            Meet the <span className="text-gradient-gold">Good People</span>
          </h2>
          <div className="divider-teal" />
          <p className="mt-6 text-lg text-cream-300 max-w-2xl mx-auto">
            Systems thinkers, artists, scientists, and community leaders united
            by one mission: to dismantle silos and build resilient systems.
          </p>
        </motion.div>

        {/* Founder Card - Featured */}
        <div className="max-w-2xl mx-auto">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              <div className="relative glass-card p-8 rounded-3xl overflow-hidden border border-plum-700 hover:border-teal-500/30 transition-all duration-300">
                {/* Decorative gradient */}
                <div
                  className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-30"
                  style={{
                    background: "radial-gradient(circle, rgba(26, 123, 122, 0.3) 0%, transparent 70%)",
                  }}
                />

                <div className="relative flex flex-col md:flex-row gap-8 items-center">
                  {/* Avatar */}
                  <div className="flex-shrink-0">
                    <div className="relative w-48 h-64 rounded-2xl overflow-hidden border-2 border-teal-500/30 bg-plum-800">
                      <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        className="object-contain"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-plum-900/30 to-transparent pointer-events-none" />
                    </div>
                  </div>

                  {/* Info */}
                  <div className="flex-1 text-center md:text-left">
                    <h3 className="font-serif text-2xl md:text-3xl font-bold text-cream-200 mb-2">
                      {member.name}
                    </h3>
                    <p className="text-gold-400 font-medium mb-4">{member.role}</p>
                    <p className="text-cream-300 leading-relaxed mb-6">
                      {member.bio}
                    </p>

                    {/* Social Links */}
                    {member.socials && (
                      <div className="flex gap-3 justify-center md:justify-start">
                        {member.socials.linkedin && (
                          <a
                            href={member.socials.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-3 rounded-full bg-plum-700/50 text-cream-300 hover:bg-teal-500 hover:text-white transition-colors"
                            aria-label={`${member.name}'s LinkedIn`}
                          >
                            <Linkedin className="w-5 h-5" />
                          </a>
                        )}
                        {member.socials.email && (
                          <a
                            href={`mailto:${member.socials.email}`}
                            className="p-3 rounded-full bg-plum-700/50 text-cream-300 hover:bg-gold-400 hover:text-plum-900 transition-colors"
                            aria-label={`Email ${member.name}`}
                          >
                            <Mail className="w-5 h-5" />
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
