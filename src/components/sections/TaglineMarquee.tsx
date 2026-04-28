"use client";

import HybridSection from "@/components/ui/HybridSection";
import Marquee from "@/components/ui/motion/Marquee";

const TAGLINES = [
  "Applied Intersectionality",
  "From friction to flow",
  "Three engines, one ecosystem",
  "Solve the whole web",
  "An Engine for Applied Imagination",
  "We are a room, not a name",
];

/**
 * Subtle moving tagline strip used between major sections on the homepage.
 * Same component, different location: a single instance lands between Hero
 * and Silo Trap; another (in inverted theme) sits inside the footer.
 */
export default function TaglineMarquee({
  variant = "dark",
}: {
  variant?: "dark" | "light";
}) {
  return (
    <HybridSection variant={variant} padding="none" className="border-y border-token-glass">
      <Marquee
        items={TAGLINES}
        duration={90}
        className="py-4 md:py-5"
        itemClassName="font-serif italic text-2xl md:text-3xl lg:text-4xl text-token-secondary/70 tracking-tight"
        dividerClassName="text-token-gold/40 text-3xl md:text-4xl"
      />
    </HybridSection>
  );
}
