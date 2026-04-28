"use client";

import { ReactNode, useRef, MouseEvent } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

interface Props {
  children: ReactNode;
  className?: string;
  /** Maximum tilt in degrees. */
  intensity?: number;
}

/**
 * Subtle 3D tilt on hover. Uses spring-smoothed mouse position mapped to
 * rotateX/rotateY and a small parallax on a designated highlight layer.
 *
 * No-op for touch / coarse pointers / reduced-motion.
 */
export default function TiltCard({ children, className, intensity = 6 }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-0.5, 0.5], [intensity, -intensity]);
  const rotateY = useTransform(x, [-0.5, 0.5], [-intensity, intensity]);
  const springRX = useSpring(rotateX, { stiffness: 220, damping: 22 });
  const springRY = useSpring(rotateY, { stiffness: 220, damping: 22 });

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    if (typeof window === "undefined") return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (reduced || !fine) return;

    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(px);
    y.set(py);
  };

  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={cn("relative", className)}
      style={{
        rotateX: springRX,
        rotateY: springRY,
        transformPerspective: 1000,
        transformStyle: "preserve-3d",
      }}
    >
      {children}
    </motion.div>
  );
}
