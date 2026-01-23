"use client";

import { motion } from "framer-motion";
import { useRef, useState } from "react";
import { Briefcase, Beaker, Heart, ChevronRight } from "lucide-react";
import Container from "@/components/ui/Container";
import { ecosystemArms } from "@/data/site";

const armIcons = {
  partners: Briefcase,
  labs: Beaker,
  foundation: Heart,
};

const armColors = {
  teal: {
    primary: "#1A7B7A",
    light: "#2DD4BF",
    bg: "bg-teal-500/10",
    border: "border-teal-500/30",
    text: "text-teal-400",
    glow: "rgba(26, 123, 122, 0.3)",
  },
  gold: {
    primary: "#D4AA6A",
    light: "#F5E6C8",
    bg: "bg-gold-400/10",
    border: "border-gold-400/30",
    text: "text-gold-400",
    glow: "rgba(212, 170, 106, 0.3)",
  },
  copper: {
    primary: "#C9956C",
    light: "#D4A57B",
    bg: "bg-gold-600/10",
    border: "border-gold-600/30",
    text: "text-gold-600",
    glow: "rgba(201, 149, 108, 0.3)",
  },
};

// Flywheel SVG component - optimized without infinite animations
const FlywheelVisualization = ({ activeArm }: { activeArm: string | null }) => {
  return (
    <div className="relative w-[400px] h-[400px] mx-auto">
      <svg viewBox="0 0 400 400" className="w-full h-full">
        <defs>
          <linearGradient id="flywheelGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1A7B7A" />
            <stop offset="100%" stopColor="#2DD4BF" />
          </linearGradient>
          <linearGradient id="flywheelGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#D4AA6A" />
            <stop offset="100%" stopColor="#F5E6C8" />
          </linearGradient>
          <linearGradient id="flywheelGrad3" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#C9956C" />
            <stop offset="100%" stopColor="#D4A57B" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Outer ring - static dashed circle */}
        <circle
          cx="200"
          cy="200"
          r="180"
          fill="none"
          stroke="#3D1525"
          strokeWidth="2"
          strokeDasharray="10 5"
        />

        {/* Center circle with glow - static */}
        <circle
          cx="200"
          cy="200"
          r="50"
          fill="#2A0E1A"
          stroke={activeArm ? armColors[activeArm === "partners" ? "teal" : activeArm === "labs" ? "gold" : "copper"].primary : "#3D1525"}
          strokeWidth="2"
          filter="url(#glow)"
          className="transition-all duration-300"
        />

        {/* Partners segment (top) */}
        <motion.path
          d="M 200 30 A 170 170 0 0 1 347 115 L 270 158 A 85 85 0 0 0 200 115 Z"
          fill={activeArm === "partners" ? "url(#flywheelGrad1)" : "#1A7B7A"}
          opacity={activeArm && activeArm !== "partners" ? 0.3 : 0.8}
          className="cursor-pointer transition-all duration-300"
          whileHover={{ opacity: 1 }}
        />

        {/* Labs segment (bottom right) */}
        <motion.path
          d="M 347 115 A 170 170 0 0 1 347 285 L 270 242 A 85 85 0 0 0 270 158 Z"
          fill={activeArm === "labs" ? "url(#flywheelGrad2)" : "#D4AA6A"}
          opacity={activeArm && activeArm !== "labs" ? 0.3 : 0.8}
          className="cursor-pointer transition-all duration-300"
          whileHover={{ opacity: 1 }}
        />

        {/* The Gathering segment (bottom left) */}
        <motion.path
          d="M 347 285 A 170 170 0 0 1 53 285 L 130 242 A 85 85 0 0 0 270 242 Z"
          fill={activeArm === "foundation" ? "url(#flywheelGrad3)" : "#C9956C"}
          opacity={activeArm && activeArm !== "foundation" ? 0.3 : 0.8}
          className="cursor-pointer transition-all duration-300"
          whileHover={{ opacity: 1 }}
        />

        {/* Completing the wheel (top left segment for visual balance) */}
        <path
          d="M 53 285 A 170 170 0 0 1 53 115 L 130 158 A 85 85 0 0 0 130 242 Z"
          fill="#1A7B7A"
          opacity={0.4}
          className="transition-all duration-300"
        />

        <path
          d="M 53 115 A 170 170 0 0 1 200 30 L 200 115 A 85 85 0 0 0 130 158 Z"
          fill="#D4AA6A"
          opacity={0.4}
          className="transition-all duration-300"
        />

        {/* Static arrows showing flow direction */}
        {[0, 120, 240].map((angle, i) => (
          <polygon
            key={i}
            points="0,-8 12,0 0,8"
            fill="#F5E6C8"
            opacity={0.6}
            transform={`translate(${200 + 120 * Math.cos((angle - 90) * Math.PI / 180)}, ${200 + 120 * Math.sin((angle - 90) * Math.PI / 180)}) rotate(${angle + 90})`}
          />
        ))}

        {/* Center text */}
        <text x="200" y="195" textAnchor="middle" className="fill-cream-200 font-serif text-sm font-bold">
          Symbiotic
        </text>
        <text x="200" y="215" textAnchor="middle" className="fill-cream-300 text-xs">
          Engines
        </text>
      </svg>
    </div>
  );
};

export default function Ecosystem() {
  const ref = useRef(null);
  const [activeArm, setActiveArm] = useState<string | null>(null);

  return (
    <section ref={ref} className="relative py-24 lg:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-plum-900 via-plum-800 to-plum-900" />

      {/* Decorative glows - static */}
      <div
        className="absolute top-1/3 left-0 w-96 h-96 rounded-full opacity-40"
        style={{ background: "radial-gradient(circle, rgba(26, 123, 122, 0.1) 0%, transparent 70%)" }}
      />
      <div
        className="absolute bottom-1/3 right-0 w-96 h-96 rounded-full opacity-40"
        style={{ background: "radial-gradient(circle, rgba(212, 170, 106, 0.1) 0%, transparent 70%)" }}
      />

      <Container className="relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-gold-400/10 border border-gold-400/30 text-gold-400 text-sm font-medium mb-6">
            Our Structure
          </span>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-cream-200 mb-6">
            The AnduBer <span className="text-gradient-gold">Ecosystem</span>
          </h2>
          <p className="text-lg text-cream-300 max-w-3xl mx-auto">
            We operate through three symbiotic arms, creating a continuous cycle of
            sustainability and social impact. Each arm powers the others.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Flywheel Visualization */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="order-2 lg:order-1"
          >
            <FlywheelVisualization activeArm={activeArm} />
          </motion.div>

          {/* Arms List */}
          <div className="order-1 lg:order-2 space-y-6">
            {ecosystemArms.map((arm, index) => {
              const Icon = armIcons[arm.id as keyof typeof armIcons];
              const colors = armColors[arm.color as keyof typeof armColors];

              return (
                <motion.div
                  key={arm.id}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15 }}
                  onMouseEnter={() => setActiveArm(arm.id)}
                  onMouseLeave={() => setActiveArm(null)}
                  className="cursor-pointer"
                >
                  <div
                    className={`
                      p-6 rounded-2xl border backdrop-blur-sm
                      transition-all duration-300
                      ${colors.border} ${colors.bg}
                      ${activeArm === arm.id ? "border-opacity-80 scale-[1.02]" : "border-opacity-30"}
                    `}
                    style={{
                      boxShadow: activeArm === arm.id ? `0 0 30px ${colors.glow}` : "none",
                    }}
                  >
                    <div className="flex items-start gap-4">
                      <div className={`flex-shrink-0 w-12 h-12 rounded-xl ${colors.bg} flex items-center justify-center`}>
                        <Icon className={`w-6 h-6 ${colors.text}`} />
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className={`font-serif text-xl font-bold ${colors.text}`}>
                            {arm.title}
                          </h3>
                          <span className="text-xs px-2 py-0.5 rounded-full bg-plum-700 text-cream-300">
                            {arm.type}
                          </span>
                        </div>

                        <p className="text-sm text-cream-300 mb-2">{arm.subtitle}</p>

                        <p className="text-cream-300 text-sm leading-relaxed">
                          {arm.description}
                        </p>

                        {activeArm === arm.id && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="mt-4 pt-4 border-t border-plum-700"
                          >
                            <p className="text-xs text-plum-500 mb-2 uppercase tracking-wider">
                              Revenue Model
                            </p>
                            <p className="text-sm text-cream-300">{arm.revenueModel}</p>
                          </motion.div>
                        )}
                      </div>

                      <ChevronRight
                        className={`w-5 h-5 ${colors.text} transition-transform duration-300 ${
                          activeArm === arm.id ? "translate-x-1" : ""
                        }`}
                      />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
