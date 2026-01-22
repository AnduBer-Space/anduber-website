"use client";

import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

interface AnimatedSectionProps extends Omit<HTMLMotionProps<"div">, "initial" | "whileInView" | "viewport" | "transition"> {
  animation?: "fadeIn" | "fadeInUp" | "fadeInLeft" | "fadeInRight" | "scaleIn";
  delay?: number;
  duration?: number;
}

const animations = {
  fadeIn: {
    initial: { opacity: 0 },
    whileInView: { opacity: 1 },
  },
  fadeInUp: {
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
  },
  fadeInLeft: {
    initial: { opacity: 0, x: -40 },
    whileInView: { opacity: 1, x: 0 },
  },
  fadeInRight: {
    initial: { opacity: 0, x: 40 },
    whileInView: { opacity: 1, x: 0 },
  },
  scaleIn: {
    initial: { opacity: 0, scale: 0.9 },
    whileInView: { opacity: 1, scale: 1 },
  },
};

export default function AnimatedSection({
  className,
  animation = "fadeInUp",
  delay = 0,
  duration = 0.6,
  children,
  ...props
}: AnimatedSectionProps) {
  return (
    <motion.div
      className={cn(className)}
      initial={animations[animation].initial}
      whileInView={animations[animation].whileInView}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration, delay, ease: "easeOut" }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
