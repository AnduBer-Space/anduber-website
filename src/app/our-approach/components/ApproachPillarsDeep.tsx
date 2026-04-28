"use client";

import { motion } from "framer-motion";
import { Zap, Sparkles, Shield } from "lucide-react";
import Container from "@/components/ui/Container";

/**
 * Long-form Three Pillars treatment for the Our Approach page. The
 * homepage version condenses; this version goes deep — the methods we
 * actually use, what we ask of partners, how we judge success.
 */

const PILLARS = [
  {
    Icon: Zap,
    stage: "Input",
    title: "Radical Collision",
    plain: "Bring unlikely people together — poets with policymakers, grandmothers with engineers.",
    body: [
      "We architect the room, then we get out of its way. Each project starts by mapping the implicated disciplines, communities and decision-makers — then explicitly inviting people who don't usually share an agenda.",
      "Concrete moves: scoping interviews across disciplines; targeted invitation lists with quotas for non-traditional voices (artists, traditional leaders, youth, women's groups); facilitated first sessions designed to surface power asymmetries before they hide inside the agenda.",
    ],
    succeeds:
      "The room talks across disciplines without translation. People who arrived suspicious leave with a problem they want to solve together.",
    tone: "teal" as const,
  },
  {
    Icon: Sparkles,
    stage: "Process",
    title: "Applied Imagination",
    plain: "Equip these teams with tools to map problems and find leverage points.",
    body: [
      "Imagination without method is wishing. We bring the methods. Systems mapping (causal-loop diagrams, stock-and-flow models), design-justice protocols, theory-of-change canvases, prototyping sprints calibrated to the resources actually available in the field.",
      "The work is to move the room from \"what if\" to \"how to\" — turning intuition into structures that decisions can be made on. Half the time the leverage point is smaller, weirder and cheaper than anyone arrived expecting.",
    ],
    succeeds:
      "The team has a shared map of the system, a short list of leverage points, and an agreement on which to test first.",
    tone: "gold" as const,
  },
  {
    Icon: Shield,
    stage: "Output",
    title: "Systemic Resilience",
    plain: "Produce solutions that hold up because they address multiple problems at once.",
    body: [
      "What ships isn't a project — it's a system, designed to keep working after the funding cycle ends and the consultants leave. Community ownership is a milestone with a date on it, not a slogan. Costs scale down, not up. Maintenance is local. Failure modes are documented and survived.",
      "We reject the donor-output trap (boreholes drilled, workshops held) in favour of outcomes that compound: water access tied to school attendance; clinic uptime tied to local procurement; women's leadership representation as a leading indicator, not a side effect.",
    ],
    succeeds:
      "Three years on, the thing still works. Costs are lower, governance is local, and the donor isn't propping it up.",
    tone: "copper" as const,
  },
];

const TONES = {
  teal: { text: "text-token-teal", bg: "bg-teal-500/10" },
  gold: { text: "text-token-gold", bg: "bg-gold-400/10" },
  copper: { text: "text-gold-800 dark:text-gold-400", bg: "bg-gold-600/10" },
};

export default function ApproachPillarsDeep() {
  return (
    <section className="relative py-20 md:py-28 overflow-hidden bg-cream-100 dark:bg-plum-800">
      <Container className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          className="max-w-3xl mb-14"
        >
          <p className="text-xs uppercase tracking-[0.22em] font-semibold text-token-gold mb-4">
            Theory of Change
          </p>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-token-primary leading-[1.1] mb-5">
            Three operational movements
          </h2>
          <p className="font-accent italic text-lg md:text-xl text-token-secondary leading-snug max-w-[60ch]">
            The methods we use, what we ask of partners, how we know we
            succeeded.
          </p>
        </motion.div>

        <div className="space-y-12 lg:space-y-16">
          {PILLARS.map((p, idx) => {
            const tone = TONES[p.tone];
            return (
              <motion.article
                key={p.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.6 }}
                className="grid lg:grid-cols-[280px,1fr] gap-6 lg:gap-12"
              >
                {/* Left rail: stage / icon / title */}
                <div className="lg:sticky lg:top-28 self-start">
                  <p className={`text-[10px] uppercase tracking-[0.22em] font-semibold mb-3 ${tone.text}`}>
                    {p.stage} &nbsp;·&nbsp; Pillar {String(idx + 1).padStart(2, "0")}
                  </p>
                  <div className={`inline-flex w-12 h-12 rounded-2xl items-center justify-center mb-4 ${tone.bg}`}>
                    <p.Icon className={`w-6 h-6 ${tone.text}`} aria-hidden="true" />
                  </div>
                  <h3 className="font-serif text-2xl md:text-3xl font-bold text-token-primary leading-tight mb-2">
                    {p.title}
                  </h3>
                  <p className={`font-accent italic text-base md:text-lg leading-snug ${tone.text}`}>
                    {p.plain}
                  </p>
                </div>

                {/* Right column: body + succeeds-when */}
                <div className="space-y-5">
                  {p.body.map((para, i) => (
                    <p
                      key={i}
                      className="text-base md:text-lg text-token-primary leading-relaxed prose-readable"
                    >
                      {para}
                    </p>
                  ))}
                  <div className="border-l-2 border-gold-500/60 pl-5 py-1">
                    <p className="text-[10px] uppercase tracking-[0.18em] font-semibold text-token-gold mb-1">
                      We know it worked when
                    </p>
                    <p className="text-sm md:text-base text-token-primary leading-snug">
                      {p.succeeds}
                    </p>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
