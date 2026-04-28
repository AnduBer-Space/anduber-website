"use client";

import { ReactNode, ElementType } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface Props {
  text: string;
  /** Render-as element. Defaults to <span>. */
  as?: ElementType;
  className?: string;
  /** Delay before the first word lands (seconds). */
  delay?: number;
  /** Stagger between words (seconds). */
  stagger?: number;
  /** Optional inline children rendered AFTER the animated text (e.g. punctuation). */
  trailing?: ReactNode;
  /** Animate when in view (default) or on mount. */
  trigger?: "in-view" | "mount";
}

/**
 * Splits a string into words and reveals them with a staggered fade + lift.
 * Used for the major h1/h2 lines on key pages.
 *
 * Reduced-motion fallback: the words appear at full opacity immediately —
 * no transform, no stagger.
 */
export default function TextReveal({
  text,
  as = "span",
  className,
  delay = 0,
  stagger = 0.05,
  trailing,
  trigger = "in-view",
}: Props) {
  const Wrapper = as as ElementType;
  const words = text.split(/(\s+)/);

  const container = {
    hidden: {},
    visible: {
      transition: { staggerChildren: stagger, delayChildren: delay },
    },
  };

  const word = {
    hidden: { opacity: 0, y: "0.4em" },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  const animateProps =
    trigger === "in-view"
      ? { whileInView: "visible", viewport: { once: true, amount: 0.5 } }
      : { animate: "visible" };

  return (
    <Wrapper className={cn("inline-block", className)}>
      <motion.span
        className="inline-block"
        initial="hidden"
        variants={container}
        {...animateProps}
        // motion-reduce fallback handled by global CSS rule + this nested setup
      >
        {words.map((w, i) =>
          /\s+/.test(w) ? (
            <span key={i}>&nbsp;</span>
          ) : (
            <motion.span
              key={i}
              variants={word}
              className="inline-block will-change-transform"
            >
              {w}
            </motion.span>
          )
        )}
      </motion.span>
      {trailing}
    </Wrapper>
  );
}
