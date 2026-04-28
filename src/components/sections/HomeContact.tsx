"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Mail, Phone, MapPin, Linkedin } from "lucide-react";
import Container from "@/components/ui/Container";
import HybridSection from "@/components/ui/HybridSection";
import { siteConfig } from "@/data/site";

/**
 * Closing CTA. Dark in hybrid (the brief's "dark with gold glow"); flips
 * to a cream-first variant in force-light mode while keeping the same
 * radial wash and gold accents. All text is theme-token-driven so nothing
 * disappears on cream.
 */
export default function HomeContact() {
  return (
    <HybridSection variant="dark" id="contact-cta" padding="xl">
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 60%, rgba(212, 170, 106, 0.18) 0%, transparent 70%)",
        }}
      />

      <Container className="relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs uppercase tracking-[0.22em] font-semibold text-token-gold mb-4"
          >
            Let&rsquo;s talk
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05 }}
            className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-token-primary leading-[1.1] mb-5"
          >
            Let&rsquo;s build{" "}
            <span className="text-gradient-gold">new worlds</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-accent italic text-lg md:text-xl text-token-secondary leading-snug max-w-[60ch] mx-auto"
          >
            Tell us what you&rsquo;re working on.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="max-w-3xl mx-auto"
        >
          <div className="rounded-3xl border border-gold-500/30 dark:border-gold-400/30 bg-token-secondary backdrop-blur-sm p-8 md:p-10
                          shadow-[0_0_60px_rgba(184,134,11,0.10)] dark:shadow-[0_0_60px_rgba(212,170,106,0.1)]">
            <div className="grid sm:grid-cols-2 gap-5 mb-8">
              <a
                href={`mailto:${siteConfig.email}`}
                className="group flex items-start gap-3 p-4 rounded-2xl border border-token-glass bg-token-tertiary
                           hover:border-gold-500/50 dark:hover:border-gold-400/50 transition-all duration-300"
              >
                <Mail className="w-5 h-5 text-token-gold mt-0.5 shrink-0" aria-hidden="true" />
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-token-muted mb-1">
                    Email
                  </p>
                  <p className="text-token-primary group-hover:text-token-gold transition-colors break-all">
                    {siteConfig.email}
                  </p>
                </div>
              </a>

              <a
                href={`tel:${siteConfig.phone}`}
                className="group flex items-start gap-3 p-4 rounded-2xl border border-token-glass bg-token-tertiary
                           hover:border-gold-500/50 dark:hover:border-gold-400/50 transition-all duration-300"
              >
                <Phone className="w-5 h-5 text-token-gold mt-0.5 shrink-0" aria-hidden="true" />
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-token-muted mb-1">
                    Phone
                  </p>
                  <p className="text-token-primary group-hover:text-token-gold transition-colors">
                    {siteConfig.phone}
                  </p>
                </div>
              </a>

              <div className="flex items-start gap-3 p-4 rounded-2xl border border-token-glass bg-token-tertiary">
                <MapPin className="w-5 h-5 text-token-teal mt-0.5 shrink-0" aria-hidden="true" />
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-token-muted mb-1">
                    Headquarters
                  </p>
                  <p className="text-token-primary">{siteConfig.address}</p>
                  <p className="text-xs text-token-muted mt-0.5">Global reach</p>
                </div>
              </div>

              <a
                href={siteConfig.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-start gap-3 p-4 rounded-2xl border border-token-glass bg-token-tertiary
                           hover:border-teal-500/50 dark:hover:border-teal-400/50 transition-all duration-300"
              >
                <Linkedin className="w-5 h-5 text-token-teal mt-0.5 shrink-0" aria-hidden="true" />
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-token-muted mb-1">
                    LinkedIn
                  </p>
                  <p className="text-token-primary group-hover:text-token-teal transition-colors">
                    /company/anduber
                  </p>
                </div>
              </a>
            </div>

            <div className="text-center">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full
                           bg-gold-400 text-plum-900 font-semibold text-base md:text-lg
                           transition-all duration-300 hover:bg-gold-300 hover:shadow-glow-gold
                           active:scale-95"
              >
                Open the contact form
                <ArrowRight className="w-5 h-5" />
              </Link>
              <p className="font-accent italic text-sm text-token-muted mt-4">
                Or write to us directly. We answer everything we receive.
              </p>
            </div>
          </div>
        </motion.div>
      </Container>
    </HybridSection>
  );
}
