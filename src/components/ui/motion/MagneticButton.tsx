"use client";

import { useRef, ReactNode, MouseEvent } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

interface Props {
  children: ReactNode;
  /** Maximum pixels the element can be pulled toward the cursor. */
  strength?: number;
  className?: string;
  /** Forwarded onClick. */
  onClick?: (e: MouseEvent<HTMLDivElement>) => void;
  /** Render-as. Defaults to a span so it inherits the parent's display. */
  as?: "span" | "div";
}

/**
 * Wraps children in a magnetic-pull effect on desktop pointers. The element
 * shifts toward the cursor with a spring response. No-op on touch devices
 * (no fine pointer) and when prefers-reduced-motion is set — the element
 * just passes through, hover/click still work normally.
 */
export default function MagneticButton({
  children,
  strength = 12,
  className,
  onClick,
  as = "span",
}: Props) {
  const ref = useRef<HTMLDivElement | HTMLSpanElement | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 220, damping: 18, mass: 0.5 });
  const springY = useSpring(y, { stiffness: 220, damping: 18, mass: 0.5 });

  const onMove = (e: MouseEvent<HTMLDivElement | HTMLSpanElement>) => {
    if (typeof window === "undefined") return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (reduced || !fine) return;

    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = ((e.clientX - cx) / rect.width) * 2;
    const dy = ((e.clientY - cy) / rect.height) * 2;
    x.set(dx * strength);
    y.set(dy * strength);
  };

  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  const Tag = as === "div" ? motion.div : motion.span;

  return (
    <Tag
      ref={ref as never}
      className={cn("inline-block will-change-transform", className)}
      style={{ x: springX, y: springY }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      onClick={onClick}
    >
      {children}
    </Tag>
  );
}
