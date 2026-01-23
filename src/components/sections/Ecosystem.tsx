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

// Flywheel SVG component - with smooth CSS rotation (GPU accelerated)
const FlywheelVisualization = ({ activeArm }: { activeArm: string | null }) => {
  // Label data for the three engines
  const labels = [
    { angle: 60, label: "AnduBer Partners", color: "#1A7B7A" },
    { angle: 180, label: "The Good Labs", color: "#D4AA6A" },
    { angle: 300, label: "The Gathering", color: "#C9956C" },
  ];

  return (
    <div className="relative w-[400px] h-[400px] mx-auto">
      {/* Outer decorative ring - static */}
      <div className="absolute inset-0 rounded-full border-2 border-dashed border-plum-700 opacity-50" />

      {/* Main SVG with rotating wheel */}
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
            <feGaussianBlur stdDeviation="4" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="glowStrong">
            <feGaussianBlur stdDeviation="6" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Rotating wheel group - CSS animation for GPU acceleration */}
        <g className="flywheel-rotating" style={{ transformOrigin: '200px 200px' }}>
          {/* Partners segment (Teal) - 120 degrees */}
          <path
            d="M 200 200 L 200 40 A 160 160 0 0 1 338.6 280 Z"
            fill={activeArm === "partners" ? "url(#flywheelGrad1)" : "#1A7B7A"}
            opacity={activeArm && activeArm !== "partners" ? 0.4 : 0.85}
            className="cursor-pointer transition-opacity duration-300"
            filter={activeArm === "partners" ? "url(#glow)" : "none"}
          />

          {/* Labs segment (Gold) - 120 degrees */}
          <path
            d="M 200 200 L 338.6 280 A 160 160 0 0 1 61.4 280 Z"
            fill={activeArm === "labs" ? "url(#flywheelGrad2)" : "#D4AA6A"}
            opacity={activeArm && activeArm !== "labs" ? 0.4 : 0.85}
            className="cursor-pointer transition-opacity duration-300"
            filter={activeArm === "labs" ? "url(#glow)" : "none"}
          />

          {/* The Gathering segment (Copper) - 120 degrees */}
          <path
            d="M 200 200 L 61.4 280 A 160 160 0 0 1 200 40 Z"
            fill={activeArm === "foundation" ? "url(#flywheelGrad3)" : "#C9956C"}
            opacity={activeArm && activeArm !== "foundation" ? 0.4 : 0.85}
            className="cursor-pointer transition-opacity duration-300"
            filter={activeArm === "foundation" ? "url(#glow)" : "none"}
          />

          {/* Flow arrows on each segment */}
          {[30, 150, 270].map((angle, i) => {
            const rad = (angle - 90) * Math.PI / 180;
            const x = 200 + 110 * Math.cos(rad);
            const y = 200 + 110 * Math.sin(rad);
            return (
              <polygon
                key={i}
                points="0,-7 10,0 0,7"
                fill="#F5E6C8"
                opacity={0.7}
                transform={`translate(${x}, ${y}) rotate(${angle + 90})`}
              />
            );
          })}
        </g>

        {/* Center circle - static (doesn't rotate) */}
        <circle
          cx="200"
          cy="200"
          r="55"
          fill="#1E0A14"
          stroke={activeArm ? armColors[activeArm === "partners" ? "teal" : activeArm === "labs" ? "gold" : "copper"].primary : "#3D1525"}
          strokeWidth="3"
          filter="url(#glowStrong)"
          className="transition-all duration-500"
        />

        {/* Inner decorative ring */}
        <circle
          cx="200"
          cy="200"
          r="45"
          fill="none"
          stroke="#3D1525"
          strokeWidth="1"
          strokeDasharray="4 4"
        />

        {/* Center text - static */}
        <text x="200" y="192" textAnchor="middle" className="fill-cream-200 font-serif text-base font-bold" style={{ fontFamily: 'Playfair Display, serif' }}>
          Symbiotic
        </text>
        <text x="200" y="212" textAnchor="middle" className="fill-cream-300 text-xs" style={{ fontFamily: 'Inter, sans-serif' }}>
          Engines
        </text>
      </svg>

      {/* Floating labels around the wheel - static position, counter-rotate text would be complex */}
      {labels.map((item, i) => {
        const rad = (item.angle - 90) * Math.PI / 180;
        const x = 50 + 50 * Math.cos(rad); // percentage
        const y = 50 + 50 * Math.sin(rad); // percentage
        return (
          <div
            key={i}
            className="absolute px-3 py-1.5 rounded-full text-xs font-medium backdrop-blur-sm border transition-all duration-300 hover:scale-110"
            style={{
              left: `${x}%`,
              top: `${y}%`,
              transform: 'translate(-50%, -50%)',
              backgroundColor: `${item.color}15`,
              borderColor: `${item.color}40`,
              color: item.color,
            }}
          >
            {item.label}
          </div>
        );
      })}

      {/* Glowing orbs at segment positions - subtle pulse animation */}
      {[60, 180, 300].map((angle, i) => {
        const rad = (angle - 90) * Math.PI / 180;
        const colors = ["#1A7B7A", "#D4AA6A", "#C9956C"];
        return (
          <div
            key={i}
            className="absolute w-3 h-3 rounded-full glow-pulse"
            style={{
              left: `${50 + 35 * Math.cos(rad)}%`,
              top: `${50 + 35 * Math.sin(rad)}%`,
              transform: 'translate(-50%, -50%)',
              backgroundColor: colors[i],
              boxShadow: `0 0 15px ${colors[i]}`,
              animationDelay: `${i * 1.3}s`,
            }}
          />
        );
      })}
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
                      transition-all duration-300 ease-out
                      ${colors.border} ${colors.bg}
                      ${activeArm === arm.id ? "border-opacity-80 -translate-y-1" : "border-opacity-30"}
                      hover:-translate-y-1 hover:border-opacity-60
                      will-change-transform
                    `}
                    style={{
                      boxShadow: activeArm === arm.id
                        ? `0 20px 40px rgba(0,0,0,0.2), 0 0 30px ${colors.glow}`
                        : "0 4px 20px rgba(0,0,0,0.1)",
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
