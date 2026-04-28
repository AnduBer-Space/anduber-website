"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Linkedin, Mail } from "lucide-react";
import Container from "@/components/ui/Container";
import { teamMembers } from "@/data/team";

/**
 * Founder profile + collective framing. AnduBer is consciously a collective,
 * not a personality cult — but the founder profile carries enough weight
 * (especially for funders evaluating credibility) that it leads here.
 */
export default function TeamSection() {
  return (
    <section className="relative py-20 md:py-28 overflow-hidden bg-cream-100 dark:bg-plum-800">
      <Container className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          className="max-w-3xl mb-12"
        >
          <p className="text-xs uppercase tracking-[0.22em] font-semibold text-token-gold mb-4">
            The collective
          </p>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-token-primary leading-[1.1] mb-5">
            Good people, in the same room
          </h2>
          <p className="font-accent italic text-lg md:text-xl text-token-secondary leading-snug max-w-[60ch]">
            AnduBer is a collective of systems thinkers, scientists, artists,
            community leaders, and the unusual suspects we&rsquo;ve learned to
            keep close. The list grows with every project.
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          {teamMembers.map((member, index) => (
            <motion.article
              key={member.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: index * 0.1 }}
              className="relative rounded-3xl overflow-hidden border border-plum-200 dark:border-plum-700 bg-white/60 dark:bg-plum-900/50 backdrop-blur-sm shadow-md"
            >
              <div
                className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-20 pointer-events-none"
                style={{ background: "radial-gradient(circle, rgba(15, 118, 110, 0.4) 0%, transparent 70%)" }}
              />

              <div className="relative grid md:grid-cols-[200px,1fr] gap-8 p-6 md:p-10 items-center">
                <div className="relative w-40 h-52 md:w-48 md:h-60 mx-auto md:mx-0 rounded-2xl overflow-hidden border-2 border-teal-500/30 bg-cream-50 dark:bg-plum-800">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-contain"
                    sizes="200px"
                  />
                </div>

                <div className="text-center md:text-left">
                  <h3 className="font-serif text-2xl md:text-3xl font-bold text-token-primary leading-tight">
                    {member.name}
                  </h3>
                  <p className="text-token-gold font-medium mt-1 mb-1">{member.role}</p>
                  {member.credentials && (
                    <p className="text-xs uppercase tracking-wider text-token-muted font-semibold mb-4">
                      {member.credentials}
                    </p>
                  )}
                  <p className="text-base md:text-lg text-token-primary leading-relaxed mb-5 prose-readable">
                    {member.bio}
                  </p>

                  {member.socials && (
                    <div className="flex gap-2 justify-center md:justify-start">
                      {member.socials.linkedin && (
                        <a
                          href={member.socials.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2.5 rounded-full bg-cream-200/60 dark:bg-plum-800/60 text-token-primary hover:bg-teal-500 hover:text-white transition-colors"
                          aria-label={`${member.name}'s LinkedIn`}
                        >
                          <Linkedin className="w-4 h-4" />
                        </a>
                      )}
                      {member.socials.email && (
                        <a
                          href={`mailto:${member.socials.email}`}
                          className="p-2.5 rounded-full bg-cream-200/60 dark:bg-plum-800/60 text-token-primary hover:bg-gold-400 hover:text-plum-900 transition-colors"
                          aria-label={`Email ${member.name}`}
                        >
                          <Mail className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </motion.article>
          ))}

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: 0.3 }}
            className="mt-10 text-center"
          >
            <p className="font-accent italic text-base md:text-lg text-token-secondary max-w-[60ch] mx-auto leading-snug">
              The rest of the collective is named in the projects we ship and the
              papers we co-author. We hire by collision, not by CV.
            </p>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
