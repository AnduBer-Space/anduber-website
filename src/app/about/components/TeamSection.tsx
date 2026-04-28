"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Linkedin, Mail, Users } from "lucide-react";
import Container from "@/components/ui/Container";
import { teamMembers } from "@/data/team";

/**
 * Collective section. AnduBer is consciously an organisation and a movement —
 * not a personal brand. The collective framing leads; the founder profile
 * sits as one card among other text, not as a centerpiece.
 */
export default function TeamSection() {
  return (
    <section className="relative py-20 md:py-28 overflow-hidden bg-cream-100 dark:bg-plum-800">
      <Container className="relative z-10">
        <div className="grid lg:grid-cols-[1fr,1fr] gap-12 lg:gap-16 items-start">
          {/* Left: collective story */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            className="max-w-xl"
          >
            <p className="text-xs uppercase tracking-[0.22em] font-semibold text-token-gold mb-4">
              The collective
            </p>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-token-primary leading-[1.1] mb-5">
              We are a room, not a name
            </h2>
            <p className="font-accent italic text-lg md:text-xl text-token-secondary leading-snug mb-6 max-w-[60ch]">
              Systems thinkers, scientists, artists, community leaders, and the
              unusual suspects we keep gathering.
            </p>
            <div className="space-y-5 text-base md:text-lg text-token-primary leading-relaxed prose-readable">
              <p>
                AnduBer is consciously a collective — an organisation and a
                movement, not a personality. The methodology only works when
                the room is plural; the brand has to behave the same way.
              </p>
              <p>
                Different projects pull together different teams. Across them
                you&rsquo;ll find epidemiologists and educators, hydrologists
                and theatre-makers, lawyers and traditional leaders, software
                engineers and grandmothers. The point isn&rsquo;t a roster —
                it&rsquo;s the willingness to keep enlarging it.
              </p>
              <p>
                Names appear in the projects we ship and the papers we
                co-author. The list grows with every engagement.
              </p>
            </div>
          </motion.div>

          {/* Right: founder profile + future "more from the collective" slot */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: 0.05 }}
              className="rounded-2xl border border-plum-200 dark:border-plum-700 bg-white/60 dark:bg-plum-900/50 backdrop-blur-sm p-6 md:p-7"
            >
              <p className="text-[10px] uppercase tracking-[0.22em] font-semibold text-token-muted mb-4">
                From the collective
              </p>
              {teamMembers.map((member) => (
                <div key={member.id} className="grid sm:grid-cols-[88px,1fr] gap-5 items-start">
                  <div className="relative w-20 h-24 sm:w-22 sm:h-26 rounded-xl overflow-hidden border border-token-glass bg-cream-50 dark:bg-plum-800">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-contain"
                      sizes="88px"
                    />
                  </div>
                  <div>
                    <h3 className="font-serif text-xl font-bold text-token-primary leading-tight">
                      {member.name}
                    </h3>
                    <p className="text-token-gold font-medium text-sm mt-1 mb-3">{member.role}</p>
                    <p className="text-sm text-token-secondary leading-relaxed mb-3">
                      {member.bio}
                    </p>
                    {member.socials && (
                      <div className="flex gap-2">
                        {member.socials.linkedin && (
                          <a
                            href={member.socials.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-full bg-cream-200/60 dark:bg-plum-800/60 text-token-primary hover:bg-teal-500 hover:text-white transition-colors"
                            aria-label={`${member.name} on LinkedIn`}
                          >
                            <Linkedin className="w-4 h-4" />
                          </a>
                        )}
                        {member.socials.email && (
                          <a
                            href={`mailto:${member.socials.email}`}
                            className="p-2 rounded-full bg-cream-200/60 dark:bg-plum-800/60 text-token-primary hover:bg-gold-400 hover:text-plum-900 transition-colors"
                            aria-label={`Email ${member.name}`}
                          >
                            <Mail className="w-4 h-4" />
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: 0.15 }}
              className="rounded-2xl border border-dashed border-token-glass bg-white/30 dark:bg-plum-900/30 p-6 md:p-7"
            >
              <Users className="w-5 h-5 text-token-gold mb-3" aria-hidden="true" />
              <p className="text-[10px] uppercase tracking-[0.22em] font-semibold text-token-muted mb-2">
                More profiles coming
              </p>
              <p className="text-sm text-token-secondary leading-relaxed">
                We&rsquo;ll publish profiles for additional collective members
                as more of them step into ongoing public-facing roles. In the
                meantime, the work itself is the introduction.
              </p>
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  );
}
