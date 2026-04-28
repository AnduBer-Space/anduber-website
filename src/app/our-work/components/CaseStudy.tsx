"use client";

import { motion } from "framer-motion";
import { MessageSquare, Droplets } from "lucide-react";
import Container from "@/components/ui/Container";
import { Project } from "@/types";

const ICON_MAP: Record<string, typeof MessageSquare> = {
  "mental-health": MessageSquare,
  water: Droplets,
};

interface Props {
  project: Project;
  index: number;
}

/**
 * Long-form case study card. Renders the brief's required structure: the
 * problem, what we did, body paragraphs, impact metrics, and learnings.
 */
export default function CaseStudy({ project, index }: Props) {
  const Icon = ICON_MAP[project.type] ?? MessageSquare;
  const isOdd = index % 2 === 1;
  const bg = isOdd ? "bg-cream-100 dark:bg-plum-800" : "bg-cream-50 dark:bg-plum-900";

  return (
    <section className={`relative py-20 md:py-28 overflow-hidden ${bg}`}>
      <Container className="relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Project header */}
          <motion.header
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            className="mb-10 lg:mb-14"
          >
            <div className="flex items-center gap-3 mb-5">
              <span className="inline-flex w-12 h-12 rounded-2xl items-center justify-center bg-gold-400/15 text-token-gold">
                <Icon className="w-6 h-6" aria-hidden="true" />
              </span>
              <span className="text-[10px] uppercase tracking-[0.22em] font-semibold text-token-muted">
                Case study {String(index + 1).padStart(2, "0")} · {project.location}
              </span>
            </div>

            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-token-primary leading-[1.05] mb-4">
              {project.title}
            </h2>
            {project.tagline && (
              <p className="font-accent italic text-lg md:text-xl text-token-secondary leading-snug max-w-[60ch] mb-3">
                {project.tagline}
              </p>
            )}

            <span className="inline-block text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded-full border border-plum-200 dark:border-plum-700 bg-white/40 dark:bg-plum-900/40 text-token-secondary">
              {project.engine === "labs" ? "The Good Labs" : project.engine}
            </span>
          </motion.header>

          {project.caseStudy && (
            <div className="grid lg:grid-cols-[1fr,260px] gap-8 lg:gap-12">
              {/* Body */}
              <div className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  className="border-l-2 border-token-gold pl-5 py-1"
                >
                  <p className="text-[10px] uppercase tracking-[0.22em] font-semibold text-token-gold mb-2">
                    The problem
                  </p>
                  <p className="text-base md:text-lg text-token-primary leading-relaxed">
                    {project.caseStudy.problem}
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ delay: 0.05 }}
                  className="border-l-2 border-token-teal pl-5 py-1"
                >
                  <p className="text-[10px] uppercase tracking-[0.22em] font-semibold text-token-teal mb-2">
                    What we did
                  </p>
                  <p className="text-base md:text-lg text-token-primary leading-relaxed">
                    {project.caseStudy.approach}
                  </p>
                </motion.div>

                {project.caseStudy.body.map((para, i) => (
                  <motion.p
                    key={i}
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ delay: 0.1 + i * 0.05 }}
                    className="text-base md:text-lg text-token-primary leading-relaxed prose-readable"
                  >
                    {para}
                  </motion.p>
                ))}

                {project.caseStudy.learnings && (
                  <motion.div
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    className="rounded-2xl border border-plum-200 dark:border-plum-700 bg-white/40 dark:bg-plum-900/40 p-5 md:p-6 mt-4"
                  >
                    <p className="text-[10px] uppercase tracking-[0.22em] font-semibold text-token-gold mb-3">
                      What we learned
                    </p>
                    <ul className="space-y-3">
                      {project.caseStudy.learnings.map((l, i) => (
                        <li key={i} className="flex gap-3 text-sm md:text-base text-token-primary leading-snug">
                          <span aria-hidden="true" className="text-token-gold">→</span>
                          <span>{l}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </div>

              {/* Impact metrics rail */}
              <motion.aside
                initial={{ opacity: 0, x: 16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                className="lg:sticky lg:top-28 self-start"
              >
                <p className="text-[10px] uppercase tracking-[0.22em] font-semibold text-token-muted mb-4">
                  Impact
                </p>
                <div className="space-y-3">
                  {project.impact.map((m) => {
                    const display =
                      m.display ??
                      `${m.value.toLocaleString()}${m.suffix ?? ""}`;
                    return (
                      <div
                        key={m.label}
                        className="rounded-xl border border-plum-200 dark:border-plum-700 bg-white/50 dark:bg-plum-900/40 px-4 py-3"
                      >
                        <p className="font-serif text-xl md:text-2xl font-bold text-token-gold leading-tight">
                          {display}
                        </p>
                        <p className="text-xs text-token-muted leading-snug mt-0.5">{m.label}</p>
                      </div>
                    );
                  })}
                </div>
              </motion.aside>
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
