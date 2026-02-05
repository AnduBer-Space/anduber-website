"use client";

import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

interface AnimatedSectionProps extends Omit<HTMLMotionProps<"div">, "initial" | "whileInView" | "viewport" | "transition"> {
  animation?: "fadeIn" | "fadeInUp" | "fadeInLeft" | "fadeInRight" | "scaleIn" | "slideUp";
  delay?: number;
  duration?: number;
  /** Trigger animation earlier (percentage of element visible) */
  threshold?: number;
}

// Animation presets - optimized for smooth 60fps performance
const animations = {
  fadeIn: {
    initial: { opacity: 0 },
    whileInView: { opacity: 1 },
  },
  fadeInUp: {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
  },
  fadeInLeft: {
    initial: { opacity: 0, x: -30 },
    whileInView: { opacity: 1, x: 0 },
  },
  fadeInRight: {
    initial: { opacity: 0, x: 30 },
    whileInView: { opacity: 1, x: 0 },
  },
  scaleIn: {
    initial: { opacity: 0, scale: 0.95 },
    whileInView: { opacity: 1, scale: 1 },
  },
  // Snappy slide up animation (300-500ms as requested)
  slideUp: {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
  },
};

export default function AnimatedSection({
  className,
  animation = "fadeInUp",
  delay = 0,
  duration = 0.4, // Snappier default (400ms)
  threshold = 0.1,
  children,
  ...props
}: AnimatedSectionProps) {
  return (
    <motion.div
      className={cn(className)}
      initial={animations[animation].initial}
      whileInView={animations[animation].whileInView}
      viewport={{
        once: true, // Animate ONCE when visible, then stop
        amount: threshold, // Trigger when this much is visible
        margin: "-50px" // Start animation slightly before fully in view
      }}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.1, 0.25, 1], // Smooth ease-out curve
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
