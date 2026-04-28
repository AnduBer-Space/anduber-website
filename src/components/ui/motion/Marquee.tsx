"use client";

import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface Props {
  /** Items to render. Each is rendered with a divider between siblings. */
  items: string[];
  /** Loop duration in seconds. Larger = slower. Defaults to 80s. */
  duration?: number;
  /** "left" (default) scrolls right→left; "right" scrolls left→right. */
  direction?: "left" | "right";
  /** Tailwind classes for each item. Style here, not on the parent. */
  itemClassName?: string;
  /** Tailwind classes for the divider glyph between items. */
  dividerClassName?: string;
  /** The divider character. Defaults to a centred dot. */
  divider?: ReactNode;
  /** Wrapper class — controls bg, padding, masking. */
  className?: string;
}

/**
 * A subtle infinite text marquee. Pure CSS, GPU-accelerated. Items render
 * twice in sequence with the second copy translated 100% so the loop is
 * seamless regardless of total content length.
 *
 * Reduced-motion: animation pauses (text remains visible, just static).
 */
export default function Marquee({
  items,
  duration = 80,
  direction = "left",
  itemClassName,
  dividerClassName,
  divider = "•",
  className,
}: Props) {
  const animationName =
    direction === "left" ? "marquee-left" : "marquee-right";

  return (
    <div
      className={cn(
        "relative overflow-hidden select-none",
        // Edge mask so items fade in/out at the viewport edges.
        "[mask-image:linear-gradient(90deg,transparent_0,black_8%,black_92%,transparent_100%)]",
        className
      )}
      aria-hidden="true"
    >
      <div
        className="flex w-max will-change-transform"
        style={{
          animation: `${animationName} ${duration}s linear infinite`,
        }}
      >
        {/* Two identical sequences for the seamless loop */}
        {[0, 1].map((seq) => (
          <ul
            key={seq}
            className="flex shrink-0 items-center gap-10 md:gap-14 px-5 md:px-7 list-none p-0"
          >
            {items.map((it, i) => (
              <li key={`${seq}-${i}`} className="flex items-center gap-10 md:gap-14">
                <span className={cn("whitespace-nowrap", itemClassName)}>{it}</span>
                <span
                  aria-hidden="true"
                  className={cn("text-token-gold/50 text-2xl leading-none", dividerClassName)}
                >
                  {divider}
                </span>
              </li>
            ))}
          </ul>
        ))}
      </div>

      {/* Local keyframes — translate exactly half the doubled content for a seamless loop */}
      <style jsx>{`
        @keyframes marquee-left {
          from { transform: translate3d(0, 0, 0); }
          to   { transform: translate3d(-50%, 0, 0); }
        }
        @keyframes marquee-right {
          from { transform: translate3d(-50%, 0, 0); }
          to   { transform: translate3d(0, 0, 0); }
        }
        @media (prefers-reduced-motion: reduce) {
          div > div {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  );
}
