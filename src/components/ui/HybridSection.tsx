"use client";

import { HTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";
import { useSectionMode } from "@/components/providers/ThemeProvider";

type SectionTag = "section" | "div" | "header" | "footer";

interface HybridSectionProps extends HTMLAttributes<HTMLElement> {
  /** The section's natural variant in hybrid mode. Forced overrides ignore this. */
  variant: "dark" | "light";
  /** Tailwind padding shorthand. */
  padding?: "sm" | "md" | "lg" | "xl" | "none";
  /** Render as a different element. Defaults to <section>. */
  as?: SectionTag;
}

const PADDINGS = {
  none: "",
  sm: "py-8 md:py-12",
  md: "py-12 md:py-16",
  lg: "py-16 md:py-24",
  xl: "py-24 md:py-32",
};

/**
 * A section whose theme respects the user's three-state preference:
 * - hybrid: section honors its declared `variant`
 * - dark/light: all sections forced to that mode
 *
 * The element itself carries `.dark` when its effective mode is dark, so
 * legacy Tailwind `dark:` utilities continue to resolve correctly within it.
 */
const HybridSection = forwardRef<HTMLElement, HybridSectionProps>(
  ({ variant, padding = "lg", as = "section", className, children, ...props }, ref) => {
    const mode = useSectionMode(variant);
    const isDark = mode === "dark";

    const classes = cn(
      "relative",
      isDark ? "dark bg-plum-900 text-cream-200" : "bg-cream-50 text-plum-900",
      PADDINGS[padding],
      className
    );

    const sharedProps = {
      ref,
      "data-section-mode": mode,
      className: classes,
      ...props,
    };

    switch (as) {
      case "div":
        return <div {...(sharedProps as HTMLAttributes<HTMLDivElement>)}>{children}</div>;
      case "header":
        return <header {...(sharedProps as HTMLAttributes<HTMLElement>)}>{children}</header>;
      case "footer":
        return <footer {...(sharedProps as HTMLAttributes<HTMLElement>)}>{children}</footer>;
      case "section":
      default:
        return <section {...(sharedProps as HTMLAttributes<HTMLElement>)}>{children}</section>;
    }
  }
);

HybridSection.displayName = "HybridSection";

export default HybridSection;
