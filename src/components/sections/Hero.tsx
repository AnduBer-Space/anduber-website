"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";

// Premium Network Lines Background - SVG with subtle CSS animations
const NetworkBackground = () => {
  // Static node positions for the network
  const nodes = [
    { x: 8, y: 15 }, { x: 22, y: 35 }, { x: 15, y: 65 },
    { x: 35, y: 20 }, { x: 45, y: 50 }, { x: 38, y: 80 },
    { x: 55, y: 25 }, { x: 65, y: 55 }, { x: 58, y: 85 },
    { x: 78, y: 18 }, { x: 85, y: 45 }, { x: 92, y: 70 },
    { x: 50, y: 10 }, { x: 75, y: 75 }, { x: 28, y: 50 },
  ];

  // Connections between nodes
  const connections = [
    [0, 1], [1, 2], [1, 4], [0, 3],
    [3, 4], [4, 5], [3, 6], [4, 7],
    [6, 7], [7, 8], [6, 9], [7, 10],
    [9, 10], [10, 11], [10, 13],
    [2, 5], [5, 8], [8, 13],
    [0, 12], [12, 6], [12, 9],
    [1, 14], [14, 4], [14, 7],
  ];

  return (
    <div className="network-lines-container">
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          {/* Gradient for lines */}
          <linearGradient id="networkLineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1A7B7A" stopOpacity="0.4" />
            <stop offset="50%" stopColor="#D4AA6A" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#C9956C" stopOpacity="0.4" />
          </linearGradient>

          {/* Glow filter for nodes */}
          <filter id="networkNodeGlow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="0.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Radial gradient for node glows */}
          <radialGradient id="nodeGlowGrad">
            <stop offset="0%" stopColor="#1A7B7A" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#1A7B7A" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Connection lines - static with subtle dash animation */}
        {connections.map(([from, to], i) => (
          <line
            key={`conn-${i}`}
            x1={nodes[from].x}
            y1={nodes[from].y}
            x2={nodes[to].x}
            y2={nodes[to].y}
            stroke="url(#networkLineGrad)"
            strokeWidth="0.12"
            className="network-line network-line-animated"
            style={{ animationDelay: `${i * 0.8}s` }}
          />
        ))}

        {/* Network nodes with subtle glow */}
        {nodes.map((node, i) => (
          <g key={`node-${i}`}>
            {/* Outer glow */}
            <circle
              cx={node.x}
              cy={node.y}
              r="1.2"
              fill="url(#nodeGlowGrad)"
              className="network-node-glow"
              style={{ animationDelay: `${i * 0.3}s` }}
            />
            {/* Inner node */}
            <circle
              cx={node.x}
              cy={node.y}
              r="0.35"
              fill={i % 3 === 0 ? "#1A7B7A" : i % 3 === 1 ? "#D4AA6A" : "#C9956C"}
              className="network-node"
              filter="url(#networkNodeGlow)"
            />
          </g>
        ))}

        {/* Decorative curved paths */}
        <path
          d="M 0 30 Q 25 20 50 35 T 100 25"
          stroke="url(#networkLineGrad)"
          strokeWidth="0.08"
          fill="none"
          className="network-line"
          opacity="0.5"
        />
        <path
          d="M 0 70 Q 30 80 60 65 T 100 75"
          stroke="url(#networkLineGrad)"
          strokeWidth="0.08"
          fill="none"
          className="network-line"
          opacity="0.5"
        />
      </svg>
    </div>
  );
};

// Simplified network node component for hero - animations run once on load
const NetworkNodes = () => {
  const nodes = [
    { x: 10, y: 20, delay: 0 },
    { x: 25, y: 45, delay: 0.2 },
    { x: 40, y: 15, delay: 0.4 },
    { x: 55, y: 60, delay: 0.6 },
    { x: 70, y: 30, delay: 0.8 },
    { x: 85, y: 55, delay: 1 },
    { x: 15, y: 70, delay: 1.2 },
    { x: 45, y: 80, delay: 1.4 },
    { x: 75, y: 75, delay: 1.6 },
    { x: 90, y: 25, delay: 1.8 },
    { x: 30, y: 35, delay: 0.3 },
    { x: 60, y: 45, delay: 0.7 },
  ];

  const connections = [
    [0, 1], [1, 2], [2, 3], [3, 4], [4, 5],
    [0, 6], [6, 7], [7, 8], [8, 5],
    [1, 10], [10, 11], [11, 4],
    [2, 10], [3, 11], [6, 1], [7, 3],
  ];

  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1A7B7A" stopOpacity="0.3" />
          <stop offset="50%" stopColor="#D4AA6A" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#1A7B7A" stopOpacity="0.3" />
        </linearGradient>
        <radialGradient id="nodeGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#1A7B7A" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#1A7B7A" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Connection lines - animate once */}
      {connections.map(([from, to], i) => (
        <motion.line
          key={`line-${i}`}
          x1={`${nodes[from].x}%`}
          y1={`${nodes[from].y}%`}
          x2={`${nodes[to].x}%`}
          y2={`${nodes[to].y}%`}
          stroke="url(#lineGradient)"
          strokeWidth="0.15"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 2, delay: i * 0.1, ease: "easeOut" }}
        />
      ))}

      {/* Nodes - fade in once, no pulsing */}
      {nodes.map((node, i) => (
        <motion.g key={`node-${i}`}>
          {/* Glow - static after fade in */}
          <motion.circle
            cx={`${node.x}%`}
            cy={`${node.y}%`}
            r="1.5"
            fill="url(#nodeGlow)"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.5 }}
            transition={{ duration: 0.5, delay: node.delay }}
          />
          {/* Node */}
          <motion.circle
            cx={`${node.x}%`}
            cy={`${node.y}%`}
            r="0.4"
            fill="#1A7B7A"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.8 }}
            transition={{ duration: 0.5, delay: node.delay }}
          />
        </motion.g>
      ))}
    </svg>
  );
};

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-plum-900">
      {/* Background gradient - static */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(135deg, #1E0A14 0%, #2A0E1A 50%, #1E0A14 100%)",
        }}
      />

      {/* Premium Network Lines Background */}
      <NetworkBackground />

      {/* Radial glows with subtle pulse animation */}
      <div
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full glow-pulse"
        style={{
          background: "radial-gradient(circle, rgba(26, 123, 122, 0.2) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full glow-pulse"
        style={{
          background: "radial-gradient(circle, rgba(212, 170, 106, 0.15) 0%, transparent 70%)",
          animationDelay: "2s",
        }}
      />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full glow-pulse"
        style={{
          background: "radial-gradient(circle, rgba(201, 149, 108, 0.08) 0%, transparent 60%)",
          animationDelay: "1s",
        }}
      />

      {/* Network nodes overlay (one-time animations on load) */}
      <NetworkNodes />

      <Container className="relative z-10 pt-32 pb-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-400 text-sm font-medium mb-6"
            >
              <Sparkles className="w-4 h-4" />
              <span>The Fusion of Cultures</span>
            </motion.div>

            {/* Main heading */}
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-cream-200 mb-6 leading-tight">
              An Engine for{" "}
              <span className="text-gradient-gold">Applied Imagination</span>
            </h1>

            {/* Subheading */}
            <p className="text-lg md:text-xl text-cream-300 mb-4 max-w-xl mx-auto lg:mx-0">
              <span className="text-gold-400 font-semibold">ANDU</span> (People) +{" "}
              <span className="text-teal-400 font-semibold">BER</span> (Good)
            </p>

            <p className="text-base md:text-lg text-plum-500 mb-8 max-w-xl mx-auto lg:mx-0">
              A new breed of social enterprise dismantling silos and building
              resilient systems. We collide diverse expertise to unlock solutions
              that leave no one behind.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link href="/model">
                <Button variant="primary" size="lg">
                  Explore Our Model
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link href="/about">
                <Button variant="outline" size="lg">
                  Who We Are
                </Button>
              </Link>
            </div>

            {/* Key phrase */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="mt-12 pt-8 border-t border-plum-700"
            >
              <p className="text-cream-300 italic text-lg">
                &ldquo;From Friction to Flow &mdash; We turn &apos;what if&apos; into &apos;how to&apos;&rdquo;
              </p>
            </motion.div>
          </motion.div>

          {/* Visual Element - Logo with animated nodes */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="hidden lg:flex items-center justify-center"
          >
            <div className="relative w-[450px] h-[450px]">
              {/* Outer ring - static dashed border */}
              <div
                className="absolute inset-0 rounded-full border border-teal-500/20"
                style={{ borderStyle: "dashed" }}
              />

              {/* Inner ring - static dashed border */}
              <div
                className="absolute inset-8 rounded-full border border-gold-400/20"
                style={{ borderStyle: "dashed" }}
              />

              {/* Glowing background - static */}
              <div
                className="absolute inset-16 rounded-full opacity-60"
                style={{
                  background: "radial-gradient(circle, rgba(212, 170, 106, 0.2) 0%, transparent 70%)",
                }}
              />

              {/* Central Logo - static */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="relative"
                >
                  <Image
                    src="/images/logo.png.png"
                    alt="AnduBer Logo"
                    width={200}
                    height={200}
                    className="object-contain drop-shadow-2xl"
                    priority
                  />
                </motion.div>
              </div>

              {/* Orbiting elements - fade in once, no bobbing */}
              {["Artists", "Scientists", "Elders", "Youth", "Engineers", "Leaders"].map((label, i) => {
                const angle = (i * 60) * (Math.PI / 180);
                const radius = 180;
                const x = Math.cos(angle) * radius;
                const y = Math.sin(angle) * radius;

                return (
                  <motion.div
                    key={label}
                    className="absolute left-1/2 top-1/2"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{
                      opacity: 1,
                      scale: 1,
                      x: x - 40,
                      y: y - 15,
                    }}
                    transition={{ delay: 0.5 + i * 0.1, duration: 0.5 }}
                  >
                    <div className="px-3 py-1.5 rounded-full text-xs font-medium glass-card">
                      <span className={i % 2 === 0 ? "text-teal-400" : "text-gold-400"}>
                        {label}
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </Container>

      {/* Scroll Indicator with subtle bounce animation */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="flex flex-col items-center text-plum-500">
          <span className="text-sm mb-2">Scroll to explore</span>
          <div className="w-6 h-10 rounded-full border-2 border-plum-700 flex items-start justify-center p-1">
            <div className="w-1.5 h-3 rounded-full bg-gold-400 animate-bounce" style={{ animationDuration: '2s' }} />
          </div>
        </div>
      </motion.div>
    </section>
  );
}
