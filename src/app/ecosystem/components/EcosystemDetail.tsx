"use client";

import { motion } from "framer-motion";
import { Briefcase, Beaker, Heart, Check } from "lucide-react";
import Container from "@/components/ui/Container";
import { ecosystemArms } from "@/data/site";

const armIcons = {
  partners: Briefcase,
  labs: Beaker,
  foundation: Heart,
};

const armColors = {
  teal: {
    bg: "bg-teal-500/10",
    border: "border-teal-500/30",
    text: "text-teal-400",
    checkBg: "bg-teal-500/20",
  },
  gold: {
    bg: "bg-gold-400/10",
    border: "border-gold-400/30",
    text: "text-gold-400",
    checkBg: "bg-gold-400/20",
  },
  copper: {
    bg: "bg-gold-600/10",
    border: "border-gold-600/30",
    text: "text-gold-600",
    checkBg: "bg-gold-600/20",
  },
};

export default function EcosystemDetail() {
  return (
    <section className="relative py-16 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-plum-800 via-plum-900 to-plum-800" />

      <Container className="relative z-10">
        <div className="space-y-24">
          {ecosystemArms.map((arm, index) => {
            const Icon = armIcons[arm.id as keyof typeof armIcons];
            const colors = armColors[arm.color as keyof typeof armColors];
            const isEven = index % 2 === 0;

            return (
              <motion.div
                key={arm.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative"
              >
                {/* Decorative line connector */}
                {index < ecosystemArms.length - 1 && (
                  <div className="absolute left-1/2 bottom-0 w-px h-24 -mb-24 bg-gradient-to-b from-plum-700 to-transparent" />
                )}

                <div className={`grid lg:grid-cols-2 gap-12 lg:gap-16 items-center ${isEven ? "" : "lg:flex-row-reverse"}`}>
                  {/* Content */}
                  <div className={isEven ? "lg:order-1" : "lg:order-2"}>
                    <div className="flex items-center gap-4 mb-6">
                      <div className={`w-16 h-16 rounded-2xl ${colors.bg} flex items-center justify-center`}>
                        <Icon className={`w-8 h-8 ${colors.text}`} />
                      </div>
                      <div>
                        <span className={`text-sm font-medium uppercase tracking-wider ${colors.text}`}>
                          {arm.type}
                        </span>
                        <h3 className="font-serif text-3xl md:text-4xl font-bold text-cream-200">
                          {arm.title}
                        </h3>
                      </div>
                    </div>

                    <p className="text-cream-300 text-lg leading-relaxed mb-6">
                      {arm.description}
                    </p>

                    <div className={`p-4 rounded-xl ${colors.bg} border ${colors.border} mb-8`}>
                      <p className="text-sm text-cream-400 uppercase tracking-wider mb-1">Revenue Model</p>
                      <p className={`font-medium ${colors.text}`}>{arm.revenueModel}</p>
                    </div>

                    <h4 className="font-serif text-xl font-bold text-cream-200 mb-4">
                      What We Offer
                    </h4>
                    <ul className="space-y-3">
                      {arm.services.map((service, sIndex) => (
                        <motion.li
                          key={sIndex}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: sIndex * 0.1 }}
                          className="flex items-start gap-3"
                        >
                          <div className={`flex-shrink-0 w-6 h-6 rounded-full ${colors.checkBg} flex items-center justify-center mt-0.5`}>
                            <Check className={`w-4 h-4 ${colors.text}`} />
                          </div>
                          <span className="text-cream-300">{service}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>

                  {/* Visual */}
                  <div className={isEven ? "lg:order-2" : "lg:order-1"}>
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6 }}
                      className={`relative p-8 lg:p-12 rounded-3xl ${colors.bg} border ${colors.border} backdrop-blur-sm`}
                    >
                      {/* Decorative corner elements */}
                      <div className={`absolute top-0 left-0 w-24 h-24 rounded-tl-3xl border-t-2 border-l-2 ${colors.border}`} />
                      <div className={`absolute bottom-0 right-0 w-24 h-24 rounded-br-3xl border-b-2 border-r-2 ${colors.border}`} />

                      <div className="relative">
                        <div className={`w-24 h-24 mx-auto rounded-3xl ${colors.bg} flex items-center justify-center mb-8`}>
                          <Icon className={`w-12 h-12 ${colors.text}`} />
                        </div>

                        <h4 className={`font-serif text-2xl font-bold ${colors.text} text-center mb-4`}>
                          {arm.subtitle}
                        </h4>

                        <p className="text-cream-300 text-center text-lg">
                          {arm.id === "partners" && "Funding the mission through strategic consulting"}
                          {arm.id === "labs" && "Developing the tools and frameworks for change"}
                          {arm.id === "foundation" && "Investing in overlooked innovators across Africa"}
                        </p>

                        {/* Connection arrows */}
                        <div className="mt-8 pt-8 border-t border-plum-700">
                          <p className="text-sm text-center text-cream-400">
                            <span className="text-teal-400">Partners</span> funds{" "}
                            <span className="text-gold-400">Labs</span> develops{" "}
                            <span className="text-gold-600">Gathering</span> invests
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
