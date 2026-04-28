"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

/**
 * App-router template. Re-mounts on every route change, so the motion below
 * runs as a page transition: a thin gold accent line sweeps across the top of
 * the viewport, and the new page fades in beneath it.
 *
 * Reduced-motion: framer-motion respects the global motion-reduce CSS clamp
 * (animations collapse to 0.01ms), so this becomes a no-op for those users.
 */
export default function Template({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <>
      {/* Gold accent sweep — keyed on pathname so it re-runs on each navigation */}
      <motion.div
        key={`page-sweep-${pathname}`}
        aria-hidden="true"
        className="fixed top-0 left-0 right-0 z-[80] pointer-events-none h-px"
        initial={{ scaleX: 0, transformOrigin: "left center", opacity: 1 }}
        animate={{ scaleX: 1, opacity: [1, 1, 0] }}
        transition={{
          scaleX: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
          opacity: { times: [0, 0.7, 1], duration: 0.85, ease: "easeOut" },
        }}
        style={{
          background:
            "linear-gradient(90deg, rgba(212, 170, 106, 0) 0%, rgba(212, 170, 106, 0.9) 30%, rgba(245, 230, 200, 1) 50%, rgba(212, 170, 106, 0.9) 70%, rgba(212, 170, 106, 0) 100%)",
          boxShadow:
            "0 0 12px rgba(212, 170, 106, 0.6), 0 0 24px rgba(212, 170, 106, 0.3)",
        }}
      />

      <motion.div
        key={`page-${pathname}`}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: "easeOut", delay: 0.1 }}
      >
        {children}
      </motion.div>
    </>
  );
}
