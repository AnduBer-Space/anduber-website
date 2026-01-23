"use client";

import { motion } from "framer-motion";
import { Lightbulb, ExternalLink } from "lucide-react";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";

export default function InsightsPage() {
  const newsletterUrl = "https://www.linkedin.com/build-relation/newsletter-follow?entityUrn=7111677734606581760";

  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        {/* Background */}
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(135deg, #1E0A14 0%, #2A0E1A 50%, #1E0A14 100%)",
          }}
        />

        {/* Decorative glows - static */}
        <div
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-40"
          style={{ background: "radial-gradient(circle, rgba(212, 170, 106, 0.15) 0%, transparent 70%)" }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full opacity-40"
          style={{ background: "radial-gradient(circle, rgba(26, 123, 122, 0.15) 0%, transparent 70%)" }}
        />

        <Container className="relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold-400/10 border border-gold-400/30 text-gold-400 text-sm font-medium mb-6"
            >
              <Lightbulb className="w-4 h-4" />
              <span>Newsletter</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-cream-200 mb-6"
            >
              Common Sense is <span className="text-gradient-gold">Not Common</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg md:text-xl text-cream-300 max-w-3xl mx-auto"
            >
              Thoughts on development, philanthropy, and challenging conventional thinking
              by Dr. Victor Mugambi Nyaga
            </motion.p>
          </div>
        </Container>
      </section>

      {/* Newsletter Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-plum-800 via-plum-900 to-plum-800" />

        <Container className="relative z-10">
          <div className="max-w-2xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass-card p-8 md:p-12 rounded-3xl text-center"
            >
              {/* Decorative element */}
              <div className="w-20 h-20 mx-auto mb-8 rounded-2xl bg-gold-400/20 flex items-center justify-center">
                <Lightbulb className="w-10 h-10 text-gold-400" />
              </div>

              <h2 className="font-serif text-2xl md:text-3xl font-bold text-cream-200 mb-4">
                Subscribe to the Newsletter
              </h2>

              <p className="text-cream-300 mb-8 leading-relaxed">
                Join the conversation on LinkedIn. Get insights on systems thinking,
                social enterprise, and the art of turning friction into flow.
              </p>

              <a
                href={newsletterUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="primary" size="lg" className="inline-flex items-center gap-2">
                  Subscribe on LinkedIn
                  <ExternalLink className="w-5 h-5" />
                </Button>
              </a>

              <p className="mt-6 text-sm text-cream-400">
                Published on LinkedIn by Dr. Victor Mugambi Nyaga
              </p>
            </motion.div>
          </div>
        </Container>
      </section>
    </>
  );
}
